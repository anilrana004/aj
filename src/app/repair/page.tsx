import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import { Reveal, RevealStagger, RevealChild } from '@/components/ui/Animate';
import Link from 'next/link';
import { img } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Repair & Restoration',
  description: 'Expert repair, restoration, and heirloom redesign services from the Apriliha Singh atelier in Jaipur.',
};

const repairServices = [
  {
    title: 'Stone Check & Tightening',
    description: 'Every stone inspected under 10x loupe. Loose stones reseated and secured using the original setting technique. Reported findings shared with client.',
    timeline: '1–2 weeks',
    price: 'From ₹2,000',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Clasp Replacement',
    description: 'Worn or broken clasps replaced with hand-fabricated gold or platinum closures. We match the original mechanism and alloy for seamless repair.',
    timeline: '1–2 weeks',
    price: 'From ₹5,000',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: 'Pearl Restringing',
    description: 'Worn silk threads replaced. Pearls cleaned, inspected for damage, and restrung with double-knotted silk between each pearl. Clasp reattached.',
    timeline: '1–3 weeks',
    price: 'From ₹3,000',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="8" r="2" />
        <circle cx="20" cy="8" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: 'Resizing',
    description: 'Rings and bangles resized by our goldsmiths. We preserve the original profile, texture, and hallmark. Additional gold matched to the original alloy.',
    timeline: '2–3 weeks',
    price: 'From ₹8,000',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    title: 'Polish & Re-Oxidation',
    description: 'Surface restored — matte textures re-brushed, polished areas re-burnished, oxidized silver elements re-patinated. The piece returns to its original finish.',
    timeline: '1–2 weeks',
    price: 'From ₹3,000',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: 'Full Restoration',
    description: 'Comprehensive renewal — disassembly, cleaning, stone check, re-setting, structural repairs, surface restoration, and final blessing. For pieces that need everything.',
    timeline: '4–8 weeks',
    price: 'By consultation',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

const processSteps = [
  { step: 1, title: 'Consultation', description: 'Contact us with photos and a description. Our care team provides an initial assessment and estimate.' },
  { step: 2, title: 'Drop-Off or Ship', description: 'Bring the piece to our Jaipur atelier or ship it using our insured packaging. We provide a prepaid label for domestic clients.' },
  { step: 3, title: 'Inspection', description: 'Our master karigar examines the piece under magnification, documents its condition, and confirms the repair plan and final quote.' },
  { step: 4, title: 'Repair', description: 'Work begins. We use the same techniques and materials as the original piece. You receive updates at key milestones.' },
  { step: 5, title: 'Quality Check', description: 'Finished piece inspected by two senior karigars. Stone security, clasp function, surface finish — every detail verified.' },
  { step: 6, title: 'Return', description: 'Piece returned in refreshed packaging with a detailed condition report and care recommendations. Lifetime care commitment continues.' },
];

export default function RepairPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <Hero
          image={img.atelierHero}
          imageAlt="Karigar performing repair work at bench"
          eyebrow="REPAIR & RESTORATION"
          title="Your Piece, Renewed"
          description="Expert care from the same hands that made it. Repair, restoration, and heirloom redesign — for any fine jewelry, not just ours."
          alignment="left"
        />

        <section className="py-20 px-responsive" aria-labelledby="services-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="services-title"
                eyebrow="SERVICES"
                title="What We Offer"
                description="From a quick stone check to full restoration — every service performed by master karigars in our Jaipur atelier."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
              {repairServices.map((service) => (
                <RevealChild key={service.title}>
                  <article className="p-8 border border-border rounded-sm hover:border-accent-gold/30 transition-colors duration-300">
                    <div className="w-12 h-12 flex items-center justify-center bg-bg-secondary rounded-sm text-accent-gold mb-6">
                      {service.icon}
                    </div>
                    <h3 className="font-display text-h3 mb-3">{service.title}</h3>
                    <p className="font-ui text-body mb-6 text-text-primary/65">{service.description}</p>
                    <dl className="flex justify-between font-ui text-caption border-t border-border pt-4">
                      <dt className="text-text-primary/40">Timeline</dt>
                      <dd>{service.timeline}</dd>
                    </dl>
                    <dl className="flex justify-between font-ui text-caption mt-2">
                      <dt className="text-text-primary/40">Starting from</dt>
                      <dd className="text-accent-gold">{service.price}</dd>
                    </dl>
                  </article>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="process-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="process-title"
                eyebrow="HOW IT WORKS"
                title="The Repair Process"
                description="Simple, transparent, and respectful of your piece's history."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-24 max-w-[800px] mx-auto" stagger={0.12}>
              {processSteps.map((step) => (
                <RevealChild key={step.step}>
                  <div className="flex gap-6 py-8 border-b border-border last:border-b-0">
                    <span className="font-display text-h2 text-accent-gold shrink-0 w-12">{step.step}.</span>
                    <div>
                      <h4 className="font-display text-h3 mb-2">{step.title}</h4>
                      <p className="font-ui text-body text-text-primary/65">{step.description}</p>
                    </div>
                  </div>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-20 px-responsive" aria-labelledby="heirloom-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <div className="max-w-[800px] mx-auto">
                <SectionHeader
                  id="heirloom-title"
                  eyebrow="HEIRLOOM REDESIGN"
                  title="Past Meets Present"
                  alignment="center"
                />
                <div className="mt-12 space-y-6 font-ui text-body leading-relaxed text-text-primary/65">
                  <p>
                    Your grandmother's diamonds. Your mother's gold. A stone carried from a journey decades ago. We reimagine heirloom pieces for contemporary life — honoring the material's history while designing for how you live now.
                  </p>
                  <p>
                    The process begins with a conversation. We document every stone, every gram of metal. Then we design together — you, our creative director, and the karigar who will bring it to life.
                  </p>
                  <p>
                    Reclaimed stones are reset in new settings. Old gold is refined and recast. Nothing is wasted. Everything carries forward.
                  </p>
                  <div className="pt-8">
                    <Link href="/appointment" className="btn-primary">Start a Heirloom Conversation</Link>
                  </div>
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
                eyebrow="GET STARTED"
                title="Ready to Restore?"
                description="Contact our care team with photos of your piece. We respond within 24 hours with an initial assessment."
                alignment="center"
              />
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="mailto:care@aprilihasingh.com" className="btn-outline-inverse">Email Care Team</a>
                <Link href="/contact" className="font-ui text-caption underline-gold text-text-inverse">
                  All Contact Options
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
