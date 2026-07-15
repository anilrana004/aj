import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import { Reveal, RevealStagger, RevealChild } from '@/components/ui/Animate';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Care Guide',
  description: 'How to care for your fine jewelry — cleaning, storage, stone checks, and professional maintenance from the Apriliha Singh care team.',
};

const careGuides = [
  {
    title: 'Daily Care',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    tips: [
      'Apply perfume, hairspray, and sunscreen before putting on jewelry — chemicals can dull stones and tarnish metals.',
      'Remove jewelry before swimming, bathing, or exercising. Chlorine and salt water are particularly harsh on gold alloys.',
      'Wipe pieces gently with a soft, lint-free cloth after each wear to remove skin oils and perspiration.',
      'Store each piece separately in the soft pouch or box provided — harder stones can scratch softer ones.',
    ],
  },
  {
    title: 'Gold Care',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    tips: [
      '22K gold is softer than 18K — beautiful, but requires gentler handling. Avoid dropping on hard surfaces.',
      'Clean with warm water and a drop of mild dish soap. Use a very soft brush (baby toothbrush) for textured surfaces.',
      'Dry thoroughly with a soft cloth. Never use paper towels — they contain wood fibers that can scratch gold.',
      'Oxidized silver elements should not be polished — the patina is intentional and part of the design.',
    ],
  },
  {
    title: 'Stone Care',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    tips: [
      'Polki diamonds: Clean with a dry soft cloth only. Water can loosen the kundan setting over time.',
      'Emeralds: Avoid ultrasonic cleaners and steam. Emeralds are relatively soft and can fracture with sudden temperature changes.',
      'Pearls: Wipe with a damp cloth after wearing. Never submerge pearls or expose them to direct sunlight for extended periods.',
      'Natural Basra pearls are organic — they benefit from occasional contact with skin oils, which enhances their luster.',
    ],
  },
  {
    title: 'Professional Maintenance',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    tips: [
      'We recommend a professional check every 12 months — stone security, clasp function, chain integrity.',
      'Our care team can re-polish, re-oxidize, tighten stone settings, and re-string pearl pieces.',
      'For heirloom redesign or significant restoration, book a consultation with our atelier team.',
      'All Apriliha Singh pieces come with a lifetime care commitment — contact care@aprilihasingh.com.',
    ],
  },
];

const shippingMethods = [
  {
    method: 'Domestic (India)',
    carrier: 'BlueDart / Delhivery',
    timeline: '3-5 business days',
    insurance: 'Full value insured',
    notes: 'Signature required. Tracking provided. Delivered in branded packaging.',
  },
  {
    method: 'International',
    carrier: 'FedEx / DHL Express',
    timeline: '5-10 business days',
    insurance: 'Full value insured',
    notes: 'Customs duties are the client\'s responsibility. We handle all export documentation.',
  },
  {
    method: 'Virtual Consultation Shipping',
    carrier: 'Insured courier',
    timeline: 'Arranged per appointment',
    insurance: 'Full value insured',
    notes: 'Pieces viewed virtually can be shipped for home trial after your consultation.',
  },
];

