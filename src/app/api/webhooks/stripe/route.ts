import { NextRequest, NextResponse } from 'next/server';
import { verifyStripeWebhook } from '@/lib/payments/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  const event = verifyStripeWebhook(body, signature);
  if (!event) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;
      console.log(`Payment succeeded for order: ${orderId}`);
      // Mark order as paid in database
      // Trigger order confirmation email
      break;
    }
    case 'payment_intent.payment_failed': {
      const failedIntent = event.data.object;
      const orderId = failedIntent.metadata.orderId;
      console.log(`Payment failed for order: ${orderId}`);
      // Send payment failure notification
      break;
    }
    case 'charge.refunded': {
      const charge = event.data.object;
      console.log(`Refund processed: ${charge.id}`);
      // Update order status, send refund confirmation
      break;
    }
    default:
      console.log(`Unhandled webhook event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
