import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category');

    if (!categorySlug) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        partTypes: {
          orderBy: { sortOrder: 'asc' },
          include: {
            parts: {
              where: { isAvailable: true },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({
      category: { id: category.id, slug: category.slug, name: category.name },
      partTypes: category.partTypes.map((pt) => ({
        id: pt.id,
        slug: pt.slug,
        name: pt.name,
        isRequired: pt.isRequired,
        sortOrder: pt.sortOrder,
        allowMultiple: pt.allowMultiple,
        parts: pt.parts.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: Number(p.price),
          story: p.story,
          origin: p.origin,
          material: p.material,
          images: p.images,
          isAvailable: p.isAvailable,
          leadTimeDays: p.leadTimeDays,
        })),
      })),
    });
  } catch (error: any) {
    console.error('Builder parts error:', error);
    return NextResponse.json({ error: 'Failed to fetch parts' }, { status: 500 });
  }
}
