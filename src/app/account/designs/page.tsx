'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

export default function SavedDesignsPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-8">Saved Designs</h2>
      <EmptyState
        title="Nothing saved yet."
        description="Start designing a piece that's entirely yours."
        action={
          <Link href="/design-your-own" className="btn-primary text-text-inverse">
            Design Your Own
          </Link>
        }
      />
    </div>
  );
}
