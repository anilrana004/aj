# Brand Design Tokens

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-sand` | `#f5f0e8` | Primary background |
| `--color-warm-stone` | `#e8e0d4` | Secondary background, cards |
| `--color-burnt-saffron` | `#c47d4a` | Background accent |
| `--color-deep-terracotta` | `#a85c3d` | Primary accent (hover states) |
| `--color-oxidized-bronze` | `#6b5b4f` | Background darker |
| `--color-dark-aubergine` | `#2d1f22` | Dark background, text inverse bg |
| `--color-gold-foil` | `#b8965c` | Gold accent (links, highlights) |
| `--color-ivory-text` | `#faf7f3` | Text on dark backgrounds |
| `--color-ink` | `#2a2522` | Primary text color |

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | Playfair Display, serif | Headlines, product names |
| `--font-ui` | Inter, system-ui, sans-serif | Body text, UI elements |
| `--text-hero` | `clamp(2.25rem, 5vw, 5.25rem)` | Hero titles |
| `--text-h1` | `clamp(2rem, 4vw, 3.5rem)` | Section titles |
| `--text-h2` | `clamp(1.75rem, 3vw, 3rem)` | Sub-section titles |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card titles, labels |
| `--text-body` | `clamp(1rem, 1.2vw, 1.125rem)` | Body copy |
| `--text-caption` | `clamp(0.75rem, 1vw, 0.875rem)` | Labels, metadata |

## Spacing Scale (8px base)

| Token | Value |
|-------|-------|
| `--space-1` | 0.125rem (2px) |
| `--space-2` | 0.25rem (4px) |
| `--space-4` | 0.5rem (8px) |
| `--space-6` | 0.75rem (12px) |
| `--space-8` | 1rem (16px) |
| `--space-12` | 1.5rem (24px) |
| `--space-16` | 2rem (32px) |
| `--space-24` | 3rem (48px) |
| `--space-32` | 4rem (64px) |
| `--space-48` | 6rem (96px) |

## Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | 200ms ease-out | Hover states, small interactions |
| `--transition-normal` | 400ms ease-out | Page transitions, reveals |
| `--transition-slow` | 600ms ease-out | Hero entrance, parallax |

## Component Classes

- `.btn-primary` — Dark aubergine bg, ivory text, gold hover
- `.btn-ghost` — Transparent, ink border, ink text
- `.btn-ghost-inverse` — Transparent, ivory border, ivory text
- `.input-field` — Sand bg, ink text, gold focus ring
- `.input-field-dark` — Aubergine bg, ivory text, gold focus ring
- `.divider-gold` — 1px gold-foil border
- `.divider-ink` — 1px ink border
- `.quote-block` — Playfair italic, gold left border
- `.nav-container` — Fixed top, blur backdrop, sand bg
- `.hero-container` — Full viewport, flex center
- `.section-container` — Max 1440px, centered
- `.px-responsive` — Horizontal padding responsive
- `.reading-container` — Max 720px, centered
- `.image-caption` — Caption font, muted, below images
