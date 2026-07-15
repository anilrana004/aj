'use client';

import { motion } from 'framer-motion';
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
      <h2 className="font-display text-h2 mb-6">{title}</h2>
      {description && (
        <p className="font-ui text-body text-text-primary/70">{description}</p>
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

export function Hero({ image, imageAlt, eyebrow, title, description, ctaText, ctaHref, ctaVariant = 'primary', alignment = 'left', overlay = true }: HeroProps) {
  return (
    <section className="hero-container" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/30 to-transparent" />
        )}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className={cn('max-w-[640px]', alignment === 'center' ? 'mx-auto text-center' : alignment === 'right' ? 'ml-auto text-right' : '')}>
          {eyebrow && (
            <motion.p
              className="eyebrow-gold mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            id="hero-title"
            className="font-display text-hero text-text-inverse mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="font-ui text-body text-text-inverse/75 mb-10 max-w-[500px]"
              style={{ marginLeft: alignment === 'center' ? 'auto' : alignment === 'right' ? 'auto' : 0, marginRight: alignment === 'center' ? 'auto' : alignment === 'left' ? 'auto' : 0 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {description}
            </motion.p>
          )}
          {ctaText && ctaHref && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link href={ctaHref} className={ctaVariant === 'ghost-inverse' ? 'btn-outline-inverse' : ctaVariant === 'ghost' ? 'btn-outline' : 'btn-primary'}>
                {ctaText}
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.svg
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="text-text-inverse/40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
