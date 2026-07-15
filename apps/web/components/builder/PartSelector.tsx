'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import type { PartTypeStep, PartOption } from './BespokeBuilder';

interface PartSelectorProps {
  partType: PartTypeStep;
  selectedPartId?: string;
  onSelect: (part: PartOption) => void;
  onStoryOpen: (part: PartOption) => void;
  mobile?: boolean;
}

export default function PartSelector({
  partType,
  selectedPartId,
  onSelect,
  onStoryOpen,
  mobile = false,
}: PartSelectorProps) {
  if (!partType) return null;

  return (
    <div>
      <div className="mb-4">
        <p className="text-caption text-bronze/50 mb-1">
          Step {partType.sortOrder} of {mobile ? '' : ''}
        </p>
        <h2 className="font-serif text-subhead text-aubergine">{partType.name}</h2>
        {partType.isRequired && (
          <p className="text-caption text-bronze/40 mt-1">Required</p>
        )}
      </div>

      {/* Horizontally scrollable Part cards */}
      <div className={cn(
        'flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory',
        mobile ? '-mx-6 px-6' : ''
      )}>
        {partType.parts.map((part) => (
          <button
            key={part.id}
            onClick={() => onSelect(part)}
            className={cn(
              'shrink-0 snap-start text-left transition-all duration-300',
              mobile ? 'w-[260px]' : 'w-[220px]',
              selectedPartId === part.id
                ? 'ring-2 ring-terracotta'
                : 'ring-1 ring-stone/20 hover:ring-stone/40',
              !part.isAvailable && 'opacity-50'
            )}
          >
            {/* Part Image */}
            <div className={cn(
              'bg-stone/20 relative overflow-hidden',
              mobile ? 'aspect-[4/3]' : 'aspect-[3/2]'
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-sand/50 to-stone/60" />
              {selectedPartId === part.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-terracotta flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>

            {/* Part Info */}
            <div className="p-3">
              <h3 className="font-serif text-body text-aubergine line-clamp-2">{part.name}</h3>
              {part.origin && (
                <p className="text-caption text-bronze/50 mt-1">{part.origin}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-body text-aubergine font-medium">
                  {formatPrice(part.price)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStoryOpen(part);
                  }}
                  className="flex items-center gap-1 text-caption text-terracotta hover:text-bronze transition-colors"
                  aria-label={`Read the story of ${part.name}`}
                >
                  <BookOpen size={12} />
                  <span>Story</span>
                </button>
              </div>
              {!part.isAvailable && (
                <p className="text-caption text-rust mt-1">Currently unavailable</p>
              )}
              {part.leadTimeDays > 0 && (
                <p className="text-caption text-bronze/40 mt-1">
                  {part.leadTimeDays} day lead time
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
