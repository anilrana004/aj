# Design System

## Design Philosophy

"An art gallery in Jaipur, designed by Apple."

Quiet luxury. Rich materials, deep craft, expressed with restraint. Warm, soulful, never cold or gaudy.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Sand | `#E4D8C4` | Backgrounds, light surfaces |
| Saffron | `#C9762C` | Accents, badges |
| Terracotta | `#8A3B24` | Primary CTAs, links, focus states |
| Bronze | `#6B4A2E` | Secondary text, borders |
| Aubergine | `#2E1B24` | Primary text, dark backgrounds |
| Stone | `#D7CBB8` | Dividers, subtle backgrounds |
| Gold Flat | `#B9873B` | Accents (never gradient) |
| Rust | `#C9542F` | Errors, sale badges |

**Hard avoid:** No gold gradients, no ornate scrollwork, no glitter/sparkle effects.

## Typography

| Role | Font | Fallback |
|------|------|----------|
| Headlines/Display | Canela (serif) | Georgia, serif |
| Body/UI | Inter (sans) | -apple-system, sans-serif |

### Type Scale

- Display: 4.5rem / 1.05
- Headline: 3rem / 1.1
- Subhead: 1.5rem / 1.3
- Body-lg: 1.125rem / 1.6
- Body: 1rem / 1.6
- Caption: 0.75rem / 1.5
- Label: 0.6875rem / 1

## Spacing

Generous. Whitespace is a design material, not empty space to fill.

## Border Radius

2px default (near-square, gallery frame feel). No bubbly rounded corners.

## Motion

- Fade + rise on scroll (12-16px, 300ms)
- Soft crossfades between images
- No bounce/elastic easing, no confetti, no spinning loaders
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Components

### Buttons
Flat fill or outline only. No drop shadows, no gradients. Sharp corners (2-4px). Uppercase small-tracked labels for primary CTAs.

### Cards
No heavy box-shadows. Hairline border (1px, low-opacity) or simple background separation.

### Forms
Transparent background, subtle border. Focus states in brand terracotta.

## Accessibility

- WCAG 2.1 AA minimum
- Full keyboard navigation
- Focus states styled in-brand
- Alt text on all images
- Form labels and ARIA on all controls
