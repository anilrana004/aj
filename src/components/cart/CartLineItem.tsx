'use client';

import Link from 'next/link';
import { img } from '@/lib/images';

interface CartLineItemProps {
  id: string;
  name: string;
  productType: string;
  previewImageUrl: string;
  quantity: number;
  totalPrice: number;
  partsSummary?: string[];
  onRemove?: (id: string) => void;
}

export function CartLineItem({
  id,
  name,
  productType,
  previewImageUrl,
  quantity,
  totalPrice,
  partsSummary = [],
  onRemove,
}: CartLineItemProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="py-6 border-b divider-ink last:border-b-0 flex gap-4">
      <div className="w-20 h-20 shrink-0 bg-bg-secondary rounded-sm overflow-hidden">
        <img
          src={previewImageUrl || img.configuratorPlaceholder}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-ui text-body font-medium">{name}</h3>
        <p className="font-ui text-caption text-text-primary/50 uppercase tracking-wider">
          {productType}
        </p>
        {partsSummary.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {partsSummary.map((part, i) => (
              <span key={i} className="font-ui text-caption px-2 py-0.5 bg-bg-secondary rounded-sm">
                {part}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="font-ui text-body font-medium">{formatPrice(totalPrice * quantity)}</span>
          {onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="font-ui text-caption underline-gold text-text-primary/50"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