export default function CareGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Care Guide', url: 'https://aprilihasingh.com/care-guide' },
        ]}
      />
      <Header />
      <main id="main-content" className="pt-[60px]">
        <Hero
          image="/images/contact/hero.svg"
          imageAlt="Apriliha Singh care specialist examining a piece"
          eyebrow="CARE & CONCIERGE"
          title="Caring for Your Jewelry"
          description="Every piece is made to last generations — but only if cared for properly. Here is everything you need to know."
          alignment="left"
        />

        <section className="py-20 px-responsive" aria-labelledby="care-overview-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="care-overview-title"
                eyebrow="OVERVIEW"
                title="A Lifetime of Care"
                description="Fine jewelry is intimate. It touches skin, absorbs light, carries memory. With a few simple practices, your piece will age as beautifully as the day it was made."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-24 grid md:grid-cols-2 gap-16" stagger={0.15}>
              {careGuides.map((guide) => (
                <RevealChild key={guide.title}>
                  <article className="p-8 border border-border rounded-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 flex items-center justify-center bg-bg-secondary rounded-sm text-accent-gold">
                        {guide.icon}
                      </div>
                      <h3 className="font-display text-h3">{guide.title}</h3>
                    </div>
                    <ul className="space-y-4">
                      {guide.tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 font-ui text-body text-text-primary/65">
                          <span className="text-accent-gold shrink-0 mt-1">—</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" id="shipping" aria-labelledby="shipping-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="shipping-title"
                eyebrow="SHIPPING"
                title="Shipping & Delivery"
                description="Every piece ships in our signature khaddi paper box, wrapped in a linen pouch, and fully insured."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-24 grid md:grid-cols-3 gap-8" stagger={0.1}>
              {shippingMethods.map((method) => (
                <RevealChild key={method.method}>
                  <article className="p-8 border border-border rounded-sm bg-bg-primary">
                    <h3 className="font-display text-h3 mb-2">{method.method}</h3>
                    <p className="font-ui text-caption text-accent-gold mb-4">{method.carrier}</p>
                    <dl className="space-y-3 font-ui text-body">
                      <div className="flex justify-between">
                        <dt className="text-text-primary/55">Timeline</dt>
                        <dd>{method.timeline}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-text-primary/55">Insurance</dt>
                        <dd>{method.insurance}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 font-ui text-body text-text-primary/60">{method.notes}</p>
                  </article>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-20 px-responsive" id="returns" aria-labelledby="returns-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <div className="max-w-[800px] mx-auto">
                <SectionHeader
                  id="returns-title"
                  eyebrow="RETURNS"
                  title="Our Return Policy"
                  alignment="center"
                />
                <div className="mt-12 space-y-6 font-ui text-body leading-relaxed text-text-primary/65">
                  <p>
                    We want you to be completely satisfied with your purchase. If a piece does not meet your expectations, we offer a 14-day return window from the date of delivery.
                  </p>
                  <h4 className="font-display text-h3 mt-8 mb-4">Eligibility</h4>
                  <ul className="space-y-3 list-disc list-inside">
                    <li>Items must be in original, unworn condition with all packaging and documentation.</li>
                    <li>Custom or bespoke commissions are final sale — but we offer unlimited revisions during the design process.</li>
                    <li>Personalized or engraved items cannot be returned unless defective.</li>
                    <li>Return shipping is covered by Apriliha Singh for domestic orders. International returns are at client expense.</li>
                  </ul>
                  <h4 className="font-display text-h3 mt-8 mb-4">Process</h4>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>Contact care@aprilihasingh.com with your order number and reason for return.</li>
                    <li>Our care team will provide a return authorization and prepaid shipping label (domestic).</li>
                    <li>Pack the piece in its original box and drop off at the designated carrier.</li>
                    <li>Refund is processed within 5 business days of receiving the item in original condition.</li>
                  </ol>
                  <h4 className="font-display text-h3 mt-8 mb-4">Exchanges</h4>
                  <p>
                    We are happy to exchange for a different size, style, or collection piece of equal or greater value (difference payable). Contact us within 14 days of delivery.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-dark text-text-inverse" aria-labelledby="repair-cta-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <Reveal>
              <SectionHeader
                id="repair-cta-title"
                eyebrow="REPAIR & RESTORATION"
                title="Need Repair?"
                description="Our master karigars can restore, resize, and refresh any piece — even heirlooms not originally made by us."
                alignment="center"
              />
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/repair" className="btn-outline-inverse">Repair Services</Link>
                <a href="mailto:care@aprilihasingh.com" className="font-ui text-caption underline-gold text-text-inverse">
                  Email Care Team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <FaqBlock
          title="Care Guide — Questions"
          items={[
            {
              question: 'How often should I have my jewelry professionally checked?',
              answer: 'We recommend a professional check every 12 months. Our care team will inspect stone security, clasp function, and chain integrity. For pieces worn daily, consider a check every 6 months.',
            },
            {
              question: 'Can I clean my jewelry at home?',
              answer: 'For gold pieces, use warm water with a drop of mild dish soap and a very soft brush. Dry thoroughly with a lint-free cloth. For polki diamonds and pearls, use only a dry soft cloth. Never use ultrasonic cleaners on emeralds or pearls.',
            },
            {
              question: 'My chain broke — can you repair it?',
              answer: 'Yes. We repair all Apriliha Singh pieces, regardless of age. Contact care@aprilihasingh.com with photos and we will provide a repair estimate. Most chain repairs are completed within 5 to 7 business days.',
            },
            {
              question: 'Do you resize rings and bracelets?',
              answer: 'Yes. We can resize rings and adjust bracelet lengths. A standard resize takes 3 to 5 business days. For pieces with full-band engraving or stone settings near the sizing area, we will advise on the best approach during your consultation.',
            },
            {
              question: 'What is your return policy?',
              answer: 'We offer a 14-day return window from delivery for unworn items in original condition. Custom or bespoke commissions are final sale. Contact care@aprilihasingh.com to initiate a return. Domestic return shipping is covered by us.',
            },
            {
              question: 'How do I track my order?',
              answer: 'Once your order ships, you will receive an email with tracking information. You can also view your order status in real time at aprilihasingh.com/account/orders. Bespoke pieces include production milestones — you will see your piece progress from sketch to shipment.',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
