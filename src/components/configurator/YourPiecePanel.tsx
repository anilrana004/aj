'use client';

import { SelectedPart } from '@/types/configuration';
import { PriceBreakdown } from './PriceBreakdown';
import { PricingResponse } from '@/types/configuration';
import { SlotType } from '@/types/part';
import { cn } from '@/lib/utils';

interface YourPiecePanelProps {
  selectedParts: SelectedPart[];
  pricing: PricingResponse;
  storyNarrative: string;
  isOpen: boolean;
  onToggle: () => void;
  onRemovePart: (slotType: SlotType, partId?: string) => void;
}

export function YourPiecePanel({
  selectedParts,
  pricing,
  storyNarrative,
  isOpen,
  onToggle,
  onRemovePart,
}: YourPiecePanelProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  const previewImages = selectedParts
    .map((sp) => sp.part.images.find((img) => img.type === 'builder-cutout'))
    .filter(Boolean);

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={onToggle}
          className="w-full bg-bg-dark text-text-inverse px-6 py-4 flex items-center justify-between"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {previewImages.slice(0, 4).map((img, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-dark overflow-hidden bg-bg-secondary">
                  {img && <img src={img.url} alt="" className="w-full h-full object-cover" />}
                </div>
              ))}
            </div>
            <span className="font-ui text-caption">{selectedParts.length} parts selected</span>
          </div>
          <span className="font-display text-h3 text-accent-gold">
            {formatPrice(pricing.totalPrice)}
          </span>
        </button>

        {isOpen && (
          <div className="bg-bg-dark text-text-inverse border-t divider-gold max-h-[60vh] overflow-y-auto p-6">
            <SelectedPartsList selectedParts={selectedParts} onRemove={onRemovePart} />
            {storyNarrative && (
              <p className="font-display italic text-body mt-6 border-t divider-ink pt-6 text-text-primary/70">
                &ldquo;{storyNarrative}&rdquo;
              </p>
            )}
          </div>
        )}
      </div>

      <div className="hidden lg:block sticky top-24">
        <div className="border border-border rounded-sm p-6 space-y-6">
          <h3 className="font-display text-h3">Your Piece</h3>

          {previewImages.length > 0 && (
            <div className="relative aspect-square bg-bg-secondary rounded-sm overflow-hidden">
              {previewImages.length === 1 ? (
                <img src={previewImages[0]!.url} alt="Your design preview" className="w-full h-full object-contain p-8" />
              ) : (
                <div className="grid grid-cols-2 gap-1 p-4">
                  {previewImages.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-[1px]">
                      {img && <img src={img.url} alt="" className="w-full h-full object-cover" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <SelectedPartsList selectedParts={selectedParts} onRemove={onRemovePart} />

          {storyNarrative && (
            <p className="font-display italic text-body border-t divider-ink pt-4 text-text-primary/70">
              &ldquo;{storyNarrative}&rdquo;
            </p>
          )}

          <div className="border-t divider-ink pt-4">
            <PriceBreakdown
              breakdown={pricing.breakdown}
              basePrice={pricing.basePrice}
              modifiersTotal={pricing.modifiersTotal}
              personalizationTotal={pricing.personalizationTotal}
              totalPrice={pricing.totalPrice}
              warnings={pricing.warnings}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SelectedPartsList({
  selectedParts,
  onRemove,
}: {
  selectedParts: SelectedPart[];
  onRemove: (slotType: SlotType, partId?: string) => void;
}) {
  if (selectedParts.length === 0) {
    return (
      <p className="font-ui text-body text-center py-8 text-text-primary/40">
        Select parts to build your piece
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {selectedParts.map((sp) => (
        <div
          key={`${sp.part.slotType}-${sp.part.id}`}
          className="flex items-center justify-between gap-3 py-2 border-b divider-ink last:border-b-0"
        >
          <div className="min-w-0">
            <p className="font-ui text-body truncate">{sp.part.name}</p>
            <p className="font-ui text-caption text-text-primary/50">
              {sp.part.slotType} · {sp.part.material.replace(/-/g, ' ')}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-ui text-caption text-accent-gold">
              {sp.part.price === 0 ? '' : `₹${sp.part.price.toLocaleString('en-IN')}`}
            </span>
            <button
              onClick={() => onRemove(sp.part.slotType, sp.part.id)}
              className="p-1 hover:text-accent-primary transition-colors"
              aria-label={`Remove ${sp.part.name}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
