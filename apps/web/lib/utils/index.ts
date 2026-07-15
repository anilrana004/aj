import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceExact(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateOrderNumber(): string {
  const prefix = 'AS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generateGuestToken(): string {
  return crypto.randomUUID();
}

export function getLeadTimeLabel(days: number): string {
  if (days === 0) return 'Ships within 2-3 business days';
  if (days <= 7) return `Ships within ${days} business days`;
  if (days <= 14) return `${days} business days lead time`;
  return `${days} business days — handcrafted to order`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '…';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: 'Order Placed',
  PAID: 'Payment Confirmed',
  IN_PRODUCTION: 'In the Atelier',
  QUALITY_CHECK: 'Quality Check',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

export const ORDER_STATUS_TIMELINE: Record<string, string[]> = {
  bespoke: [
    'PENDING_PAYMENT',
    'PAID',
    'IN_PRODUCTION',
    'QUALITY_CHECK',
    'SHIPPED',
    'DELIVERED',
  ],
  readyMade: [
    'PENDING_PAYMENT',
    'PAID',
    'SHIPPED',
    'DELIVERED',
  ],
};
