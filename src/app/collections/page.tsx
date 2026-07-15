import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { CollectionsContent } from '@/components/collections/CollectionsContent';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Discover our curated collections of fine bespoke jewelry — each a story rendered in gold and stone.',
};

export default function CollectionsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Collections', url: 'https://aprilihasingh.com/collections' },
        ]}
      />
      <Header />
      <main id="main-content">
        <CollectionsContent />
      </main>
      <Footer />
    </>
  );
}
