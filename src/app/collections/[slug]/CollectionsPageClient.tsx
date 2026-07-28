'use client';

import Link from 'next/link';
import { Collection, Product } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';

interface CollectionsPageClientProps {
  collection: Collection;
  products: Product[];
}

export function CollectionsPageClient({ collection, products }: CollectionsPageClientProps) {
  return (
    <>
      <Header />
      <main className="site-main">
        <section className="collection-hero" aria-labelledby="collection-title">
          <div className="collection-hero__media">
            <img
              src={collection.heroImage}
              alt={collection.heroImageAlt}
              className="collection-hero__image"
            />
          </div>
          <h1 id="collection-title" className="collection-hero__title">
            {collection.name}
          </h1>
        </section>

        <p className="collection-desc">{collection.description}</p>

        {products.length > 0 ? (
          <section className="section-gap mb-[100px]" aria-labelledby="pieces-title">
            <h2 id="pieces-title" className="sr-only">Pieces</h2>
            <div className="gallery-grid">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          </section>
        ) : (
          <section className="section-gap mb-[100px] text-center px-[4vw]">
            <p className="uppercase text-text-muted" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
              Pieces available by appointment.
            </p>
            <Link href="/appointment" className="inline-block mt-6 uppercase" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
              BOOK A VIEWING
            </Link>
          </section>
        )}

        <section className="section-gap mb-[100px] px-[4.6875vw] max-md:px-[4.05vw]">
          <Link href="/collections" className="uppercase text-text-muted hover:text-text-primary transition-colors" style={{ fontSize: '10px', letterSpacing: '0.13em' }}>
            ← ALL COLLECTIONS
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
