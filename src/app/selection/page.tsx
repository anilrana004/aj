'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/lib/data';
import { useEffect, useState } from 'react';

const SELECTION_KEY = 'apriliha-selection';

export default function SelectionPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SELECTION_KEY);
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    }
    setLoaded(true);
  }, []);

  const selected = products.filter((p) => ids.includes(p.id));

  const clear = () => {
    localStorage.setItem(SELECTION_KEY, JSON.stringify([]));
    setIds([]);
  };

  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <h1 className="page-title">Selection</h1>

        {!loaded ? null : selected.length === 0 ? (
          <div className="px-[4.6875vw] pb-[100px] text-center">
            <p className="uppercase text-text-muted mb-8" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
              Your selection is empty.
            </p>
            <Link
              href="/gallery"
              className="uppercase underline underline-offset-4 text-accent-gold"
              style={{ fontSize: '10px', letterSpacing: '0.13em' }}
            >
              BROWSE GALLERY
            </Link>
          </div>
        ) : (
          <>
            <div className="px-[4.6875vw] mb-8 flex justify-end">
              <button
                type="button"
                onClick={clear}
                className="uppercase text-text-muted hover:text-accent-gold transition-colors duration-200"
                style={{ fontSize: '10px', letterSpacing: '0.13em' }}
              >
                CLEAR ALL
              </button>
            </div>
            <div className="gallery-grid">
              {selected.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
