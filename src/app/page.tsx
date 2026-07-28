import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeContent } from '@/components/sections/HomeContent';

export const metadata: Metadata = {
  title: 'Apriliha Singh — Fine Bespoke Jewelry',
  description: 'Fine bespoke jewelry from Jaipur. Apple\'s restraint meets India\'s richness. Every piece handcrafted by master karigars.',
  openGraph: {
    title: 'Apriliha Singh — Fine Bespoke Jewelry',
    description: 'Fine bespoke jewelry from Jaipur. Apple\'s restraint meets India\'s richness.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <HomeContent />
      </main>
      <Footer />
    </>
  );
}
