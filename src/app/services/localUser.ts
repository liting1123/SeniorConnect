export type LocalUser = {
  uid: string;
  email: string;
  name: string;
};

const userKey = 'careconnect.user';

export function createLocalUser(email: string): LocalUser {
  const trimmedEmail = email.trim();
  return {
    uid: trimmedEmail.toLowerCase() || 'guest',
    email: trimmedEmail || 'guest@example.com',
    name: trimmedEmail.split('@')[0] || 'User',
  };
}

export function getLocalUser(): LocalUser {
  const savedUser = localStorage.getItem(userKey);

  if (savedUser) {
    try {
      return JSON.parse(savedUser) as LocalUser;
    } catch (error) {
      localStorage.removeItem(userKey);
    }
  }

  return createLocalUser('guest@example.com');
}

export function saveLocalUser(user: LocalUser) {
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function clearLocalUser() {
  localStorage.removeItem(userKey);
}

export function getLocalPointsKey(user: Pick<LocalUser, 'email' | 'uid'>) {
  const identity = (user.email || user.uid || 'guest').trim().toLowerCase();
  return `points_${identity}`;
}
