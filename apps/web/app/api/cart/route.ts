import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { generateGuestToken } from '@/lib/utils';

async function getOrCreateCart(guestToken?: string) {
  if (!guestToken) {
    guestToken = generateGuestToken();
    const cart = await prisma.cart.create({
      data: { guestToken },
    });
    return { cart, guestToken, isNew: true };
  }

  let cart = await prisma.cart.findUnique({
    where: { guestToken },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { guestToken },
      include: { items: true },
    });
  }

  return { cart, guestToken, isNew: false };
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const guestToken = cookieStore.get('cart_token')?.value;

    const { cart, guestToken: token, isNew } = await getOrCreateCart(guestToken);

    const response = NextResponse.json({
      cartId: cart.id,
      items: cart.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        bespokeConfig: item.bespokeConfig,
        name: 'Item', // Would be fetched from product/design
        price: Number(item.unitPrice),
        isBespoke: !!item.bespokeConfig,
      })),
    });

    if (isNew) {
      response.cookies.set('cart_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 90, // 90 days
        path: '/',
      });
    }

    return response;
  } catch (error: any) {
    console.error('Cart GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    let guestToken = cookieStore.get('cart_token')?.value;

    if (!guestToken) {
      guestToken = generateGuestToken();
    }

    const { cart } = await getOrCreateCart(guestToken);

    if (body.type === 'bespoke') {
      // Server-side price recomputation
      const partIds = body.parts.map((p: any) => p.partId);
      const dbParts = await prisma.part.findMany({
        where: { id: { in: partIds } },
      });
      const partMap = new Map(dbParts.map((p) => [p.id, p]));

      let computedTotal = 0;
      for (const part of body.parts) {
        const dbPart = partMap.get(part.partId);
        if (dbPart) {
          computedTotal += Number(dbPart.price) * (part.quantity || 1);
        }
      }

      // Get or create the category
      let category = await prisma.category.findUnique({
        where: { slug: body.categorySlug },
      });
      if (!category) {
        category = await prisma.category.create({
          data: { slug: body.categorySlug, name: body.categorySlug.charAt(0).toUpperCase() + body.categorySlug.slice(1) + 's' },
        });
      }

      const cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          unitPrice: computedTotal,
          quantity: 1,
          bespokeConfig: {
            categorySlug: body.categorySlug,
            parts: body.parts,
          },
        },
      });

      // Create a SavedDesign record
      await prisma.savedDesign.create({
        data: {
          guestToken,
          categoryId: category.id,
          parts: body.parts,
          totalPrice: computedTotal,
          leadTime: Math.max(...dbParts.map((p) => p.leadTimeDays)),
        },
      });

      return NextResponse.json({ success: true, itemId: cartItem.id });
    }

    if (body.type === 'save-design') {
      let category = await prisma.category.findUnique({
        where: { slug: body.categorySlug },
      });
      if (!category) {
        category = await prisma.category.create({
          data: { slug: body.categorySlug, name: body.categorySlug.charAt(0).toUpperCase() + body.categorySlug.slice(1) + 's' },
        });
      }

      await prisma.savedDesign.create({
        data: {
          guestToken,
          categoryId: category.id,
          parts: body.parts,
          totalPrice: body.totalPrice,
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
  } catch (error: any) {
    console.error('Cart POST error:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { itemId, quantity } = await req.json();

    if (quantity < 1) {
      await prisma.cartItem.delete({ where: { id: itemId } });
      return NextResponse.json({ success: true, deleted: true });
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { itemId } = await req.json();

    await prisma.cartItem.delete({ where: { id: itemId } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
