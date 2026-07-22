type BackendUser = {
  sysId?: string;
  userId: string;
  email: string;
  name: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  locationZones?: string;
  address?: string;
  points: number;
  lastCheckInAt: string | null;
  gameRewardDate?: string | null;
};

type PointsResponse = {
  points: number;
  user?: BackendUser | null;
  redemption?: RewardHistoryItem;
};

type UserProfileResponse = {
  user?: BackendUser | null;
};

export type CheckInReminder = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
};

export type RewardHistoryItem = {
  id: string;
  title: string;
  cost: number;
  redeemedAt: string;
};

export type Medicine = {
  id: string;
  name: string;
  dose: string;
  time: string;
  frequency: string;
  status: string;
  notes: string;
  isExtra: boolean;
  updatedAt?: string;
};

export type MedicineInput = Partial<Medicine> & {
  name: string;
};

export type FamilyVerification = {
  id: string;
  seniorId: string;
  seniorName?: string;
  familyEmail: string;
  code?: string;
  expiresAt: string;
  status: string;
  verifiedAt?: string;
  familyUserId?: string;
};

export type AppUser = {
  uid: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    username?: string;
    email: string;
    name: string;
    role?: string;
  };
};

const SESSION_KEY = 'careconnect.user';

function getApiBaseUrl() {
  // Use the WebView's origin by default. During development, Vite proxies
  // `/api` to the backend on port 3001. Keeping requests same-origin avoids
  // iOS WebView CORS and mixed-content failures when running through Expo.
  const configuredBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim();
  return configuredBaseUrl.replace(/\/$/, '');
}

function normalizeRole(role = '') {
  return role.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function isSeniorRole(role = '') {
  return ['elderly', 'senior', 'seniors'].includes(normalizeRole(role));
}

function isCaregiverOrFamilyRole(role = '') {
  return [
    'caregiver',
    'caregivers',
    'children',
    'nok',
    'nextofkin',
    'family',
    'families',
    'familymember',
    'familymembers',
    'caregiverfamily',
    'volunteer',
    'admin',
  ].includes(normalizeRole(role));
}

function getDisplayName(user: AppUser) {
  return user.displayName?.trim() || user.email?.split('@')[0] || 'User';
}

function setStoredUser(user: AppUser) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('careconnect-user-updated'));
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
  const url = path.startsWith('http') ? path : `${getApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export function getStoredUser() {
  const rawUser = sessionStorage.getItem(SESSION_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AppUser;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearStoredUser() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('careconnect-user-updated'));
}

export function updateStoredUserRole(role: string) {
  const user = getStoredUser();

  if (!user) {
    return null;
  }

  const updatedUser = { ...user, role };
  setStoredUser(updatedUser);

  return updatedUser;
}

export async function login(identifier: string, password: string, loginType: 'senior' | 'family' = 'senior') {
  const response = await fetch(`${getApiBaseUrl()}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password, loginType }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  const loginData = data as LoginResponse;
  const user: AppUser = {
    uid: loginData.user.id,
    email: loginData.user.email || loginData.user.username || '',
    displayName: loginData.user.name,
    token: loginData.token,
    role: loginData.user.role || 'elderly',
  };

  if (loginType === 'family' && isSeniorRole(user.role)) {
    throw new Error('This account is for Seniors. Please use Seniors login tab.');
  }

  if (loginType === 'senior' && !isSeniorRole(user.role)) {
    throw new Error('Only senior accounts can use the Senior login tab. Please use Caregiver / Family.');
  }

  if (!isSeniorRole(user.role) && !isCaregiverOrFamilyRole(user.role)) {
    throw new Error('This account role is not allowed to log in here.');
  }

  setStoredUser(user);

  return user;
}

export async function registerCaregiver(email: string, password: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  const loginData = data as LoginResponse;
  const user: AppUser = {
    uid: loginData.user.id,
    email: loginData.user.email || loginData.user.username || '',
    displayName: loginData.user.name,
    token: loginData.token,
    role: loginData.user.role || 'caregiver',
  };

  setStoredUser(user);

  return user;
}

export async function registerFamilyMember(email: string, password: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/register-family`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  const loginData = data as LoginResponse;
  const user: AppUser = {
    uid: loginData.user.id,
    email: loginData.user.email || loginData.user.username || '',
    displayName: loginData.user.name,
    token: loginData.token,
    role: loginData.user.role || 'Family',
  };

  setStoredUser(user);

  return user;
}

//Forgot password endpoint
export async function resetPassword(identifier: string, password: string, loginType: 'senior' | 'family' = 'senior') {
  const response = await fetch(`${getApiBaseUrl()}/api/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password, loginType }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return data as { ok: true };
}

