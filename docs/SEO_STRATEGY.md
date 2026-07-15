# SEO, AEO & GEO Strategy

## SEO (Traditional Search)

### On-Page
- Every page has unique `<title>`, meta description, canonical URL
- Open Graph + Twitter Card tags via `buildMetadata()` helper
- Semantic HTML with proper heading hierarchy (one `<h1>` per page)
- Image `alt` text as required field on all Part/Product images
- Clean URL slugs everywhere (`/product/oxidized-bronze-jhumka`)

### Technical
- `sitemap.xml` auto-generated from DB records (`app/sitemap.ts`)
- `robots.txt` allowing all crawl, pointing to sitemap
- JSON-LD structured data on every relevant page
- Next.js App Router SSR for full crawlability
- Image optimization via `next/image` with `srcset`
- Font preloading, no layout shift (reserved image space)
- Lazy-load below-fold sections

### Sitemap Coverage
- Static pages: Home, Collections, About, Craftsmanship, Journal, FAQ, Contact, Legal
- Dynamic: Products, Collections (by slug), Journal articles, Builder pages

## AEO (Answer Engine Optimization)

### Structured Data (JSON-LD)
- `Organization` — on every page
- `WebSite` — with SearchAction on home
- `Product` — on every product page (name, price, availability, brand)
- `Article` — on every journal/craftsmanship page
- `FAQPage` — on `/faq` page
- `BreadcrumbList` — on every page with breadcrumbs

### Content Structure for Snippets
- Journal articles use question-as-heading structure where natural
- Subheadings phrased as questions get pulled into answer boxes
- FAQ page has specific, detailed Q&A with `FAQPage` schema
- Part stories contain genuinely informative craft/material content

## GEO (Generative Engine Optimization)

### For AI Citation
- Write in clear, factual, citable sentences
- Avoid vague marketing fluff ("exceptional beauty")
- Instead: "This piece is hand-finished in Jaipur using the oxidation technique traditionally used for antique-finish silver."
- Maintain crawlable `/journal` and `/craftsmanship` content hub
- Content is accurate, dated, and attributed (author/brand on every article)

### Entity Recognition
- `Organization` schema with `sameAs` links to brand profiles
- Clear, self-contained `/about` page with brand description in first paragraph
- Server-rendered HTML (Next.js SSR) for full AI fetcher visibility

### Content as AEO Asset
- Each Part's "story" is genuinely informative (origin, technique, region)
- These stories answer real craft/material questions that users search for
- The builder itself generates unique, detailed product content per configuration
