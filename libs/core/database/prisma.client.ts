import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dns from 'dns';

// Force all DNS lookups to IPv4 — Render free tier blocks outbound IPv6
dns.setDefaultResultOrder('ipv4first');

function resolveHostIPv4(host: string): Promise<string> {
  return new Promise((resolve, reject) => {
    dns.lookup(host, { family: 4 }, (err, address) => {
      if (err) reject(err);
      else resolve(address);
    });
  });
}

// Lazily-initialized singletons.
// Prisma v7 uses the "client" engine which requires a driver adapter (PrismaPg).
//
// WHY LAZY? tsx/esbuild hoists all `import` statements to the top of the
// compiled CJS output, so this module is evaluated BEFORE dotenv.config()
// runs in server.ts. If we called `new Pool(...)` here, DATABASE_URL would
// be undefined. Deferring creation to first use (during the first request)
// guarantees the env vars are already loaded.
const g = global as unknown as { _pool?: Pool; _prisma?: PrismaClient; _poolInit?: Promise<Pool> };

function parseDbUrl(raw: string) {
  const u = new URL(raw);
  return {
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    host: u.hostname,
    port: parseInt(u.port, 10) || 5432,
    database: u.pathname.replace(/^\//, ''),
  };
}

async function getPool(): Promise<Pool> {
  if (g._pool) return g._pool;
  if (g._poolInit) return g._poolInit;

  g._poolInit = (async () => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error('DATABASE_URL is not set');
    const parsed = parseDbUrl(dbUrl);
    if (process.env.DB_PASSWORD) parsed.password = process.env.DB_PASSWORD;

    // Resolve hostname to IPv4 address before connecting
    const resolvedHost = await resolveHostIPv4(parsed.host);

    g._pool = new Pool({
      ...parsed,
      host: resolvedHost,
      max: 10,
      min: 2,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: { rejectUnauthorized: false },
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });
    return g._pool;
  })();

  return g._poolInit;
}

async function getPrisma(): Promise<PrismaClient> {
  if (g._prisma) return g._prisma;
  const pool = await getPool();
  g._prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
  return g._prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    const p = getPrisma().then(p => p as any);
    if (prop === 'then') return undefined; // prevent unhandled promise rejection
    return (...args: unknown[]) => getPrisma().then(p => (p as any)[prop](...args));
  },
});

export default prisma;
