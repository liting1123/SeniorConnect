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
  phone: process.env.SERVICE_NOW_FIELD_PHONE || 'u_phone',
  points: process.env.SERVICE_NOW_FIELD_POINTS || 'u_points',
  lastCheckInAt: process.env.SERVICE_NOW_FIELD_LAST_CHECK_IN_AT || 'u_last_check_in_at',
  gameRewardDate: process.env.SERVICE_NOW_FIELD_GAME_REWARD_DATE || 'u_game_reward_date',
  locationZones: process.env.SERVICE_NOW_FIELD_LOCATION_ZONES || 'u_location_zones',
};

const CHECK_IN_TIME_ZONE = process.env.CHECK_IN_TIME_ZONE || 'Asia/Singapore';
const CHECK_IN_WINDOWS = [
  { id: 'morning', label: 'morning', startHour: 5, endHour: 9 },
  { id: 'evening', label: 'evening', startHour: 16, endHour: 18 },
];

const LOGIN_TABLE = process.env.SERVICE_NOW_LOGIN_TABLE || 'u_login';
const SOS_ALERT_TABLE = process.env.SERVICE_NOW_SOS_ALERT_TABLE || 'u_sos_alert';
const CAREGIVER_CONNECTION_TABLE = process.env.SERVICE_NOW_CAREGIVER_CONNECTION_TABLE || 'u_caregiver_profiles';
const MEDICINE_TABLE = process.env.SERVICE_NOW_MEDICINE_TABLE || 'u_medicine';

const LOGIN_FIELD_MAP = {
  username: process.env.SERVICE_NOW_LOGIN_FIELD_USERNAME || 'u_username',
  email: process.env.SERVICE_NOW_LOGIN_FIELD_EMAIL || 'u_email',
  password: process.env.SERVICE_NOW_LOGIN_FIELD_PASSWORD || 'u_password',
  name: process.env.SERVICE_NOW_LOGIN_FIELD_NAME || 'u_name',
  role: process.env.SERVICE_NOW_LOGIN_FIELD_ROLE || 'u_role',
  active: process.env.SERVICE_NOW_LOGIN_FIELD_ACTIVE || 'u_active',
  lastLogin: process.env.SERVICE_NOW_LOGIN_FIELD_LAST_LOGIN || 'u_last_login',
};

const SOS_ALERT_FIELD_MAP = {
  location: process.env.SERVICE_NOW_SOS_ALERT_FIELD_LOCATION || 'u_location',
  message: process.env.SERVICE_NOW_SOS_ALERT_FIELD_MESSAGE || 'u_message',
  seniorName: process.env.SERVICE_NOW_SOS_ALERT_FIELD_SENIOR_NAME || 'u_senior_name',
  seniorPhone: process.env.SERVICE_NOW_SOS_ALERT_FIELD_SENIOR_PHONE || 'u_senior_phone',
  status: process.env.SERVICE_NOW_SOS_ALERT_FIELD_STATUS || 'u_status',
};

const CAREGIVER_CONNECTION_FIELD_MAP = {
  user: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_USER || 'u_user',
  senior: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_SENIOR || 'u_senior',
  relationship: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_RELATIONSHIP || 'u_relationship',
  isNok: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_IS_NOK || 'u_is_nok',
};

const MEDICINE_FIELD_MAP = {
  senior: process.env.SERVICE_NOW_MEDICINE_FIELD_SENIOR || 'u_senior',
  name: process.env.SERVICE_NOW_MEDICINE_FIELD_NAME || 'u_medication_name',
  dose: process.env.SERVICE_NOW_MEDICINE_FIELD_DOSE || 'u_dosage',
  time: process.env.SERVICE_NOW_MEDICINE_FIELD_TIME || 'u_time',
  frequency: process.env.SERVICE_NOW_MEDICINE_FIELD_FREQUENCY || 'u_frequency',
  status: process.env.SERVICE_NOW_MEDICINE_FIELD_STATUS || 'u_status',
  notes: process.env.SERVICE_NOW_MEDICINE_FIELD_NOTES || 'u_notes',
  isExtra: process.env.SERVICE_NOW_MEDICINE_FIELD_IS_EXTRA || 'u_is_extra',
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
    phone: record[FIELD_MAP.phone] || '',
    locationZones: record[FIELD_MAP.locationZones] || '',
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

function getReferenceValue(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'object') {
    return value.value || value.sys_id || '';
  }

  return String(value);
}

