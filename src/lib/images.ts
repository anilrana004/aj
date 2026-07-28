/** Temporary remote placeholder images (Unsplash). Only verified-working photo IDs. */

export function unsplash(photoId: string, width = 1600) {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=80&auto=format&fit=crop`;
}

function u(photoId: string, width = 1600) {
  return unsplash(photoId, width);
}

/** Verified 200 OK Unsplash photo IDs (jewelry, atelier, interiors, portraits). */
const P = {
  jewelry1: '1573408301185-9146fe634ad0',
  jewelry2: '1515562141207-7a88fb7ce338',
  jewelry3: '1599643478518-a784e5dc4c8f',
  rings: '1605100804763-247f67b3557e',
  earrings: '1535632066927-ab7c9ab60908',
  hands: '1506630448388-4e683c67ddb0',
  portrait: '1573496359142-b8d87734a5a2',
  portrait2: '1487412720507-e7ab37603c6f',
  fashion: '1490481651871-ab68de25d43d',
  fashion2: '1469334031218-e382a71b716b',
  detail: '1603561596112-0a132b757442',
  texture: '1558769132-cb1aea458c5e',
  interior: '1618221195710-dd6b41faaea6',
  interior2: '1497366216548-37526070297c',
  interior3: '1497366754035-f200968a6e72',
  interior4: '1618220179428-22790b461013',
  interior5: '1586023492125-27b2c045efd7',
  interior6: '1616046229478-9901c5536a45',
  store: '1441986300917-64674bd600d8',
  soft: '1522312346375-d1a52e2b99b3',
} as const;

export const img = {
  // Home & hero
  homeHero: u(P.interior),
  homeHeroAlt: u(P.interior2),
  collectionsHero: u(P.jewelry1),

  // Collections
  zenanaHero: u(P.jewelry1),
  zenanaThumb: u(P.jewelry3),
  maharaniHero: u(P.jewelry2),
  maharaniThumb: u(P.detail),
  artisanHero: u(P.rings),
  artisanThumb: u(P.earrings),
  bridalHero: u(P.fashion),
  bridalThumb: u(P.fashion2),

  // Products — zenana choker
  zenanaChokerHero: u(P.jewelry1, 1200),
  zenanaChokerDetail: u(P.jewelry3, 1200),
  zenanaChokerOnBody: u(P.fashion, 1200),
  zenanaChokerMacro: u(P.detail, 1200),
  zenanaChokerWorkshop: u(P.hands, 1200),

  // Products — maharani necklace
  maharaniNecklaceHero: u(P.jewelry2, 1200),
  maharaniNecklaceDetail: u(P.detail, 1200),
  maharaniNecklaceOnBody: u(P.fashion2, 1200),
  maharaniNecklaceMacro: u(P.jewelry3, 1200),
  maharaniNecklaceWorkshop: u(P.hands, 1200),

  // Products — artisan cuff
  artisanCuffHero: u(P.rings, 1200),
  artisanCuffDetail: u(P.earrings, 1200),
  artisanCuffOnBody: u(P.soft, 1200),
  artisanCuffMacro: u(P.texture, 1200),
  artisanCuffWorkshop: u(P.hands, 1200),

  // Products — bridal suite
  bridalSuiteHero: u(P.fashion, 1200),
  bridalSuiteDetail: u(P.fashion2, 1200),
  bridalSuiteOnBody: u(P.portrait2, 1200),
  bridalSuiteMacro: u(P.jewelry3, 1200),
  bridalSuiteWorkshop: u(P.hands, 1200),

  // Journal
  journalHandsHero: u(P.hands),
  journalHandsHammer: u(P.hands, 1400),
  journalApprentices: u(P.portrait, 1400),
  journalStoneHero: u(P.detail),
  journalGemstoneSelection: u(P.jewelry3),
  journalMonsoonHero: u(P.interior4),
  journalMonsoon1: u(P.interior5),
  journalMonsoon2: u(P.interior, 1400),
  journalMonsoon3: u(P.texture, 1400),

  // Atelier
  atelierPreview: u(P.interior),
  atelierHero: u(P.interior2),
  founderPortrait: u(P.portrait),
  processSketch: u(P.hands, 1400),
  processWax: u(P.hands, 1400),
  processCast: u(P.detail, 1400),
  processFinish: u(P.jewelry3, 1400),
  processSet: u(P.rings, 1400),
  processFinal: u(P.jewelry1, 1400),
  goldIngots: u(P.jewelry2, 1400),
  stoneSelection: u(P.detail, 1400),
  gallery1: u(P.hands, 1400),
  gallery2: u(P.interior3, 1400),
  gallery3: u(P.detail, 1400),
  gallery4: u(P.rings, 1400),
  gallery5: u(P.interior6, 1400),
  gallery6: u(P.jewelry1, 1400),

  // Pages
  contactHero: u(P.store),
  contactMap: u(P.interior5, 1200),
  configuratorNecklace: u(P.jewelry1),
  configuratorBracelet: u(P.rings),
  configuratorMala: u(P.jewelry2),
  configuratorPlaceholder: u(P.jewelry3, 800),
  genericPlaceholder: u(P.jewelry3, 800),
  appointmentHero: u(P.interior6),
  ogDefault: u(P.jewelry1, 1200),
} as const;
