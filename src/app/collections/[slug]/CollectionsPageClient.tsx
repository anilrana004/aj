'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Collection, Product } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/sections/Hero';
import { cn } from '@/lib/utils';

interface CollectionsPageClientProps {
  collection: Collection;
  products: Product[];
}

export function CollectionsPageClient({ collection, products }: CollectionsPageClientProps) {
  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <section className="relative min-h-[70vh] flex items-center" aria-labelledby="collection-title">
          <div className="absolute inset-0 z-0">
            <Image
              src={collection.heroImage}
              alt={collection.heroImageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-responsive py-32 w-full">
            <nav className="mb-12" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-ui text-caption text-text-inverse/60">
                <li><Link href="/" className="hover:text-accent-gold">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/collections" className="hover:text-accent-gold">Collections</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-text-inverse">{collection.name}</li>
              </ol>
            </nav>

            <SectionHeader
              id="collection-title"
              eyebrow="COLLECTION"
              title={collection.name}
              description={collection.description}
              alignment="left"
            />
          </div>
        </section>

        <section className="py-32 px-responsive" aria-labelledby="story-title">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[800px]">
              <h2 id="story-title" className="font-display text-h1 mb-8">{collection.name} — The Story</h2>
              <div className="font-ui text-body leading-relaxed space-y-6">
                {collection.story.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {products.length > 0 && (
          <section className="py-32 px-responsive" aria-labelledby="pieces-title">
            <div className="max-w-[1440px] mx-auto">
              <SectionHeader
                id="pieces-title"
                eyebrow="THE PIECES"
                title={`Pieces in ${collection.name}`}
                alignment="center"
              />

              <div className="mt-24 space-y-24">
                {products.map((product, index) => (
                  <article key={product.id} className={cn(index % 2 === 1 ? 'flex flex-col-reverse' : '')}>
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                      <div className="lg:col-span-7 relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={product.images[0]?.url || '/images/placeholder.svg'}
                          alt={product.images[0]?.alt || product.name}
                          fill
                          className="object-cover transition-transform duration-1000 hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                      </div>
                      <div className="lg:col-span-5 space-y-6">
                        <p className="eyebrow-gold">{collection.name}</p>
                        <h3 className="font-display text-h2">{product.name}</h3>
                        <p className="font-ui text-body text-text-primary/80">{product.description}</p>
                        <div className="pt-6 border-t border-border space-y-4">
                          <div className="flex justify-between font-ui text-body">
                            <span className="text-text-primary/60">Metal</span>
                            <span>{product.metal}</span>
                          </div>
                          <div className="flex justify-between font-ui text-body">
                            <span className="text-text-primary/60">Stones</span>
                            <span>{product.stones.join(', ')}</span>
                          </div>
                          <div className="flex justify-between font-ui text-body">
                            <span className="text-text-primary/60">Weight</span>
                            <span>{product.weight}</span>
                          </div>
                          <div className="flex justify-between font-display text-h3">
                            <span>Price</span>
                            <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: product.currency, minimumFractionDigits: 0 }).format(product.price)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Link href={`/product/${product.slug}`} className="btn-primary w-full sm:w-auto inline-flex items-center justify-center py-3 px-6">
                            View Details
                          </Link>
                          <Link href="/appointment" className="font-ui text-caption underline-gold inline-flex items-center justify-center gap-2 py-4 px-8">
                            Book to View
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-32 px-responsive bg-bg-dark" aria-labelledby="cta-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <SectionHeader
              id="cta-title"
              eyebrow="NEXT STEPS"
              title="Begin Your Journey"
              description="Book a private viewing or start a bespoke conversation."
              alignment="center"
            />
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/appointment" className="btn-outline-inverse py-3 px-8">
                Book Appointment
              </Link>
              <Link href="/collections" className="font-ui text-caption underline-gold text-text-inverse">
                Explore Other Collections
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}