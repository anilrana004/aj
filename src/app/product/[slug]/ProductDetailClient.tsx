'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProductDetailClientProps {
  product: Product;
  collection: { name: string; slug: string } | null;
}

export function ProductDetailClient({ product, collection }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMakingOfOpen, setIsMakingOfOpen] = useState(false);

  const heroImages = product.images.filter((img) => img.type === 'hero' || img.type === 'on-body');
  const detailImages = product.images.filter((img) => img.type === 'detail' || img.type === 'macro');

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <nav className="max-w-[1440px] mx-auto px-[80px] py-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-ui text-caption text-text-primary/60">
            <li><Link href="/" className="hover:text-accent-primary">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/collections" className="hover:text-accent-primary">Collections</Link></li>
            {collection && (
              <>
                <li aria-hidden="true">/</li>
                <li><Link href={`/collections/${collection.slug}`} className="hover:text-accent-primary">{collection.name}</Link></li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-primary">{product.name}</li>
          </ol>
        </nav>

        <section className="py-16 px-[80px]" aria-labelledby="product-title">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-8">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.images[selectedImageIndex]?.url || '/images/placeholder.svg'}
                    alt={product.images[selectedImageIndex]?.alt || product.name}
                    fill
                    priority
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-4" role="listbox" aria-label="Product images">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        role="option"
                        aria-selected={index === selectedImageIndex}
                        aria-label={`View ${image.type} image ${index + 1}`}
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          'relative aspect-square overflow-hidden rounded-sm transition-all duration-300',
                          index === selectedImageIndex
                            ? 'ring-2 ring-accent-gold'
                            : 'opacity-60 hover:opacity-100'
                        )}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="20vw"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="eyebrow-gold mb-2">{collection?.name || 'Collection'}</p>
                  <h1 id="product-title" className="font-display text-h1 mb-4">{product.name}</h1>
                  <p className="font-ui text-body text-text-primary/80">{product.description}</p>
                </div>

                <dl className="pt-8 border-t divider-ink space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <dt className="text-text-primary/60">Metal</dt>
                    <dd>{product.metal}</dd>
                    <dt className="text-text-primary/60">Stones</dt>
                    <dd>{product.stones.join(', ')}</dd>
                    <dt className="text-text-primary/60">Weight</dt>
                    <dd>{product.weight}</dd>
                    <dt className="text-text-primary/60">Dimensions</dt>
                    <dd>{product.dimensions}</dd>
                  </div>
                </dl>

                <div className="pt-6 border-t divider-ink space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-ui text-caption text-text-primary/60">Price</span>
                    <span className="font-display text-h2">{formatPrice(product.price, product.currency)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Link href="/appointment">
                    <Button variant="primary" className="w-full" size="lg">
                      Book Private Viewing
                    </Button>
                  </Link>
                  <Link href="/appointment#bespoke" className="block text-center">
                    <Button variant="ghost" className="w-full" size="lg">
                      Inquire About Bespoke
                    </Button>
                  </Link>
                </div>

                {product.makingOf && (
                  <div className="pt-8 border-t divider-ink">
                    <button
                      onClick={() => setIsMakingOfOpen(!isMakingOfOpen)}
                      className="font-ui text-caption underline-gold inline-flex items-center gap-2 w-full justify-between"
                      aria-expanded={isMakingOfOpen}
                    >
                      <span>The Making Of {product.name}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn('transition-transform duration-300', isMakingOfOpen && 'rotate-180')}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {isMakingOfOpen && (
                      <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid lg:grid-cols-12 gap-8">
                          <div className="lg:col-span-5">
                            <Image
                              src={product.makingOf.image}
                              alt={product.makingOf.imageAlt}
                              fill
                              className="object-cover aspect-square"
                              sizes="42vw"
                            />
                          </div>
                          <div className="lg:col-span-7 space-y-4">
                            <p className="font-ui text-body">{product.makingOf.description}</p>
                            <div className="space-y-4 pt-4 border-t divider-ink">
                              {product.makingOf.steps.map((step) => (
                                <div key={step.step} className="flex gap-4">
                                  <span className="font-display text-h3 text-accent-gold shrink-0">{step.step}.</span>
                                  <div>
                                    <h4 className="font-display text-h3 mb-1">{step.title}</h4>
                                    <p className="font-ui text-body text-text-primary/80">{step.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {detailImages.length > 0 && (
          <section className="py-32 px-[80px] bg-bg-secondary" aria-labelledby="details-title">
            <div className="max-w-[1440px] mx-auto">
              <SectionHeader
                id="details-title"
                eyebrow="DETAILS"
                title="Closer Look"
                alignment="center"
              />
              <div className="mt-16 grid md:grid-cols-2 gap-8">
                {detailImages.map((image, index) => (
                  <figure key={index}>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover aspect-square"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <figcaption className="image-caption text-center">{image.type === 'macro' ? 'Macro detail' : 'Detail view'}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {collection && (
          <section className="py-32 px-[80px] bg-bg-dark" aria-labelledby="related-title">
            <div className="max-w-[1440px] mx-auto text-center">
              <SectionHeader
                id="related-title"
                eyebrow="YOU MAY ALSO LOVE"
                title="From the Same Collection"
                alignment="center"
              />
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href={`/collections/${collection.slug}`}>
                  <Button variant="ghost-inverse" size="lg">View Full Collection</Button>
                </Link>
                <Link href="/collections" className="font-ui text-caption underline-gold text-text-inverse">
                  All Collections
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}