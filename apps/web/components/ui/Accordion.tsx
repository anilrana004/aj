'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-stone/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-label uppercase tracking-widest text-bronze">{title}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-bronze transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-default',
          isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}
