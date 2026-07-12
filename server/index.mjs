import http from 'node:http';
import { pathToFileURL } from 'node:url';
import nodemailer from 'nodemailer';
import { loadEnv } from './env.mjs';
import {
  addCheckInPoints,
  addGamePoint,
  createCaregiverConnection,
  deleteCaregiverConnection,
  createFamilyVerification,
  createSosAlert,
  deleteMedicineForUser,
  getCaregiverSeniorConnections,
  getPendingFamilyVerificationCodesForSenior,
  getMedicinesForUser,
  getRewardRedemptionsForUser,
  getServiceNowLoginConfig,
  getSosAlertHistory,
  getUserById,
  loginWithServiceNow,
  redeemUserPoints,
  registerWithServiceNow,
  resetPasswordWithServiceNow,
  saveMedicineForUser,
  searchSeniorProfiles,
  updateSosAlertStatus,
  upsertUserProfile,
  verifyFamilyVerification,
} from './servicenow.mjs';

// Load environment variables from .env file
loadEnv();

const PORT = Number(process.env.API_PORT) || 3001;
const checkInReminders = [];
const loginMfaCodes = new Map();

const MFA_EMAIL_HOST = String(process.env.MFA_EMAIL_HOST || '').trim();
const MFA_EMAIL_PORT = Number(process.env.MFA_EMAIL_PORT) || 587;
const MFA_EMAIL_SECURE = String(process.env.MFA_EMAIL_SECURE || '').trim().toLowerCase() === 'true';
const MFA_EMAIL_USER = String(process.env.MFA_EMAIL_USER || '').trim();
const MFA_EMAIL_PASS = String(process.env.MFA_EMAIL_PASS || '').trim();
const MFA_EMAIL_FROM = String(process.env.MFA_EMAIL_FROM || '').trim();

let mfaMailer = null;

function normalizeReminderValue(value = '') {
  return String(value || '').trim().toLowerCase();
}

