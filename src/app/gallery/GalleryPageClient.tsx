'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'new', label: 'NEW IN' },
  { id: 'earrings', label: 'EARRINGS' },
  { id: 'rings', label: 'RINGS' },
  { id: 'necklaces', label: 'NECKLACES' },
  { id: 'bracelets', label: 'BRACELETS' },
  { id: 'pins', label: 'PINS' },
  { id: 'objects', label: 'OBJECTS' },
  { id: 'bridal', label: 'BRIDAL' },
] as const;

function matchesFilter(product: Product, filter: string, q: string): boolean {
  if (q) {
    const hay = `${product.name} ${product.description} ${product.metal}`.toLowerCase();
    if (!hay.includes(q.toLowerCase())) return false;
  }

  switch (filter) {
    case 'new':
      return product.isFeatured;
    case 'earrings':
      return /earring|stud|hoop/i.test(product.name) || product.slug.includes('ear');
    case 'rings':
      return /ring|band/i.test(product.name) || product.slug.includes('ring');
    case 'necklaces':
      return /necklace|choker|pendant|mala/i.test(product.name) || /necklace|choker/.test(product.slug);
    case 'bracelets':
      return /bracelet|cuff|bangle/i.test(product.name) || /cuff|bracelet/.test(product.slug);
    case 'pins':
      return /pin|brooch/i.test(product.name) || product.slug.includes('pin');
    case 'objects':
      return /object|sculpt|vessel|box/i.test(product.name) || product.slug.includes('object');
    case 'bridal':
      return product.collectionId === 'bridal-archive' || /bridal|suite/i.test(product.name);
    default:
      return true;
  }
}

export function GalleryContent() {
  const params = useSearchParams();
  const filter = params.get('filter') || 'all';
  const q = params.get('q') || '';

  const filtered = useMemo(
    () => products.filter((p) => matchesFilter(p, filter, q)),
    [filter, q]
  );

  return (
    <>
      <h1 className="page-title">Gallery View</h1>

      <div className="gallery-filters">
        {FILTERS.map((f) => (
          <Link
            key={f.id}
            href={f.id === 'all' ? '/gallery' : `/gallery?filter=${f.id}`}
            className={cn('gallery-filters__link', filter === f.id && 'is-active')}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="px-[4.6875vw] py-20 text-center uppercase text-text-muted" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
          No pieces match this filter.
        </p>
      ) : (
        <div className="gallery-grid">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}

export default function GalleryPageClient() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <GalleryContent />
      </main>
      <Footer />
    </>
  );
}
