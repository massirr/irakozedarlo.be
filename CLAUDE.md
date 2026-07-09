# CLAUDE.md

Personal portfolio for Massirr, served by GitHub Pages from the root of this
repo. Plain static site — no build step, no framework, no dependencies.

## Files

- `index.html` — single-page portfolio (hero, about, skills, projects, contact, footer)
- `styles.css` — all styling; the design system lives here as CSS custom properties on `:root`
- `script.js` — vanilla JS: smooth scroll, fade-in on scroll, skill bars, active nav link, contact form stub

To preview locally, open `index.html` in a browser or run `python3 -m http.server`.

## Current state: design set, content pending

The visual design is done. **All copy is placeholder** — sections are marked
with `<!-- PLACEHOLDER CONTENT -->` comments in `index.html`. When real
content is decided (bio, skills, projects, stats, contact details), replace
the placeholders without changing the structure or styling. The contact form
has no backend; the submit handler in `script.js` is a stub.

## Design system: hard-shadow style

The site follows a strict "hard-shadow" design language. When touching any
styling, obey these rules — they are what make the design coherent:

### The shadow (signature feature)
- One recipe everywhere: `box-shadow: 7px 7px 0 var(--ink)` (desktop),
  `5px 5px 0` below 720px. Defined as `--shadow` / `--shadow-sm`.
- **Zero blur, zero spread, full-opacity ink.** Never soften it.
- Offset is always down-right; never mix directions.
- Not everything gets a shadow: chips, tags, and section-title headings stay
  flat. The contrast between shadowed cards and flat elements IS the hierarchy.
- Buttons have a pressed state: `:active` translates toward the shadow and
  shrinks the offset.

### Corners and colors
- `border-radius: 0` everywhere. No exceptions — one rounded corner breaks the style.
- One ink color (`--ink`, near-black warm neutral) drives text, borders,
  shadows, and primary buttons.
- Palette is limited to ink, paper (`--paper`, tinted off-white), one accent
  (`--accent` tan / `--paper-strong` gold), plus semantic green/red only for
  correct/incorrect states. Do not introduce new hues.
- Surfaces are translucent (`--surface*` tokens) so the layered page
  background glows through.

### Typography
- Stack: `'Avenir Next', 'Segoe UI Variable', 'Segoe UI', sans-serif`.
- Display headings: `clamp(1.85rem, 3.5vw, 3rem)`, `line-height: 1`,
  `letter-spacing: -0.03em`, `max-width: 16ch`.
- Section headings are chips: inline-block, opaque `--paper-strong`
  background, `0.45rem 0.8rem` padding.
- Labels: 0.8rem, weight 650, uppercase, `letter-spacing: 0.05em`.
- Weights skew heavy (600–700) for anything interactive.

### Motion
- `transition: transform 0.18s ease, background-color 0.18s ease` — nothing longer.
- Card hover: `translateY(-2px)`; the shadow stays put, the card lifts off it.
- Button hover: `translateY(-1px)`.
- Entry animations: opacity fade only (~0.28s). No slides, bounces, scaling,
  parallax, or typing effects.
- `prefers-reduced-motion` is respected (see end of `styles.css`).

### Layout
- Content width `min(100%, 1200px)`; card grids
  `repeat(auto-fill, minmax(280px, 1fr))` gap 20px; stat rows
  `minmax(140px, 1fr)` gap 16px.
- Spacing in multiples of 4. Breakpoints at 720px and 480px.
