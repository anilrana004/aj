import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aprilihasingh.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/craftsmanship`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/build/necklace`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/build/bracelet`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/build/mala`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/legal/shipping-returns`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    // Dynamic collection pages
    const collections = await prisma.collection.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });

    const collectionPages: MetadataRoute.Sitemap = collections.map((c) => ({
      url: `${SITE_URL}/collections/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Dynamic product pages
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Dynamic journal pages
    const articles = await prisma.journalArticle.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const journalPages: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${SITE_URL}/journal/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Collection listing pages (by category)
    const categoryPages: MetadataRoute.Sitemap = [
      'necklaces', 'bracelets', 'malas', 'rings', 'earrings'
    ].map((slug) => ({
      url: `${SITE_URL}/collections/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...collectionPages, ...categoryPages, ...productPages, ...journalPages];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticPages;
  }
}
