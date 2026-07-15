import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact & Concierge',
  description: 'Reach the Apriliha Singh concierge for private viewings, bespoke commissions, press inquiries, or care guidance.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <Hero
          image="/images/contact/hero.svg"
          imageAlt="Apriliha Singh atelier entrance"
          eyebrow="CONTACT & CONCIERGE"
          title="We're Here to Help"
          description="Whether you're beginning a commission, need care guidance for a piece, or have a press inquiry — our concierge responds within 24 hours."
          alignment="left"
        />

        <section className="py-20 px-responsive" aria-labelledby="channels-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="channels-title"
              eyebrow="REACH US"
              title="Direct Channels"
              description="Choose the way that suits you best."
              alignment="center"
            />

            <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <article className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-bg-secondary rounded-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="font-display text-h3 mb-3">Call Us</h3>
                <p className="font-ui text-body mb-4 text-text-primary/60">Monday–Saturday, 11am–7pm IST</p>
                <a href="tel:+919876543210" className="font-ui text-caption underline-gold inline-flex items-center justify-center gap-2">
                  +91 98765 43210
                </a>
              </article>

              <article className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-bg-secondary rounded-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <h3 className="font-display text-h3 mb-3">WhatsApp</h3>
                <p className="font-ui text-body mb-4 text-text-primary/60">Quick questions, photos, video calls</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="font-ui text-caption underline-gold inline-flex items-center justify-center gap-2">
                  Message Us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-bg-secondary rounded-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="font-display text-h3 mb-3">Email</h3>
                <p className="font-ui text-body mb-4 text-text-primary/60">Detailed inquiries, documents, images</p>
                <a href="mailto:concierge@aprilihasingh.com" className="font-ui text-caption underline-gold inline-flex items-center justify-center gap-2">
                  concierge@aprilihasingh.com
                </a>
              </article>

              <article className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-bg-secondary rounded-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="font-display text-h3 mb-3">Visit Us</h3>
                <p className="font-ui text-body mb-4 text-text-primary/60">By appointment only</p>
                <a href="/appointment" className="font-ui text-caption underline-gold inline-flex items-center justify-center gap-2">
                  Book a Visit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="inquiry-types-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="inquiry-types-title"
              eyebrow="SPECIALIZED SUPPORT"
              title="Dedicated Channels"
              description="For specific needs, reach the right team directly."
              alignment="center"
            />

            <div className="mt-24 grid md:grid-cols-3 gap-8">
              <article className="p-8 border border-border">
                <h3 className="font-display text-h3 mb-4">Press & Editorial</h3>
                <p className="font-ui text-body mb-6 text-text-primary/60">Media kits, high-res images, interview requests, and editorial collaborations.</p>
                <a href="mailto:press@aprilihasingh.com" className="font-ui text-caption underline-gold">press@aprilihasingh.com</a>
              </article>

              <article className="p-8 border border-border">
                <h3 className="font-display text-h3 mb-4">Care & Repair</h3>
                <p className="font-ui text-body mb-6 text-text-primary/60">Cleaning guidance, stone checks, clasp repairs, restringing, and full restoration services.</p>
                <a href="mailto:care@aprilihasingh.com" className="font-ui text-caption underline-gold">care@aprilihasingh.com</a>
              </article>

              <article className="p-8 border border-border">
                <h3 className="font-display text-h3 mb-4">Wholesale & Partnerships</h3>
                <p className="font-ui text-body mb-6 text-text-primary/60">Stockist inquiries, collaboration proposals, and institutional partnerships.</p>
                <a href="mailto:partnerships@aprilihasingh.com" className="font-ui text-caption underline-gold">partnerships@aprilihasingh.com</a>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive" aria-labelledby="visit-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="visit-title"
              eyebrow="OUR ATELIER"
              title="Jaipur Studio"
              description="Located in the heart of Jaipur's old city, near the City Palace. Exact address shared upon appointment confirmation."
              alignment="center"
            />

            <div className="mt-24 relative aspect-[16/9] overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-bg-dark/60 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="font-display text-h3 text-text-inverse mb-4">Interactive Map</p>
                  <p className="font-ui text-body text-text-inverse/75 mb-6">Static map image shown here. Replace with styled Mapbox/Google Maps embed in production.</p>
                  <a href="https://maps.app.goo.gl/example" target="_blank" rel="noopener noreferrer" className="font-ui text-caption underline-gold inline-flex items-center gap-2 text-text-inverse">
                    Open in Maps
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              <img
                src="/images/contact/map.svg"
                alt="Map showing Apriliha Singh atelier location in Jaipur"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-dark text-text-inverse" aria-labelledby="care-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <SectionHeader
              id="care-title"
              title="Care for Your Pieces"
              alignment="center"
            />
            <p className="mt-6 font-ui text-body text-text-inverse/75 max-w-[700px] mx-auto mb-10">
              Every piece comes with a care guide. For specific questions — cleaning, stone security, restringing pearls — our care team is a message away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/care-guide" className="btn-outline-inverse">View Care Guide</Link>
              <a href="mailto:care@aprilihasingh.com" className="font-ui text-caption underline-gold text-text-inverse">
                Email Care Team
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}