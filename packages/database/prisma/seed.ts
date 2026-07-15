import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Categories
  const necklace = await prisma.category.upsert({
    where: { slug: 'necklace' },
    update: {},
    create: { slug: 'necklace', name: 'Necklaces' },
  });

  const bracelet = await prisma.category.upsert({
    where: { slug: 'bracelet' },
    update: {},
    create: { slug: 'bracelet', name: 'Bracelets' },
  });

  const mala = await prisma.category.upsert({
    where: { slug: 'mala' },
    update: {},
    create: { slug: 'mala', name: 'Malas' },
  });

  // Part Types for Necklace
  const baseType = await prisma.partType.upsert({
    where: { categoryId_slug: { categoryId: necklace.id, slug: 'base' } },
    update: {},
    create: { categoryId: necklace.id, slug: 'base', name: 'Chain / Base', isRequired: true, sortOrder: 1 },
  });

  const centerpieceType = await prisma.partType.upsert({
    where: { categoryId_slug: { categoryId: necklace.id, slug: 'centerpiece' } },
    update: {},
    create: { categoryId: necklace.id, slug: 'centerpiece', name: 'Centerpiece / Pendant', isRequired: true, sortOrder: 2 },
  });

  const stoneType = await prisma.partType.upsert({
    where: { categoryId_slug: { categoryId: necklace.id, slug: 'stone' } },
    update: {},
    create: { categoryId: necklace.id, slug: 'stone', name: 'Accent Stone(s)', isRequired: false, sortOrder: 3, allowMultiple: true },
  });

  const lengthType = await prisma.partType.upsert({
    where: { categoryId_slug: { categoryId: necklace.id, slug: 'length' } },
    update: {},
    create: { categoryId: necklace.id, slug: 'length', name: 'Length', isRequired: true, sortOrder: 4 },
  });

  const claspType = await prisma.partType.upsert({
    where: { categoryId_slug: { categoryId: necklace.id, slug: 'clasp' } },
    update: {},
    create: { categoryId: necklace.id, slug: 'clasp', name: 'Clasp', isRequired: true, sortOrder: 5 },
  });

  const finishType = await prisma.partType.upsert({
    where: { categoryId_slug: { categoryId: necklace.id, slug: 'finish' } },
    update: {},
    create: { categoryId: necklace.id, slug: 'finish', name: 'Finish / Metal Tone', isRequired: true, sortOrder: 6 },
  });

  // Parts for Necklace Base
  await prisma.part.upsert({
    where: { slug: 'oxidized-bronze-chain' },
    update: {},
    create: {
      partTypeId: baseType.id,
      name: 'Oxidized Bronze Chain',
      slug: 'oxidized-bronze-chain',
      price: 8000,
      story: 'Our signature oxidized bronze chain is hand-linked in our Jaipur atelier. Each link is individually shaped, then treated with a traditional patination process that creates a deep, aged tone — darker than polished bronze, warmer than blackened silver.',
      origin: 'Jaipur, Rajasthan',
      material: 'Oxidized Bronze',
      images: [],
      imageAlts: [],
      isAvailable: true,
      leadTimeDays: 0,
      sortOrder: 1,
    },
  });

  await prisma.part.upsert({
    where: { slug: 'matte-gold-finish-chain' },
    update: {},
    create: {
      partTypeId: baseType.id,
      name: 'Matte Gold-Finish Chain',
      slug: 'matte-gold-finish-chain',
      price: 14000,
      story: 'A matte gold-finished chain crafted from bronze with a subtle, non-reflective surface. The finish is achieved through hand-brushing rather than polishing.',
      origin: 'Jaipur, Rajasthan',
      material: 'Bronze with gold finish',
      images: [],
      imageAlts: [],
      isAvailable: true,
      leadTimeDays: 0,
      sortOrder: 2,
    },
  });

  // Parts for Necklace Centerpiece
  await prisma.part.upsert({
    where: { slug: 'lotus-medallion' },
    update: {},
    create: {
      partTypeId: centerpieceType.id,
      name: 'Lotus Medallion',
      slug: 'lotus-medallion',
      price: 5000,
      story: 'The lotus medallion is hand-carved using a technique passed down through Jaipur\'s stone-carving families. Each petal is individually shaped.',
      origin: 'Jaipur, Rajasthan',
      material: 'Oxidized Bronze',
      images: [],
      imageAlts: [],
      isAvailable: true,
      leadTimeDays: 0,
      sortOrder: 1,
    },
  });

  await prisma.part.upsert({
    where: { slug: 'ruby-drop-pendant' },
    update: {},
    create: {
      partTypeId: centerpieceType.id,
      name: 'Ruby Drop Pendant',
      slug: 'ruby-drop-pendant',
      price: 12000,
      story: 'A hand-selected ruby, ethically sourced from mines in Rajasthan, set in an oxidized bronze bezel.',
      origin: 'Jaipur, Rajasthan',
      material: 'Ruby, Oxidized Bronze',
      images: [],
      imageAlts: [],
      isAvailable: true,
      leadTimeDays: 7,
      sortOrder: 2,
    },
  });

  // Stone Parts
  await prisma.part.upsert({
    where: { slug: 'moonstone-accent' },
    update: {},
    create: {
      partTypeId: stoneType.id,
      name: 'Moonstone',
      slug: 'moonstone-accent',
      price: 2500,
      story: 'Moonstone has been treasured in Indian jewelry for centuries. Our moonstones are sourced from southern India and selected for their blue adularescence.',
      origin: 'Southern India',
      material: 'Moonstone',
      images: [],
      imageAlts: [],
      isAvailable: true,
      leadTimeDays: 0,
      sortOrder: 1,
    },
  });

  await prisma.part.upsert({
    where: { slug: 'rudraksha-accent' },
    update: {},
    create: {
      partTypeId: stoneType.id,
      name: 'Rudraksha Bead',
      slug: 'rudraksha-accent',
      price: 1500,
      story: 'Rudraksha beads have been used in malas and sacred jewelry across South Asia for millennia.',
      origin: 'Nepal',
      material: 'Rudraksha',
      images: [],
      imageAlts: [],
      isAvailable: true,
      leadTimeDays: 0,
      sortOrder: 2,
    },
  });

  // Length Parts
  for (const [slug, name, price, story] of [
    ['length-16', '16 inches — Choker', 0, 'The choker length sits at the base of the neck — intimate and architectural.'],
    ['length-18', '18 inches — Classic', 1000, 'Our most popular length. Sits just below the collarbone.'],
    ['length-22', '22 inches — Layered', 2000, 'The longer length creates a graceful drape across the chest.'],
  ] as const) {
    await prisma.part.upsert({
      where: { slug },
      update: {},
      create: {
        partTypeId: lengthType.id,
        name,
        slug,
        price,
        story,
        images: [],
        imageAlts: [],
        isAvailable: true,
        leadTimeDays: 0,
        sortOrder: slug === 'length-16' ? 1 : slug === 'length-18' ? 2 : 3,
      },
    });
  }

  // Clasp Parts
  for (const [slug, name, price, story] of [
    ['lobster-clasp', 'Lobster Clasp', 0, 'The classic lobster clasp — reliable, secure, and understated.'],
    ['magnetic-clasp', 'Magnetic Clasp', 500, 'A strong magnetic clasp designed for ease of use.'],
    ['forged-hook', 'Hand-Forged Hook', 300, 'The simplest and most artisanal clasp option.'],
  ] as const) {
    await prisma.part.upsert({
      where: { slug },
      update: {},
      create: {
        partTypeId: claspType.id,
        name,
        slug,
        price,
        story,
        images: [],
        imageAlts: [],
        isAvailable: true,
        leadTimeDays: 0,
        sortOrder: slug === 'lobster-clasp' ? 1 : slug === 'magnetic-clasp' ? 2 : 3,
      },
    });
  }

  // Finish Parts
  for (const [slug, name, price, story] of [
    ['oxidized-finish', 'Oxidized (Dark Patina)', 0, 'Our signature finish. The dark patina is achieved through a controlled oxidation process.'],
    ['satin-finish', 'Satin (Matte)', 500, 'A smooth, matte finish achieved through careful hand-brushing.'],
    ['warm-antique-finish', 'Warm Antique', 800, 'A warm, honey-toned antique finish that sits between polished gold and oxidized bronze.'],
  ] as const) {
    await prisma.part.upsert({
      where: { slug },
      update: {},
      create: {
        partTypeId: finishType.id,
        name,
        slug,
        price,
        story,
        images: [],
        imageAlts: [],
        isAvailable: true,
        leadTimeDays: 0,
        sortOrder: slug === 'oxidized-finish' ? 1 : slug === 'satin-finish' ? 2 : 3,
      },
    });
  }

  // Sample Collections
  await prisma.collection.upsert({
    where: { slug: 'heritage' },
    update: {},
    create: {
      slug: 'heritage',
      name: 'Heritage Collection',
      description: 'Pieces that draw from Jaipur\'s centuries-old craft traditions.',
      sortOrder: 1,
    },
  });

  await prisma.collection.upsert({
    where: { slug: 'modern' },
    update: {},
    create: {
      slug: 'modern',
      name: 'Modern Essentials',
      description: 'Clean, contemporary pieces for everyday wear.',
      sortOrder: 2,
    },
  });

  // Sample Journal Articles
  await prisma.journalArticle.upsert({
    where: { slug: 'the-art-of-oxidized-bronze' },
    update: {},
    create: {
      slug: 'the-art-of-oxidized-bronze',
      title: 'The Art of Oxidized Bronze',
      excerpt: 'How our artisans achieve the distinctive dark patina that gives each piece its timeless depth.',
      content: 'Oxidation is not damage — it is intention. In our Jaipur atelier, we use a traditional patination process that darkens bronze through controlled chemical reactions, creating a surface that feels ancient and contemporary at the same time.',
      author: 'Apriliha Singh',
      tags: ['craftsmanship', 'bronze', 'oxidation'],
      category: 'craftsmanship',
      isPublished: true,
      publishedAt: new Date('2024-12-15'),
    },
  });

  await prisma.journalArticle.upsert({
    where: { slug: 'jaipur-gemstone-heritage' },
    update: {},
    create: {
      slug: 'jaipur-gemstone-heritage',
      title: 'Jaipur\'s Gemstone Heritage',
      excerpt: 'A journey through the pink city\'s centuries-old gem-cutting traditions.',
      content: 'Jaipur has been India\'s gemstone capital since the 18th century, when Maharaja Sawai Jai Singh II established the city as a center for trade and craftsmanship.',
      author: 'Apriliha Singh',
      tags: ['jaipur', 'gemstones', 'heritage'],
      category: 'story',
      isPublished: true,
      publishedAt: new Date('2024-11-28'),
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
