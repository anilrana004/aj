import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { ringSlots, getPartsForProductType } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Ring — Bespoke Builder',
  description: 'Band, setting, stone, size — watch your ring assemble, then choose your fit.',
};

export default function RingBuilderPage() {
  const ringParts = getPartsForProductType('ring');

  return (
    <>
      <Header />
      <main className="site-main">
        <ConfiguratorShell productType="ring" slots={ringSlots} parts={ringParts} />
      </main>
      <Footer />
    </>
  );
}
