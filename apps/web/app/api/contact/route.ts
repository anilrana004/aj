import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
