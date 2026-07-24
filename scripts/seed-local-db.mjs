import { loadEnv } from '../server/env.mjs';

loadEnv();

if (String(process.env.DATABASE_MODE || '').trim().toLowerCase() !== 'local') {
  throw new Error('Set DATABASE_MODE=local in .env before seeding the local database.');
}

const { localServiceNowFetch } = await import('../server/local-servicenow.mjs');

const [
  seniorEmailArg = 'senior@example.com',
  seniorPasswordArg = 'Demo1234!',
  caregiverEmailArg = 'caregiver@example.com',
  caregiverPasswordArg = 'Demo1234!',
] = process.argv.slice(2);

const seniorEmail = seniorEmailArg.trim().toLowerCase();
const caregiverEmail = caregiverEmailArg.trim().toLowerCase();
const loginTable = process.env.SERVICE_NOW_LOGIN_TABLE || 'u_user';
const profileTable = process.env.SERVICE_NOW_TABLE || 'u_senior_profiles';
const connectionTable = process.env.SERVICE_NOW_CAREGIVER_CONNECTION_TABLE || 'u_caregiver_profiles';

const loginField = {
  username: process.env.SERVICE_NOW_LOGIN_FIELD_USERNAME || 'u_username',
  email: process.env.SERVICE_NOW_LOGIN_FIELD_EMAIL || 'u_email',
  password: process.env.SERVICE_NOW_LOGIN_FIELD_PASSWORD || 'u_password',
  name: process.env.SERVICE_NOW_LOGIN_FIELD_NAME || 'u_full_name',
  role: process.env.SERVICE_NOW_LOGIN_FIELD_ROLE || 'u_role',
  active: process.env.SERVICE_NOW_LOGIN_FIELD_ACTIVE || 'u_active',
};
const profileField = {
  user: process.env.SERVICE_NOW_FIELD_USER_ID || 'u_user',
  email: process.env.SERVICE_NOW_FIELD_EMAIL || 'u_email',
  name: process.env.SERVICE_NOW_FIELD_NAME || 'u_full_name',
  phone: process.env.SERVICE_NOW_FIELD_PHONE || 'u_phone',
  points: process.env.SERVICE_NOW_FIELD_POINTS || 'u_points',
};
const connectionField = {
  user: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_USER || 'u_user',
  senior: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_SENIOR || 'u_senior',
  relationship:
    process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_RELATIONSHIP || 'u_relationship',
  isNok: process.env.SERVICE_NOW_CAREGIVER_CONNECTION_FIELD_IS_NOK || 'u_is_nok',
};

function tablePath(table, suffix = '') {
  return `/api/now/table/${encodeURIComponent(table)}${suffix}`;
}

async function findOne(table, query) {
  const params = new URLSearchParams({ sysparm_query: query, sysparm_limit: '1' });
  const data = await localServiceNowFetch(tablePath(table, `?${params.toString()}`));
  return data?.result?.[0] || null;
}

async function upsertLogin({ email, password, name, role }) {
  const existing = await findOne(loginTable, `${loginField.email}=${email}`);
  const payload = {
    [loginField.username]: email,
    [loginField.email]: email,
    [loginField.password]: password,
    [loginField.name]: name,
    [loginField.role]: role,
    [loginField.active]: true,
  };

  if (existing?.sys_id) {
    const data = await localServiceNowFetch(tablePath(loginTable, `/${existing.sys_id}`), {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return data.result;
  }

  const data = await localServiceNowFetch(tablePath(loginTable), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.result;
}

const seniorLogin = await upsertLogin({
  email: seniorEmail,
  password: seniorPasswordArg,
  name: 'Demo Senior',
  role: 'elderly',
});
const caregiverLogin = await upsertLogin({
  email: caregiverEmail,
  password: caregiverPasswordArg,
  name: 'Demo Caregiver',
  role: 'caregiver',
});

let seniorProfile = await findOne(profileTable, `${profileField.user}=${seniorLogin.sys_id}`);
const profilePayload = {
  [profileField.user]: seniorLogin.sys_id,
  [profileField.email]: seniorEmail,
  [profileField.name]: 'Demo Senior',
  [profileField.phone]: '90000001',
  [profileField.points]: '0',
};

if (seniorProfile?.sys_id) {
  seniorProfile = (
    await localServiceNowFetch(tablePath(profileTable, `/${seniorProfile.sys_id}`), {
      method: 'PATCH',
      body: JSON.stringify(profilePayload),
    })
  ).result;
} else {
  seniorProfile = (
    await localServiceNowFetch(tablePath(profileTable), {
      method: 'POST',
      body: JSON.stringify(profilePayload),
    })
  ).result;
}

const existingConnection = await findOne(
  connectionTable,
  `${connectionField.user}=${caregiverLogin.sys_id}^${connectionField.senior}=${seniorProfile.sys_id}`,
);

if (!existingConnection?.sys_id) {
  await localServiceNowFetch(tablePath(connectionTable), {
    method: 'POST',
    body: JSON.stringify({
      [connectionField.user]: caregiverLogin.sys_id,
      [connectionField.senior]: seniorProfile.sys_id,
      [connectionField.relationship]: 'Next of Kin',
      [connectionField.isNok]: true,
    }),
  });
}

console.log('Local CareConnect database is ready.');
console.log(`Senior: ${seniorEmail}`);
console.log(`Caregiver: ${caregiverEmail}`);
console.log(`Senior display ID: ${seniorProfile.sys_id.slice(0, 8).toUpperCase()}`);
