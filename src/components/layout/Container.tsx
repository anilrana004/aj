'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'full' | 'reading' | 'section';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'full', children, ...props }, ref) => {
    const sizes = {
      full: 'max-w-[1440px] mx-auto px-[80px]',
      reading: 'max-w-[640px] mx-auto px-6',
      section: 'max-w-[1440px] mx-auto px-[80px] py-48',
    };

    const responsivePadding = `
      @media (max-width: 1024px) {
        .container-responsive { padding-left: 1.5rem; padding-right: 1.5rem; }
      }
      @media (max-width: 640px) {
        .container-responsive { padding-left: 1rem; padding-right: 1rem; }
      }
    `;

    return (
      <div
        ref={ref}
        className={cn('container-responsive', sizes[size], className)}
        {...props}
      >
        <style jsx>{responsivePadding}</style>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export const Divider = ({ className, variant = 'ink' }: { className?: string; variant?: 'ink' | 'gold' }) => (
  <hr className={cn(`divider-${variant}`, className)} aria-hidden="true" />
);

export const Section = ({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className={cn('section-container', className)}>
    {children}
  </section>
);

export const ReadingContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('reading-container', className)}>
    {children}
  </div>
);