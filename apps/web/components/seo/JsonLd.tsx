import { type ReactNode } from 'react';

interface JsonLdProps {
  type: string;
  data?: Record<string, any>;
}

export default function JsonLd({ type, data = {} }: JsonLdProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aprilihasingh.com';
  const SITE_NAME = 'Apriliha Singh';

  let schema: Record<string, any> = {};

  switch (type) {
    case 'Organization':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo.svg`,
        description: 'Apriliha Singh — fine jewelry, bespoke and ready-to-wear. Handcrafted in Jaipur, designed with quiet luxury.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          addressCountry: 'IN',
        },
        sameAs: data.sameAs || [],
        ...data,
      };
      break;
    case 'WebSite':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        ...data,
      };
      break;
    case 'Product':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        ...data,
      };
      break;
    case 'Article':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: `${SITE_URL}/brand/logo.svg`,
        },
        ...data,
      };
      break;
    case 'FAQPage':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        ...data,
      };
      break;
    case 'BreadcrumbList':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        ...data,
      };
      break;
    default:
      schema = { '@context': 'https://schema.org', ...data };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
