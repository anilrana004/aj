import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/cart/', '/checkout/', '/account/'],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
