export interface EmailProvider {
  send(params: EmailParams): Promise<EmailSendResult>;
}

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface EmailSendResult {
  id: string | null;
  success: boolean;
  error?: string;
}

// ─── Email Templates ─────────────────────────────────────

const FROM_ADDRESS = 'Apriliha Singh <hello@aprilihasingh.com>';

function wrapTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #2E1B24; background: #FAF7F2; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 24px; letter-spacing: 0.15em; color: #2E1B24; font-family: Georgia, serif; }
    .content { line-height: 1.6; font-size: 15px; }
    .button { display: inline-block; padding: 14px 32px; background: #8A3B24; color: #FAF7F2; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 24px 0; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #D7CBB8; font-size: 12px; color: #6B4A2E; text-align: center; }
    .detail { background: #E4D8C4; padding: 16px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">APRILIHA SINGH</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Apriliha Singh — Fine Jewelry</p>
      <p>Jaipur, Rajasthan, India</p>
    </div>
  </div>
</body>
</html>`;
}

export function emailVerificationTemplate(token: string, appUrl: string): { subject: string; html: string } {
  return {
    subject: 'Verify your email — Apriliha Singh',
    html: wrapTemplate(`
      <h2 style="font-family: Georgia, serif; font-weight: normal;">Welcome to Apriliha Singh</h2>
      <p>Thank you for joining us. Please verify your email address to complete your account setup.</p>
      <a href="${appUrl}/auth/verify-email?token=${token}" class="button">Verify Email Address</a>
      <p style="font-size: 13px; color: #6B4A2E;">This link expires in 24 hours. If you did not create an account, please ignore this email.</p>
    `),
  };
}

export function orderConfirmationTemplate(order: {
  orderNumber: string;
  total: number;
  items: Array<{ name: string; quantity: number; isBespoke: boolean }>;
  estimatedDelivery?: Date;
}, appUrl: string): { subject: string; html: string } {
  const itemRows = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #D7CBB8;">
            ${item.name} ${item.isBespoke ? '<em style="color: #C9762C;">(Bespoke)</em>' : ''}
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #D7CBB8; text-align: right;">×${item.quantity}</td>
        </tr>`
    )
    .join('');

  return {
    subject: `Order Confirmation — ${order.orderNumber}`,
    html: wrapTemplate(`
      <h2 style="font-family: Georgia, serif; font-weight: normal;">Your Order is Confirmed</h2>
      <p>Thank you for choosing Apriliha Singh. We have received your order and it is being carefully prepared.</p>
      <div class="detail">
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Total:</strong> ₹${order.total.toLocaleString('en-IN')}</p>
        ${order.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>` : ''}
      </div>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px 0; border-bottom: 2px solid #2E1B24; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Item</th>
            <th style="text-align: right; padding: 8px 0; border-bottom: 2px solid #2E1B24; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Qty</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>
      <p>You can track your order status anytime:</p>
      <a href="${appUrl}/account/orders/${order.orderNumber}" class="button">Track Order</a>
    `),
  };
}

export function orderStatusUpdateTemplate(order: {
  orderNumber: string;
  status: string;
  note?: string;
}, appUrl: string): { subject: string; html: string } {
  const statusMessages: Record<string, string> = {
    PAID: 'Your payment has been confirmed. We are now preparing your order.',
    IN_PRODUCTION: 'Your bespoke piece has entered our atelier. Our artisans are beginning to bring your design to life.',
    QUALITY_CHECK: 'Your piece has completed crafting and is now undergoing our quality inspection.',
    SHIPPED: 'Your order has been shipped and is on its way to you.',
    DELIVERED: 'Your order has been delivered. We hope you love your piece.',
    CANCELLED: 'Your order has been cancelled.',
    REFUNDED: 'Your order has been refunded.',
  };

  return {
    subject: `Order Update — ${order.orderNumber}`,
    html: wrapTemplate(`
      <h2 style="font-family: Georgia, serif; font-weight: normal;">Order Update</h2>
      <p>Your order <strong>${order.orderNumber}</strong> has been updated.</p>
      <div class="detail">
        <p><strong>Status:</strong> ${statusMessages[order.status] || order.status}</p>
        ${order.note ? `<p>${order.note}</p>` : ''}
      </div>
      <a href="${appUrl}/account/orders/${order.orderNumber}" class="button">View Order</a>
    `),
  };
}

export function magicLinkTemplate(token: string, appUrl: string): { subject: string; html: string } {
  return {
    subject: 'Your Sign-In Link — Apriliha Singh',
    html: wrapTemplate(`
      <h2 style="font-family: Georgia, serif; font-weight: normal;">Sign In to Apriliha Singh</h2>
      <p>Click the button below to sign in to your account. This link is valid for 1 hour.</p>
      <a href="${appUrl}/api/auth/callback/magic-link?token=${token}" class="button">Sign In</a>
      <p style="font-size: 13px; color: #6B4A2E;">If you did not request this link, please ignore this email.</p>
    `),
  };
}

export function passwordResetTemplate(token: string, appUrl: string): { subject: string; html: string } {
  return {
    subject: 'Reset Your Password — Apriliha Singh',
    html: wrapTemplate(`
      <h2 style="font-family: Georgia, serif; font-weight: normal;">Reset Your Password</h2>
      <p>We received a request to reset your password. Click the button below to create a new password.</p>
      <a href="${appUrl}/auth/forgot-password?token=${token}" class="button">Reset Password</a>
      <p style="font-size: 13px; color: #6B4A2E;">This link expires in 1 hour. If you did not request a password reset, please ignore this email.</p>
    `),
  };
}

// ─── Resend Adapter ──────────────────────────────────────

class ResendAdapter implements EmailProvider {
  async send(params: EmailParams): Promise<EmailSendResult> {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const result = await resend.emails.send({
        from: params.from || FROM_ADDRESS,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });

      return { id: result.data?.id ?? null, success: true };
    } catch (error: any) {
      console.error('Email send failed:', error);
      return { id: null, success: false, error: error.message };
    }
  }
}

// ─── Factory ─────────────────────────────────────────────

export function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'resend';

  switch (provider) {
    case 'resend':
    default:
      return new ResendAdapter();
  }
}
