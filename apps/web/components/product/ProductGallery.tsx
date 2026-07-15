'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  alts?: string[];
}

export default function ProductGallery({ images, alts = [] }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const placeholderImages = images.length > 0 ? images : ['/images/placeholder.jpg'];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      {placeholderImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] shrink-0">
          {placeholderImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                'w-16 h-20 lg:w-20 lg:h-24 shrink-0 border-2 transition-all duration-300',
                selectedIndex === i
                  ? 'border-terracotta'
                  : 'border-transparent hover:border-stone/50'
              )}
            >
              <div className="w-full h-full bg-stone/30" />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 aspect-[3/4] lg:aspect-[4/5] bg-stone/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sand/50 to-stone/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-body text-bronze/30">Product Image {selectedIndex + 1}</span>
        </div>
      </div>
    </div>
  );
}
