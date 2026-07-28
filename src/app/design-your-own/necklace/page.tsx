import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { necklaceSlots, getPartsForProductType } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Necklace — Bespoke Builder',
  description: 'Build your own bespoke necklace part by part. Watch it assemble in real time.',
};

export default function NecklaceBuilderPage() {
  const necklaceParts = getPartsForProductType('necklace');

  return (
    <>
      <Header />
      <main className="site-main">
        <ConfiguratorShell productType="necklace" slots={necklaceSlots} parts={necklaceParts} />
      </main>
      <Footer />
    </>
  );
}
