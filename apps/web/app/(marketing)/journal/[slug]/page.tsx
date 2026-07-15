import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { FadeIn } from '@/components/ui/Animations';

interface JournalArticlePageProps {
  params: { slug: string };
}

const ARTICLES_DB: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
}> = {
  'the-art-of-oxidized-bronze': {
    title: 'The Art of Oxidized Bronze',
    category: 'Craftsmanship',
    date: '2024-12-15',
    author: 'Apriliha Singh',
    content: `
## The Beauty of Controlled Decay

Oxidation is not damage — it is intention. In our Jaipur atelier, we use a traditional patination process that darkens bronze through controlled chemical reactions, creating a surface that feels ancient and contemporary at the same time.

The technique has been used in Indian metalwork for centuries, originally to protect copper alloys from further corrosion. Today, it serves a different purpose: it gives each piece a depth of tone that cannot be achieved through polishing or plating alone.

## How It Works

Our artisans begin with a raw bronze piece — already shaped, already finished in form. The oxidation bath follows. A solution of specific compounds is applied in a controlled environment, and the surface begins to darken. The artisan watches, adjusts timing, and removes the piece at precisely the right moment.

The result is not uniform. Each piece develops its own pattern of light and shadow, its own particular darkness. This is what gives oxidized bronze its character — no two pieces are identical.

## Living with Oxidation

An oxidized bronze piece will continue to change subtly with wear. Areas that receive more contact — a pendant that rests against skin, a bracelet clasp — will gradually lighten, creating a natural patina that tells the story of how the piece is worn. This is not a flaw. It is the nature of a living material.

With proper care, your oxidized bronze piece will develop a rich, personal character over years of wear.
    `,
  },
  'jaipur-gemstone-heritage': {
    title: 'Jaipur's Gemstone Heritage',
    category: 'Story',
    date: '2024-11-28',
    author: 'Apriliha Singh',
    content: `
## The Pink City of Gems

Jaipur has been India's gemstone capital since the 18th century, when Maharaja Sawai Jai Singh II established the city as a center for trade and craftsmanship. Today, the old city's bazaars still glow with the colors of uncut rubies, sapphires, and emeralds.

## A Living Tradition

The families who cut and polish gemstones in Jaipur today are following techniques passed down through generations. A master cutter can shape a stone by hand with remarkable precision — a skill that takes decades to develop.

At Apriliha Singh, we work with these artisans to source and prepare the stones that become part of our jewelry. Each stone is selected not just for its color and clarity, but for its story — where it came from, who cut it, and what tradition it carries.
    `,
  },
};

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const article = ARTICLES_DB[params.slug];
  return buildMetadata({
    title: article?.title || params.slug.replace(/-/g, ' '),
    description: article?.content.slice(0, 160) || '',
    path: `/journal/${params.slug}`,
    type: 'article',
    publishedAt: article?.date,
  });
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const article = ARTICLES_DB[params.slug];

  if (!article) {
    return (
      <section className="py-20 text-center">
        <h1 className="font-serif text-headline text-aubergine">Article Not Found</h1>
      </section>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <JsonLd
        type="Article"
        data={{
          headline: article.title,
          datePublished: article.date,
          author: { '@type': 'Person', name: article.author },
        }}
      />

      <article className="py-12 lg:py-20">
        <div className="max-w-[700px] mx-auto px-6">
          <FadeIn>
            <p className="text-label uppercase tracking-widest text-saffron mb-4">{article.category}</p>
            <h1 className="font-serif text-display text-aubergine leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-caption text-bronze/50 mb-12">
              <span>{article.author}</span>
              <span>·</span>
              <time>
                {new Date(article.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </FadeIn>

          {/* Cover Image */}
          <FadeIn>
            <div className="aspect-[16/9] bg-stone/20 mb-12">
              <div className="w-full h-full bg-gradient-to-br from-sand/50 to-stone/60" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.1}>
            <div className="prose-artisan">
              {article.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-serif text-headline text-aubergine mt-12 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-body text-bronze leading-relaxed mb-6">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
