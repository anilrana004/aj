import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!stripeSecretKey) return null;
  if (!stripeInstance) {
    stripeInstance = new Stripe(stripeSecretKey);
  }
  return stripeInstance;
}

export async function createPaymentIntent(amountInINR: number, metadata: Record<string, string>) {
  const stripe = getStripe();
  if (!stripe) {
    return { clientSecret: null, error: 'Stripe not configured' };
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amountInINR * 100, // paise
      currency: 'inr',
      metadata,
      automatic_payment_methods: { enabled: true },
    });
    return { clientSecret: intent.client_secret, error: null };
  } catch (err) {
    return { clientSecret: null, error: (err as Error).message };
  }
}

export function verifyStripeWebhook(payload: string | Buffer, signature: string): Stripe.Event | null {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) return null;

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return null;
  }
}
