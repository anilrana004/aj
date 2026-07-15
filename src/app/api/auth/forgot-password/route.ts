import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rateLimit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed } = checkRateLimit(`forgot-pw:${ip}`, { windowMs: 60 * 60 * 1000, maxRequests: 3 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { email } = await request.json();
    // Always return success — never reveal whether email exists
    // In production: generate reset token, store in DB, send email
    console.log(`Password reset requested for: ${email}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
