export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  story: string;
  heroImage: string;
  heroImageAlt: string;
  thumbnailImage: string;
  order: number;
  isActive: boolean;
  products: Product[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collectionId: string;
  description: string;
  story: string;
  price: number;
  currency: string;
  metal: string;
  stones: string[];
  weight: string;
  dimensions: string;
  images: ProductImage[];
  isAvailable: boolean;
  isFeatured: boolean;
  makingOf?: MakingOf;
}

export interface ProductImage {
  url: string;
  alt: string;
  type: 'hero' | 'detail' | 'on-body' | 'macro' | 'workshop';
  width: number;
  height: number;
}

export interface MakingOf {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  steps: MakingStep[];
}

export interface MakingStep {
  step: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  dek: string;
  heroImage: string;
  heroImageAlt: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  category: 'atelier' | 'journal' | 'craft' | 'stories';
  content: ArticleBlock[];
  tags: string[];
  isFeatured: boolean;
}

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'image' | 'pull-quote' | 'gallery' | 'divider';
  content?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  level?: 2 | 3;
  alignment?: 'left' | 'center' | 'full-bleed';
}

export interface AtelierContent {
  founderStory: FounderStory;
  craftProcess: CraftProcess[];
  materials: MaterialStory;
  workshopGallery: WorkshopImage[];
}

export interface FounderStory {
  portrait: string;
  portraitAlt: string;
  name: string;
  title: string;
  pullQuote: string;
  biography: string[];
}

export interface CraftProcess {
  step: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface MaterialStory {
  gold: MaterialDetail;
  stones: MaterialDetail;
  ethics: string;
}

export interface MaterialDetail {
  origin: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface WorkshopImage {
  url: string;
  alt: string;
  caption: string;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  preferredDate: string;
  occasion: 'engagement' | 'wedding' | 'anniversary' | 'self-purchase' | 'gift' | 'bespoke' | 'other';
  message: string;
  collectionInterest?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: 'general' | 'press' | 'wholesale' | 'care' | 'concierge';
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  platform: 'instagram' | 'pinterest' | 'email' | 'whatsapp';
  url: string;
  label: string;
}