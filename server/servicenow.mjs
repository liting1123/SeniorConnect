import { loadEnv } from './env.mjs';
import nodemailer from 'nodemailer';

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
  name: process.env.SERVICE_NOW_FIELD_NAME || 'u_full_name',
  phone: process.env.SERVICE_NOW_FIELD_PHONE || 'u_phone',
  gender: process.env.SERVICE_NOW_FIELD_GENDER || 'u_gender',
  dateOfBirth: process.env.SERVICE_NOW_FIELD_DATE_OF_BIRTH || 'u_date_of_birth',
  bloodType: process.env.SERVICE_NOW_FIELD_BLOOD_TYPE || 'u_blood_type',
  allergies: process.env.SERVICE_NOW_FIELD_ALLERGIES || 'u_allergies',
  medicalConditions: process.env.SERVICE_NOW_FIELD_MEDICAL_CONDITIONS || 'u_medical_conditions',
  points: process.env.SERVICE_NOW_FIELD_POINTS || 'u_points',
  lastCheckInAt: process.env.SERVICE_NOW_FIELD_LAST_CHECK_IN_AT || 'u_last_check_in_at',
  gameRewardDate: process.env.SERVICE_NOW_FIELD_GAME_REWARD_DATE || 'u_game_reward_date',
  locationZones: process.env.SERVICE_NOW_FIELD_LOCATION_ZONES || 'u_location_zones',
  address: process.env.SERVICE_NOW_FIELD_ADDRESS || 'u_address',
  emergencyContactName: process.env.SERVICE_NOW_FIELD_EMERGENCY_CONTACT_NAME || 'u_emergency_contact_name',
  emergencyContactPhone: process.env.SERVICE_NOW_FIELD_EMERGENCY_CONTACT_PHONE || 'u_emergency_contact_phone',
  rewardHistory: process.env.SERVICE_NOW_FIELD_REWARD_HISTORY || 'u_reward_history',
};

const CHECK_IN_TIME_ZONE = process.env.CHECK_IN_TIME_ZONE || 'Asia/Singapore';
const parseCheckInTime = (value, fallback) => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value || '');
  if (!match) {
    return fallback;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) {
    return fallback;
  }

  return hours * 60 + minutes;
};

const formatCheckInTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${suffix}`;
};

const CHECK_IN_WINDOWS = [
  {
    id: 'morning',
    label: 'morning',
    startMinute: parseCheckInTime(process.env.CHECK_IN_MORNING_START, 5 * 60),
    endMinute: parseCheckInTime(process.env.CHECK_IN_MORNING_END, 11 * 60 + 59),
  },
  {
    id: 'evening',
    label: 'evening',
    startMinute: parseCheckInTime(process.env.CHECK_IN_EVENING_START, 13 * 60),
    endMinute: parseCheckInTime(process.env.CHECK_IN_EVENING_END, 23 * 60 + 59),
  },
];

const LOGIN_TABLE = process.env.SERVICE_NOW_LOGIN_TABLE || 'u_login';
const SOS_ALERT_TABLE = process.env.SERVICE_NOW_SOS_ALERT_TABLE || 'u_sos_alert';
const APPOINTMENT_TABLE = process.env.SERVICE_NOW_APPOINTMENT_TABLE || 'appointments';
const CAREGIVER_CONNECTION_TABLE = process.env.SERVICE_NOW_CAREGIVER_CONNECTION_TABLE || 'u_caregiver_profiles';
const MEDICINE_TABLE = process.env.SERVICE_NOW_MEDICINE_TABLE || 'u_medicine';
const FAMILY_VERIFICATION_TABLE = process.env.SERVICE_NOW_FAMILY_VERIFICATION_TABLE || 'u_family_verification_code';
const SENIOR_DISPLAY_ID_LENGTH = Number(process.env.SENIOR_DISPLAY_ID_LENGTH) || 8;

// Populated by the Senior_stuff Raspberry Pi system's route_engine.queue_activity_log()
// (batched every ~60s). v1 is a single-senior link: SERVICE_NOW_SENSOR_SENIOR_ID must
// match SENIOR_ID in Senior_stuff's own .env. Leave blank to disable this panel.
const SENSOR_ACTIVITY_TABLE = process.env.SERVICE_NOW_SENSOR_ACTIVITY_TABLE || 'u_sensor_activity_log';
const SENSOR_ACTIVITY_SENIOR_ID = process.env.SERVICE_NOW_SENSOR_SENIOR_ID || '';

const LOGIN_FIELD_MAP = {
  username: process.env.SERVICE_NOW_LOGIN_FIELD_USERNAME || 'u_username',
  email: process.env.SERVICE_NOW_LOGIN_FIELD_EMAIL || 'u_email',
  password: process.env.SERVICE_NOW_LOGIN_FIELD_PASSWORD || 'u_password',
  name: process.env.SERVICE_NOW_LOGIN_FIELD_NAME || 'u_name',
  role: process.env.SERVICE_NOW_LOGIN_FIELD_ROLE || 'u_role',
  active: process.env.SERVICE_NOW_LOGIN_FIELD_ACTIVE || 'u_active',
  lastLogin: process.env.SERVICE_NOW_LOGIN_FIELD_LAST_LOGIN || 'u_last_login',
  lastCheckIn: process.env.SERVICE_NOW_LOGIN_FIELD_LAST_CHECK_IN || 'u_last_check_in',
};

const SOS_ALERT_FIELD_MAP = {
  location: process.env.SERVICE_NOW_SOS_ALERT_FIELD_LOCATION || 'u_location',
  message: process.env.SERVICE_NOW_SOS_ALERT_FIELD_MESSAGE || 'u_message',
  seniorName: process.env.SERVICE_NOW_SOS_ALERT_FIELD_SENIOR_NAME || 'u_senior_name',
  seniorPhone: process.env.SERVICE_NOW_SOS_ALERT_FIELD_SENIOR_PHONE || 'u_senior_phone',
  status: process.env.SERVICE_NOW_SOS_ALERT_FIELD_STATUS || 'u_status',
};

const APPOINTMENT_FIELD_MAP = {
  caregiver: process.env.SERVICE_NOW_APPOINTMENT_FIELD_CAREGIVER || 'u_caregiver',
  senior: process.env.SERVICE_NOW_APPOINTMENT_FIELD_SENIOR || 'u_senior_name',
  date: process.env.SERVICE_NOW_APPOINTMENT_FIELD_DATE || 'u_appointment_date',
  time: process.env.SERVICE_NOW_APPOINTMENT_FIELD_TIME || 'u_appointment_time',
  type: process.env.SERVICE_NOW_APPOINTMENT_FIELD_TYPE || 'u_appointment_type',
  location: process.env.SERVICE_NOW_APPOINTMENT_FIELD_LOCATION || 'u_location',
  notes: process.env.SERVICE_NOW_APPOINTMENT_FIELD_NOTES || 'u_notes',
  status: process.env.SERVICE_NOW_APPOINTMENT_FIELD_STATUS || '',
};

const CAREGIVER_CONNECTION_FIELD_MAP = {
  user: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_USER || 'u_user',
  senior: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_SENIOR || 'u_senior',
  relationship: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_RELATIONSHIP || 'u_relationship',
  emergencyContactName: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_EMERGENCY_CONTACT_NAME || 'u_emergency_contact_name',
  emergencyContactPhone: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_EMERGENCY_CONTACT_PHONE || 'u_emergency_contact_phone',
  isNok: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_IS_NOK || 'u_is_nok',
};

const MEDICINE_FIELD_MAP = {
  senior: process.env.SERVICE_NOW_MEDICINE_FIELD_SENIOR || 'u_senior',
  name: process.env.SERVICE_NOW_MEDICINE_FIELD_CURRENT_MEDICATION || 'u_current_medication',
  dose: process.env.SERVICE_NOW_MEDICINE_FIELD_DOSE || 'u_dosage',
  time: process.env.SERVICE_NOW_MEDICINE_FIELD_TIME || 'u_time',
  frequency: process.env.SERVICE_NOW_MEDICINE_FIELD_FREQUENCY || 'u_frequency',
  status: process.env.SERVICE_NOW_MEDICINE_FIELD_STATUS || 'u_status',
  notes: process.env.SERVICE_NOW_MEDICINE_FIELD_NOTES || 'u_notes',
  isExtra: process.env.SERVICE_NOW_MEDICINE_FIELD_IS_EXTRA || 'u_is_extra',
};

const FAMILY_VERIFICATION_FIELD_MAP = {
  senior: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_SENIOR || 'u_senior_id',
  familyEmail: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_FAMILY_EMAIL || 'u_family_email',
  code: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_CODE || 'u_code',
  expiresAt: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_EXPIRES_AT || 'u_expires_at',
  status: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_STATUS || 'u_status',
  verifiedAt: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_VERIFIED_AT || 'u_verified_at',
  familyUser: process.env.SERVICE_NOW_FAMILY_VERIFICATION_FIELD_FAMILY_USER || 'u_family_user_id',
};

const SENSOR_ACTIVITY_FIELD_MAP = {
  seniorId: process.env.SERVICE_NOW_SENSOR_ACTIVITY_FIELD_SENIOR_ID || 'u_senior_id',
  sensorType: process.env.SERVICE_NOW_SENSOR_ACTIVITY_FIELD_TYPE || 'u_sensor_type',
  location: process.env.SERVICE_NOW_SENSOR_ACTIVITY_FIELD_LOCATION || 'u_location',
  value: process.env.SERVICE_NOW_SENSOR_ACTIVITY_FIELD_VALUE || 'u_value',
  status: process.env.SERVICE_NOW_SENSOR_ACTIVITY_FIELD_STATUS || 'u_status',
  loggedAt: process.env.SERVICE_NOW_SENSOR_ACTIVITY_FIELD_LOGGED_AT || 'u_logged_at',
};

const MFA_EMAIL_HOST = String(process.env.MFA_EMAIL_HOST || '').trim();
const MFA_EMAIL_PORT = Number(process.env.MFA_EMAIL_PORT) || 587;
const MFA_EMAIL_SECURE = String(process.env.MFA_EMAIL_SECURE || '').trim().toLowerCase() === 'true';
const MFA_EMAIL_USER = String(process.env.MFA_EMAIL_USER || '').trim();
const MFA_EMAIL_PASS = String(process.env.MFA_EMAIL_PASS || '').trim();
const MFA_EMAIL_FROM = String(process.env.MFA_EMAIL_FROM || '').trim();

let mfaMailer = null;

function getConfig() {
  const missing = REQUIRED_FIELDS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw Object.assign(
      new Error(`Missing ServiceNow environment variables: ${missing.join(', ')}`),
      { status: 503 },
    );
  }

  return {
    instanceUrl: normalizeServiceNowInstanceUrl(process.env.SERVICE_NOW_INSTANCE_URL),
    table: process.env.SERVICE_NOW_TABLE,
    username: process.env.SERVICE_NOW_USERNAME,
    password: process.env.SERVICE_NOW_PASSWORD,
  };
}

function getAuthHeader(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

function normalizeServiceNowInstanceUrl(url) {
  const normalized = url.replace(/\/$/, '');

  if (!/^https?:\/\//i.test(normalized)) {
    throw Object.assign(new Error('SERVICE_NOW_INSTANCE_URL must start with http:// or https://'), { status: 503 });
  }

  if (/developer\.servicenow\.com|dev\.do|hibernate/i.test(normalized)) {
    throw Object.assign(
      new Error(
        'SERVICE_NOW_INSTANCE_URL appears to point to the ServiceNow developer portal or a hibernating page. Use your actual instance URL like https://dev12345.service-now.com.'
      ),
      { status: 503 },
    );
  }

  return normalized;
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
      ? 'ServiceNow returned HTML instead of JSON. The instance may be hibernating or redirecting to a login/portal page. Check SERVICE_NOW_INSTANCE_URL, SERVICE_NOW_USERNAME, and SERVICE_NOW_PASSWORD.'
      : 'ServiceNow returned invalid JSON.';

    const details = {
      status: response.status,
      url: response.url,
      contentType,
      bodyPreview: getResponsePreview(text),
    };

    throw Object.assign(new Error(message), {
      status: response.ok ? 502 : response.status,
      details,
    });

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
  let response;

  try {
    response = await fetch(`${config.instanceUrl}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(config.username, config.password),
        ...options.headers,
      },
    });
  } catch (error) {
    throw Object.assign(
      new Error(
        `Unable to connect to ServiceNow at ${config.instanceUrl}. Check that the instance is awake and reachable, then try again.`,
      ),
      {
        status: 503,
        details: {
          cause: error instanceof Error ? error.message : String(error),
        },
      },
    );
  }

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

