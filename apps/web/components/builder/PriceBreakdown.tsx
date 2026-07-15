'use client';

import { cn, formatPrice, getLeadTimeLabel } from '@/lib/utils';
import type { BuilderSelection } from './BespokeBuilder';

interface PriceBreakdownProps {
  selections: BuilderSelection[];
  total: number;
  maxLeadTime: number;
}

export default function PriceBreakdown({ selections, total, maxLeadTime }: PriceBreakdownProps) {
  if (selections.length === 0) return null;

  return (
    <div className="mt-8 border-t border-stone/20 pt-6">
      <h3 className="text-label uppercase tracking-widest text-bronze/60 mb-4">
        Price Breakdown
      </h3>
      <div className="space-y-2">
        {selections.map((s) => (
          <div key={s.partTypeId} className="flex items-center justify-between">
            <span className="text-body text-aubergine line-clamp-1">{s.partName}</span>
            <span className="text-body text-aubergine shrink-0 ml-4">
              {formatPrice(s.price * s.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-stone/20 flex items-center justify-between">
        <span className="text-label uppercase tracking-widest text-aubergine">Total</span>
        <span className="font-serif text-subhead text-aubergine">{formatPrice(total)}</span>
      </div>
      {maxLeadTime > 0 && (
        <p className="mt-3 text-caption text-bronze/50">
          {getLeadTimeLabel(maxLeadTime)}
        </p>
      )}
      <p className="mt-2 text-caption text-bronze/40">
        Shipping and taxes calculated at checkout
      </p>
    </div>
  );
}
