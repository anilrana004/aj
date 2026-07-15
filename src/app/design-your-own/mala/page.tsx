import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { malaSlots, allConfiguratorParts } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Mala — Bespoke Builder',
  description: 'Build your own prayer mala — 108 beads, guru bead, spacers, and tassel. Each bead chosen with intention.',
};

export default function MalaBuilderPage() {
  const malaParts = allConfiguratorParts.filter((p) =>
    malaSlots.some((s) => s.slotType === p.slotType)
  );

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <ConfiguratorShell
          productType="mala"
          slots={malaSlots}
          parts={malaParts}
        />
      </main>
      <Footer />
    </>
  );
}
