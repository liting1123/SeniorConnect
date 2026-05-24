type BackendUser = {
  sysId?: string;
  userId: string;
  email: string;
  name: string;
  points: number;
  lastCheckInAt: string | null;
  gameRewardDate?: string | null;
};

type PointsResponse = {
  points: number;
  user?: BackendUser | null;
};

export type AppUser = {
  uid: string;
  email: string;
  displayName: string;
  token: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    username?: string;
    email: string;
    name: string;
  };
};

const SESSION_KEY = 'careconnect.user';

function getDisplayName(user: AppUser) {
  return user.displayName?.trim() || user.email?.split('@')[0] || 'User';
}

export function getUserStorageIdentity(user: AppUser) {
  const identity = (user.email || user.uid || 'guest').trim().toLowerCase();
  return identity.replace(/[^a-z0-9@._-]/g, '_');
}

export function getUserPointsKey(user: AppUser) {
  return `points_${getUserStorageIdentity(user)}`;
}

export function getCachedUserPoints(user: AppUser) {
  return Number(localStorage.getItem(getUserPointsKey(user))) || 0;
}

export function setCachedUserPoints(user: AppUser, points: number) {
  localStorage.setItem(getUserPointsKey(user), String(points));
}

async function request<T>(user: AppUser, path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText);
  }

  return data as T;
}

export function getStoredUser() {
  const rawUser = localStorage.getItem(SESSION_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AppUser;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearStoredUser() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('careconnect-user-updated'));
}

export async function login(identifier: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText);
  }

  const loginData = data as LoginResponse;
  const user: AppUser = {
    uid: loginData.user.id,
    email: loginData.user.email || loginData.user.username || '',
    displayName: loginData.user.name,
    token: loginData.token,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('careconnect-user-updated'));

  return user;
}

export async function registerCaregiver(email: string, password: string) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText);
  }

  const loginData = data as LoginResponse;
  const user: AppUser = {
    uid: loginData.user.id,
    email: loginData.user.email || loginData.user.username || '',
    displayName: loginData.user.name,
    token: loginData.token,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('careconnect-user-updated'));

  return user;
}

export async function getPoints(user: AppUser) {
  const data = await request<PointsResponse>(user, `/api/users/${user.uid}/points`);
  return Number(data.points) || 0;
}

export async function addCheckIn(user: AppUser) {
  const data = await request<PointsResponse>(user, `/api/users/${user.uid}/check-in`, {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      name: getDisplayName(user),
    }),
  });

  return Number(data.points) || 0;
}

export async function addGamePoint(user: AppUser) {
  const data = await request<PointsResponse>(user, `/api/users/${user.uid}/game`, {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      name: getDisplayName(user),
    }),
  });

  return Number(data.points) || 0;
}

export async function syncProfile(user: AppUser) {
  await request<{ user: BackendUser }>(user, `/api/users/${user.uid}/profile`, {
    method: 'PATCH',
    body: JSON.stringify({
      email: user.email,
      name: getDisplayName(user),
    }),
  });
}
