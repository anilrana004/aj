import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

export function EmptyCart() {
  return (
    <EmptyState
      title="Your cart is quiet, for now."
      description="Every piece begins with a conversation. Start designing or browse our collections."
      action={
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/design-your-own" className="btn-primary text-text-inverse">
            Design Your Own
          </Link>
          <Link href="/collections" className="font-ui text-caption underline-gold">
            Browse Collections
          </Link>
        </div>
      }
    />
  );
}
