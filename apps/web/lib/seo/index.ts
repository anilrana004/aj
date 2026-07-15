import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aprilihasingh.com';
const SITE_NAME = 'Apriliha Singh';
const DEFAULT_DESCRIPTION =
  'Apriliha Singh — fine jewelry, bespoke and ready-to-wear. Handcrafted in Jaipur, designed with quiet luxury.';

interface BuildMetadataParams {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image,
  type = 'website',
  publishedAt,
  noindex = false,
}: BuildMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/images/og-default.jpg`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type,
      ...(publishedAt && { publishedTime: publishedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function buildJsonLd(type: string, data: Record<string, any>): string {
  const baseContext = 'https://schema.org';

  const schemas: Record<string, any> = {
    Organization: {
      '@context': baseContext,
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo.svg`,
      description: DEFAULT_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
      sameAs: [],
    },
    Product: {
      '@context': baseContext,
      '@type': 'Product',
      ...data,
    },
    Article: {
      '@context': baseContext,
      '@type': 'Article',
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: `${SITE_URL}/brand/logo.svg`,
      },
      ...data,
    },
    FAQPage: {
      '@context': baseContext,
      '@type': 'FAQPage',
      ...data,
    },
    BreadcrumbList: {
      '@context': baseContext,
      '@type': 'BreadcrumbList',
      ...data,
    },
    WebSite: {
      '@context': baseContext,
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  };

  return JSON.stringify(schemas[type] || { ...schemas.Organization, ...data });
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): string {
  return buildJsonLd('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  });
}

export function buildProductJsonLd(product: {
  name: string;
  description: string;
  image: string[];
  price: number;
  currency: string;
  availability: string;
  url: string;
  brand?: string;
}): string {
  return buildJsonLd('Product', {
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
    },
  });
}
