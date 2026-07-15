import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface PriceRequest {
  categorySlug: string;
  parts: Array<{
    partTypeId: string;
    partId: string;
    quantity: number;
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const body: PriceRequest = await req.json();
    const { categorySlug, parts } = body;

    if (!categorySlug || !parts || parts.length === 0) {
      return NextResponse.json({ error: 'Category and parts are required' }, { status: 400 });
    }

    // Fetch prices from database — never trust client-computed totals
    const partIds = parts.map((p) => p.partId);
    const dbParts = await prisma.part.findMany({
      where: { id: { in: partIds } },
      select: {
        id: true,
        name: true,
        price: true,
        leadTimeDays: true,
        partType: { select: { slug: true, name: true } },
      },
    });

    const partMap = new Map(dbParts.map((p) => [p.id, p]));

    let subtotal = 0;
    let maxLeadTime = 0;
    const breakdown: Array<{
      partId: string;
      partName: string;
      partTypeName: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }> = [];

    for (const selected of parts) {
      const dbPart = partMap.get(selected.partId);
      if (!dbPart) {
        return NextResponse.json(
          { error: `Part not found: ${selected.partId}` },
          { status: 400 }
        );
      }

      const lineTotal = Number(dbPart.price) * selected.quantity;
      subtotal += lineTotal;
      maxLeadTime = Math.max(maxLeadTime, dbPart.leadTimeDays);

      breakdown.push({
        partId: dbPart.id,
        partName: dbPart.name,
        partTypeName: dbPart.partType.name,
        quantity: selected.quantity,
        unitPrice: Number(dbPart.price),
        lineTotal,
      });
    }

    const shippingCost = 0; // Free shipping
    const tax = 0; // GST handled at checkout for B2B
    const total = subtotal + shippingCost + tax;

    return NextResponse.json({
      subtotal,
      shippingCost,
      tax,
      total,
      maxLeadTime,
      breakdown,
    });
  } catch (error: any) {
    console.error('Price calculation error:', error);
    return NextResponse.json({ error: 'Failed to calculate price' }, { status: 500 });
  }
}
