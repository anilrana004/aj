'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'ghost-inverse';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'font-ui font-medium transition-colors duration-200 rounded-sm';
    const variants = {
      primary: 'btn-primary',
      ghost: 'btn-ghost',
      'ghost-inverse': 'btn-ghost-inverse',
    };
    const sizes = {
      sm: 'px-6 py-3 text-caption',
      default: 'px-8 py-4 text-body',
      lg: 'px-10 py-5 text-h3',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';