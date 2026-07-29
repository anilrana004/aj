'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { SelectedPart, PricingResponse, ProductType } from '@/types/configuration';
import { PriceBreakdown } from './PriceBreakdown';
import { SlotType } from '@/types/part';
import { cn } from '@/lib/utils';

interface YourPiecePanelProps {
  selectedParts: SelectedPart[];
  pricing: PricingResponse;
  storyNarrative: string;
  isOpen: boolean;
  onToggle: () => void;
  onRemovePart: (slotType: SlotType, partId?: string) => void;
  productType?: ProductType;
  onAddToCart?: () => void | Promise<void>;
  adding?: boolean;
  added?: boolean;
  canAdd?: boolean;
  addError?: string | null;
  onGoToMissing?: () => void;
  missingHint?: string | null;
}

export function YourPiecePanel({
  selectedParts,
  pricing,
  storyNarrative,
  isOpen,
  onToggle,
  onRemovePart,
  productType,
  onAddToCart,
  adding,
  added,
  canAdd,
  addError,
  onGoToMissing,
  missingHint,
}: YourPiecePanelProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);

  const handleAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!onAddToCart || adding || !canAdd) return;
    await onAddToCart();
  };

  return (
    <>
      {/* Mobile sticky action bar — primary cart path on phone */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-bg-dark text-text-inverse"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full px-5 pt-3 pb-2 flex items-center justify-between gap-3 text-left"
          aria-expanded={isOpen}
        >
          <span className="font-ui text-caption uppercase tracking-[0.13em]">
            {selectedParts.length} parts
            {productType === 'earring' ? ' · pair' : ''}
            <span className="ml-2 text-white/50 normal-case tracking-normal">
              {isOpen ? 'Hide' : 'Details'}
            </span>
          </span>
          <span className="font-display text-h3 shrink-0">{formatPrice(pricing.totalPrice)}</span>
        </button>

        {isOpen && (
          <div className="border-t border-white/10 max-h-[45vh] overflow-y-auto px-5 py-4 overscroll-contain">
            <SelectedPartsList
              selectedParts={selectedParts}
              onRemove={onRemovePart}
              pairMultiplier={pricing.pairMultiplier}
              inverse
            />
            {storyNarrative && (
              <p className="font-display italic text-body mt-4 border-t border-white/10 pt-4 text-white/70">
                “{storyNarrative}”
              </p>
            )}
          </div>
        )}

        <div className="px-5 pb-3 pt-2 space-y-2">
          {addError && (
            <p className="font-ui text-caption text-red-300" role="alert">
              {addError}
            </p>
          )}
          {!canAdd && missingHint && (
            <p className="font-ui text-micro uppercase tracking-[0.13em] text-white/55">
              {missingHint}
            </p>
          )}

          {canAdd && onAddToCart ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={adding}
                className={cn(
                  'flex-1 min-h-[48px] px-4 font-ui text-caption uppercase tracking-[0.13em]',
                  'bg-text-inverse text-bg-dark border border-text-inverse',
                  'active:opacity-80 disabled:opacity-40 touch-manipulation'
                )}
              >
                {adding
                  ? 'Verifying…'
                  : added
                    ? 'Added to cart'
                    : `Add to cart · ${formatPrice(pricing.totalPrice)}`}
              </button>
              {added && (
                <Link
                  href="/cart"
                  className="shrink-0 min-h-[48px] px-4 flex items-center justify-center font-ui text-caption uppercase tracking-[0.13em] border border-white/40 text-text-inverse"
                >
                  View
                </Link>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onGoToMissing?.();
              }}
              className="w-full min-h-[48px] px-4 font-ui text-caption uppercase tracking-[0.13em] border border-white/35 text-text-inverse active:opacity-80 touch-manipulation"
            >
              {missingHint ? 'Complete required steps' : 'Continue building'}
            </button>
          )}
        </div>
      </div>

      {/* Desktop summary — no sticky ATC (inline CTA lives in the step column) */}
      <div className="hidden lg:block">
        <div className="border border-border p-6 space-y-6">
          <h3 className="font-display text-h3 uppercase tracking-[0.1em]">Your Piece</h3>

          <SelectedPartsList
            selectedParts={selectedParts}
            onRemove={onRemovePart}
            pairMultiplier={pricing.pairMultiplier}
          />

          {storyNarrative && (
            <p className="font-display italic text-body border-t border-border pt-4 text-text-muted">
              “{storyNarrative}”
            </p>
          )}

          <div className="border-t border-border pt-4">
            <PriceBreakdown
              breakdown={pricing.breakdown}
              basePrice={pricing.basePrice}
              modifiersTotal={pricing.modifiersTotal}
              personalizationTotal={pricing.personalizationTotal}
              totalPrice={pricing.totalPrice}
              warnings={pricing.warnings}
            />
            {pricing.pairMultiplier > 1 && (
              <p className="mt-3 font-ui text-micro uppercase tracking-[0.13em] text-text-muted">
                Total includes ×{pricing.pairMultiplier} for the matched pair
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SelectedPartsList({
  selectedParts,
  onRemove,
  pairMultiplier = 1,
  inverse = false,
}: {
  selectedParts: SelectedPart[];
  onRemove: (slotType: SlotType, partId?: string) => void;
  pairMultiplier?: number;
  inverse?: boolean;
}) {
  if (selectedParts.length === 0) {
    return (
      <p
        className={cn(
          'font-ui text-body text-center py-6',
          inverse ? 'text-white/50' : 'text-text-muted'
        )}
      >
        Select parts to build your piece
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {selectedParts.map((sp) => {
        const display =
          sp.part.isFitOnly || sp.part.price === 0
            ? '—'
            : pairMultiplier > 1
              ? `₹${(sp.part.price * pairMultiplier).toLocaleString('en-IN')}`
              : `₹${sp.part.price.toLocaleString('en-IN')}`;
        return (
          <div
            key={`${sp.part.slotType}-${sp.part.id}`}
            className={cn(
              'flex items-center justify-between gap-3 py-2 border-b last:border-b-0',
              inverse ? 'border-white/10' : 'border-border'
            )}
          >
            <div className="min-w-0">
              <p className="font-ui text-body truncate uppercase tracking-[0.06em]">{sp.part.name}</p>
              <p className={cn('font-ui text-caption', inverse ? 'text-white/50' : 'text-text-muted')}>
                {sp.part.slotType.replace(/_/g, ' ')}
                {sp.part.isFitOnly ? ' · fit' : ''}
                {pairMultiplier > 1 && !sp.part.isFitOnly && sp.part.price > 0 ? ' · pair' : ''}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-ui text-caption">{display}</span>
              <button
                type="button"
                onClick={() => onRemove(sp.part.slotType, sp.part.id)}
                className="p-2 -mr-1 active:opacity-60 touch-manipulation"
                aria-label={`Remove ${sp.part.name}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