function createCheckInReminder(body = {}) {
  const reminder = {
    id: `reminder-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    seniorUserId: String(body.seniorUserId || '').trim(),
    seniorProfileId: String(body.seniorProfileId || '').trim(),
    seniorName: String(body.seniorName || '').trim(),
    seniorPhone: String(body.seniorPhone || '').trim(),
    message: body.message || 'Please complete your check-in for today.',
    status: 'Reminder Sent',
    createdAt: new Date().toISOString(),
  };

  checkInReminders.unshift(reminder);
  checkInReminders.splice(50);
  return reminder;
}

function getCheckInRemindersForUser(uid) {
  const normalizedUid = normalizeReminderValue(uid);

  return checkInReminders
    .filter((reminder) => {
      return (
        normalizeReminderValue(reminder.seniorUserId) === normalizedUid ||
        normalizeReminderValue(reminder.seniorProfileId) === normalizedUid
      );
    })
    .map(({ id, message, status, createdAt }) => ({ id, message, status, createdAt }));
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function requireAuth(request) {
  const authHeader = request.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    throw Object.assign(new Error('Missing app session token'), { status: 401 });
  }
}

function normalizeEmail(value = '') {
  return String(value || '').trim().toLowerCase();
}

function createMfaCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getMfaTransporter() {
  const missing = [];

  if (!MFA_EMAIL_HOST) missing.push('MFA_EMAIL_HOST');
  if (!MFA_EMAIL_PORT) missing.push('MFA_EMAIL_PORT');
  if (!MFA_EMAIL_USER) missing.push('MFA_EMAIL_USER');
  if (!MFA_EMAIL_PASS) missing.push('MFA_EMAIL_PASS');
  if (!MFA_EMAIL_FROM) missing.push('MFA_EMAIL_FROM');

  if (missing.length > 0) {
    throw Object.assign(new Error(`MFA email is not configured. Missing: ${missing.join(', ')}`), {
      status: 503,
    });
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

async function sendLoginMfaCodeEmail(email, code) {
  const transporter = getMfaTransporter();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw Object.assign(new Error('A valid email is required to deliver MFA code.'), { status: 400 });
  }

  await transporter.sendMail({
    from: MFA_EMAIL_FROM,
    to: normalizedEmail,
    subject: 'CareConnect login verification code',
    text: [
      'Your CareConnect login verification code is below:',
      '',
      `Code: ${code}`,
      'Expires in 10 minutes.',
      '',
      'If you did not attempt to log in, you can ignore this email.',
    ].join('\n'),
  });
}

function getUidFromPath(pathname) {
  const match = pathname.match(/^\/api\/users\/([^/]+)(?:\/(points|check-in|check-in-reminders|game|profile|medicines|family-verification-codes|reward-history))?$/);
  return match ? { uid: decodeURIComponent(match[1]), action: match[2] || null } : null;
}

function shortenRoadName(value = '') {
  return String(value || '')
    .replace(/\bAvenue\b/gi, 'Ave')
    .replace(/\bStreet\b/gi, 'St')
    .replace(/\bRoad\b/gi, 'Rd')
    .replace(/\bDrive\b/gi, 'Dr')
    .replace(/\bCrescent\b/gi, 'Cres')
    .replace(/\bBoulevard\b/gi, 'Blvd')
    .replace(/\bSingapore\b/gi, 'SG')
    .replace(/\s+/g, ' ')
    .trim();
}

function joinUniqueAddressParts(parts) {
  const seen = new Set();

  return parts
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part) => {
      const normalized = part.toLowerCase();

      if (seen.has(normalized)) {
        return false;
      }

      seen.add(normalized);
      return true;
    })
    .join(', ');
}

function formatReadableAddress(data = {}) {
  const address = data.address || {};
  const building = address.building || address.amenity || address.office || address.shop || address.tourism || address.leisure || '';
  const streetAddress = [address.house_number, address.road].filter(Boolean).join(' ');
  const neighbourhood = address.neighbourhood || address.suburb || address.quarter || address.city_district || '';
  const city = address.city || address.town || address.village || address.state || '';
  const postcode = address.postcode || '';
  const country = address.country || '';
  const readableAddress = joinUniqueAddressParts([
    building,
    streetAddress,
    neighbourhood,
    city,
    postcode,
    country,
  ]);

  return readableAddress || String(data.display_name || '').trim();
}

async function reverseGeocode(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw Object.assign(new Error('Valid latitude and longitude are required.'), { status: 400 });
  }

  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lon),
    zoom: '18',
    addressdetails: '1',
  });
  const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?${params.toString()}`;
  const geocodeResponse = await fetch(reverseGeocodeUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'SeniorConnect SOS location lookup',
    },
  });
  const data = await geocodeResponse.json().catch(() => null);

  if (!geocodeResponse.ok) {
    throw Object.assign(new Error(data?.error || 'Unable to find address for this location.'), {
      status: geocodeResponse.status,
    });
  }

  return {
    address: formatReadableAddress(data),
  };
}

