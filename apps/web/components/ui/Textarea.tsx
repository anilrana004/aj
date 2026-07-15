'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-label uppercase tracking-widest text-bronze mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 bg-transparent border border-stone/60 text-aubergine',
            'placeholder:text-stone font-sans text-body',
            'transition-colors duration-300 ease-default resize-none',
            'focus:outline-none focus:border-terracotta',
            error && 'border-rust',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-caption text-rust">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
