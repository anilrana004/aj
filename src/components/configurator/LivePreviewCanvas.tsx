'use client';

import { SelectedPart } from '@/types/configuration';

interface LivePreviewCanvasProps {
  selectedParts: SelectedPart[];
  className?: string;
}

export function LivePreviewCanvas({ selectedParts, className }: LivePreviewCanvasProps) {
  const cutoutImages = selectedParts
    .map((sp) => ({
      slotType: sp.part.slotType,
      image: sp.part.images.find((img) => img.type === 'builder-cutout'),
    }))
    .filter((item) => item.image);

  if (cutoutImages.length === 0) {
    return (
      <div className={`aspect-square bg-bg-secondary rounded-sm flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="mx-auto mb-4 text-accent-oxidized-bronze">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <p className="font-ui text-body text-text-primary/40">
            Your design will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-square bg-bg-secondary rounded-sm overflow-hidden ${className}`}>
      {cutoutImages.map((item, index) => (
        <div
          key={item.slotType}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: index }}
        >
          <img
            src={item.image!.url}
            alt={item.image!.alt}
            className="max-w-[80%] max-h-[80%] object-contain"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-out ${index * 0.15}s forwards`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
