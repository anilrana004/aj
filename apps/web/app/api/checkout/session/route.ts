import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getPaymentProvider } from '@/lib/payments';
import { generateOrderNumber } from '@/lib/utils';
import { getEmailProvider, orderConfirmationTemplate } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, shippingAddress, isGuest } = body;

    if (!email || !shippingAddress) {
      return NextResponse.json({ error: 'Email and shipping address are required' }, { status: 400 });
    }

    // Get cart
    const cookieStore = req.headers.get('cookie') || '';
    const cartTokenMatch = cookieStore.match(/cart_token=([^;]+)/);
    const guestToken = cartTokenMatch?.[1];

    if (!guestToken) {
      return NextResponse.json({ error: 'No cart found' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { guestToken },
      include: { items: true },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Server-side price recomputation
    let subtotal = 0;
    const orderItems: Array<{
      productId?: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      bespokeConfig?: any;
      isBespoke: boolean;
    }> = [];

    for (const item of cart.items) {
      let name = 'Item';
      let unitPrice = Number(item.unitPrice);
      let isBespoke = false;

      if (item.bespokeConfig) {
        // Bespoke item — recompute from parts
        isBespoke = true;
        const config = item.bespokeConfig as any;
        const partIds = config.parts?.map((p: any) => p.partId) || [];
        const dbParts = await prisma.part.findMany({
          where: { id: { in: partIds } },
        });
        const partMap = new Map(dbParts.map((p) => [p.id, p]));
        let computedTotal = 0;
        const partNames: string[] = [];
        for (const part of config.parts || []) {
          const dbPart = partMap.get(part.partId);
          if (dbPart) {
            computedTotal += Number(dbPart.price) * (part.quantity || 1);
            partNames.push(dbPart.name);
          }
        }
        unitPrice = computedTotal;
        name = partNames.join(' + ') || 'Bespoke Piece';
      } else if (item.productId) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (product) {
          name = product.name;
          unitPrice = Number(product.price);
        }
      }

      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      orderItems.push({
        productId: item.productId || undefined,
        name,
        quantity: item.quantity,
        unitPrice,
        totalPrice: lineTotal,
        bespokeConfig: item.bespokeConfig || undefined,
        isBespoke,
      });
    }

    const shippingCost = 0;
    const tax = 0;
    const total = subtotal + shippingCost + tax;
    const orderNumber = generateOrderNumber();

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        email,
        status: 'PENDING_PAYMENT',
        subtotal,
        shippingCost,
        tax,
        total,
        shippingAddress,
        guestToken,
        items: {
          create: orderItems,
        },
        statusHistory: {
          create: { status: 'PENDING_PAYMENT', note: 'Order placed' },
        },
      },
    });

    // Create payment intent
    const paymentProvider = getPaymentProvider();
    const paymentIntent = await paymentProvider.createPaymentIntent(total, 'inr', {
      orderId: order.id,
      orderNumber,
    });

    // Update order with payment intent
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    // Send confirmation email
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const { subject, html } = orderConfirmationTemplate(
        {
          orderNumber,
          total,
          items: orderItems.map((i) => ({ name: i.name, quantity: i.quantity, isBespoke: i.isBespoke })),
        },
        appUrl
      );
      await getEmailProvider().send({ to: email, subject, html });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json({
      success: true,
      orderNumber,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.clientSecret,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
