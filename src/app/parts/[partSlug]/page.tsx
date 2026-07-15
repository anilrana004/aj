import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allConfiguratorParts } from '@/lib/data/configurator-parts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Reveal } from '@/components/ui/Animate';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ partSlug: string }> }): Promise<Metadata> {
  const { partSlug } = await params;
  const part = allConfiguratorParts.find((p) => p.slug === partSlug);

  if (!part) {
    return { title: 'Part Not Found' };
  }

  return {
    title: `${part.name} — Craft Story | Apriliha Singh`,
    description: part.story.narrative,
    openGraph: {
      title: `${part.name} | Apriliha Singh`,
      description: part.story.headline,
      images: part.images[0]?.url ? [part.images[0].url] : [],
    },
  };
}

export default async function PartStoryPage({ params }: { params: Promise<{ partSlug: string }> }) {
  const { partSlug } = await params;
  const part = allConfiguratorParts.find((p) => p.slug === partSlug);

  if (!part) {
    notFound();
  }

  const editorialImage = part.images.find((img) => img.type === 'editorial');
  const cutoutImage = part.images.find((img) => img.type === 'builder-cutout');

  return (
    <>
      <ProductSchema part={part} url={`https://aprilihasingh.com/parts/${part.slug}`} />
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Parts', url: 'https://aprilihasingh.com/design-your-own' },
          { label: part.name, url: `https://aprilihasingh.com/parts/${part.slug}` },
        ]}
      />
      <Header />
      <main id="main-content" className="pt-[60px]">
        <article className="py-32 px-responsive">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="aspect-[4/5] relative overflow-hidden bg-bg-secondary">
                    {(editorialImage || cutoutImage) && (
                      <img
                        src={(editorialImage || cutoutImage)!.url}
                        alt={(editorialImage || cutoutImage)!.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.2}>
                  <nav className="mb-8" aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-2 font-ui text-caption text-text-primary/60">
                      <li><Link href="/" className="hover:text-accent-primary">Home</Link></li>
                      <li aria-hidden="true">/</li>
                      <li><Link href="/design-your-own" className="hover:text-accent-primary">Design Your Own</Link></li>
                      <li aria-hidden="true">/</li>
                      <li aria-current="page" className="text-text-primary">{part.name}</li>
                    </ol>
                  </nav>

                  <p className="eyebrow-gold mb-4">{part.slotType}</p>
                  <h1 className="font-display text-hero mb-4">{part.name}</h1>
                  <p className="font-display italic text-h3 mb-8 text-text-primary/70">
                    &ldquo;{part.story.headline}&rdquo;
                  </p>

                  <div className="font-ui text-body leading-relaxed space-y-6 mb-12 text-text-primary/85">
                    <p>{part.story.narrative}</p>
                  </div>

                  <div className="border-t divider-ink pt-8 space-y-4">
                    <dl className="grid grid-cols-2 gap-4 font-ui text-body">
                      <dt className="text-text-primary/50">Material</dt>
                      <dd>{part.material.replace(/-/g, ' ')}</dd>
                      <dt className="text-text-primary/50">Craft time</dt>
                      <dd>{part.story.craftTime}</dd>
                      <dt className="text-text-primary/50">Origin</dt>
                      <dd>{part.story.originRegion}</dd>
                      <dt className="text-text-primary/50">Weight</dt>
                      <dd>{part.weightGrams}g</dd>
                    </dl>
                  </div>

                  <div className="border-t divider-ink pt-8 mt-8">
                    <div className="flex justify-between items-baseline mb-6">
                      <span className="font-ui text-caption text-text-primary/50">Price</span>
                      <span className="font-display text-h2 text-accent-gold">
                        {part.price === 0 ? 'Included' : `₹${part.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    {part.inStockQuantity > 0 ? (
                      <p className="font-ui text-caption text-text-primary/50">
                        In stock · Ships within {part.leadTimeDays} days
                      </p>
                    ) : (
                      <p className="font-ui text-caption text-accent-primary">
                        Made to order · Approximately {part.leadTimeDays} days lead time
                      </p>
                    )}
                  </div>

                  <div className="mt-8">
                    <Link
                      href={`/design-your-own/${part.slotType === 'bead' || part.slotType === 'guru_bead' || part.slotType === 'tassel' ? 'mala' : part.slotType === 'cord' ? 'bracelet' : 'necklace'}`}
                      className="btn-primary text-text-inverse inline-flex items-center gap-2"
                    >
                      Use This Part
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
