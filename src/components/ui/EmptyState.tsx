import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('text-center py-20', className)}>
      <h3 className="font-display text-h2 mb-4">{title}</h3>
      <p className="font-ui text-body mb-8 max-w-[400px] mx-auto text-text-primary/70">
        {description}
      </p>
      {action}
    </div>
  );
}
