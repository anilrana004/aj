import { ConfiguratorPart, SlotType } from '@/types/part';
import {
  Configuration,
  Personalization,
  PriceBreakdownItem,
  PricingRequest,
  PricingResponse,
  SelectedPart,
} from '@/types/configuration';

const ENGRAVING_BASE_PRICE = 2500;
const ENGRAVING_DEVANAGARI_SURCHARGE = 1000;
const LENGTH_ADJUSTMENT_BASE_PRICE = 3000;
const GIFT_WRAPPING_PRICE = 1500;

export function calculateBasePrice(selectedParts: SelectedPart[]): number {
  return selectedParts.reduce((sum, sp) => sum + sp.part.price, 0);
}

export function calculateModifiers(
  selectedParts: SelectedPart[],
  allParts: ConfiguratorPart[]
): { amount: number; items: PriceBreakdownItem[] } {
  const items: PriceBreakdownItem[] = [];
  let total = 0;

  const centerpiece = selectedParts.find((sp) => sp.part.slotType === 'centerpiece');
  const chain = selectedParts.find((sp) => sp.part.slotType === 'chain' || sp.part.slotType === 'cord');

  if (centerpiece && chain) {
    const centerpieceWeight = centerpiece.part.weightGrams;
    const chainWeight = chain.part.weightGrams;

    if (centerpieceWeight > chainWeight * 2 && chain.part.material !== 'platinum' && chain.part.material !== '22k-yellow-gold') {
      const surcharge = 4000;
      items.push({
        label: 'Structural reinforcement',
        amount: surcharge,
        description: `The ${centerpiece.part.name} requires chain reinforcement for secure setting with the ${chain.part.name}.`,
      });
      total += surcharge;
    }
  }

  selectedParts.forEach((sp) => {
    sp.part.priceModifiers.forEach((mod) => {
      const hasTarget = selectedParts.some((other) => other.part.slotType === mod.targetSlot);
      if (hasTarget) {
        const existingModifier = items.find(
          (item) => item.description === mod.reason
        );
        if (!existingModifier) {
          items.push({
            label: 'Compatibility adjustment',
            amount: mod.modifierAmount,
            description: mod.reason,
          });
          total += mod.modifierAmount;
        }
      }
    });
  });

  return { amount: total, items };
}

export function calculatePersonalizationTotal(personalization?: Personalization): {
  amount: number;
  items: PriceBreakdownItem[];
} {
  if (!personalization) return { amount: 0, items: [] };

  const items: PriceBreakdownItem[] = [];
  let total = 0;

  if (personalization.engraving) {
    let engravingPrice = ENGRAVING_BASE_PRICE;
    if (personalization.engraving.script === 'devanagari') {
      engravingPrice += ENGRAVING_DEVANAGARI_SURCHARGE;
    }
    items.push({
      label: `Engraving (${personalization.engraving.script})`,
      amount: engravingPrice,
      description: `"${personalization.engraving.text}"`,
    });
    total += engravingPrice;
  }

  if (personalization.lengthAdjustment) {
    items.push({
      label: 'Length adjustment',
      amount: LENGTH_ADJUSTMENT_BASE_PRICE,
      description: `Adjusted to ${personalization.lengthAdjustment.targetCm}cm`,
    });
    total += LENGTH_ADJUSTMENT_BASE_PRICE;
  }

  if (personalization.giftWrapping) {
    items.push({
      label: 'Gift wrapping',
      amount: GIFT_WRAPPING_PRICE,
      description: 'Handmade khaddi paper box with ribbon',
    });
    total += GIFT_WRAPPING_PRICE;
  }

  return { amount: total, items };
}

export function computeFullPricing(
  selectedParts: SelectedPart[],
  allParts: ConfiguratorPart[],
  personalization?: Personalization
): {
  basePrice: number;
  modifiersTotal: number;
  personalizationTotal: number;
  totalPrice: number;
  breakdown: PriceBreakdownItem[];
  warnings: string[];
} {
  const warnings: string[] = [];
  const breakdown: PriceBreakdownItem[] = [];

  if (selectedParts.length === 0) {
    warnings.push('No parts selected yet.');
    return { basePrice: 0, modifiersTotal: 0, personalizationTotal: 0, totalPrice: 0, breakdown: [], warnings };
  }

  const basePrice = calculateBasePrice(selectedParts);
  selectedParts.forEach((sp) => {
    breakdown.push({
      label: sp.part.name,
      amount: sp.part.price,
      description: `${sp.part.material.replace(/-/g, ' ')} · ${sp.part.slotType}`,
    });
  });

  const { amount: modifiersTotal, items: modifierItems } = calculateModifiers(selectedParts, allParts);
  breakdown.push(...modifierItems);

  const { amount: personalizationTotal, items: personalizationItems } = calculatePersonalizationTotal(personalization);
  breakdown.push(...personalizationItems);

  const totalPrice = basePrice + modifiersTotal + personalizationTotal;

  selectedParts.forEach((sp) => {
    if (sp.part.inStockQuantity === 0) {
      warnings.push(`${sp.part.name} is made to order — expect ${sp.part.leadTimeDays} days lead time.`);
    }
  });

  const slotTypes = selectedParts.map((sp) => sp.part.slotType);
  selectedParts.forEach((sp) => {
    sp.part.incompatibleWith.forEach((incompatId) => {
      const conflicting = selectedParts.find((other) => other.part.id === incompatId);
      if (conflicting) {
        warnings.push(`${sp.part.name} is not recommended with ${conflicting.part.name}.`);
      }
    });
  });

  return { basePrice, modifiersTotal, personalizationTotal, totalPrice, breakdown, warnings };
}

export function buildStoryNarrative(selectedParts: SelectedPart[]): string {
  if (selectedParts.length === 0) return '';

  const sorted = [...selectedParts].sort((a, b) => {
    const order = ['chain', 'cord', 'centerpiece', 'accent', 'bead', 'spacer', 'clasp', 'tassel', 'guru_bead'];
    return order.indexOf(a.part.slotType) - order.indexOf(b.part.slotType);
  });

  const segments = sorted.map((sp) => {
    const material = sp.part.material.replace(/-/g, ' ');
    const region = sp.part.story.originRegion;
    return `a ${material} ${sp.part.name.toLowerCase()} from ${region}`;
  });

  if (segments.length === 1) {
    return `Your piece features ${segments[0]} — ${sorted[0].part.story.headline.toLowerCase()}.`;
  }

  if (segments.length === 2) {
    return `Your piece begins with ${segments[0]}, and ${segments[1]} — together, ${sorted[0].part.story.headline.toLowerCase()} meets ${sorted[1].part.story.headline.toLowerCase()}.`;
  }

  const last = segments.pop()!;
  const middle = segments.pop()!;
  const first = segments.join(', ');
  return `Your piece begins with ${first}, carries ${middle}, and closes with ${last} — ${sorted[0].part.story.headline.toLowerCase()}, through ${sorted[1].part.story.headline.toLowerCase()}, to ${sorted[sorted.length - 1].part.story.headline.toLowerCase()}.`;
}

export function validateConfiguration(
  selectedParts: SelectedPart[],
  requiredSlotTypes: SlotType[]
): { isValid: boolean; missingSlots: SlotType[] } {
  const selectedSlotTypes = new Set(selectedParts.map((sp) => sp.part.slotType));
  const missingSlots = requiredSlotTypes.filter((slot) => !selectedSlotTypes.has(slot));
  return { isValid: missingSlots.length === 0, missingSlots };
}
