'use client';

import { cn } from '@/lib/utils';
import type { BuilderSelection } from './BespokeBuilder';

interface LivePreviewCanvasProps {
  categorySlug: string;
  selections: BuilderSelection[];
  mobile?: boolean;
}

export default function LivePreviewCanvas({
  categorySlug,
  selections,
  mobile = false,
}: LivePreviewCanvasProps) {
  const selectedImages = selections.filter((s) => s.image).map((s) => s.image);

  return (
    <div className={cn(
      'relative overflow-hidden',
      mobile ? 'h-full' : 'h-full'
    )}>
      {/* Base layer — warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone via-sand to-stone" />

      {/* Selected part images — layered */}
      {selectedImages.length > 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {selectedImages.map((img, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '70%',
                height: '70%',
                left: '15%',
                top: '15%',
                opacity: 0.3 + (i * 0.2),
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-bronze/20 to-terracotta/20" />
            </div>
          ))}
          <div className="relative z-10 text-center">
            <p className="font-serif text-subhead text-bronze/40 italic">
              {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
            </p>
            <p className="text-caption text-bronze/30 mt-2">
              {selections.length} part{selections.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-stone/40 flex items-center justify-center">
              <span className="text-stone/40 text-2xl">+</span>
            </div>
            <p className="font-serif text-body text-bronze/40">
              Select parts to see your design
            </p>
            <p className="text-caption text-bronze/25 mt-1">
              Start with a {categorySlug === 'malas' ? 'bead' : 'chain'} to begin
            </p>
          </div>
        </div>
      )}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone/20 via-transparent to-stone/10 pointer-events-none" />
    </div>
  );
}
