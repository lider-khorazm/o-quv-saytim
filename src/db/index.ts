import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.ts';

declare global {
  var _postgresPool: Pool | undefined;
}

function getValidDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL?.trim().replace(/^['"]|['"]$/g, '');
  if (!raw) return undefined;
  if (!/^postgres(ql)?:\/\//i.test(raw)) {
    return undefined;
  }
  // Agar parol ichida kodlanmagan '@' belgisi bo'lsa, oxirgi '@' oldidagi parolni URL-encode qilamiz
  let normalized = raw;
  const schemeEnd = raw.indexOf('://') + 3;
  const rest = raw.slice(schemeEnd);
  const lastAt = rest.lastIndexOf('@');
  const firstAt = rest.indexOf('@');
  if (firstAt !== -1 && firstAt !== lastAt) {
    const userInfo = rest.slice(0, lastAt);
    const hostAndPath = rest.slice(lastAt + 1);
    const colonIdx = userInfo.indexOf(':');
    if (colonIdx !== -1) {
      const user = userInfo.slice(0, colonIdx);
      const pass = userInfo.slice(colonIdx + 1);
      normalized = `${raw.slice(0, schemeEnd)}${user}:${encodeURIComponent(pass)}@${hostAndPath}`;
    }
  }

  try {
    const parsed = new URL(normalized);
    const host = parsed.hostname.toLowerCase();
    // Noto'g'ri namuna hostlarni ("base", "host", "example") e'tiborsiz qoldiramiz
    if (!host || host === 'base' || host === 'host' || host === 'your-host') {
      return undefined;
    }
  } catch {
    return undefined;
  }

  return normalized;
}

const validDatabaseUrl = getValidDatabaseUrl();
const validSqlHost =
  process.env.SQL_HOST?.trim() &&
  !['base', 'host', 'your-host'].includes(process.env.SQL_HOST.trim().toLowerCase())
    ? process.env.SQL_HOST.trim()
    : undefined;

/** Postgres ulanishi sozlanganmi? (DATABASE_URL yoki SQL_HOST) */
export const hasPostgresConfig = Boolean(validDatabaseUrl || validSqlHost);

export const createPool = () => {
  if (!global._postgresPool) {
    const url = getValidDatabaseUrl();
    // Supabase / Neon / Render tashqi ulanishlari SSL talab qiladi.
    // Render ichki tarmog'i (dpg-...) yoki localhost uchun SSL avto-moslashadi.
    const isLocalOrInternal =
      url && (url.includes('localhost') || url.includes('127.0.0.1') || !url.includes('.'));
    const ssl =
      process.env.DATABASE_SSL === 'false' || isLocalOrInternal
        ? false
        : { rejectUnauthorized: false };

    global._postgresPool = url
      ? new Pool({ connectionString: url, ssl, max: 10, connectionTimeoutMillis: 15000 })
      : new Pool({
          host: validSqlHost,
          user: process.env.SQL_ADMIN_USER || process.env.SQL_USER,
          password: process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD,
          database: process.env.SQL_DB_NAME,
          max: 10,
          connectionTimeoutMillis: 15000,
        });

    global._postgresPool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
    });
  }
  return global._postgresPool;
};

const pool = createPool();
export const db = drizzle(pool, { schema });
