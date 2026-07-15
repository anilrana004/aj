'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatPrice, getLeadTimeLabel } from '@/lib/utils';
import PartSelector from '@/components/builder/PartSelector';
import LivePreviewCanvas from '@/components/builder/LivePreviewCanvas';
import PriceBreakdown from '@/components/builder/PriceBreakdown';
import PartStoryPanel from '@/components/builder/PartStoryPanel';
import Button from '@/components/ui/Button';

export interface PartOption {
  id: string;
  name: string;
  slug: string;
  price: number;
  story: string;
  origin?: string;
  material?: string;
  images: string[];
  isAvailable: boolean;
  leadTimeDays: number;
  partTypeSlug: string;
}

export interface PartTypeStep {
  id: string;
  slug: string;
  name: string;
  isRequired: boolean;
  sortOrder: number;
  allowMultiple: boolean;
  parts: PartOption[];
}

export interface BuilderSelection {
  partTypeId: string;
  partTypeSlug: string;
  partId: string;
  partName: string;
  price: number;
  quantity: number;
  leadTimeDays: number;
  image?: string;
}

interface BespokeBuilderProps {
  categorySlug: string;
  categoryName: string;
  partTypes: PartTypeStep[];
}

export default function BespokeBuilder({
  categorySlug,
  categoryName,
  partTypes,
}: BespokeBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<BuilderSelection[]>([]);
  const [storyPart, setStoryPart] = useState<PartOption | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileStepMode, setMobileStepMode] = useState(true);

  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSelectPart = useCallback(
    (partType: PartTypeStep, part: PartOption) => {
      setSelections((prev) => {
        const existing = prev.find((s) => s.partTypeId === partType.id);
        if (existing) {
          return prev.map((s) =>
            s.partTypeId === partType.id
              ? {
                  ...s,
                  partId: part.id,
                  partName: part.name,
                  price: part.price,
                  leadTimeDays: part.leadTimeDays,
                  image: part.images[0],
                }
              : s
          );
        }
        return [
          ...prev,
          {
            partTypeId: partType.id,
            partTypeSlug: partType.slug,
            partId: part.id,
            partName: part.name,
            price: part.price,
            quantity: 1,
            leadTimeDays: part.leadTimeDays,
            image: part.images[0],
          },
        ];
      });
    },
    []
  );

  const total = selections.reduce((sum, s) => sum + s.price * s.quantity, 0);
  const maxLeadTime = selections.length > 0 ? Math.max(...selections.map((s) => s.leadTimeDays)) : 0;
  const requiredPartsFilled = partTypes
    .filter((pt) => pt.isRequired)
    .every((pt) => selections.some((s) => s.partTypeId === pt.id));

  const handleAddToCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bespoke',
          categorySlug,
          parts: selections,
          totalPrice: total,
        }),
      });
      if (res.ok) {
        window.location.href = '/cart';
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleSaveDesign = async () => {
    try {
      const res = await fetch('/api/builder/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categorySlug,
          parts: selections.map((s) => ({
            partTypeId: s.partTypeId,
            partId: s.partId,
            quantity: s.quantity,
          })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        // Save the design with the server-computed price
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'save-design',
            categorySlug,
            parts: selections,
            totalPrice: data.total,
          }),
        });
      }
    } catch (err) {
      console.error('Failed to save design:', err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr,440px] min-h-[calc(100vh-var(--header-height))]">
        {/* Left: Live Preview */}
        <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))]">
          <LivePreviewCanvas
            categorySlug={categorySlug}
            selections={selections}
          />
        </div>

        {/* Right: Part Selector Panel */}
        <div className="border-l border-stone/20 overflow-y-auto h-[calc(100vh-var(--header-height))] sticky top-[var(--header-height)]">
          <div className="p-8">
            <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">
              {categoryName}
            </p>
            <h1 className="font-serif text-headline text-aubergine mb-8">
              Design Your {categoryName.slice(0, -1)}
            </h1>

            {/* Step Indicators */}
            <div className="flex gap-2 mb-8">
              {partTypes.map((pt, i) => {
                const filled = selections.some((s) => s.partTypeId === pt.id);
                return (
                  <button
                    key={pt.id}
                    onClick={() => setCurrentStep(i)}
                    className={cn(
                      'flex-1 h-1 transition-all duration-300',
                      i === currentStep
                        ? 'bg-terracotta'
                        : filled
                        ? 'bg-gold-flat'
                        : 'bg-stone/30'
                    )}
                    aria-label={`Go to step: ${pt.name}`}
                  />
                );
              })}
            </div>

            {/* Part Selector */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <PartSelector
                  partType={partTypes[currentStep]}
                  selectedPartId={selections.find((s) => s.partTypeId === partTypes[currentStep]?.id)?.partId}
                  onSelect={(part) => handleSelectPart(partTypes[currentStep], part)}
                  onStoryOpen={setStoryPart}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  ← Back
                </Button>
              )}
              {currentStep < partTypes.length - 1 && (
                <Button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  variant="outline"
                >
                  Next Step →
                </Button>
              )}
            </div>

            {/* Price Breakdown */}
            <PriceBreakdown
              selections={selections}
              total={total}
              maxLeadTime={maxLeadTime}
            />

            {/* CTAs */}
            {requiredPartsFilled && (
              <div className="mt-8 space-y-3">
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                  Add to Cart — {formatPrice(total)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleSaveDesign}
                >
                  Save Design
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Full-width Preview */}
        <div className="h-[50vh] sticky top-[var(--mobile-header-height)] z-10">
          <LivePreviewCanvas
            categorySlug={categorySlug}
            selections={selections}
            mobile
          />
        </div>

        {/* Step-based Selector */}
        <div className="relative z-20 bg-cream">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 py-4 border-b border-stone/20">
            {partTypes.map((pt, i) => {
              const filled = selections.some((s) => s.partTypeId === pt.id);
              return (
                <button
                  key={pt.id}
                  onClick={() => setCurrentStep(i)}
                  className={cn(
                    'w-2 h-2 transition-all duration-300',
                    i === currentStep
                      ? 'bg-terracotta w-6'
                      : filled
                      ? 'bg-gold-flat'
                      : 'bg-stone/30'
                  )}
                  aria-label={`Step ${i + 1}: ${pt.name}`}
                />
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-6"
            >
              <PartSelector
                partType={partTypes[currentStep]}
                selectedPartId={selections.find((s) => s.partTypeId === partTypes[currentStep]?.id)?.partId}
                onSelect={(part) => handleSelectPart(partTypes[currentStep], part)}
                onStoryOpen={setStoryPart}
                mobile
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 px-6 pb-6">
            {currentStep > 0 && (
              <Button variant="ghost" onClick={() => setCurrentStep((prev) => prev - 1)}>
                ← Back
              </Button>
            )}
            {currentStep < partTypes.length - 1 && (
              <Button onClick={() => setCurrentStep((prev) => prev + 1)} variant="outline" className="flex-1">
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="sticky bottom-0 z-30 bg-cream border-t border-stone/20 px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-body text-aubergine font-medium">
              Total: {formatPrice(total)}
            </span>
            {maxLeadTime > 0 && (
              <span className="text-caption text-bronze/60">
                {getLeadTimeLabel(maxLeadTime)}
              </span>
            )}
          </div>
          {requiredPartsFilled && (
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      {/* Story Panel (Bottom Sheet on Mobile, Inline on Desktop) */}
      <PartStoryPanel
        part={storyPart}
        onClose={() => setStoryPart(null)}
        mobile={isMobileView}
      />
    </div>
  );
}
