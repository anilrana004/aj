import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { FadeIn } from '@/components/ui/Animations';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Apriliha Singh — fine jewelry, bespoke and ready-to-wear. Handcrafted in Jaipur with quiet luxury, enduring craft, and modern restraint.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          name: 'Apriliha Singh',
          description: 'Apriliha Singh is a fine jewelry brand based in Jaipur, Rajasthan, India. The brand specializes in bespoke and ready-to-wear jewelry, combining centuries-old Indian artisan traditions with modern, restrained design. All pieces are handcrafted in the Jaipur atelier using traditional metalworking techniques including bronze oxidation, hand-forging, and gemstone setting.',
          foundingDate: '2024',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jaipur',
            addressRegion: 'Rajasthan',
            addressCountry: 'IN',
          },
        }}
      />

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[700px] mx-auto px-6">
          <FadeIn>
            <h1 className="font-serif text-display text-aubergine leading-tight mb-8">
              Apriliha Singh
            </h1>
            <p className="text-body-lg text-bronze leading-relaxed mb-6">
              Apriliha Singh is a fine jewelry brand based in Jaipur, Rajasthan, India. We specialize in bespoke and ready-to-wear jewelry, combining centuries-old Indian artisan traditions with modern, restrained design.
            </p>
            <p className="text-body-lg text-bronze leading-relaxed mb-6">
              Every piece is handcrafted in our Jaipur atelier using traditional metalworking techniques — bronze oxidation, hand-forging, gemstone setting, and rudraksha stringing — refined through a contemporary design lens.
            </p>
            <p className="text-body-lg text-bronze leading-relaxed">
              Our design philosophy is guided by quiet luxury: rich materials and deep craft, expressed with restraint. We believe the most meaningful jewelry is not the loudest, but the most considered — pieces that carry story, heritage, and intention.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone/20 py-20 lg:py-28">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-headline text-aubergine text-center mb-16">What We Believe</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Craft Is Living',
                description: 'We honor traditional techniques not as museum pieces, but as living skills that evolve with each generation of makers.',
              },
              {
                title: 'Quiet Speaks Louder',
                description: 'In a world of noise, we choose restraint. Our pieces whisper rather than shout — and in doing so, they are heard more clearly.',
              },
              {
                title: 'Every Part Has a Story',
                description: 'From the origin of a gemstone to the technique used to finish a clasp, every component of our jewelry carries meaning.',
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div>
                  <h3 className="font-serif text-subhead text-aubergine mb-3">{value.title}</h3>
                  <p className="text-body text-bronze leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Jaipur */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[700px] mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-headline text-aubergine mb-6">Based in Jaipur</h2>
            <p className="text-body-lg text-bronze leading-relaxed mb-6">
              Jaipur — the Pink City — has been India&apos;s center for gemstone cutting and metalwork since the 18th century. Our atelier is in the heart of the old city, surrounded by workshops that have been practicing these crafts for generations.
            </p>
            <p className="text-body-lg text-bronze leading-relaxed">
              Being here is not incidental to our work — it is essential. The proximity to materials, skills, and tradition shapes every decision we make, from the metals we choose to the techniques our artisans employ.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
