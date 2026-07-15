# Configurator Data Model

## Overview

The bespoke configurator lets clients build jewelry piece by piece — necklace, bracelet, or mala. Each product type has slots (categories of parts), and each slot is filled with a specific part.

## Core Types

### SlotType
`chain | centerpiece | accent | clasp | bead | tassel | guru_bead | spacer | cord | length`

### ProductType
`necklace | bracelet | mala`

### ConfiguratorPart
Every physical part in the system:
- `id` — Unique identifier (e.g., `chain-vermeil-link`)
- `slug` — URL-friendly slug (e.g., `vermeil-link-chain`)
- `name` — Display name (e.g., `The Jaipur Link Chain`)
- `slotType` — Which slot this part fits
- `material` — PartMaterial enum value
- `price` — Base price in INR
- `priceModifiers` — Array of `{ targetSlot, modifierAmount, reason }`
- `weightGrams` — Physical weight
- `story` — `{ headline, narrative, craftTime, originRegion }`
- `images` — Array of `{ url, alt, type, width, height }`
- `leadTimeDays` — Production time
- `inStockQuantity` — Current inventory
- `isEditorPick` — Featured in editorial

### ProductSlot
Defines a step in the configurator flow:
- `id` — Unique identifier
- `slotType` — Which type of part goes here
- `label` — Display label (e.g., `The Foundation`)
- `description` — Help text
- `required` — Must be filled to complete
- `allowsMultiple` — Can select more than one
- `maxSelections` — Maximum for multi-select slots

### Configuration
A saved design:
- `id` — Unique ID
- `productType` — necklace/bracelet/mala
- `selectedParts` — Array of `{ slotType, part, addedAt }`
- `personalization` — Engraving, length adjustment, gift wrapping
- `computedPrice` — Total price
- `status` — draft/saved/in_cart/ordered/in_production/shipped

## Pricing Engine

Located at `src/lib/pricing/engine.ts`. Pure functions, no side effects.

### `computeFullPricing(selectedParts, allParts, personalization?)`
Returns `{ basePrice, modifiersTotal, personalizationTotal, totalPrice, breakdown, warnings }`

### Price Modifiers
- Structural reinforcement: +₹4,000 if centerpiece is heavier than 2× chain weight (non-precious chain)
- Per-part modifiers: Each part can define surcharges for specific partner slots
- Engraving: ₹2,500 base + ₹1,000 for Devanagari script
- Length adjustment: ₹3,000
- Gift wrapping: ₹1,500

### Story Narrative
`buildStoryNarrative(selectedParts)` stitches individual part stories into a single paragraph.

## Product Type Slots

### Necklace
1. Chain (required, single)
2. Centerpiece (required, single)
3. Accent Stones (optional, up to 6)
4. Clasp (required, single)
5. Length (required, single)

### Bracelet
1. Foundation/Cord (required, single)
2. Centerpiece (required, single)
3. Spacers (optional, up to 8)
4. Clasp (required, single)

### Mala
1. Beads (required, single — 108 count)
2. Guru Bead (required, single)
3. Spacer Beads (optional, up to 3)
4. Tassel (required, single)
