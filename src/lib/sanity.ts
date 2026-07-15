import { Collection, Product, JournalArticle, AtelierContent } from '@/lib/types';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VERSION = '2024-01-01';

const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/${SANITY_DATASET}`;

async function sanityFetch<T>(query: string, params?: Record<string, string>): Promise<T> {
  if (!SANITY_PROJECT_ID) {
    throw new Error('Sanity project ID not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
  }

  const url = new URL(sanityUrl);
  const body = JSON.stringify({ query, params: params || {} });

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Sanity fetch failed: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}

export async function getCollections(): Promise<Collection[]> {
  const query = `*[_type == "collection"] | order(order asc) {
    ...,
    "products": *[_type == "product" && references(^._id)]
  }`;
  return sanityFetch<Collection[]>(query);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const query = `*[_type == "collection" && slug.current == $slug][0] {
    ...,
    "products": *[_type == "product" && references(^._id)]
  }`;
  return sanityFetch<Collection | null>(query, { slug });
}

export async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(name asc) {
    ...,
    "collection": collection->slug.current
  }`;
  return sanityFetch<Product[]>(query);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    ...,
    "collection": collection->slug.current,
    "collectionName": collection->name
  }`;
  return sanityFetch<Product | null>(query, { slug });
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  const query = `*[_type == "journalArticle"] | order(publishedAt desc)`;
  return sanityFetch<JournalArticle[]>(query);
}

export async function getJournalArticleBySlug(slug: string): Promise<JournalArticle | null> {
  const query = `*[_type == "journalArticle" && slug.current == $slug][0]`;
  return sanityFetch<JournalArticle | null>(query, { slug });
}

export async function getAtelierContent(): Promise<AtelierContent | null> {
  const query = `*[_type == "atelierContent"][0]`;
  return sanityFetch<AtelierContent | null>(query);
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  const query = `*[_type == "collection" && isActive == true] | order(order asc) [0...2] {
    ...,
    "products": *[_type == "product" && references(^._id)]
  }`;
  return sanityFetch<Collection[]>(query);
}

export async function getFeaturedArticles(): Promise<JournalArticle[]> {
  const query = `*[_type == "journalArticle" && isFeatured == true] | order(publishedAt desc) [0...3]`;
  return sanityFetch<JournalArticle[]>(query);
}
