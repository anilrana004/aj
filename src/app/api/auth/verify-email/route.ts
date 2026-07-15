import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Token required.' }, { status: 400 });
    }

    // In production: look up token in database, verify not expired, mark user as verified
    // For now, simulate success
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
  }
}
