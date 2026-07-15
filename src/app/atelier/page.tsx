import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { atelierContent } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Atelier',
  description: 'Inside the Apriliha Singh atelier in Jaipur — where six generations of karigar wisdom meet contemporary design.',
};

export default function AtelierPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'The Atelier', url: 'https://aprilihasingh.com/atelier' },
        ]}
      />
      <Header />
      <main id="main-content" className="pt-[60px]">
        <Hero
          image="/images/atelier/hero.svg"
          imageAlt="Apriliha Singh atelier interior with karigars at work"
          eyebrow="THE ATELIER"
          title="Where Gold Remembers Every Hand"
          description="Six stages. Zero shortcuts. Three generations of hands. This is how heirlooms are born."
          alignment="left"
        />

        <section className="py-20 px-responsive" aria-labelledby="founder-title">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden">
                <img
                  src={atelierContent.founderStory.portrait}
                  alt={atelierContent.founderStory.portraitAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-7 space-y-8">
                <SectionHeader
                  id="founder-title"
                  eyebrow="FOUNDER"
                  title={atelierContent.founderStory.name}
                  description={atelierContent.founderStory.title}
                  alignment="left"
                />
                <blockquote className="quote-block border-y divider-gold py-8">
                  {atelierContent.founderStory.pullQuote}
                </blockquote>
                <div className="space-y-6 font-ui text-body leading-relaxed text-text-primary/70">
                  {atelierContent.founderStory.biography.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="process-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="process-title"
              eyebrow="OUR PROCESS"
              title="Six Stages of Making"
              description="No CAD. No casting shortcuts. Every piece moves through six hands before it reaches yours."
              alignment="center"
            />

            <div className="mt-24 space-y-24">
              {atelierContent.craftProcess.map((step, index) => (
                <article key={step.step} className={index % 2 === 1 ? 'flex flex-col-reverse' : ''}>
                  <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 relative aspect-square overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="lg:col-span-6 space-y-4">
                      <div className="font-display text-h3">
                        <span className="text-accent-gold">{step.step}.</span> {step.title}
                      </div>
                      <p className="font-ui text-small text-text-primary/65">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive" aria-labelledby="materials-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="materials-title"
              eyebrow="MATERIALS & ETHICS"
              title="The Integrity of Source"
              description="We trace every gram of gold, every carat of stone. Transparency is not a marketing term — it's the only way we work."
              alignment="center"
            />

            <div className="mt-24 grid lg:grid-cols-3 gap-12">
              <article>
                <div className="aspect-square relative overflow-hidden mb-8">
                  <img
                    src={atelierContent.materials.gold.image}
                    alt={atelierContent.materials.gold.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-h3 mb-4">22K Gold</h3>
                <p className="font-ui text-small text-text-primary/65">{atelierContent.materials.gold.description}</p>
                <p className="font-ui text-micro text-text-primary/40 mt-4 underline-gold">Origin: {atelierContent.materials.gold.origin}</p>
              </article>

              <article>
                <div className="aspect-square relative overflow-hidden mb-8">
                  <img
                    src={atelierContent.materials.stones.image}
                    alt={atelierContent.materials.stones.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-h3 mb-4">Gemstones</h3>
                <p className="font-ui text-small text-text-primary/65">{atelierContent.materials.stones.description}</p>
                <p className="font-ui text-micro text-text-primary/40 mt-4 underline-gold">Origin: {atelierContent.materials.stones.origin}</p>
              </article>

              <article className="lg:col-span-3">
                <h3 className="font-display text-h3 mb-6">Our Ethics Commitment</h3>
                <div className="space-y-6 font-ui text-body leading-relaxed text-text-primary/65">
                  <p>{atelierContent.materials.ethics}</p>
                  <ul className="list-disc list-inside space-y-3">
                    <li>RJC Certified — Responsible Jewellery Council member</li>
                    <li>Gold: 100% recycled or single-source traceable</li>
                    <li>Stones: Conflict-free by origin, not just certificate</li>
                    <li>Karigars: 3× Jaipur average wage, health insurance, pension, profit-sharing</li>
                    <li>Atelier: 60% solar powered, zero-waste gold recovery</li>
                    <li>Packaging: Handmade khaddi paper boxes, reusable as jewelry storage</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-dark" aria-labelledby="gallery-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="gallery-title"
              eyebrow="WORKSHOP LIFE"
              title="The Atelier in Frames"
              description="Quiet moments from the bench. The dust. The light. The rhythm."
              alignment="center"
            />

            <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {atelierContent.workshopGallery.map((image, index) => (
                <figure key={index} className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="image-caption">{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive text-center" aria-labelledby="visit-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="visit-title"
              eyebrow="Visit Us"
              title="Experience the Atelier"
              description="Private appointments available Tuesday–Saturday, 11am–6pm. Virtual consultations for international clients."
              alignment="center"
            />
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/appointment" className="btn-primary">Book a Visit</Link>
              <Link href="/contact" className="font-ui text-caption underline-gold">
                Get Directions →
              </Link>
            </div>
          </div>
        </section>

        <FaqBlock
          title="The Atelier — Questions"
          items={[
            {
              question: 'What is a karigar?',
              answer: 'A karigar is a master artisan — a craftsperson who has trained for decades in traditional Indian jewelry-making techniques. Our karigars have an average of 25 years of experience, and several come from families who have worked with gold for six or more generations.',
            },
            {
              question: 'Do you use CAD or 3D printing?',
              answer: 'No. Every piece is handcrafted using traditional methods — hand-forging, hand-soldering, hand-setting, hand-polishing. We believe the marks of the maker are part of the jewelry\'s character, not flaws to be eliminated.',
            },
            {
              question: 'What gold purity do you work with?',
              answer: 'We work primarily with 22K yellow gold (91.6% pure) for traditional pieces and 18K gold vermeil (gold bonded over sterling silver) for accessible luxury. Each purity has its character — 22K is warmer, softer, more luminous; 18K is harder, more durable for everyday wear.',
            },
            {
              question: 'Where are your stones sourced?',
              answer: 'Gemstones are sourced from ethical mines worldwide — Colombian emeralds from Muzo, Basra pearls from the Persian Gulf, raw garnets from Rajasthan\'s Tonk mines. We trace every stone to its origin and provide provenance documentation.',
            },
            {
              question: 'Can I visit the workshop?',
              answer: 'Yes. Private atelier visits are available Tuesday through Saturday, 11am to 6pm IST. You\'ll see karigars at work, handle materials, and discuss your piece with our creative director. Book via our appointment page.',
            },
            {
              question: 'How do you ensure quality?',
              answer: 'Every piece passes through six stages of making, each overseen by a different master karigar. A final quality check includes stone security testing, clasp function verification, and visual inspection under magnification before any piece leaves the atelier.',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}