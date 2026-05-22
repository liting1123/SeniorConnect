type BackendUser = {
  sysId?: string;
  userId: string;
  email: string;
  name: string;
  points: number;
  lastCheckInAt: string | null;
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

  const BASE_URL =
    'https://dev201489.service-now.com/api/now/table/';

  const AUTH_HEADER =
    'Basic ' + btoa('admin:o07YB%NtEm!k');

  const response = await fetch(
    `${BASE_URL}/u_login?sysparm_query=u_email=${identifier}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: AUTH_HEADER,
      },
    }
  );

  const data = await response.json();

  console.log(data);

  if (!data.result || data.result.length === 0) {
    throw new Error('User not found');
  }

  const snUser = data.result[0];

  if (snUser.u_password !== password) {
    throw new Error('Wrong password');
  }

  const user: AppUser = {
    uid: snUser.sys_id,
    email: snUser.u_email,
    displayName: snUser.u_full_name,
    token: 'servicenow-session',
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

export async function syncProfile(user: AppUser) {
  await request<{ user: BackendUser }>(user, `/api/users/${user.uid}/profile`, {
    method: 'PATCH',
    body: JSON.stringify({
      email: user.email,
      name: getDisplayName(user),
    }),
  });
}
