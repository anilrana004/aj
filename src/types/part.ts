export type SlotType =
  | 'chain'
  | 'centerpiece'
  | 'accent'
  | 'clasp'
  | 'bead'
  | 'tassel'
  | 'guru_bead'
  | 'spacer'
  | 'cord'
  | 'length'
  | 'band'
  | 'setting'
  | 'stone'
  | 'size'
  | 'charm';

export type PartMaterial =
  | '18k-gold-vermeil'
  | '22k-yellow-gold'
  | 'oxidized-silver'
  | 'sterling-silver'
  | 'platinum'
  | 'raw-garnet'
  | 'polki-diamond'
  | 'basra-pearl'
  | 'colombian-emerald'
  | 'kashmir-sapphire'
  | 'rudraksha'
  | 'sandalwood'
  | 'tassel-silk'
  | 'cotton-cord'
  | 'leather';

export interface PartStory {
  headline: string;
  narrative: string;
  craftTime: string;
  originRegion: string;
}

export interface PartImage {
  url: string;
  alt: string;
  type: 'builder-cutout' | 'editorial' | 'detail';
  width: number;
  height: number;
}

export interface PriceModifier {
  targetSlot: SlotType;
  modifierAmount: number;
  reason: string;
}

export interface ConfiguratorPart {
  id: string;
  slug: string;
  name: string;
  slotType: SlotType;
  material: PartMaterial;
  price: number;
  currency: string;
  priceModifiers: PriceModifier[];
  weightGrams: number;
  compatibleSlots: SlotType[];
  incompatibleWith: string[];
  images: PartImage[];
  story: PartStory;
  leadTimeDays: number;
  inStockQuantity: number;
  isEditorPick: boolean;
  sortOrder: number;
  /** When true, part is a fit choice and does not contribute to price */
  isFitOnly?: boolean;
}

export interface ProductSlot {
  id: string;
  slotType: SlotType;
  label: string;
  description: string;
  required: boolean;
  allowsMultiple: boolean;
  maxSelections?: number;
  sortOrder: number;
  /** Assembly animation hint for LivePreviewCanvas */
  assemblyFeel?: 'form' | 'attach' | 'seat' | 'string' | 'settle' | 'weighty';
}
