import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, collections } from '@/lib/data';
import { ProductPageClient } from './ProductPageClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Apriliha Singh`,
      description: product.description,
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  const collection = product ? collections.find((c) => c.id === product.collectionId) : null;

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} collection={collection || null} />;
}