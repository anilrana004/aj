import type { Metadata, Viewport } from 'next';
import { Libre_Caslon_Text } from 'next/font/google';
import { ToastProvider } from '@/components/ui/Toast';
import { img } from '@/lib/images';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

const siteUrl = getSiteUrl();

const libre = Libre_Caslon_Text({
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Apriliha Singh — Fine Bespoke Jewelry',
    template: '%s | Apriliha Singh',
  },
  description: 'Fine bespoke jewelry from Jaipur. Apple\'s restraint meets India\'s richness. Every piece handcrafted by master karigars.',
  keywords: ['fine jewelry', 'bespoke jewelry', 'Jaipur jewelry', 'artisan jewelry', 'luxury jewelry', 'Apriliha Singh', 'karigar', 'handcrafted gold'],
  authors: [{ name: 'Apriliha Singh' }],
  creator: 'Apriliha Singh',
  publisher: 'Apriliha Singh',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Apriliha Singh',
    title: 'Apriliha Singh — Fine Bespoke Jewelry',
    description: 'Fine bespoke jewelry from Jaipur. Apple\'s restraint meets India\'s richness.',
    images: [
      {
        url: img.ogDefault,
        width: 1200,
        height: 630,
        alt: 'Apriliha Singh — Fine Bespoke Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apriliha Singh — Fine Bespoke Jewelry',
    description: 'Fine bespoke jewelry from Jaipur.',
    images: [img.ogDefault],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f1e9' },
    { media: '(prefers-color-scheme: dark)', color: '#241a1f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${libre.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className="bg-bg-primary text-text-primary antialiased"
        style={{ fontFamily: 'var(--font-libre), Georgia, "Times New Roman", serif' }}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
