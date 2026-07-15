'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SidekickCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description?: string;
  ctaText: string;
  href: string;
  className?: string;
  priority?: boolean;
}

export function SidekickCard({ image, imageAlt, title, description, ctaText, href, className, priority = false }: SidekickCardProps) {
  return (
    <article className={cn('group', className)}>
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="font-ui text-caption text-text-inverse inline-flex items-center gap-2">
              {ctaText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-display text-h3 group-hover:text-accent-primary transition-colors duration-200">
            {title}
          </h3>
          {description && (
            <p className="font-ui text-small text-text-primary/60">
              {description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
