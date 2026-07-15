'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  badge?: string;
}

export function ProductCard({ product, priority = false, badge }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const heroImage = product.images.find((img) => img.type === 'hero');
  const secondImage = product.images.find((img) => img.type === 'on-body') || product.images[1];
  const displayImage = isHovered && secondImage ? secondImage : heroImage;

  return (
    <article
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
          {displayImage ? (
            <Image
              src={displayImage.url}
              alt={displayImage.alt}
              fill
              className="object-cover transition-opacity duration-500"
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-h2 text-text-primary/10">AS</span>
            </div>
          )}

          {(badge || product.isFeatured) && (
            <span className="absolute top-3 left-3 badge">
              {badge || 'Featured'}
            </span>
          )}

          {!product.isAvailable && (
            <span className="absolute top-3 right-3 badge bg-bg-darker">
              Sold Out
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-ui text-caption text-text-primary group-hover:underline underline-offset-4">
            {product.name}
          </h3>
        </Link>
        <p className="font-ui text-micro text-text-primary/50">
          {product.metal}
        </p>
        <p className="font-ui text-caption font-medium text-text-primary">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      {product.isAvailable && (
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 py-3 text-center font-ui text-caption bg-text-primary text-text-inverse transition-all duration-300',
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          )}
        >
          Quick Inquiry
        </div>
      )}
    </article>
  );
}
