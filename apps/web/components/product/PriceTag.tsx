'use client';

import { formatPrice } from '@/lib/utils';

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriceTag({ price, compareAtPrice, size = 'md' }: PriceTagProps) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className={
          size === 'lg'
            ? 'text-headline text-aubergine font-serif'
            : size === 'md'
            ? 'text-subhead text-aubergine'
            : 'text-body text-aubergine'
        }
      >
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-body text-bronze/40 line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
