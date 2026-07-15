import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { braceletSlots, allConfiguratorParts } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Bracelet — Bespoke Builder',
  description: 'Build your own bespoke bracelet — foundation, centerpiece, spacers, and clasp. Handcrafted in Jaipur.',
};

export default function BraceletBuilderPage() {
  const braceletParts = allConfiguratorParts.filter((p) =>
    braceletSlots.some((s) => s.slotType === p.slotType)
  );

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <ConfiguratorShell
          productType="bracelet"
          slots={braceletSlots}
          parts={braceletParts}
        />
      </main>
      <Footer />
    </>
  );
}
