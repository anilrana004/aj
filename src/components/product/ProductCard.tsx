'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  badge?: string;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
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
      <Link href={`/product/${product.slug}`} className="block u-hover-fade">
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
              <span className="text-text-primary/20 uppercase" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
                Apriliha Singh
              </span>
            </div>
          )}

          {!product.isAvailable && (
            <span
              className="absolute top-3 left-3 uppercase text-text-muted"
              style={{ fontSize: '9px', letterSpacing: '0.13em' }}
            >
              Sold Out
            </span>
          )}
        </div>

        <p className="product-name uppercase">{product.name}</p>
      </Link>
    </article>
  );
}
