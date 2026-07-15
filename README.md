# Apriliha Singh - Fine Bespoke Jewelry
Next.js 14 + Tailwind CSS v4 + Framer Motion

## Design Philosophy
- Apple's restraint + India's richness
- Editorial photography, not product grids
- Flat, matte earth-tone backgrounds only
- Gold as trim, never fill
- Quiet, single-purpose motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home
│   ├── collections/       # Collections landing + [slug]
│   ├── product/[slug]/    # Product detail
│   ├── atelier/           # Atelier page
│   ├── journal/           # Journal index + [slug]
│   ├── appointment/       # Booking form
│   └── contact/           # Contact page
├── components/
│   ├── ui/                # Button, Input, Textarea, Image
│   ├── layout/            # Header, Footer, Container
│   └── sections/          # Reusable page sections
├── lib/
│   ├── data.ts            # Static content (collections, products, journal, atelier)
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Helper functions
└── styles/
    └── globals.css        # Tailwind v4 config + design tokens
```

## Design Tokens (globals.css)

### Colors
- `--color-sand` (#f5f0e8) - Primary background
- `--color-warm-stone` (#e8e0d4) - Secondary background
- `--color-burnt-saffron` (#c47d4a) - Accent background
- `--color-deep-terracotta` (#a85c3d) - Primary buttons
- `--color-oxidized-bronze` (#6b5b4f) - Dark accent
- `--color-dark-aubergine` (#2d1f22) - Dark backgrounds
- `--color-gold-foil` (#b8965c) - Gold trim
- `--color-ivory-text` (#faf7f3) - Light text
- `--color-ink` (#2a2522) - Primary text

### Typography
- Display: Canela / Tiempos Headline / GT Sectra
- UI: Inter / Suisse Int'l / General Sans

### Spacing
8px base scale: space-1 (2px) through space-80 (160px)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - Hero, Philosophy strips, Featured collections, Atelier preview, Journal preview, Testimonials, CTA |
| `/collections` | All 4 collections in editorial grid |
| `/collections/[slug]` | Collection story + pieces |
| `/product/[slug]` | Product gallery, specs, making-of, inquiry |
| `/atelier` | Founder story, 6-stage process, materials/ethics, workshop gallery |
| `/journal` | Featured article + all stories grid |
| `/journal/[slug]` | Full article with rich blocks |
| `/appointment` | Multi-step booking form with validation |
| `/contact` | Concierge channels, inquiry types, map, care guide |

## Key Components

### UI
- `Button` - Primary, Ghost, Ghost-Inverse variants
- `Input` / `Textarea` - Accessible, dark/light variants
- `Image` - Next.js Image wrapper with captions

### Layout
- `Header` - Minimal nav, mobile drawer, scroll state
- `Footer` - 4-column links, social, copyright
- `Container` / `Section` / `ReadingContainer` - Consistent spacing

### Sections
- `Hero` - Full-screen with overlay, CTAs
- `PhilosophyStrip` - Full-width quote bands
- `FeaturedCollection` - Split layout with story
- `AtelierPreview` - Overlay on workshop photo
- `JournalPreview` - Article cards
- `TestimonialStrip` - Auto-rotating carousel
- `AppointmentCTA` - Conversion banner

## CMS Integration (Sanity)

Schemas defined in `sanity/schemas/`:
- Collection
- Product
- JournalArticle
- AtelierContent

Configure `next-sanity` client in `src/lib/sanity.ts`.

## Performance

- `next/image` for all images (AVIF/WebP)
- Priority loading for above-fold images
- `font-display: swap` for web fonts
- Static generation where possible
- Framer Motion `whileInView` for scroll animations

## Accessibility

- Semantic HTML5
- Focus-visible states (gold outline)
- ARIA labels on interactive elements
- Alt text on all images
- Keyboard-navigable forms
- Color contrast ratios met

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel with environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (for preview)

## License

Proprietary - Apriliha Singh 2025