function normalizeLoginValue(value) {
  return String(value || '').trim().toLowerCase();
}

function getServiceNowDateTime(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(value);
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second}`;
}

async function updateLoginTimestamp(record) {
  if (!record?.sys_id || !LOGIN_FIELD_MAP.lastLogin) {
    return record;
  }

  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${record.sys_id}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [LOGIN_FIELD_MAP.lastLogin]: getServiceNowDateTime(),
    }),
  });

  return data?.result || record;
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

  const updatedRecord = await updateLoginTimestamp(record);

  return toLoginUser(updatedRecord);
}

async function findLoginRecordByIdentifier(normalizedIdentifier) {
  const query = `(${LOGIN_FIELD_MAP.email}=${normalizedIdentifier}^OR${LOGIN_FIELD_MAP.username}=${normalizedIdentifier})`;
  const params = new URLSearchParams({
    sysparm_query: query,
    sysparm_limit: '1',
  });

  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `?${params.toString()}`));

  return data?.result?.[0] || null;
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

export async function updateSosAlertStatus({ alertId, status }) {
  const normalizedAlertId = String(alertId || '').trim();
  const normalizedStatus = String(status || '').trim();

  if (!normalizedAlertId) {
    throw Object.assign(new Error('SOS alert ID is required.'), { status: 400 });
  }

  if (!normalizedStatus) {
    throw Object.assign(new Error('SOS alert status is required.'), { status: 400 });
  }

  const data = await serviceNowFetch(getNamedTablePath(SOS_ALERT_TABLE, `/${encodeURIComponent(normalizedAlertId)}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [SOS_ALERT_FIELD_MAP.status]: normalizedStatus,
    }),
  });

  return data?.result || data;
}

