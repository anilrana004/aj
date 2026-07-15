'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'bespoke' | 'new' | 'sale';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-label uppercase tracking-widest px-2.5 py-1',
        {
          'bg-aubergine/10 text-aubergine': variant === 'default',
          'bg-terracotta/10 text-terracotta': variant === 'bespoke',
          'bg-saffron/10 text-saffron': variant === 'new',
          'bg-rust/10 text-rust': variant === 'sale',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
