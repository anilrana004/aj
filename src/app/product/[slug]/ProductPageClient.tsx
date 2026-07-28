'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Collection } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice, cn } from '@/lib/utils';
import { img as siteImg } from '@/lib/images';
import { products } from '@/lib/data';
import { useCart } from '@/hooks/useCart';

interface ProductPageClientProps {
  product: Product;
  collection: Collection | null;
}

export function ProductPageClient({ product, collection }: ProductPageClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const related = products
    .filter((p) => p.id !== product.id && (p.collectionId === product.collectionId || p.isFeatured))
    .slice(0, 4);

  const toggle = (id: string) => setOpenAccordion((prev) => (prev === id ? null : id));

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      productType: collection?.name || 'Jewelry',
      partsSummary: [product.metal, ...product.stones].filter(Boolean),
      storyNarrative: product.description,
      previewImageUrl: product.images[0]?.url || siteImg.genericPlaceholder,
      totalPrice: product.price,
      currency: product.currency,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="site-main">
        <section className="pdp" aria-labelledby="product-title">
          <div className="pdp__gallery">
            <div className="pdp__main-image">
              <Image
                src={product.images[selectedImageIndex]?.url || siteImg.genericPlaceholder}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="pdp__thumbs" role="listbox" aria-label="Product images">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    role="option"
                    aria-selected={index === selectedImageIndex}
                    aria-label={`View image ${index + 1}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn('pdp__thumb', index === selectedImageIndex && 'is-active')}
                  >
                    <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="72px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp__info">
            {collection && (
              <Link href={`/collections/${collection.slug}`} className="pdp__collection">
                {collection.name}
              </Link>
            )}
            <h1 id="product-title" className="pdp__title">{product.name}</h1>
            <p className="pdp__price">{formatPrice(product.price, product.currency)}</p>
            <p className="pdp__desc">{product.description}</p>

            <div className="pdp__actions">
              <button
                type="button"
                className="pdp__atc"
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
              >
                {!product.isAvailable ? 'SOLD OUT' : added ? 'ADDED' : 'ADD TO CART'}
              </button>
              <Link href="/appointment" className="pdp__secondary">
                BOOK A VIEWING
              </Link>
            </div>

            {(() => {
              const hay = `${product.name} ${product.slug} ${collection?.name || ''}`.toLowerCase();
              const href = /earring|stud|hoop/.test(hay)
                ? '/design-your-own/earring'
                : /ring|band/.test(hay)
                  ? '/design-your-own/ring'
                  : /bracelet|cuff|bangle/.test(hay)
                    ? '/design-your-own/bracelet'
                    : /anklet|payal/.test(hay)
                      ? '/design-your-own/anklet'
                      : /mala|prayer/.test(hay)
                        ? '/design-your-own/mala'
                        : '/design-your-own/necklace';
              return (
                <p className="mt-5">
                  <Link
                    href={href}
                    className="font-ui text-caption uppercase tracking-[0.13em] text-text-muted underline underline-offset-4 hover:text-text-primary"
                  >
                    Prefer to build this yourself?
                  </Link>
                </p>
              );
            })()}

            <div className="pdp__accordions">
              <div className="pdp__acc">
                <button type="button" className="pdp__acc-btn" aria-expanded={openAccordion === 'specs'} onClick={() => toggle('specs')}>
                  <span>DETAILS</span>
                  <span aria-hidden>{openAccordion === 'specs' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'specs' && (
                  <dl className="pdp__acc-body">
                    <div><dt>Metal</dt><dd>{product.metal}</dd></div>
                    {product.stones.length > 0 && <div><dt>Stones</dt><dd>{product.stones.join(', ')}</dd></div>}
                    <div><dt>Weight</dt><dd>{product.weight}</dd></div>
                    <div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div>
                  </dl>
                )}
              </div>

              {product.makingOf && (
                <div className="pdp__acc">
                  <button type="button" className="pdp__acc-btn" aria-expanded={openAccordion === 'making'} onClick={() => toggle('making')}>
                    <span>THE MAKING OF</span>
                    <span aria-hidden>{openAccordion === 'making' ? '−' : '+'}</span>
                  </button>
                  {openAccordion === 'making' && (
                    <div className="pdp__acc-body">
                      <p>{product.makingOf.description}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="pdp__acc">
                <button type="button" className="pdp__acc-btn" aria-expanded={openAccordion === 'care'} onClick={() => toggle('care')}>
                  <span>CARE</span>
                  <span aria-hidden>{openAccordion === 'care' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'care' && (
                  <div className="pdp__acc-body">
                    <p>Store flat in the pouch provided. Avoid perfume and harsh chemicals. Wipe gently with a soft cloth after wear.</p>
                    <Link href="/care-guide" className="pdp__link">CARE GUIDE</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-gap mb-[100px]" aria-labelledby="related-title">
            <div className="section-label" id="related-title">YOU MAY ALSO LIKE</div>
            <div className="pdp__related">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
