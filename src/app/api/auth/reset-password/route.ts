import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth/password';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    // In production: look up token in DB, verify not expired, update password, invalidate token
    const _hash = await hashPassword(password); // Verify hashing works
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid or expired reset link.' }, { status: 400 });
  }
}
