import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { necklaceSlots, allConfiguratorParts } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Necklace — Bespoke Builder',
  description: 'Build your own bespoke necklace chain by chain, stone by stone. Each part handcrafted in our Jaipur atelier.',
};

export default function NecklaceBuilderPage() {
  const necklaceParts = allConfiguratorParts.filter((p) =>
    necklaceSlots.some((s) => s.slotType === p.slotType)
  );

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <ConfiguratorShell
          productType="necklace"
          slots={necklaceSlots}
          parts={necklaceParts}
        />
      </main>
      <Footer />
    </>
  );
}
