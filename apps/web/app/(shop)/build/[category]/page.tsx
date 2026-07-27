import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import BespokeBuilder from '@/components/builder/BespokeBuilder';

interface BuilderPageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: BuilderPageProps): Promise<Metadata> {
  const name = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return buildMetadata({
    title: `Design Your ${name}`,
    description: `Use our bespoke builder to design a custom ${name.toLowerCase()} handcrafted in Jaipur. Choose every part — chain, pendant, stones, clasp, finish — and watch your piece come together.`,
    path: `/build/${params.category}`,
  });
}

// In production, these would come from the database
async function getPartTypes(categorySlug: string) {
  const PART_TYPES_DB: Record<string, any[]> = {
    necklace: [
      {
        id: 'pt-base',
        slug: 'base',
        name: 'Chain / Base',
        isRequired: true,
        sortOrder: 1,
        allowMultiple: false,
        parts: [
          { id: 'p-bronze-chain', name: 'Oxidized Bronze Chain', slug: 'oxidized-bronze-chain', price: 8000, story: 'Our signature oxidized bronze chain is hand-linked in our Jaipur atelier. Each link is individually shaped, then treated with a traditional patination process that creates a deep, aged tone — darker than polished bronze, warmer than blackened silver. The chain develops a unique character with wear, growing more personal over time.', origin: 'Jaipur, Rajasthan', material: 'Oxidized Bronze', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'base' },
          { id: 'p-gold-chain', name: 'Matte Gold-Finish Chain', slug: 'matte-gold-finish-chain', price: 14000, story: 'A matte gold-finished chain crafted from bronze with a subtle, non-reflective surface. The finish is achieved through hand-brushing rather than polishing — a technique that gives the metal a quiet warmth without the high shine of traditional gold jewelry.', origin: 'Jaipur, Rajasthan', material: 'Bronze with gold finish', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'base' },
          { id: 'p-terracotta-chain', name: 'Terracotta & Bronze Chain', slug: 'terracotta-bronze-chain', price: 10000, story: 'A mixed-material chain combining hand-formed terracotta beads with oxidized bronze links. The terracotta is sourced from local clay and fired in small batches, giving each bead a slightly different warmth and texture.', origin: 'Jaipur, Rajasthan', material: 'Terracotta, Bronze', images: [], isAvailable: true, leadTimeDays: 7, partTypeSlug: 'base' },
        ],
      },
      {
        id: 'pt-centerpiece',
        slug: 'centerpiece',
        name: 'Centerpiece / Pendant',
        isRequired: true,
        sortOrder: 2,
        allowMultiple: false,
        parts: [
          { id: 'p-lotus-pendant', name: 'Lotus Medallion', slug: 'lotus-medallion', price: 5000, story: 'The lotus medallion is hand-carved using a technique passed down through Jaipur\'s stone-carving families. Each petal is individually shaped, creating a piece that catches light differently from every angle. The lotus — symbol of purity and renewal — is rendered in a modern, geometric style.', origin: 'Jaipur, Rajasthan', material: 'Oxidized Bronze', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'centerpiece' },
          { id: 'p-ruby-pendant', name: 'Ruby Drop Pendant', slug: 'ruby-drop-pendant', price: 12000, story: 'A hand-selected ruby, ethically sourced from mines in Rajasthan, set in an oxidized bronze bezel. The setting technique — a simple wrap that leaves the stone partially exposed — is designed to let the natural color and clarity of the ruby speak for itself.', origin: 'Jaipur, Rajasthan', material: 'Ruby, Oxidized Bronze', images: [], isAvailable: true, leadTimeDays: 7, partTypeSlug: 'centerpiece' },
          { id: 'p-plain-pendant', name: 'Minimalist Bar', slug: 'minimalist-bar', price: 3500, story: 'A clean, geometric bar pendant — the most restrained piece in our collection. It represents our belief that sometimes the most powerful statement is the quietest. Hand-cut and finished with a subtle matte texture.', origin: 'Jaipur, Rajasthan', material: 'Bronze', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'centerpiece' },
        ],
      },
      {
        id: 'pt-stone',
        slug: 'stone',
        name: 'Accent Stone(s)',
        isRequired: false,
        sortOrder: 3,
        allowMultiple: true,
        parts: [
          { id: 'p-moonstone', name: 'Moonstone', slug: 'moonstone-accent', price: 2500, story: 'Moonstone has been treasured in Indian jewelry for centuries. Our moonstones are sourced from southern India and selected for their blue adularescence — the ethereal glow that shifts as the stone moves.', origin: 'Southern India', material: 'Moonstone', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'stone' },
          { id: 'p-rudraksha', name: 'Rudraksha Bead', slug: 'rudraksha-accent', price: 1500, story: 'Rudraksha beads — the dried seeds of the Elaeocarpus ganitrus tree — have been used in malas and sacred jewelry across South Asia for millennia. Each bead is naturally textured with a unique surface pattern.', origin: 'Nepal', material: 'Rudraksha', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'stone' },
          { id: 'p-turquoise', name: 'Turquoise', slug: 'turquoise-accent', price: 3000, story: 'A small turquoise accent, hand-cut and polished. Turquoise has been part of Indian adornment since the Mughal era, valued for its distinctive blue-green color and believed protective qualities.', origin: 'Rajasthan', material: 'Turquoise', images: [], isAvailable: true, leadTimeDays: 3, partTypeSlug: 'stone' },
        ],
      },
      {
        id: 'pt-length',
        slug: 'length',
        name: 'Length',
        isRequired: true,
        sortOrder: 4,
        allowMultiple: false,
        parts: [
          { id: 'p-16', name: '16 inches — Choker', slug: 'length-16', price: 0, story: 'The choker length sits at the base of the neck — intimate and architectural. Best suited for pendants and medallions that rest at the collarbone.', origin: '', material: '', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'length' },
          { id: 'p-18', name: '18 inches — Classic', slug: 'length-18', price: 1000, story: 'Our most popular length. The classic 18-inch necklace sits just below the collarbone — versatile enough for daily wear, substantial enough to make a statement.', origin: '', material: '', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'length' },
          { id: 'p-22', name: '22 inches — Layered', slug: 'length-22', price: 2000, story: 'The longer length creates a graceful drape across the chest. Ideal for layering with shorter necklaces or for showcasing larger pendants.', origin: '', material: '', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'length' },
        ],
      },
      {
        id: 'pt-clasp',
        slug: 'clasp',
        name: 'Clasp',
        isRequired: true,
        sortOrder: 5,
        allowMultiple: false,
        parts: [
          { id: 'p-lobster', name: 'Lobster Clasp', slug: 'lobster-clasp', price: 0, story: 'The classic lobster clasp — reliable, secure, and understated. Crafted in matching bronze or gold finish.', origin: 'Jaipur, Rajasthan', material: 'Bronze', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'clasp' },
          { id: 'p-magnetic', name: 'Magnetic Clasp', slug: 'magnetic-clasp', price: 500, story: 'A strong magnetic clasp designed for ease of use. The rare-earth magnets are concealed within hand-finished bronze casings, creating a seamless look.', origin: 'Jaipur, Rajasthan', material: 'Bronze, Rare-earth magnet', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'clasp' },
          { id: 'p-hook', name: 'Hand-Forged Hook', slug: 'forged-hook', price: 300, story: 'The simplest and most artisanal clasp option — a hand-forged hook that catches a matching loop. This closure carries the most visible hand of the maker.', origin: 'Jaipur, Rajasthan', material: 'Bronze', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'clasp' },
        ],
      },
      {
        id: 'pt-finish',
        slug: 'finish',
        name: 'Finish / Metal Tone',
        isRequired: true,
        sortOrder: 6,
        allowMultiple: false,
        parts: [
          { id: 'p-oxidized', name: 'Oxidized (Dark Patina)', slug: 'oxidized-finish', price: 0, story: 'Our signature finish. The dark patina is achieved through a controlled oxidation process that gives the bronze a deep, aged appearance — as though the piece has been worn and loved for decades.', origin: 'Jaipur, Rajasthan', material: '', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'finish' },
          { id: 'p-satin', name: 'Satin (Matte)', slug: 'satin-finish', price: 500, story: 'A smooth, matte finish achieved through careful hand-brushing. Satin absorbs light rather than reflecting it — creating a quiet, understated tone.', origin: 'Jaipur, Rajasthan', material: '', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'finish' },
          { id: 'p-warm', name: 'Warm Antique', slug: 'warm-antique-finish', price: 800, story: 'A warm, honey-toned antique finish that sits between polished gold and oxidized bronze. This finish deepens and warms further with wear.', origin: 'Jaipur, Rajasthan', material: '', images: [], isAvailable: true, leadTimeDays: 0, partTypeSlug: 'finish' },
        ],
      },
    ],
  };

  return PART_TYPES_DB[categorySlug] || [];
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const categorySlug = params.category;
  const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) + 's';
  const partTypes = await getPartTypes(categorySlug);

  return (
    <BespokeBuilder
      categorySlug={categorySlug}
      categoryName={categoryName}
      partTypes={partTypes}
    />
  );
}
