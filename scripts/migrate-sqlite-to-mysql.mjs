import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { loadEnv } from '../server/env.mjs';

loadEnv();

const sqlitePath = resolve(process.cwd(), '.careconnect-local.sqlite');

if (!existsSync(sqlitePath)) {
  throw new Error(`SQLite database was not found: ${sqlitePath}`);
}

const { closeMySqlPool, mysqlServiceNowFetch } = await import('../server/mysql-servicenow.mjs');
const sqlite = new DatabaseSync(sqlitePath, { readOnly: true });
const rows = sqlite.prepare(`
  SELECT table_name, sys_id, record_json
  FROM local_table_records
  ORDER BY table_name, created_at
`).all();

let created = 0;
let updated = 0;

for (const row of rows) {
  const tablePath = `/api/now/table/${encodeURIComponent(row.table_name)}`;
  const recordPath = `${tablePath}/${encodeURIComponent(row.sys_id)}`;
  const record = JSON.parse(row.record_json);

  try {
    await mysqlServiceNowFetch(recordPath);
    await mysqlServiceNowFetch(recordPath, {
      method: 'PATCH',
      body: JSON.stringify(record),
    });
    updated += 1;
  } catch (error) {
    if (error?.status !== 404) throw error;
    await mysqlServiceNowFetch(tablePath, {
      method: 'POST',
      body: JSON.stringify({ ...record, sys_id: row.sys_id }),
    });
    created += 1;
  }
}

sqlite.close();
await closeMySqlPool();

console.log(`SQLite to MySQL migration complete: ${created} created, ${updated} updated.`);
