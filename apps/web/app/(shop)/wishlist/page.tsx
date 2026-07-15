'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine mb-10">Wishlist</h1>
        <div className="text-center py-16">
          <p className="text-body text-bronze/60 mb-4">
            Your wishlist is empty.
          </p>
          <p className="text-body text-bronze/40 mb-8">
            Save pieces you love to revisit them later.
          </p>
          <Link href="/collections">
            <Button variant="outline">Browse Collections</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
