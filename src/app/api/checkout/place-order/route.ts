import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, contact, shipping, deliveryMethod, paymentMethod, total } = body;

    // Validate required fields
    if (!items?.length || !contact?.email || !shipping?.line1) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate order ID
    const orderId = `ASH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;

    // In production:
    // 1. Validate pricing server-side (re-compute using pricing engine)
    // 2. Create order in database
    // 3. If card/UPI: create Stripe/Razorpay payment intent
    // 4. If bank transfer: generate payment link
    // 5. Send confirmation email
    // 6. Return orderId + clientSecret (for card/UPI)

    console.log('Order placed:', { orderId, items: items.length, total, paymentMethod });

    return NextResponse.json({
      success: true,
      orderId,
      clientSecret: paymentMethod === 'card' ? 'pi_mock_secret_' + orderId : null,
    });
  } catch (error) {
    console.error('Place order error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
