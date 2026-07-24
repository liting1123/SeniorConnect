import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';

const databasePath = resolve(
  process.cwd(),
  String(process.env.LOCAL_DATABASE_PATH || '.careconnect-local.sqlite').trim(),
);
const database = new DatabaseSync(databasePath);

database.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS local_table_records (
    table_name TEXT NOT NULL,
    sys_id TEXT NOT NULL,
    record_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (table_name, sys_id)
  );

  CREATE INDEX IF NOT EXISTS idx_local_records_table_updated
    ON local_table_records (table_name, updated_at DESC);
`);

const selectRecord = database.prepare(`
  SELECT record_json
  FROM local_table_records
  WHERE table_name = ? AND sys_id = ?
`);
const selectTable = database.prepare(`
  SELECT record_json
  FROM local_table_records
  WHERE table_name = ?
`);
const insertRecord = database.prepare(`
  INSERT INTO local_table_records (
    table_name, sys_id, record_json, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?)
`);
const updateRecord = database.prepare(`
  UPDATE local_table_records
  SET record_json = ?, updated_at = ?
  WHERE table_name = ? AND sys_id = ?
`);
const deleteRecord = database.prepare(`
  DELETE FROM local_table_records
  WHERE table_name = ? AND sys_id = ?
`);

function serviceNowDateTime(value = new Date()) {
  return value.toISOString().slice(0, 19).replace('T', ' ');
}

function parseBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
}

function parseRecord(row) {
  return row?.record_json ? JSON.parse(row.record_json) : null;
}

function comparableValue(value) {
  if (value && typeof value === 'object') {
    return String(value.value || value.sys_id || value.display_value || '');
  }

  return String(value ?? '');
}

function getFieldValue(record, field) {
  return field === 'sys_id' ? record.sys_id : record[field];
}

function parseCondition(token) {
  const operators = ['STARTSWITH', 'ENDSWITH', 'LIKE', 'IN', '!=', '>=', '<=', '>', '<', '='];

  for (const operator of operators) {
    const index = token.indexOf(operator);
    if (index > 0) {
      return {
        field: token.slice(0, index),
        operator,
        expected: token.slice(index + operator.length),
      };
    }
  }

  return null;
}

function conditionMatches(record, condition) {
  const actualRaw = comparableValue(getFieldValue(record, condition.field));
  const expectedRaw = String(condition.expected || '');
  const actual = actualRaw.toLowerCase();
  const expected = expectedRaw.toLowerCase();

  switch (condition.operator) {
    case '=':
      return actual === expected;
    case '!=':
      return actual !== expected;
    case 'LIKE':
      return actual.includes(expected);
    case 'STARTSWITH':
      return actual.startsWith(expected);
    case 'ENDSWITH':
      return actual.endsWith(expected);
    case 'IN':
      return expectedRaw.split(',').map((value) => value.trim().toLowerCase()).includes(actual);
    case '>':
      return actualRaw > expectedRaw;
    case '<':
      return actualRaw < expectedRaw;
    case '>=':
      return actualRaw >= expectedRaw;
    case '<=':
      return actualRaw <= expectedRaw;
    default:
      return true;
  }
}

function applyEncodedQuery(records, encodedQuery = '') {
  const tokens = String(encodedQuery || '')
    .split('^')
    .map((token) => token.trim())
    .filter(Boolean);
  const orderBy = [];
  const conditions = [];
  let hasOr = false;

  for (let token of tokens) {
    if (token.startsWith('ORDERBYDESC')) {
      orderBy.push({ field: token.slice('ORDERBYDESC'.length), direction: -1 });
      continue;
    }
    if (token.startsWith('ORDERBYASC')) {
      orderBy.push({ field: token.slice('ORDERBYASC'.length), direction: 1 });
      continue;
    }
    if (token.startsWith('ORDERBY')) {
      orderBy.push({ field: token.slice('ORDERBY'.length), direction: 1 });
      continue;
    }
    if (token.startsWith('OR')) {
      hasOr = true;
      token = token.slice(2);
    }

    const condition = parseCondition(token);
    if (condition) {
      conditions.push(condition);
    }
  }

  let filtered = records;
  if (conditions.length > 0) {
    filtered = records.filter((record) => {
      const results = conditions.map((condition) => conditionMatches(record, condition));
      return hasOr ? results.some(Boolean) : results.every(Boolean);
    });
  }

  if (orderBy.length > 0) {
    filtered.sort((left, right) => {
      for (const ordering of orderBy) {
        const leftValue = comparableValue(getFieldValue(left, ordering.field));
        const rightValue = comparableValue(getFieldValue(right, ordering.field));
        const comparison = leftValue.localeCompare(rightValue, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
        if (comparison !== 0) {
          return comparison * ordering.direction;
        }
      }
      return 0;
    });
  }

  return filtered;
}

function selectFields(record, fieldsValue) {
  const fields = String(fieldsValue || '')
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean);

  if (fields.length === 0) {
    return record;
  }

  return Object.fromEntries(
    fields
      .filter((field) => Object.hasOwn(record, field))
      .map((field) => [field, record[field]]),
  );
}

function parseTablePath(path) {
  const url = new URL(path, 'http://local.careconnect');
  const match = url.pathname.match(/^\/api\/now\/table\/([^/]+)(?:\/([^/]+))?$/);

  if (!match) {
    throw Object.assign(new Error(`Unsupported local Table API path: ${url.pathname}`), { status: 400 });
  }

  return {
    table: decodeURIComponent(match[1]),
    sysId: match[2] ? decodeURIComponent(match[2]) : '',
    searchParams: url.searchParams,
  };
}

function getRecord(table, sysId) {
  return parseRecord(selectRecord.get(table, sysId));
}

export function localServiceNowFetch(path, options = {}) {
  const { table, sysId, searchParams } = parseTablePath(path);
  const method = String(options.method || 'GET').toUpperCase();

  if (method === 'GET' && sysId) {
    const record = getRecord(table, sysId);
    if (!record) {
      throw Object.assign(new Error(`Record was not found in local table ${table}.`), { status: 404 });
    }
    return { result: selectFields(record, searchParams.get('sysparm_fields')) };
  }

  if (method === 'GET') {
    const records = selectTable.all(table).map(parseRecord);
    const queried = applyEncodedQuery(records, searchParams.get('sysparm_query'));
    const offset = Math.max(0, Number(searchParams.get('sysparm_offset')) || 0);
    const requestedLimit = Number(searchParams.get('sysparm_limit'));
    const limit = requestedLimit > 0 ? requestedLimit : queried.length;
    const result = queried
      .slice(offset, offset + limit)
      .map((record) => selectFields(record, searchParams.get('sysparm_fields')));
    return { result };
  }

  if (method === 'POST') {
    const now = serviceNowDateTime();
    const payload = parseBody(options.body);
    const recordId = String(payload.sys_id || crypto.randomBytes(16).toString('hex'));
    const record = {
      ...payload,
      sys_id: recordId,
      sys_created_on: payload.sys_created_on || now,
      sys_updated_on: now,
    };
    insertRecord.run(table, recordId, JSON.stringify(record), now, now);
    return { result: record };
  }

  if (method === 'PATCH' && sysId) {
    const current = getRecord(table, sysId);
    if (!current) {
      throw Object.assign(new Error(`Record was not found in local table ${table}.`), { status: 404 });
    }
    const now = serviceNowDateTime();
    const record = {
      ...current,
      ...parseBody(options.body),
      sys_id: sysId,
      sys_updated_on: now,
    };
    updateRecord.run(JSON.stringify(record), now, table, sysId);
    return { result: record };
  }

  if (method === 'DELETE' && sysId) {
    const current = getRecord(table, sysId);
    if (!current) {
      throw Object.assign(new Error(`Record was not found in local table ${table}.`), { status: 404 });
    }
    deleteRecord.run(table, sysId);
    return { result: current };
  }

  throw Object.assign(new Error(`Unsupported local Table API operation: ${method} ${path}`), { status: 405 });
}

export function getLocalServiceNowInfo() {
  const tables = database.prepare(`
    SELECT table_name AS tableName, COUNT(*) AS records
    FROM local_table_records
    GROUP BY table_name
    ORDER BY table_name
  `).all();

  return {
    mode: 'local',
    path: databasePath,
    tables: tables.map((entry) => ({
      tableName: entry.tableName,
      records: Number(entry.records) || 0,
    })),
  };
}
