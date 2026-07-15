export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  imageAlts: string[];
  category: string;
  collectionId?: string;
  tags: string[];
  materials: string[];
  careInstructions?: string;
  weight?: string;
  isPublished: boolean;
  isBespoke: boolean;
  stock?: number;
  leadTimeDays: number;
  artisanRegion?: string;
  artisanNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image?: string;
}

export interface PartType {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  isRequired: boolean;
  sortOrder: number;
  allowMultiple: boolean;
}

export interface Part {
  id: string;
  partTypeId: string;
  name: string;
  slug: string;
  price: number;
  story: string;
  origin?: string;
  material?: string;
  images: string[];
  imageAlts: string[];
  isAvailable: boolean;
  stock?: number;
  leadTimeDays: number;
  sortOrder: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  email: string;
  phone?: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  paymentIntentId?: string;
  paymentMethod?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  guestToken?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  bespokeConfig?: any;
  isBespoke: boolean;
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'IN_PRODUCTION'
  | 'QUALITY_CHECK'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  emailVerified?: Date;
  phone?: string;
  createdAt: Date;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface SavedDesign {
  id: string;
  userId?: string;
  guestToken?: string;
  categoryId: string;
  name?: string;
  parts: SavedDesignPart[];
  totalPrice: number;
  leadTime?: number;
  createdAt: Date;
}

export interface SavedDesignPart {
  partTypeId: string;
  partId: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId?: string;
  quantity: number;
  unitPrice: number;
  bespokeConfig?: any;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  coverAlt?: string;
  author: string;
  tags: string[];
  category?: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
