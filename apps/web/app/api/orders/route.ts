import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (orderId) where.orderNumber = orderId;
    if (email) where.email = email;
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          statusHistory: { orderBy: { createdAt: 'asc' } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders: orders.map((o) => ({
        ...o,
        subtotal: Number(o.subtotal),
        shippingCost: Number(o.shippingCost),
        tax: Number(o.tax),
        total: Number(o.total),
        items: o.items.map((i) => ({
          ...i,
          unitPrice: Number(i.unitPrice),
          totalPrice: Number(i.totalPrice),
        })),
      })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error: any) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { orderNumber, status, note } = await req.json();

    if (!orderNumber || !status) {
      return NextResponse.json({ error: 'Order number and status are required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { orderNumber } });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order status
    await prisma.order.update({
      where: { id: order.id },
      data: { status },
    });

    // Record status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status,
        note,
      },
    });

    // Send status update email
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const { getEmailProvider, orderStatusUpdateTemplate } = await import('@/lib/email');
      const { subject, html } = orderStatusUpdateTemplate(
        { orderNumber, status, note },
        appUrl
      );
      await getEmailProvider().send({ to: order.email, subject, html });
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Orders PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
