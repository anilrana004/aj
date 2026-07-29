import { unsplash } from '@/lib/images';
import { ConfiguratorPart, ProductSlot, SlotType } from '@/types/part';

export const necklaceSlots: ProductSlot[] = [
  { id: 'neck-chain', slotType: 'chain', label: 'The Foundation', description: 'Every necklace begins with a chain. Choose the metal and style that speaks to you.', required: true, allowsMultiple: false, sortOrder: 1, assemblyFeel: 'form' },
  { id: 'neck-centerpiece', slotType: 'centerpiece', label: 'The Centerpiece', description: 'The emotional heart of your piece — a motif that the stone will seat into.', required: true, allowsMultiple: false, sortOrder: 2, assemblyFeel: 'attach' },
  { id: 'neck-stone', slotType: 'stone', label: 'The Stone', description: 'Optional. When chosen, it seats into the centerpiece — the piece visibly completes.', required: false, allowsMultiple: false, sortOrder: 3, assemblyFeel: 'seat' },
  { id: 'neck-clasp', slotType: 'clasp', label: 'The Clasp', description: 'The final touch — where function meets craft.', required: true, allowsMultiple: false, sortOrder: 4, assemblyFeel: 'attach' },
  { id: 'neck-length', slotType: 'length', label: 'Length', description: 'Choose how your piece sits — close at the throat, or long over the heart.', required: true, allowsMultiple: false, sortOrder: 5, assemblyFeel: 'form' },
];

export const braceletSlots: ProductSlot[] = [
  { id: 'brace-cord', slotType: 'cord', label: 'The Foundation', description: 'The base your bracelet is built upon.', required: true, allowsMultiple: false, sortOrder: 1, assemblyFeel: 'form' },
  { id: 'brace-centerpiece', slotType: 'centerpiece', label: 'The Centerpiece', description: 'The focal point of your bracelet.', required: true, allowsMultiple: false, sortOrder: 2, assemblyFeel: 'attach' },
  { id: 'brace-spacers', slotType: 'spacer', label: 'Spacers', description: 'Small metal elements that add rhythm between beads or stones.', required: false, allowsMultiple: true, maxSelections: 8, sortOrder: 3, assemblyFeel: 'attach' },
  { id: 'brace-clasp', slotType: 'clasp', label: 'The Clasp', description: 'How you secure it. Simple or ornate — your call.', required: true, allowsMultiple: false, sortOrder: 4, assemblyFeel: 'attach' },
];

export const malaSlots: ProductSlot[] = [
  { id: 'mala-cord', slotType: 'cord', label: 'The Thread', description: 'The cord your mala is strung upon — the first thing that forms.', required: true, allowsMultiple: false, sortOrder: 1, assemblyFeel: 'form' },
  { id: 'mala-beads', slotType: 'bead', label: 'The Beads', description: '108 beads join the thread — this should read as being strung, not revealed.', required: true, allowsMultiple: false, sortOrder: 2, assemblyFeel: 'string' },
  { id: 'mala-spacers', slotType: 'spacer', label: 'Spacer Beads', description: 'Placed at intervals of 27 to mark each lap around the mala.', required: false, allowsMultiple: true, maxSelections: 3, sortOrder: 3, assemblyFeel: 'attach' },
  { id: 'mala-guru', slotType: 'guru_bead', label: 'The Guru Bead', description: 'The 109th bead — weightier, more settled than the smaller beads.', required: true, allowsMultiple: false, sortOrder: 4, assemblyFeel: 'weighty' },
  { id: 'mala-tassel', slotType: 'tassel', label: 'The Tassel', description: 'Attached below the guru bead. Represents the lotus, enlightenment, connection.', required: true, allowsMultiple: false, sortOrder: 5, assemblyFeel: 'settle' },
];

export const ringSlots: ProductSlot[] = [
  { id: 'ring-band', slotType: 'band', label: 'The Band', description: 'The ring begins as a band — the circle that holds everything.', required: true, allowsMultiple: false, sortOrder: 1, assemblyFeel: 'form' },
  { id: 'ring-setting', slotType: 'setting', label: 'The Setting', description: 'How the stone will be held — claw, bezel, or kundan.', required: true, allowsMultiple: false, sortOrder: 2, assemblyFeel: 'attach' },
  { id: 'ring-stone', slotType: 'stone', label: 'The Stone', description: 'The stone seats into the setting last — the final spark.', required: true, allowsMultiple: false, sortOrder: 3, assemblyFeel: 'seat' },
  { id: 'ring-size', slotType: 'size', label: 'Ring Size', description: 'A fit choice, not a priced part — required before checkout.', required: true, allowsMultiple: false, sortOrder: 4, assemblyFeel: 'form' },
];

export const earringSlots: ProductSlot[] = [
  { id: 'ear-post', slotType: 'chain', label: 'The Finding', description: 'Post, hook, or huggie — the foundation of the earring.', required: true, allowsMultiple: false, sortOrder: 1, assemblyFeel: 'form' },
  { id: 'ear-center', slotType: 'centerpiece', label: 'The Drop', description: 'The visible face of the earring — pendant, stud face, or motif.', required: true, allowsMultiple: false, sortOrder: 2, assemblyFeel: 'attach' },
  { id: 'ear-accent', slotType: 'accent', label: 'Accent', description: 'An optional secondary stone or motif.', required: false, allowsMultiple: false, sortOrder: 3, assemblyFeel: 'seat' },
  { id: 'ear-back', slotType: 'clasp', label: 'The Back', description: 'How it secures — push back, latch, or screw.', required: true, allowsMultiple: false, sortOrder: 4, assemblyFeel: 'attach' },
];

export const ankletSlots: ProductSlot[] = [
  { id: 'ank-cord', slotType: 'cord', label: 'The Foundation', description: 'Chain or cord for the ankle — lighter than a bracelet.', required: true, allowsMultiple: false, sortOrder: 1, assemblyFeel: 'form' },
  { id: 'ank-center', slotType: 'centerpiece', label: 'The Motif', description: 'The focal motif that sits at the front of the ankle.', required: true, allowsMultiple: false, sortOrder: 2, assemblyFeel: 'attach' },
  { id: 'ank-spacers', slotType: 'spacer', label: 'Spacers', description: 'Optional rhythm beads along the line.', required: false, allowsMultiple: true, maxSelections: 6, sortOrder: 3, assemblyFeel: 'attach' },
  { id: 'ank-charm', slotType: 'charm', label: 'Charm / Bell', description: 'Optional charm that settles once into place — no loop, one clean settle.', required: false, allowsMultiple: false, sortOrder: 4, assemblyFeel: 'settle' },
  { id: 'ank-clasp', slotType: 'clasp', label: 'The Clasp', description: 'How you fasten it.', required: true, allowsMultiple: false, sortOrder: 5, assemblyFeel: 'attach' },
];

