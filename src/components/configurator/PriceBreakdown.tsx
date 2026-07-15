'use client';

import { PriceBreakdownItem } from '@/types/configuration';
import { cn } from '@/lib/utils';

interface PriceBreakdownProps {
  breakdown: PriceBreakdownItem[];
  basePrice: number;
  modifiersTotal: number;
  personalizationTotal: number;
  totalPrice: number;
  currency?: string;
  warnings?: string[];
}

export function PriceBreakdown({
  breakdown,
  basePrice,
  modifiersTotal,
  personalizationTotal,
  totalPrice,
  currency = 'INR',
  warnings = [],
}: PriceBreakdownProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-4">
      <h3 className="font-display text-h3">Your Investment</h3>

      <div className="space-y-3">
        {breakdown.map((item, index) => (
          <div key={index} className="flex justify-between items-baseline gap-4 font-ui text-body">
            <span className="truncate text-text-primary/70">{item.label}</span>
            <span className="shrink-0 tabular-nums">{formatPrice(item.amount)}</span>
          </div>
        ))}
      </div>

      {(modifiersTotal > 0 || personalizationTotal > 0) && (
        <div className="border-t divider-ink pt-3 space-y-2">
          {modifiersTotal > 0 && (
            <div className="flex justify-between font-ui text-caption">
              <span className="text-text-primary/50">Craft adjustments</span>
              <span>{formatPrice(modifiersTotal)}</span>
            </div>
          )}
          {personalizationTotal > 0 && (
            <div className="flex justify-between font-ui text-caption">
              <span className="text-text-primary/50">Personalization</span>
              <span>{formatPrice(personalizationTotal)}</span>
            </div>
          )}
        </div>
      )}

      <div className="border-t divider-ink pt-4 flex justify-between items-baseline">
        <span className="font-display text-h3">Total</span>
        <span className="font-display text-h2 text-accent-gold">{formatPrice(totalPrice)}</span>
      </div>

      {warnings.length > 0 && (
        <div className="space-y-2 pt-4">
          {warnings.map((warning, index) => (
            <p key={index} className="font-ui text-caption flex gap-2 text-text-primary/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 mt-0.5 text-accent-gold">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {warning}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
