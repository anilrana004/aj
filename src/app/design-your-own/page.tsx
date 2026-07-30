import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Reveal, RevealStagger, RevealChild } from '@/components/ui/Animate';
import { SectionHeader } from '@/components/sections/Hero';
import { FaqBlock } from '@/components/seo/FaqSchema';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { img } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Design Your Own — Bespoke Jewelry Builder',
  description:
    'Build necklace, bracelet, mala, ring, earring, or anklet part by part. Watch your piece assemble in real time.',
};

const productTypes = [
  {
    type: 'necklace',
    name: 'Necklace',
    description: 'Chain forms, centerpiece attaches, stone seats, clasp completes.',
    image: img.configuratorNecklace,
    href: '/design-your-own/necklace',
    steps: ['Chain', 'Centerpiece', 'Stone', 'Clasp', 'Length'],
  },
  {
    type: 'bracelet',
    name: 'Bracelet',
    description: 'A shorter assembly — foundation, motif, spacers, clasp.',
    image: img.configuratorBracelet,
    href: '/design-your-own/bracelet',
    steps: ['Foundation', 'Centerpiece', 'Spacers', 'Clasp'],
  },
  {
    type: 'mala',
    name: 'Mala',
    description: 'Thread forms, beads string on, guru bead settles, tassel finishes.',
    image: img.configuratorMala,
    href: '/design-your-own/mala',
    steps: ['Thread', 'Beads', 'Spacers', 'Guru', 'Tassel'],
  },
  {
    type: 'ring',
    name: 'Ring',
    description: 'Band forms, setting attaches, stone seats — then choose your size.',
    image: img.configuratorBracelet,
    href: '/design-your-own/ring',
    steps: ['Band', 'Setting', 'Stone', 'Size'],
  },
  {
    type: 'earring',
    name: 'Earrings',
    description: 'Build once, priced as a pair. Assembly plays once, then presents as two.',
    image: img.configuratorNecklace,
    href: '/design-your-own/earring',
    steps: ['Finding', 'Drop', 'Accent', 'Back'],
  },
  {
    type: 'anklet',
    name: 'Anklet',
    description: 'Like a bracelet, plus an optional charm that settles once — no loop.',
    image: img.configuratorMala,
    href: '/design-your-own/anklet',
    steps: ['Foundation', 'Motif', 'Spacers', 'Charm', 'Clasp'],
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
      <main id="main-content" className="site-main">
        <section className="py-20 px-responsive text-center">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <p className="eyebrow-gold mb-6">Bespoke Configurator</p>
              <h1 className="font-display text-hero mb-8">Design Your Own</h1>
              <p className="font-ui text-body text-text-primary/70 max-w-[600px] mx-auto">
                Every piece begins with a conversation between karigar and client. Choose each part —
                watch the piece assemble in place, with price and origin story for every choice.
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
                description="Not a static swap. Each choice attaches where it belongs — and comes off again if you change your mind."
                alignment="center"
              />
            </Reveal>

            <RevealStagger className="mt-16 grid sm:grid-cols-3 gap-8 max-w-[900px] mx-auto" stagger={0.1}>
              {[
                { step: '1', title: 'Choose', description: 'One part at a time, with its price and craft story.' },
                { step: '2', title: 'Assemble', description: 'Watch it join the piece in real time — desktop and mobile.' },
                { step: '3', title: 'Own', description: 'One composed product, server-verified price, into cart.' },
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

            <RevealStagger className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-10" stagger={0.1}>
              {productTypes.map((product) => (
                <RevealChild key={product.type}>
                  <Link href={product.href} className="group block">
                    <article className="border border-border overflow-hidden hover:border-accent-gold/30 transition-colors duration-300">
                      <div className="aspect-[4/3] bg-bg-secondary relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-8">
                        <h2 className="font-display text-h2 mb-3 uppercase tracking-[0.08em] group-hover:text-accent-primary transition-colors">
                          {product.name}
                        </h2>
                        <p className="font-ui text-small text-text-primary/60 mb-6">{product.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.steps.map((step) => (
                            <span
                              key={step}
                              className="font-ui text-micro px-3 py-1 bg-warm-stone text-accent-primary uppercase tracking-[0.1em]"
                            >
                              {step}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 font-ui text-caption text-accent-gold uppercase tracking-[0.13em] underline underline-offset-4 inline-flex items-center gap-2">
                          Start Building
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
              question: 'Is the price I see the price I pay?',
              answer:
                'Yes for the merchandise total. When you add to cart, the server recalculates from part IDs and rejects any tampered client total. Earrings are always doubled as a pair.',
            },
            {
              question: 'Do ring sizes cost extra?',
              answer:
                'No. Ring size is a required fit choice and does not change the price — but you cannot add a ring to cart without selecting a size.',
            },
            {
              question: 'Can I change a part after selecting it?',
              answer:
                'Yes. Swap or remove any part — it detaches in the preview, and the running total updates live.',
            },
            {
              question: 'How long does bespoke production take?',
              answer:
                'Most pieces take 12 to 18 days from confirmation. Lead times are shown on each part.',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