async function serviceNowFamilyVerificationFetch(query = '', options = {}) {
  try {
    return await serviceNowFetch(getNamedTablePath(FAMILY_VERIFICATION_TABLE, query), options);
  } catch (error) {
    if (error.status === 404 || /not found/i.test(error.message || '')) {
      throw Object.assign(
        new Error(
          `Verification code table was not found. Check SERVICE_NOW_FAMILY_VERIFICATION_TABLE in .env. Current value: ${FAMILY_VERIFICATION_TABLE}`,
        ),
        { status: 503, details: error.details },
      );
    }

    throw error;
  }
}

function toUserRecord(record = {}) {
  return {
    sysId: record.sys_id,
    userId: record[FIELD_MAP.userId] || '',
    email: record[FIELD_MAP.email] || '',
    name: record[FIELD_MAP.name] || '',
    phone: record[FIELD_MAP.phone] || '',
    gender: record[FIELD_MAP.gender] || '',
    dateOfBirth: record[FIELD_MAP.dateOfBirth] || '',
    bloodType: record[FIELD_MAP.bloodType] || '',
    allergies: record[FIELD_MAP.allergies] || '',
    medicalConditions: record[FIELD_MAP.medicalConditions] || '',
    locationZones: record[FIELD_MAP.locationZones] || '',
    address: record[FIELD_MAP.address] || '',
    points: Number(record[FIELD_MAP.points]) || 0,
    lastCheckInAt: record[FIELD_MAP.lastCheckInAt] || null,
    gameRewardDate: record[FIELD_MAP.gameRewardDate] || null,
    rewardHistory: record[FIELD_MAP.rewardHistory] || '',
  };
}

function getSingaporeParts(value = new Date()) {
  if (!(value instanceof Date)) {
    const serviceNowDateTimeMatch = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::\d{2})?$/.exec(
      String(value || '').trim(),
    );

    if (serviceNowDateTimeMatch) {
      const [, year, month, day, hour, minute] = serviceNowDateTimeMatch;

      return {
        dateKey: `${year}-${month}-${day}`,
        hour: Number(hour),
        minute: Number(minute),
        totalMinutes: Number(hour) * 60 + Number(minute),
      };
    }
  }

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
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hour = Number(partMap.hour);
  const minute = Number(partMap.minute);

  return {
    dateKey: `${partMap.year}-${partMap.month}-${partMap.day}`,
    hour,
    minute,
    totalMinutes: hour * 60 + minute,
  };
}

function getCheckInWindow(value = new Date()) {
  const parts = getSingaporeParts(value);

  if (!parts) {
    return null;
  }

  const window = CHECK_IN_WINDOWS.find(({ startMinute, endMinute }) => {
    return parts.totalMinutes >= startMinute && parts.totalMinutes <= endMinute;
  });

  return window ? { ...window, dateKey: parts.dateKey } : null;
}

function getWindowSummary() {
  const [morning, evening] = CHECK_IN_WINDOWS;
  return `Morning check-in is ${formatCheckInTime(morning.startMinute)}-${formatCheckInTime(morning.endMinute)}. Evening check-in is ${formatCheckInTime(evening.startMinute)}-${formatCheckInTime(evening.endMinute)}.`;
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

export async function upsertUserProfile({ userId, email, name, phone, locationZones, address }) {
  const existing = await getUserById(userId);
  const payload = {
    [FIELD_MAP.email]: email || '',
    [FIELD_MAP.name]: name || email?.split('@')[0] || 'User',
  };

  if (phone !== undefined) {
    payload[FIELD_MAP.phone] = phone || '';
  }

  if (locationZones !== undefined) {
    payload[FIELD_MAP.locationZones] = locationZones || '';
  }

  if (address !== undefined) {
    payload[FIELD_MAP.address] = address || '';
  }


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

function parseRewardHistory(value = '') {
  if (!value) {
    return [];
  }

  try {
    const parsedHistory = JSON.parse(String(value));

    if (!Array.isArray(parsedHistory)) {
      return [];
    }

    return parsedHistory
      .map((item) => ({
        id: String(item?.id || ''),
        title: String(item?.title || ''),
        cost: Number(item?.cost) || 0,
        redeemedAt: String(item?.redeemedAt || ''),
      }))
      .filter((item) => item.id && item.title && item.redeemedAt);
  } catch {
    return [];
  }
}

export async function getRewardRedemptionsForUser(userId) {
  const profile = await getUserById(userId);

  return parseRewardHistory(profile?.rewardHistory);
}

export async function redeemUserPoints({ userId, email, name, pointsToRedeem = 0, rewardTitle = '' }) {
  const redeemCost = Number(pointsToRedeem) || 0;

  if (redeemCost <= 0) {
    throw Object.assign(new Error('Reward point cost is invalid.'), { status: 400 });
  }

  const profile = await upsertUserProfile({ userId, email, name });

  if (profile.points < redeemCost) {
    throw Object.assign(new Error('You do not have enough points to redeem this reward.'), { status: 409 });
  }

  const nextPoints = profile.points - redeemCost;
  const redeemedAt = new Date().toISOString();
  const redemption = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: rewardTitle || 'Reward',
    cost: redeemCost,
    redeemedAt,
  };
  const nextRewardHistory = [
    redemption,
    ...parseRewardHistory(profile.rewardHistory),
  ];
  const data = await serviceNowFetch(getTablePath(`/${profile.sysId}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [FIELD_MAP.points]: String(nextPoints),
      [FIELD_MAP.rewardHistory]: JSON.stringify(nextRewardHistory),
    }),
  });

  return {
    user: toUserRecord(data.result),
    redemption,
  };
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
    try {
      await updateLoginCheckInTimestamp({ userId, email, name, checkInAt: profile.lastCheckInAt });
    } catch (error) {
      console.warn('Unable to sync existing login user last check-in timestamp:', error);
    }

    throw Object.assign(new Error(`You have already completed your ${currentWindow.label} check-in today.`), {
      status: 409,
    });
  }

  const nextPoints = profile.points + pointsToAdd;
  const checkInAt = getServiceNowDateTime();
  const data = await serviceNowFetch(getTablePath(`/${profile.sysId}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [FIELD_MAP.points]: String(nextPoints),
      [FIELD_MAP.lastCheckInAt]: checkInAt,
    }),
  });

  try {
    await updateLoginCheckInTimestamp({ userId, email, name, checkInAt });
  } catch (error) {
    console.warn('Unable to update login user last check-in timestamp:', error);
  }

  return toUserRecord(data.result);
}

