interface EmailTemplate {
  subject: string;
  html: string;
}

interface OrderItem {
  name: string;
  productType: string;
  partsSummary: string[];
  storyNarrative: string;
  totalPrice: number;
}

function wrap(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; color: #2a2522; background: #f5f0e8; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #2d1f22; letter-spacing: 0.05em; }
    .content { line-height: 1.6; }
    .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8e0d4; text-align: center; font-size: 13px; color: #6b5b4f; }
    .btn { display: inline-block; padding: 14px 32px; background: #2d1f22; color: #faf7f3; text-decoration: none; border-radius: 2px; font-size: 14px; }
    .divider { border-top: 1px solid #e8e0d4; margin: 24px 0; }
    h1 { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: 28px; color: #2d1f22; }
    h2 { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: 20px; color: #2d1f22; }
    .gold { color: #b8965c; }
    .story { font-style: italic; color: #6b5b4f; border-left: 2px solid #b8965c; padding-left: 16px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">APRILIHA SINGH</div>
    </div>
    <div class="content">
      ${body}
    </div>
    <div class="footer">
      <p>Apriliha Singh · Fine Bespoke Jewelry · Jaipur, India</p>
      <p><a href="https://aprilihasingh.com/care-guide" style="color: #b8965c;">Care Guide</a> · <a href="https://aprilihasingh.com/contact" style="color: #b8965c;">Contact</a></p>
    </div>
  </div>
</body>
</html>`;
}

export function welcomeEmail(name: string): EmailTemplate {
  return {
    subject: 'Welcome to Apriliha Singh',
    html: wrap(`
      <h1>Welcome, ${name}.</h1>
      <p>Thank you for joining us. Your account is ready — you can now save designs, track orders, and checkout faster.</p>
      <p>Every piece we make begins with a conversation between karigar and client. We look forward to having that conversation with you.</p>
      <p><a href="https://aprilihasingh.com/design-your-own" class="btn">Design Your First Piece</a></p>
    `),
  };
}

export function orderConfirmationEmail(orderId: string, items: OrderItem[], storyNarrative: string, estimatedShipDate: string): EmailTemplate {
  const itemList = items.map((i) => `
    <div style="margin-bottom: 16px;">
      <h2>${i.name}</h2>
      <p style="text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; color: #6b5b4f;">${i.productType}</p>
      ${i.storyNarrative ? `<div class="story">"${i.storyNarrative}"</div>` : ''}
    </div>
  `).join('');

  return {
    subject: `Your Apriliha Singh piece is now in the making — ${orderId}`,
    html: wrap(`
      <h1>Your piece is being crafted.</h1>
      <p>We have received your order and our atelier team will begin work shortly.</p>
      <div class="divider"></div>
      <p><strong>Order:</strong> ${orderId}</p>
      <p><strong>Estimated ship date:</strong> ${estimatedShipDate}</p>
      <div class="divider"></div>
      ${itemList}
      <div class="divider"></div>
      <p>What happens next:</p>
      <ol>
        <li>Our creative director will review your design and confirm details within 24 hours.</li>
        <li>Once confirmed, production begins. You can track progress in your account.</li>
        <li>We will notify you when your piece ships.</li>
      </ol>
      <p><a href="https://aprilihasingh.com/account/orders/${orderId}" class="btn">Track Your Order</a></p>
    `),
  };
}

export function orderShippedEmail(orderId: string, trackingUrl: string, carrier: string): EmailTemplate {
  return {
    subject: `Your Apriliha Singh piece has shipped — ${orderId}`,
    html: wrap(`
      <h1>Your piece is on its way.</h1>
      <p>Your order <strong>${orderId}</strong> has shipped via ${carrier}.</p>
      <p><a href="${trackingUrl}" class="btn">Track Shipment</a></p>
      <div class="divider"></div>
      <p>Once your piece arrives, we recommend reading our <a href="https://aprilihasingh.com/care-guide" class="gold">Care Guide</a> to ensure it lasts for generations.</p>
    `),
  };
}

export function forgotPasswordEmail(resetLink: string): EmailTemplate {
  return {
    subject: 'Reset your Apriliha Singh password',
    html: wrap(`
      <h1>Password Reset</h1>
      <p>You requested a password reset. Click the button below to choose a new password.</p>
      <p><a href="${resetLink}" class="btn">Reset Password</a></p>
      <p style="font-size: 13px; color: #6b5b4f;">This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p>
    `),
  };
}

export function verifyEmailEmail(verifyLink: string): EmailTemplate {
  return {
    subject: 'Verify your Apriliha Singh email',
    html: wrap(`
      <h1>Verify Your Email</h1>
      <p>Please verify your email address to receive order updates and shipping notifications.</p>
      <p><a href="${verifyLink}" class="btn">Verify Email</a></p>
      <p style="font-size: 13px; color: #6b5b4f;">This link expires in 24 hours.</p>
    `),
  };
}
