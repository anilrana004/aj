import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { malaSlots, getPartsForProductType } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Mala — Bespoke Builder',
  description: 'String your mala bead by bead — thread, beads, guru bead, tassel — with live assembly.',
};

export default function MalaBuilderPage() {
  const malaParts = getPartsForProductType('mala');

  return (
    <>
      <Header />
      <main className="site-main">
        <ConfiguratorShell productType="mala" slots={malaSlots} parts={malaParts} />
      </main>
      <Footer />
    </>
  );
}
