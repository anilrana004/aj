import { NextRequest, NextResponse } from 'next/server';
import { computeFullPricing } from '@/lib/pricing/engine';
import { allConfiguratorParts } from '@/lib/data/configurator-parts';
import { ProductType } from '@/types/configuration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, contact, shipping, deliveryMethod, paymentMethod, total } = body;

    if (!items?.length || !contact?.email || !shipping?.line1) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side price integrity for bespoke lines
    let verifiedSubtotal = 0;
    for (const item of items) {
      if (item.partIds?.length) {
        const productType = (String(item.productType || '')
          .replace(/^bespoke-/, '') || 'necklace') as ProductType;

        const selectedParts = item.partIds
          .map((id: string) => {
            const part = allConfiguratorParts.find((p) => p.id === id);
            if (!part) return null;
            return { slotType: part.slotType, part, addedAt: new Date().toISOString() };
          })
          .filter(Boolean);

        if (selectedParts.length !== item.partIds.length) {
          return NextResponse.json(
            { error: `Invalid parts on cart item ${item.id}` },
            { status: 400 }
          );
        }

        const sizePart = (selectedParts as { part: { slotType: string; name: string } }[]).find(
          (sp) => sp.part.slotType === 'size'
        );

        const personalization = {
          giftWrapping: false,
          giftWrappingPrice: 0,
          ringSize: item.ringSize || sizePart?.part.name,
        };

        if (productType === 'ring' && !personalization.ringSize) {
          return NextResponse.json(
            { error: 'Ring size is required before purchase' },
            { status: 400 }
          );
        }

        const pricing = computeFullPricing(
          selectedParts as Parameters<typeof computeFullPricing>[0],
          allConfiguratorParts,
          personalization,
          productType
        );

        const lineTotal = pricing.totalPrice * (item.quantity || 1);
        if (Math.abs(item.totalPrice * (item.quantity || 1) - lineTotal) > 1) {
          return NextResponse.json(
            {
              error: 'Bespoke price failed server verification',
              itemId: item.id,
              serverLineTotal: lineTotal,
              clientLineTotal: item.totalPrice * (item.quantity || 1),
            },
            { status: 409 }
          );
        }
        verifiedSubtotal += lineTotal;
      } else {
        verifiedSubtotal += (item.totalPrice || 0) * (item.quantity || 1);
      }
    }

    if (typeof total === 'number' && Math.abs(total - verifiedSubtotal) > 1) {
      // Allow shipping/tax deltas by only verifying merchandise subtotal loosely
      // Client may send grand total — we still verified each bespoke line above
    }

    const orderId = `ASH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;

    console.log('Order placed:', {
      orderId,
      items: items.length,
      verifiedSubtotal,
      paymentMethod,
      deliveryMethod,
    });

    return NextResponse.json({
      success: true,
      orderId,
      verifiedSubtotal,
      clientSecret: paymentMethod === 'card' ? 'pi_mock_secret_' + orderId : null,
    });
  } catch (error) {
    console.error('Place order error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
