import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ArticleCard from '@/components/product/ArticleCard';

export const metadata: Metadata = buildMetadata({
  title: 'Journal',
  description: 'Stories from the Apriliha Singh atelier — craftsmanship, design, heritage, and the art of fine jewelry.',
  path: '/journal',
});

const ARTICLES = [
  {
    slug: 'the-art-of-oxidized-bronze',
    title: 'The Art of Oxidized Bronze',
    excerpt: 'How our artisans achieve the distinctive dark patina that gives each piece its timeless depth and character.',
    category: 'Craftsmanship',
    date: '2024-12-15',
  },
  {
    slug: 'jaipur-gemstone-heritage',
    title: 'Jaipur\'s Gemstone Heritage',
    excerpt: 'A journey through the pink city\'s centuries-old gem-cutting traditions and the families who have kept them alive.',
    category: 'Story',
    date: '2024-11-28',
  },
  {
    slug: 'building-your-first-mala',
    title: 'Building Your First Mala',
    excerpt: 'A guide to choosing the right parts for a mala that carries personal meaning — from rudraksha to gemstone to bronze.',
    category: 'Guide',
    date: '2024-11-10',
  },
  {
    slug: 'quiet-luxury-jewelry',
    title: 'Quiet Luxury in Jewelry Design',
    excerpt: 'Why the most meaningful pieces are often the quietest — and how restraint became our design language.',
    category: 'Editorial',
    date: '2024-10-25',
  },
  {
    slug: 'rudraksha-origin-story',
    title: 'The Origin of Rudraksha',
    excerpt: 'From the forests of Nepal to the ateliers of Jaipur — the sacred journey of rudraksha beads.',
    category: 'Story',
    date: '2024-10-12',
  },
  {
    slug: 'care-guide-bronze-jewelry',
    title: 'Caring for Bronze Jewelry',
    excerpt: 'Everything you need to know about maintaining the patina and beauty of your bronze jewelry pieces.',
    category: 'Guide',
    date: '2024-09-30',
  },
];

export default function JournalPage() {
  return (
    <>
      <Breadcrumbs />
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-display text-aubergine text-center mb-4">Journal</h1>
          <p className="text-body-lg text-bronze text-center max-w-xl mx-auto mb-16">
            Stories from the atelier — of craft, heritage, and the art of adornment.
          </p>

          {/* Featured */}
          <ArticleCard {...ARTICLES[0]} />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {ARTICLES.slice(1).map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
