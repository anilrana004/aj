'use client';

import { useState, useMemo } from 'react';
import { ProductSlot, ConfiguratorPart } from '@/types/part';
import { SelectedPart, Personalization } from '@/types/configuration';
import { cn } from '@/lib/utils';
import { PartCard } from './PartCard';
import { YourPiecePanel } from './YourPiecePanel';
import { PriceBreakdown } from './PriceBreakdown';
import { useConfigurator } from './useConfigurator';

interface ConfiguratorShellProps {
  productType: 'necklace' | 'bracelet' | 'mala';
  slots: ProductSlot[];
  parts: ConfiguratorPart[];
}

export function ConfiguratorShell({ productType, slots, parts }: ConfiguratorShellProps) {
  const config = useConfigurator(slots);
  const [panelOpen, setPanelOpen] = useState(false);

  const partsForCurrentSlot = useMemo(() => {
    if (!config.currentSlot) return [];
    return parts
      .filter((p) => p.slotType === config.currentSlot.slotType)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [config.currentSlot, parts]);

  const stepLabels = slots.map((s) => s.label);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-[1440px] mx-auto px-responsive py-6">
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
                  onClick={() => config.goToStep(index)}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-all duration-300',
                    isCurrent
? 'bg-accent-gold'
                       : isSelected
                       ? 'bg-accent-gold/40'
                       : 'bg-text-primary/10'
                  )}
                  aria-label={`${slot.label}${isSelected ? ' (selected)' : ''}`}
                  aria-current={isCurrent ? 'step' : undefined}
                />
              );
            })}
          </div>
          <div className="flex justify-between font-ui text-caption">
            <span className="text-text-primary/50">
              Step {config.currentStep + 1} of {slots.length}
            </span>
            <span className="text-accent-gold">
              {stepLabels[config.currentStep]}
            </span>
          </div>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-responsive">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 pb-32 lg:pb-16">
            {config.currentSlot && (
              <div className="mb-8">
                <h2 className="font-display text-h1 mb-3">{config.currentSlot.label}</h2>
                <p className="font-ui text-body text-text-primary/70">
                  {config.currentSlot.description}
                </p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              {partsForCurrentSlot.map((part) => {
                const isSelected = config.selectedParts.some(
                  (sp) => sp.part.id === part.id
                );
                return (
                  <PartCard
                    key={part.id}
                    part={part}
                    isSelected={isSelected}
                    onSelect={config.selectPart}
                  />
                );
              })}
            </div>

            {config.currentSlot?.slotType === 'length' && (
              <div className="mt-6 p-6 border border-border rounded-sm">
<p className="font-ui text-body text-text-primary/70">
                   Length adjustments are included in the base price. For custom lengths not listed here, 
                   add a note in the personalization step and our atelier team will accommodate your request.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mt-12 gap-4">
              <button
                onClick={config.prevStep}
                disabled={config.currentStep === 0}
                className={cn(
                  'font-ui text-caption underline-gold flex items-center gap-2',
                  config.currentStep === 0 && 'opacity-30 pointer-events-none'
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {config.currentStep < slots.length - 1 ? (
                <button
                  onClick={config.nextStep}
                  className="btn-primary text-text-inverse flex items-center gap-2"
                >
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <div className="flex gap-4">
                  <a
                    href="/appointment"
                    className="btn-ghost flex items-center gap-2 text-text-primary"
                  >
                    Book a Consultation
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <YourPiecePanel
              selectedParts={config.selectedParts}
              pricing={config.pricing}
              storyNarrative={config.storyNarrative}
              isOpen={false}
              onToggle={() => {}}
              onRemovePart={config.removePart}
            />
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
        />
      </div>
    </div>
  );
}
