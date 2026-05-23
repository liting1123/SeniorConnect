import http from 'node:http';
import { loadEnv } from './env.mjs';
import {
  addCheckInPoints,
  addUserPoints,
  createCaregiverConnection,
  createSosAlert,
  getServiceNowLoginConfig,
  getUserById,
  loginWithServiceNow,
  upsertUserProfile,
} from './servicenow.mjs';

loadEnv();

const PORT = Number(process.env.API_PORT) || 3001;

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
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
  const match = pathname.match(/^\/api\/users\/([^/]+)(?:\/(points|check-in|game|profile))?$/);
  return match ? { uid: decodeURIComponent(match[1]), action: match[2] || null } : null;
}

async function handleRequest(request, response) {
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

  if (url.pathname === '/api/servicenow/connect-senior' && request.method === 'POST') {
    const body = await readJson(request);
    const connection = await createCaregiverConnection({
      caregiverName: body.caregiverName,
      caregiverEmail: body.caregiverEmail,
      seniorName: body.seniorName,
      seniorPhone: body.seniorPhone,
      seniorEmail: body.seniorEmail,
      relationship: body.relationship,
    });

    sendJson(response, 200, { connection });
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
    const user = await addUserPoints({
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
    });
    sendJson(response, 200, { user });
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed' });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    sendJson(response, error.status || 500, {
      error: error.message || 'Unexpected server error',
      details: error.details,
    });
  });
});

server.listen(PORT, () => {
  console.log(`ServiceNow API server running at http://localhost:${PORT}`);
});
