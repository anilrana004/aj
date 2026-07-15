'use client';

import { cn } from '@/lib/utils';

interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  days: string;
}

const deliveryMethods: DeliveryMethod[] = [
  { id: 'standard', name: 'Standard Delivery', description: 'Carefully packaged in our signature khaddi paper box', price: 0, days: '5–7 business days' },
  { id: 'express', name: 'Express Delivery', description: 'Priority handling with full insurance', price: 2500, days: '2–3 business days' },
];

interface DeliveryStepProps {
  selected: string;
  onSelect: (id: string) => void;
  isBespoke: boolean;
  estimatedShipDate?: string;
}

export function DeliveryStep({ selected, onSelect, isBespoke, estimatedShipDate }: DeliveryStepProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="space-y-6">
      {isBespoke && (
        <div className="p-4 border border-accent-gold/30 rounded-sm bg-bg-secondary">
          <p className="font-ui text-body">
            This order includes a made-to-order piece.{' '}
            {estimatedShipDate && (
              <>Estimated ship date: <strong>{estimatedShipDate}</strong>. </>
            )}
            Delivery method affects transit time only, after production.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {deliveryMethods.map((method) => (
          <label
            key={method.id}
            className={cn(
              'flex items-start gap-4 p-5 border rounded-sm cursor-pointer transition-all',
              selected === method.id
                ? 'border-accent-gold bg-bg-secondary'
                : 'border-border hover:border-accent-gold/30'
            )}
          >
            <input
              type="radio"
              name="delivery"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onSelect(method.id)}
              className="mt-1 accent-accent-gold"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-h3">{method.name}</h3>
                <span className="font-ui text-body">
                  {method.price === 0 ? 'Free' : formatPrice(method.price)}
                </span>
              </div>
              <p className="font-ui text-caption mt-1 text-text-primary/60">
                {method.days} · {method.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
