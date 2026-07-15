'use client';

import { useState, InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { InlineError } from '@/components/ui/InlineError';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  strength?: number;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, label, error, strength, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const strengthColors = [
      'bg-bg-secondary',
      'bg-accent-deep-terracotta/40',
      'bg-accent-deep-terracotta/70',
      'bg-accent-deep-terracotta',
    ];

    const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

    return (
      <div>
        {label && (
          <label htmlFor={id} className="block font-ui text-caption mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            id={id}
            className={cn(
              'input-field w-full pr-12',
              error && 'border-accent-deep-terracotta',
              className
            )}
            autoComplete="current-password"
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100 transition-opacity"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {strength !== undefined && strength > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all',
                    i < strength ? strengthColors[strength - 1] : 'bg-text-primary/10'
                  )}
                />
              ))}
            </div>
            <span className="font-ui text-caption text-text-primary/50">
              {strengthLabels[strength]}
            </span>
          </div>
        )}
        <InlineError message={error} />
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
