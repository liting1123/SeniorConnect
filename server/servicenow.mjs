import { loadEnv } from './env.mjs';

loadEnv();

const REQUIRED_FIELDS = [
  'SERVICE_NOW_INSTANCE_URL',
  'SERVICE_NOW_TABLE',
  'SERVICE_NOW_USERNAME',
  'SERVICE_NOW_PASSWORD',
];

const FIELD_MAP = {
  userId: process.env.SERVICE_NOW_FIELD_USER_ID || 'sys_id',
  email: process.env.SERVICE_NOW_FIELD_EMAIL || 'u_email',
  name: process.env.SERVICE_NOW_FIELD_NAME || 'u_name',
  points: process.env.SERVICE_NOW_FIELD_POINTS || 'u_points',
  lastCheckInAt: process.env.SERVICE_NOW_FIELD_LAST_CHECK_IN_AT || 'u_last_check_in_at',
  gameRewardDate: process.env.SERVICE_NOW_FIELD_GAME_REWARD_DATE || 'u_game_reward_date',
};

const CHECK_IN_TIME_ZONE = process.env.CHECK_IN_TIME_ZONE || 'Asia/Singapore';
const CHECK_IN_WINDOWS = [
  { id: 'morning', label: 'morning', startHour: 5, endHour: 9 },
  { id: 'evening', label: 'evening', startHour: 16, endHour: 18 },
];

const LOGIN_TABLE = process.env.SERVICE_NOW_LOGIN_TABLE || 'u_login';
const SOS_ALERT_TABLE = process.env.SERVICE_NOW_SOS_ALERT_TABLE || 'u_sos_alert';
const CAREGIVER_CONNECTION_TABLE = process.env.SERVICE_NOW_CAREGIVER_CONNECTION_TABLE || 'u_caregivers_dash';

const LOGIN_FIELD_MAP = {
  username: process.env.SERVICE_NOW_LOGIN_FIELD_USERNAME || 'u_username',
  email: process.env.SERVICE_NOW_LOGIN_FIELD_EMAIL || 'u_email',
  password: process.env.SERVICE_NOW_LOGIN_FIELD_PASSWORD || 'u_password',
  name: process.env.SERVICE_NOW_LOGIN_FIELD_NAME || 'u_name',
  role: process.env.SERVICE_NOW_LOGIN_FIELD_ROLE || 'u_role',
  active: process.env.SERVICE_NOW_LOGIN_FIELD_ACTIVE || 'u_active',
};

const SOS_ALERT_FIELD_MAP = {
  location: process.env.SERVICE_NOW_SOS_ALERT_FIELD_LOCATION || 'u_location',
  message: process.env.SERVICE_NOW_SOS_ALERT_FIELD_MESSAGE || 'u_message',
  seniorName: process.env.SERVICE_NOW_SOS_ALERT_FIELD_SENIOR_NAME || 'u_senior_name',
  seniorPhone: process.env.SERVICE_NOW_SOS_ALERT_FIELD_SENIOR_PHONE || 'u_senior_phone',
  status: process.env.SERVICE_NOW_SOS_ALERT_FIELD_STATUS || 'u_status',
};

const CAREGIVER_CONNECTION_FIELD_MAP = {
  caregiverUsername: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_CAREGIVER_USERNAME || 'u_username',
  caregiverName: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_CAREGIVER_NAME || 'u_caregiver_name',
  caregiverEmail: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_CAREGIVER_EMAIL || 'u_caregiver_email',
  caregiverPassword: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_CAREGIVER_PASSWORD || 'u_password',
  seniorName: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_SENIOR_NAME || 'u_senior_name',
  seniorPhone: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_SENIOR_PHONE || 'u_senior_phone',
  seniorEmail: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_SENIOR_EMAIL || 'u_senior_email',
  relationship: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_RELATIONSHIP || 'u_relationship',
  status: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_STATUS || 'u_status',
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

function getResponsePreview(text) {
  return text.replace(/\s+/g, ' ').trim().slice(0, 300);
}

function parseServiceNowJson(text, response) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    const contentType = response.headers.get('content-type') || '';
    const returnedHtml = contentType.includes('text/html') || /^\s*</.test(text);
    const message = returnedHtml
      ? 'ServiceNow returned HTML instead of JSON. Check SERVICE_NOW_INSTANCE_URL, SERVICE_NOW_USERNAME, and SERVICE_NOW_PASSWORD; the instance may be redirecting to a login page.'
      : 'ServiceNow returned invalid JSON.';

    throw Object.assign(new Error(message), {
      status: response.ok ? 502 : response.status,
      details: {
        status: response.status,
        contentType,
        bodyPreview: getResponsePreview(text),
      },
    });
  }
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
  const data = parseServiceNowJson(text, response);

  if (!response.ok) {
    const message = data?.error?.message || data?.error?.detail || response.statusText;
    const friendlyMessage =
      response.status === 401 && /not authenticated|unauthorized/i.test(message)
        ? 'ServiceNow API login failed. Check SERVICE_NOW_USERNAME and SERVICE_NOW_PASSWORD in .env.'
        : message;

    throw Object.assign(new Error(friendlyMessage), { status: response.status, details: data });
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
    gameRewardDate: record[FIELD_MAP.gameRewardDate] || null,
  };
}

