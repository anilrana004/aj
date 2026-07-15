import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Reveal, RevealStagger, RevealChild } from '@/components/ui/Animate';
import { SectionHeader } from '@/components/sections/Hero';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Design Your Own — Bespoke Jewelry Builder',
  description: 'Build your own bespoke necklace, bracelet, or mala piece by piece. Each part individually storied and handcrafted in our Jaipur atelier.',
  openGraph: {
    title: 'Design Your Own | Apriliha Singh',
    description: 'Build your own bespoke jewelry, piece by piece.',
  },
};

const productTypes = [
  {
    type: 'necklace' as const,
    name: 'Necklace (Maala)',
    description: 'Choose a chain, centerpiece, accent stones, and clasp. Each part tells a story.',
    image: '/images/configurator/necklace-hero.svg',
    href: '/design-your-own/necklace',
    steps: ['Chain', 'Centerpiece', 'Accents', 'Clasp', 'Length'],
  },
  {
    type: 'bracelet' as const,
    name: 'Bracelet',
    description: 'A foundation, a focal point, spacers, and a clasp — four decisions, one personal piece.',
    image: '/images/configurator/bracelet-hero.svg',
    href: '/design-your-own/bracelet',
    steps: ['Foundation', 'Centerpiece', 'Spacers', 'Clasp'],
  },
  {
    type: 'mala' as const,
    name: 'Mala (Prayer Beads)',
    description: '108 beads, a guru bead, spacer markers, and a tassel — meditative, personal, sacred.',
    image: '/images/configurator/mala-hero.svg',
    href: '/design-your-own/mala',
    steps: ['Beads', 'Guru Bead', 'Spacers', 'Tassel'],
  },
];

export default function DesignYourOwnPage() {
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Design Your Own', url: 'https://aprilihasingh.com/design-your-own' },
        ]}
      />
      <Header />
      <main id="main-content" className="pt-[60px]">
        <section className="py-20 px-responsive text-center">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <p className="eyebrow-gold mb-6">Bespoke Configurator</p>
              <h1 className="font-display text-hero mb-8">Design Your Own</h1>
              <p className="font-ui text-body text-text-primary/70 max-w-[600px] mx-auto">
                Every piece begins with a conversation between karigar and client. This is that conversation — translated to screen. Choose each part, one by one, and watch your piece come together.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="how-it-works-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="how-it-works-title"
                eyebrow="HOW IT WORKS"
                title="Part by Part"
                description="No dropdowns. No grids of 50 options. Each step is a guided choice — one category at a time, like sitting with a karigar."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-16 grid sm:grid-cols-3 gap-8 max-w-[900px] mx-auto" stagger={0.1}>
              {[
                { step: '1', title: 'Choose', description: 'Select one part at a time from curated options.' },
                { step: '2', title: 'See', description: 'Watch your piece build in real time. Every part adds to the story.' },
                { step: '3', title: 'Own', description: 'Add to cart, save your design, or book a consultation.' },
              ].map((item) => (
                <RevealChild key={item.step}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-gold flex items-center justify-center font-display text-h3 text-bg-dark">
                      {item.step}
                    </div>
                    <h3 className="font-display text-h3 mb-2">{item.title}</h3>
                    <p className="font-ui text-small text-text-primary/60">{item.description}</p>
                  </div>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-20 px-responsive" aria-labelledby="choose-product-title">
          <div className="max-w-[1440px] mx-auto">
            <Reveal>
              <SectionHeader
                id="choose-product-title"
                eyebrow="CHOOSE YOUR BASE"
                title="What Would You Like to Build?"
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-24 grid md:grid-cols-3 gap-12" stagger={0.15}>
              {productTypes.map((product) => (
                <RevealChild key={product.type}>
                  <Link href={product.href} className="group block">
                    <article className="border border-border rounded-sm overflow-hidden hover:border-accent-gold/30 transition-all duration-300">
                      <div className="aspect-[4/3] bg-bg-secondary relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-8">
                        <h2 className="font-display text-h2 mb-3 group-hover:text-accent-primary transition-colors duration-200">
                          {product.name}
                        </h2>
                        <p className="font-ui text-small text-text-primary/60 mb-6">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.steps.map((step) => (
                            <span key={step} className="font-ui text-micro px-3 py-1 bg-bg-secondary rounded-full text-text-primary/60">
                              {step}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 font-ui text-caption underline-gold inline-flex items-center gap-2">
                          Start Building
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                </RevealChild>
              ))}
            </RevealStagger>
          </div>
        </section>

        <FaqBlock
          title="Design Your Own — Questions"
          items={[
            {
              question: 'Can I customize the length of my necklace?',
              answer: 'Yes. Every necklace configurator includes a length selection step — choose from choker (35cm), princess (45cm), or matinee (55cm). For custom lengths, add a note in the personalization step and our atelier will accommodate.',
            },
            {
              question: 'What happens if a part I want is out of stock?',
              answer: 'If a part shows "Made to order," it will be handcrafted specifically for your piece. Lead times are displayed on each part card — typically 2 to 4 weeks. You can proceed with your design and we will confirm timelines upon order.',
            },
            {
              question: 'Can I change my design after saving it?',
              answer: 'Absolutely. Save your design and return to it anytime. You can swap parts, adjust quantities, and update personalization before placing your order.',
            },
            {
              question: 'How long does bespoke production take?',
              answer: 'Most pieces take 12 to 18 days from final design confirmation to shipment. Complex pieces with multiple stones or intricate settings may take up to 4 weeks. Your estimated ship date is shown at checkout.',
            },
            {
              question: 'Can I book a video consultation instead of building online?',
              answer: 'Yes. Every configurator includes a "Book a Consultation" option. Our creative director will guide you through the process over video, showing pieces in person and advising on combinations.',
            },
            {
              question: 'Are the prices shown final?',
              answer: 'Yes. The price breakdown shows every component, adjustment, and personalization fee. No hidden costs. Prices are in INR and include all materials and craftsmanship.',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