export const allConfiguratorParts: ConfiguratorPart[] = [
  // ====== NECKLACE CHAINS ======
  {
    id: 'chain-vermeil-link',
    slug: 'vermeil-link-chain',
    name: 'The Jaipur Link Chain',
    slotType: 'chain',
    material: '18k-gold-vermeil',
    price: 18000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 12,
    compatibleSlots: ['centerpiece', 'accent', 'clasp', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1573408301185-9146fe634ad0', 800), alt: '18k gold vermeil link chain, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1599643478518-a784e5dc4c8f', 1200), alt: 'Jaipur Link Chain catching afternoon light on raw linen', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Forged where the goldsmiths still gather.',
      narrative: 'Cast in 18k gold vermeil — a thick layer of gold bonded over sterling silver — the Jaipur Link chain draws its pattern from the traditional hansli necklaces worn by Rajasthani women for centuries. Each link is individually soldered by hand, a process that takes our karigars two full days for a single chain. The result is a chain with weight and warmth that belies its price — substantial in the hand, soft against skin, catching light like still water.',
      craftTime: '2 days, hand-soldered',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 5,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'chain-oxidized-hammered',
    slug: 'oxidized-hammered-chain',
    name: 'The Aged River Chain',
    slotType: 'chain',
    material: 'oxidized-silver',
    price: 12000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 15,
    compatibleSlots: ['centerpiece', 'accent', 'clasp', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: 'Oxidized silver hammered chain, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1605100804763-247f67b3557e', 1200), alt: 'Aged River Chain draped over weathered stone', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Dark as the river at midnight.',
      narrative: 'Sterling silver, oxidized to a deep gunmetal patina, then hand-hammered so each link catches light differently. The Aged River chain takes its name from the Chambal — the river that runs through the ravines east of Jaipur, dark water over ancient stone. No two links reflect the same way. The oxidation deepens with wear, developing a patina that is uniquely yours. Over months, the high points polish bright while the recesses stay dark — the chain literally ages with you.',
      craftTime: '3 days, hand-hammered and oxidized',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 8,
    isEditorPick: false,
    sortOrder: 2,
  },
  {
    id: 'chain-22k-gold',
    slug: '22k-gold-chain',
    name: 'The Heirloom Chain',
    slotType: 'chain',
    material: '22k-yellow-gold',
    price: 85000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 18,
    compatibleSlots: ['centerpiece', 'accent', 'clasp', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1603561596112-0a132b757442', 800), alt: '22k yellow gold chain, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1558769132-cb1aea458c5e', 1200), alt: 'Heirloom Chain on dark velvet with warm sidelight', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Gold that remembers every hand.',
      narrative: 'Pure 22k yellow gold — 91.6% pure, the traditional alloy of Indian jewelry, warm as afternoon sun on sandstone. This chain is not cast from a mold. Each link is drawn from gold wire, shaped by hand, soldered with a torch the karigar controls by breath alone. The process takes three days for a single chain. 22k gold is softer than 18k — it carries marks, absorbs light, develops a glow that never quite polishes out. This is the chain your daughter will inherit.',
      craftTime: '3 days, hand-drawn and soldered',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 2,
    isEditorPick: true,
    sortOrder: 3,
  },
  {
    id: 'chain-cotton-cord',
    slug: 'waxed-cotton-cord',
    name: 'The Nomad Cord',
    slotType: 'chain',
    material: 'cotton-cord',
    price: 4000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['centerpiece', 'accent', 'clasp', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1605100804763-247f67b3557e', 800), alt: 'Waxed cotton cord in deep terracotta, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1535632066927-ab7c9ab60908', 1200), alt: 'Nomad Cord coiled on handmade paper', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Thread that has traveled.',
      narrative: 'Hand-waxed cotton cord, dyed with natural pigments sourced from Rajasthani block printers. The wax coating — beeswax, applied warm — stiffens the cord just enough to hold its shape while remaining soft against skin. Each cord is cut and sealed by hand. Available in deep terracotta, midnight indigo, and raw umber. This is the foundation for those who want their jewelry to feel organic, quiet, close to the earth.',
      craftTime: '1 day, hand-dyed and waxed',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 7,
    inStockQuantity: 20,
    isEditorPick: false,
    sortOrder: 4,
  },

  // ====== NECKLACE CENTERPIECES ======
  {
    id: 'center-garnet-raw',
    slug: 'raw-garnet-centerpiece',
    name: 'The Rudra Stone',
    slotType: 'centerpiece',
    material: 'raw-garnet',
    price: 45000,
    currency: 'INR',
    priceModifiers: [
      { targetSlot: 'chain', modifierAmount: 4000, reason: 'Heavy stone requires chain reinforcement' },
    ],
    weightGrams: 28,
    compatibleSlots: ['chain', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Raw-cut garnet centerpiece in gold bezel, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1506630448388-4e683c67ddb0', 1200), alt: 'Rudra Stone catching candlelight on dark wood', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'A stone that holds fire.',
      narrative: 'Raw-cut garnet from Rajasthan\'s ancient mines near Tonk — unpolished, uncalibrated, each stone chosen for the depth of its burgundy fire rather than its symmetry. Set in a hand-formed gold bezel that follows the stone\'s natural contour (no two settings are identical), the Rudra Stone catches light from within. Named for the fierce, focused energy of its color — this is not a quiet stone. It announces itself.',
      craftTime: '5 days, bezel hand-formed to stone',
      originRegion: 'Tonk, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 3,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'center-polki-diamond',
    slug: 'polki-diamond-centerpiece',
    name: 'The Champa Pendant',
    slotType: 'centerpiece',
    material: 'polki-diamond',
    price: 120000,
    currency: 'INR',
    priceModifiers: [
      { targetSlot: 'chain', modifierAmount: 6000, reason: 'Polki setting requires reinforced mount' },
    ],
    weightGrams: 14,
    compatibleSlots: ['chain', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: 'Uncut polki diamond pendant in gold kundan setting, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1490481651871-ab68de25d43d', 1200), alt: 'Champa Pendant suspended against warm skin tone', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Diamond before the cutting wheel.',
      narrative: 'Polki — uncut, unpolished diamond, the oldest form of the gem, set in the kundan technique that dates to Mughal courts. Each stone is backed with gold foil to amplify its natural fire, then nestled into lac within a hand-formed gold frame. The Champa Pendant is named for the champak flower — its open, unhurried form mirrors the way a polki stone unfolds light. No two are alike. Each carries the specific geology of its origin, frozen in stone before any blade touched it.',
      craftTime: '7 days, kundan setting by master karigar',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 28,
    inStockQuantity: 1,
    isEditorPick: true,
    sortOrder: 2,
  },
  {
    id: 'center-pearl-drop',
    slug: 'pearl-drop-centerpiece',
    name: 'The Sagar Drop',
    slotType: 'centerpiece',
    material: 'basra-pearl',
    price: 65000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 8,
    compatibleSlots: ['chain', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1573408301185-9146fe634ad0', 800), alt: 'Natural Basra pearl drop in gold cap, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1599643478518-a784e5dc4c8f', 1200), alt: 'Sagar Drop against monsoon clouds', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Born of water, returned to light.',
      narrative: 'A single natural Basra pearl — not cultured, not farmed, but gathered by divers from the Persian Gulf who have done this for six generations. Each pearl is hand-selected for its lustre, its warm cream tone, its slight imperfection that proves its authenticity. The gold cap is hand-engraved with a wave motif, a reference to the pearl\'s origin. Sagar means ocean — this drop carries the weight of salt water and centuries of diving tradition in its quiet lustre.',
      craftTime: '3 days, cap hand-engraved',
      originRegion: 'Basra, Persian Gulf',
    },
    leadTimeDays: 21,
    inStockQuantity: 2,
    isEditorPick: false,
    sortOrder: 3,
  },
  {
    id: 'center-gold-disc',
    slug: 'gold-disc-centerpiece',
    name: 'The Surya Medallion',
    slotType: 'centerpiece',
    material: '22k-yellow-gold',
    price: 55000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 22,
    compatibleSlots: ['chain', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: 'Hand-hammered 22k gold disc medallion, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
      { url: unsplash('1605100804763-247f67b3557e', 1200), alt: 'Surya Medallion on raw silk', type: 'editorial', width: 1200, height: 800 },
    ],
    story: {
      headline: 'Hammered from a single ingot.',
      narrative: 'A disc of 22k gold, hammered from a single ingot over two days. No casting, no mold — the karigar strikes, rotates, strikes again, and the metal finds its form. The surface is left with visible hammer marks — each one a record of force and intention. The edge is untrimmed, organic, slightly irregular. Surya — the sun — because this disc catches and throws light like nothing else in your collection. It warms to body temperature within minutes of wearing.',
      craftTime: '2 days, hand-hammered from ingot',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 4,
    isEditorPick: false,
    sortOrder: 4,
  },

  // ====== ACCENT STONES ======
  {
    id: 'accent-polki-small',
    slug: 'small-polki-accent',
    name: 'Polki Whisper',
    slotType: 'accent',
    material: 'polki-diamond',
    price: 15000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1.5,
    compatibleSlots: ['chain', 'centerpiece'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1603561596112-0a132b757442', 800), alt: 'Small polki diamond accent in gold setting, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'A word, not a sentence.',
      narrative: 'A single small polki diamond — 0.3 to 0.5 carats — set in a minimal gold bezel. The Whisper is designed to complement, never compete. It catches light at the edge of vision, a glint that draws the eye inward. Each stone is set using the traditional kundan technique but in miniature — gold foil, lac, bezel pushed by thumb.',
      craftTime: '1 day per stone',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 12,
    isEditorPick: false,
    sortOrder: 1,
  },
  {
    id: 'accent-emerald-chip',
    slug: 'emerald-chip-accent',
    name: 'Emerald Note',
    slotType: 'accent',
    material: 'colombian-emerald',
    price: 22000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1.2,
    compatibleSlots: ['chain', 'centerpiece'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1558769132-cb1aea458c5e', 800), alt: 'Colombian emerald chip in gold setting, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Green as monsoon leaves.',
      narrative: 'A chip of Colombian emerald — Muzo origin, included (jardin, the French call it), alive with internal landscape. Each Note is individually selected for color saturation, not clarity. The green should stop you, not the certificate. Set in a simple gold bezel that disappears against the stone.',
      craftTime: '1 day per stone',
      originRegion: 'Muzo, Colombia via Jaipur',
    },
    leadTimeDays: 14,
    inStockQuantity: 8,
    isEditorPick: false,
    sortOrder: 2,
  },
  {
    id: 'accent-pearl-seed',
    slug: 'seed-pearl-accent',
    name: 'Pearl Dot',
    slotType: 'accent',
    material: 'basra-pearl',
    price: 8000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0.8,
    compatibleSlots: ['chain', 'centerpiece'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1605100804763-247f67b3557e', 800), alt: 'Seed pearl accent on gold pin, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Small as a breath.',
      narrative: 'Natural Basra seed pearls — 2 to 3mm — hand-drilled and pinned on gold wire. Each Dot is a tiny sphere of lustre, catching light softly. Used in clusters or alone, they add a rhythm of quietness to a piece. Pearls are organic — each one slightly different in tone, shape, surface.',
      craftTime: 'Half day per pearl',
      originRegion: 'Basra, Persian Gulf',
    },
    leadTimeDays: 10,
    inStockQuantity: 20,
    isEditorPick: false,
    sortOrder: 3,
  },

  // ====== CLASPS ======
  {
    id: 'clasp-kadi',
    slug: 'kadi-clasp',
    name: 'The Kadi Clasp',
    slotType: 'clasp',
    material: '18k-gold-vermeil',
    price: 8000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['chain', 'centerpiece', 'accent', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1535632066927-ab7c9ab60908', 800), alt: 'Kadi clasp in 18k gold vermeil, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Fastened like an heirloom.',
      narrative: 'Cast in 18k gold vermeil and hand-polished to a soft matte finish, the Kadi clasp takes its form from the anklet fastenings once worn across old Udaipur — small, sturdy, quietly ornamental. Each clasp is filed and set by a single karigar in our Jaipur atelier, a process that takes just under three days from wax to finish. Fasten it once, and you\'ll hear the same soft click that closed anklets a hundred years ago.',
      craftTime: '3 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 10,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'clasp-hook-oxidized',
    slug: 'oxidized-hook-clasp',
    name: 'The Jhoola Hook',
    slotType: 'clasp',
    material: 'oxidized-silver',
    price: 5000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 4,
    compatibleSlots: ['chain', 'centerpiece', 'accent', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Oxidized silver hook clasp, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Simple as a gesture.',
      narrative: 'A hook clasp forged from sterling silver, oxidized to match the Aged River chain. The Jhoola — swing — named for the gentle arc of its form. Hand-shaped with pliers and file, no two are perfectly identical. The hook seats into a hand-formed loop with a satisfying catch. Functional, honest, beautiful in its simplicity.',
      craftTime: '1 day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 15,
    isEditorPick: false,
    sortOrder: 2,
  },
  {
    id: 'clasp-magnetic-gold',
    slug: 'magnetic-gold-clasp',
    name: 'The Sangam Clasp',
    slotType: 'clasp',
    material: '18k-gold-vermeil',
    price: 12000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 5,
    compatibleSlots: ['chain', 'centerpiece', 'accent', 'length'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Magnetic gold clasp with safety catch, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Two rivers meeting.',
      narrative: 'A magnetic clasp concealed within a gold vermeil housing — the Sangam (confluence) brings together strength and elegance. The neodymium magnet is powerful enough to hold 200 grams, but the clasp also features a manual safety catch for added security. The housing is hand-engraved with a subtle water motif. For those who want ease of wear without compromising on craft.',
      craftTime: '4 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 6,
    isEditorPick: false,
    sortOrder: 3,
  },

  // ====== LENGTH OPTIONS ======
  {
    id: 'length-choker',
    slug: 'choker-length',
    name: 'The Choker (35cm)',
    slotType: 'length',
    material: '18k-gold-vermeil',
    price: 0,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0,
    compatibleSlots: ['chain', 'centerpiece', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: 'Choker length reference, 35cm', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Close to the pulse.',
      narrative: '35cm — sits at the hollow of the throat, where the pulse is strongest. The choker length is intimate, direct, designed to be felt as much as seen. Traditional in Indian jewelry for bridal and ceremonial pieces, this length commands attention without excess.',
      craftTime: 'Standard',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 0,
    inStockQuantity: 999,
    isEditorPick: false,
    sortOrder: 1,
  },
  {
    id: 'length-princess',
    slug: 'princess-length',
    name: 'The Princess (45cm)',
    slotType: 'length',
    material: '18k-gold-vermeil',
    price: 2000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0,
    compatibleSlots: ['chain', 'centerpiece', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1490481651871-ab68de25d43d', 800), alt: 'Princess length reference, 45cm', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The most worn length in the world.',
      narrative: '45cm — falls just below the collarbone, the universal length that works with everything from a cotton kurta to a silk saree. The princess length is named not for royalty but for its democratic elegance — the length that suits everyone, every day.',
      craftTime: 'Standard',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 0,
    inStockQuantity: 999,
    isEditorPick: true,
    sortOrder: 2,
  },
  {
    id: 'length-matinee',
    slug: 'matinee-length',
    name: 'The Matinee (55cm)',
    slotType: 'length',
    material: '18k-gold-vermeil',
    price: 4000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0,
    compatibleSlots: ['chain', 'centerpiece', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1573408301185-9146fe634ad0', 800), alt: 'Matinee length reference, 55cm', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Draped, not hung.',
      narrative: '55cm — falls at the top of the bust, creating a graceful drape that moves with the body. The matinee length has a theatrical quality — it was designed for the stage, for the woman who enters a room and wants her jewelry noticed from across it. Extra chain length adds both material cost and visual presence.',
      craftTime: 'Standard',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 0,
    inStockQuantity: 999,
    isEditorPick: false,
    sortOrder: 3,
  },

  // ====== BRACELET FOUNDATIONS ======
  {
    id: 'brace-gold-cuff',
    slug: 'gold-cuff-base',
    name: 'The Ankusha Cuff',
    slotType: 'cord',
    material: '22k-yellow-gold',
    price: 95000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 35,
    compatibleSlots: ['centerpiece', 'spacer', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: '22k gold cuff blank, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The strength of an open circle.',
      narrative: 'An open cuff of 22k gold, hammered from a single ingot over three days. The Ankusha — elephant goad, a symbol of controlled power — takes its name from the Rajasthani tradition of the gold arm cuff, worn by women of means as a sign of independence. The cuff is slightly sprung to grip the wrist, and its surface bears the honest marks of the hammer. No polish. No mirror finish. Just gold, as the earth made it.',
      craftTime: '3 days, hand-forged',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 28,
    inStockQuantity: 2,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'brace-leather',
    slug: 'leather-bracelet-base',
    name: 'The Bandhani Wrap',
    slotType: 'cord',
    material: 'leather',
    price: 6000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 8,
    compatibleSlots: ['centerpiece', 'spacer', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: 'Vegetable-tanned leather bracelet base, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Leather that softens with time.',
      narrative: 'Vegetable-tanned leather from a Jaipur tannery that has operated for four generations. The Bandhani Wrap is cut from a single strip, edges hand-burnished with beeswax, and shaped to the wrist. It arrives stiff; within a week of wearing, it molds to your exact wrist shape, darkening with skin oils and sunlight. The leather develops a patina that is entirely personal — no two will look the same after a month.',
      craftTime: '1 day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 7,
    inStockQuantity: 25,
    isEditorPick: false,
    sortOrder: 2,
  },

  // ====== BRACELET CENTERPIECES ======
  {
    id: 'brace-turquoise',
    slug: 'turquoise-bracelet-center',
    name: 'The Meghaduta Stone',
    slotType: 'centerpiece',
    material: 'raw-garnet',
    price: 35000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 12,
    compatibleSlots: ['cord', 'spacer', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1605100804763-247f67b3557e', 800), alt: 'Raw garnet bracelet centerpiece in gold setting, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Cloud-borne treasure.',
      narrative: 'A raw-cut garnet set in a minimal gold bezel, designed to sit flat against the wrist. The Meghaduta — cloud messenger — named for Kalidasa\'s poem, because this stone carries a message from deep earth to open air. Set low, secure, designed for daily wear without fear.',
      craftTime: '4 days',
      originRegion: 'Tonk, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 3,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'brace-gold-sphere',
    slug: 'gold-sphere-bracelet-center',
    name: 'The Bindu Sphere',
    slotType: 'centerpiece',
    material: '22k-yellow-gold',
    price: 42000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 15,
    compatibleSlots: ['cord', 'spacer', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1603561596112-0a132b757442', 800), alt: 'Hand-forged 22k gold sphere on bracelet, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The point from which everything begins.',
      narrative: 'A sphere of 22k gold, forged hollow to keep weight wearable, then hand-hammered to create a surface of tiny facets that catch light from every angle. The Bindu — the point, the origin — is a meditation object as much as a decorative one. Roll it between your fingers and feel the texture of gold worked by hand.',
      craftTime: '5 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 2,
    isEditorPick: false,
    sortOrder: 2,
  },

  // ====== BRACELET SPACERS ======
  {
    id: 'spacer-gold-round',
    slug: 'gold-round-spacer',
    name: 'Gold Disc Spacer',
    slotType: 'spacer',
    material: '18k-gold-vermeil',
    price: 3000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1,
    compatibleSlots: ['cord', 'centerpiece', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1558769132-cb1aea458c5e', 800), alt: 'Small gold disc spacer, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'A pause between notes.',
      narrative: 'Tiny gold disc spacers — 4mm diameter — that sit between beads or along a chain, creating rhythm and breathing room. Hand-cut from sheet gold, each one slightly different. They catch light as the wrist moves, a quiet sparkle.',
      craftTime: 'Half day per set',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 30,
    isEditorPick: false,
    sortOrder: 1,
  },
  {
    id: 'spacer-oxidized-bead',
    slug: 'oxidized-bead-spacer',
    name: 'Oxidized Bead Spacer',
    slotType: 'spacer',
    material: 'oxidized-silver',
    price: 2000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1.5,
    compatibleSlots: ['cord', 'centerpiece', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1605100804763-247f67b3557e', 800), alt: 'Oxidized silver bead spacer, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Dark rhythm.',
      narrative: 'Small oxidized silver beads that create visual weight between lighter elements. Each bead is hand-formed from silver wire, rolled into a sphere, then oxidized to a deep matte grey. They ground a design, adding contrast and depth.',
      craftTime: 'Half day per set',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 40,
    isEditorPick: false,
    sortOrder: 2,
  },

  // ====== MALA BEADS ======
  {
    id: 'mala-rudraksha',
    slug: 'rudraksha-mala-beads',
    name: 'Rudraksha Beads',
    slotType: 'bead',
    material: 'rudraksha',
    price: 15000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0.8,
    compatibleSlots: ['guru_bead', 'spacer', 'tassel'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1535632066927-ab7c9ab60908', 800), alt: 'Rudraksha beads on silk thread, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Tears of Shiva, seeds of prayer.',
      narrative: 'Natural rudraksha beads — the dried seeds of the Elaeocarpus ganitrus tree, sacred in Hindu tradition. Each bead has a unique surface texture (mukhi, or faces), and we select only 5-mukhi beads for our malas — the most common and spiritually significant variety. Strung on silk thread with hand-tied knots between each bead, 108 in total. The beads darken with use, absorbing oil from the skin, becoming smoother and more lustrous over years of practice.',
      craftTime: '2 days, hand-selected and strung',
      originRegion: 'Nepal, strung in Jaipur',
    },
    leadTimeDays: 14,
    inStockQuantity: 6,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'mala-sandalwood',
    slug: 'sandalwood-mala-beads',
    name: 'Chandana Beads',
    slotType: 'bead',
    material: 'sandalwood',
    price: 12000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0.5,
    compatibleSlots: ['guru_bead', 'spacer', 'tassel'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Sandalwood mala beads on silk thread, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Fragrance that deepens with touch.',
      narrative: 'Mysore sandalwood beads — hand-turned on a small lathe, each one shaped from heartwood that has aged at least 30 years. Sandalwood\'s natural oil gives the beads a warm, creamy scent that intensifies with body heat. Over months of japa (repetition), the beads darken from pale gold to deep amber, and the fragrance mingles with the user\'s own. 108 beads, knotted on silk.',
      craftTime: '3 days, hand-turned and strung',
      originRegion: 'Mysore, Karnataka, strung in Jaipur',
    },
    leadTimeDays: 14,
    inStockQuantity: 4,
    isEditorPick: false,
    sortOrder: 2,
  },
  {
    id: 'mala-pearl',
    slug: 'pearl-mala-beads',
    name: 'Moksha Pearls',
    slotType: 'bead',
    material: 'basra-pearl',
    price: 85000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0.6,
    compatibleSlots: ['guru_bead', 'spacer', 'tassel'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Basra pearl mala beads on silk thread, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Lustre born of the deep.',
      narrative: 'Natural Basra pearls — each one a sphere of organic lustre, hand-drilled and strung on silk with traditional knots. A pearl mala is rare and precious — each pearl took years to form inside an oyster in the Persian Gulf. The warmth of the pearls against skin during meditation creates a tactile connection that synthetic beads cannot replicate. 108 pearls, graduated in size toward the guru bead.',
      craftTime: '4 days, hand-drilled and strung',
      originRegion: 'Basra, Persian Gulf, strung in Jaipur',
    },
    leadTimeDays: 28,
    inStockQuantity: 1,
    isEditorPick: false,
    sortOrder: 3,
  },

  // ====== GURU BEADS ======
  {
    id: 'guru-gold-lotus',
    slug: 'gold-lotus-guru',
    name: 'Kamal Guru Bead',
    slotType: 'guru_bead',
    material: '22k-yellow-gold',
    price: 25000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 8,
    compatibleSlots: ['bead', 'spacer', 'tassel'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: '22k gold lotus-form guru bead, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The bloom at the end of repetition.',
      narrative: 'A guru bead carved in the form of a lotus —India\'s oldest spiritual symbol — from solid 22k gold. Larger than the mala beads, heavier, it marks the transition from repetition to rest. The lotus petals are hand-formed, each one slightly different. Turn the bead in your fingers and feel the petals — this is the tactile signal that your practice is complete.',
      craftTime: '5 days, hand-carved',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 3,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'guru-pearl-large',
    slug: 'large-pearl-guru',
    name: 'Sagar Guru Bead',
    slotType: 'guru_bead',
    material: 'basra-pearl',
    price: 35000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 5,
    compatibleSlots: ['bead', 'spacer', 'tassel'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1490481651871-ab68de25d43d', 800), alt: 'Large Basra pearl guru bead with gold cap, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The ocean in a single bead.',
      narrative: 'A large natural Basra pearl — 12 to 15mm — capped in hand-engraved gold. The Sagar guru bead is the largest pearl we set in a mala, chosen for its weight, its lustre, its perfect imperfection. The gold cap is engraved with wave motifs, connecting the bead to its ocean origin. This guru bead anchors the mala with quiet authority.',
      craftTime: '3 days, cap hand-engraved',
      originRegion: 'Basra, Persian Gulf',
    },
    leadTimeDays: 21,
    inStockQuantity: 1,
    isEditorPick: false,
    sortOrder: 2,
  },

  // ====== TASSLES ======
  {
    id: 'tassel-silk-crimson',
    slug: 'crimson-silk-tassel',
    name: 'Kumkum Tassel',
    slotType: 'tassel',
    material: 'tassel-silk',
    price: 4000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['guru_bead', 'bead', 'spacer'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1573408301185-9146fe634ad0', 800), alt: 'Crimson silk tassel with gold binding, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Crimson as sindoor.',
      narrative: 'Hand-braided silk tassel in deep crimson — the color of kumkum, of sindoor, of auspicious beginning. Each tassel is bound with gold wire at the head, then hand-cut to an even length. Silk catches light differently from every angle — matte in shadow, luminous in direct light. The tassel moves with breath, a living element at the base of your mala.',
      craftTime: '1 day',
      originRegion: 'Varanasi, strung in Jaipur',
    },
    leadTimeDays: 10,
    inStockQuantity: 15,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'tassel-silk-indigo',
    slug: 'indigo-silk-tassel',
    name: 'Neel Tassel',
    slotType: 'tassel',
    material: 'tassel-silk',
    price: 4000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['guru_bead', 'bead', 'spacer'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: 'Indigo silk tassel with gold binding, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The color of midnight meditation.',
      narrative: 'Hand-braided silk tassel in natural indigo — dyed using the ancient resist method from Rajasthan\'s block-printing tradition. The blue deepens from dusk to midnight depending on the light. Bound with gold wire, cut by hand. Neel — blue — is the color of Krishna, of depth, of the infinite. A tassel for those who practice in the quiet hours.',
      craftTime: '1 day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 12,
    isEditorPick: false,
    sortOrder: 2,
  },

  // ====== MALA SPACERS ======
  {
    id: 'mala-spacer-gold',
    slug: 'mala-gold-spacer',
    name: 'Gold Meru Spacer',
    slotType: 'spacer',
    material: '22k-yellow-gold',
    price: 5000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 2,
    compatibleSlots: ['bead', 'guru_bead', 'tassel'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: '22k gold meru spacer bead, flat-lay cutout', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The mountain between laps.',
      narrative: 'A small 22k gold bead placed at intervals of 27 to mark each quarter of the mala cycle. The Meru — named for the sacred mountain at the center of the universe in Hindu cosmology — is a tactile landmark. When your fingers reach it, you know where you are in your practice. Hand-formed, slightly larger than the mala beads, with a subtle matte finish.',
      craftTime: '1 day per set of three',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 10,
    isEditorPick: false,
    sortOrder: 1,
  },

  // ====== RING BANDS ======
  {
    id: 'band-vermeil-plain',
    slug: 'vermeil-plain-band',
    name: 'The Quiet Band',
    slotType: 'band',
    material: '18k-gold-vermeil',
    price: 14000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 4,
    compatibleSlots: ['setting', 'stone', 'size'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: '18k gold vermeil plain ring band', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'A circle with nothing to prove.',
      narrative: 'A clean 18k vermeil band, hand-formed and lightly polished. The Quiet Band is meant to disappear under the setting — warm, even, and strong enough to carry a stone without shouting.',
      craftTime: '2 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 10,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'band-oxidized-flat',
    slug: 'oxidized-flat-band',
    name: 'The Shadow Band',
    slotType: 'band',
    material: 'oxidized-silver',
    price: 9000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 5,
    compatibleSlots: ['setting', 'stone', 'size'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1605100804763-247f67b3557e', 800), alt: 'Oxidized silver flat ring band', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Dark metal, soft edges.',
      narrative: 'Sterling silver oxidized to a soft charcoal, then burnished at the edges so light catches only where the finger bends. A band for stones that prefer shadow.',
      craftTime: '2 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 8,
    isEditorPick: false,
    sortOrder: 2,
  },
  // ====== RING SETTINGS ======
  {
    id: 'setting-claw-gold',
    slug: 'claw-gold-setting',
    name: 'Four-Claw Setting',
    slotType: 'setting',
    material: '18k-gold-vermeil',
    price: 12000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 2,
    compatibleSlots: ['band', 'stone'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: 'Gold four-claw ring setting', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Held, not hidden.',
      narrative: 'Four hand-filed claws lift the stone into light. Traditional Jaipur claw work — precise, minimal, and strong enough for daily wear.',
      craftTime: '3 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 18,
    inStockQuantity: 6,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'setting-bezel-gold',
    slug: 'bezel-gold-setting',
    name: 'Bezel Setting',
    slotType: 'setting',
    material: '22k-yellow-gold',
    price: 22000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['band', 'stone'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1603561596112-0a132b757442', 800), alt: '22k gold bezel ring setting', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'A wall of gold around the fire.',
      narrative: 'A full bezel formed to the stone — protective, architectural, and soft against skin. Preferred for raw and irregular gems.',
      craftTime: '4 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 21,
    inStockQuantity: 4,
    isEditorPick: false,
    sortOrder: 2,
  },
  // ====== RING STONES ======
  {
    id: 'stone-garnet-round',
    slug: 'garnet-round-stone',
    name: 'Round Garnet',
    slotType: 'stone',
    material: 'raw-garnet',
    price: 28000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['setting', 'band'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Round garnet stone for ring', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Seated last, like a coal settling.',
      narrative: 'A round Rajasthani garnet, cut for depth rather than sparkle. It seats into the setting last — the final act of the ring.',
      craftTime: 'Stone selection 1 day',
      originRegion: 'Tonk, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 5,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'stone-polki-solitaire',
    slug: 'polki-solitaire-stone',
    name: 'Polki Solitaire',
    slotType: 'stone',
    material: 'polki-diamond',
    price: 95000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1.5,
    compatibleSlots: ['setting', 'band'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1490481651871-ab68de25d43d', 800), alt: 'Uncut polki diamond for ring', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Diamond before the wheel.',
      narrative: 'An uncut polki diamond — fire without facet. Set last so the foil and lac can settle around its exact contour.',
      craftTime: 'Kundan seat 5 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 28,
    inStockQuantity: 2,
    isEditorPick: true,
    sortOrder: 2,
  },
  // ====== RING SIZES (fit only) ======
  {
    id: 'size-6',
    slug: 'ring-size-6',
    name: 'Size 6 (US)',
    slotType: 'size',
    material: 'sterling-silver',
    price: 0,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0,
    compatibleSlots: ['band'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 400), alt: 'Ring size 6', type: 'builder-cutout', width: 400, height: 400 },
    ],
    story: {
      headline: 'Fit is not a flourish.',
      narrative: 'Ring size is measured at the atelier or via our printable guide. It does not change the price — only how the band sits.',
      craftTime: 'Measured to order',
      originRegion: 'Your hand',
    },
    leadTimeDays: 0,
    inStockQuantity: 99,
    isEditorPick: false,
    sortOrder: 1,
    isFitOnly: true,
  },
  {
    id: 'size-7',
    slug: 'ring-size-7',
    name: 'Size 7 (US)',
    slotType: 'size',
    material: 'sterling-silver',
    price: 0,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0,
    compatibleSlots: ['band'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 400), alt: 'Ring size 7', type: 'builder-cutout', width: 400, height: 400 },
    ],
    story: {
      headline: 'Fit is not a flourish.',
      narrative: 'The most common US size for our atelier clients. Confirmed before production begins.',
      craftTime: 'Measured to order',
      originRegion: 'Your hand',
    },
    leadTimeDays: 0,
    inStockQuantity: 99,
    isEditorPick: false,
    sortOrder: 2,
    isFitOnly: true,
  },
  {
    id: 'size-8',
    slug: 'ring-size-8',
    name: 'Size 8 (US)',
    slotType: 'size',
    material: 'sterling-silver',
    price: 0,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0,
    compatibleSlots: ['band'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 400), alt: 'Ring size 8', type: 'builder-cutout', width: 400, height: 400 },
    ],
    story: {
      headline: 'Fit is not a flourish.',
      narrative: 'Selected sizes are shaped on mandrels in the workshop — never stretched after finishing.',
      craftTime: 'Measured to order',
      originRegion: 'Your hand',
    },
    leadTimeDays: 0,
    inStockQuantity: 99,
    isEditorPick: false,
    sortOrder: 3,
    isFitOnly: true,
  },
  // ====== EARRING FINDINGS ======
  {
    id: 'ear-post-vermeil',
    slug: 'vermeil-post',
    name: 'Vermeil Post',
    slotType: 'chain',
    material: '18k-gold-vermeil',
    price: 6000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1,
    compatibleSlots: ['centerpiece', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1573408301185-9146fe634ad0', 800), alt: 'Gold vermeil earring post', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'The quiet architecture of a pair.',
      narrative: 'A surgical-grade post in 18k vermeil — light, secure, and the starting point of every stud or drop. Priced per pair.',
      craftTime: '1 day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 20,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'ear-hook-oxidized',
    slug: 'oxidized-hook',
    name: 'Oxidized Hook',
    slotType: 'chain',
    material: 'oxidized-silver',
    price: 4500,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1.5,
    compatibleSlots: ['centerpiece', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1605100804763-247f67b3557e', 800), alt: 'Oxidized silver earring hook', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'A curve that carries weight.',
      narrative: 'Hand-bent oxidized silver hooks for drops and danglers. Soft enough to shape, strong enough to hold.',
      craftTime: '1 day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 10,
    inStockQuantity: 15,
    isEditorPick: false,
    sortOrder: 2,
  },
  {
    id: 'ear-drop-pearl',
    slug: 'pearl-ear-drop',
    name: 'Pearl Ear Drop',
    slotType: 'centerpiece',
    material: 'basra-pearl',
    price: 32000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 4,
    compatibleSlots: ['chain', 'accent', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1506630448388-4e683c67ddb0', 800), alt: 'Basra pearl earring drop', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'One form, shown twice.',
      narrative: 'A matched pair of Basra pearl drops — assembled once in the preview, priced as two. The animation builds a single earring, then presents the pair.',
      craftTime: '3 days',
      originRegion: 'Basra / Jaipur',
    },
    leadTimeDays: 18,
    inStockQuantity: 3,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'ear-stud-polki',
    slug: 'polki-stud-face',
    name: 'Polki Stud Face',
    slotType: 'centerpiece',
    material: 'polki-diamond',
    price: 78000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 2,
    compatibleSlots: ['chain', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: 'Polki diamond stud face', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Fire, close to the lobe.',
      narrative: 'A kundan-set polki face for studs — soft fire without the glare of modern cuts.',
      craftTime: '6 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 24,
    inStockQuantity: 2,
    isEditorPick: true,
    sortOrder: 2,
  },
  {
    id: 'ear-back-push',
    slug: 'push-back',
    name: 'Push Back',
    slotType: 'clasp',
    material: '18k-gold-vermeil',
    price: 2000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 0.5,
    compatibleSlots: ['chain'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: 'Gold push back earring clasp', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Secure, then forgotten.',
      narrative: 'A classic push back in vermeil — included in the pair price path as a finishing part.',
      craftTime: 'Same day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 7,
    inStockQuantity: 50,
    isEditorPick: false,
    sortOrder: 1,
  },
  // ====== ANKLET ======
  {
    id: 'ank-cord-chain',
    slug: 'anklet-link-cord',
    name: 'Anklet Link Chain',
    slotType: 'cord',
    material: '18k-gold-vermeil',
    price: 11000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 6,
    compatibleSlots: ['centerpiece', 'spacer', 'charm', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1573408301185-9146fe634ad0', 800), alt: 'Fine gold anklet chain', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Lighter than a bracelet, closer to the ground.',
      narrative: 'A fine vermeil link chain proportioned for the ankle — flexible, quiet, and strong enough for a charm.',
      craftTime: '2 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 12,
    inStockQuantity: 8,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'ank-motif-sun',
    slug: 'anklet-sun-motif',
    name: 'Sun Motif',
    slotType: 'centerpiece',
    material: '22k-yellow-gold',
    price: 18000,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 3,
    compatibleSlots: ['cord', 'charm', 'clasp'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1603561596112-0a132b757442', 800), alt: 'Gold sun motif for anklet', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'A small sun at the ankle.',
      narrative: 'A hand-pierced sun motif that sits at the front of the anklet — the visual center of the walk.',
      craftTime: '3 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 16,
    inStockQuantity: 5,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'ank-charm-bell',
    slug: 'anklet-bell-charm',
    name: 'Ghungroo Bell',
    slotType: 'charm',
    material: '22k-yellow-gold',
    price: 8500,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 2,
    compatibleSlots: ['cord', 'centerpiece'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1599643478518-a784e5dc4c8f', 800), alt: 'Small gold ghungroo bell charm', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'One settle. No jingle loop.',
      narrative: 'A tiny ghungroo form that settles onto the chain once in the preview — a single, clean placement. In life it may soft-chime; in the builder it does not loop.',
      craftTime: '2 days',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 14,
    inStockQuantity: 6,
    isEditorPick: true,
    sortOrder: 1,
  },
  {
    id: 'ank-clasp-lobster',
    slug: 'anklet-lobster-clasp',
    name: 'Lobster Clasp',
    slotType: 'clasp',
    material: '18k-gold-vermeil',
    price: 2500,
    currency: 'INR',
    priceModifiers: [],
    weightGrams: 1,
    compatibleSlots: ['cord'],
    incompatibleWith: [],
    images: [
      { url: unsplash('1515562141207-7a88fb7ce338', 800), alt: 'Gold lobster clasp for anklet', type: 'builder-cutout', width: 800, height: 800 },
    ],
    story: {
      headline: 'Easy on, sure hold.',
      narrative: 'A compact lobster clasp sized for anklets — finishes the piece after the charm has settled.',
      craftTime: '1 day',
      originRegion: 'Jaipur, Rajasthan',
    },
    leadTimeDays: 7,
    inStockQuantity: 20,
    isEditorPick: false,
    sortOrder: 1,
  },

];

export function getPartsBySlotType(slotType: SlotType): ConfiguratorPart[] {
  return allConfiguratorParts
    .filter((part) => part.slotType === slotType)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPartById(id: string): ConfiguratorPart | undefined {
  return allConfiguratorParts.find((part) => part.id === id);
}

export function getPartBySlug(slug: string): ConfiguratorPart | undefined {
  return allConfiguratorParts.find((part) => part.slug === slug);
}

export function getEditorPicks(): ConfiguratorPart[] {
  return allConfiguratorParts.filter((part) => part.isEditorPick);
}

export function getSlotsForProductType(productType: 'necklace' | 'bracelet' | 'mala' | 'ring' | 'earring' | 'anklet'): ProductSlot[] {
  switch (productType) {
    case 'necklace':
      return necklaceSlots;
    case 'bracelet':
      return braceletSlots;
    case 'mala':
      return malaSlots;
    case 'ring':
      return ringSlots;
    case 'earring':
      return earringSlots;
    case 'anklet':
      return ankletSlots;
  }
}

export function getPartsForSlot(productType: 'necklace' | 'bracelet' | 'mala' | 'ring' | 'earring' | 'anklet', slotType: SlotType): ConfiguratorPart[] {
  return getPartsForProductType(productType).filter((part) => part.slotType === slotType);
}

/** Category-scoped catalog — one shared filter so builders do not bleed parts across products */
export function getPartsForProductType(
  productType: 'necklace' | 'bracelet' | 'mala' | 'ring' | 'earring' | 'anklet'
): ConfiguratorPart[] {
  const allowed = new Set(getSlotsForProductType(productType).map((s) => s.slotType));

  return allConfiguratorParts
    .filter((p) => {
      if (!allowed.has(p.slotType)) return false;

      switch (productType) {
        case 'necklace':
          return (
            !p.id.startsWith('ear-') &&
            !p.id.startsWith('band-') &&
            !p.id.startsWith('setting-') &&
            !p.id.startsWith('size-') &&
            !p.id.startsWith('ank-') &&
            !p.id.startsWith('mala-') &&
            !p.id.startsWith('guru-') &&
            !p.id.startsWith('tassel-') &&
            !p.id.startsWith('brace-')
          );
        case 'bracelet':
          return (
            !p.id.startsWith('ear-') &&
            !p.id.startsWith('band-') &&
            !p.id.startsWith('setting-') &&
            !p.id.startsWith('size-') &&
            !p.id.startsWith('ank-') &&
            !p.id.startsWith('mala-') &&
            !p.id.startsWith('guru-') &&
            !p.id.startsWith('tassel-') &&
            !p.id.startsWith('stone-')
          );
        case 'mala':
          return (
            p.id.startsWith('mala-') ||
            p.id.startsWith('guru-') ||
            p.id.startsWith('tassel-') ||
            (p.slotType === 'cord' && !p.id.startsWith('ank-'))
          );
        case 'ring':
          return (
            p.id.startsWith('band-') ||
            p.id.startsWith('setting-') ||
            p.id.startsWith('stone-') ||
            p.id.startsWith('size-')
          );
        case 'earring':
          return p.id.startsWith('ear-') || (p.slotType === 'accent' && !p.id.startsWith('ank-'));
        case 'anklet':
          return (
            p.id.startsWith('ank-') ||
            (p.slotType === 'spacer' && !p.id.includes('mala')) ||
            (p.slotType === 'clasp' && !p.id.startsWith('ear-') && !p.id.startsWith('ank-'))
          );
        default:
          return false;
      }
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
