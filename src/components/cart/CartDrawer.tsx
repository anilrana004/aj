'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

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
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-bg-dark/40 z-drawer transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed z-drawer bg-bg-primary shadow-2xl transition-transform duration-300',
          'max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[85vh] max-sm:rounded-t-sm',
          'sm:inset-y-0 sm:right-0 sm:w-[420px]',
          isOpen
            ? 'sm:translate-x-0 max-sm:translate-y-0'
            : 'sm:translate-x-full max-sm:translate-y-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full max-sm:max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-display text-h3">Your Cart ({items.length})</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-primary/40 hover:text-text-primary transition-colors duration-200"
              aria-label="Close cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-h3 mb-4">Your cart is quiet, for now.</p>
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="btn-primary inline-block"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              <div className="space-y-0">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-5 border-b border-border last:border-b-0 flex gap-4"
                  >
                    <div className="w-16 h-16 shrink-0 bg-bg-secondary rounded-sm overflow-hidden">
                      <img
                        src={item.previewImageUrl || '/images/configurator/placeholder.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-ui text-small font-medium truncate">{item.name}</h3>
                      <p className="font-ui text-micro text-text-primary/40">{item.productType}</p>
                      {item.partsSummary.length > 0 && (
                        <p className="font-ui text-micro text-text-primary/40 mt-1 truncate">
                          {item.partsSummary.join(' · ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-primary/40 hover:border-text-primary/30 transition-colors duration-200"
                          >
                            −
                          </button>
                          <span className="font-ui text-small w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-primary/40 hover:border-text-primary/30 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-ui text-small font-medium">
                          {formatPrice(item.totalPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 p-1 text-text-primary/30 hover:text-text-primary transition-colors duration-200 self-start"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-4 border-t border-border">
              <div className="flex justify-between font-ui text-small mb-4">
                <span className="text-text-primary/50">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="btn-primary w-full text-center block"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="block text-center mt-3 font-ui text-caption underline-gold"
              >
                View Cart
              </Link>
              <p className="mt-3 font-ui text-micro text-text-primary/35 text-center">
                Bespoke pieces ship in 12–18 days. Free returns within 14 days.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
