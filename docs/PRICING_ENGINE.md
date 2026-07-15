# Pricing Engine

## Overview

The pricing engine computes the total cost of a bespoke design from its selected parts. It runs server-side and is the single source of truth for all pricing.

## Core Function

```typescript
function calculateBuilderPrice(parts: SelectedPart[]): PriceBreakdown
```

### Input
```typescript
interface SelectedPart {
  partId: string;
  partTypeId: string;
  quantity: number;
  price: number; // from client-side (for preview only)
}
```

### Output
```typescript
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
```

## Rules

1. `total = Σ(part.price × quantity)` for every selected part
2. Prices are fetched from the database server-side — never trust client values
3. No dynamic discounting (kept transparent for quiet luxury UX)
4. Shipping is free (can be changed per-config later)
5. Tax (GST) calculated at checkout, not in builder

## Where Pricing Runs

| Context | Client | Server |
|---------|--------|--------|
| Live preview in builder | ✓ (for instant feedback) | |
| "Add to Cart" | | ✓ (recomputes, stores) |
| Cart display | | ✓ (recomputes from DB) |
| Checkout submission | | ✓ (final recompute before order creation) |

## Lead Time

`maxLeadTime = max(all selected parts' leadTimeDays)`

Displayed on builder, cart, and checkout. For ready-to-wear: `leadTimeDays = 0` (ships in 2-3 business days).
