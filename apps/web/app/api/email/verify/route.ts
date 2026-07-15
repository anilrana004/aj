import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    // Mark email as verified
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Delete the token
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
