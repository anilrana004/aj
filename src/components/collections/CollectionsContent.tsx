'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { collections, products } from '@/lib/data';
import { img } from '@/lib/images';

export function CollectionsContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const activeCollections = collections.filter((c) => c.isActive);

  const filteredProducts = activeCategory === 'all'
    ? products.filter((p) => p.isAvailable)
    : products.filter((p) => p.collectionId === activeCategory && p.isAvailable);

  return (
    <>
      {/* Hero — SHIHARA style */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full bg-bg-secondary" style={{ aspectRatio: '1.531 / 1' }}>
          <img
            src={img.collectionsHero}
            alt="Collection of jewelry pieces"
            className="w-full h-full object-cover max-md:h-[50vh] max-md:aspect-auto"
          />
          <h1
            className="absolute top-1/2 left-[4.6875vw] -translate-y-1/2 text-ivory-text uppercase max-md:left-[4.05vw]"
            style={{ fontSize: '15px', letterSpacing: '0.13em', fontWeight: 400 }}
          >
            Shop All
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="px-responsive py-8 border-b border-border">
        <nav className="flex gap-6 overflow-x-auto scrollbar-hide" aria-label="Collection categories">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'shrink-0 uppercase transition-opacity duration-200 whitespace-nowrap',
              activeCategory === 'all' ? 'text-accent-gold' : 'text-text-muted hover:opacity-70'
            )}
            style={{ fontSize: '10px', letterSpacing: '0.13em' }}
          >
            All Jewelry
          </button>
          {activeCollections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCategory(collection.id)}
              className={cn(
                'shrink-0 uppercase transition-opacity duration-200 whitespace-nowrap',
                activeCategory === collection.id ? 'text-accent-gold' : 'text-text-muted hover:opacity-70'
              )}
              style={{ fontSize: '10px', letterSpacing: '0.13em' }}
            >
              {collection.name}
            </button>
          ))}
        </nav>
      </section>

      {/* Products Grid */}
      <section className="px-responsive py-12" aria-labelledby="products-grid-title">
        <h2 id="products-grid-title" className="sr-only">Products</h2>
        <p className="text-text-muted mb-8 uppercase" style={{ fontSize: '9px', letterSpacing: '0.13em' }}>
          {filteredProducts.length} Products
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[10px] gap-y-12">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-text-muted py-20 uppercase" style={{ fontSize: '10px', letterSpacing: '0.13em' }}>
            No products in this collection yet.
          </p>
        )}
      </section>

      {/* Collection teasers */}
      <section className="section-gap mb-[100px]" aria-label="Browse collections">
        <h2 className="section-label">Collections</h2>
        <div className="flex gap-[10px] mt-10 px-[0.78%] max-md:px-[3.8vw] overflow-x-auto scrollbar-hide">
          {activeCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="block shrink-0 w-[calc(625/1260*100%)] max-md:w-[70vw] u-hover-fade"
            >
              <div className="overflow-hidden bg-bg-secondary" style={{ aspectRatio: '1.308 / 1' }}>
                <img
                  src={collection.thumbnailImage}
                  alt={collection.heroImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="mt-3 px-2.5 text-text-primary uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.13em' }}
              >
                {collection.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="px-responsive pb-20">
        <FaqBlock
          items={[
            {
              question: 'How do I care for my jewelry?',
              answer: 'Store pieces separately, avoid chemicals, and clean gently with a soft cloth. See our Care Guide for details.',
            },
            {
              question: 'Do you offer custom commissions?',
              answer: 'Yes. Book an appointment or use Design Your Own to begin a bespoke piece.',
            },
          ]}
        />
      </div>
    </>
  );
}
