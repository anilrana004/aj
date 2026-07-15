'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SavedDesignsPage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine mb-10">Saved Designs</h1>

        <div className="text-center py-16">
          <p className="text-body text-bronze/60 mb-4">
            You haven&apos;t saved any bespoke designs yet.
          </p>
          <p className="text-body text-bronze/40 mb-8">
            Use our bespoke builder to design a custom piece, then save it to revisit or reorder anytime.
          </p>
          <Link href="/build/necklace">
            <Button>Open Bespoke Builder</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
