'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
  isBespoke?: boolean;
  category?: string;
  materials?: string[];
}

export default function ProductCard({
  slug,
  name,
  price,
  compareAtPrice,
  isBespoke,
  category,
}: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="aspect-[3/4] bg-stone/30 relative overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-sand/60 to-stone/80 transition-transform duration-500 ease-default group-hover:scale-105" />
        <div className="absolute top-3 left-3">
          {isBespoke && <Badge variant="bespoke">Bespoke</Badge>}
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-label uppercase tracking-widest text-aubergine bg-cream/90 px-3 py-1.5">
            View
          </span>
        </div>
      </div>
      <div>
        {category && (
          <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">
            {category}
          </p>
        )}
        <h3 className="font-serif text-body-lg text-aubergine group-hover:text-terracotta transition-colors">
          {name}
        </h3>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-body text-aubergine font-medium">
            {formatPrice(price)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-body text-bronze/40 line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
