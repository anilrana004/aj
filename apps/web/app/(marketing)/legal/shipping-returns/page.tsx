import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FadeIn } from '@/components/ui/Animations';

export const metadata: Metadata = buildMetadata({
  title: 'Shipping & Returns',
  description: 'Shipping information and return policy for Apriliha Singh jewelry orders.',
  path: '/legal/shipping-returns',
  noindex: true,
});

export default function ShippingReturnsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[700px] mx-auto px-6">
        <FadeIn>
          <h1 className="font-serif text-headline text-aubergine mb-10">Shipping & Returns</h1>

          <div className="space-y-8 text-body text-bronze leading-relaxed">
            <div>
              <h2 className="font-serif text-subhead text-aubergine mb-3">Shipping</h2>
              <p className="mb-3">We offer free standard shipping on all orders within India. International shipping rates are calculated at checkout based on destination and package weight.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>India: Free standard shipping, 5-7 business days</li>
                <li>International: Calculated at checkout, 7-14 business days</li>
                <li>Bespoke items: Lead time shown on each part + shipping time</li>
              </ul>
              <p className="mt-3">All orders include tracking. You will receive a shipping confirmation email with your tracking number once your order dispatches.</p>
            </div>

            <div>
              <h2 className="font-serif text-subhead text-aubergine mb-3">Returns — Ready-to-Wear</h2>
              <p>We accept returns on unworn, ready-to-wear items within 14 days of delivery. Items must be in their original packaging and condition. To initiate a return, please contact us at hello@aprilihasingh.com with your order number.</p>
            </div>

            <div>
              <h2 className="font-serif text-subhead text-aubergine mb-3">Returns — Bespoke</h2>
              <p>Bespoke items are handcrafted to your specifications and cannot be returned or exchanged unless there is a manufacturing defect. If you believe your piece has a defect, please contact us within 48 hours of receiving your order with photographs and a description.</p>
            </div>

            <div>
              <h2 className="font-serif text-subhead text-aubergine mb-3">Exchanges</h2>
              <p>We do not offer direct exchanges. If you wish to exchange an item, please return it (if eligible) and place a new order.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
