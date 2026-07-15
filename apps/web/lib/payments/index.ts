export interface PaymentProvider {
  createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<PaymentIntentResult>;
  confirmPayment(paymentIntentId: string): Promise<PaymentConfirmResult>;
  createRefund(paymentIntentId: string, amount?: number): Promise<RefundResult>;
  constructWebhookEvent(body: string | Buffer, signature: string): WebhookEvent;
}

export interface PaymentIntentResult {
  id: string;
  clientSecret: string | null;
  status: string;
  amount: number;
  currency: string;
}

export interface PaymentConfirmResult {
  id: string;
  status: string;
}

export interface RefundResult {
  id: string;
  status: string;
}

export interface WebhookEvent {
  type: string;
  data: {
    object: any;
  };
}

// ─── Stripe Adapter ──────────────────────────────────────

import Stripe from 'stripe';

class StripeAdapter implements PaymentProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10' as any,
    });
  }

  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<PaymentIntentResult> {
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses paise/cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    return {
      id: intent.id,
      clientSecret: intent.client_secret,
      status: intent.status,
      amount: intent.amount,
      currency: intent.currency,
    };
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentConfirmResult> {
    const intent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      id: intent.id,
      status: intent.status,
    };
  }

  async createRefund(paymentIntentId: string, amount?: number): Promise<RefundResult> {
    const refund = await this.stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    return {
      id: refund.id,
      status: refund.status ?? 'succeeded',
    };
  }

  constructWebhookEvent(body: string | Buffer, signature: string): WebhookEvent {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    return { type: event.type, data: event.data } as WebhookEvent;
  }
}

// ─── Razorpay Adapter ───────────────────────────────────

class RazorpayAdapter implements PaymentProvider {
  private razorpay: any;

  constructor() {
    // Razorpay SDK would be imported here
    // import Razorpay from 'razorpay';
    this.razorpay = null; // Will be initialized when keys are provided
  }

  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<PaymentIntentResult> {
    // Razorpay uses amount in paise
    const order = await this.razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      metadata,
    });

    return {
      id: order.id,
      clientSecret: order.id,
      status: 'created',
      amount: amount,
      currency,
    };
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentConfirmResult> {
    return { id: paymentIntentId, status: 'captured' };
  }

  async createRefund(paymentIntentId: string, amount?: number): Promise<RefundResult> {
    const refund = await this.razorpay.payments.refund(paymentIntentId, {
      amount: amount ? Math.round(amount * 100) : undefined,
    });
    return { id: refund.id, status: refund.status };
  }

  constructWebhookEvent(body: string | Buffer, signature: string): WebhookEvent {
    // Razorpay signature verification
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      throw new Error('Invalid webhook signature');
    }

    const payload = JSON.parse(body.toString());
    return { type: payload.event, data: { object: payload.payload } };
  }
}

// ─── Factory ─────────────────────────────────────────────

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER || 'stripe';

  switch (provider) {
    case 'razorpay':
      return new RazorpayAdapter();
    case 'stripe':
    default:
      return new StripeAdapter();
  }
}
