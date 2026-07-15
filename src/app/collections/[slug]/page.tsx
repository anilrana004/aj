import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collections, products, journalArticles } from '@/lib/data';
import { CollectionsPageClient } from './CollectionsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} | Apriliha Singh`,
      description: collection.description,
      images: [collection.heroImage],
    },
  };
}

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  const collectionProducts = products.filter((p) => p.collectionId === collection?.id);

  if (!collection) {
    notFound();
  }

  return <CollectionsPageClient collection={collection} products={collectionProducts} />;
}