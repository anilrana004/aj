'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ProductSlot, ConfiguratorPart } from '@/types/part';
import { ProductType } from '@/types/configuration';
import { cn } from '@/lib/utils';
import { PartCard } from './PartCard';
import { YourPiecePanel } from './YourPiecePanel';
import { LivePreviewCanvas } from './LivePreviewCanvas';
import { useConfigurator } from './useConfigurator';
import { useCart } from '@/hooks/useCart';
import { getPreviewUrl } from '@/lib/compositing/layerImages';

interface ConfiguratorShellProps {
  productType: ProductType;
  slots: ProductSlot[];
  parts: ConfiguratorPart[];
}

export function ConfiguratorShell({ productType, slots, parts }: ConfiguratorShellProps) {
  const config = useConfigurator(slots, productType);
  const { addItem } = useCart();
  const [panelOpen, setPanelOpen] = useState(false);
  const [storyPartId, setStoryPartId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const addedFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (addedFeedbackTimer.current) clearTimeout(addedFeedbackTimer.current);
    },
    []
  );

  const partsForCurrentSlot = useMemo(() => {
    if (!config.currentSlot) return [];
    return parts
      .filter((p) => p.slotType === config.currentSlot.slotType)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [config.currentSlot, parts]);

  const storyPart = storyPartId ? parts.find((p) => p.id === storyPartId) : null;
  const isLastStep = config.currentStep >= slots.length - 1;
  const pairNote = productType === 'earring' ? ' · priced as a pair' : '';
  const canAdd = config.validation.isValid;

  const missingHint = useMemo(() => {
    if (canAdd) return null;
    if (config.validation.missingRingSize) return 'Ring size required';
    if (config.validation.missingSlots.length > 0) {
      return `Missing: ${config.validation.missingSlots.join(', ')}`;
    }
    return 'Complete required steps';
  }, [canAdd, config.validation.missingRingSize, config.validation.missingSlots]);

  const goToFirstMissing = () => {
    const missing = config.validation.missingSlots;
    if (config.validation.missingRingSize) {
      const sizeIdx = slots.findIndex((s) => s.slotType === 'size');
      if (sizeIdx >= 0) {
        config.goToStep(sizeIdx);
        setPanelOpen(false);
        return;
      }
    }
    if (missing.length > 0) {
      const idx = slots.findIndex((s) => s.slotType === missing[0]);
      if (idx >= 0) {
        config.goToStep(idx);
        setPanelOpen(false);
        return;
      }
    }
    if (!isLastStep) config.nextStep();
  };

  const handleAddToCart = async () => {
    setAddError(null);
    if (!config.validation.isValid) {
      setAddError(
        config.validation.missingRingSize
          ? 'Select a ring size before adding to cart.'
          : 'Complete all required steps first.'
      );
      setPanelOpen(true);
      return;
    }

    setAdding(true);
    try {
      const partIds = config.selectedParts.map((sp) => sp.part.id);
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType,
          partIds,
          personalization: config.personalization,
          claimedTotal: config.pricing.totalPrice,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error || 'Could not verify price.');
        setPanelOpen(true);
        return;
      }

      const preview =
        getPreviewUrl(config.selectedParts.map((sp) => sp.part)) ||
        config.selectedParts[0]?.part.images[0]?.url ||
        '';

      addItem({
        id: `bespoke-${productType}-${partIds.slice().sort().join('-')}`,
        name: `Bespoke ${productType.charAt(0).toUpperCase()}${productType.slice(1)}`,
        productType: `bespoke-${productType}`,
        partsSummary: config.selectedParts.map((sp) => sp.part.name),
        storyNarrative: config.storyNarrative,
        previewImageUrl: preview,
        totalPrice: data.totalPrice,
        currency: 'INR',
        partIds,
        verifiedTotal: data.totalPrice,
        pairMultiplier: data.pairMultiplier ?? 1,
        ringSize: config.personalization.ringSize,
      });
      setAdded(true);
      // Standard storefront behavior: collapse the expanded mobile summary
      // after a successful add while keeping a brief confirmation in the bar.
      setPanelOpen(false);
      if (addedFeedbackTimer.current) clearTimeout(addedFeedbackTimer.current);
      addedFeedbackTimer.current = setTimeout(() => {
        setAdded(false);
        addedFeedbackTimer.current = null;
      }, 3000);
    } catch {
      setAddError('Network error verifying price. Try again.');
      setPanelOpen(true);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-[1440px] mx-auto px-[4.6875vw] py-6">
        <nav className="mb-6" aria-label="Configurator progress">
          <div className="flex items-center gap-2 mb-4">
            {slots.map((slot, index) => {
              const isSelected = config.selectedParts.some(
                (sp) => sp.part.slotType === slot.slotType
              );
              const isCurrent = index === config.currentStep;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => config.goToStep(index)}
                  className={cn(
                    'h-1.5 flex-1 transition-all duration-300',
                    isCurrent
                      ? 'bg-accent-gold'
                      : isSelected
                        ? 'bg-accent-gold/40'
                        : 'bg-warm-stone'
                  )}
                  aria-label={`${slot.label}${isSelected ? ' (selected)' : ''}`}
                  aria-current={isCurrent ? 'step' : undefined}
                />
              );
            })}
          </div>
          <div className="flex justify-between font-ui text-caption uppercase tracking-[0.13em]">
            <span className="text-text-muted">
              Step {config.currentStep + 1} of {slots.length}
            </span>
            <span className="text-accent-gold">{slots[config.currentStep]?.label}</span>
          </div>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-[4.6875vw]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Live assembly — primary visual */}
          <div className="lg:col-span-5 order-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <LivePreviewCanvas
                selectedParts={config.selectedParts}
                productType={productType}
              />
              <p className="font-ui text-micro uppercase tracking-[0.13em] text-text-muted text-center lg:text-left">
                Live assembly{pairNote}
              </p>

              <div className="hidden lg:block">
                <YourPiecePanel
                  selectedParts={config.selectedParts}
                  pricing={config.pricing}
                  storyNarrative={config.storyNarrative}
                  isOpen={false}
                  onToggle={() => {}}
                  onRemovePart={config.removePart}
                  productType={productType}
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-7 order-2 pb-44 lg:pb-16">
            {config.currentSlot && (
              <div className="mb-8">
                <h2 className="font-display text-h1 mb-3 uppercase tracking-[0.08em]">
                  {config.currentSlot.label}
                </h2>
                <p className="font-ui text-body text-text-muted leading-relaxed max-w-[520px]">
                  {config.currentSlot.description}
                </p>
                {config.currentSlot.slotType === 'size' && (
                  <p className="mt-3 font-ui text-caption text-text-primary uppercase tracking-[0.13em]">
                    Fit only — does not change price
                  </p>
                )}
                {productType === 'earring' && (
                  <p className="mt-3 font-ui text-caption text-text-primary uppercase tracking-[0.13em]">
                    Sold as a pair — pair price shown on each part and in the total
                  </p>
                )}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              {partsForCurrentSlot.map((part) => {
                const isSelected = config.selectedParts.some((sp) => sp.part.id === part.id);
                return (
                  <div key={part.id} className="relative">
                    <PartCard
                      part={part}
                      isSelected={isSelected}
                      onSelect={config.selectPart}
                      showStory={false}
                      pairMultiplier={config.pricing.pairMultiplier}
                    />
                    <button
                      type="button"
                      className="mt-2 font-ui text-micro uppercase tracking-[0.13em] text-text-muted underline underline-offset-2 hover:text-accent-gold"
                      onClick={() =>
                        setStoryPartId((id) => (id === part.id ? null : part.id))
                      }
                    >
                      {storyPartId === part.id ? 'Hide story' : 'Origin story'}
                    </button>
                    {storyPartId === part.id && storyPart && (
                      <div className="mt-3 p-4 border border-border bg-bg-secondary">
                        <p className="font-display italic text-body text-text-primary mb-2">
                          “{storyPart.story.headline}”
                        </p>
                        <p className="font-ui text-small text-text-muted leading-relaxed">
                          {storyPart.story.narrative}
                        </p>
                        <p className="mt-3 font-ui text-micro uppercase tracking-[0.13em] text-text-muted">
                          {storyPart.story.originRegion} · {storyPart.story.craftTime}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-12 gap-4 flex-wrap">
              <button
                type="button"
                onClick={config.prevStep}
                disabled={config.currentStep === 0}
                className={cn(
                  'font-ui text-caption uppercase tracking-[0.13em] underline underline-offset-4',
                  config.currentStep === 0 && 'opacity-30 pointer-events-none'
                )}
              >
                Back
              </button>

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={config.nextStep}
                  className="btn-primary text-text-inverse"
                >
                  Continue
                </button>
              ) : (
                <div className="hidden lg:flex flex-col items-end gap-2">
                  {addError && (
                    <p className="font-ui text-caption text-red-700">{addError}</p>
                  )}
                  <div className="flex gap-3 flex-wrap justify-end">
                    <a href="/appointment" className="btn-ghost text-text-primary">
                      Book a Consultation
                    </a>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={adding || added || !canAdd}
                      aria-live="polite"
                      className="btn-primary text-text-inverse disabled:opacity-40"
                    >
                      {adding
                        ? 'Verifying…'
                        : added
                          ? 'Added to cart'
                          : `Add to cart · ₹${config.pricing.totalPrice.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                  {!canAdd && (
                    <p className="font-ui text-micro text-text-muted uppercase tracking-[0.13em]">
                      {missingHint}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <YourPiecePanel
          selectedParts={config.selectedParts}
          pricing={config.pricing}
          storyNarrative={config.storyNarrative}
          isOpen={panelOpen}
          onToggle={() => setPanelOpen(!panelOpen)}
          onRemovePart={config.removePart}
          productType={productType}
          onAddToCart={handleAddToCart}
          adding={adding}
          added={added}
          canAdd={canAdd}
          addError={addError}
          onGoToMissing={goToFirstMissing}
          missingHint={missingHint}
        />
      </div>
    </div>
  );
}
