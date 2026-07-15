import './styles/globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: {
    template: '%s | Apriliha Singh',
    default: 'Apriliha Singh — Fine Jewelry, Bespoke & Ready-to-Wear',
  },
  description:
    'Apriliha Singh — fine jewelry, bespoke and ready-to-wear. Handcrafted in Jaipur with quiet luxury, enduring craft, and modern restraint.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://aprilihasingh.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Apriliha Singh',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-aubergine antialiased">
        <JsonLd type="Organization" />
        <JsonLd type="WebSite" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
