'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Collection } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatPrice, cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Animate';

interface ProductPageClientProps {
  product: Product;
  collection: Collection | null;
}

export function ProductPageClient({ product, collection }: ProductPageClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isMakingOfOpen, setIsMakingOfOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        {/* Breadcrumb */}
        <nav className="max-w-[1440px] mx-auto px-responsive py-4 border-b border-border" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-ui text-micro text-text-primary/40">
            <li><Link href="/" className="hover:text-accent-primary transition-colors duration-200">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/collections" className="hover:text-accent-primary transition-colors duration-200">Shop All</Link></li>
            {collection && (
              <>
                <li aria-hidden="true">/</li>
                <li><Link href={`/collections/${collection.slug}`} className="hover:text-accent-primary transition-colors duration-200">{collection.name}</Link></li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-primary truncate max-w-[300px]">{product.name}</li>
          </ol>
        </nav>

        {/* Product */}
        <section className="px-responsive py-12" aria-labelledby="product-title">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Gallery */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary sticky top-20">
                  <Image
                    src={product.images[selectedImageIndex]?.url || '/images/placeholder.svg'}
                    alt={product.images[selectedImageIndex]?.alt || product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide" role="listbox" aria-label="Product images">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        role="option"
                        aria-selected={index === selectedImageIndex}
                        aria-label={`View image ${index + 1}`}
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          'relative shrink-0 w-20 h-20 overflow-hidden rounded-sm transition-all duration-200',
                          index === selectedImageIndex
                            ? 'ring-2 ring-text-primary'
                            : 'opacity-40 hover:opacity-100'
                        )}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-20 space-y-8">
                  {/* Title + Price */}
                  <div>
                    <p className="font-ui text-micro text-text-primary/40 mb-2">{collection?.name || 'Collection'}</p>
                    <h1 id="product-title" className="font-display text-h1 mb-3">{product.name}</h1>
                    <p className="font-display text-h3 text-accent-primary">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>

                  <p className="font-ui text-body text-text-primary/75">
                    {product.description}
                  </p>

                  {/* Trust badges */}
                  <div className="flex flex-wrap items-center gap-5 text-text-primary">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="font-ui text-micro">2 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1M6 21a2 2 0 100-4 2 2 0 000 4zM17 21a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      <span className="font-ui text-micro">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zM12 8v4l3 3" />
                      </svg>
                      <span className="font-ui text-micro">Free Returns</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="space-y-3">
                    <Link href="/appointment" className="btn-primary w-full block text-center">
                      Book Private Viewing
                    </Link>
                    <Link href="/appointment#bespoke" className="btn-outline w-full block text-center">
                      Inquire About This Piece
                    </Link>
                  </div>

                  {/* Specs Accordion */}
                  <div className="border-t border-border pt-6">
                    <button
                      onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                      className="w-full flex items-center justify-between font-ui text-caption py-2"
                      aria-expanded={isSpecsOpen}
                    >
                      <span>Materials & Specifications</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(isSpecsOpen ? 'rotate-180' : '', 'transition-transform duration-300')}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {isSpecsOpen && (
                      <div className="mt-4 space-y-3">
                        <dl className="space-y-2 font-ui text-small">
                          <div className="grid grid-cols-2 gap-2">
                            <dt className="text-text-primary/40">Metal</dt>
                            <dd>{product.metal}</dd>
                          </div>
                          {product.stones.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                              <dt className="text-text-primary/40">Stones</dt>
                              <dd>{product.stones.join(', ')}</dd>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            <dt className="text-text-primary/40">Weight</dt>
                            <dd>{product.weight}</dd>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <dt className="text-text-primary/40">Dimensions</dt>
                            <dd>{product.dimensions}</dd>
                          </div>
                        </dl>
                      </div>
                    )}
                  </div>

                  {/* Making Of Accordion */}
                  {product.makingOf && (
                    <div className="border-t border-border pt-6">
                      <button
                        onClick={() => setIsMakingOfOpen(!isMakingOfOpen)}
                        className="w-full flex items-center justify-between font-ui text-caption py-2"
                        aria-expanded={isMakingOfOpen}
                      >
                        <span>The Making Of</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(isMakingOfOpen ? 'rotate-180' : '', 'transition-transform duration-300')}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {isMakingOfOpen && (
                        <div className="mt-4 space-y-4">
                          <p className="font-ui text-small text-text-primary/70">{product.makingOf.description}</p>
                          <div className="space-y-3">
                            {product.makingOf.steps.map((step) => (
                              <div key={step.step} className="flex gap-3">
                                <span className="font-display text-body font-medium text-accent-gold shrink-0">{step.step}.</span>
                                <div>
                                  <h4 className="font-ui text-small font-medium">{step.title}</h4>
                                  <p className="font-ui text-micro text-text-primary/50">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Story Quote */}
                  <div className="border-t border-border pt-6">
                    <p className="font-display italic text-body text-text-primary/40 text-center">
                      &ldquo;{product.story.slice(0, 200)}...&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="px-responsive py-20 bg-bg-dark" aria-labelledby="related-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <p className="eyebrow-gold mb-4">You May Also Love</p>
            <h2 id="related-title" className="font-display text-h2 text-text-inverse">From the Same Collection</h2>
            {collection && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href={`/collections/${collection.slug}`} className="btn-outline-inverse">
                  View Full Collection
                </Link>
                <Link href="/collections" className="font-ui text-caption text-text-inverse underline-gold">
                  All Collections
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
