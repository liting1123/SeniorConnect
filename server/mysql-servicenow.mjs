import crypto from 'node:crypto';
import mysql from 'mysql2/promise';

let pool;
const knownColumns = new Map();

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: String(process.env.MYSQL_HOST || '127.0.0.1').trim(),
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: String(process.env.MYSQL_USER || 'careconnect').trim(),
      password: String(process.env.MYSQL_PASSWORD || ''),
      database: String(process.env.MYSQL_DATABASE || 'careconnect').trim(),
      waitForConnections: true,
      connectionLimit: 10,
      dateStrings: true,
      charset: 'utf8mb4',
    });
  }

  return pool;
}

function assertIdentifier(value, label) {
  const identifier = String(value || '').trim();
  if (!/^[a-zA-Z0-9_]+$/.test(identifier)) {
    throw Object.assign(new Error(`Invalid MySQL ${label}: ${identifier}`), { status: 400 });
  }
  return identifier;
}

function quoteIdentifier(value, label = 'identifier') {
  return `\`${assertIdentifier(value, label)}\``;
}

function serviceNowDateTime(value = new Date()) {
  return value.toISOString().slice(0, 19).replace('T', ' ');
}

function parseBody(body) {
  if (!body) return {};
  return typeof body === 'string' ? JSON.parse(body) : body;
}

function comparableValue(value) {
  if (value && typeof value === 'object') {
    return String(value.value || value.sys_id || value.display_value || '');
  }
  return String(value ?? '');
}

function normalizeStoredValue(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function getFieldValue(record, field) {
  return record[field];
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
    case '=': return actual === expected;
    case '!=': return actual !== expected;
    case 'LIKE': return actual.includes(expected);
    case 'STARTSWITH': return actual.startsWith(expected);
    case 'ENDSWITH': return actual.endsWith(expected);
    case 'IN':
      return expectedRaw.split(',').map((value) => value.trim().toLowerCase()).includes(actual);
    case '>': return actualRaw > expectedRaw;
    case '<': return actualRaw < expectedRaw;
    case '>=': return actualRaw >= expectedRaw;
    case '<=': return actualRaw <= expectedRaw;
    default: return true;
  }
}

function applyEncodedQuery(records, encodedQuery = '') {
  const tokens = String(encodedQuery || '').split('^').map((token) => token.trim()).filter(Boolean);
  const conditions = [];
  const orderBy = [];
  let hasOr = false;

  for (let token of tokens) {
    if (token.startsWith('ORDERBYDESC')) {
      orderBy.push({ field: token.slice(11), direction: -1 });
      continue;
    }
    if (token.startsWith('ORDERBYASC')) {
      orderBy.push({ field: token.slice(10), direction: 1 });
      continue;
    }
    if (token.startsWith('ORDERBY')) {
      orderBy.push({ field: token.slice(7), direction: 1 });
      continue;
    }
    if (token.startsWith('OR')) {
      hasOr = true;
      token = token.slice(2);
    }
    const condition = parseCondition(token);
    if (condition) conditions.push(condition);
  }

  let filtered = records;
  if (conditions.length) {
    filtered = records.filter((record) => {
      const results = conditions.map((condition) => conditionMatches(record, condition));
      return hasOr ? results.some(Boolean) : results.every(Boolean);
    });
  }

  if (orderBy.length) {
    filtered.sort((left, right) => {
      for (const ordering of orderBy) {
        const comparison = comparableValue(left[ordering.field]).localeCompare(
          comparableValue(right[ordering.field]),
          undefined,
          { numeric: true, sensitivity: 'base' },
        );
        if (comparison) return comparison * ordering.direction;
      }
      return 0;
    });
  }

  return filtered;
}

function selectFields(record, fieldsValue) {
  const fields = String(fieldsValue || '').split(',').map((field) => field.trim()).filter(Boolean);
  if (!fields.length) return record;
  return Object.fromEntries(
    fields.filter((field) => Object.hasOwn(record, field)).map((field) => [field, record[field]]),
  );
}

function parseTablePath(path) {
  const url = new URL(path, 'http://mysql.careconnect');
  const match = url.pathname.match(/^\/api\/now\/table\/([^/]+)(?:\/([^/]+))?$/);
  if (!match) {
    throw Object.assign(new Error(`Unsupported MySQL Table API path: ${url.pathname}`), { status: 400 });
  }
  return {
    table: assertIdentifier(decodeURIComponent(match[1]), 'table name'),
    sysId: match[2] ? decodeURIComponent(match[2]) : '',
    searchParams: url.searchParams,
  };
}

