const REQUIRED_FIELDS = [
  'SERVICE_NOW_INSTANCE_URL',
  'SERVICE_NOW_TABLE',
  'SERVICE_NOW_USERNAME',
  'SERVICE_NOW_PASSWORD',
];

const FIELD_MAP = {
  userId: process.env.SERVICE_NOW_FIELD_USER_ID || 'u_user_id',
  email: process.env.SERVICE_NOW_FIELD_EMAIL || 'u_email',
  name: process.env.SERVICE_NOW_FIELD_NAME || 'u_name',
  points: process.env.SERVICE_NOW_FIELD_POINTS || 'u_points',
  lastCheckInAt: process.env.SERVICE_NOW_FIELD_LAST_CHECK_IN_AT || 'u_last_check_in_at',
};

const LOGIN_TABLE = process.env.SERVICE_NOW_LOGIN_TABLE || 'u_login';

const LOGIN_FIELD_MAP = {
  username: process.env.SERVICE_NOW_LOGIN_FIELD_USERNAME || 'u_username',
  email: process.env.SERVICE_NOW_LOGIN_FIELD_EMAIL || 'u_email',
  password: process.env.SERVICE_NOW_LOGIN_FIELD_PASSWORD || 'u_password',
  name: process.env.SERVICE_NOW_LOGIN_FIELD_NAME || 'u_name',
  active: process.env.SERVICE_NOW_LOGIN_FIELD_ACTIVE || 'u_active',
};

function getConfig() {
  const missing = REQUIRED_FIELDS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw Object.assign(
      new Error(`Missing ServiceNow environment variables: ${missing.join(', ')}`),
      { status: 503 },
    );
  }

  return {
    instanceUrl: process.env.SERVICE_NOW_INSTANCE_URL.replace(/\/$/, ''),
    table: process.env.SERVICE_NOW_TABLE,
    username: process.env.SERVICE_NOW_USERNAME,
    password: process.env.SERVICE_NOW_PASSWORD,
  };
}

function getAuthHeader(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

async function serviceNowFetch(path, options = {}) {
  const config = getConfig();
  const response = await fetch(`${config.instanceUrl}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(config.username, config.password),
      ...options.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error?.message || data?.error?.detail || response.statusText;
    throw Object.assign(new Error(message), { status: response.status, details: data });
  }

  return data;
}

function getTablePath(query = '') {
  const { table } = getConfig();
  return `/api/now/table/${encodeURIComponent(table)}${query}`;
}

function getNamedTablePath(table, query = '') {
  getConfig();
  return `/api/now/table/${encodeURIComponent(table)}${query}`;
}

function toUserRecord(record = {}) {
  return {
    sysId: record.sys_id,
    userId: record[FIELD_MAP.userId] || '',
    email: record[FIELD_MAP.email] || '',
    name: record[FIELD_MAP.name] || '',
    points: Number(record[FIELD_MAP.points]) || 0,
    lastCheckInAt: record[FIELD_MAP.lastCheckInAt] || null,
  };
}

export async function getUserById(userId) {
  if (FIELD_MAP.userId === 'sys_id') {
    const data = await serviceNowFetch(getTablePath(`/${encodeURIComponent(userId)}`));
    return data?.result ? toUserRecord(data.result) : null;
  }

  const params = new URLSearchParams({
    sysparm_query: `${FIELD_MAP.userId}=${userId}`,
    sysparm_limit: '1',
  });
  const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));
  const record = data?.result?.[0];

  return record ? toUserRecord(record) : null;
}

export async function upsertUserProfile({ userId, email, name }) {
  const existing = await getUserById(userId);
  const payload = {
    [FIELD_MAP.email]: email || '',
    [FIELD_MAP.name]: name || email?.split('@')[0] || 'User',
  };

  if (FIELD_MAP.userId !== 'sys_id') {
    payload[FIELD_MAP.userId] = userId;
  }

  if (existing?.sysId) {
    const data = await serviceNowFetch(getTablePath(`/${existing.sysId}`), {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    return toUserRecord(data.result);
  }

  const data = await serviceNowFetch(getTablePath(), {
    method: 'POST',
    body: JSON.stringify({ ...payload, [FIELD_MAP.points]: 0 }),
  });

  return toUserRecord(data.result);
}

export async function addCheckInPoints({ userId, email, name, pointsToAdd = 5 }) {
  const profile = await upsertUserProfile({ userId, email, name });
  const nextPoints = profile.points + pointsToAdd;
  const data = await serviceNowFetch(getTablePath(`/${profile.sysId}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [FIELD_MAP.points]: nextPoints,
      [FIELD_MAP.lastCheckInAt]: new Date().toISOString(),
    }),
  });

  return toUserRecord(data.result);
}

function toLoginUser(record = {}) {
  return {
    id: record.sys_id,
    username: record[LOGIN_FIELD_MAP.username] || '',
    email: record[LOGIN_FIELD_MAP.email] || '',
    name:
      record[LOGIN_FIELD_MAP.name] ||
      record[LOGIN_FIELD_MAP.username] ||
      record[LOGIN_FIELD_MAP.email]?.split('@')[0] ||
      'User',
  };
}

export async function loginWithServiceNow({ identifier, email, password }) {
  const normalizedIdentifier = String(identifier || email || '').trim();
  const rawPassword = String(password || '');

  if (!normalizedIdentifier || !rawPassword) {
    throw Object.assign(new Error('Username/email and password are required.'), { status: 400 });
  }

  const params = new URLSearchParams({
    sysparm_query: `${LOGIN_FIELD_MAP.username}=${normalizedIdentifier}^OR${LOGIN_FIELD_MAP.email}=${normalizedIdentifier}`,
    sysparm_limit: '1',
  });
  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `?${params.toString()}`));
  const record = data?.result?.[0];

  if (!record || String(record[LOGIN_FIELD_MAP.password] || '') !== rawPassword) {
    throw Object.assign(new Error('Username/email or password is incorrect.'), { status: 401 });
  }

  const activeValue = record[LOGIN_FIELD_MAP.active];

  if (activeValue !== undefined && activeValue !== '' && String(activeValue).toLowerCase() === 'false') {
    throw Object.assign(new Error('This account is inactive.'), { status: 403 });
  }

  const user = toLoginUser(record);
  return user;
}

export function getServiceNowLoginConfig() {
  return {
    table: LOGIN_TABLE,
    usernameField: LOGIN_FIELD_MAP.username,
    emailField: LOGIN_FIELD_MAP.email,
    passwordField: LOGIN_FIELD_MAP.password,
    nameField: LOGIN_FIELD_MAP.name,
  };
}
