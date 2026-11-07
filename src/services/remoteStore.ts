// Yagona Markaziy Ma'lumotlar Bazasi bilan sinxronlash (PostgreSQL + Bulutli Zaxira).
// MUHIM: Har bir kompyuterda alohida baza bo'lib qolmasligi uchun umumiy ma'lumotlar
// HECH QACHON localStorage dan o'qilmaydi va localStorage ga saqlanmaydi!
// Barcha qurilmalar faqat serverdagi yagona markaziy bazadan o'qiydi va yozadi.

export type SyncStatus = 'connecting' | 'online' | 'offline';

const cache = new Map<string, unknown>(); // Serverdan olingan joriy qiymat (xotirada)
const base = new Map<string, unknown>(); // Serverdan oxirgi marta tasdiqlangan qiymat
const versions = new Map<string, number>();
const dirty = new Set<string>();
const pushing = new Set<string>();
const failed = new Set<string>();
let keys: string[] = [];
let status: SyncStatus = 'connecting';
let activeBackendName = 'postgres';
let pollTimer: ReturnType<typeof setInterval> | null = null;

export const STORE_EVENT = 'devmaster-store-updated';
export const STATUS_EVENT = 'devmaster-sync-status';

export function getSyncStatus(): SyncStatus {
  return status;
}

export function getActiveBackendName(): string {
  return activeBackendName;
}

function setStatus(next: SyncStatus) {
  if (status === next) return;
  status = next;
  window.dispatchEvent(new CustomEvent(STATUS_EVENT, { detail: next }));
}

function notifyChanged() {
  window.dispatchEvent(new Event(STORE_EVENT));
}

/**
 * Brauzerning localStorage xotirasida qolib ketgan eski umumiy jadvallarni tozalaydi,
 * shunda hech bir kompyuter o'zining eski keshini bazaga qayta yozib yubormaydi.
 */
function purgeBrowserLocalStorageForSharedKeys(sharedKeys: string[]) {
  try {
    for (const k of sharedKeys) {
      localStorage.removeItem(k);
    }
    // Eski versiya kalitlarini ham tozalaymiz
    localStorage.removeItem('devmaster_teachers_v2');
    localStorage.removeItem('devmaster_students_v1');
  } catch {
    // ignore
  }
}

async function fetchJson(url: string, init?: RequestInit, timeoutMs = 9000): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// ---- 3 tomonlama birlashtirish (id bo'yicha) ----
type Item = { id?: unknown };
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

function merge(baseVal: unknown, mine: unknown, theirs: unknown): unknown {
  const arrs = [mine, theirs].every(Array.isArray);
  const baseArr = Array.isArray(baseVal) ? baseVal : [];
  if (!arrs) return mine;
  const all = [...(mine as Item[]), ...(theirs as Item[]), ...(baseArr as Item[])];
  if (!all.every((x) => x && typeof x === 'object' && typeof x.id === 'string')) return mine;

  const toMap = (a: Item[]) => new Map(a.map((x) => [x.id as string, x]));
  const b = toMap(baseArr as Item[]);
  const m = toMap(mine as Item[]);
  const result = toMap(theirs as Item[]);

  for (const [id, item] of m) {
    if (!result.has(id)) {
      if (!b.has(id) || !same(item, b.get(id))) result.set(id, item);
    } else if (!same(item, b.get(id))) {
      result.set(id, item);
    }
  }
  for (const id of b.keys()) if (!m.has(id)) result.delete(id);
  return [...result.values()];
}