function getSingaporeParts(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: CHECK_IN_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    dateKey: `${partMap.year}-${partMap.month}-${partMap.day}`,
    hour: Number(partMap.hour),
  };
}

function getCheckInWindow(value = new Date()) {
  const parts = getSingaporeParts(value);

  if (!parts) {
    return null;
  }

  const window = CHECK_IN_WINDOWS.find(({ startHour, endHour }) => {
    return parts.hour >= startHour && parts.hour < endHour;
  });

  return window ? { ...window, dateKey: parts.dateKey } : null;
}

function getWindowSummary() {
  return 'Morning check-in is 5:00 AM-8:59 AM. Evening check-in is 4:00 PM-5:59 PM.';
}

function getSingaporeDateKey(value = new Date()) {
  return getSingaporeParts(value)?.dateKey || null;
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

export async function addUserPoints({ userId, email, name, pointsToAdd = 1 }) {
  const profile = await upsertUserProfile({ userId, email, name });
  const nextPoints = profile.points + pointsToAdd;
  const payload = {
    [FIELD_MAP.points]: String(nextPoints),
  };

  const data = await serviceNowFetch(getTablePath(`/${profile.sysId}`), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

  return toUserRecord(data.result);
}

export async function addGamePoint({ userId, email, name, pointsToAdd = 1 }) {
  const profile = await upsertUserProfile({ userId, email, name });
  const today = getSingaporeDateKey();

  if (profile.gameRewardDate === today) {
    throw Object.assign(new Error('You have already collected your game point today. Please play again tomorrow.'), {
      status: 409,
    });
  }

  const nextPoints = profile.points + pointsToAdd;
  const data = await serviceNowFetch(getTablePath(`/${profile.sysId}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [FIELD_MAP.points]: String(nextPoints),
      [FIELD_MAP.gameRewardDate]: today,
    }),
  });

  return toUserRecord(data.result);
}

export async function addCheckInPoints({ userId, email, name, pointsToAdd = 5 }) {
  const currentWindow = getCheckInWindow();

  if (!currentWindow) {
    throw Object.assign(new Error(`Check-in is only available during the allowed windows. ${getWindowSummary()}`), {
      status: 403,
    });
  }

  const profile = await upsertUserProfile({ userId, email, name });
  const lastWindow = getCheckInWindow(profile.lastCheckInAt);

  if (lastWindow?.dateKey === currentWindow.dateKey && lastWindow.id === currentWindow.id) {
    throw Object.assign(new Error(`You have already completed your ${currentWindow.label} check-in today.`), {
      status: 409,
    });
  }

  const nextPoints = profile.points + pointsToAdd;
  const data = await serviceNowFetch(getTablePath(`/${profile.sysId}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [FIELD_MAP.points]: String(nextPoints),
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
    role: String(record[LOGIN_FIELD_MAP.role] || '').trim().toLowerCase() || 'elderly',
  };
}

function normalizeLoginValue(value) {
  return String(value || '').trim().toLowerCase();
}

function toCaregiverLoginUser(record = {}) {
  const email = record[CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail] || '';
  const username = record[CAREGIVER_CONNECTION_FIELD_MAP.caregiverUsername] || email;

  return {
    id: record.sys_id,
    username,
    email,
    name:
      record[CAREGIVER_CONNECTION_FIELD_MAP.caregiverName] ||
      username ||
      email?.split('@')[0] ||
      'Caregiver',
    role: 'caregiver',
  };
}

async function findSeniorLoginUser(normalizedIdentifier, rawPassword) {
  const query = `(${LOGIN_FIELD_MAP.email}=${normalizedIdentifier}^OR${LOGIN_FIELD_MAP.username}=${normalizedIdentifier})`;
  const params = new URLSearchParams({
    sysparm_query: query,
    sysparm_limit: '10',
  });
  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `?${params.toString()}`));
  const record = data?.result?.find((user) => {
    return (
      (
        user[LOGIN_FIELD_MAP.email] === normalizedIdentifier ||
        user[LOGIN_FIELD_MAP.username] === normalizedIdentifier
      ) &&
      String(user[LOGIN_FIELD_MAP.password] || '') === String(rawPassword)
    );
  });

  if (!record) {
    return null;
  }

  const activeValue = record[LOGIN_FIELD_MAP.active];

  if (activeValue !== undefined && activeValue !== '' && String(activeValue).toLowerCase() === 'false') {
    throw Object.assign(new Error('This account is inactive.'), { status: 403 });
  }

  return toLoginUser(record);
}

async function findCaregiverLoginUser(normalizedIdentifier, rawPassword) {
  const query = `(${CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail}=${normalizedIdentifier}^OR${CAREGIVER_CONNECTION_FIELD_MAP.caregiverUsername}=${normalizedIdentifier})`;
  const params = new URLSearchParams({
    sysparm_query: query,
    sysparm_limit: '10',
  });
  const data = await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE, `?${params.toString()}`));
  const record = data?.result?.find((user) => {
    return (
      (
        user[CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail] === normalizedIdentifier ||
        user[CAREGIVER_CONNECTION_FIELD_MAP.caregiverUsername] === normalizedIdentifier
      ) &&
      String(user[CAREGIVER_CONNECTION_FIELD_MAP.caregiverPassword] || '') === String(rawPassword)
    );
  });

  return record ? toCaregiverLoginUser(record) : null;
}

