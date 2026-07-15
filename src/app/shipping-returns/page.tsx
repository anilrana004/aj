import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import { Reveal, RevealStagger, RevealChild } from '@/components/ui/Animate';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Shipping methods, delivery timelines, and return policy for Apriliha Singh fine jewelry.',
};

const shippingTiers = [
  {
    region: 'India',
    method: 'Insured Express',
    carrier: 'BlueDart / Delhivery',
    timeline: '3–5 business days',
    cost: 'Complimentary on orders over ₹50,000',
    insurance: 'Full replacement value',
    signature: 'Required',
    packaging: 'Signature khaddi paper box, linen pouch, branded outer carton',
  },
  {
    region: 'International',
    method: 'FedEx / DHL Express',
    carrier: 'FedEx / DHL',
    timeline: '5–10 business days',
    cost: 'Quoted per order based on destination and value',
    insurance: 'Full replacement value',
    signature: 'Required',
    packaging: 'Same as domestic, plus export documentation and customs forms',
  },
  {
    region: 'Virtual Consultation',
    method: 'Home Trial Shipment',
    carrier: 'Insured courier',
    timeline: 'Scheduled with your consultant',
    cost: 'Complimentary for virtual consultation clients',
    insurance: 'Full replacement value',
    signature: 'Required',
    packaging: 'Temporary trial packaging — standard packaging provided upon purchase',
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[60px]">
        <Hero
          image="/images/contact/hero.svg"
          imageAlt="Apriliha Singh packaging on wooden surface"
          eyebrow="SHIPPING & RETURNS"
          title="Delivered with Care"
          description="Every piece ships fully insured in our signature packaging. Returns are simple and respectful."
          alignment="left"
        />

        <section className="py-20 px-responsive" aria-labelledby="shipping-methods-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="shipping-methods-title"
                eyebrow="SHIPPING METHODS"
                title="How We Ship"
                description="All shipments are fully insured, tracked, and require signature on delivery."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-24 space-y-12" stagger={0.15}>
              {shippingTiers.map((tier) => (
                <RevealChild key={tier.region}>
                  <article className="grid md:grid-cols-12 gap-8 p-8 border border-border rounded-sm">
                    <div className="md:col-span-3">
                      <h3 className="font-display text-h3 mb-1">{tier.region}</h3>
                      <p className="font-ui text-caption text-accent-gold">{tier.method}</p>
                    </div>
                    <div className="md:col-span-9">
                      <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-3 font-ui text-body">
                        <div className="flex justify-between sm:block">
                          <dt className="text-text-primary/40 text-caption uppercase tracking-wider mb-1">Carrier</dt>
                          <dd>{tier.carrier}</dd>
                        </div>
                        <div className="flex justify-between sm:block">
                          <dt className="text-text-primary/40 text-caption uppercase tracking-wider mb-1">Timeline</dt>
                          <dd>{tier.timeline}</dd>
                        </div>
                        <div className="flex justify-between sm:block">
                          <dt className="text-text-primary/40 text-caption uppercase tracking-wider mb-1">Cost</dt>
                          <dd>{tier.cost}</dd>
                        </div>
                        <div className="flex justify-between sm:block">
                          <dt className="text-text-primary/40 text-caption uppercase tracking-wider mb-1">Insurance</dt>
                          <dd>{tier.insurance}</dd>
                        </div>
                        <div className="flex justify-between sm:block">
                          <dt className="text-text-primary/40 text-caption uppercase tracking-wider mb-1">Signature</dt>
                          <dd>{tier.signature}</dd>
                        </div>
                        <div className="flex justify-between sm:block">
                          <dt className="text-text-primary/40 text-caption uppercase tracking-wider mb-1">Packaging</dt>
                          <dd>{tier.packaging}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="customs-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <div className="max-w-[800px] mx-auto">
                <SectionHeader
                  id="customs-title"
                  eyebrow="INTERNATIONAL ORDERS"
                  title="Customs & Duties"
                  alignment="center"
                />
                <div className="mt-12 space-y-6 font-ui text-body leading-relaxed text-text-primary/65">
                  <p>
                    International shipments may be subject to customs duties, taxes, and import fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in the product price or shipping cost.
                  </p>
                  <p>
                    We provide all necessary documentation (commercial invoice, certificate of origin, hallmarked metal stamps) to facilitate smooth customs clearance. Our logistics team can provide estimated duty costs for your country before shipment.
                  </p>
                  <p>
                    Refusal to pay customs duties does not qualify for a return — the piece must still be returned through our standard return process if you wish to receive a refund.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 px-responsive" id="returns" aria-labelledby="returns-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <div className="max-w-[800px] mx-auto">
                <SectionHeader
                  id="returns-title"
                  eyebrow="RETURNS & EXCHANGES"
                  title="Our Return Policy"
                  alignment="center"
                />
                <div className="mt-12 space-y-8 font-ui text-body leading-relaxed text-text-primary/65">
                  <div>
                    <h4 className="font-display text-h3 mb-4">14-Day Return Window</h4>
                    <p>
                      If a piece does not meet your expectations, you may return it within 14 calendar days of delivery. Items must be in unworn, original condition with all packaging, certificates, and documentation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-h3 mb-4">What Qualifies</h4>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Ready-to-wear pieces from our collections — full refund or exchange.</li>
                      <li>Custom or bespoke commissions — final sale. Unlimited revisions during design process.</li>
                      <li>Personalized or engraved items — final sale unless defective.</li>
                      <li>Gift purchases — recipient may exchange for store credit within 14 days.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display text-h3 mb-4">How to Return</h4>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li>Email care@aprilihasingh.com with your order number and reason for return.</li>
                      <li>Receive return authorization and prepaid shipping label (domestic India orders).</li>
                      <li>Pack piece in original box, drop off at designated carrier within 5 business days.</li>
                      <li>Refund processed within 5 business days of inspection. Original payment method credited.</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-display text-h3 mb-4">Exchanges</h4>
                    <p>
                      We are happy to exchange for a different size, style, or collection piece of equal or greater value (difference payable). Contact us within 14 days of delivery to arrange an exchange.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-dark text-text-inverse" aria-labelledby="help-cta-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <Reveal>
              <SectionHeader
                id="help-cta-title"
                eyebrow="NEED HELP?"
                title="Contact Our Concierge"
                description="Questions about shipping, returns, or your order? We respond within 24 hours."
                alignment="center"
              />
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="btn-outline-inverse">Contact Concierge</Link>
                <a href="mailto:care@aprilihasingh.com" className="font-ui text-caption underline-gold text-text-inverse">
                  care@aprilihasingh.com
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
