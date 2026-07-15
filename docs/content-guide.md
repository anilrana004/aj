# Content Guide

## For Non-Technical Team Members

This guide explains how to update content on the Apriliha Singh website without touching code.

## Configurator Parts

Each configurator part has a story following the **Section 6 template**:

### Story Template

```markdown
# [Part Name]

**Slug:** `part-slug`
**Slot:** [Chain|Centerpiece|Accent|Clasp|Bead|Tassel|Guru Bead|Spacer|Cord|Length]
**Material:** [Material name]
**Price:** ₹[amount]
**Craft Time:** [time description]
**Origin:** [Region, Country]

## Story

[2-3 paragraphs of narrative. Write about the material's origin, the craft process, and the emotional resonance. Use sensory language. Reference specific places, techniques, and traditions.]

## Specs

- Weight: [X]g
- Lead time: [X] days
- In stock: [X] units
- Editor's pick: [Yes/No]

## Images

- Builder cutout: `/images/configurator/[filename].png`
- Editorial: `/images/configurator/[filename].jpg`
```

### Writing Guidelines

1. **Headline** — One evocative sentence. Not a product description. A hook.
   - Good: "Dark as the river at midnight."
   - Bad: "Oxidized Silver Hammered Chain"

2. **Narrative** — 2-3 paragraphs. Write like a travel writer, not a copywriter.
   - Reference specific places (Tonk, Muzo, Basra, Jaipur)
   - Mention specific techniques (kundan, hand-soldered, hand-hammered)
   - Use sensory language (weight, texture, light, warmth)
   - End with emotional resonance

3. **Craft Time** — Be specific. "2 days, hand-soldered" not "Handcrafted"

4. **Origin** — Always include both material origin and finishing location if different

### Markdown Files

Part stories are stored in `content/parts/[part-slug].md`. To add or update a part:

1. Copy the template above
2. Fill in all fields
3. Save as `content/parts/[new-part-slug].md`
4. The content team can edit these files directly — no code changes needed

## Page Content

### Static Pages (Home, Collections, Atelier, Care Guide)
Content is defined in `src/lib/data.ts`. Edit the data objects to update text, images, and links.

### Journal Articles
Stored in Sanity CMS or as static data in `src/lib/data.ts`. Articles use the `ArticleBlock` type with blocks for paragraphs, headings, images, pull-quotes, galleries, and dividers.

### FAQ Blocks
FAQ content is defined inline in each page component. To update:
1. Find the `<FaqBlock>` component in the page file
2. Edit the `items` array with new questions/answers
3. The schema is automatically generated from the FAQ items

## Image Guidelines

- Builder cutouts: 800×800px, PNG, transparent/white background
- Editorial images: 1200×800px, JPG, styled photography
- Hero images: 1600×900px, JPG or SVG placeholder
- OG images: 1200×630px, SVG with brand colors
