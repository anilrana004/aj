import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-razorpay-signature') || '';

  // In production: verify signature using verifyRazorpayWebhook
  // For now, log the event
  try {
    const payload = JSON.parse(body);
    const event = payload.event;

    switch (event) {
      case 'payment.captured':
        console.log('Razorpay payment captured:', payload.payload.payment?.entity?.order_id);
        break;
      case 'payment.failed':
        console.log('Razorpay payment failed:', payload.payload.payment?.entity?.order_id);
        break;
      default:
        console.log('Unhandled Razorpay event:', event);
    }
  } catch {
    console.error('Failed to parse Razorpay webhook');
  }

  return NextResponse.json({ status: 'ok' });
}