export async function loginWithServiceNow({ identifier, email, password }) {
  const normalizedIdentifier = String(identifier || email || '').trim();
  const comparableIdentifier = normalizeLoginValue(normalizedIdentifier);
  const rawPassword = String(password || '');

  if (!normalizedIdentifier || !rawPassword) {
    throw Object.assign(new Error('Email/username and password are required.'), { status: 400 });
  }

  const seniorUser = await findSeniorLoginUser(comparableIdentifier, rawPassword);

  if (seniorUser) {
    return seniorUser;
  }

  const caregiverUser = await findCaregiverLoginUser(comparableIdentifier, rawPassword);

  if (caregiverUser) {
    return caregiverUser;
  }

  throw Object.assign(
    new Error('Email/username or password is incorrect.'),
    { status: 401 },
  );
}

export async function registerWithServiceNow({ email, password, name }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const rawPassword = String(password || '');

  if (!normalizedEmail || !rawPassword) {
    throw Object.assign(new Error('Email and password are required.'), { status: 400 });
  }

  const existingParams = new URLSearchParams({
    sysparm_query: `${LOGIN_FIELD_MAP.email}=${normalizedEmail}^OR${LOGIN_FIELD_MAP.username}=${normalizedEmail}`,
    sysparm_limit: '1',
  });
  const existingData = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `?${existingParams.toString()}`));

  if (existingData?.result?.length) {
    throw Object.assign(new Error('This caregiver email is already registered.'), { status: 409 });
  }

  const displayName = String(name || '').trim() || normalizedEmail.split('@')[0] || 'Caregiver';
  const payload = {
    [LOGIN_FIELD_MAP.username]: normalizedEmail,
    [LOGIN_FIELD_MAP.email]: normalizedEmail,
    [LOGIN_FIELD_MAP.password]: rawPassword,
    [LOGIN_FIELD_MAP.name]: displayName,
    [LOGIN_FIELD_MAP.role]: 'caregiver',
    [LOGIN_FIELD_MAP.active]: true,
  };

  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return toLoginUser(data?.result || {});
}

