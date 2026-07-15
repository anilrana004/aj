import { cn } from '@/lib/utils';

interface LoadingMonogramProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export function LoadingMonogram({ className, size = 'md' }: LoadingMonogramProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('animate-pulse', sizes[size])}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <circle cx="24" cy="24" r="23" stroke="var(--color-gold-foil)" strokeWidth="1" opacity="0.3" />
          <text
            x="24"
            y="28"
            textAnchor="middle"
            fill="var(--color-gold-foil)"
            fontFamily="var(--font-display)"
            fontSize="16"
          >
            AS
          </text>
        </svg>
      </div>
    </div>
  );
}
