import { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import PriceTag from '@/components/product/PriceTag';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return buildMetadata({
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: `Handcrafted fine jewelry by Apriliha Singh. Shop this piece from our Jaipur atelier.`,
    path: `/product/${params.slug}`,
  });
}

const PRODUCT_DATA: Record<string, any> = {
  'oxidized-bronze-chain-necklace': {
    name: 'Oxidized Bronze Chain Necklace',
    price: 18500,
    description: 'A statement chain in oxidized bronze, hand-finished in our Jaipur atelier. Each link is individually shaped and darkened using traditional patination techniques, creating a depth of tone that deepens with wear.',
    materials: ['Oxidized Bronze', 'Hand-finished'],
    careInstructions: 'Store in the provided cloth pouch. Avoid contact with water, perfume, and harsh chemicals. The patina will develop a unique character over time — this is a feature, not a flaw.',
    artisanNote: 'This piece is handcrafted by artisans in Jaipur using the oxidation technique traditionally used for antique-finish bronze jewelry.',
    artisanRegion: 'Jaipur, Rajasthan',
    images: ['/images/product-1.jpg', '/images/product-1b.jpg', '/images/product-1c.jpg'],
    collection: { name: 'Necklaces', slug: 'necklaces' },
    weight: '38g',
    leadTimeDays: 0,
    isBespoke: false,
  },
};

const PLACEHOLDER_PRODUCT = {
  name: 'Product',
  price: 15000,
  description: 'A beautifully handcrafted piece from our Jaipur atelier. Each item carries the mark of traditional Indian metalwork refined through contemporary design.',
  materials: ['Bronze', 'Hand-finished'],
  careInstructions: 'Store in a cool, dry place. Avoid direct contact with water and chemicals.',
  artisanNote: 'Handcrafted in our atelier in Jaipur, Rajasthan.',
  artisanRegion: 'Jaipur, Rajasthan',
  images: ['/images/product-placeholder.jpg'],
  collection: { name: 'Collection', slug: 'collections' },
  weight: '30g',
  leadTimeDays: 0,
  isBespoke: false,
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCT_DATA[params.slug] || { ...PLACEHOLDER_PRODUCT, name: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) };

  return (
    <>
      <Breadcrumbs />
      <JsonLd
        type="Product"
        data={{
          name: product.name,
          description: product.description,
          image: product.images,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
          brand: { '@type': 'Brand', name: 'Apriliha Singh' },
        }}
      />

      <section className="py-10 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} />

            {/* Details */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-2">
                {product.collection.name}
              </p>
              <h1 className="font-serif text-headline text-aubergine mb-4">
                {product.name}
              </h1>
              <PriceTag price={product.price} size="lg" />

              <p className="mt-6 text-body text-bronze leading-relaxed">
                {product.description}
              </p>

              {/* Materials */}
              <div className="mt-6">
                <p className="text-label uppercase tracking-widest text-bronze/60 mb-2">Materials</p>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m: string) => (
                    <span key={m} className="px-3 py-1 bg-stone/30 text-body text-bronze">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weight */}
              {product.weight && (
                <p className="mt-4 text-body text-bronze">
                  <span className="text-label uppercase tracking-widest text-bronze/60">Weight: </span>
                  {product.weight}
                </p>
              )}

              {/* Lead Time */}
              <p className="mt-4 text-body text-bronze">
                {product.leadTimeDays > 0
                  ? `${product.leadTimeDays} business days lead time`
                  : 'Ships within 2-3 business days'}
              </p>

              {/* Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1">
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  ♡ Wishlist
                </Button>
              </div>

              {/* Cross-link to bespoke */}
              <p className="mt-6 text-body text-bronze/60">
                Or{' '}
                <Link href={`/build/${product.collection.slug.replace(/s$/, '')}`} className="text-terracotta underline hover:text-bronze transition-colors">
                  design your own
                </Link>
                {' '}in our bespoke builder.
              </p>

              {/* Accordions */}
              <div className="mt-10 border-t border-stone/30">
                <Accordion title="Artisan Note">
                  <p className="text-body text-bronze leading-relaxed">{product.artisanNote}</p>
                  <p className="mt-2 text-caption text-bronze/50">{product.artisanRegion}</p>
                </Accordion>
                <Accordion title="Shipping & Returns">
                  <p className="text-body text-bronze leading-relaxed">
                    Free shipping on all orders. Standard delivery within 5-7 business days for ready-to-wear pieces. Bespoke items follow the lead time shown above. Returns accepted within 14 days of delivery for unworn items.
                  </p>
                </Accordion>
                <Accordion title="Care Instructions">
                  <p className="text-body text-bronze leading-relaxed">{product.careInstructions}</p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
