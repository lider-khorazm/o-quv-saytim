// Markaziy ma'lumot ombori (barcha kompyuterlar, telefonlar va foydalanuvchilar uchun YAGONA BAZA).
// 1-daraja (Asosiy): Render PostgreSQL / Cloud SQL (DATABASE_URL yoki SQL_HOST orqali).
// 2-daraja (Bulutli Zaxira): Cloud Firestore + Server Fayl ombori (data/store.json).
import fs from 'fs';
import path from 'path';
import { createPool, hasPostgresConfig } from './src/db/index.ts';

// Brauzerlar o'rtasida yagona bazada bo'lishiladigan barcha kalitlar
// (src/services/storage.ts bilan bir xil bo'lishi shart).
// AUTH_USER ATAYLAB yo'q: kim tizimga kirgani har bir brauzerda alohida sessiya bo'lib qoladi.
export const SHARED_KEYS = [
  'devmaster_teachers_v3',
  'devmaster_students_v2',
  'devmaster_certificates_v2',
  'devmaster_generated_tests_v2',
  'devmaster_test_submissions_v2',
  'devmaster_expel_requests_v2',
  'devmaster_notifications_v2',
  'devmaster_group_messages_v2',
  'devmaster_portfolio_projects_v1',
  'devmaster_ai_friend_personas_v1',
  'devmaster_feedback_reports_v1',
  'devmaster_sub_admins_v1',
  'devmaster_ai_memories_v1',
];

export interface Row {
  value: unknown;
  version: number;
}
export type PutResult = { ok: true; version: number } | { ok: false; current: Row | null };

export interface Backend {
  name: 'postgres' | 'cloud-firestore' | 'file';
  init(): Promise<void>;
  all(): Promise<Record<string, Row>>;
  put(key: string, value: unknown, baseVersion: number): Promise<PutResult>;
  resetAll(): Promise<Record<string, Row>>;
}

