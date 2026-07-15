'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { Reveal } from '@/components/ui/Animate';
import { collections, products } from '@/lib/data';

export function CollectionsContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const activeCollections = collections.filter((c) => c.isActive);

  const filteredProducts = activeCategory === 'all'
    ? products.filter((p) => p.isAvailable)
    : products.filter((p) => p.collectionId === activeCategory && p.isAvailable);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end bg-bg-secondary">
        <div className="absolute inset-0">
          <img
            src="/images/collections/hero.svg"
            alt="Collection of jewelry pieces"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-bg-dark/20 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-responsive pb-16">
          <div className="max-w-[1440px] mx-auto">
            <p className="eyebrow-gold mb-3">All Jewelry</p>
            <h1 className="font-display text-hero text-text-inverse">Shop All</h1>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-responsive py-6 border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <nav className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide" aria-label="Collection categories">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'shrink-0 font-ui text-caption transition-colors duration-200 whitespace-nowrap pb-1',
                activeCategory === 'all'
                  ? 'text-text-primary border-b-2 border-text-primary'
                  : 'text-text-primary/40 hover:text-text-primary'
              )}
            >
              All Jewelry
            </button>
            {activeCollections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCategory(collection.id)}
                className={cn(
                  'shrink-0 font-ui text-caption transition-colors duration-200 whitespace-nowrap pb-1',
                  activeCategory === collection.id
                    ? 'text-text-primary border-b-2 border-text-primary'
                    : 'text-text-primary/40 hover:text-text-primary'
                )}
              >
                {collection.name}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-responsive py-12" aria-labelledby="products-grid-title">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-ui text-micro text-text-primary/40 mb-6">
            {filteredProducts.length} Products
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.05, 0.3)}>
                <ProductCard product={product} priority={index < 4} />
              </Reveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-h2 mb-4">Coming Soon</p>
              <p className="font-ui text-body text-text-primary/55">
                This collection is being curated. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bespoke CTA */}
      <section className="px-responsive py-20 bg-bg-secondary">
        <div className="max-w-[1440px] mx-auto text-center">
          <Reveal>
            <p className="eyebrow mb-4">Beyond Collections</p>
            <h2 className="font-display text-h2 mb-4">Bespoke Commissions</h2>
            <p className="font-ui text-body text-text-primary/60 max-w-[600px] mx-auto mb-8">
              When the collection doesn&apos;t hold your story, we write a new one.
              From reimagining heirloom stones to designing from a single sketch.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/design-your-own" className="btn-primary">
                Start Designing
              </Link>
              <Link href="/appointment" className="font-ui text-caption underline-gold">
                Book Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqBlock
        title="Collections — Questions"
        items={[
          {
            question: 'How do I know which collection is right for me?',
            answer: 'Each collection explores a different mood and use case — The Zenana Edit for intimate daily pieces, The Maharani Suite for ceremonial statements, The Artisan Line for understated handcraft, and The Bridal Archive for wedding commissions. Start with the story that resonates.',
          },
          {
            question: 'Can I mix pieces from different collections?',
            answer: 'Absolutely. Our pieces are designed to layer and coexist across collections. A Zenana choker pairs beautifully with an Artisan Line cuff. Our stylists can advise on combinations during a complimentary consultation.',
          },
          {
            question: 'Are all pieces shown on the website available to purchase?',
            answer: 'Most pieces are made to order. Items marked "In Stock" ship within 5 to 7 business days. Made-to-order pieces typically require 2 to 4 weeks. Bespoke commissions begin with a consultation and require 3 to 6 months.',
          },
          {
            question: 'Do you ship internationally?',
            answer: 'Yes. We ship worldwide via FedEx and DHL Express, fully insured. International shipments arrive within 5 to 10 business days. Customs duties are the client\'s responsibility — we handle all export documentation.',
          },
        ]}
      />
    </>
  );
}
