const PRODUCTION_URL = 'https://aprilihasingh.com';

/**
 * Canonical origin for metadata, sitemap and robots.
 * Preview deployments resolve to their own Vercel URL so crawlers and OG
 * scrapers never point at production from a branch build.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  if (process.env.VERCEL_ENV === 'production') return PRODUCTION_URL;

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return PRODUCTION_URL;
}
