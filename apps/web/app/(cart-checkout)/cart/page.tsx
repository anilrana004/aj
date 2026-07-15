'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isBespoke: boolean;
  bespokeConfig?: {
    parts: Array<{ partName: string; partTypeName: string; price: number; quantity: number }>;
  };
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBespoke, setExpandedBespoke] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeItem(itemId);
    try {
      await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      });
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleBespoke = (id: string) => {
    setExpandedBespoke((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone/30 border-t-terracotta animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine mb-10">Shopping Bag</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-subhead text-aubergine/40 mb-4">Your bag is empty</p>
            <p className="text-body text-bronze/60 mb-8">
              Explore our collections or design a bespoke piece.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/collections">
                <Button variant="outline">Browse Collections</Button>
              </Link>
              <Link href="/build/necklace">
                <Button>Design Bespoke</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 pb-6 border-b border-stone/20"
                  >
                    {/* Image */}
                    <div className="w-24 h-32 bg-stone/20 shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-sand/50 to-stone/60" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          {item.isBespoke && (
                            <span className="text-label uppercase tracking-widest text-saffron text-[10px]">
                              Bespoke
                            </span>
                          )}
                          <h3 className="font-serif text-body-lg text-aubergine">{item.name}</h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-bronze/40 hover:text-rust transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-body text-aubergine mt-2">{formatPrice(item.price)}</p>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-stone/30 flex items-center justify-center hover:border-aubergine/30 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-body w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-stone/30 flex items-center justify-center hover:border-aubergine/30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Bespoke breakdown toggle */}
                      {item.isBespoke && item.bespokeConfig && (
                        <button
                          onClick={() => toggleBespoke(item.id)}
                          className="flex items-center gap-1 mt-3 text-caption text-terracotta hover:text-bronze transition-colors"
                        >
                          {expandedBespoke.has(item.id) ? (
                            <ChevronUp size={12} />
                          ) : (
                            <ChevronDown size={12} />
                          )}
                          View part breakdown
                        </button>
                      )}

                      {/* Bespoke breakdown */}
                      <AnimatePresence>
                        {expandedBespoke.has(item.id) && item.bespokeConfig && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pl-3 border-l border-stone/20 space-y-1">
                              {item.bespokeConfig.parts.map((p, i) => (
                                <div key={i} className="flex justify-between text-caption text-bronze/60">
                                  <span>{p.partTypeName}: {p.partName}</span>
                                  <span>{formatPrice(p.price * p.quantity)}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="mt-10 pt-6 border-t border-stone/20">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-label uppercase tracking-widest text-bronze/60">Subtotal</span>
                <span className="text-body text-aubergine font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-caption text-bronze/40 mb-6">
                Shipping and taxes calculated at checkout
              </p>
              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Continue to Checkout
                </Button>
              </Link>
              <Link
                href="/collections"
                className="block text-center mt-4 text-label uppercase tracking-widest text-bronze hover:text-terracotta transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-center text-caption text-bronze/40">
              Secure checkout · Free shipping · 14-day returns on unworn items
            </p>
          </>
        )}
      </div>
    </section>
  );
}