// ---------------- 1. PostgreSQL (Render / Cloud SQL Asosiy Baza) ----------------
function postgresBackend(): Backend {
  const pool = createPool();
  const getRow = async (key: string): Promise<Row | null> => {
    const r = await pool.query('SELECT value, version FROM kv_store WHERE key = $1', [key]);
    return r.rows[0] ? { value: r.rows[0].value, version: r.rows[0].version } : null;
  };
  return {
    name: 'postgres',
    async init() {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kv_store (
          key text PRIMARY KEY,
          value jsonb NOT NULL,
          version integer NOT NULL DEFAULT 1,
          updated_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY, uid text NOT NULL UNIQUE, email text NOT NULL,
          name text, role text DEFAULT 'student', created_at timestamp DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS staff_members (
          id serial PRIMARY KEY, name text NOT NULL, role text NOT NULL,
          login text NOT NULL UNIQUE, password text NOT NULL,
          assigned_by text DEFAULT 'legend_o1', status text DEFAULT 'active',
          created_at timestamp DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS staff_messages (
          id serial PRIMARY KEY, sender_name text NOT NULL, sender_role text NOT NULL,
          sender_login text NOT NULL, text text NOT NULL, is_urgent text DEFAULT 'false',
          created_at timestamp DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS claimed_gifts (
          id serial PRIMARY KEY, student_name text NOT NULL,
          student_email text NOT NULL UNIQUE, gift_code text NOT NULL,
          gift_title text NOT NULL, claimed_at timestamp DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS student_projects (
          id serial PRIMARY KEY, title text NOT NULL, student_name text NOT NULL,
          student_email text NOT NULL, student_city text, category text NOT NULL,
          description text, html_code text NOT NULL, status text DEFAULT 'pending',
          likes integer DEFAULT 0, created_at timestamp DEFAULT now()
        );
      `);
      // Har bir SHARED_KEY uchun boshlang'ich bo'sh yozuv mavjudligini ta'minlaymiz
      for (const k of SHARED_KEYS) {
        await pool.query(
          'INSERT INTO kv_store (key, value, version) VALUES ($1, $2::jsonb, 1) ON CONFLICT (key) DO NOTHING',
          [k, JSON.stringify([])]
        );
      }
    },
    async all() {
      const r = await pool.query('SELECT key, value, version FROM kv_store');
      const out: Record<string, Row> = {};
      for (const row of r.rows) out[row.key] = { value: row.value, version: row.version };
      for (const k of SHARED_KEYS) {
        if (!out[k]) out[k] = { value: [], version: 1 };
      }
      return out;
    },
    async put(key, value, baseVersion) {
      const json = JSON.stringify(value);
      if (baseVersion === 0) {
        const ins = await pool.query(
          'INSERT INTO kv_store (key, value, version) VALUES ($1, $2::jsonb, 1) ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, version = kv_store.version + 1, updated_at = now() RETURNING version',
          [key, json]
        );
        if (ins.rows[0]) return { ok: true, version: ins.rows[0].version };
        return { ok: false, current: await getRow(key) };
      }
      const upd = await pool.query(
        'UPDATE kv_store SET value = $2::jsonb, version = version + 1, updated_at = now() WHERE key = $1 AND version = $3 RETURNING version',
        [key, json, baseVersion]
      );
      if (upd.rows[0]) return { ok: true, version: upd.rows[0].version };
      return { ok: false, current: await getRow(key) };
    },
    async resetAll() {
      const out: Record<string, Row> = {};
      for (const k of SHARED_KEYS) {
        const r = await pool.query(
          `INSERT INTO kv_store (key, value, version, updated_at)
           VALUES ($1, '[]'::jsonb, 100, now())
           ON CONFLICT (key) DO UPDATE
           SET value = '[]'::jsonb, version = kv_store.version + 10, updated_at = now()
           RETURNING version`,
          [k]
        );
        out[k] = { value: [], version: r.rows[0]?.version ?? 100 };
      }
      return out;
    },
  };
}

// ---------------- 2. Bulutli Zaxira + Markaziy Server Ombori ----------------
interface FirebaseAppletConfig {
  projectId?: string;
  apiKey?: string;
  firestoreDatabaseId?: string;
}

function loadFirebaseConfig(): FirebaseAppletConfig | null {
  try {
    const cfgPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(cfgPath)) return null;
    return JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  } catch {
    return null;
  }
}

function cloudAndFileBackend(): Backend {
  const dir = path.resolve(process.cwd(), 'data');
  const file = path.join(dir, 'store.json');
  const fbCfg = loadFirebaseConfig();
  let data: Record<string, Row> = {};

  const getFirestoreDocUrl = (key: string) => {
    if (!fbCfg?.projectId || !fbCfg?.apiKey) return null;
    const dbId = fbCfg.firestoreDatabaseId || '(default)';
    return `https://firestore.googleapis.com/v1/projects/${fbCfg.projectId}/databases/${dbId}/documents/devmaster_shared_store/${encodeURIComponent(key)}?key=${fbCfg.apiKey}`;
  };

  const saveLocalFile = () => {
    try {
      fs.mkdirSync(dir, { recursive: true });
      const tmp = file + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify(data));
      fs.renameSync(tmp, file);
    } catch (e) {
      console.warn('Faylga yozishda ogohlantirish:', e);
    }
  };

  const pushKeyToCloudFirestore = async (key: string, row: Row) => {
    const url = getFirestoreDocUrl(key);
    if (!url) return;
    try {
      await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            jsonValue: { stringValue: JSON.stringify(row.value) },
            version: { integerValue: String(row.version) },
            updatedAt: { stringValue: new Date().toISOString() },
          },
        }),
      });
    } catch {
      // Cloud Firestore rules yoki tarmoq cheklovi bo'lsa lokal faylda davom etadi
    }
  };

  const pullKeyFromCloudFirestore = async (key: string): Promise<Row | null> => {
    const url = getFirestoreDocUrl(key);
    if (!url) return null;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const doc = await res.json();
      const jsonStr = doc?.fields?.jsonValue?.stringValue;
      const verStr = doc?.fields?.version?.integerValue;
      if (typeof jsonStr === 'string' && verStr !== undefined) {
        return { value: JSON.parse(jsonStr), version: parseInt(String(verStr), 10) || 1 };
      }
    } catch {
      // ignore
    }
    return null;
  };

  return {
    name: fbCfg?.projectId ? 'cloud-firestore' : 'file',
    async init() {
      try {
        if (fs.existsSync(file)) {
          data = JSON.parse(fs.readFileSync(file, 'utf8'));
        }
      } catch {
        data = {};
      }

      // Bulutli Firestore dan eng so'nggi versiyalarni tekshirib olamiz
      await Promise.all(
        SHARED_KEYS.map(async (k) => {
          const cloudRow = await pullKeyFromCloudFirestore(k);
          const localRow = data[k];
          if (cloudRow && (!localRow || cloudRow.version > localRow.version)) {
            data[k] = cloudRow;
          } else if (!localRow) {
            data[k] = { value: [], version: 1 };
            void pushKeyToCloudFirestore(k, data[k]);
          } else {
            void pushKeyToCloudFirestore(k, localRow);
          }
        })
      );
      saveLocalFile();
    },
    async all() {
      for (const k of SHARED_KEYS) {
        if (!data[k]) data[k] = { value: [], version: 1 };
      }
      return data;
    },
    async put(key, value, baseVersion) {
      const cur = data[key];
      const curVer = cur?.version ?? 0;
      if (baseVersion !== 0 && curVer !== baseVersion) {
        return { ok: false, current: cur ?? { value: [], version: 1 } };
      }
      const version = curVer + 1;
      const nextRow: Row = { value, version };
      data[key] = nextRow;
      saveLocalFile();
      void pushKeyToCloudFirestore(key, nextRow);
      return { ok: true, version };
    },
    async resetAll() {
      for (const k of SHARED_KEYS) {
        const nextVer = (data[k]?.version ?? 1) + 10;
        data[k] = { value: [], version: nextVer };
        void pushKeyToCloudFirestore(k, data[k]);
      }
      saveLocalFile();
      return data;
    },
  };
}

export let store: Backend = cloudAndFileBackend();

export async function initStore(): Promise<void> {
  if (hasPostgresConfig) {
    try {
      const pg = postgresBackend();
      await pg.init();
      store = pg;
      console.log("Ma'lumotlar ombori: Yagona PostgreSQL bazasi muvaffaqiyatli ulandi!");
      return;
    } catch (err) {
      console.error("OGOHLANTIRISH: Postgres ga ulanib bo'lmadi, Bulutli Markaziy Baza ishlatiladi:", err);
    }
  } else {
    console.log("Ma'lumotlar ombori: Bulutli Markaziy Baza (Cloud + Server Store) faollashtirildi.");
  }
  store = cloudAndFileBackend();
  await store.init();
}
