'use client';

import Link from 'next/link';
import { products, collections, journalArticles } from '@/lib/data';
import { img } from '@/lib/images';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export function HomeContent() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const activeCollections = collections.filter((c) => c.isActive);
  const latestArticles = journalArticles.slice(0, 4);

  return (
    <>
      <HeroCarousel />

      {/* Notes */}
      <section className="section-gap" aria-labelledby="notes-title">
        <SectionHeader title="NOTES" exploreHref="/journal" />
        <div className="carousel-track mt-5 md:mt-10">
          {latestArticles.map((article) => (
            <Link key={article.slug} href={`/journal/${article.slug}`} className="carousel-item u-hover-fade block">
              <div className="overflow-hidden bg-bg-secondary" style={{ aspectRatio: '1.308 / 1' }}>
                <img src={article.heroImage} alt={article.heroImageAlt} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 md:mt-[15px] px-2.5 text-text-primary uppercase" style={{ fontSize: '11px', letterSpacing: '0.13em', lineHeight: 1.73 }}>
                {article.title}
              </p>
              <p className="mt-2.5 px-2.5 text-text-muted uppercase line-clamp-2" style={{ fontSize: '10px', letterSpacing: '0.13em', lineHeight: 1.67 }}>
                {article.dek}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Category split */}
      <section className="section-gap" aria-label="Featured collections">
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-[10px]">
          {activeCollections.slice(0, 2).map((collection) => (
            <Link key={collection.slug} href={`/collections/${collection.slug}`} className="relative block w-full md:w-[calc(50%-5px)] overflow-hidden u-hover-fade">
              <div className="bg-bg-secondary aspect-[4/5] md:aspect-[3/4]">
                <img src={collection.heroImage} alt={collection.heroImageAlt} className="w-full h-full object-cover" />
              </div>
              <span className="absolute top-1/2 left-[4.6875vw] -translate-y-1/2 text-ivory-text uppercase max-md:left-[4.05vw]" style={{ fontSize: '15px', letterSpacing: '0.13em', lineHeight: 1.4, width: 'calc(100% - 9.375vw)' }}>
                {collection.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New In */}
      <section className="section-gap" aria-labelledby="newin-title">
        <SectionHeader title="NEW IN" exploreHref="/gallery?filter=new" exploreLabel="EXPLORE" />
        <div className="carousel-track mt-5">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="carousel-item u-hover-fade block group">
              <div className="relative overflow-hidden bg-bg-secondary aspect-[3/4]">
                <img src={product.images[0]?.url} alt={product.images[0]?.alt || product.name} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                {product.images[1] && (
                  <img src={product.images[1].url} alt={product.images[1].alt} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                )}
              </div>
              <p className="product-name uppercase">{product.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <ProjectsSection />

      {/* One craft quote wall — palette depth without a full-color rhythm */}
      <section className="section-gap craft-quote" aria-label="Craft philosophy">
        <span className="craft-quote__mark">Bespoke craftsmanship</span>
        <p className="craft-quote__text">
          Quiet luxury from Jaipur — part by part, story by story, made to be lived in.
        </p>
      </section>

      {/* Elevations banner */}
      <section className="section-gap relative" aria-labelledby="bespoke-banner">
        <Link href="/design-your-own" className="block relative u-hover-fade overflow-hidden">
          <div className="bg-bg-secondary aspect-[21/9] max-md:aspect-[4/5]">
            <img src={img.homeHero} alt="Design your own jewelry" className="w-full h-full object-cover" />
          </div>
          <h2 id="bespoke-banner" className="absolute top-1/2 left-[4.6875vw] -translate-y-1/2 text-ivory-text uppercase max-md:left-[4.05vw]" style={{ fontSize: '15px', letterSpacing: '0.13em' }}>
            Design Your Own
          </h2>
        </Link>
      </section>

      {/* Products split */}
      <section className="section-gap flex flex-col md:flex-row md:items-center" aria-labelledby="featured-piece">
        <div className="relative w-full md:w-1/2 overflow-hidden">
          <Link href="/atelier" className="block u-hover-fade">
            <div className="bg-bg-secondary aspect-[4/5]">
              <img src={img.atelierPreview} alt="The Atelier" className="w-full h-full object-cover" />
            </div>
            <span id="featured-piece" className="absolute top-1/2 left-[4.6875vw] -translate-y-1/2 text-ivory-text uppercase max-md:left-[4.05vw]" style={{ fontSize: '15px', letterSpacing: '0.13em' }}>
              The Atelier
            </span>
          </Link>
        </div>
        {featuredProducts[0] && (
          <div className="w-[58.7vw] mx-auto mt-[25vw] md:w-[27.73%] md:mt-0 md:ml-[11.72%]">
            <Link href={`/product/${featuredProducts[0].slug}`} className="block u-hover-fade">
              <div className="overflow-hidden bg-bg-secondary aspect-[3/4]">
                <img src={featuredProducts[0].images[0]?.url} alt={featuredProducts[0].images[0]?.alt || featuredProducts[0].name} className="w-full h-full object-cover" />
              </div>
              <p className="product-name uppercase">{featuredProducts[0].name}</p>
            </Link>
          </div>
        )}
      </section>

      {/* Collections */}
      <section className="section-gap" aria-labelledby="collections-more">
        <SectionHeader title="COLLECTIONS" exploreHref="/collections" exploreLabel="VIEW ALL" />
        <div className="flex gap-2.5 md:gap-[10px] mt-10 px-[0.78%] max-md:px-[3.8vw] max-md:gap-[1.27vw] max-md:mt-[4.56vw] overflow-x-auto scrollbar-hide">
          {activeCollections.map((collection) => (
            <Link key={collection.slug} href={`/collections/${collection.slug}`} className="block shrink-0 w-[calc(625/1260*100%)] max-md:w-[70vw] u-hover-fade">
              <div className="overflow-hidden bg-bg-secondary" style={{ aspectRatio: '1.308 / 1' }}>
                <img src={collection.thumbnailImage} alt={collection.heroImageAlt} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 px-2.5 text-text-primary uppercase" style={{ fontSize: '11px', letterSpacing: '0.13em', lineHeight: 1.73 }}>{collection.name}</p>
              <p className="mt-2.5 px-2.5 text-text-muted uppercase line-clamp-2" style={{ fontSize: '10px', letterSpacing: '0.13em', lineHeight: 1.67 }}>{collection.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section-gap mb-[100px]" aria-labelledby="about-teaser">
        <SectionHeader title="ABOUT" exploreHref="/atelier" />
        <div className="flex gap-2.5 md:gap-[10px] mt-10 px-[0.78%] max-md:px-[3.8vw] max-md:mt-[4.56vw]">
          <Link href="/atelier" className="block w-full md:w-[calc(625/1260*100%)] u-hover-fade">
            <div className="overflow-hidden bg-bg-secondary" style={{ aspectRatio: '1.308 / 1' }}>
              <img src={img.atelierPreview} alt="About Apriliha Singh" className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 px-2.5 text-text-primary uppercase" style={{ fontSize: '11px', letterSpacing: '0.13em' }}>Jewelry you can live in.</p>
            <p className="mt-1 px-2.5 text-text-muted uppercase" style={{ fontSize: '10px', letterSpacing: '0.13em', lineHeight: 1.67 }}>
              Fine bespoke jewelry from Jaipur. Handcrafted by master karigars.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
