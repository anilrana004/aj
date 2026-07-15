import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth/password';
import { createSessionToken, getSessionCookieName, getSessionMaxAge } from '@/lib/auth/session';
import { checkRateLimit } from '@/lib/auth/rateLimit';

// In-memory user store — replace with database in production
const users = new Map<string, { id: string; email: string; name: string; passwordHash: string; emailVerified: boolean }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed, retryAfterMs } = checkRateLimit(`signup:${ip}`, { windowMs: 15 * 60 * 1000, maxRequests: 5 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (users.has(normalizedEmail)) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    users.set(normalizedEmail, {
      id: userId,
      email: normalizedEmail,
      name: name.trim(),
      passwordHash,
      emailVerified: false,
    });

    const sessionToken = createSessionToken({
      id: userId,
      email: normalizedEmail,
      name: name.trim(),
      emailVerified: false,
    });

    const response = NextResponse.json({ success: true, userId });
    response.cookies.set(getSessionCookieName(), sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: getSessionMaxAge(),
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