export async function createSosAlert({ location, message, seniorName, seniorPhone, status }) {
  const payload = {
    [SOS_ALERT_FIELD_MAP.location]: location || '',
    [SOS_ALERT_FIELD_MAP.message]: message || 'SOS alert triggered',
    [SOS_ALERT_FIELD_MAP.seniorName]: seniorName || '',
    [SOS_ALERT_FIELD_MAP.seniorPhone]: seniorPhone || '',
    [SOS_ALERT_FIELD_MAP.status]: status || 'New',
  };

  const data = await serviceNowFetch(getNamedTablePath(SOS_ALERT_TABLE), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return data?.result || data;
}

export async function createCaregiverConnection(data) {
  const response = await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE), {
    method: 'POST',
    body: JSON.stringify({
      [CAREGIVER_CONNECTION_FIELD_MAP.seniorName]: data.seniorName,
      [CAREGIVER_CONNECTION_FIELD_MAP.seniorPhone]: data.seniorPhone,
      [CAREGIVER_CONNECTION_FIELD_MAP.seniorEmail]: data.seniorEmail,
      [CAREGIVER_CONNECTION_FIELD_MAP.caregiverName]: data.caregiverName,
      [CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail]: data.caregiverEmail,
      [CAREGIVER_CONNECTION_FIELD_MAP.relationship]: data.relationship,
      [CAREGIVER_CONNECTION_FIELD_MAP.status]: 'connected',
    }),
  });

  return response;
}

function toCaregiverSeniorRecord(record = {}) {
  return {
    id: record.sys_id,
    name: record[CAREGIVER_CONNECTION_FIELD_MAP.seniorName] || '',
    phone: record[CAREGIVER_CONNECTION_FIELD_MAP.seniorPhone] || '',
    email: record[CAREGIVER_CONNECTION_FIELD_MAP.seniorEmail] || '',
    caregiverName: record[CAREGIVER_CONNECTION_FIELD_MAP.caregiverName] || '',
    caregiverEmail: record[CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail] || '',
    relationship: record[CAREGIVER_CONNECTION_FIELD_MAP.relationship] || '',
    status: record[CAREGIVER_CONNECTION_FIELD_MAP.status] || '',
  };
}

export async function getCaregiverSeniorConnections({ caregiverEmail, searchName, phone }) {
  const normalizedEmail = String(caregiverEmail || '').trim();
  const nameSearch = String(searchName || '').trim().toLowerCase();
  const phoneSearch = String(phone || '').trim().toLowerCase();

  if (!normalizedEmail) {
    throw Object.assign(new Error('Caregiver email is required.'), { status: 400 });
  }

  const queryParts = [];

  if (phoneSearch) {
    queryParts.push(`${CAREGIVER_CONNECTION_FIELD_MAP.seniorPhone}LIKE${phoneSearch}`);
  } else {
    queryParts.push(`${CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail}=${normalizedEmail}`);
  }

  const params = new URLSearchParams({
    sysparm_query: queryParts.join('^'),
    sysparm_limit: '100',
  });
  const data = await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE, `?${params.toString()}`));
  const seniors = (data?.result || []).map(toCaregiverSeniorRecord);

  return seniors.filter((senior) => {
    const matchesName = !nameSearch || senior.name.toLowerCase().includes(nameSearch);
    const matchesPhone = !phoneSearch || senior.phone.toLowerCase().includes(phoneSearch);

    return matchesName && matchesPhone;
  });
}

export function getServiceNowLoginConfig() {
  return {
    table: LOGIN_TABLE,
    usernameField: LOGIN_FIELD_MAP.username,
    emailField: LOGIN_FIELD_MAP.email,
    passwordField: LOGIN_FIELD_MAP.password,
    nameField: LOGIN_FIELD_MAP.name,
    roleField: LOGIN_FIELD_MAP.role,
    caregiverTable: CAREGIVER_CONNECTION_TABLE,
    caregiverUsernameField: CAREGIVER_CONNECTION_FIELD_MAP.caregiverUsername,
    caregiverEmailField: CAREGIVER_CONNECTION_FIELD_MAP.caregiverEmail,
    caregiverPasswordField: CAREGIVER_CONNECTION_FIELD_MAP.caregiverPassword,
    caregiverNameField: CAREGIVER_CONNECTION_FIELD_MAP.caregiverName,
  };
}
