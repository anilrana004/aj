import { ConfiguratorPart } from '@/types/part';

export interface LayerDefinition {
  partId: string;
  imageUrl: string;
  zIndex: number;
  offsetX: number;
  offsetY: number;
  scale: number;
  opacity: number;
  rotation: number;
}

export interface CompositingRequest {
  parts: ConfiguratorPart[];
  width: number;
  height: number;
  background?: string;
}

export interface CompositingResult {
  layers: LayerDefinition[];
  totalLayers: number;
  dimensions: { width: number; height: number };
}

const SLOT_Z_INDEX: Record<string, number> = {
  chain: 1,
  cord: 1,
  length: 1,
  bead: 2,
  spacer: 3,
  centerpiece: 5,
  accent: 6,
  guru_bead: 5,
  clasp: 4,
  tassel: 7,
};

const SLOT_POSITIONS: Record<string, { offsetX: number; offsetY: number; scale: number }> = {
  chain: { offsetX: 0, offsetY: 0, scale: 1 },
  cord: { offsetX: 0, offsetY: 0, scale: 1 },
  length: { offsetX: 0, offsetY: 0, scale: 1 },
  centerpiece: { offsetX: 0, offsetY: 10, scale: 0.85 },
  accent: { offsetX: 15, offsetY: -5, scale: 0.5 },
  bead: { offsetX: 0, offsetY: 0, scale: 0.9 },
  spacer: { offsetX: 10, offsetY: 0, scale: 0.4 },
  guru_bead: { offsetX: 0, offsetY: 20, scale: 0.95 },
  clasp: { offsetX: 0, offsetY: 0, scale: 0.7 },
  tassel: { offsetX: 0, offsetY: 30, scale: 0.8 },
};

export function buildLayers(request: CompositingRequest): CompositingResult {
  const layers: LayerDefinition[] = request.parts
    .map((part) => {
      const cutoutImage = part.images.find((img) => img.type === 'builder-cutout');
      const position = SLOT_POSITIONS[part.slotType] || { offsetX: 0, offsetY: 0, scale: 1 };

      return {
        partId: part.id,
        imageUrl: cutoutImage?.url || part.images[0]?.url || '',
        zIndex: SLOT_Z_INDEX[part.slotType] || 1,
        offsetX: position.offsetX,
        offsetY: position.offsetY,
        scale: position.scale,
        opacity: 1,
        rotation: 0,
      };
    })
    .sort((a, b) => a.zIndex - b.zIndex);

  return {
    layers,
    totalLayers: layers.length,
    dimensions: { width: request.width, height: request.height },
  };
}

export function getPreviewUrl(parts: ConfiguratorPart[]): string | null {
  const centerpiece = parts.find((p) => p.slotType === 'centerpiece');
  if (centerpiece) {
    const editorial = centerpiece.images.find((img) => img.type === 'editorial');
    return editorial?.url || centerpiece.images[0]?.url || null;
  }
  const primary = parts[0];
  if (primary) {
    const editorial = primary.images.find((img) => img.type === 'editorial');
    return editorial?.url || primary.images[0]?.url || null;
  }
  return null;
}
