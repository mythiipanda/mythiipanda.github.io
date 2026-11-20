# t3.codes design tokens (extracted from github.com/pingdotgg/t3code/apps/marketing)

For the landing rework session. Source: apps/marketing/src/layouts/Layout.astro + pages/[...locale]/index.astro. Clone lives at ~/repos/t3code on free-session-3's VM (may be gone).

## Palette (dark, single accent)
- --bg: #000; --bg-elev: #0a0a0a; --bg-card: #0d0d0d
- --fg: #f5f5f5; --fg-muted: #a3a3a3; --fg-dim: #737373; --fg-faint: #525252
- --border: rgba(255,255,255,.08); --border-strong: rgba(255,255,255,.14)
- --accent: oklch(0.68 0.17 264) (violet); btn-primary bg oklch(0.571 0.21 264), hover oklch(0.62 0.2 264); ONE accent only
- radii: 12 / 8 / 16; buttons radius 8 (lg: 10)

## Type
- Inter Variable (fontsource); mono: ui-monospace stack
- .display: weight 600, letter-spacing -0.03em, line-height 1.05
- h1: clamp(38px,5.6vw,76px), max-width 20ch, text-wrap: balance
- hero-sub: muted, clamp(16→19px), max-width 720px, line-height 1.55
- eyebrow: 11px mono, uppercase, letter-spacing .14em, fg-dim
- section h2: clamp(32px,4vw,48px); section-head max-width 720px, margin-bottom 40px, eyebrow margin-bottom 14px

## Layout
- .container: max-width 1240px, padding 0 32px
- section: padding 80px 0, border-top 1px var(--border)
- nav: sticky, backdrop-blur(18px), bg color-mix(bg 75%), border-bottom only when .is-scrolled
- buttons: .btn inline-flex gap 8, 14px/500, pad 10x18; .btn-lg 15px pad 14x22; primary=accent bg+white 600; ghost=transparent+border+muted→fg hover

## Hero (the part that fills empty space)
- faint grid bg: linear-gradient 1px rgba(255,255,255,.018) lines, 48px cells, radial mask ellipse 80%x60% at 50% 40%
- floating marks: 6 small cards (bg-card+border+radius 25%+shadow 0 12px 32px -16px rgba(0,0,0,.65)) positioned around the centered title; sizes 56-96px, slight rotations, parallax to pointer via --px/--py * --depth, enter once with staggered rise+rotate animation. For Dime: stat chips instead of logos.
- hero-screenshot-frame: radius 12, box-shadow 0 0 0 1px var(--border-strong), aspect-ratio fixed, img cropped center-top
- [data-rise] load animation: opacity/translateY(16px) 0.7s cubic-bezier(.2,.7,.2,1), stagger via --d

## Sections on the real page
hero → endorsements(tweet marquee) → harnesses (6-col tile grid, gap:0, shared border, tiles 22x20 hover bg .025) → git (split 1.25fr/1fr feature w/ kbd) → open (split) → cta (display h2 + primary lg) → footer

## Status in this repo
- PR #3 (revert of PR #1) merged: old page live again.
- PR #2 (v="g" neutral rework) open, conflicts with main, DO NOT MERGE — Tony rejected it, wants heavy iteration from real t3code code.
- Dev feedback on v2 (still valid as direction): centered hero / one display face / one accent / one spacing rhythm / demo data 2026-27 full names / product window is its own frame.
- Idea for float marks: mono stat chips (Jokić +8.2 on/off, BOS #3 ORtg, 255 UFAs 2027, Flagg #1 board) — same card treatment as t3's harness marks.
