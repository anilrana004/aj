import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ProductCard from '@/components/product/ProductCard';

export const metadata: Metadata = buildMetadata({
  title: 'Collections',
  description: 'Explore the fine jewelry collections by Apriliha Singh — necklaces, bracelets, malas, rings, and earrings, handcrafted in Jaipur.',
  path: '/collections',
});

const COLLECTIONS = [
  { slug: 'necklaces', name: 'Necklaces', description: 'Layered narratives in metal and stone.' },
  { slug: 'bracelets', name: 'Bracelets', description: 'Quiet elegance for the wrist.' },
  { slug: 'malas', name: 'Malas', description: 'Sacred craft, wearable devotion.' },
  { slug: 'rings', name: 'Rings', description: 'Statements worn close.' },
  { slug: 'earrings', name: 'Earrings', description: 'Framing the face with intention.' },
];

const SAMPLE_PRODUCTS = [
  { slug: 'oxidized-bronze-chain-necklace', name: 'Oxidized Bronze Chain Necklace', price: 18500, category: 'Necklaces', isBespoke: false },
  { slug: 'jaipur-ruby-pendant', name: 'Jaipur Ruby Pendant', price: 34000, category: 'Necklaces', isBespoke: false },
  { slug: 'stacked-bronze-bangle', name: 'Stacked Bronze Bangle', price: 12000, category: 'Bracelets', isBespoke: false },
  { slug: 'rudraksha-mala', name: 'Rudraksha & Bronze Mala', price: 22000, category: 'Malas', isBespoke: true },
  { slug: 'signet-ring-terracotta', name: 'Terracotta Seal Ring', price: 9500, category: 'Rings', isBespoke: false },
  { slug: 'jhumka-earrings', name: 'Oxidized Jhumka Earrings', price: 15000, category: 'Earrings', isBespoke: false },
];

export default function CollectionsPage() {
  return (
    <>
      <Breadcrumbs />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aprilihasingh.com/' },
            { '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://aprilihasingh.com/collections' },
          ],
        }}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-display text-aubergine text-center mb-4">Collections</h1>
          <p className="text-body-lg text-bronze text-center max-w-xl mx-auto mb-16">
            Each collection tells a story — of material, maker, and the quiet art of adornment.
          </p>

          {/* Collection Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {COLLECTIONS.map((col) => (
              <a
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="px-6 py-3 border border-stone/40 text-label uppercase tracking-widest text-bronze hover:border-terracotta hover:text-terracotta transition-colors"
              >
                {col.name}
              </a>
            ))}
          </div>

          {/* Featured Products */}
          <h2 className="font-serif text-headline text-aubergine mb-10">Featured Pieces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
