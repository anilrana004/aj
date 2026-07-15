import { NextRequest, NextResponse } from 'next/server';

// Merge guest cart into account cart
export async function POST(request: NextRequest) {
  try {
    const { guestItems, accountSessionId } = await request.json();
    // In production: merge guest cart items with existing account cart
    return NextResponse.json({ success: true, message: 'Cart merged' });
  } catch {
    return NextResponse.json({ error: 'Failed to merge cart' }, { status: 500 });
  }
}