async function ensureTable(table) {
  const quotedTable = quoteIdentifier(table, 'table name');
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS ${quotedTable} (
      sys_id CHAR(32) NOT NULL PRIMARY KEY,
      sys_created_on DATETIME NOT NULL,
      sys_updated_on DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  if (!knownColumns.has(table)) {
    const [columns] = await getPool().query(`SHOW COLUMNS FROM ${quotedTable}`);
    knownColumns.set(table, new Set(columns.map((column) => column.Field)));
  }
}

async function ensureColumns(table, fieldNames) {
  await ensureTable(table);
  const columns = knownColumns.get(table);
  for (const fieldName of fieldNames) {
    const field = assertIdentifier(fieldName, 'column name');
    if (columns.has(field)) continue;
    try {
      await getPool().query(
        `ALTER TABLE ${quoteIdentifier(table, 'table name')} ADD COLUMN ${quoteIdentifier(field, 'column name')} TEXT NULL`,
      );
    } catch (error) {
      if (error?.code !== 'ER_DUP_FIELDNAME') throw error;
    }
    columns.add(field);
  }
}

async function getRecord(table, sysId) {
  await ensureTable(table);
  const [rows] = await getPool().execute(
    `SELECT * FROM ${quoteIdentifier(table, 'table name')} WHERE sys_id = ? LIMIT 1`,
    [sysId],
  );
  return rows[0] || null;
}

export async function mysqlServiceNowFetch(path, options = {}) {
  const { table, sysId, searchParams } = parseTablePath(path);
  const method = String(options.method || 'GET').toUpperCase();
  await ensureTable(table);

  if (method === 'GET' && sysId) {
    const record = await getRecord(table, sysId);
    if (!record) {
      throw Object.assign(new Error(`Record was not found in MySQL table ${table}.`), { status: 404 });
    }
    return { result: selectFields(record, searchParams.get('sysparm_fields')) };
  }

  if (method === 'GET') {
    const [rows] = await getPool().query(`SELECT * FROM ${quoteIdentifier(table, 'table name')}`);
    const queried = applyEncodedQuery(rows, searchParams.get('sysparm_query'));
    const offset = Math.max(0, Number(searchParams.get('sysparm_offset')) || 0);
    const requestedLimit = Number(searchParams.get('sysparm_limit'));
    const limit = requestedLimit > 0 ? requestedLimit : queried.length;
    return {
      result: queried
        .slice(offset, offset + limit)
        .map((record) => selectFields(record, searchParams.get('sysparm_fields'))),
    };
  }

  if (method === 'POST') {
    const payload = parseBody(options.body);
    const recordId = String(payload.sys_id || crypto.randomBytes(16).toString('hex'));
    const now = serviceNowDateTime();
    const customFields = Object.keys(payload).filter(
      (field) => !['sys_id', 'sys_created_on', 'sys_updated_on'].includes(field),
    );
    await ensureColumns(table, customFields);
    const record = {
      ...Object.fromEntries(customFields.map((field) => [field, normalizeStoredValue(payload[field])])),
      sys_id: recordId,
      sys_created_on: payload.sys_created_on || now,
      sys_updated_on: payload.sys_updated_on || now,
    };
    const fields = Object.keys(record);
    await getPool().execute(
      `INSERT INTO ${quoteIdentifier(table, 'table name')} (${fields.map((field) => quoteIdentifier(field, 'column name')).join(', ')})
       VALUES (${fields.map(() => '?').join(', ')})`,
      fields.map((field) => record[field]),
    );
    return { result: record };
  }

  if (method === 'PATCH' && sysId) {
    const current = await getRecord(table, sysId);
    if (!current) {
      throw Object.assign(new Error(`Record was not found in MySQL table ${table}.`), { status: 404 });
    }
    const payload = parseBody(options.body);
    const customFields = Object.keys(payload).filter(
      (field) => !['sys_id', 'sys_created_on', 'sys_updated_on'].includes(field),
    );
    await ensureColumns(table, customFields);
    const updates = {
      ...Object.fromEntries(customFields.map((field) => [field, normalizeStoredValue(payload[field])])),
      sys_updated_on: serviceNowDateTime(),
    };
    const fields = Object.keys(updates);
    await getPool().execute(
      `UPDATE ${quoteIdentifier(table, 'table name')}
       SET ${fields.map((field) => `${quoteIdentifier(field, 'column name')} = ?`).join(', ')}
       WHERE sys_id = ?`,
      [...fields.map((field) => updates[field]), sysId],
    );
    return { result: { ...current, ...updates, sys_id: sysId } };
  }

  if (method === 'DELETE' && sysId) {
    const current = await getRecord(table, sysId);
    if (!current) {
      throw Object.assign(new Error(`Record was not found in MySQL table ${table}.`), { status: 404 });
    }
    await getPool().execute(
      `DELETE FROM ${quoteIdentifier(table, 'table name')} WHERE sys_id = ?`,
      [sysId],
    );
    return { result: current };
  }

  throw Object.assign(new Error(`Unsupported MySQL Table API operation: ${method} ${path}`), { status: 405 });
}

export function getMySqlServiceNowInfo() {
  return {
    mode: 'mysql',
    host: String(process.env.MYSQL_HOST || '127.0.0.1').trim(),
    port: Number(process.env.MYSQL_PORT) || 3306,
    database: String(process.env.MYSQL_DATABASE || 'careconnect').trim(),
    user: String(process.env.MYSQL_USER || 'careconnect').trim(),
  };
}

export async function closeMySqlPool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
