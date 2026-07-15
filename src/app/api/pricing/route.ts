import { NextRequest, NextResponse } from 'next/server';
import { computeFullPricing } from '@/lib/pricing/engine';
import { allConfiguratorParts } from '@/lib/data/configurator-parts';
import { PricingRequest } from '@/types/configuration';

export async function POST(request: NextRequest) {
  try {
    const body: PricingRequest = await request.json();

    if (!body.partIds || body.partIds.length === 0) {
      return NextResponse.json(
        { error: 'No parts selected' },
        { status: 400 }
      );
    }

    const selectedParts = body.partIds
      .map((id) => {
        const part = allConfiguratorParts.find((p) => p.id === id);
        if (!part) return null;
        return {
          slotType: part.slotType,
          part,
          addedAt: new Date().toISOString(),
        };
      })
      .filter(Boolean);

    if (selectedParts.length === 0) {
      return NextResponse.json(
        { error: 'No valid parts found' },
        { status: 400 }
      );
    }

    const personalization = body.personalization
      ? {
          engraving: body.personalization.engraving,
          lengthAdjustment: body.personalization.lengthAdjustment,
          giftWrapping: body.personalization.giftWrapping ?? false,
          giftWrappingPrice: body.personalization.giftWrappingPrice ?? 0,
        }
      : undefined;

    const pricing = computeFullPricing(
      selectedParts as any,
      allConfiguratorParts,
      personalization
    );

    return NextResponse.json({
      basePrice: pricing.basePrice,
      modifiersTotal: pricing.modifiersTotal,
      personalizationTotal: pricing.personalizationTotal,
      totalPrice: pricing.totalPrice,
      breakdown: pricing.breakdown,
      warnings: pricing.warnings,
    });
  } catch (error) {
    console.error('Pricing API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
