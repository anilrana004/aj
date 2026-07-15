import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken, getSessionCookieName, getSessionMaxAge } from '@/lib/auth/session';
import { checkRateLimit } from '@/lib/auth/rateLimit';

// Access the same in-memory store — in production, use a real database
const users = new Map<string, { id: string; email: string; name: string; passwordHash: string; emailVerified: boolean }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed, retryAfterMs } = checkRateLimit(`login:${ip}`, { windowMs: 15 * 60 * 1000, maxRequests: 10 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = users.get(normalizedEmail);

    if (!user) {
      return NextResponse.json({ error: 'That email and password don\'t match. Try again, or reset your password.' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'That email and password don\'t match. Try again, or reset your password.' }, { status: 401 });
    }

    const sessionToken = createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
    });

    const response = NextResponse.json({ success: true, redirectTo: '/account/orders' });
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
