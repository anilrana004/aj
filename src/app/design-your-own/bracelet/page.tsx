import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { braceletSlots, getPartsForProductType } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Bracelet — Bespoke Builder',
  description: 'Build your own bespoke bracelet part by part with live assembly.',
};

export default function BraceletBuilderPage() {
  const braceletParts = getPartsForProductType('bracelet');

  return (
    <>
      <Header />
      <main className="site-main">
        <ConfiguratorShell productType="bracelet" slots={braceletSlots} parts={braceletParts} />
      </main>
      <Footer />
    </>
  );
}
