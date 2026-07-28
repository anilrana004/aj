import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { earringSlots, getPartsForProductType } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Earrings — Bespoke Builder',
  description: 'Build once, priced as a pair. Watch your earring assemble, then see the matched pair.',
};

export default function EarringBuilderPage() {
  const earringParts = getPartsForProductType('earring');

  return (
    <>
      <Header />
      <main className="site-main">
        <ConfiguratorShell productType="earring" slots={earringSlots} parts={earringParts} />
      </main>
      <Footer />
    </>
  );
}
