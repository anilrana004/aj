'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

interface CartItem {
  id: string;
  name: string;
  productType: string;
  partsSummary: string[];
  storyNarrative: string;
  previewImageUrl: string;
  totalPrice: number;
  currency: string;
  quantity: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('apriliha-cart');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { setItems([]); }
    }
    setIsLoading(false);
  }, []);

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem('apriliha-cart', JSON.stringify(updated));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const updated = items.map((item) => item.id === id ? { ...item, quantity } : item);
    setItems(updated);
    localStorage.setItem('apriliha-cart', JSON.stringify(updated));
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Cart', url: 'https://aprilihasingh.com/cart' },
        ]}
      />
      <Header />
      <main id="main-content" className="pt-[60px] min-h-screen">
        <section className="py-20 px-responsive">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="font-display text-hero mb-4">Your Cart</h1>
            <p className="font-ui text-body text-text-primary/50 mb-12">
              {items.length === 0
                ? 'Your cart is empty.'
                : `${items.length} bespoke ${items.length === 1 ? 'piece' : 'pieces'}`}
            </p>

            {isLoading ? (
              <div className="text-center py-20">
                <p className="font-ui text-body text-text-primary/40">Loading...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-h2 mb-6">Begin Your Story</p>
                <p className="font-ui text-body text-text-primary/55 mb-8 max-w-md mx-auto">
                  Every piece starts with a conversation. Start designing your bespoke jewelry.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/design-your-own" className="btn-primary">Design Your Own</Link>
                  <Link href="/collections" className="font-ui text-caption underline-gold">Browse Collections</Link>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-12 gap-16">
                {/* Items */}
                <div className="lg:col-span-8">
                  <div className="space-y-0">
                    {items.map((item) => (
                      <article key={item.id} className="py-8 border-b border-border flex gap-6">
                        <div className="w-24 h-24 shrink-0 bg-bg-secondary rounded-sm overflow-hidden">
                          <img
                            src={item.previewImageUrl || '/images/configurator/placeholder.svg'}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-display text-h3 mb-1">{item.name}</h3>
                              <p className="font-ui text-micro text-text-primary/40">{item.productType}</p>
                            </div>
                            <p className="font-ui text-body font-medium whitespace-nowrap">
                              {formatPrice(item.totalPrice)}
                            </p>
                          </div>
                          {item.partsSummary.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.partsSummary.map((part, i) => (
                                <span key={i} className="font-ui text-micro px-2 py-0.5 bg-bg-secondary rounded-sm text-text-primary/60">
                                  {part}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-text-primary/40 hover:border-text-primary/30 transition-colors duration-200"
                              >
                                −
                              </button>
                              <span className="font-ui text-body w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-text-primary/40 hover:border-text-primary/30 transition-colors duration-200"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="font-ui text-caption text-text-primary/40 hover:text-text-primary underline-gold transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                  <div className="sticky top-24 p-8 border border-border rounded-sm bg-bg-secondary">
                    <h2 className="font-display text-h3 mb-6">Order Summary</h2>
                    <dl className="space-y-3 font-ui text-small">
                      <div className="flex justify-between">
                        <dt className="text-text-primary/50">Subtotal</dt>
                        <dd>{formatPrice(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-text-primary/50">Shipping</dt>
                        <dd>Calculated at checkout</dd>
                      </div>
                    </dl>
                    <div className="mt-6 pt-6 border-t border-border flex justify-between font-ui text-body font-medium">
                      <span>Estimated Total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <Link href="/checkout" className="btn-primary w-full block text-center mt-8">
                      Proceed to Checkout
                    </Link>
                    <p className="mt-4 font-ui text-micro text-text-primary/35 text-center">
                      Prices in INR. International duties calculated at checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
