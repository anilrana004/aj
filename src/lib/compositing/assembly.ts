import { SlotType } from '@/types/part';
import { ProductType } from '@/types/configuration';

export interface AssemblyLayerStyle {
  zIndex: number;
  offsetX: number; // % of canvas
  offsetY: number;
  scale: number;
  /** Entry animation origin */
  enterFrom: { x: number; y: number; scale: number };
  durationMs: number;
  easing: string;
}

/** Per-slot visual placement + attach/detach motion */
export const ASSEMBLY_STYLES: Record<SlotType, AssemblyLayerStyle> = {
  chain: {
    zIndex: 1,
    offsetX: 0,
    offsetY: -2,
    scale: 1,
    enterFrom: { x: 0, y: -12, scale: 0.92 },
    durationMs: 700,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  cord: {
    zIndex: 1,
    offsetX: 0,
    offsetY: -2,
    scale: 1,
    enterFrom: { x: 0, y: -10, scale: 0.9 },
    durationMs: 650,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  length: {
    zIndex: 1,
    offsetX: 0,
    offsetY: 0,
    scale: 0.98,
    enterFrom: { x: 0, y: 0, scale: 0.96 },
    durationMs: 400,
    easing: 'ease-out',
  },
  band: {
    zIndex: 1,
    offsetX: 0,
    offsetY: 4,
    scale: 0.95,
    enterFrom: { x: 0, y: 16, scale: 0.85 },
    durationMs: 650,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  centerpiece: {
    zIndex: 5,
    offsetX: 0,
    offsetY: 8,
    scale: 0.72,
    enterFrom: { x: 0, y: 18, scale: 0.6 },
    durationMs: 750,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  setting: {
    zIndex: 4,
    offsetX: 0,
    offsetY: 2,
    scale: 0.7,
    enterFrom: { x: 0, y: -14, scale: 0.55 },
    durationMs: 700,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  stone: {
    zIndex: 6,
    offsetX: 0,
    offsetY: 0,
    scale: 0.45,
    enterFrom: { x: 0, y: -20, scale: 0.3 },
    durationMs: 800,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  accent: {
    zIndex: 6,
    offsetX: 12,
    offsetY: 4,
    scale: 0.38,
    enterFrom: { x: 20, y: -8, scale: 0.25 },
    durationMs: 600,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  bead: {
    zIndex: 2,
    offsetX: 0,
    offsetY: 2,
    scale: 0.88,
    enterFrom: { x: -16, y: 0, scale: 0.7 },
    durationMs: 900,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  spacer: {
    zIndex: 3,
    offsetX: 8,
    offsetY: 4,
    scale: 0.35,
    enterFrom: { x: 10, y: 0, scale: 0.2 },
    durationMs: 500,
    easing: 'ease-out',
  },
  guru_bead: {
    zIndex: 5,
    offsetX: 0,
    offsetY: 18,
    scale: 0.55,
    enterFrom: { x: 0, y: 28, scale: 0.4 },
    durationMs: 850,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  clasp: {
    zIndex: 4,
    offsetX: 0,
    offsetY: -18,
    scale: 0.4,
    enterFrom: { x: 0, y: -28, scale: 0.3 },
    durationMs: 600,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  tassel: {
    zIndex: 7,
    offsetX: 0,
    offsetY: 28,
    scale: 0.55,
    enterFrom: { x: 0, y: 40, scale: 0.45 },
    durationMs: 800,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  charm: {
    zIndex: 8,
    offsetX: 10,
    offsetY: 16,
    scale: 0.4,
    enterFrom: { x: 8, y: -24, scale: 0.25 },
    durationMs: 900,
    easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)', // single settle overshoot, no loop
  },
  size: {
    zIndex: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 1,
    enterFrom: { x: 0, y: 0, scale: 1 },
    durationMs: 300,
    easing: 'ease-out',
  },
};

/** Assembly order for visual sequencing (lower = forms first) */
export const ASSEMBLY_ORDER: Record<ProductType, SlotType[]> = {
  necklace: ['chain', 'centerpiece', 'stone', 'clasp', 'length'],
  bracelet: ['cord', 'centerpiece', 'spacer', 'clasp'],
  mala: ['cord', 'bead', 'spacer', 'guru_bead', 'tassel'],
  ring: ['band', 'setting', 'stone', 'size'],
  earring: ['chain', 'centerpiece', 'accent', 'clasp'],
  anklet: ['cord', 'centerpiece', 'spacer', 'charm', 'clasp'],
};

export function sortPartsForAssembly(
  productType: ProductType,
  slotTypes: SlotType[]
): SlotType[] {
  const order = ASSEMBLY_ORDER[productType] || [];
  return [...slotTypes].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}
