export interface SessionUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
}

const SESSION_COOKIE = 'apriliha-session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function createSessionToken(user: SessionUser): string {
  const payload = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function parseSessionToken(token: string): SessionUser | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      emailVerified: payload.emailVerified,
    };
  } catch {
    return null;
  }
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionMaxAge(): number {
  return SESSION_MAX_AGE;
}
