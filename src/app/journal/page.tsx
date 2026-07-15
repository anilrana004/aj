import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import { journalArticles } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Essays on craft, culture, and the quiet life of making — from the Apriliha Singh atelier.',
};

export default function JournalPage() {
  const featuredArticle = journalArticles.find((a) => a.isFeatured);
  const otherArticles = journalArticles.filter((a) => !a.isFeatured);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[60px]">
        <Hero
          image="/images/journal/hero.svg"
          imageAlt="Open journal on wooden desk with fountain pen"
          eyebrow="JOURNAL"
          title="Stories from the Atelier"
          description="Essays on craft, culture, and the quiet life of making."
          alignment="left"
        />

        {featuredArticle && (
          <section className="py-20 px-responsive" aria-labelledby="featured-title">
            <div className="max-w-[1440px] mx-auto">
              <article className="grid lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden">
                  <img
                    src={featuredArticle.heroImage}
                    alt={featuredArticle.heroImageAlt}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3 font-ui text-caption text-accent-primary">
                    <span>{featuredArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={featuredArticle.publishedAt}>{new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.readTime} min read</span>
                  </div>
                  <h2 id="featured-title" className="font-display text-h1">{featuredArticle.title}</h2>
                  <p className="font-ui text-body text-text-primary/60">{featuredArticle.dek}</p>
                  <div className="flex items-center gap-3 font-ui text-micro text-text-primary/40">
                    <span>By {featuredArticle.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.authorRole}</span>
                  </div>
                  <Link href={`/journal/${featuredArticle.slug}`} className="font-ui text-caption underline-gold inline-flex items-center gap-2 pt-4 border-t divider-ink">
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="all-stories-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="all-stories-title"
              eyebrow="ALL STORIES"
              title="Latest Essays"
              alignment="center"
            />

            <div className="mt-24 space-y-16">
              {otherArticles.map((article, index) => (
                <article key={article.slug} className={index % 2 === 1 ? 'flex flex-col-reverse' : ''}>
                  <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden">
                      <Link href={`/journal/${article.slug}`} className="block">
                        <img
                          src={article.heroImage}
                          alt={article.heroImageAlt}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div className="lg:col-span-6 space-y-6">
                      <div className="flex flex-wrap items-center gap-3 font-ui text-caption text-accent-primary">
                        <span>{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime} min read</span>
                      </div>
                      <h3 className="font-display text-h2">{article.title}</h3>
                      <p className="font-ui text-body text-text-primary/60">{article.dek}</p>
                      <Link href={`/journal/${article.slug}`} className="font-ui text-caption underline-gold inline-flex items-center gap-2">
                        Read Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="font-ui text-caption text-text-primary/40">More stories loading soon...</p>
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-dark text-text-inverse" aria-labelledby="newsletter-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <SectionHeader
              id="newsletter-title"
              eyebrow="STAY CONNECTED"
              title="The Monthly Note"
              description="One email a month. New journal stories, atelier updates, and early access to collections. No noise."
              alignment="center"
            />
            <form className="mt-12 max-w-[400px] mx-auto flex flex-col sm:flex-row gap-4" action="/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input-field-dark flex-1"
                required
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="mt-6 font-ui text-micro text-text-inverse/35">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}