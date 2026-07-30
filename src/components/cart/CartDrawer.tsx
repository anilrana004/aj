'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { img } from '@/lib/images';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-bg-dark/40 z-drawer transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn('cart-drawer', isOpen && 'is-open')}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full max-sm:max-h-[85vh]">
          <div className="cart-drawer__head">
            <h2 className="cart-drawer__title">CART ({items.length})</h2>
            <button
              type="button"
              onClick={onClose}
              className="l-header__icon-btn"
              aria-label="Close cart"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="cart-drawer__empty">
                <p>Your cart is empty.</p>
                <Link href="/collections" onClick={onClose}>
                  EXPLORE COLLECTIONS
                </Link>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item.id} className="py-5 border-b border-border last:border-b-0 flex gap-4">
                    <div className="w-16 h-20 shrink-0 bg-bg-secondary overflow-hidden">
                      <img
                        src={item.previewImageUrl || img.configuratorPlaceholder}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="uppercase truncate" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
                        {item.name}
                      </h3>
                      <p className="mt-1 uppercase text-text-muted" style={{ fontSize: '10px', letterSpacing: '0.13em' }}>
                        {item.productType}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-text-muted"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span style={{ fontSize: '11px' }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-text-muted"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                          {formatPrice(item.totalPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 self-start text-text-muted hover:text-text-primary"
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-border">
              <div className="flex justify-between mb-5 uppercase" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full text-center py-3.5 bg-ink text-ivory-text uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.13em' }}
              >
                CHECKOUT
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="block text-center mt-4 uppercase underline underline-offset-4 text-accent-gold"
                style={{ fontSize: '10px', letterSpacing: '0.13em' }}
              >
                VIEW CART
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
