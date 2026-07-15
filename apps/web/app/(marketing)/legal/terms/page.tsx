import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for Apriliha Singh — conditions governing the use of our website and purchase of our products.',
  path: '/legal/terms',
  noindex: true,
});

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[700px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine mb-10">Terms of Service</h1>
        <div className="space-y-6 text-body text-bronze leading-relaxed">
          <p><em>Last updated: January 2025</em></p>

          <h2 className="font-serif text-subhead text-aubergine">General</h2>
          <p>By accessing and using this website, you agree to these terms. Apriliha Singh reserves the right to update these terms at any time.</p>

          <h2 className="font-serif text-subhead text-aubergine">Products</h2>
          <p>All product descriptions, images, and specifications are as accurate as possible. Colors may vary slightly due to screen differences. Bespoke items are handmade and may have slight variations — this is a feature of artisanal craft, not a defect.</p>

          <h2 className="font-serif text-subhead text-aubergine">Pricing</h2>
          <p>All prices are listed in Indian Rupees (INR) unless otherwise stated. Prices include applicable taxes unless stated otherwise. We reserve the right to change prices without notice.</p>

          <h2 className="font-serif text-subhead text-aubergine">Orders</h2>
          <p>An order is accepted only upon payment confirmation. We reserve the right to refuse or cancel orders at our discretion, including in cases of pricing errors or suspected fraud.</p>

          <h2 className="font-serif text-subhead text-aubergine">Intellectual Property</h2>
          <p>All content on this website — including designs, images, text, and logos — is the property of Apriliha Singh and is protected by applicable intellectual property laws.</p>

          <h2 className="font-serif text-subhead text-aubergine">Limitation of Liability</h2>
          <p>Apriliha Singh shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        </div>
      </div>
    </section>
  );
}
