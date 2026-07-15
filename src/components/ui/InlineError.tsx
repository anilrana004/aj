import { cn } from '@/lib/utils';

interface InlineErrorProps {
  message?: string;
  className?: string;
}

export function InlineError({ message, className }: InlineErrorProps) {
  if (!message) return null;
  return (
    <p className={cn('font-ui text-caption mt-1.5', className)} style={{ color: 'var(--color-deep-terracotta)' }}>
      {message}
    </p>
  );
}
