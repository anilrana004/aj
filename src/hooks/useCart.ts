'use client';

import { useState, useCallback, useEffect, useSyncExternalStore } from 'react';

export interface CartItem {
  id: string;
  name: string;
  productType: string;
  partsSummary: string[];
  storyNarrative: string;
  previewImageUrl: string;
  totalPrice: number;
  currency: string;
  quantity: number;
  addedAt: string;
  /** Bespoke part IDs for server re-verification */
  partIds?: string[];
  verifiedTotal?: number;
  pairMultiplier?: number;
  ringSize?: string;
}

const CART_KEY = 'apriliha-cart';
const CART_EVENT = 'apriliha-cart-change';

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = [];

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return cachedItems;
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw === cachedRaw) return cachedItems;
    cachedRaw = raw;
    cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return cachedItems;
  } catch {
    cachedRaw = null;
    cachedItems = [];
    return cachedItems;
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  const raw = JSON.stringify(items);
  localStorage.setItem(CART_KEY, raw);
  cachedRaw = raw;
  cachedItems = items;
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => {
    cachedRaw = '__stale__';
    onStoreChange();
  };
  window.addEventListener(CART_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CART_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

function getSnapshot(): CartItem[] {
  return readCart();
}

function getServerSnapshot(): CartItem[] {
  return cachedItems;
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity' | 'addedAt'>) => {
    const prev = readCart();
    const existing = prev.find((i) => i.id === item.id);
    const updated = existing
      ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      : [...prev, { ...item, quantity: 1, addedAt: new Date().toISOString() }];
    writeCart(updated);
  }, []);

  const removeItem = useCallback((id: string) => {
    writeCart(readCart().filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    writeCart(readCart().map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

  return {
    items,
    isLoaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  };
}
