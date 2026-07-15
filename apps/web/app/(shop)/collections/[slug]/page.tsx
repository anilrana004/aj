import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ProductCard from '@/components/product/ProductCard';

interface CollectionPageProps {
  params: { slug: string };
}

const COLLECTION_DATA: Record<string, { name: string; description: string }> = {
  necklaces: { name: 'Necklaces', description: 'Layered narratives in metal and stone. Each necklace is an interplay of chain, pendant, and finish — designed to carry meaning and grace.' },
  bracelets: { name: 'Bracelets', description: 'Quiet elegance for the wrist. From stacked bangles to delicate chains, our bracelets are made to be worn daily and treasured always.' },
  malas: { name: 'Malas', description: 'Sacred craft, wearable devotion. Our malas combine traditional rudraksha, gemstone, and bronze beads with contemporary design sensibility.' },
  rings: { name: 'Rings', description: 'Statements worn close. Our rings range from everyday signets to bold cocktail pieces, each handcrafted with attention to weight, balance, and texture.' },
  earrings: { name: 'Earrings', description: 'Framing the face with intention. From jhumkas to minimal studs, our earrings bring together heritage technique and modern restraint.' },
};

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const col = COLLECTION_DATA[params.slug];
  return buildMetadata({
    title: col?.name || params.slug,
    description: col?.description || `Shop ${col?.name || params.slug} from Apriliha Singh.`,
    path: `/collections/${params.slug}`,
  });
}

export default function CollectionDetailPage({ params }: CollectionPageProps) {
  const collection = COLLECTION_DATA[params.slug] || {
    name: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
    description: '',
  };

  const products = [
    { slug: `oxidized-bronze-${params.slug}-1`, name: `Oxidized Bronze ${collection.name} — Classic`, price: 18500, category: collection.name, isBespoke: false },
    { slug: `gold-flat-${params.slug}-2`, name: `Matte Gold ${collection.name} — Heritage`, price: 28000, category: collection.name, isBespoke: false },
    { slug: `bespoke-${params.slug}-3`, name: `Design Your Own ${collection.name.slice(0, -1)}`, price: 15000, category: collection.name, isBespoke: true },
    { slug: `terracotta-${params.slug}-4`, name: `Terracotta ${collection.name} — Everyday`, price: 12000, category: collection.name, isBespoke: false },
  ];

  return (
    <>
      <Breadcrumbs />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aprilihasingh.com/' },
            { '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://aprilihasingh.com/collections' },
            { '@type': 'ListItem', position: 3, name: collection.name, item: `https://aprilihasingh.com/collections/${params.slug}` },
          ],
        }}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-display text-aubergine text-center mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-body-lg text-bronze text-center max-w-2xl mx-auto mb-16 leading-relaxed">
              {collection.description}
            </p>
          )}

          {/* Bespoke CTA */}
          <div className="bg-stone/30 p-8 mb-16 text-center">
            <p className="text-label uppercase tracking-widest text-bronze/60 mb-2">Bespoke Option</p>
            <p className="font-serif text-subhead text-aubergine mb-4">
              Design your own {collection.name.slice(0, -1).toLowerCase()}
            </p>
            <a
              href={`/build/${params.slug.replace(/s$/, '')}`}
              className="inline-block h-10 px-6 bg-terracotta text-sand-light text-label uppercase tracking-widest hover:bg-bronze transition-colors"
            >
              Open Builder
            </a>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
