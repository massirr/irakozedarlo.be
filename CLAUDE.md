# CLAUDE.md

Personal portfolio for Irakoze Darlo (GitHub: massirr), served by GitHub
Pages from the root of this repo. Plain static site — no build step, no
framework, no dependencies.

## Files

- `index.html` — single-page portfolio (hero, about, skills, projects, contact, footer)
- `styles.css` — all styling; the design system lives here as CSS custom properties on `:root`
- `script.js` — vanilla JS: smooth scroll, fade-in on scroll, active nav link

To preview locally, open `index.html` in a browser or run `python3 -m http.server`.

## Current state

Design and structure are set. Copy is a first draft written from the public
GitHub profile (github.com/massirr) — sections carry `<!-- DRAFT COPY -->`
comments where wording should be verified by the owner. **Positioning: the owner's chosen title is "Aspiring data engineer with an
interest in software development"** — copy leads with data (Python, SQL,
Jupyter, Azure Databricks DP-750 in progress) and treats web development as
a supporting skill. Keep that emphasis; do not retitle him as a software
developer. Once DP-750 is passed, the "aspiring" qualifier can be revisited. Deliberate content
decisions (do not reintroduce these):

- **No emojis** — icons are replaced by typographic labels and monogram initials.
- **No skill percentage bars** — skills are flat chip lists, no invented numbers.
- **No stat cards** ("X years experience" etc.).
- **No contact form** — there is no backend; contact is a `mailto:` CTA plus
  direct links (email, LinkedIn, GitHub).

## Backlog (owner's to-do, keep until done)

- **Get indexed**: submit irakozedarlo.be to Google Search Console (verify
  via DNS TXT record at Combell) and Bing Webmaster Tools; add the site URL
  to the owner's LinkedIn profile and GitHub profile website field.
- Review remaining `<!-- DRAFT COPY -->` sections with the owner.
- Decide contact email: currently irakoze.darlo@outlook.com; owner also has
  addresses on the irakozedarlo.be domain.

## Design system: hard-shadow style

The site follows a strict "hard-shadow" design language. When touching any
styling, obey these rules — they are what make the design coherent:

### The shadow (signature feature)
- One recipe everywhere: `box-shadow: 7px 7px 0 var(--ink)` (desktop),
  `5px 5px 0` below 720px. Defined as `--shadow` / `--shadow-sm`.
- **Zero blur, zero spread, full-opacity ink.** Never soften it.
- Offset is always down-right; never mix directions.
- Not everything gets a shadow: chips, tags, skill-list items, contact links,
  and section-title headings stay flat. The contrast between shadowed cards
  and flat elements IS the hierarchy.
- Buttons have a pressed state: `:active` translates toward the shadow and
  shrinks the offset.

### Corners and colors — slate blue palette
- `border-radius: 0` everywhere. No exceptions — one rounded corner breaks the style.
- One ink color drives text, borders, shadows, and primary buttons:
  `--ink: #16191e` (near-black, cool cast).
- Palette: paper `#f2f4f1` (cool off-white), accent `#b0c9e2` (powder blue,
  card surfaces), highlight `--paper-strong: #649fd3` (saturated slate blue —
  chips, tags, text-on-ink), plus semantic green/red reserved for
  correct/incorrect states.
- Three warm companions to the blue: `--accent-coral: #e28568`,
  `--accent-apricot: #ecaa4f`, `--accent-rose: #d983ae`. **Usage is
  restricted**: project covers, section-title chips, and the small square
  markers on skill cards. Buttons, tags, nav, and card surfaces stay in the
  blue family — the warm hues are seasoning, not structure. Do not introduce
  further hues.
- One exception: the skills marquee logos keep their official brand colors
  (inline `fill` on each SVG). Everywhere else the palette rules apply.
- This palette was chosen deliberately to differ from the StudyApp repo's
  tan/gold.
- Neubrutalist surfaces (reference: bored.com, owner-approved 2026-07):
  fills are **opaque** (`--surface*` tokens), the page background is paper
  with an ink dot grid (`22px` spacing), and **every shadowed surface also
  carries a `2px solid var(--ink)` border**. Small chips (skill-list items,
  contact links) are white with the same 2px ink border but no shadow.
  Corners stay square — rounded pills from the reference were explicitly
  rejected.

### Typography
- Stack: `'Avenir Next', 'Segoe UI Variable', 'Segoe UI', sans-serif`.
- Display headings: `clamp(1.85rem, 3.5vw, 3rem)`, `line-height: 1`,
  `letter-spacing: -0.03em`, `max-width: 16ch`.
- Section headings are chips: inline-block, opaque `--paper-strong`
  background, `0.45rem 0.8rem` padding.
- Labels: 0.8rem, weight 650, uppercase, `letter-spacing: 0.05em`.
- Weights skew heavy (600–700) for anything interactive.
- Project cards use inline SVG line-art pictograms (`.project-glyph`) on
  colored covers instead of thumbnail images: ink strokes, `stroke-width`
  2.5, square caps/miter joins to match the sharp-cornered style. No emojis,
  no raster images.

### Motion
- `transition: transform 0.18s ease, background-color 0.18s ease` — nothing longer.
- Card hover: `translateY(-2px)`; the shadow stays put, the card lifts off it.
- Button hover: `translateY(-1px)`.
- Entry reveal: `.fade-in-up` (opacity + 16px rise, 0.5s); JS removes the
  classes after the reveal so hover transitions take back over.
- Owner-approved exceptions (do not add more): the skills marquee
  (`.marquee`, continuous 36s left-to-right loop, pauses on hover) and the
  hero-title typewriter (50ms/char, skipped under reduced motion). The
  scroll-down indicator was removed at the owner's request (it collided
  with the hero card on phones) — do not reintroduce it. No parallax or
  scaling.
- `prefers-reduced-motion` is respected (see end of `styles.css` and the
  `reduceMotion` guard in `script.js`).

### Layout
- One shell, one padding layer (pattern borrowed from the StudyApp repo):
  `.container` is `min(100%, 1320px)` with `padding: 0 24px` (12px below
  720px). Sections and cards must NOT add their own horizontal page
  padding — nested side paddings are what made the mobile layout cramped.
- Card grids `repeat(auto-fill, minmax(280px, 1fr))` gap 20px.
- Spacing in multiples of 4. Breakpoints at 720px and 480px.
- `html` carries `overflow-x: hidden` (iOS ignores it on body alone).
