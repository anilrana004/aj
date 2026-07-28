'use client';

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
  onAddToCart?: () => void;
  adding?: boolean;
  added?: boolean;
  canAdd?: boolean;
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
}: YourPiecePanelProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button
          type="button"
          onClick={onToggle}
          className="w-full bg-bg-dark text-text-inverse px-6 py-4 flex items-center justify-between"
          aria-expanded={isOpen}
        >
          <span className="font-ui text-caption uppercase tracking-[0.13em]">
            {selectedParts.length} parts
            {productType === 'earring' ? ' · pair' : ''}
          </span>
          <span className="font-display text-h3">{formatPrice(pricing.totalPrice)}</span>
        </button>

        {isOpen && (
          <div className="bg-bg-dark text-text-inverse border-t border-white/10 max-h-[60vh] overflow-y-auto p-6">
            <SelectedPartsList
              selectedParts={selectedParts}
              onRemove={onRemovePart}
              pairMultiplier={pricing.pairMultiplier}
            />
            {storyNarrative && (
              <p className="font-display italic text-body mt-6 border-t border-white/10 pt-6 text-white/70">
                “{storyNarrative}”
              </p>
            )}
            {onAddToCart && (
              <button
                type="button"
                onClick={onAddToCart}
                disabled={adding || !canAdd}
                className="mt-6 w-full btn-primary text-text-inverse disabled:opacity-40"
              >
                {adding ? 'Verifying…' : added ? 'Added' : 'Add to cart'}
              </button>
            )}
          </div>
        )}
      </div>

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
}: {
  selectedParts: SelectedPart[];
  onRemove: (slotType: SlotType, partId?: string) => void;
  pairMultiplier?: number;
}) {
  if (selectedParts.length === 0) {
    return (
      <p className="font-ui text-body text-center py-8 text-text-muted">
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
            className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-b-0"
          >
            <div className="min-w-0">
              <p className="font-ui text-body truncate uppercase tracking-[0.06em]">{sp.part.name}</p>
              <p className="font-ui text-caption text-text-muted">
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
                className={cn('p-1 hover:opacity-60 transition-opacity')}
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
