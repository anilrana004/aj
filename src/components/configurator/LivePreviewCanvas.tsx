'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SelectedPart, ProductType } from '@/types/configuration';
import { SlotType } from '@/types/part';
import { ASSEMBLY_STYLES, sortPartsForAssembly } from '@/lib/compositing/assembly';
import { cn } from '@/lib/utils';

interface LivePreviewCanvasProps {
  selectedParts: SelectedPart[];
  productType: ProductType;
  className?: string;
}

interface LayerState {
  key: string;
  partId: string;
  slotType: SlotType;
  imageUrl: string;
  alt: string;
  present: boolean; // false = animating out
}

export function LivePreviewCanvas({
  selectedParts,
  productType,
  className,
}: LivePreviewCanvasProps) {
  const [layers, setLayers] = useState<LayerState[]>([]);
  const prevIds = useRef<Set<string>>(new Set());

  const ordered = useMemo(() => {
    const slots = sortPartsForAssembly(
      productType,
      selectedParts.map((sp) => sp.part.slotType)
    );
    return slots
      .map((slot) => selectedParts.find((sp) => sp.part.slotType === slot))
      .filter(Boolean) as SelectedPart[];
  }, [selectedParts, productType]);

  useEffect(() => {
    const nextIds = new Set(ordered.map((sp) => `${sp.part.slotType}:${sp.part.id}`));
    const prev = prevIds.current;

    setLayers((current) => {
      const kept: LayerState[] = [];

      // Mark removed layers for exit animation
      current.forEach((layer) => {
        const key = `${layer.slotType}:${layer.partId}`;
        if (nextIds.has(key)) {
          kept.push({ ...layer, present: true });
        } else if (layer.present) {
          kept.push({ ...layer, present: false });
        }
      });

      // Add / replace new layers
      ordered.forEach((sp) => {
        const key = `${sp.part.slotType}:${sp.part.id}`;
        const cutout = sp.part.images.find((img) => img.type === 'builder-cutout');
        const imageUrl = cutout?.url || sp.part.images[0]?.url || '';
        const existing = kept.find((l) => l.slotType === sp.part.slotType && l.present);
        if (existing && existing.partId === sp.part.id) return;
        if (existing && existing.partId !== sp.part.id) {
          // swap: exit old, enter new
          existing.present = false;
        }
        if (!kept.some((l) => l.key === key && l.present)) {
          kept.push({
            key,
            partId: sp.part.id,
            slotType: sp.part.slotType,
            imageUrl,
            alt: cutout?.alt || sp.part.name,
            present: true,
          });
        }
      });

      return kept;
    });

    prevIds.current = nextIds;

    // Purge exited layers after animation
    const timer = setTimeout(() => {
      setLayers((current) => current.filter((l) => l.present));
    }, 900);
    return () => clearTimeout(timer);
  }, [ordered]);

  const showAsPair = productType === 'earring' && ordered.length > 0;
  const visibleLayers = layers.filter((l) => l.slotType !== 'size');

  if (visibleLayers.length === 0 && ordered.length === 0) {
    return (
      <div
        className={cn(
          'aspect-square bg-bg-secondary flex items-center justify-center',
          className
        )}
      >
        <div className="text-center p-8 max-w-[240px]">
          <p className="font-ui text-caption uppercase tracking-[0.13em] text-text-muted">
            Your piece will assemble here
          </p>
          <p className="font-ui text-micro text-text-muted mt-3 leading-relaxed">
            Choose each part — watch it join the piece in place.
          </p>
        </div>
      </div>
    );
  }

  const AssemblyStack = ({ mirror = false }: { mirror?: boolean }) => (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={mirror ? { transform: 'scaleX(-1)', transformOrigin: 'center' } : undefined}
    >
      {visibleLayers.map((layer, index) => {
        const style = ASSEMBLY_STYLES[layer.slotType] || ASSEMBLY_STYLES.centerpiece;
        const isCharm = layer.slotType === 'charm';
        const isGuru = layer.slotType === 'guru_bead';
        const isBead = layer.slotType === 'bead';

        return (
          <div
            key={layer.key + (layer.present ? '-in' : '-out')}
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none',
              !layer.present && 'assembly-layer--out',
              layer.present &&
                (isCharm
                  ? 'assembly-layer--settle'
                  : isGuru
                    ? 'assembly-layer--weighty'
                    : isBead
                      ? 'assembly-layer--string'
                      : 'assembly-layer--in')
            )}
            style={{
              zIndex: style.zIndex,
              ['--enter-x' as string]: `${style.enterFrom.x}%`,
              ['--enter-y' as string]: `${style.enterFrom.y}%`,
              ['--enter-scale' as string]: String(style.enterFrom.scale),
              ['--rest-x' as string]: `${style.offsetX}%`,
              ['--rest-y' as string]: `${style.offsetY}%`,
              ['--rest-scale' as string]: String(style.scale),
              ['--dur' as string]: `${style.durationMs}ms`,
              ['--ease' as string]: style.easing,
              animationDelay: layer.present ? `${index * 40}ms` : '0ms',
            }}
          >
            <img
              src={layer.imageUrl}
              alt={layer.alt}
              className="max-w-[78%] max-h-[78%] object-contain select-none"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={cn(
        'relative aspect-square bg-bg-secondary overflow-hidden',
        className
      )}
      aria-live="polite"
      aria-label="Live assembly preview"
    >
      {showAsPair ? (
        <>
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <div className="absolute inset-0 w-[200%] left-0">
              <AssemblyStack />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <div className="absolute inset-0 w-[200%] right-0">
              <AssemblyStack mirror />
            </div>
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-center font-ui text-micro uppercase tracking-[0.13em] text-text-muted">
            Sold as a pair
          </p>
        </>
      ) : (
        <AssemblyStack />
      )}

          <style>{`
        .assembly-layer--in {
          animation: assemblyIn var(--dur) var(--ease) forwards;
        }
        .assembly-layer--out {
          animation: assemblyOut 0.55s ease-in forwards;
        }
        .assembly-layer--settle {
          animation: assemblySettle var(--dur) var(--ease) 1 forwards;
          animation-iteration-count: 1;
        }
        .assembly-layer--weighty {
          animation: assemblyWeighty var(--dur) var(--ease) 1 forwards;
        }
        .assembly-layer--string {
          animation: assemblyString var(--dur) var(--ease) 1 forwards;
        }
        @keyframes assemblyIn {
          from {
            opacity: 0;
            transform: translate(var(--enter-x), var(--enter-y)) scale(var(--enter-scale));
          }
          to {
            opacity: 1;
            transform: translate(var(--rest-x), var(--rest-y)) scale(var(--rest-scale));
          }
        }
        @keyframes assemblyOut {
          from {
            opacity: 1;
            transform: translate(var(--rest-x), var(--rest-y)) scale(var(--rest-scale));
          }
          to {
            opacity: 0;
            transform: translate(var(--enter-x), -4%) scale(0.85);
          }
        }
        @keyframes assemblySettle {
          0% {
            opacity: 0;
            transform: translate(var(--enter-x), var(--enter-y)) scale(var(--enter-scale));
          }
          70% {
            opacity: 1;
            transform: translate(var(--rest-x), calc(var(--rest-y) + 2%)) scale(calc(var(--rest-scale) * 1.04));
          }
          100% {
            opacity: 1;
            transform: translate(var(--rest-x), var(--rest-y)) scale(var(--rest-scale));
          }
        }
        @keyframes assemblyWeighty {
          0% {
            opacity: 0;
            transform: translate(var(--enter-x), var(--enter-y)) scale(var(--enter-scale));
          }
          60% {
            opacity: 1;
            transform: translate(var(--rest-x), calc(var(--rest-y) - 1%)) scale(calc(var(--rest-scale) * 1.06));
          }
          100% {
            opacity: 1;
            transform: translate(var(--rest-x), var(--rest-y)) scale(var(--rest-scale));
          }
        }
        @keyframes assemblyString {
          0% {
            opacity: 0;
            transform: translate(-18%, var(--rest-y)) scale(0.7);
          }
          100% {
            opacity: 1;
            transform: translate(var(--rest-x), var(--rest-y)) scale(var(--rest-scale));
          }
        }
      `}</style>
    </div>
  );
}