function toLoginUser(record = {}) {
  const roleValue = getDisplayValue(record[LOGIN_FIELD_MAP.role]) || getReferenceValue(record[LOGIN_FIELD_MAP.role]);

  return {
    id: record.sys_id,
    username: record[LOGIN_FIELD_MAP.username] || '',
    email: record[LOGIN_FIELD_MAP.email] || '',
    name:
      record[LOGIN_FIELD_MAP.name] ||
      record[LOGIN_FIELD_MAP.username] ||
      record[LOGIN_FIELD_MAP.email]?.split('@')[0] ||
      'User',
    role: String(roleValue || '').trim() || 'elderly',
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

function normalizeRole(value = '') {
  return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function isFamilyRole(role = '') {
  return ['children', 'family', 'families', 'familymember', 'familymembers', 'volunteer'].includes(normalizeRole(role));
}

function isCaregiverRole(role = '') {
  return ['caregiver', 'caregivers', 'nok', 'nextofkin', 'caregiverfamily'].includes(normalizeRole(role));
}

function getRoleFromRelationship(relationship = '') {
  const normalizedRelationship = normalizeRole(relationship);

  if (normalizedRelationship === 'children') {
    return 'children';
  }

  if (normalizedRelationship === 'volunteer') {
    return 'volunteer';
  }

  if (normalizedRelationship === 'caregiver') {
    return 'caregiver';
  }

  if (normalizedRelationship === 'nextofkin' || normalizedRelationship === 'nok') {
    return 'caregiver';
  }

  return 'children';
}

function isSeniorRole(role = '') {
  return ['elderly', 'senior', 'seniors'].includes(normalizeRole(role));
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

function getServiceNowUtcDateTime(value = new Date()) {
  return value.toISOString().slice(0, 19).replace('T', ' ');
}

function generateVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getMfaEmailTransporter() {
  const missing = [];

  if (!MFA_EMAIL_HOST) missing.push('MFA_EMAIL_HOST');
  if (!MFA_EMAIL_PORT) missing.push('MFA_EMAIL_PORT');
  if (!MFA_EMAIL_USER) missing.push('MFA_EMAIL_USER');
  if (!MFA_EMAIL_PASS) missing.push('MFA_EMAIL_PASS');
  if (!MFA_EMAIL_FROM) missing.push('MFA_EMAIL_FROM');

  if (missing.length > 0) {
    throw Object.assign(
      new Error(`MFA email is not configured. Missing: ${missing.join(', ')}`),
      { status: 503 },
    );
  }

  if (!mfaMailer) {
    mfaMailer = nodemailer.createTransport({
      host: MFA_EMAIL_HOST,
      port: MFA_EMAIL_PORT,
      secure: MFA_EMAIL_SECURE,
      auth: {
        user: MFA_EMAIL_USER,
        pass: MFA_EMAIL_PASS,
      },
    });
  }

  return mfaMailer;
}

function formatVerificationExpiry(value) {
  const date = new Date(String(value || '').replace(' ', 'T') + 'Z');

  if (Number.isNaN(date.getTime())) {
    return '10 minutes';
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: CHECK_IN_TIME_ZONE,
  }).format(date);
}

async function sendFamilyVerificationEmail({ toEmail, code, seniorName, seniorShortId, expiresAt }) {
  const transporter = getMfaEmailTransporter();
  const normalizedEmail = normalizeLoginValue(toEmail);

  if (!normalizedEmail) {
    throw Object.assign(new Error('Family email is required for MFA delivery.'), { status: 400 });
  }

  const friendlySeniorName = String(seniorName || 'Senior').trim() || 'Senior';
  const subject = `CareConnect verification code for ${friendlySeniorName}`;
  const expiryText = formatVerificationExpiry(expiresAt);
  const safeSeniorId = String(seniorShortId || '').trim() || 'N/A';
  const text = [
    'Your CareConnect verification code is below:',
    '',
    `Code: ${code}`,
    `Senior: ${friendlySeniorName}`,
    `Senior ID: ${safeSeniorId}`,
    `Expires: ${expiryText}`,
    '',
    'If you did not request this code, you can ignore this email.',
  ].join('\n');

  await transporter.sendMail({
    from: MFA_EMAIL_FROM,
    to: normalizedEmail,
    subject,
    text,
  });
}

function isExpiredServiceNowDateTime(value = '') {
  if (!value) {
    return true;
  }

  const normalizedValue = String(value).trim().replace(' ', 'T');
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalizedValue);
  const date = new Date(hasTimezone ? normalizedValue : `${normalizedValue}Z`);

  return Number.isNaN(date.getTime()) || date.getTime() < Date.now();
}

function getShortSeniorId(record = {}) {
  return String(record.sys_id || '').slice(0, SENIOR_DISPLAY_ID_LENGTH).toUpperCase();
}

function isFamilyVerificationVerified(record = {}) {
  return Boolean(getDisplayValue(record[FAMILY_VERIFICATION_FIELD_MAP.verifiedAt]));
}

function toFamilyVerificationRecord(record = {}) {
  const verifiedAt = getDisplayValue(record[FAMILY_VERIFICATION_FIELD_MAP.verifiedAt]);

  return {
    id: record.sys_id || '',
    seniorId: getReferenceValue(record[FAMILY_VERIFICATION_FIELD_MAP.senior]),
    seniorName: getDisplayValue(record[FAMILY_VERIFICATION_FIELD_MAP.senior]),
    familyEmail: getDisplayValue(record[FAMILY_VERIFICATION_FIELD_MAP.familyEmail]),
    code: getDisplayValue(record[FAMILY_VERIFICATION_FIELD_MAP.code]),
    expiresAt: getDisplayValue(record[FAMILY_VERIFICATION_FIELD_MAP.expiresAt]),
    status: verifiedAt ? 'Verified' : 'Pending',
    verifiedAt,
    familyUserId: getReferenceValue(record[FAMILY_VERIFICATION_FIELD_MAP.familyUser]),
  };
}

async function findSeniorProfileByIdOrUserId(seniorId) {
  const normalizedSeniorId = String(seniorId || '').trim();
  const comparableSeniorId = normalizedSeniorId.toLowerCase();

  if (!normalizedSeniorId) {
    return null;
  }

  try {
    const data = await serviceNowFetch(getTablePath(`/${encodeURIComponent(normalizedSeniorId)}`));

    if (data?.result?.sys_id) {
      return data.result;
    }
  } catch (error) {
    if (error.status !== 404) {
      throw error;
    }
  }

  const profileByUserId = await findSeniorProfileByUserId(normalizedSeniorId);

  if (profileByUserId?.sys_id) {
    return profileByUserId;
  }

  if (/^[a-f0-9]{6,12}$/i.test(normalizedSeniorId)) {
    const params = new URLSearchParams({
      sysparm_query: `sys_idSTARTSWITH${comparableSeniorId}`,
      sysparm_limit: '2',
    });
    const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));
    let matches = data?.result || [];

    if (matches.length === 0) {
      const fallbackParams = new URLSearchParams({
        sysparm_fields: 'sys_id',
        sysparm_limit: '1000',
      });
      const fallbackData = await serviceNowFetch(getTablePath(`?${fallbackParams.toString()}`));
      matches = (fallbackData?.result || []).filter((record) => {
        return String(record.sys_id || '').toLowerCase().startsWith(comparableSeniorId);
      });
    }

    if (matches.length > 1) {
      throw Object.assign(new Error('Senior ID matches more than one senior. Please use the full Senior ID.'), {
        status: 409,
      });
    }

    return matches[0] || null;
  }

  return null;
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

async function updateLoginCheckInTimestamp({ userId, email, name, checkInAt }) {
  if (!LOGIN_FIELD_MAP.lastCheckIn || !checkInAt) {
    return null;
  }

  let loginRecord = null;
  const normalizedUserId = String(userId || '').trim();

  if (normalizedUserId) {
    try {
      const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${encodeURIComponent(normalizedUserId)}`));
      loginRecord = data?.result || null;
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
    }
  }

  if (!loginRecord?.sys_id) {
    const identifier = email || name;
    loginRecord = identifier ? await findLoginRecordByIdentifier(String(identifier).trim()) : null;
  }

  if (!loginRecord?.sys_id) {
    return null;
  }

  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${encodeURIComponent(loginRecord.sys_id)}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [LOGIN_FIELD_MAP.lastCheckIn]: checkInAt,
    }),
  });

  return data?.result || loginRecord;
}

async function findSeniorLoginUser(normalizedIdentifier, rawPassword, rawIdentifier = normalizedIdentifier) {
  const trimmedRawIdentifier = String(rawIdentifier || '').trim();
  const queryValues = Array.from(new Set([trimmedRawIdentifier, normalizedIdentifier].filter(Boolean)));
  const query = queryValues
    .map((value) => `${LOGIN_FIELD_MAP.email}=${value}^OR${LOGIN_FIELD_MAP.username}=${value}`)
    .join('^OR');
  const params = new URLSearchParams({
    sysparm_query: query,
    sysparm_limit: '10',
  });
  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `?${params.toString()}`));
  const record = data?.result?.find((user) => {
    const email = normalizeLoginValue(getDisplayValue(user[LOGIN_FIELD_MAP.email]));
    const username = normalizeLoginValue(getDisplayValue(user[LOGIN_FIELD_MAP.username]));
    const password = getDisplayValue(user[LOGIN_FIELD_MAP.password]);

    return (
      (email === normalizedIdentifier || username === normalizedIdentifier) &&
      String(password || '') === String(rawPassword)
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

async function findLoginRecordByIdentifier(normalizedIdentifier, rawIdentifier = normalizedIdentifier) {
  const queryValues = Array.from(new Set([String(rawIdentifier || '').trim(), normalizedIdentifier].filter(Boolean)));
  const query = queryValues
    .map((value) => `${LOGIN_FIELD_MAP.email}=${value}^OR${LOGIN_FIELD_MAP.username}=${value}`)
    .join('^OR');
  const params = new URLSearchParams({
    sysparm_query: query,
    sysparm_limit: '10',
  });

  const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `?${params.toString()}`));

  return (data?.result || []).find((user) => {
    const email = normalizeLoginValue(getDisplayValue(user[LOGIN_FIELD_MAP.email]));
    const username = normalizeLoginValue(getDisplayValue(user[LOGIN_FIELD_MAP.username]));

    return email === normalizedIdentifier || username === normalizedIdentifier;
  }) || null;
}

export async function resetPasswordWithServiceNow({ identifier, password, loginType = 'senior' }) {
  const normalizedIdentifier = String(identifier || '').trim();
  const comparableIdentifier = normalizeLoginValue(normalizedIdentifier);
  const rawPassword = String(password || '');
  const normalizedLoginType = String(loginType || 'senior').trim().toLowerCase();

  if (!normalizedIdentifier || !rawPassword) {
    throw Object.assign(new Error('Username/email and new password are required.'), { status: 400 });
  }

  if (rawPassword.length < 4) {
    throw Object.assign(new Error('New password must be at least 4 characters.'), { status: 400 });
  }

  const record = await findLoginRecordByIdentifier(comparableIdentifier, normalizedIdentifier);

  if (!record?.sys_id) {
    throw Object.assign(new Error('Account was not found.'), { status: 404 });
  }

  const role = getDisplayValue(record[LOGIN_FIELD_MAP.role]) || getReferenceValue(record[LOGIN_FIELD_MAP.role]);

  if (normalizedLoginType === 'family' && !isFamilyRole(role) && !isCaregiverRole(role)) {
    throw Object.assign(new Error('This account is for Seniors. Please use Seniors login tab.'), { status: 403 });
  }

  if (normalizedLoginType !== 'family' && !isSeniorRole(role)) {
    throw Object.assign(new Error('Only senior accounts can use the Senior login tab. Please use Caregiver / Family.'), { status: 403 });
  }

  await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${record.sys_id}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [LOGIN_FIELD_MAP.password]: rawPassword,
    }),
  });

  return { ok: true };
}

export async function loginWithServiceNow({ identifier, email, password, loginType = 'senior' }) {
  const normalizedIdentifier = String(identifier || email || '').trim();
  const comparableIdentifier = normalizeLoginValue(normalizedIdentifier);
  const rawPassword = String(password || '');
  const normalizedLoginType = String(loginType || 'senior').trim().toLowerCase();

  if (!normalizedIdentifier || !rawPassword) {
    throw Object.assign(new Error('Email/username and password are required.'), { status: 400 });
  }

  const seniorUser = await findSeniorLoginUser(comparableIdentifier, rawPassword, normalizedIdentifier);

  if (seniorUser) {
    if (normalizedLoginType === 'family' && !isFamilyRole(seniorUser.role) && !isCaregiverRole(seniorUser.role)) {
      throw Object.assign(
        new Error('This account is for Seniors. Please use Seniors login tab.'),
        { status: 403 },
      );
    }

    if (normalizedLoginType !== 'family' && !isSeniorRole(seniorUser.role)) {
      throw Object.assign(
        new Error('Only senior accounts can use the Senior login tab. Please use Caregiver / Family.'),
        { status: 403 },
      );
    }

    if (!isFamilyRole(seniorUser.role) && !isCaregiverRole(seniorUser.role) && !isSeniorRole(seniorUser.role)) {
      throw Object.assign(new Error('This account role is not allowed to log in here.'), { status: 403 });
    }

    return seniorUser;
  }

  throw Object.assign(
    new Error('Email/username or password is incorrect.'),
    { status: 401 },
  );
}

export async function registerWithServiceNow({ email, password, name, role = 'caregiver' }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const rawPassword = String(password || '');
  const requestedRole = normalizeRole(role);
  const normalizedRole = ['caregiver', 'children', 'volunteer'].includes(requestedRole)
    ? requestedRole
    : isFamilyRole(role)
      ? 'children'
      : 'caregiver';

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

  const displayName = String(name || '').trim() || normalizedEmail.split('@')[0] || (normalizedRole === 'family' ? 'Family Member' : 'Caregiver');
  const payload = {
    [LOGIN_FIELD_MAP.username]: normalizedEmail,
    [LOGIN_FIELD_MAP.email]: normalizedEmail,
    [LOGIN_FIELD_MAP.password]: rawPassword,
    [LOGIN_FIELD_MAP.name]: displayName,
    [LOGIN_FIELD_MAP.role]: normalizedRole,
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

function toSosAlertHistory(record = {}) {
  const status = getDisplayValue(record[SOS_ALERT_FIELD_MAP.status]) || 'New';
  const message = getDisplayValue(record[SOS_ALERT_FIELD_MAP.message]);

  if (/reminder/i.test(status) || /check[-\s]?in/i.test(message)) {
    return null;
  }

  return {
    id: record.sys_id,
    seniorName: getDisplayValue(record[SOS_ALERT_FIELD_MAP.seniorName]) || 'Senior',
    status,
    location: getDisplayValue(record[SOS_ALERT_FIELD_MAP.location]),
    message,
    alertTime: record.sys_created_on || '',
    resolvedAt: record.sys_updated_on || record.sys_created_on || '',
  };
}

export async function getSosAlertHistory({ limit = 50 } = {}) {
  const normalizedLimit = Math.max(1, Math.min(Number(limit) || 50, 100));
  const params = new URLSearchParams({
    sysparm_query: 'ORDERBYDESCsys_created_on',
    sysparm_limit: String(normalizedLimit),
  });
  const data = await serviceNowFetch(getNamedTablePath(SOS_ALERT_TABLE, `?${params.toString()}`));

  return (data?.result || [])
    .map(toSosAlertHistory)
    .filter(Boolean);
}

function normalizeAppointmentDate(value = '') {
  const text = String(value || '').trim();

  if (!text) {
    return '';
  }

  const match = /^(\d{4}-\d{2}-\d{2})/.exec(text);
  return match ? match[1] : text;
}

function normalizeAppointmentTime(value = '') {
  const text = String(value || '').trim();

  if (!text) {
    return '';
  }

  const dateTimeMatch = /^\d{4}-\d{2}-\d{2}[ T](\d{2}:\d{2}(?::\d{2})?)/.exec(text);

  if (dateTimeMatch) {
    return dateTimeMatch[1];
  }

  const match = /^(\d{2}:\d{2}(?::\d{2})?)/.exec(text);
  return match ? match[1] : text;
}

function normalizeAppointmentStatus(value = '') {
  const text = String(value || '').trim().toLowerCase();

  if (/completed|done/.test(text)) {
    return 'completed';
  }

  if (/cancelled|canceled/.test(text)) {
    return 'cancelled';
  }

  return 'scheduled';
}

function inferCompletedStatus(status, date, time) {
  if (status !== 'scheduled' || !date) {
    return status;
  }

  const normalizedTime = (time || '23:59:59').length === 5 ? `${time}:00` : (time || '23:59:59');
  const parsed = new Date(`${date}T${normalizedTime}`);

  if (Number.isNaN(parsed.getTime())) {
    const fallbackParsed = new Date(`${date}T23:59:59`);
    return !Number.isNaN(fallbackParsed.getTime()) && fallbackParsed.getTime() < Date.now() ? 'completed' : status;
  }

  return parsed.getTime() < Date.now() ? 'completed' : status;
}

function getAppointmentDisplayValue(record = {}, primaryField = '', fallbackFields = []) {
  const candidates = [primaryField, ...fallbackFields].filter(Boolean);

  for (const field of candidates) {
    const value = getDisplayValue(record[field]);

    if (String(value || '').trim()) {
      return value;
    }
  }

  return '';
}

function getAppointmentReferenceValue(record = {}, primaryField = '', fallbackFields = []) {
  const candidates = [primaryField, ...fallbackFields].filter(Boolean);

  for (const field of candidates) {
    const value = getReferenceValue(record[field]);

    if (String(value || '').trim()) {
      return value;
    }
  }

  return '';
}

function toCaregiverAppointmentRecord(record = {}, seniorNamesByProfileId = new Map()) {
  const seniorReferenceId = getAppointmentReferenceValue(record, APPOINTMENT_FIELD_MAP.senior, ['senior_name', 'senior']) || '';
  const resolvedSeniorName = seniorNamesByProfileId.get(seniorReferenceId) || '';
  const seniorName = resolvedSeniorName || getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.senior, ['senior_name', 'senior']) || 'Senior';
  const title = getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.type, ['appointment_type', 'type']) || 'Appointment';

  const date = normalizeAppointmentDate(getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.date, ['appointment_date', 'date']));
  const time = normalizeAppointmentTime(getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.time, ['appointment_time', 'time']));
  const rawStatus = normalizeAppointmentStatus(getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.status, ['status']));

  return {
    id: record.sys_id || '',
    seniorId: seniorReferenceId,
    seniorName,
    title,
    date,
    time,
    location: getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.location, ['location']) || '',
    notes: getAppointmentDisplayValue(record, APPOINTMENT_FIELD_MAP.notes, ['notes', 'description']) || '',
    status: inferCompletedStatus(rawStatus, date, time),
    createdAt: String(record.sys_created_on || ''),
  };
}

async function getAppointmentById(appointmentId) {
  const normalizedAppointmentId = String(appointmentId || '').trim();

  if (!normalizedAppointmentId) {
    throw Object.assign(new Error('Appointment ID is required.'), { status: 400 });
  }

  const data = await serviceNowFetch(getNamedTablePath(APPOINTMENT_TABLE, `/${encodeURIComponent(normalizedAppointmentId)}`));
  return data?.result || null;
}

function withOptionalStatus(payload = {}, status = '') {
  if (APPOINTMENT_FIELD_MAP.status && status) {
    payload[APPOINTMENT_FIELD_MAP.status] = status;
  }

  return payload;
}

async function getSeniorNamesByProfileIds(profileIds = []) {
  const uniqueIds = Array.from(
    new Set(
      profileIds
        .map((id) => String(id || '').trim())
        .filter(Boolean),
    ),
  );

  if (uniqueIds.length === 0) {
    return new Map();
  }

  const params = new URLSearchParams({
    sysparm_query: `sys_idIN${uniqueIds.join(',')}`,
    sysparm_fields: `sys_id,${FIELD_MAP.name}`,
    sysparm_limit: String(Math.min(uniqueIds.length, 200)),
  });
  const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));
  const records = data?.result || [];

  return records.reduce((lookup, record) => {
    const sysId = String(record?.sys_id || '').trim();
    const name = String(getDisplayValue(record?.[FIELD_MAP.name]) || '').trim();

    if (sysId && name) {
      lookup.set(sysId, name);
    }

    return lookup;
  }, new Map());
}

export async function getAppointmentsForCaregiver({ caregiverId, caregiverEmail, limit = 100 } = {}) {
  const normalizedCaregiverId = String(caregiverId || '').trim();
  const normalizedCaregiverEmail = normalizeLoginValue(caregiverEmail);

  if (!normalizedCaregiverId && !normalizedCaregiverEmail) {
    throw Object.assign(new Error('Caregiver ID or email is required.'), { status: 400 });
  }

  const queryParts = [];

  if (normalizedCaregiverId) {
    queryParts.push(`${APPOINTMENT_FIELD_MAP.caregiver}=${normalizedCaregiverId}`);
  }

  if (normalizedCaregiverEmail) {
    queryParts.push(`${APPOINTMENT_FIELD_MAP.caregiver}=${normalizedCaregiverEmail}`);
  }

  const normalizedLimit = Math.max(1, Math.min(Number(limit) || 100, 200));
  const params = new URLSearchParams({
    sysparm_query: `${queryParts.join('^OR')}^ORDERBYDESCsys_created_on`,
    sysparm_limit: String(normalizedLimit),
  });
  const data = await serviceNowFetch(getNamedTablePath(APPOINTMENT_TABLE, `?${params.toString()}`));
  const records = data?.result || [];
  const seniorNamesByProfileId = await getSeniorNamesByProfileIds(
    records.map((record) => getAppointmentReferenceValue(record, APPOINTMENT_FIELD_MAP.senior, ['senior_name', 'senior'])),
  );

  return records.map((record) => toCaregiverAppointmentRecord(record, seniorNamesByProfileId));
}

export async function createAppointmentForCaregiver({ caregiverId, caregiverEmail, seniorId, title, date, time, location, notes, status = 'scheduled' } = {}) {
  const normalizedCaregiverId = String(caregiverId || '').trim();
  const normalizedCaregiverEmail = normalizeLoginValue(caregiverEmail);
  const normalizedSeniorId = String(seniorId || '').trim();
  const normalizedTitle = String(title || '').trim();
  const normalizedDate = normalizeAppointmentDate(String(date || '').trim());
  const normalizedTime = normalizeAppointmentTime(String(time || '').trim());

  if (!normalizedCaregiverId && !normalizedCaregiverEmail) {
    throw Object.assign(new Error('Caregiver ID or email is required.'), { status: 400 });
  }

  if (!normalizedSeniorId || !normalizedTitle || !normalizedDate || !normalizedTime) {
    throw Object.assign(new Error('Senior, title, date, and time are required.'), { status: 400 });
  }

  const seniorProfile = await findSeniorProfileByIdOrUserId(normalizedSeniorId);

  if (!seniorProfile?.sys_id) {
    throw Object.assign(new Error('Senior profile was not found.'), { status: 404 });
  }

  const payload = withOptionalStatus({
    [APPOINTMENT_FIELD_MAP.caregiver]: normalizedCaregiverId || normalizedCaregiverEmail,
    [APPOINTMENT_FIELD_MAP.senior]: seniorProfile.sys_id,
    [APPOINTMENT_FIELD_MAP.type]: normalizedTitle,
    [APPOINTMENT_FIELD_MAP.date]: normalizedDate,
    [APPOINTMENT_FIELD_MAP.time]: normalizedTime,
    [APPOINTMENT_FIELD_MAP.location]: String(location || '').trim(),
    [APPOINTMENT_FIELD_MAP.notes]: String(notes || '').trim(),
  }, status);

  const data = await serviceNowFetch(getNamedTablePath(APPOINTMENT_TABLE), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const record = data?.result || {};
  const seniorNamesByProfileId = await getSeniorNamesByProfileIds([
    getAppointmentReferenceValue(record, APPOINTMENT_FIELD_MAP.senior, ['senior_name', 'senior']),
  ]);

  return toCaregiverAppointmentRecord(record, seniorNamesByProfileId);
}

export async function updateAppointmentForCaregiver({ appointmentId, seniorId, title, date, time, location, notes, status } = {}) {
  const normalizedAppointmentId = String(appointmentId || '').trim();

  if (!normalizedAppointmentId) {
    throw Object.assign(new Error('Appointment ID is required.'), { status: 400 });
  }

  const payload = {};

  if (seniorId !== undefined) {
    const seniorProfile = await findSeniorProfileByIdOrUserId(String(seniorId || '').trim());

    if (!seniorProfile?.sys_id) {
      throw Object.assign(new Error('Senior profile was not found.'), { status: 404 });
    }

    payload[APPOINTMENT_FIELD_MAP.senior] = seniorProfile.sys_id;
  }

  if (title !== undefined) payload[APPOINTMENT_FIELD_MAP.type] = String(title || '').trim();
  if (date !== undefined) payload[APPOINTMENT_FIELD_MAP.date] = normalizeAppointmentDate(String(date || '').trim());
  if (time !== undefined) payload[APPOINTMENT_FIELD_MAP.time] = normalizeAppointmentTime(String(time || '').trim());
  if (location !== undefined) payload[APPOINTMENT_FIELD_MAP.location] = String(location || '').trim();
  if (notes !== undefined) payload[APPOINTMENT_FIELD_MAP.notes] = String(notes || '').trim();
  if (status !== undefined && APPOINTMENT_FIELD_MAP.status) payload[APPOINTMENT_FIELD_MAP.status] = status;

  if (Object.keys(payload).length === 0) {
    throw Object.assign(new Error('No appointment changes were provided.'), { status: 400 });
  }

  const data = await serviceNowFetch(getNamedTablePath(APPOINTMENT_TABLE, `/${encodeURIComponent(normalizedAppointmentId)}`), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  const record = data?.result || await getAppointmentById(normalizedAppointmentId);
  const seniorNamesByProfileId = await getSeniorNamesByProfileIds([
    getAppointmentReferenceValue(record, APPOINTMENT_FIELD_MAP.senior, ['senior_name', 'senior']),
  ]);

  return toCaregiverAppointmentRecord(record, seniorNamesByProfileId);
}

export async function deleteAppointmentForCaregiver({ appointmentId } = {}) {
  const normalizedAppointmentId = String(appointmentId || '').trim();

  if (!normalizedAppointmentId) {
    throw Object.assign(new Error('Appointment ID is required.'), { status: 400 });
  }

  await serviceNowFetch(getNamedTablePath(APPOINTMENT_TABLE, `/${encodeURIComponent(normalizedAppointmentId)}`), {
    method: 'DELETE',
  });

  return { id: normalizedAppointmentId };
}

async function getLoginRecordById(userId) {
  if (!userId) {
    return null;
  }

  // Tolerate dangling references: a connection row pointing at a deleted (or
  // never-valid) login must resolve to null, not blow up the whole request.
  try {
    const data = await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${encodeURIComponent(userId)}`));
    return data?.result || null;
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

async function findSeniorProfileByUserId(userId) {
  if (!userId) {
    return null;
  }

  if (FIELD_MAP.userId === 'sys_id') {
    try {
      const data = await serviceNowFetch(getTablePath(`/${encodeURIComponent(userId)}`));
      return data?.result || null;
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  const params = new URLSearchParams({
    sysparm_query: `${FIELD_MAP.userId}=${userId}`,
    sysparm_limit: '20',
  });
  const data = await serviceNowFetch(getTablePath(`?${params.toString()}`));

  return getBestSeniorProfileRecord(data?.result || []);
}

function getSeniorProfileCompletenessScore(record = {}) {
  return [
    FIELD_MAP.name,
    FIELD_MAP.phone,
    FIELD_MAP.email,
    FIELD_MAP.gender,
    FIELD_MAP.dateOfBirth,
    FIELD_MAP.bloodType,
    FIELD_MAP.allergies,
    FIELD_MAP.medicalConditions,
    FIELD_MAP.locationZones,
    FIELD_MAP.lastCheckInAt,
    FIELD_MAP.points,
  ].reduce((score, field) => (getDisplayValue(record[field]) ? score + 1 : score), 0);
}

function getBestSeniorProfileRecord(records = []) {
  return [...records].sort((first, second) => {
    const scoreDelta = getSeniorProfileCompletenessScore(second) - getSeniorProfileCompletenessScore(first);

    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    const secondUpdatedAt = new Date(second.sys_updated_on || second.sys_created_on || 0).getTime();
    const firstUpdatedAt = new Date(first.sys_updated_on || first.sys_created_on || 0).getTime();

    return secondUpdatedAt - firstUpdatedAt;
  })[0] || null;
}

function getMappedSeniorCompletenessScore(senior = {}) {
  return [
    senior.name,
    senior.phone,
    senior.email,
    senior.gender,
    senior.dateOfBirth,
    senior.bloodType,
    senior.allergies,
    senior.medicalConditions,
    senior.location,
    senior.lastCheckIn,
    senior.points,
  ].reduce((score, value) => (getDisplayValue(value) ? score + 1 : score), 0);
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

export async function createFamilyVerification({ seniorId, familyEmail, familyUserId }) {
  const normalizedFamilyEmail = normalizeLoginValue(familyEmail);
  const normalizedFamilyUserId = String(familyUserId || '').trim();
  const seniorProfile = await findSeniorProfileByIdOrUserId(seniorId);

  if (!seniorProfile?.sys_id) {
    throw Object.assign(new Error('Senior ID was not found.'), { status: 404 });
  }

  if (!normalizedFamilyEmail || !normalizedFamilyUserId) {
    throw Object.assign(new Error('Family member account is required.'), { status: 400 });
  }

  const expiresAt = getServiceNowUtcDateTime(new Date(Date.now() + 10 * 60 * 1000));
  const verificationCode = generateVerificationCode();
  const data = await serviceNowFamilyVerificationFetch('', {
    method: 'POST',
    body: JSON.stringify({
      [FAMILY_VERIFICATION_FIELD_MAP.senior]: seniorProfile.sys_id,
      [FAMILY_VERIFICATION_FIELD_MAP.familyEmail]: normalizedFamilyEmail,
      [FAMILY_VERIFICATION_FIELD_MAP.code]: verificationCode,
      [FAMILY_VERIFICATION_FIELD_MAP.expiresAt]: expiresAt,
      [FAMILY_VERIFICATION_FIELD_MAP.familyUser]: normalizedFamilyUserId,
    }),
  });
  const verification = toFamilyVerificationRecord(data?.result || {});

  try {
    await sendFamilyVerificationEmail({
      toEmail: normalizedFamilyEmail,
      code: verificationCode,
      seniorName: getDisplayValue(seniorProfile[FIELD_MAP.name]) || 'Senior',
      seniorShortId: getShortSeniorId(seniorProfile),
      expiresAt,
    });
  } catch (error) {
    console.error('Unable to send family verification email:', error);
    throw Object.assign(
      new Error('Unable to send verification code email. Please check email settings and try again.'),
      { status: 502 },
    );
  }

  return {
    verification: {
      ...verification,
      code: undefined,
    },
  };
}

export async function getPendingFamilyVerificationCodesForSenior(userId) {
  const seniorProfile = await findSeniorProfileByIdOrUserId(userId);

  if (!seniorProfile?.sys_id) {
    return [];
  }

  const params = new URLSearchParams({
    sysparm_query: `${FAMILY_VERIFICATION_FIELD_MAP.senior}=${seniorProfile.sys_id}^ORDERBYDESCsys_created_on`,
    sysparm_limit: '20',
  });
  const data = await serviceNowFamilyVerificationFetch(`?${params.toString()}`);
  const records = data?.result || [];
  const activeRecords = [];

  await Promise.all(records.map(async (record) => {
    const verification = toFamilyVerificationRecord(record);

    if (isFamilyVerificationVerified(record) || isExpiredServiceNowDateTime(verification.expiresAt)) {
      return;
    }

    activeRecords.push(verification);
  }));

  return activeRecords;
}

export async function verifyFamilyVerification({ verificationId, seniorId, familyEmail, familyUserId, code, relationship }) {
  const normalizedCode = String(code || '').trim();
  const normalizedFamilyEmail = normalizeLoginValue(familyEmail);
  const normalizedFamilyUserId = String(familyUserId || '').trim();
  let record = null;

  if (!normalizedCode) {
    throw Object.assign(new Error('Verification code is required.'), { status: 400 });
  }

  if (verificationId) {
    const data = await serviceNowFamilyVerificationFetch(`/${encodeURIComponent(verificationId)}`);
    record = data?.result || null;
  } else {
    const seniorProfile = await findSeniorProfileByIdOrUserId(seniorId);
    const params = new URLSearchParams({
      sysparm_query: `${FAMILY_VERIFICATION_FIELD_MAP.senior}=${seniorProfile?.sys_id || seniorId}^${FAMILY_VERIFICATION_FIELD_MAP.familyEmail}=${normalizedFamilyEmail}^ORDERBYDESCsys_created_on`,
      sysparm_limit: '10',
    });
    const data = await serviceNowFamilyVerificationFetch(`?${params.toString()}`);
    record = (data?.result || []).find((candidate) => {
      const verification = toFamilyVerificationRecord(candidate);

      return !isFamilyVerificationVerified(candidate) && !isExpiredServiceNowDateTime(verification.expiresAt);
    }) || null;
  }

  const verification = toFamilyVerificationRecord(record || {});

  if (!verification.id) {
    throw Object.assign(new Error('Verification request was not found.'), { status: 404 });
  }

  if (verification.familyEmail.toLowerCase() !== normalizedFamilyEmail || verification.familyUserId !== normalizedFamilyUserId) {
    throw Object.assign(new Error('This verification request does not belong to this account.'), { status: 403 });
  }

  if (verification.verifiedAt) {
    throw Object.assign(new Error('This verification request has already been verified.'), { status: 409 });
  }

  if (isExpiredServiceNowDateTime(verification.expiresAt)) {
    throw Object.assign(new Error('This verification code has expired. Please request a new code.'), { status: 410 });
  }

  if (verification.code !== normalizedCode) {
    throw Object.assign(new Error('Verification code is incorrect.'), { status: 401 });
  }

  await serviceNowFamilyVerificationFetch(`/${encodeURIComponent(verification.id)}`, {
    method: 'PATCH',
    body: JSON.stringify({
      [FAMILY_VERIFICATION_FIELD_MAP.verifiedAt]: getServiceNowUtcDateTime(),
    }),
  });

  const role = getRoleFromRelationship(relationship);
  await serviceNowFetch(getNamedTablePath(LOGIN_TABLE, `/${encodeURIComponent(normalizedFamilyUserId)}`), {
    method: 'PATCH',
    body: JSON.stringify({
      [LOGIN_FIELD_MAP.role]: role,
    }),
  });

  const connection = await createCaregiverConnection({
    caregiverId: normalizedFamilyUserId,
    caregiverEmail: normalizedFamilyEmail,
    seniorId: verification.seniorId,
    relationship: relationship || 'Family Member',
  });

  return { verification: { ...verification, status: 'Verified', code: undefined }, connection };
}

function toCaregiverSeniorRecord(connection = {}, seniorProfile = {}, seniorUser = {}) {
  const seniorUserId = getReferenceValue(seniorProfile[FIELD_MAP.userId]) || seniorUser.sys_id || '';

  return {
    id: seniorProfile.sys_id || connection.sys_id,
    connectionId: connection.sys_id,
    userId: seniorUserId,
    name:
      getDisplayValue(seniorProfile[FIELD_MAP.name]) ||
      seniorUser[LOGIN_FIELD_MAP.name] ||
      seniorUser[LOGIN_FIELD_MAP.username] ||
      seniorUser[LOGIN_FIELD_MAP.email]?.split('@')[0] ||
      'Senior',
    phone: getDisplayValue(seniorProfile[FIELD_MAP.phone]) || seniorUser.u_phone || '',
    email: getDisplayValue(seniorProfile[FIELD_MAP.email]) || seniorUser[LOGIN_FIELD_MAP.email] || '',
    gender: getDisplayValue(seniorProfile[FIELD_MAP.gender]) || '',
    dateOfBirth: getDisplayValue(seniorProfile[FIELD_MAP.dateOfBirth]) || '',
    bloodType: getDisplayValue(seniorProfile[FIELD_MAP.bloodType]) || '',
    allergies: getDisplayValue(seniorProfile[FIELD_MAP.allergies]) || '',
    medicalConditions: getDisplayValue(seniorProfile[FIELD_MAP.medicalConditions]) || '',
    location: getDisplayValue(seniorProfile[FIELD_MAP.locationZones]) || '',
    address: getDisplayValue(seniorProfile[FIELD_MAP.address]) || '',
    lastCheckIn: getDisplayValue(seniorProfile[FIELD_MAP.lastCheckInAt]) || '',
    points: Number(getDisplayValue(seniorProfile[FIELD_MAP.points])) || 0,
    caregiverName: '',
    caregiverEmail: '',
    emergencyContactName: getDisplayValue(seniorProfile[FIELD_MAP.emergencyContactName]) || getDisplayValue(seniorProfile.u_emergency_contact_name) || getDisplayValue(connection[CAREGIVER_CONNECTION_FIELD_MAP.emergencyContactName]) || getDisplayValue(connection.emergency_contact_name) || '',
    emergencyContactPhone: getDisplayValue(seniorProfile[FIELD_MAP.emergencyContactPhone]) || getDisplayValue(seniorProfile.u_emergency_contact_phone) || getDisplayValue(connection[CAREGIVER_CONNECTION_FIELD_MAP.emergencyContactPhone]) || getDisplayValue(connection.emergency_contact_phone) || '',
    relationship: getDisplayValue(connection[CAREGIVER_CONNECTION_FIELD_MAP.relationship]) || '',
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
  const message = getDisplayValue(record[SOS_ALERT_FIELD_MAP.message]);

  if (/resolved|closed|cancelled|canceled|reminder/i.test(status) || /check[-\s]?in/i.test(message)) {
    return null;
  }

  return {
    id: record.sys_id,
    location: getDisplayValue(record[SOS_ALERT_FIELD_MAP.location]),
    message,
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

function normalizePhone(value = '') {
  return String(value || '').replace(/\D/g, '');
}

function toCheckInReminder(record = {}) {
  return {
    id: record.sys_id,
    message: getDisplayValue(record[SOS_ALERT_FIELD_MAP.message]) || 'Please complete your check-in for today.',
    status: getDisplayValue(record[SOS_ALERT_FIELD_MAP.status]) || 'Reminder Sent',
    createdAt: record.sys_created_on || '',
  };
}

export async function getCheckInRemindersForSenior(userId) {
  const seniorProfile = await findSeniorProfileByIdOrUserId(userId);

  if (!seniorProfile?.sys_id) {
    return [];
  }

  const seniorName = normalizeLoginValue(getDisplayValue(seniorProfile[FIELD_MAP.name]));
  const seniorPhone = normalizePhone(getDisplayValue(seniorProfile[FIELD_MAP.phone]));
  const params = new URLSearchParams({
    sysparm_query: 'ORDERBYDESCsys_created_on',
    sysparm_limit: '50',
  });
  const data = await serviceNowFetch(getNamedTablePath(SOS_ALERT_TABLE, `?${params.toString()}`));

  return (data?.result || [])
    .filter((record) => {
      const reminderStatus = normalizeLoginValue(getDisplayValue(record[SOS_ALERT_FIELD_MAP.status]));
      const reminderMessage = normalizeLoginValue(getDisplayValue(record[SOS_ALERT_FIELD_MAP.message]));
      const reminderName = normalizeLoginValue(getDisplayValue(record[SOS_ALERT_FIELD_MAP.seniorName]));
      const reminderPhone = normalizePhone(getDisplayValue(record[SOS_ALERT_FIELD_MAP.seniorPhone]));
      const isReminderRecord = reminderStatus.includes('reminder') || reminderMessage.includes('checkin');
      const isSameSenior =
        (seniorPhone && reminderPhone && seniorPhone === reminderPhone) ||
        (seniorName && reminderName && seniorName === reminderName);

      return isReminderRecord && isSameSenior;
    })
    .map(toCheckInReminder);
}

export async function createCaregiverConnection(data) {
  const caregiverIdentifier = normalizeLoginValue(data.caregiverEmail || data.caregiverUsername);
  const seniorIdentifier = normalizeLoginValue(data.seniorEmail || data.seniorUsername);
  // Only trust a caller-supplied caregiverId that is an actual sys_id —
  // anything else written into the u_user reference is silently stored as an
  // EMPTY reference by ServiceNow, leaving orphan connection rows (13 of
  // those were found in u_caregiver_profiles on 2026-07-07).
  const looksLikeSysId = (value) => /^[a-f0-9]{32}$/i.test(String(value || '').trim());
  const caregiverUser = looksLikeSysId(data.caregiverId)
    ? { sys_id: data.caregiverId }
    : await findLoginRecordByIdentifier(caregiverIdentifier);
  const seniorUser = looksLikeSysId(data.seniorUserId)
    ? { sys_id: data.seniorUserId }
    : await findLoginRecordByIdentifier(seniorIdentifier);
  const seniorProfile = data.seniorId
    ? await findSeniorProfileByIdOrUserId(data.seniorId)
    : await findSeniorProfileByUserId(seniorUser?.sys_id);

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

export async function deleteCaregiverConnection(data = {}) {
  const connectionId = String(data.connectionId || '').trim();
  const normalizedCaregiverId = String(data.caregiverId || '').trim();
  const normalizedEmail = normalizeLoginValue(data.caregiverEmail);

  if (!connectionId) {
    throw Object.assign(new Error('Caregiver connection ID is required.'), { status: 400 });
  }

  const caregiverUserId = normalizedCaregiverId || (normalizedEmail ? (await findLoginRecordByIdentifier(normalizedEmail))?.sys_id : '');
  const connectionData = await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE, `/${encodeURIComponent(connectionId)}`));
  const connection = connectionData?.result || {};
  const connectionCaregiverId = getReferenceValue(connection[CAREGIVER_CONNECTION_FIELD_MAP.user]);

  if (caregiverUserId && connectionCaregiverId && connectionCaregiverId !== caregiverUserId) {
    throw Object.assign(new Error('This senior is not linked to the current caregiver.'), { status: 403 });
  }

  await serviceNowFetch(getNamedTablePath(CAREGIVER_CONNECTION_TABLE, `/${encodeURIComponent(connectionId)}`), {
    method: 'DELETE',
  });

  return { id: connectionId };
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
  // One broken connection row (deleted senior profile, dangling login ref)
  // must not reject the whole Promise.all and empty the caregiver's list —
  // resolve what we can, skip the rest.
  const seniors = await Promise.all((data?.result || []).map(async (connection) => {
    // Merged 2026-07-09: upstream's medication/medical-info enrichment kept,
    // wrapped in the pre-existing dangling-ref try/catch (one broken
    // connection row must not reject the whole Promise.all).
    try {
      const seniorProfileId = getReferenceValue(connection[CAREGIVER_CONNECTION_FIELD_MAP.senior]);
      const seniorProfileData = seniorProfileId
        ? await serviceNowFetch(getTablePath(`/${encodeURIComponent(seniorProfileId)}`))
        : null;
      const referencedSeniorProfile = seniorProfileData?.result || {};
      const referencedSeniorUserId = getReferenceValue(referencedSeniorProfile[FIELD_MAP.userId]);
      const seniorProfile = referencedSeniorUserId
        ? await findSeniorProfileByUserId(referencedSeniorUserId) || referencedSeniorProfile
        : referencedSeniorProfile;
      const seniorUserId = getReferenceValue(seniorProfile[FIELD_MAP.userId]);
      const seniorUser = seniorUserId ? await getLoginRecordById(seniorUserId) : null;
      const senior = toCaregiverSeniorRecord(connection, seniorProfile, seniorUser || {});
      const sosAlert = await getLatestActiveSosAlertForSenior(senior);
      const medicationSummary = await getMedicationSummaryForSeniorProfile(seniorProfile.sys_id);
      const medicalInformation = await getMedicalInformationForSeniorProfile(seniorProfile.sys_id);

      return sosAlert
        ? {
            ...senior,
            ...medicationSummary,
            ...medicalInformation,
            status: 'SOS Active',
            alertId: sosAlert.id,
            location: sosAlert.location || senior.location,
            alertMessage: sosAlert.message,
            alertStatus: sosAlert.status,
            alertTime: sosAlert.createdAt,
          }
        : { ...senior, ...medicationSummary, ...medicalInformation };
    } catch (error) {
      console.error(`Skipping unresolvable caregiver connection ${connection?.sys_id || '?'}:`, error.message);
      return null;
    }
  }));

  const uniqueSeniors = Array.from(
    seniors.filter(Boolean).reduce((seniorMap, senior) => {
      const key = senior.userId || senior.id || senior.connectionId;
      const existing = seniorMap.get(key);

      if (!existing || getMappedSeniorCompletenessScore(senior) > getMappedSeniorCompletenessScore(existing)) {
        seniorMap.set(key, senior);
      }

      return seniorMap;
    }, new Map()).values(),
  );

  // ── Live location from the sensor deployment ──
  // The senior whose home carries the Pi sensors (matched by name — the
  // daemon's SENIOR_NAME) gets their card location driven by room occupancy
  // instead of the (empty) profile field. An active SOS keeps the alert's
  // GPS/address — that is more actionable than a room name.
  const sensorSeniorName = normalizeLoginValue(process.env.SERVICE_NOW_SENSOR_SENIOR_NAME || '');

  if (sensorSeniorName) {
    const snapshot = await getSensorActivitySnapshot().catch(() => null);
    const sensorLocation = getSensorRoomLocation(snapshot);

    if (sensorLocation) {
      for (const senior of uniqueSeniors) {
        if (normalizeLoginValue(senior.name) === sensorSeniorName && senior.status !== 'SOS Active') {
          senior.location = sensorLocation;
        }
      }
    }
  }

  return uniqueSeniors.filter((senior) => {
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
    frequency: getDisplayValue(record[MEDICINE_FIELD_MAP.frequency]) || getDisplayValue(record.u_frequency) || getDisplayValue(record.u_number_of_times),
    status: getDisplayValue(record[MEDICINE_FIELD_MAP.status]),
    notes: getDisplayValue(record[MEDICINE_FIELD_MAP.notes]),
    isExtra: String(isExtraValue || '').toLowerCase() === 'true' || isExtraValue === true,
    updatedAt: record.sys_updated_on || record.sys_created_on || '',
  };
}

function getSingaporeDateLabel(value = new Date()) {
  return new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short',
    timeZone: CHECK_IN_TIME_ZONE,
    year: 'numeric',
  }).format(value);
}

function parseMedicineTakenStatus(status = '') {
  const match = /^taken at\s+(.+)$/i.exec(String(status || '').trim());

  return match ? match[1].trim() : null;
}

function parseServiceNowUtcDateTime(value) {
  if (value instanceof Date) {
    return value;
  }

  const text = String(value || '').trim();
  const serviceNowDateTimeMatch = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(text);

  if (serviceNowDateTimeMatch) {
    const [, year, month, day, hour, minute, second = '00'] = serviceNowDateTimeMatch;
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  }

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatMedicineTakenAt(value) {
  const dateValue = parseServiceNowUtcDateTime(value);
  const parts = getSingaporeParts(dateValue);

  if (!parts) {
    return '';
  }

  const [year, month, day] = parts.dateKey.split('-').map(Number);
  const date = getSingaporeDateLabel(new Date(year, month - 1, day));
  const time = formatCheckInTime(parts.totalMinutes).toLowerCase();

  return `${time} ${date}`;
}

function getMedicineTakenInfo(record = {}) {
  const status = getDisplayValue(record[MEDICINE_FIELD_MAP.status]);
  const explicitTakenAt = parseMedicineTakenStatus(status);

  if (explicitTakenAt) {
    return {
      dateKey: getSingaporeParts(explicitTakenAt)?.dateKey || null,
      takenAt: explicitTakenAt,
    };
  }

  if (!/^taken$/i.test(status)) {
    return null;
  }

  const updatedAt = record.sys_updated_on || record.sys_created_on;
  const parts = getSingaporeParts(parseServiceNowUtcDateTime(updatedAt));

  if (!parts) {
    return null;
  }

  return {
    dateKey: parts.dateKey,
    takenAt: formatMedicineTakenAt(updatedAt),
  };
}

async function getMedicationSummaryForSeniorProfile(seniorProfileId) {
  if (!seniorProfileId) {
    return { medicationStatus: 'Untaken', medicationTakenAt: '' };
  }

  const params = new URLSearchParams({
    sysparm_query: `${MEDICINE_FIELD_MAP.senior}=${seniorProfileId}`,
    sysparm_limit: '100',
  });
  const data = await serviceNowFetch(getNamedTablePath(MEDICINE_TABLE, `?${params.toString()}`));
  const medicineRecords = data?.result || [];

  if (medicineRecords.length === 0) {
    return { medicationStatus: 'Untaken', medicationTakenAt: '' };
  }

  const todayKey = getSingaporeDateKey();
  const takenTimes = medicineRecords
    .map(getMedicineTakenInfo)
    .filter((takenInfo) => takenInfo?.dateKey === todayKey)
    .map((takenInfo) => takenInfo.takenAt);

  return takenTimes.length > 0
    ? { medicationStatus: 'Taken', medicationTakenAt: takenTimes[takenTimes.length - 1] || '' }
    : { medicationStatus: 'Untaken', medicationTakenAt: '' };
}

function getFirstMedicineValue(records = [], field) {
  const record = records.find((item) => getDisplayValue(item[field]));

  return record ? getDisplayValue(record[field]) : '';
}

async function getMedicalInformationForSeniorProfile(seniorProfileId) {
  if (!seniorProfileId) {
    return {
      currentMedication: '',
    };
  }

  const params = new URLSearchParams({
    sysparm_query: `${MEDICINE_FIELD_MAP.senior}=${seniorProfileId}`,
    sysparm_limit: '100',
  });
  const data = await serviceNowFetch(getNamedTablePath(MEDICINE_TABLE, `?${params.toString()}`));
  const records = data?.result || [];

  return {
    currentMedication: getFirstMedicineValue(records, MEDICINE_FIELD_MAP.name),
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
    if (medicine.status === undefined) {
      return toMedicineRecord(existingRecord);
    }

    const data = await serviceNowFetch(getNamedTablePath(MEDICINE_TABLE, `/${encodeURIComponent(existingRecord.sys_id)}`), {
      method: 'PATCH',
      body: JSON.stringify({
        [MEDICINE_FIELD_MAP.status]: medicine.status || '',
      }),
    });

    return toMedicineRecord(data?.result || existingRecord);
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

function toSensorActivityRecord(record = {}) {
  return {
    sensorType: getDisplayValue(record[SENSOR_ACTIVITY_FIELD_MAP.sensorType]),
    location: getDisplayValue(record[SENSOR_ACTIVITY_FIELD_MAP.location]),
    value: getDisplayValue(record[SENSOR_ACTIVITY_FIELD_MAP.value]),
    status: getDisplayValue(record[SENSOR_ACTIVITY_FIELD_MAP.status]),
    loggedAt: getDisplayValue(record[SENSOR_ACTIVITY_FIELD_MAP.loggedAt]),
  };
}

// occupiedValues are matched against the exact strings controller.py's _log() calls
// write for that (sensorType, location) pair - see Senior_stuff/sensors/Controller/controller.py.
function getRoomOccupancy(latestByKey, sensorType, location, occupiedValues) {
  const row = latestByKey.get(`${sensorType}|${location}`);

  if (!row) {
    return { occupied: null, value: '', loggedAt: '' };
  }

  return {
    occupied: occupiedValues.includes(String(row.value).trim().toUpperCase()),
    value: row.value,
    loggedAt: row.loggedAt,
  };
}

// Short TTL cache: the caregiver dashboard polls every 5 s and now ALSO
// enriches each senior's location from this snapshot — without the cache
// every poll would fan out into 3 extra ServiceNow queries.
const SENSOR_SNAPSHOT_TTL_MS = 10000;
let sensorSnapshotCache = { at: 0, value: null };

export async function getSensorActivitySnapshot() {
  if (!SENSOR_ACTIVITY_SENIOR_ID) {
    return null;
  }

  if (Date.now() - sensorSnapshotCache.at < SENSOR_SNAPSHOT_TTL_MS) {
    return sensorSnapshotCache.value;
  }

  try {
    const field = SENSOR_ACTIVITY_FIELD_MAP;

    const statusParams = new URLSearchParams({
      sysparm_query: `${field.seniorId}=${SENSOR_ACTIVITY_SENIOR_ID}^ORDERBYDESC${field.loggedAt}`,
      sysparm_limit: '50',
    });
    const statusData = await serviceNowFetch(getNamedTablePath(SENSOR_ACTIVITY_TABLE, `?${statusParams.toString()}`));
    const statusRows = (statusData?.result || []).map(toSensorActivityRecord);

    const latestByKey = new Map();
    let lastUpdated = '';

    for (const row of statusRows) {
      const key = `${row.sensorType}|${row.location}`;

      if (!latestByKey.has(key)) {
        latestByKey.set(key, row);
      }

      if (!lastUpdated || row.loggedAt > lastUpdated) {
        lastUpdated = row.loggedAt;
      }
    }

    const bedroom = getRoomOccupancy(latestByKey, 'mmWave(InBed)', 'Bedroom', ['IN BED']);
    const bathroom = getRoomOccupancy(latestByKey, 'Proximity', 'Bathroom Door', ['ENTER']);
    const livingRoom = getRoomOccupancy(latestByKey, 'mmWave', 'Living Room', ['PRESENCE']);

    const hrRow = latestByKey.get('mmWave(HR)|Bedroom');
    const brRow = latestByKey.get('mmWave(BR)|Bedroom');

    // Controller-grade extras for the mobile Live tab: body-movement count and
    // target distance (living-room radar), newest row per node location
    // (heartbeat proxy), and the recent alert feed (ALERTS/System rows).
    const movementRow = latestByKey.get('mmWave(Movement)|Living Room');
    const distanceRow = latestByKey.get('mmWave(Dist)|Living Room');

    const nodeLastSeen = new Map();
    for (const row of statusRows) {
      if (row.location && !nodeLastSeen.has(row.location)) {
        nodeLastSeen.set(row.location, row.loggedAt); // rows are newest-first
      }
    }
    const nodes = [...nodeLastSeen.entries()]
      .map(([location, lastSeen]) => ({ location, lastSeen }))
      .sort((a, b) => (a.location < b.location ? -1 : 1));

    const alertParams = new URLSearchParams({
      sysparm_query: `${field.seniorId}=${SENSOR_ACTIVITY_SENIOR_ID}^${field.sensorType}INALERTS,System^ORDERBYDESC${field.loggedAt}`,
      sysparm_limit: '8',
    });
    const alertData = await serviceNowFetch(getNamedTablePath(SENSOR_ACTIVITY_TABLE, `?${alertParams.toString()}`));
    const recentAlerts = (alertData?.result || []).map(toSensorActivityRecord).map((row) => ({
      location: row.location,
      value: row.value,
      status: row.status,
      loggedAt: row.loggedAt,
    }));

    const trendParams = new URLSearchParams({
      sysparm_query: `${field.seniorId}=${SENSOR_ACTIVITY_SENIOR_ID}^${field.sensorType}INmmWave(HR),mmWave(BR)^ORDERBYDESC${field.loggedAt}`,
      sysparm_limit: '120',
    });
    const trendData = await serviceNowFetch(getNamedTablePath(SENSOR_ACTIVITY_TABLE, `?${trendParams.toString()}`));
    const trendRows = (trendData?.result || []).map(toSensorActivityRecord).reverse();

    const hrTrend = trendRows
      .filter((row) => row.sensorType === 'mmWave(HR)')
      .map((row) => ({ value: Number(row.value) || 0, loggedAt: row.loggedAt }));
    const brTrend = trendRows
      .filter((row) => row.sensorType === 'mmWave(BR)')
      .map((row) => ({ value: Number(row.value) || 0, loggedAt: row.loggedAt }));

    const snapshot = {
      rooms: { bedroom, bathroom, livingRoom },
      vitals: {
        hr: hrRow ? Number(hrRow.value) || 0 : null,
        br: brRow ? Number(brRow.value) || 0 : null,
        hrTrend,
        brTrend,
      },
      activity: {
        movement: movementRow ? Number(movementRow.value) || 0 : null,
        distanceCm: distanceRow ? Number(distanceRow.value) || 0 : null,
      },
      nodes,
      recentAlerts,
      lastUpdated,
    };
    sensorSnapshotCache = { at: Date.now(), value: snapshot };
    return snapshot;
  } catch (error) {
    console.error('getSensorActivitySnapshot failed:', error);
    return null;
  }
}

// The senior's CURRENT location, derived from sensor occupancy: the most
// recently updated occupied room wins; known-but-empty rooms report "Home";
// no sensor data at all yields '' so the caller keeps its existing value.
export function getSensorRoomLocation(snapshot) {
  if (!snapshot?.rooms) {
    return '';
  }

  const rooms = [
    ['Bedroom', snapshot.rooms.bedroom],
    ['Bathroom', snapshot.rooms.bathroom],
    ['Living Room', snapshot.rooms.livingRoom],
  ];
  const occupied = rooms.filter(([, room]) => room?.occupied === true);

  if (occupied.length > 0) {
    occupied.sort((a, b) => (a[1].loggedAt < b[1].loggedAt ? 1 : -1));
    return `${occupied[0][0]} · sensors`;
  }

  const anyKnown = rooms.some(([, room]) => room?.occupied !== null && room?.value);
  return anyKnown ? 'Home · no presence' : '';
}

// Phase 9.3 — 15-minute batched HR/BR averages for the mobile "History" tab.
// Continuous ticks stay on the live MQTT/WebSocket path; history renders a
// bar chart of the daily baseline computed here from u_sensor_activity_log.
export function bucketVitalRows(rows) {
  // rows: [{ value, loggedAt: 'YYYY-MM-DD HH:MM:SS' }] → 15-min averages
  const buckets = new Map();

  for (const row of rows) {
    const value = Number(row.value);

    if (!Number.isFinite(value) || value <= 0 || row.loggedAt.length < 16) {
      continue;
    }

    const hour = row.loggedAt.slice(11, 13);
    const minute = Number(row.loggedAt.slice(14, 16));
    const bucketMinute = String(Math.floor(minute / 15) * 15).padStart(2, '0');
    const key = `${hour}:${bucketMinute}`;
    const bucket = buckets.get(key) || { sum: 0, count: 0 };
    bucket.sum += value;
    bucket.count += 1;
    buckets.set(key, bucket);
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([time, { sum, count }]) => ({
      time,
      avg: Math.round((sum / count) * 10) / 10,
      samples: count,
    }));
}

export async function getVitalsHistory() {
  if (!SENSOR_ACTIVITY_SENIOR_ID) {
    return null;
  }

  try {
    const field = SENSOR_ACTIVITY_FIELD_MAP;
    const params = new URLSearchParams({
      sysparm_query: `${field.seniorId}=${SENSOR_ACTIVITY_SENIOR_ID}^${field.sensorType}INmmWave(HR),mmWave(BR)^ORDERBYDESC${field.loggedAt}`,
      sysparm_limit: '2000',
    });
    const data = await serviceNowFetch(getNamedTablePath(SENSOR_ACTIVITY_TABLE, `?${params.toString()}`));
    const rows = (data?.result || []).map(toSensorActivityRecord);

    if (rows.length === 0) {
      return { date: '', hr: [], br: [], samples: 0 };
    }

    // Bucket the most recent day PRESENT in the data (avoids timezone
    // mismatches between the Pi's local u_logged_at strings and this server).
    const latestDate = rows[0].loggedAt.slice(0, 10);
    const dayRows = rows.filter((row) => row.loggedAt.slice(0, 10) === latestDate);

    return {
      date: latestDate,
      hr: bucketVitalRows(dayRows.filter((row) => row.sensorType === 'mmWave(HR)')),
      br: bucketVitalRows(dayRows.filter((row) => row.sensorType === 'mmWave(BR)')),
      samples: dayRows.length,
    };
  } catch (error) {
    console.error('getVitalsHistory failed:', error);
    return null;
  }
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
