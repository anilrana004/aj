'use client';

import { useState, useCallback, useEffect } from 'react';

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
}

const CART_KEY = 'apriliha-cart';

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setIsLoaded(true);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity' | 'addedAt'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...item, quantity: 1, addedAt: new Date().toISOString() }];
      writeCart(updated);
      return updated;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      writeCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
      writeCart(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
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
