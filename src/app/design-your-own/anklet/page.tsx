import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfiguratorShell } from '@/components/configurator/ConfiguratorShell';
import { ankletSlots, getPartsForProductType } from '@/lib/data/configurator-parts';

export const metadata: Metadata = {
  title: 'Design Your Anklet — Bespoke Builder',
  description: 'Build your anklet with an optional charm that settles once into place.',
};

export default function AnkletBuilderPage() {
  const ankletParts = getPartsForProductType('anklet');

  return (
    <>
      <Header />
      <main className="site-main">
        <ConfiguratorShell productType="anklet" slots={ankletSlots} parts={ankletParts} />
      </main>
      <Footer />
    </>
  );
}
