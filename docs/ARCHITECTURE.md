# Architecture

## Overview

Apriliha Singh is a fine jewelry e-commerce platform built as a monorepo with two Next.js applications:

1. **`apps/web`** — Customer-facing storefront
2. **`apps/admin`** — Internal admin panel (separate port, protected)

## Monorepo Structure

```
apriliha-singh/
├── apps/
│   ├── web/          # Next.js 14 App Router, customer-facing
│   ├── admin/        # Next.js 14, admin panel
├── packages/
│   ├── database/     # Prisma schema + migrations (shared)
│   ├── types/        # Shared TypeScript types
│   └── config/       # Shared eslint, tsconfig, tailwind config
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS with custom design tokens |
| Animation | Framer Motion (sparingly) |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (Credentials, Google OAuth, Magic Link) |
| Payments | Stripe / Razorpay (adapter pattern) |
| Email | Resend (adapter pattern) |
| Images | Next/Image + CDN (Cloudinary/S3) |
| Search | PostgreSQL full-text search v1 |

## Key Architectural Decisions

### Guest-First Checkout
Cart persists via guest session token (cookie) without auth. Account creation is optional and offered post-purchase.

### Server-Side Price Computation
All prices are recomputed server-side before checkout — never trust client-computed totals.

### Payment Webhook as Source of Truth
Order status transitions to "paid" only via webhook confirmation, not client redirect.

### Bespoke Builder Pricing Engine
Pure functions that compute totals from part selections, unit-tested and shared between client preview and server validation.

### Email Adapter Pattern
Email provider (Resend, Postmark, SendGrid) is swappable via a single factory function.

### Payment Provider Adapter
Stripe and Razorpay are interchangeable via a `PaymentProvider` interface.

## Data Flow

### Bespoke Build → Cart → Checkout → Order

1. User selects parts in builder → live price preview (client)
2. "Add to Cart" → server recomputes price → creates cart item with `bespokeConfig` JSON
3. Checkout → server recomputes price again → creates Order with `PENDING_PAYMENT` status → creates payment intent
4. Payment confirmation via webhook → Order status → `PAID` → `IN_PRODUCTION` (bespoke) or `SHIPPED` (ready-to-wear)
5. Status transitions trigger transactional emails

### Order State Machine

```
PENDING_PAYMENT → PAID → IN_PRODUCTION → QUALITY_CHECK → SHIPPED → DELIVERED
                  ↓
               CANCELLED (payment failed)
                  ↓
                REFUNDED
```
