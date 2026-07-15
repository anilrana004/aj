import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { FadeIn } from '@/components/ui/Animations';

export const metadata: Metadata = buildMetadata({
  title: 'Craftsmanship',
  description: 'The art of making — Jaipur\'s centuries-old artisan traditions refined through modern design. Meet the makers behind every Apriliha Singh piece.',
  path: '/craftsmanship',
});

const CRAFT_STEPS = [
  {
    title: 'Design',
    description: 'Every piece begins as a drawing — a conversation between the designer and the craft. We consider weight, balance, texture, and how the piece will feel against skin.',
  },
  {
    title: 'Material Selection',
    description: 'We source bronze, gemstones, rudraksha, and other materials from trusted suppliers in Rajasthan and across India. Each material is chosen for its quality, origin, and story.',
  },
  {
    title: 'Handcrafting',
    description: 'Our artisans shape, form, and assemble each piece by hand using techniques refined over generations. No two pieces are identical — each carries the subtle mark of the maker.',
  },
  {
    title: 'Finishing',
    description: 'The final finish — whether oxidized, satin, or warm antique — is applied last, giving each piece its distinctive character. This is where the piece transforms from metal to jewelry.',
  },
  {
    title: 'Quality Check',
    description: 'Every piece passes through a final inspection before it leaves the atelier. We check weight, balance, clasp function, and overall finish — ensuring it meets our standard.',
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: 'The Art of Making — Apriliha Singh Craftsmanship',
          datePublished: '2024-01-01',
          author: { '@type': 'Organization', name: 'Apriliha Singh' },
        }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/30 via-bronze/20 to-aubergine/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-label uppercase tracking-widest text-sand/50 mb-4">Craftsmanship</p>
            <h1 className="font-serif text-display text-sand leading-tight">
              The Art of Making
            </h1>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[700px] mx-auto px-6">
          <FadeIn>
            <p className="font-serif text-headline text-aubergine leading-tight mb-8">
              In Jaipur, where gemstone cutting and metalwork have been practiced for centuries, our artisans transform raw materials into pieces that carry the weight of heritage and the lightness of modern design.
            </p>
            <p className="text-body-lg text-bronze leading-relaxed">
              We believe that craft is not nostalgia — it is a living practice. Every technique we use has been refined over generations, and every piece we create is made to be worn in the present. This is the tension that makes our work interesting: ancient skill, contemporary intention.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-stone/20 py-20 lg:py-28">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-headline text-aubergine text-center mb-16">Our Process</h2>
          </FadeIn>
          <div className="space-y-12">
            {CRAFT_STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="grid grid-cols-[60px,1fr] lg:grid-cols-[100px,1fr] gap-6 items-start">
                  <div className="text-right">
                    <span className="font-serif text-headline text-stone/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="border-t border-stone/30 pt-6">
                    <h3 className="font-serif text-subhead text-aubergine mb-3">{step.title}</h3>
                    <p className="text-body-lg text-bronze leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-headline text-aubergine mb-6">
              See It Come Together
            </h2>
            <p className="text-body-lg text-bronze mb-8">
              Our bespoke builder lets you witness this process in miniature — choosing each part, seeing the design assemble, and understanding the story behind every component.
            </p>
            <a
              href="/build/necklace"
              className="inline-block h-12 px-8 bg-terracotta text-sand-light text-label uppercase tracking-widest hover:bg-bronze transition-colors"
            >
              Try the Builder
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