async function getLoginRecordById(userId) {
  if (!userId) {
    return null;
  }

  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${encodeURIComponent(userId)}`));

  return data?.result || null;
}

async function findSeniorProfileByUserId(userId) {
  if (!userId) {
    return null;
  }

  if (FIELD_MAP.userId === 'sys_id') {
    const data = await serviceNowFetch(getTablePath(`/${encodeURIComponent(userId)}`));
    return data?.result || null;
  }

  const params = new URLSearchParams({
    sysparm_query: `${FIELD_MAP.userId}=${userId}`,
    sysparm_limit: '1',
  });
  const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));

  return data?.result?.[0] || null;
}

async function findSeniorProfileByNameOrPhone({ seniorName, seniorPhone }) {
  const queryParts = [];
  const normalizedName = String(seniorName || '').trim();
  const normalizedPhone = String(seniorPhone || '').trim();

  if (normalizedName) {
    queryParts.push(`${FIELD_MAP.name}=${normalizedName}`);
  }

  if (normalizedPhone) {
    queryParts.push(`${FIELD_MAP.phone}=${normalizedPhone}`);
  }

  if (queryParts.length === 0) {
    return null;
  }

  const params = new URLSearchParams({
    sysparm_query: queryParts.join('^OR'),
    sysparm_limit: '1',
  });
  const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));

  return data?.result?.[0] || null;
}

function toSeniorSearchRecord(record = {}) {
  return {
    id: record.sys_id,
    name: record[FIELD_MAP.name] || 'Senior',
    phone: record[FIELD_MAP.phone] || '',
    email: record[FIELD_MAP.email] || '',
  };
}

export async function searchSeniorProfiles({ searchName, phone }) {
  const normalizedName = String(searchName || '').trim();
  const normalizedPhone = String(phone || '').trim();
  const queryParts = [];

  if (normalizedName) {
    queryParts.push(`${FIELD_MAP.name}LIKE${normalizedName}`);
  }

  if (normalizedPhone) {
    queryParts.push(`${FIELD_MAP.phone}LIKE${normalizedPhone}`);
  }

  if (queryParts.length === 0) {
    return [];
  }

  const params = new URLSearchParams({
    sysparm_query: queryParts.join('^OR'),
    sysparm_limit: '20',
  });
  const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));

  return (data?.result || []).map(toSeniorSearchRecord);
}

function toCaregiverSeniorRecord(connection = {}, seniorProfile = {}, seniorUser = {}) {
  return {
    id: connection.sys_id,
    name:
      seniorProfile[FIELD_MAP.name] ||
      seniorUser[LOGIN_FIELD_MAP.name] ||
      seniorUser[LOGIN_FIELD_MAP.username] ||
      seniorUser[LOGIN_FIELD_MAP.email]?.split('@')[0] ||
      'Senior',
    phone: seniorProfile.u_phone || seniorUser.u_phone || '',
    email: seniorProfile[FIELD_MAP.email] || seniorUser[LOGIN_FIELD_MAP.email] || '',
    location: seniorProfile[FIELD_MAP.locationZones] || '',
    caregiverName: '',
    caregiverEmail: '',
    relationship: '',
    status: 'Connected',
  };
}

function getDisplayValue(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'object') {
    return value.display_value || value.value || value.sys_id || '';
  }

  return String(value);
}

function toActiveSosAlert(record = {}) {
  const status = getDisplayValue(record[SOS_ALERT_FIELD_MAP.status]) || 'New';

  if (/resolved|closed|cancelled|canceled/i.test(status)) {
    return null;
  }

  return {
    id: record.sys_id,
    location: getDisplayValue(record[SOS_ALERT_FIELD_MAP.location]),
    message: getDisplayValue(record[SOS_ALERT_FIELD_MAP.message]),
    status,
    createdAt: record.sys_created_on || '',
  };
}

async function getLatestActiveSosAlertForSenior(senior = {}) {
  const queryParts = [];
  const seniorName = String(senior.name || '').trim();
  const seniorPhone = String(senior.phone || '').trim();

  if (seniorPhone) {
    queryParts.push(`${SOS_ALERT_FIELD_MAP.seniorPhone}=${seniorPhone}`);
  }

  if (seniorName) {
    queryParts.push(`${SOS_ALERT_FIELD_MAP.seniorName}=${seniorName}`);
  }

  if (queryParts.length === 0) {
    return null;
  }

  const params = new URLSearchParams({
    sysparm_query: `${queryParts.join('^OR')}^ORDERBYDESCsys_created_on`,
    sysparm_limit: '5',
  });
  const data = await serviceNowFetch(getNamedTablePath(SOS_ALERT_TABLE, `?${params.toString()}`));
  const activeAlert = (data?.result || [])
    .map(toActiveSosAlert)
    .find(Boolean);

  return activeAlert || null;
}

export async function createCaregiverConnection(data) {
  const caregiverIdentifier = normalizeLoginValue(data.caregiverEmail || data.caregiverUsername);
  const seniorIdentifier = normalizeLoginValue(data.seniorEmail || data.seniorUsername);
  const caregiverUser = data.caregiverId ? { sys_id: data.caregiverId } : await findLoginRecordByIdentifier(caregiverIdentifier);
  const seniorUser = data.seniorUserId ? { sys_id: data.seniorUserId } : await findLoginRecordByIdentifier(seniorIdentifier);
  const seniorProfile = data.seniorId ? { sys_id: data.seniorId } : await findSeniorProfileByUserId(seniorUser?.sys_id);

  if (!caregiverUser?.sys_id) {
    throw Object.assign(new Error('Caregiver user was not found.'), { status: 404 });
  }

  if (!seniorProfile?.sys_id) {
    throw Object.assign(new Error('Senior profile was not found.'), { status: 404 });
  }

  const response = await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE), {
    method: 'POST',
    body: JSON.stringify({
      [CAREGIVER_CONNECTION_FIELD_MAP.user]: caregiverUser.sys_id,
      [CAREGIVER_CONNECTION_FIELD_MAP.senior]: seniorProfile.sys_id,
      [CAREGIVER_CONNECTION_FIELD_MAP.relationship]: data.relationship || '',
      [CAREGIVER_CONNECTION_FIELD_MAP.isNok]: /next-of-kin|nok/i.test(data.relationship || ''),
    }),
  });

  return response;
}

export async function getCaregiverSeniorConnections({ caregiverId, caregiverEmail, searchName, phone }) {
  const normalizedCaregiverId = String(caregiverId || '').trim();
  const normalizedEmail = normalizeLoginValue(caregiverEmail);
  const nameSearch = String(searchName || '').trim().toLowerCase();
  const phoneSearch = String(phone || '').trim().toLowerCase();

  if (!normalizedCaregiverId && !normalizedEmail) {
    throw Object.assign(new Error('Caregiver ID or email is required.'), { status: 400 });
  }

  const caregiverUserId = normalizedCaregiverId || (await findLoginRecordByIdentifier(normalizedEmail))?.sys_id;

  if (!caregiverUserId) {
    return [];
  }

  const params = new URLSearchParams({
    sysparm_query: `${CAREGIVER_CONNECTION_FIELD_MAP.user}=${caregiverUserId}`,
    sysparm_limit: '100',
  });
  const data = await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE, `?${params.toString()}`));
  const seniors = await Promise.all((data?.result || []).map(async (connection) => {
    const seniorProfileId = getReferenceValue(connection[CAREGIVER_CONNECTION_FIELD_MAP.senior]);
    const seniorProfileData = seniorProfileId
      ? await serviceNowFetch(getTablePath(`/${encodeURIComponent(seniorProfileId)}`))
      : null;
    const seniorProfile = seniorProfileData?.result || {};
    const seniorUserId = getReferenceValue(seniorProfile[FIELD_MAP.userId]);
    const seniorUser = seniorUserId ? await getLoginRecordById(seniorUserId) : null;
    const senior = toCaregiverSeniorRecord(connection, seniorProfile, seniorUser || {});
    const sosAlert = await getLatestActiveSosAlertForSenior(senior);

    return sosAlert
      ? {
          ...senior,
          status: 'SOS Active',
          alertId: sosAlert.id,
          location: sosAlert.location || senior.location,
          alertMessage: sosAlert.message,
          alertStatus: sosAlert.status,
          alertTime: sosAlert.createdAt,
        }
      : senior;
  }));

  return seniors.filter((senior) => {
    const matchesName = !nameSearch || senior.name.toLowerCase().includes(nameSearch);
    const matchesPhone = !phoneSearch || senior.phone.toLowerCase().includes(phoneSearch);

    return matchesName && matchesPhone;
  });
}

function formatMedicineTime(value) {
  const time = String(value || '').trim();
  const match = time.match(/(?:^|\s)([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?(?:\s|$)/);

  if (!match || /am|pm/i.test(time)) {
    return time;
  }

  const hour24 = Number(match[1]);
  const minute = match[2];
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;

  return `${hour12}:${minute} ${period}`;
}

function toMedicineRecord(record = {}) {
  const rawTime = getDisplayValue(record[MEDICINE_FIELD_MAP.time]);
  const isExtraValue = record[MEDICINE_FIELD_MAP.isExtra];

  return {
    id: record.sys_id,
    name: getDisplayValue(record[MEDICINE_FIELD_MAP.name]),
    dose: getDisplayValue(record[MEDICINE_FIELD_MAP.dose]),
    time: formatMedicineTime(rawTime),
    frequency: getDisplayValue(record[MEDICINE_FIELD_MAP.frequency]),
    status: getDisplayValue(record[MEDICINE_FIELD_MAP.status]),
    notes: getDisplayValue(record[MEDICINE_FIELD_MAP.notes]),
    isExtra: String(isExtraValue || '').toLowerCase() === 'true' || isExtraValue === true,
  };
}

export async function getMedicinesForUser(userId) {
  const seniorProfile = await findSeniorProfileByUserId(userId);

  if (!seniorProfile?.sys_id) {
    return [];
  }

  const params = new URLSearchParams({
    sysparm_query: `${MEDICINE_FIELD_MAP.senior}=${seniorProfile.sys_id}`,
    sysparm_limit: '100',
  });
  const data = await serviceNowFetch(getNamedTablePath(MEDICINE_TABLE, `?${params.toString()}`));

  return (data?.result || []).map(toMedicineRecord);
}

async function getMedicineForSenior(seniorProfileId, medicineId) {
  const data = await serviceNowFetch(getNamedTablePath(MEDICINE_TABLE, `/${encodeURIComponent(medicineId)}`));
  const record = data?.result || null;
  const recordSeniorId = getReferenceValue(record?.[MEDICINE_FIELD_MAP.senior]);

  if (!record || recordSeniorId !== seniorProfileId) {
    throw Object.assign(new Error('Medicine record was not found for this senior.'), { status: 404 });
  }

  return record;
}

export async function saveMedicineForUser(userId, medicine = {}) {
  const seniorProfile = await findSeniorProfileByUserId(userId);

  if (!seniorProfile?.sys_id) {
    throw Object.assign(new Error('Senior profile was not found.'), { status: 404 });
  }

  const existingRecord = medicine.id ? await getMedicineForSenior(seniorProfile.sys_id, medicine.id) : null;
  const isExistingExtra = existingRecord
    ? String(existingRecord[MEDICINE_FIELD_MAP.isExtra] || '').toLowerCase() === 'true' ||
      existingRecord[MEDICINE_FIELD_MAP.isExtra] === true
    : false;

  if (medicine.id && !isExistingExtra) {
    return toMedicineRecord(existingRecord);
  }

  const payload = {
    [MEDICINE_FIELD_MAP.senior]: seniorProfile.sys_id,
    [MEDICINE_FIELD_MAP.name]: medicine.name || '',
    [MEDICINE_FIELD_MAP.dose]: medicine.dose || '',
    [MEDICINE_FIELD_MAP.time]: medicine.time || '',
    [MEDICINE_FIELD_MAP.frequency]: medicine.frequency || '',
    [MEDICINE_FIELD_MAP.status]: medicine.status || '',
    [MEDICINE_FIELD_MAP.notes]: medicine.notes || '',
    [MEDICINE_FIELD_MAP.isExtra]: true,
  };

  const path = medicine.id
    ? getNamedTablePath(MEDICINE_TABLE, `/${encodeURIComponent(existingRecord.sys_id)}`)
    : getNamedTablePath(MEDICINE_TABLE);
  const data = await serviceNowFetch(path, {
    method: medicine.id ? 'PATCH' : 'POST',
    body: JSON.stringify(payload),
  });

  return toMedicineRecord(data?.result || {});
}

export async function deleteMedicineForUser(userId, medicineId) {
  const seniorProfile = await findSeniorProfileByUserId(userId);

  if (!seniorProfile?.sys_id) {
    throw Object.assign(new Error('Senior profile was not found.'), { status: 404 });
  }

  const existingRecord = await getMedicineForSenior(seniorProfile.sys_id, medicineId);
  const isExtra = String(existingRecord[MEDICINE_FIELD_MAP.isExtra] || '').toLowerCase() === 'true' ||
    existingRecord[MEDICINE_FIELD_MAP.isExtra] === true;

  if (!isExtra) {
    throw Object.assign(new Error('This medicine is fixed by the database and cannot be removed.'), { status: 403 });
  }

  await serviceNowFetch(getNamedTablePath(MEDICINE_TABLE, `/${encodeURIComponent(existingRecord.sys_id)}`), {
    method: 'DELETE',
  });

  return { id: existingRecord.sys_id };
}

export function getServiceNowLoginConfig() {
  return {
    table: LOGIN_TABLE,
    usernameField: LOGIN_FIELD_MAP.username,
    emailField: LOGIN_FIELD_MAP.email,
    passwordField: LOGIN_FIELD_MAP.password,
    nameField: LOGIN_FIELD_MAP.name,
    roleField: LOGIN_FIELD_MAP.role,
    lastLoginField: LOGIN_FIELD_MAP.lastLogin,
    caregiverTable: CAREGIVER_CONNECTION_TABLE,
    caregiverUserField: CAREGIVER_CONNECTION_FIELD_MAP.user,
    caregiverSeniorField: CAREGIVER_CONNECTION_FIELD_MAP.senior,
    caregiverRelationshipField: CAREGIVER_CONNECTION_FIELD_MAP.relationship,
    caregiverIsNokField: CAREGIVER_CONNECTION_FIELD_MAP.isNok,
  };
}
