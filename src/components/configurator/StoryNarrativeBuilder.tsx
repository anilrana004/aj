'use client';

import { SelectedPart } from '@/types/configuration';
import { buildStoryNarrative } from '@/lib/pricing/engine';

interface StoryNarrativeBuilderProps {
  selectedParts: SelectedPart[];
}

export function StoryNarrativeBuilder({ selectedParts }: StoryNarrativeBuilderProps) {
  const narrative = buildStoryNarrative(selectedParts);

  if (!narrative) {
    return (
      <div className="text-center py-12">
        <p className="font-ui text-body text-text-primary/40">
          Select parts to see your story come together
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto text-center">
      <p className="eyebrow-gold mb-4">Your Piece Story</p>
      <p className="font-display italic text-h3 leading-relaxed">
        &ldquo;{narrative}&rdquo;
      </p>
      {selectedParts.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {selectedParts.map((sp) => (
            <span
              key={sp.part.id}
              className="font-ui text-caption px-3 py-1 bg-warm-stone text-accent-primary rounded-sm"
            >
              {sp.part.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
