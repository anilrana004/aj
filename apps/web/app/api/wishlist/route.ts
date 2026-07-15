import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, productId, action } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });

    if (action === 'subscribe') {
      if (!user) {
        await prisma.newsletterSubscriber.create({
          data: { email },
        });
      }
      return NextResponse.json({ success: true, message: 'Subscribed successfully' });
    }

    if (action === 'unsubscribe') {
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: false },
      }).catch(() => {}); // Ignore if not found
      return NextResponse.json({ success: true, message: 'Unsubscribed successfully' });
    }

    // Wishlist actions
    if (productId) {
      if (!user) {
        return NextResponse.json({ error: 'Please sign in to use the wishlist' }, { status: 401 });
      }

      if (action === 'add') {
        await prisma.wishlistItem.upsert({
          where: { userId_productId: { userId: user.id, productId } },
          create: { userId: user.id, productId },
          update: {},
        });
        return NextResponse.json({ success: true, added: true });
      }

      if (action === 'remove') {
        await prisma.wishlistItem.deleteMany({
          where: { userId: user.id, productId },
        });
        return NextResponse.json({ success: true, added: false });
      }

      if (action === 'check') {
        const exists = await prisma.wishlistItem.findUnique({
          where: { userId_productId: { userId: user.id, productId } },
        });
        return NextResponse.json({ success: true, added: !!exists });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Wishlist/Newsletter error:', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ items: [] });
    }

    const items = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            slug: true,
            name: true,
            price: true,
            images: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json({
      items: items.map((i) => ({
        productId: i.productId,
        product: {
          ...i.product,
          price: Number(i.product.price),
        },
      })),
    });
  } catch (error: any) {
    console.error('Wishlist GET error:', error);
    return NextResponse.json({ items: [] });
  }
}
