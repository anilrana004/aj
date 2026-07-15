import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getPaymentProvider } from '@/lib/payments';
import { getEmailProvider, orderStatusUpdateTemplate } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || req.headers.get('x-razorpay-signature') || '';

    const paymentProvider = getPaymentProvider();
    const event = paymentProvider.constructWebhookEvent(body, signature);

    // Handle payment success
    if (event.type === 'payment_intent.succeeded' || event.type === 'payment.captured') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      if (!orderId) {
        console.error('No orderId in payment metadata');
        return NextResponse.json({ received: true });
      }

      // Update order status
      const order = await prisma.order.findUnique({ where: { id: orderId } });
      if (!order) {
        console.error('Order not found:', orderId);
        return NextResponse.json({ received: true });
      }

      if (order.status === 'PENDING_PAYMENT') {
        // Determine next status based on whether items are bespoke
        const items = await prisma.orderItem.findMany({ where: { orderId } });
        const hasBespoke = items.some((i) => i.isBespoke);
        const nextStatus = hasBespoke ? 'IN_PRODUCTION' : 'PAID';

        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: nextStatus,
            paymentMethod: paymentIntent.payment_method || 'unknown',
          },
        });

        // Record status history
        await prisma.orderStatusHistory.create({
          data: {
            orderId,
            status: 'PAID',
            note: `Payment confirmed via ${paymentIntent.payment_method || 'unknown'}`,
          },
        });

        if (hasBespoke) {
          await prisma.orderStatusHistory.create({
            data: {
              orderId,
              status: 'IN_PRODUCTION',
              note: 'Bespoke piece entering production',
            },
          });

          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'IN_PRODUCTION' },
          });
        }

        // Record payment
        await prisma.payment.create({
          data: {
            orderId,
            provider: process.env.PAYMENT_PROVIDER || 'stripe',
            providerId: paymentIntent.id,
            amount: order.total,
            currency: order.currency,
            status: 'succeeded',
          },
        });

        // Send order confirmation email
        try {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
          const { subject, html } = orderStatusUpdateTemplate(
            { orderNumber: order.orderNumber, status: nextStatus },
            appUrl
          );
          await getEmailProvider().send({ to: order.email, subject, html });
        } catch (emailError) {
          console.error('Failed to send status update email:', emailError);
        }
      }
    }

    // Handle payment failure
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'CANCELLED' },
        });

        await prisma.orderStatusHistory.create({
          data: {
            orderId,
            status: 'CANCELLED',
            note: 'Payment failed',
          },
        });
      }
    }

    // Handle refunds
    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent;

      if (paymentIntentId) {
        const payment = await prisma.payment.findFirst({
          where: { providerId: paymentIntentId },
        });

        if (payment) {
          await prisma.order.update({
            where: { id: payment.orderId },
            data: { status: 'REFUNDED' },
          });

          await prisma.orderStatusHistory.create({
            data: {
              orderId: payment.orderId,
              status: 'REFUNDED',
              note: 'Payment refunded',
            },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}
