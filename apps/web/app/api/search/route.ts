import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();

    // Search products
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { tags: { has: searchTerm } },
          { materials: { has: searchTerm } },
          { category: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      take: 20,
      select: {
        slug: true,
        name: true,
        price: true,
        compareAtPrice: true,
        images: true,
        category: true,
        isBespoke: true,
        materials: true,
      },
    });

    // Also search parts for bespoke
    const parts = await prisma.part.findMany({
      where: {
        isAvailable: true,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { story: { contains: searchTerm, mode: 'insensitive' } },
          { material: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      take: 10,
      include: { partType: { include: { category: true } } },
    });

    const results = [
      ...products.map((p) => ({
        slug: p.slug,
        name: p.name,
        price: Number(p.price),
        compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : undefined,
        image: p.images[0],
        category: p.category,
        isBespoke: p.isBespoke,
      })),
      ...parts.map((p) => ({
        slug: `build/${p.partType.category.slug}`,
        name: `${p.name} (Bespoke Part)`,
        price: Number(p.price),
        image: p.images[0],
        category: p.partType.category.name,
        isBespoke: true,
      })),
    ];

    return NextResponse.json({ results, total: results.length });
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [], total: 0 });
  }
}
