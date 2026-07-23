# Hard-Shadow / Neubrutalist Design System — Irakoze Darlo

A portable design system, evolved from the StudyApp hard-shadow guide and a
bored.com neubrutalism reference, as used on irakozedarlo.be. Give this file
to any tool or person building UI for me and the result should feel like the
same brand. The signature: **solid un-blurred offset shadows, 2px ink
borders, square corners, dot-grid paper, one blue family + three warm
accents, Manrope.**

---

## 1. Principles

- **Flat but physical.** No gradients-as-decoration, no blur, no
  glassmorphism. Depth comes only from hard offset shadows — cards read as
  paper cutouts resting on the page.
- **Sharp everything.** `border-radius: 0` on every element. One rounded
  corner breaks the style (rounded pills from the bored.com reference were
  considered and rejected).
- **Everything outlined.** Every shadowed surface also carries a
  `2px solid ink` border. Small chips get the border without the shadow.
- **One ink does the heavy lifting.** Text, borders, shadows, and primary
  buttons all use the same near-black ink.
- **Opaque surfaces on dotted paper.** Fills are solid; the dot-grid page
  background shows *between* cards, never through them.
- **Restraint in motion**, with named exceptions only (see §7).

## 2. Color tokens

```css
:root {
  color-scheme: light;

  --ink:        #16191e;   /* near-black, cool cast — text, borders, shadows */
  --ink-soft:   #3d444d;   /* secondary text */

  --paper:      #f4f4f2;   /* page background (under the dot grid) */
  --surface:    #f7f8f5;   /* section / hero fill */
  --accent:     #b0c9e2;   /* powder blue — card fill */
  --paper-strong: #649fd3; /* saturated slate blue — chips, tags, text-on-ink */

  /* Warm companions — RESTRICTED USE: project covers, section-title chips,
     small square markers. Never on buttons, tags, nav, or card surfaces. */
  --accent-coral:   #e28568;
  --accent-apricot: #ecaa4f;
  --accent-rose:    #d983ae;

  --border-hard: 2px solid var(--ink);
  --shadow:    7px 7px 0 var(--ink);   /* desktop */
  --shadow-sm: 5px 5px 0 var(--ink);   /* <= 720px */

  /* Semantic, only for correct/incorrect states */
  --positive: #2e7d4f;
  --negative: #c0392b;
}
```

Brand logos (tech marquees, contact icons) are the single exception allowed
to use official brand colors. No other hues, ever.

## 3. The shadow (signature)

- One recipe everywhere: `7px 7px 0 var(--ink)`, stepping to `5px 5px 0`
  below 720px. **Zero blur, zero spread, full-opacity ink.**
- Offset always down-right; never mix directions.
- Not everything gets a shadow: tags, chips, section-title headings stay
  flat — the contrast between shadowed and flat elements IS the hierarchy.
- Pressed state for buttons:

```css
.button:active { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--ink); }
```

## 4. Page background

```css
body {
  background-color: var(--paper);
  background-image: radial-gradient(rgba(22,25,30,0.14) 1.5px, transparent 1.5px);
  background-size: 22px 22px;
}
```

## 5. Surfaces

| Element              | Fill                    | Border          | Shadow |
|----------------------|-------------------------|-----------------|--------|
| Hero / section panel | `--surface` (opaque)    | 2px ink         | 7px    |
| Interactive card     | `--accent` (opaque)     | 2px ink         | 7px    |
| Button               | ink (primary) / accent  | 2px ink         | 5px    |
| Small chip / row     | `#fff` (opaque)         | 2px ink         | none   |
| Tag / heading chip   | `--paper-strong` or warm accent | none    | none   |

Section headings are chips: inline-block, opaque colored background,
`0.45rem 0.8rem` padding — rotate the hue per section (blue, coral,
apricot, rose).

## 6. Typography

- **Manrope**, self-hosted woff2, weights 400 / 600 / 700 / 800. Fallbacks:
  `'Avenir Next', 'Segoe UI Variable', 'Segoe UI', sans-serif`.
- Headings weight 800; display: `clamp(1.85rem, 3.5vw, 3rem)`,
  `line-height: 1`, `letter-spacing: -0.03em`, `max-width: 16ch`.
- Labels: 0.8rem, weight 650, uppercase, `letter-spacing: 0.05em`.
- Anything interactive: weight 600–700.

## 7. Motion

- `transition: transform 0.18s ease, background-color 0.18s ease` — nothing longer.
- Card hover `translateY(-2px)` (the shadow stays put — the card lifts off
  it); button hover `translateY(-1px)`.
- Entry reveal: opacity + 16px rise, 0.5s, once; remove helper classes after.
- Approved exceptions (do not add more): a continuous logo marquee
  (~36s linear loop, pauses on hover) and a hero typewriter (50ms/char).
  No parallax, no scaling, no bounces.
- Always respect `prefers-reduced-motion` (kill animations, skip typewriter).

## 8. Iconography

- No emojis, no raster images.
- Pictograms: inline SVG line-art — ink strokes, `stroke-width` 2.5,
  square caps, miter joins — on colored cover blocks.
- Brand logos: inline SVG with official brand-color fills (Simple Icons),
  used only in marquees / contact rows.

## 9. Layout

- One shell, one padding layer: container `min(100%, 1320px)`,
  `padding: 0 24px` (12px below 720px). Sections and cards never add their
  own horizontal page padding.
- Card grids: `repeat(auto-fill, minmax(280px, 1fr))`, gap 20px.
- Spacing in multiples of 4. Breakpoints: 720px (shadows step down,
  stacks go vertical) and 480px.
- `html { overflow-x: hidden }` (iOS ignores it on body alone).

**Containment — a shadowed card must never escape its parent.** The hard
shadow makes any overflow obvious, so the rule is strict:

- Every shadowed surface sits fully inside its parent's padding box; its 2px
  border and offset shadow never cross the parent's edge. A card bleeding out
  the side of another card means this rule is broken.
- Don't nest shadows. Inside a shadowed card, put flat blocks (border only,
  no shadow) — the outermost surface owns the shadow.
- Every flex or grid child gets `min-width: 0`. The default `auto` lets
  content force the child wider than its track, straight past the parent.
- Long unbreakable strings — URLs, tokens, code, hashes — must wrap:
  `overflow-wrap: anywhere` on `code` and any cell that can hold them. A long
  URL is the classic trigger for a card breaking out of its container.

## 10. Do / Don't

**Do**: one shadow recipe; borders on everything shadowed; flat chips for
contrast; opaque fills; square corners; warm accents as seasoning.

**Don't**: blur or soften shadows; round any corner; introduce new hues;
put warm accents on structural elements; animate continuously (beyond the
two approved exceptions); use emojis; let a shadowed card bleed past its
parent (`min-width: 0` on flex/grid children; wrap long URLs/code with
`overflow-wrap: anywhere`).
