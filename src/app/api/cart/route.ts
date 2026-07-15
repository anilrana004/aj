import { NextRequest, NextResponse } from 'next/server';

// Server-side cart store (in production, use Redis or database)
const carts = new Map<string, any[]>();

function getSessionId(request: NextRequest): string {
  return request.cookies.get('apriliha-session')?.value || request.headers.get('x-session-id') || 'anonymous';
}

export async function GET(request: NextRequest) {
  const sessionId = getSessionId(request);
  const items = carts.get(sessionId) || [];
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const sessionId = getSessionId(request);
  const { items } = await request.json();
  carts.set(sessionId, items || []);
  return NextResponse.json({ success: true });
}