// ---- Markaziy Bazaga Yuborish ----
async function pushOnce(key: string): Promise<void> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const mine = cache.get(key);
    const res = await fetchJson(`/api/store/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: mine, baseVersion: versions.get(key) ?? 0 }),
    });
    if (res.ok) {
      const data = await res.json();
      versions.set(key, data.version);
      if (data.backend) activeBackendName = data.backend;
      base.set(key, mine);
      return;
    }
    if (res.status === 409) {
      const { value: theirs, version } = await res.json();
      const merged = merge(base.get(key), cache.get(key), theirs);
      cache.set(key, merged);
      base.set(key, theirs);
      versions.set(key, version);
      notifyChanged();
      continue;
    }
    throw new Error(`Server javobi: ${res.status}`);
  }
  throw new Error('Birlashtirishda takroriy ziddiyat');
}

function schedulePush(key: string) {
  dirty.add(key);
  if (pushing.has(key)) return;
  pushing.add(key);
  (async () => {
    try {
      while (dirty.has(key)) {
        dirty.delete(key);
        await pushOnce(key);
      }
      failed.delete(key);
      if (failed.size === 0) setStatus('online');
    } catch (err) {
      console.warn("Markaziy bazaga saqlashda uzilish, qayta uriniladi:", key, err);
      failed.add(key);
      setStatus('offline');
    } finally {
      pushing.delete(key);
    }
  })();
}

// ---- Ommaviy API ----
export function isShared(key: string): boolean {
  return keys.includes(key);
}

export function hasShared(key: string): boolean {
  return cache.has(key);
}

export function getShared<T>(key: string, fallback: T): T {
  return cache.has(key) ? (cache.get(key) as T) : fallback;
}

export function setShared(key: string, value: unknown): void {
  cache.set(key, value);
  schedulePush(key);
}

/**
 * Markaziy bazani to'liq 0 qilish (barcha o'quvchilar, ustozlar, testlar va chatlarni tozalash)
 */
export async function resetCentralDatabase(adminSecret?: string): Promise<boolean> {
  try {
    const res = await fetchJson('/api/store/reset', {
      method: 'POST',
      headers: { 'x-admin-secret': adminSecret || '' },
    });
    if (!res.ok) return false;
    const data: {
      ok: boolean;
      keys: Record<string, { value: unknown; version: number }>;
      backend?: string;
    } = await res.json();
    if (data.backend) activeBackendName = data.backend;
    dirty.clear();
    failed.clear();
    for (const key of keys) {
      const row = data.keys?.[key];
      cache.set(key, row ? row.value : []);
      base.set(key, row ? row.value : []);
      versions.set(key, row ? row.version : 100);
    }
    purgeBrowserLocalStorageForSharedKeys(keys);
    setStatus('online');
    notifyChanged();
    return true;
  } catch (err) {
    console.error("Markaziy bazani tozalashda xato:", err);
    return false;
  }
}

export async function pull(): Promise<boolean> {
  const res = await fetchJson('/api/store');
  if (!res.ok) throw new Error(`Server javobi: ${res.status}`);
  const data: {
    keys: Record<string, { value: unknown; version: number }>;
    backend?: string;
  } = await res.json();
  if (data.backend) activeBackendName = data.backend;

  let changed = false;
  for (const key of keys) {
    const row = data.keys[key];
    if (!row) continue;
    if (dirty.has(key) || pushing.has(key) || failed.has(key)) continue;
    if (versions.get(key) === row.version) continue;
    cache.set(key, row.value);
    base.set(key, row.value);
    versions.set(key, row.version);
    changed = true;
  }
  return changed;
}

export async function initRemote(sharedKeys: string[]): Promise<void> {
  keys = sharedKeys;
  // Brauzerning localStorage xotirasidagi eski umumiy jadvallarni o'chiramiz
  purgeBrowserLocalStorageForSharedKeys(sharedKeys);

  try {
    const res = await fetchJson('/api/store');
    if (!res.ok) throw new Error(`Server javobi: ${res.status}`);
    const data: {
      keys: Record<string, { value: unknown; version: number }>;
      backend?: string;
    } = await res.json();
    if (data.backend) activeBackendName = data.backend;

    for (const key of keys) {
      const row = data.keys[key];
      if (row) {
        cache.set(key, row.value);
        base.set(key, row.value);
        versions.set(key, row.version);
      } else {
        cache.set(key, []);
        base.set(key, []);
        versions.set(key, 1);
      }
    }
    setStatus('online');
  } catch (err) {
    console.warn("Markaziy bazaga ulanish kutilmoqda:", err);
    for (const key of keys) {
      if (!cache.has(key)) {
        cache.set(key, []);
        base.set(key, []);
        versions.set(key, 0);
      }
    }
    setStatus('offline');
  }
}

export function startPolling(intervalMs = 4000): void {
  if (pollTimer) return;
  pollTimer = setInterval(async () => {
    try {
      for (const key of [...failed]) {
        failed.delete(key);
        if (!versions.has(key)) versions.set(key, 0);
        schedulePush(key);
      }
      if (await pull()) notifyChanged();
      if (failed.size === 0 && pushing.size === 0) setStatus('online');
    } catch {
      setStatus('offline');
    }
  }, intervalMs);
}
