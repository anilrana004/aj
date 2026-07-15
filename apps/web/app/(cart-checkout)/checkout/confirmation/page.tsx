'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Button from '@/components/ui/Button';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'AS-EXAMPLE-001';

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        {/* Success indicator */}
        <div className="w-16 h-16 mx-auto mb-8 border-2 border-terracotta flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L19 7" stroke="#8A3B24" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="font-serif text-display text-aubergine mb-4">Thank You</h1>
        <p className="text-body-lg text-bronze leading-relaxed mb-8">
          Your order has been placed. We&apos;ll send you a confirmation email shortly with all the details.
        </p>

        <div className="bg-stone/20 p-6 mb-8 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Order Number</p>
              <p className="font-serif text-subhead text-aubergine">{orderNumber}</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Status</p>
              <p className="text-body text-aubergine">Payment Confirmed</p>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="text-left bg-stone/10 p-6 mb-8">
          <h2 className="font-serif text-subhead text-aubergine mb-4">What Happens Next</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-terracotta/10 flex items-center justify-center shrink-0 text-terracotta text-label">
                1
              </div>
              <div>
                <p className="text-body text-aubergine font-medium">Payment Confirmed</p>
                <p className="text-body text-bronze/60">We&apos;ve received your payment and are preparing your order.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-stone/20 flex items-center justify-center shrink-0 text-bronze/40 text-label">
                2
              </div>
              <div>
                <p className="text-body text-aubergine/50 font-medium">In the Atelier</p>
                <p className="text-body text-bronze/40">For bespoke pieces, our artisans will begin crafting your design.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-stone/20 flex items-center justify-center shrink-0 text-bronze/40 text-label">
                3
              </div>
              <div>
                <p className="text-body text-aubergine/50 font-medium">Quality Check</p>
                <p className="text-body text-bronze/40">Every piece passes through a final inspection.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-stone/20 flex items-center justify-center shrink-0 text-bronze/40 text-label">
                4
              </div>
              <div>
                <p className="text-body text-aubergine/50 font-medium">Shipped & Delivered</p>
                <p className="text-body text-bronze/40">We&apos;ll notify you at every step until it arrives.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest account prompt */}
        <div className="bg-terracotta/5 border border-terracotta/10 p-6 mb-8">
          <p className="text-body text-aubergine mb-3">
            Create an account to track this order and save your designs.
          </p>
          <Link href="/auth/signup">
            <Button variant="outline" size="sm">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/collections">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone/30 border-t-terracotta animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
