'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from './Hero';
import { Reveal, FadeIn, ScaleIn } from '@/components/ui/Animate';

interface PhilosophyStripProps {
  text: string;
  backgroundColor?: 'burnt-saffron' | 'warm-stone' | 'dark-aubergine';
  alignment?: 'left' | 'center' | 'right';
}

export function PhilosophyStrip({ text, backgroundColor = 'burnt-saffron', alignment = 'center' }: PhilosophyStripProps) {
  const bgColors = {
    'burnt-saffron': 'bg-accent-primary',
    'warm-stone': 'bg-bg-secondary',
    'dark-aubergine': 'bg-bg-dark text-text-inverse',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section className={cn('py-32 px-responsive', bgColors[backgroundColor], alignClasses[alignment])} aria-label="Brand philosophy">
      <div className="max-w-[1440px] mx-auto">
        <Reveal direction="none" duration={0.8}>
          <p className="font-display italic text-h2 leading-snug max-w-[800px]" style={{ margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : 0 }}>
            {text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

interface FeaturedCollectionProps {
  collection: {
    name: string;
    story: string;
    image: string;
    imageAlt: string;
    slug: string;
  };
  reverse?: boolean;
}

export function FeaturedCollection({ collection, reverse = false }: FeaturedCollectionProps) {
  return (
    <section className="py-48 px-responsive" aria-labelledby={`collection-${collection.slug}-title`}>
      <div className="max-w-[1440px] mx-auto">
        <div className={cn('grid lg:grid-cols-12 gap-16 items-center', reverse && 'lg:grid-flow-dense')}>
          <div className={cn('lg:col-span-7', reverse && 'lg:col-start-6')}>
            <ScaleIn>
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </ScaleIn>
          </div>
          <div className={cn('lg:col-span-5', reverse && 'lg:col-start-1')}>
            <Reveal delay={0.2} direction={reverse ? 'left' : 'right'}>
              <SectionHeader
                id={`collection-${collection.slug}-title`}
                eyebrow="FEATURED COLLECTION"
                title={collection.name}
                description={collection.story}
                alignment={reverse ? 'right' : 'left'}
              />
              <div className="mt-12">
                <Link
                  href={`/collections/${collection.slug}`}
                  className="font-ui text-caption underline-gold inline-flex items-center gap-2"
                >
                  View Collection
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

interface AtelierPreviewProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
}

export function AtelierPreview({ title, description, image, imageAlt, ctaText, ctaHref }: AtelierPreviewProps) {
  return (
    <section className="relative py-48 px-responsive" aria-labelledby="atelier-preview-title">
      <div className="max-w-[1440px] mx-auto">
        <FadeIn>
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark to-transparent" />
            <div className="absolute inset-0 flex items-end px-12 pb-12">
              <div className="max-w-[600px]">
                <SectionHeader
                  id="atelier-preview-title"
                  eyebrow="THE ATELIER"
                  title={title}
                  description={description}
                  alignment="left"
                />
                <div className="mt-10">
                  <Link href={ctaHref} className="font-ui text-caption underline-gold inline-flex items-center gap-2 text-text-inverse">
                    {ctaText}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

interface JournalPreviewProps {
  articles: Array<{
    title: string;
    dek: string;
    slug: string;
    heroImage: string;
    heroImageAlt: string;
    author: string;
    publishedAt: string;
    readTime: number;
    category: string;
  }>;
}

export function JournalPreview({ articles }: JournalPreviewProps) {
  return (
    <section className="py-48 px-responsive" aria-labelledby="journal-preview-title">
      <div className="max-w-[1440px] mx-auto">
        <Reveal>
          <SectionHeader
            id="journal-preview-title"
            eyebrow="JOURNAL"
            title="Stories from the Atelier"
            description="Essays on craft, culture, and the quiet life of making."
            alignment="center"
          />
        </Reveal>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.1}>
              <article className={cn('group', index === 0 && 'md:col-span-2 lg:col-span-2')}>
                <Link href={`/journal/${article.slug}`} className="block">
                  <div className="aspect-[4/3] relative overflow-hidden mb-6">
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 font-ui text-caption" style={{ color: 'var(--color-accent-primary)' }}>
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime} min read</span>
                    </div>
                    <h3 className="font-display text-h3 group-hover:text-accent-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-ui text-body text-text-primary/70">{article.dek}</p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <Link href="/journal" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
              Read All Stories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface TestimonialStripProps {
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  autoRotate?: boolean;
  rotateInterval?: number;
}

export function TestimonialStrip({ testimonials, autoRotate = true, rotateInterval = 6000 }: TestimonialStripProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoRotate || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, testimonials.length, isHovered, rotateInterval]);

  return (
    <section
      className="bg-bg-dark py-32 px-responsive"
      aria-label="Testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto">
        <Reveal>
          <div className="relative max-w-[800px] mx-auto min-h-[200px]">
            {testimonials.map((testimonial, index) => (
              <blockquote
                key={index}
                className={cn(
                  'quote-block absolute inset-0 transition-opacity duration-700',
                  index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
              >
                <p>{testimonial.quote}</p>
                <footer className="mt-8 font-ui text-caption text-text-primary/60">
                  <cite>— {testimonial.author}</cite>
                  {testimonial.role && <span className="ml-2">, {testimonial.role}</span>}
                </footer>
              </blockquote>
            ))}

            {testimonials.length > 1 && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex justify-center gap-3" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'bg-accent-gold w-6'
                        : 'bg-text-inverse/30 hover:bg-text-inverse/60'
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface AppointmentCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  backgroundColor?: 'deep-terracotta' | 'dark-aubergine' | 'oxidized-bronze';
}

export function AppointmentCTA({ title, description, buttonText, buttonHref, backgroundColor = 'deep-terracotta' }: AppointmentCTAProps) {
  const bgColors = {
    'deep-terracotta': 'bg-accent-deep-terracotta',
    'dark-aubergine': 'bg-bg-dark',
    'oxidized-bronze': 'bg-accent-oxidized-bronze',
  };

  return (
    <section className={cn('py-32 px-responsive', bgColors[backgroundColor])} aria-labelledby="appointment-cta-title">
      <div className="max-w-[1440px] mx-auto text-center">
        <Reveal>
          <h2 id="appointment-cta-title" className="font-display text-h1 text-text-inverse mb-6">
            {title}
          </h2>
          <p className="font-ui text-body text-text-inverse/80 max-w-[600px] mx-auto mb-10">
            {description}
          </p>
          <Link href={buttonHref}>
            <Button variant="ghost-inverse" size="lg">
              {buttonText}
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