export async function getPoints(user: AppUser) {
  const data = await request<PointsResponse>(user, `/api/users/${user.uid}/points`);
  return Number(data.points) || 0;
}

export async function getRewardHistory(user: AppUser) {
  const data = await request<{ rewardHistory: RewardHistoryItem[] }>(user, `/api/users/${user.uid}/reward-history`);
  return data.rewardHistory || [];
}

export async function redeemPoints(user: AppUser, pointsToRedeem: number, rewardTitle: string) {
  const data = await request<PointsResponse>(user, `/api/users/${user.uid}/points`, {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      name: getDisplayName(user),
      pointsToRedeem,
      rewardTitle,
    }),
  });

  return {
    points: Number(data.points) || 0,
    redemption: data.redemption,
  };
}

export async function getSeniorProfile(user: AppUser) {
  const data = await request<UserProfileResponse>(user, `/api/users/${user.uid}/profile`);
  return data.user || null;
}

export async function updateSeniorProfile(
  user: AppUser,
  profile: Partial<Pick<BackendUser, 'email' | 'name' | 'phone' | 'locationZones' | 'address'>>,
) {
  const data = await request<UserProfileResponse>(user, `/api/users/${user.uid}/profile`, {
    method: 'PATCH',
    body: JSON.stringify({
      email: profile.email ?? user.email,
      name: profile.name ?? getDisplayName(user),
      phone: profile.phone,
      locationZones: profile.locationZones,
      address: profile.address,
    }),
  });

  return data.user || null;
}

export async function getCheckInReminders(user: AppUser) {
  const data = await request<{ reminders: CheckInReminder[] }>(user, `/api/users/${user.uid}/check-in-reminders`);
  return data.reminders || [];
}

export async function getMedicines(user: AppUser) {
  const data = await request<{ medicines: Medicine[] }>(user, `/api/users/${user.uid}/medicines`);
  return data.medicines || [];
}

export async function saveMedicine(user: AppUser, medicine: MedicineInput) {
  const data = await request<{ medicine: Medicine }>(user, `/api/users/${user.uid}/medicines`, {
    method: medicine.id ? 'PATCH' : 'POST',
    body: JSON.stringify(medicine),
  });

  return data.medicine;
}

export async function deleteMedicine(user: AppUser, medicineId: string) {
  await request<{ medicine: Pick<Medicine, 'id'> }>(user, `/api/users/${user.uid}/medicines`, {
    method: 'DELETE',
    body: JSON.stringify({ id: medicineId }),
  });
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

export async function startFamilyVerification(user: AppUser, seniorId: string) {
  const data = await request<{ verification: FamilyVerification }>(user, '/api/servicenow/family-verification/start', {
    method: 'POST',
    body: JSON.stringify({
      seniorId,
      familyEmail: user.email,
      familyUserId: user.uid,
    }),
  });

  return data.verification;
}

export async function verifyFamilyCode(
  user: AppUser,
  {
    code,
    relationship,
    seniorId,
    verificationId,
  }: {
    code: string;
    relationship: string;
    seniorId: string;
    verificationId: string;
  },
) {
  const data = await request<{ verification: FamilyVerification; connection: unknown }>(
    user,
    '/api/servicenow/family-verification/verify',
    {
      method: 'POST',
      body: JSON.stringify({
        code,
        relationship,
        seniorId,
        verificationId,
        familyEmail: user.email,
        familyUserId: user.uid,
      }),
    },
  );

  return data;
}

export async function requestLoginMfaCode(user: AppUser) {
  return request<{ ok: boolean; delivery?: 'email' | 'telegram' | 'in-app-notification'; code?: string; warning?: string }>(user, '/api/mfa/request', {
    method: 'POST',
    body: JSON.stringify({
      caregiverId: user.uid,
      email: user.email,
    }),
  });
}

export async function verifyLoginMfaCode(user: AppUser, code: string) {
  await request<{ ok: boolean }>(user, '/api/mfa/verify', {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      code,
    }),
  });
}

export async function getFamilyVerificationCodes(user: AppUser) {
  const data = await request<{ verifications: FamilyVerification[] }>(
    user,
    `/api/users/${user.uid}/family-verification-codes`,
  );

  return data.verifications || [];
}
