import { ConfiguratorPart, SlotType } from './part';

export type ConfigurationStatus = 'draft' | 'saved' | 'in_cart' | 'ordered' | 'in_production' | 'shipped';

export type ProductType = 'necklace' | 'bracelet' | 'mala';

export interface SelectedPart {
  slotType: SlotType;
  part: ConfiguratorPart;
  addedAt: string;
}

export interface Personalization {
  engraving?: {
    text: string;
    script: 'latin' | 'devanagari';
    price: number;
  };
  lengthAdjustment?: {
    targetCm: number;
    price: number;
  };
  giftWrapping: boolean;
  giftWrappingPrice: number;
}

export interface Configuration {
  id: string;
  productType: ProductType;
  selectedParts: SelectedPart[];
  personalization: Personalization;
  computedPrice: number;
  basePartsPrice: number;
  modifiersTotal: number;
  previewImageUrl: string | null;
  clientNotes: string;
  status: ConfigurationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PriceBreakdownItem {
  label: string;
  amount: number;
  description?: string;
}

export interface ConfigurationSummary {
  configuration: Configuration;
  breakdown: PriceBreakdownItem[];
  storyNarrative: string;
}

export interface PricingRequest {
  productType: ProductType;
  partIds: string[];
  personalization?: Partial<Personalization>;
}

export interface PricingResponse {
  basePrice: number;
  modifiersTotal: number;
  personalizationTotal: number;
  totalPrice: number;
  breakdown: PriceBreakdownItem[];
  warnings: string[];
}
