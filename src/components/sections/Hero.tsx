'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export interface SectionHeaderProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
}

export function SectionHeader({ id, eyebrow, title, description, alignment = 'left' }: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const marginClasses = {
    left: 'mx-0',
    center: 'mx-auto',
    right: 'ml-auto mr-0',
  };

  return (
    <header id={id} className={cn('max-w-[640px]', marginClasses[alignment], alignClasses[alignment])}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-h2 mb-4 uppercase">{title}</h2>
      {description && (
        <p className="font-ui text-body text-text-muted">{description}</p>
      )}
    </header>
  );
}

export interface HeroProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaVariant?: 'primary' | 'ghost' | 'ghost-inverse';
  alignment?: 'left' | 'center' | 'right';
  overlay?: boolean;
}

export function Hero({ image, imageAlt, title, description, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden" aria-labelledby="hero-title">
      <div
        className="relative w-full bg-bg-secondary max-md:h-[calc(100svh-var(--announcement-h-sp)-var(--header-h-sp))]"
        style={{ aspectRatio: '1.531 / 1' }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <h1
          id="hero-title"
          className="absolute top-1/2 left-[4.6875vw] -translate-y-1/2 text-text-inverse uppercase max-md:left-[4.05vw] z-10"
          style={{ fontSize: '15px', letterSpacing: '0.13em', fontWeight: 400, maxWidth: '42%' }}
        >
          {title}
        </h1>
      </div>
      {(description || (ctaText && ctaHref)) && (
        <div className="px-responsive py-10 max-w-[640px]">
          {description && (
            <p className="text-body text-text-muted mb-6 uppercase">{description}</p>
          )}
          {ctaText && ctaHref && (
            <Link href={ctaHref} className="btn-outline">
              {ctaText}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
