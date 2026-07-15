import { Decimal } from '@prisma/client/runtime/library';

interface SelectedPart {
  partId: string;
  partTypeId: string;
  quantity: number;
  price: number;
}

interface PriceBreakdown {
  items: Array<{
    partName: string;
    partTypeName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

const SHIPPING_COST = 0; // Free shipping for now
const TAX_RATE = 0; // GST handled separately at checkout for B2B; 0 for display

export function calculateBuilderPrice(parts: SelectedPart[]): PriceBreakdown {
  const items = parts.map((part) => ({
    partName: '', // Will be filled by caller
    partTypeName: '',
    quantity: part.quantity,
    unitPrice: part.price,
    lineTotal: part.price * part.quantity,
  }));

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingCost = SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shippingCost + tax;

  return {
    items,
    subtotal,
    shippingCost,
    tax,
    total,
  };
}

export function calculateOrderTotals(
  items: Array<{ unitPrice: number; quantity: number }>,
  shippingCost: number = 0,
  taxRate: number = 0
): { subtotal: number; shippingCost: number; tax: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shippingCost + tax;

  return { subtotal, shippingCost, tax, total };
}

export function getEstimatedLeadTime(
  parts: Array<{ leadTimeDays: number }>
): number {
  if (parts.length === 0) return 0;
  return Math.max(...parts.map((p) => p.leadTimeDays));
}
