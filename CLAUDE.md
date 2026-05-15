# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BloodFeather Studio — a 5-page static marketing website for an indie game studio. No build system, no framework, no dependencies. Open HTML files directly in a browser or use any static file server (e.g. `npx serve .`).

## File Structure

```
BloodfeatherStudio Wireframe/
├── styles.css          ← Shared design system (all pages import this)
├── scripts.js          ← Shared JS (nav, scroll reveal, contact form)
├── home/index.html     ← Studio home page with hero countdown
├── neon-steel/index.html ← Game detail page (Neon Steel)
├── about/index.html    ← Studio story + 20-member team roster
├── contact/index.html  ← Contact form + FAQ
└── games/index.html    ← Games catalogue (legacy/simple page)
```

Each page links to shared files via `../styles.css` and `../scripts.js`. Page-specific CSS lives in a `<style>` block inside that page's `<head>`.

## Design System (`styles.css`)

### CSS Custom Properties (tokens)
```css
/* Palette */
--void: #050307         /* page background */
--crimson: #BF1E37      /* primary brand red */
--crimson-b: #E0253F    /* brighter crimson (hover/accent) */
--gold: #C48B2E         /* secondary accent */
--ivory: #EDE0CA        /* primary text */
--ivory-2: #C8B898      /* secondary text */
--muted: #8A7A70        /* muted/supporting text */
--faint: #54475A        /* very faint text/icons */
--neon-c: #00E5FF       /* cyan — used on Neon Steel page */
--neon-p: #A855F7       /* purple accent */

/* Typography */
--f-display: 'Cinzel Decorative', serif   /* headlines, logo */
--f-head: 'Cinzel', serif                 /* section headings */
--f-body: 'Cormorant Garamond', serif     /* body text, blurbs */
--f-ui: 'Jost', sans-serif               /* labels, buttons, nav */

/* Layout */
--sp: clamp(5rem, 9vw, 9rem)   /* standard section padding */
--wrap: min(1240px, 92vw)      /* max content width */
```

### Key Shared Classes
- `.reveal` / `.reveal.in` — scroll-triggered fade-up (IntersectionObserver in scripts.js)
- `.stagger` — adds transition-delay to first 6 children
- `.label` — small uppercase gold label with decorative left line
- `.btn`, `.btn-solid`, `.btn-ghost`, `.btn-gold`, `.btn-neon` — slide-fill button variants
- `.card` — base card with hover lift + border highlight
- `.section` + `.container` — standard layout wrappers
- `.grid-2`, `.grid-3`, `.grid-4` — simple CSS grid utilities
- `.divider` / `.divider-gem` — decorative horizontal rule with crimson diamond
- `.section-header` — label + h2 + optional italic p block

### Animations (defined in styles.css)
`fadeUp`, `fadeIn`, `slide-r`, `pulsate`, `float`, `shimmer`, `glow-pulse`, `spin-slow`, `draw`

## Page-Specific Notes

### `home/index.html`
- Hero countdown timer targets `2026-06-30T00:00:00`; JS is inline at bottom of file, updates `#cd-days`, `#cd-hours`, `#cd-minutes`, `#cd-seconds` every 1000ms
- Hero element animation order (staggered `animation-delay`): label → title → tagline → `.hero-countdown` (0.88s) → `.hero-actions` (1.0s)
- Featured game section uses label "Our Game", genre "2.5D Action Brawler"

### `neon-steel/index.html`
- Neon Steel: published by **2Cent**, releasing **June 30, 2026** on **PC**
- Hero label: "Published by 2Cent"; badges: "2.5D Action Brawler", "PC", "2.5D", "Cyberpunk", "June 30, 2026"
- Stats bar: **20 Team Members**, **20+ Months Dev**, **Jun '26 Release Date**
- Protagonist: **Kade Ito**; antagonist: **Ryo**; setting: **The Docks** (neon-powered city)
- Info panel: Publisher 2Cent · Platform PC · Release June 30, 2026 · Status: In Active Development
- SVG text labels: `KADE ITO`, `THE DOCKS`, `RYO`
- Media gallery placeholder: 5 frames in a `2fr 1fr` top + `repeat(3,1fr)` bottom CSS Grid mosaic

### `about/index.html`
- 20-member team roster split into **Art** group (label: `--crimson`) and **Dev** group (label: `--neon-c`)
- Grid class `.team-grid-20`: `repeat(5,1fr)` → 4 col at 1024px → 3 col at 768px → 2 col at 500px
- Each `.team-card` has a hover slide-up `.team-avatar-links` panel (bottom-right corner of avatar) with LinkedIn + Portfolio icon links — currently `href="#"` placeholders
- `.team-blurb`: italic, `--f-body`, `0.95rem`, `--muted` color, max 200 characters
- Contact email: `bloodfeatherstudio@gmail.com`

### `contact/index.html`
- Contact email: `bloodfeatherstudio@gmail.com`
- FAQ release answer: "Neon Steel releases June 30, 2026 on PC."
- Form submit is client-side only (no backend) — button shows "Sent!" for 3s then resets

### `games/index.html`
- Legacy/simple catalogue page; less maintained than neon-steel page

## Neon Steel — Game Facts
| Field | Value |
|---|---|
| Title | Neon Steel |
| Genre | 2.5D Action Brawler |
| Platform | PC |
| Publisher | 2Cent |
| Release | June 30, 2026 |
| Protagonist | Kade Ito |
| Antagonist | Ryo |
| Setting | The Docks (neon-powered city) |
| Status | In Active Development |

## 20-Member Team Roster

**Art Group**
| Name | Role |
|---|---|
| Aria Hirano | Art Lead |
| Josh Maggiacomo | Artist |
| Jeremy King | Environment Artist |
| Matthew Grindle | Environment Artist |
| Riley Trout | Character Artist |
| Thomas Wilson | 3D Animator |
| Jon Bova | Concept Artist |
| Kaya Renner | UI/UX Designer |
| Owen Hale | VFX Artist |
| Ryn Raposo | Artist |

**Dev Group**
| Name | Role |
|---|---|
| Evan Carless | Dev Lead |
| Liam Wilson | Gameplay Programmer |
| Damon Schmitke | Programmer |
| Erik Eliason | Gameplay Programmer |
| Nik Sandford | Systems Programmer |
| Ryan Doyle | Gameplay Programmer |
| Ty Schoenfelder | Gameplay Programmer |
| Nathan Yoo | Gameplay Programmer |
| Ben Janzen | Audio Designer |
| Kenzie Barber | Gameplay Programmer |

All LinkedIn and Portfolio links are `href="#"` placeholders awaiting real URLs.
