import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ToastProvider } from '@/components/ui/Toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aprilihasingh.com'),
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
    url: 'https://aprilihasingh.com',
    siteName: 'Apriliha Singh',
    title: 'Apriliha Singh — Fine Bespoke Jewelry',
    description: 'Fine bespoke jewelry from Jaipur. Apple\'s restraint meets India\'s richness.',
    images: [
      {
        url: '/images/og-default.svg',
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
    images: ['/images/og-default.svg'],
  },
  alternates: {
    canonical: 'https://aprilihasingh.com',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
    { media: '(prefers-color-scheme: dark)', color: '#2d1f22' },
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="bg-sand text-ink antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
