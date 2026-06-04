import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { loadEnv } from './env.mjs';
import {
  addCheckInPoints,
  addGamePoint,
  createCaregiverConnection,
  createSosAlert,
  deleteMedicineForUser,
  getCaregiverSeniorConnections,
  getMedicinesForUser,
  getServiceNowLoginConfig,
  getUserById,
  loginWithServiceNow,
  registerWithServiceNow,
  saveMedicineForUser,
  searchSeniorProfiles,
  updateSosAlertStatus,
  upsertUserProfile,
} from './servicenow.mjs';

loadEnv();

const PORT = Number(process.env.API_PORT) || 3001;

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

function getUidFromPath(pathname) {
  const match = pathname.match(/^\/api\/users\/([^/]+)(?:\/(points|check-in|game|profile|medicines))?$/);
  return match ? { uid: decodeURIComponent(match[1]), action: match[2] || null } : null;
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
