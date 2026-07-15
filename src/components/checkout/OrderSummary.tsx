'use client';

interface OrderSummaryProps {
  items: { name: string; totalPrice: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="border border-border rounded-sm p-6 bg-bg-secondary">
      <h2 className="font-display text-h3 mb-6">Order Summary</h2>
      <div className="space-y-3 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between font-ui text-small">
            <span className="truncate mr-4">{item.name} × {item.quantity}</span>
            <span className="shrink-0">{formatPrice(item.totalPrice * item.quantity)}</span>
          </div>
        ))}
      </div>
      <dl className="space-y-2 border-t border-border pt-4 font-ui text-small">
        <div className="flex justify-between">
          <dt className="text-text-primary/50">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-primary/50">Shipping</dt>
          <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
      </dl>
      <div className="mt-3 pt-3 border-t border-border flex justify-between font-ui text-body font-medium">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
