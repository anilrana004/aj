'use client';

import { cn } from '@/lib/utils';
import { ConfiguratorPart } from '@/types/part';

interface PartCardProps {
  part: ConfiguratorPart;
  isSelected: boolean;
  onSelect: (part: ConfiguratorPart) => void;
  showStory?: boolean;
  /** When > 1 (earrings), show unit + pair price */
  pairMultiplier?: number;
}

export function PartCard({
  part,
  isSelected,
  onSelect,
  showStory = true,
  pairMultiplier = 1,
}: PartCardProps) {
  const cutoutImage = part.images.find((img) => img.type === 'builder-cutout');
  const editorialImage = part.images.find((img) => img.type === 'editorial');

  return (
    <button
      onClick={() => onSelect(part)}
      className={cn(
        'group relative text-left rounded-sm transition-all duration-300 border-2 overflow-hidden',
        isSelected
          ? 'border-accent-gold shadow-lg shadow-accent-gold/10'
          : 'border-transparent hover:border-accent-gold/30'
      )}
      aria-pressed={isSelected}
      aria-label={`Select ${part.name} — ${part.material.replace(/-/g, ' ')}`}
    >
      <div className="aspect-square relative overflow-hidden bg-bg-secondary">
        {cutoutImage ? (
          <img
            src={cutoutImage.url}
            alt={cutoutImage.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-oxidized-bronze">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {isSelected && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-accent-gold flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ivory-text)" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
        {part.inStockQuantity === 0 && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-bg-dark/80 text-text-inverse font-ui text-caption">
            Made to order
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-h3 leading-tight">{part.name}</h3>
          <span className="font-ui text-caption text-accent-gold shrink-0 text-right">
            {part.isFitOnly || part.price === 0 ? (
              'Included'
            ) : pairMultiplier > 1 ? (
              <>
                <span className="block">₹{(part.price * pairMultiplier).toLocaleString('en-IN')} pair</span>
                <span className="block text-micro text-text-muted normal-case tracking-normal">
                  ₹{part.price.toLocaleString('en-IN')} each
                </span>
              </>
            ) : (
              `₹${part.price.toLocaleString('en-IN')}`
            )}
          </span>
        </div>

        <p className="font-ui text-caption mb-3 text-text-primary/50">
          {part.material.replace(/-/g, ' ')} · {part.story.craftTime}
        </p>

        {showStory && (
          <div className="border-t divider-ink pt-3 mt-3">
            <p className="font-display italic text-body text-text-primary/70">
              &ldquo;{part.story.headline}&rdquo;
            </p>
            <p className="font-ui text-caption mt-2 text-text-primary/50">
              {part.story.originRegion}
            </p>
          </div>
        )}
      </div>
    </button>
  );
}
