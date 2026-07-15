'use client';

interface ReviewStepProps {
  items: {
    name: string;
    productType: string;
    partsSummary: string[];
    storyNarrative?: string;
    totalPrice: number;
    quantity: number;
  }[];
  contact: { name: string; email: string; phone: string };
  shipping: { line1: string; line2: string; city: string; state: string; postalCode: string; country: string };
  deliveryMethod: string;
  paymentMethod: string;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  error?: string;
}

export function ReviewStep({
  items,
  contact,
  shipping,
  deliveryMethod,
  paymentMethod,
  termsAccepted,
  onTermsChange,
  error,
}: ReviewStepProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="space-y-8">
      <div className="p-6 border border-border rounded-sm">
        <h3 className="font-display text-h3 mb-3">Contact</h3>
        <p className="font-ui text-body">{contact.name}</p>
        <p className="font-ui text-caption text-text-primary/60">{contact.email} · {contact.phone}</p>
      </div>

      <div className="p-6 border border-border rounded-sm">
        <h3 className="font-display text-h3 mb-3">Shipping To</h3>
        <p className="font-ui text-body">
          {shipping.line1}{shipping.line2 ? `, ${shipping.line2}` : ''}
          <br />
          {shipping.city}, {shipping.state} {shipping.postalCode}
          <br />
          {shipping.country}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-6 border border-border rounded-sm">
            <div className="flex justify-between mb-2">
              <h3 className="font-display text-h3">{item.name}</h3>
              <span className="font-ui text-body font-medium">{formatPrice(item.totalPrice * item.quantity)}</span>
            </div>
            <p className="font-ui text-caption text-text-primary/50 uppercase tracking-wider">
              {item.productType} · Qty {item.quantity}
            </p>
            {item.partsSummary.length > 0 && (
              <p className="font-ui text-caption mt-2 text-text-primary/60">
                {item.partsSummary.join(' · ')}
              </p>
            )}
            {item.storyNarrative && (
              <p className="font-ui text-body italic mt-3 border-t divider-ink pt-3 text-text-primary/60">
                &ldquo;{item.storyNarrative}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 border border-border rounded-sm flex justify-between">
        <div>
          <p className="font-ui text-caption text-text-primary/50">Delivery</p>
          <p className="font-ui text-body capitalize">{deliveryMethod}</p>
        </div>
        <div>
          <p className="font-ui text-caption text-text-primary/50">Payment</p>
          <p className="font-ui text-body capitalize">{paymentMethod}</p>
        </div>
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="mt-1 accent-accent-gold"
          />
          <span className="font-ui text-caption text-text-primary/70">
            I agree to the{' '}
            <a href="/shipping-returns" className="underline-gold" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/care-guide#returns" className="underline-gold" target="_blank" rel="noopener noreferrer">
              Return Policy
            </a>
            .
          </span>
        </label>
        {error && (
          <p className="mt-2 font-ui text-caption" style={{ color: 'var(--color-deep-terracotta)' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
