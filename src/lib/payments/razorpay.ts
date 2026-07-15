import crypto from 'crypto';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

export function isRazorpayConfigured(): boolean {
  return Boolean(razorpayKeyId && razorpayKeySecret);
}

export async function createRazorpayOrder(amountInINR: number, receipt: string) {
  if (!isRazorpayConfigured()) {
    return { orderId: null, error: 'Razorpay not configured' };
  }

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInINR * 100, // paise
        currency: 'INR',
        receipt,
      }),
    });

    const data = await response.json();
    return { orderId: data.id, error: null };
  } catch (err) {
    return { orderId: null, error: (err as Error).message };
  }
}

export function verifyRazorpayWebhook(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expectedSignature === signature;
}
