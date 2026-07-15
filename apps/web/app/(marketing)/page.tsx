import { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import HomeHero from '@/components/layout/HomeHero';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/ui/Animations';
import CollectionTile from '@/components/product/CollectionTile';
import ArticleCard from '@/components/product/ArticleCard';

export const metadata: Metadata = buildMetadata({
  title: 'Home',
  description:
    'Apriliha Singh — fine jewelry, bespoke and ready-to-wear. Handcrafted in Jaipur with quiet luxury and enduring craft.',
  path: '/',
});

const COLLECTIONS = [
  {
    slug: 'necklaces',
    name: 'Necklaces',
    image: '/images/collection-necklaces.jpg',
    description: 'Layered narratives in metal and stone',
  },
  {
    slug: 'bracelets',
    name: 'Bracelets',
    image: '/images/collection-bracelets.jpg',
    description: 'Quiet elegance for the wrist',
  },
  {
    slug: 'malas',
    name: 'Malas',
    image: '/images/collection-malas.jpg',
    description: 'Sacred craft, wearable devotion',
  },
  {
    slug: 'rings',
    name: 'Rings',
    image: '/images/collection-rings.jpg',
    description: 'Statements worn close',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HomeHero />

      {/* Philosophy Strip */}
      <section className="bg-stone py-20 lg:py-28">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center px-6">
            <p className="font-serif text-headline lg:text-display text-aubergine leading-tight">
              Crafted slowly, worn forever.
            </p>
            <p className="mt-6 text-body-lg text-bronze max-w-xl mx-auto leading-relaxed">
              Each piece from Apriliha Singh is born from Jaipur&apos;s centuries-old artisan traditions, refined through a modern lens of quiet luxury and enduring design.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Curated Collection Tiles */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-serif text-headline text-aubergine">Collections</h2>
              <Link
                href="/collections"
                className="text-label uppercase tracking-widest text-bronze hover:text-terracotta transition-colors hidden sm:block"
              >
                View All
              </Link>
            </div>
          </FadeIn>
          <FadeInStagger staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {COLLECTIONS.map((collection) => (
                <FadeInStaggerItem key={collection.slug}>
                  <CollectionTile {...collection} />
                </FadeInStaggerItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </section>

      {/* Bespoke Builder Callout */}
      <section className="bg-aubergine py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="aspect-[4/5] bg-bronze/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/30 to-aubergine/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-sand/30 text-display italic">Your Design</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="max-w-lg">
                <p className="text-label uppercase tracking-widest text-sand/40 mb-4">
                  Bespoke
                </p>
                <h2 className="font-serif text-headline text-sand leading-tight">
                  Design a Piece That Is Only Yours
                </h2>
                <p className="mt-6 text-body-lg text-sand/70 leading-relaxed">
                  Our bespoke builder lets you assemble a necklace, bracelet, or mala from curated parts — each with its own story, origin, and craft. Your design, handcrafted in our Jaipur atelier.
                </p>
                <Link
                  href="/build/necklace"
                  className="inline-block mt-8 h-12 px-8 bg-terracotta text-sand-light text-label uppercase tracking-widest hover:bg-saffron transition-colors duration-300"
                >
                  Design Yours
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Craftsmanship Teaser */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="max-w-lg order-2 lg:order-1">
                <p className="text-label uppercase tracking-widest text-bronze/60 mb-4">
                  Craftsmanship
                </p>
                <h2 className="font-serif text-headline text-aubergine leading-tight">
                  The Art of Making
                </h2>
                <p className="mt-6 text-body-lg text-bronze leading-relaxed">
                  In Jaipur, where gemstone cutting and metalwork have been practiced for centuries, our artisans transform raw materials into pieces that carry the weight of heritage and the lightness of modern design.
                </p>
                <Link
                  href="/craftsmanship"
                  className="inline-block mt-8 text-label uppercase tracking-widest text-terracotta hover:text-bronze transition-colors"
                >
                  Read Our Story →
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="aspect-[4/3] bg-sand relative overflow-hidden order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-sand to-stone" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-bronze/20 text-headline italic">Artisan at Work</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Journal Teaser */}
      <section className="bg-stone/40 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-serif text-headline text-aubergine">Journal</h2>
              <Link
                href="/journal"
                className="text-label uppercase tracking-widest text-bronze hover:text-terracotta transition-colors hidden sm:block"
              >
                All Stories
              </Link>
            </div>
          </FadeIn>
          <FadeInStagger staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  slug: 'the-art-of-oxidized-bronze',
                  title: 'The Art of Oxidized Bronze',
                  excerpt: 'How our artisans achieve the distinctive dark patina that gives each piece its timeless depth.',
                  category: 'Craftsmanship',
                  date: '2024-12-15',
                },
                {
                  slug: 'jaipur-gemstone-heritage',
                  title: 'Jaipur\'s Gemstone Heritage',
                  excerpt: 'A journey through the pink city\'s centuries-old gem-cutting traditions.',
                  category: 'Story',
                  date: '2024-11-28',
                },
                {
                  slug: 'building-your-first-mala',
                  title: 'Building Your First Mala',
                  excerpt: 'A guide to choosing the right parts for a mala that carries personal meaning.',
                  category: 'Guide',
                  date: '2024-11-10',
                },
              ].map((article) => (
                <FadeInStaggerItem key={article.slug}>
                  <ArticleCard {...article} />
                </FadeInStaggerItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </section>
    </>
  );
}
