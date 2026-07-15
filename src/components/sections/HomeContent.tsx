'use client';

import Link from 'next/link';
import { SidekickCard } from './SidekickCard';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Animate';
import { products, collections, journalArticles } from '@/lib/data';

export function HomeContent() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const activeCollections = collections.filter((c) => c.isActive);
  const latestArticles = journalArticles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end" aria-labelledby="hero-title">
        <div className="absolute inset-0 bg-bg-secondary">
          <img
            src="/images/home/hero.svg"
            alt="Apriliha Singh atelier interior with warm directional light"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent" />
        <div className="relative z-10 w-full px-responsive pb-20">
          <div className="max-w-[1440px] mx-auto">
            <h1 id="hero-title" className="font-display text-hero text-text-inverse mb-6 max-w-[700px]">
              Jewelry for life, not just occasions.
            </h1>
            <p className="font-ui text-body text-text-inverse/75 mb-8 max-w-[480px]">
              Fine bespoke jewelry from Jaipur. Handcrafted by master karigars.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/collections" className="btn-outline-inverse">
                Shop Collections
              </Link>
              <Link href="/design-your-own" className="btn-outline-inverse">
                Design Your Own
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-responsive py-20" aria-labelledby="brand-story-title">
        <div className="max-w-[1440px] mx-auto text-center">
          <Reveal>
            <p className="eyebrow mb-4">Our Story</p>
            <h2 id="brand-story-title" className="font-display text-h2 mb-6 max-w-[800px] mx-auto">
              Jewelry you can live in.
            </h2>
            <p className="font-ui text-body text-text-primary/60 max-w-[600px] mx-auto mb-8">
              For too long, fine jewelry was something you waited for. Reserved for birthdays.
              For anniversaries. Locked away in velvet boxes. We set out to change that.
            </p>
            <Link href="/atelier" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
              About Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-responsive py-16" aria-labelledby="collections-title">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2">Shop by Collection</p>
              <h2 id="collections-title" className="font-display text-h2">Find Your Story</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeCollections.map((collection, index) => (
              <Reveal key={collection.slug} delay={index * 0.1}>
                <SidekickCard
                  image={collection.heroImage}
                  imageAlt={collection.heroImageAlt}
                  title={collection.name}
                  description={collection.description}
                  ctaText="Shop Now"
                  href={`/collections/${collection.slug}`}
                  priority={index < 2}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-responsive py-20 bg-bg-secondary" aria-labelledby="featured-title">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2">Featured Pieces</p>
              <h2 id="featured-title" className="font-display text-h2">Worn Every Day</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.1}>
                <ProductCard product={product} priority={index < 2} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="text-center mt-12">
              <Link href="/collections" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
                View All Jewelry
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bespoke + Atelier Cards */}
      <section className="px-responsive py-20" aria-labelledby="bespoke-title">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary">
                <img
                  src="/images/home/hero.svg"
                  alt="Apriliha Singh atelier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="eyebrow-gold mb-2">Design Your Own</p>
                  <h2 id="bespoke-title" className="font-display text-h2 text-text-inverse mb-3">
                    Every piece begins with a conversation
                  </h2>
                  <p className="font-ui text-body text-text-inverse/65 mb-6 max-w-[400px]">
                    Use our configurator to build your piece — choose metals, stones, and clasps.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/design-your-own" className="btn-outline-inverse">
                      Start Designing
                    </Link>
                    <Link href="/appointment" className="btn-outline-inverse">
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary">
                <img
                  src="/images/atelier/preview.svg"
                  alt="Karigar at workbench"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="eyebrow-gold mb-2">The Atelier</p>
                  <h2 className="font-display text-h2 text-text-inverse mb-3">
                    Six stages. Zero shortcuts.
                  </h2>
                  <p className="font-ui text-body text-text-inverse/65 mb-6 max-w-[400px]">
                    Where charcoal sketches become heirlooms. Three generations of hands.
                  </p>
                  <Link href="/atelier" className="font-ui text-caption text-text-inverse underline-gold inline-flex items-center gap-2">
                    Visit the Atelier
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="px-responsive py-20 bg-bg-secondary" aria-labelledby="journal-title">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2">Journal</p>
              <h2 id="journal-title" className="font-display text-h2">Stories from the Atelier</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.1}>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-bg-secondary mb-4">
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="font-ui text-micro text-text-primary/40 mb-2">{article.category}</p>
                  <h3 className="font-display text-h3 group-hover:text-accent-primary transition-colors duration-200 mb-2">
                    {article.title}
                  </h3>
                  <p className="font-ui text-small text-text-primary/55">{article.dek}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-responsive py-20 bg-bg-dark" aria-labelledby="newsletter-title">
        <div className="max-w-[600px] mx-auto text-center">
          <Reveal>
            <p className="eyebrow-gold mb-4">Stay Connected</p>
            <h2 id="newsletter-title" className="font-display text-h2 text-text-inverse mb-4">
              Become a Member
            </h2>
            <p className="font-ui text-body text-text-inverse/60 mb-8">
              Early access to new pieces, artisan stories, and exclusive events.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-bg-darker/50 text-text-inverse font-ui text-body border border-transparent rounded-sm placeholder:text-text-inverse/30 focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
              <button type="submit" className="btn-outline-inverse">
                Join
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Sustainability */}
      <section className="px-responsive py-16" aria-labelledby="sustainability-title">
        <div className="max-w-[1440px] mx-auto text-center">
          <Reveal>
            <p className="eyebrow mb-4">Our Commitment</p>
            <h2 id="sustainability-title" className="font-display text-h2 mb-6">
              Sustainability Progress
            </h2>
            <p className="font-ui text-body text-text-primary/60 max-w-[700px] mx-auto mb-8">
              Our journey mirrors that of the jewelry we create — crafted through collaboration
              and constant evolution. We&apos;re here to transform fine jewelry into everyday moments.
            </p>
            <Link href="/atelier#materials" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
              View Our Materials & Ethics
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
