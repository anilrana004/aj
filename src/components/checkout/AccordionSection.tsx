'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AccordionSectionProps {
  number: number;
  title: string;
  summary?: string;
  isActive: boolean;
  isCompleted: boolean;
  onEdit?: () => void;
  children: ReactNode;
}

export function AccordionSection({ number, title, summary, isActive, isCompleted, onEdit, children }: AccordionSectionProps) {
  return (
    <div className={cn('border border-border rounded-sm overflow-hidden', isActive && 'border-accent-gold/30')}>
      <button
        onClick={() => isCompleted && onEdit?.()}
        className={cn(
          'w-full flex items-center gap-4 px-6 py-5 text-left transition-colors duration-200',
          isActive ? 'bg-bg-secondary' : 'bg-transparent',
          isCompleted && !isActive && 'hover:bg-bg-secondary/50 cursor-pointer'
        )}
      >
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-ui text-caption font-medium',
            isCompleted
              ? 'bg-accent-gold text-ivory-text'
              : isActive
              ? 'bg-ink text-text-inverse'
              : 'bg-text-primary/10 text-text-primary'
          )}
        >
          {isCompleted && !isActive ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            number
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-h3">{title}</h3>
          {summary && !isActive && (
            <p className="font-ui text-micro text-text-primary/40 mt-1">{summary}</p>
          )}
        </div>
        {isCompleted && !isActive && (
          <span className="font-ui text-caption underline-gold">Edit</span>
        )}
      </button>
      {isActive && <div className="px-6 py-6">{children}</div>}
    </div>
  );
}