export async function handleRequest(request, response) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === '/api/health') {
    sendJson(response, 200, { ok: true, login: getServiceNowLoginConfig() });
    return;
  }

  if (url.pathname === '/api/reverse-geocode' && request.method === 'GET') {
    const location = await reverseGeocode(
      url.searchParams.get('lat'),
      url.searchParams.get('lon'),
    );

    sendJson(response, 200, location);
    return;
  }

  if (url.pathname === '/api/login' && request.method === 'POST') {
    const body = await readJson(request);
    const user = await loginWithServiceNow({
      identifier: body.identifier,
      email: body.email,
      password: body.password,
      loginType: body.loginType,
    });
    sendJson(response, 200, { user, token: `servicenow:${user.id}` });
    return;
  }

  if (url.pathname === '/api/register' && request.method === 'POST') {
    const body = await readJson(request);
    const user = await registerWithServiceNow({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role || 'caregiver',
    });
    sendJson(response, 200, { user, token: `servicenow:${user.id}` });
    return;
  }

  if (url.pathname === '/api/register-family' && request.method === 'POST') {
    const body = await readJson(request);
    const user = await registerWithServiceNow({
      email: body.email,
      password: body.password,
      name: body.name,
      role: 'Family',
    });
    sendJson(response, 200, { user, token: `servicenow:${user.id}` });
    return;
  }

  if (url.pathname === '/api/forgot-password' && request.method === 'POST') {
    const body = await readJson(request);
    await resetPasswordWithServiceNow({
      identifier: body.identifier,
      password: body.password,
      loginType: body.loginType,
    });
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === '/api/mfa/request' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const email = normalizeEmail(body.email);

    if (!email) {
      sendJson(response, 400, { error: 'Email is required.' });
      return;
    }

    const code = createMfaCode();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    loginMfaCodes.set(email, { code, expiresAt });

    try {
      await sendLoginMfaCodeEmail(email, code);
    } catch (error) {
      console.error('Unable to send login MFA email:', error instanceof Error ? error.message : error);
      const rawMessage = String(error?.message || '');
      const friendlyMessage = /badcredentials|invalid login: 535|username and password not accepted/i.test(rawMessage)
        ? 'Unable to notify caregiver/volunteer by email. Please check SMTP app password settings.'
        : rawMessage || 'Unable to send verification code email.';

      if (process.env.NODE_ENV !== 'production') {
        sendJson(response, 200, {
          ok: true,
          delivery: 'in-app-notification',
          code,
          warning: friendlyMessage,
        });
        return;
      }

      sendJson(response, error.status || 502, {
        error: friendlyMessage,
      });
      return;
    }

    sendJson(response, 200, { ok: true, delivery: 'email' });
    return;
  }

  if (url.pathname === '/api/mfa/verify' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const email = normalizeEmail(body.email);
    const code = String(body.code || '').trim();
    const saved = loginMfaCodes.get(email);

    if (!email || !code) {
      sendJson(response, 400, { error: 'Email and code are required.' });
      return;
    }

    if (!saved) {
      sendJson(response, 404, { error: 'No pending verification found. Please request a new code.' });
      return;
    }

    if (saved.expiresAt < Date.now()) {
      loginMfaCodes.delete(email);
      sendJson(response, 410, { error: 'Verification code has expired. Please request a new code.' });
      return;
    }

    if (saved.code !== code) {
      sendJson(response, 401, { error: 'Incorrect verification code. Please try again.' });
      return;
    }

    loginMfaCodes.delete(email);
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === '/api/servicenow/sos-alert' && request.method === 'POST') {
    const body = await readJson(request);
    const alert = await createSosAlert({
      location: body.location,
      message: body.message,
      seniorName: body.seniorName,
      seniorPhone: body.seniorPhone,
      status: body.status,
    });

    sendJson(response, 200, { alert });
    return;
  }

  if (url.pathname === '/api/servicenow/sos-alert' && request.method === 'PATCH') {
    const body = await readJson(request);
    const alert = await updateSosAlertStatus({
      alertId: body.alertId,
      status: body.status,
    });

    sendJson(response, 200, { alert });
    return;
  }

  if (url.pathname === '/api/servicenow/sos-alert-history' && request.method === 'GET') {
    const history = await getSosAlertHistory({
      limit: url.searchParams.get('limit'),
    });

    sendJson(response, 200, { history });
    return;
  }

  if (url.pathname === '/api/check-in-reminders' && request.method === 'POST') {
    const body = await readJson(request);
    const reminder = createCheckInReminder(body);

    sendJson(response, 200, { reminder });
    return;
  }

  if (url.pathname === '/api/servicenow/connect-senior' && request.method === 'POST') {
    const body = await readJson(request);
    const connection = await createCaregiverConnection({
      caregiverId: body.caregiverId,
      caregiverName: body.caregiverName,
      caregiverEmail: body.caregiverEmail,
      caregiverUsername: body.caregiverUsername,
      seniorId: body.seniorId,
      seniorUserId: body.seniorUserId,
      seniorUsername: body.seniorUsername,
      seniorName: body.seniorName,
      seniorPhone: body.seniorPhone,
      seniorEmail: body.seniorEmail,
      relationship: body.relationship,
    });

    sendJson(response, 200, { connection });
    return;
  }

  if (url.pathname === '/api/servicenow/caregiver-senior' && request.method === 'DELETE') {
    const body = await readJson(request);
    const deletedConnection = await deleteCaregiverConnection({
      connectionId: body.connectionId,
      caregiverId: body.caregiverId,
      caregiverEmail: body.caregiverEmail,
    });

    sendJson(response, 200, { connection: deletedConnection });
    return;
  }

  if (url.pathname === '/api/servicenow/family-verification/start' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const result = await createFamilyVerification({
      seniorId: body.seniorId,
      familyEmail: body.familyEmail,
      familyUserId: body.familyUserId,
    });

    sendJson(response, 200, result);
    return;
  }

  if (url.pathname === '/api/servicenow/family-verification/verify' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const result = await verifyFamilyVerification({
      verificationId: body.verificationId,
      seniorId: body.seniorId,
      familyEmail: body.familyEmail,
      familyUserId: body.familyUserId,
      code: body.code,
      relationship: body.relationship,
    });

    sendJson(response, 200, result);
    return;
  }

  if (url.pathname === '/api/servicenow/caregiver-seniors' && request.method === 'GET') {
    const seniors = await getCaregiverSeniorConnections({
      caregiverId: url.searchParams.get('caregiverId'),
      caregiverEmail: url.searchParams.get('caregiverEmail'),
      searchName: url.searchParams.get('searchName'),
      phone: url.searchParams.get('phone'),
    });

    sendJson(response, 200, { seniors });
    return;
  }

  if (url.pathname === '/api/servicenow/seniors-search' && request.method === 'GET') {
    const seniors = await searchSeniorProfiles({
      searchName: url.searchParams.get('searchName'),
      phone: url.searchParams.get('phone'),
    });

    sendJson(response, 200, { seniors });
    return;
  }

  const route = getUidFromPath(url.pathname);

  if (!route) {
    sendJson(response, 404, { error: 'Not found' });
    return;
  }

  requireAuth(request);

  if (request.method === 'GET' && route.action === 'points') {
    const user = await getUserById(route.uid);
    sendJson(response, 200, { points: user?.points || 0, user });
    return;
  }

  if (request.method === 'POST' && route.action === 'points') {
    const body = await readJson(request);
    const result = await redeemUserPoints({
      userId: route.uid,
      email: body.email,
      name: body.name,
      pointsToRedeem: body.pointsToRedeem,
      rewardTitle: body.rewardTitle,
    });
    sendJson(response, 200, { points: result.user.points, user: result.user, redemption: result.redemption });
    return;
  }

  if (request.method === 'GET' && route.action === 'reward-history') {
    const rewardHistory = await getRewardRedemptionsForUser(route.uid);
    sendJson(response, 200, { rewardHistory });
    return;
  }

  if (request.method === 'GET' && route.action === 'profile') {
    const user = await getUserById(route.uid);
    sendJson(response, 200, { user });
    return;
  }

  if (request.method === 'GET' && route.action === 'medicines') {
    const medicines = await getMedicinesForUser(route.uid);
    sendJson(response, 200, { medicines });
    return;
  }

  if (request.method === 'GET' && route.action === 'family-verification-codes') {
    const verifications = await getPendingFamilyVerificationCodesForSenior(route.uid);
    sendJson(response, 200, { verifications });
    return;
  }

  if (request.method === 'GET' && route.action === 'check-in-reminders') {
    const reminders = getCheckInRemindersForUser(route.uid);
    sendJson(response, 200, { reminders });
    return;
  }

  if ((request.method === 'POST' || request.method === 'PATCH') && route.action === 'medicines') {
    const body = await readJson(request);
    const medicine = await saveMedicineForUser(route.uid, body);
    sendJson(response, 200, { medicine });
    return;
  }

  if (request.method === 'DELETE' && route.action === 'medicines') {
    const body = await readJson(request);
    const deletedMedicine = await deleteMedicineForUser(route.uid, body.id);
    sendJson(response, 200, { medicine: deletedMedicine });
    return;
  }

  if (request.method === 'POST' && route.action === 'check-in') {
    const body = await readJson(request);
    const user = await addCheckInPoints({
      userId: route.uid,
      email: body.email,
      name: body.name,
      pointsToAdd: 5,
    });
    sendJson(response, 200, { points: user.points, user });
    return;
  }

  if (request.method === 'POST' && route.action === 'game') {
    const body = await readJson(request);
    const user = await addGamePoint({
      userId: route.uid,
      email: body.email,
      name: body.name,
      pointsToAdd: 1,
    });
    sendJson(response, 200, { points: user.points, user });
    return;
  }

  if (request.method === 'PATCH' && route.action === 'profile') {
    const body = await readJson(request);
    const user = await upsertUserProfile({
      userId: route.uid,
      email: body.email,
      name: body.name,
      phone: body.phone,
      locationZones: body.locationZones,
      address: body.address,
    });
    sendJson(response, 200, { user });
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed' });
}

export function handleRequestWithErrors(request, response) {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    sendJson(response, error.status || 500, {
      error: error.message || 'Unexpected server error',
      details: error.details,
    });
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = http.createServer(handleRequestWithErrors);

  server.listen(PORT, () => {
    console.log(`ServiceNow API server running at http://localhost:${PORT}`);
  });
}
