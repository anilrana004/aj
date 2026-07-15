'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
}

export default function ArticleCard({ slug, title, excerpt, category, date }: ArticleCardProps) {
  return (
    <Link href={`/journal/${slug}`} className="group block">
      <div className="aspect-[3/2] bg-stone/50 mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-sand to-stone transition-transform duration-500 ease-default group-hover:scale-105" />
      </div>
      <p className="text-label uppercase tracking-widest text-saffron mb-2">{category}</p>
      <h3 className="font-serif text-subhead text-aubergine group-hover:text-terracotta transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-body text-bronze/70 line-clamp-2">{excerpt}</p>
      <p className="mt-3 text-caption text-bronze/50">
        {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </Link>
  );
}
