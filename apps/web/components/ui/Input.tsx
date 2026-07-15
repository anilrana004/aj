'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-label uppercase tracking-widest text-bronze mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 px-4 bg-transparent border border-stone/60 text-aubergine',
            'placeholder:text-stone font-sans text-body',
            'transition-colors duration-300 ease-default',
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

Input.displayName = 'Input';
export default Input;
