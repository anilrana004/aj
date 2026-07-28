import { NextRequest, NextResponse } from 'next/server';
import { computeFullPricing } from '@/lib/pricing/engine';
import { allConfiguratorParts } from '@/lib/data/configurator-parts';
import { PricingRequest, ProductType } from '@/types/configuration';

export async function POST(request: NextRequest) {
  try {
    const body: PricingRequest = await request.json();

    if (!body.partIds || body.partIds.length === 0) {
      return NextResponse.json({ error: 'No parts selected' }, { status: 400 });
    }

    const productType: ProductType = body.productType || 'necklace';

    const catalog = allConfiguratorParts.filter(Boolean);

    const selectedParts = body.partIds
      .map((id) => {
        const part = catalog.find((p) => p.id === id);
        if (!part) return null;
        return {
          slotType: part.slotType,
          part,
          addedAt: new Date().toISOString(),
        };
      })
      .filter(Boolean);

    if (selectedParts.length !== body.partIds.length) {
      return NextResponse.json({ error: 'One or more part IDs are invalid' }, { status: 400 });
    }

    const sizePart = (selectedParts as { part: { slotType: string; name: string } }[]).find(
      (sp) => sp.part.slotType === 'size'
    );

    const personalization = {
      engraving: body.personalization?.engraving,
      lengthAdjustment: body.personalization?.lengthAdjustment,
      giftWrapping: body.personalization?.giftWrapping ?? false,
      giftWrappingPrice: body.personalization?.giftWrappingPrice ?? 0,
      ringSize: body.personalization?.ringSize || sizePart?.part.name,
    };

    if (productType === 'ring' && !personalization.ringSize) {
      return NextResponse.json(
        { error: 'Ring size is required before purchase' },
        { status: 400 }
      );
    }

    const pricing = computeFullPricing(
      selectedParts as Parameters<typeof computeFullPricing>[0],
      allConfiguratorParts.filter(Boolean),
      personalization,
      productType
    );

    // Never trust client total — reject tampering
    if (
      typeof body.claimedTotal === 'number' &&
      Math.abs(body.claimedTotal - pricing.totalPrice) > 0.01
    ) {
      return NextResponse.json(
        {
          error: 'Price mismatch — server recalculated total',
          serverTotal: pricing.totalPrice,
          claimedTotal: body.claimedTotal,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      basePrice: pricing.basePrice,
      modifiersTotal: pricing.modifiersTotal,
      personalizationTotal: pricing.personalizationTotal,
      pairMultiplier: pricing.pairMultiplier,
      totalPrice: pricing.totalPrice,
      breakdown: pricing.breakdown,
      warnings: pricing.warnings,
    });
  } catch (error) {
    console.error('Pricing API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
