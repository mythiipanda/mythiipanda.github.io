# Dime landing page

Served at https://mythiipanda.github.io/dime-site/. Next.js static export, built by `.github/workflows/deploy.yml` with `BASE_PATH=/dime-site` and copied into the Astro site's `dist/dime-site`.

```sh
npm ci
npm run dev                          # http://localhost:3000
BASE_PATH=/dime-site npm run build   # writes out/, serve it under /dime-site/ to check paths
```

## Design system

The page borrows the Dime app's system so site and product read as one thing. Change the app's tokens first, then mirror them here.

- **Type**: Inter for everything, JetBrains Mono for SQL, table names and code. Weights 400, 500, 600 only. Ligatures are off in code so `>=` stays `>=`.
- **Scale** (`app/globals.css`): `.display` 40 to 76px, `.title` 28 to 40px, `.lede` 19px, body 17px, `.small` 14px, UI text inside the product window 13px.
- **Shape**: 8px controls, 12px panels, 14px product window, 20px hero stage. Borders are a 1px inset shadow in `line`; the only drop shadow is under the product window.
- **Layout**: 1200px max width, 24px gutters (40px from 768px). Sections are a 400px text column plus a flexible exhibit column, separated by a hairline, 80px/112px vertical padding.
- **Controls**: 44px tall. One filled button per view (`.btn-primary`); everything else is `.btn-quiet` or `.link`.
- **Motion**: one staggered entrance on the hero (`.enter`), a 500ms radius transition on shot-map dots, a 0.96 press scale. All off under `prefers-reduced-motion`.

### Tokens

Defined in `@theme` in `app/globals.css`, so each is also a Tailwind color (`bg-page`, `text-ink-2`).

| Token | Value | Use |
| --- | --- | --- |
| `page` | `oklch(0.985 0.001 286)` | canvas |
| `surface` | `oklch(1 0 0)` | cards, product window |
| `inset` | `oklch(0.967 0.002 264)` | chips, active nav row, toggle track |
| `ink` | `oklch(0.247 0.006 258)` | headings, primary text |
| `ink-2` | `oklch(0.44 0.01 264)` | body text |
| `ink-3` | `oklch(0.52 0.009 264)` | labels, captions (5.3:1 on `page`, don't go lighter) |
| `line`, `line-soft` | `oklch(0.912 0.005 258)`, `oklch(0.946 0.003 264)` | borders, table rules |
| `accent`, `accent-hover` | `oklch(0.535 0.187 255.6)`, `oklch(0.48 0.18 256)` | primary button, SQL keywords, data marks |
| `court`, `court-dot`, `court-ink` | `oklch(0.36 0.15 262)`, `oklch(0.46 0.16 261)`, `oklch(0.93 0.03 258)` | hero stage, its shot dots, its caption |

`accent` is darker than the app's `oklch(0.626 0.205 254.947)` because white text on the app's value fails 4.5:1.

## Where things came from

- **Dime app** (`mythiipanda/dime`): tokens from `frontend/app/globals.css`, the mark from `frontend/components/brand/DimeMark.tsx`, the Ask view layout that `components/product-window.tsx` recreates, and the copy facts from its README.
- **Data**: the `dime-data-20260930` warehouse. `lib/site.ts` holds the true-shooting rows, row counts and coverage windows. `lib/shots.ts` is generated: `silver_hist_shots` binned on a hex grid (size 9, in tenths of a foot, hoop at 0,0, half court only), stored as shots per 10,000 for 2009-10, 2025-26 and all seasons, plus three-point and midrange (two-pointers from 10 to 22 ft) share per season. The queries shown on the page are the ones that were run.
- **References, for structure only (no code copied)**: t3.codes for a hero that leads with the product and a small set of semantic tokens; harvey.ai for the left-aligned headline over a colored stage holding the product; devin.ai for a white canvas with real product UI in the hero.
- **Review rubric**: Jakub Krehel's `better-*` skills (jakub.kr/skills) for type, color, layout, writing and motion.
- **Icons**: Lucide, plus GitHub's mark.

## What is still rough

- The hero window is hand-built HTML, not a screenshot, and the two sentences above its table were written by hand. Replace it with a real capture once the live demo has a model configured (it showed "No models available" on 2026-11-19, which is also why the main button goes to GitHub).
- The shot dots behind the hero window mostly hide under it. On mobile only a strip shows.
- In the 2009-10 map the dots at the rim hit the size cap (`CAP` in `components/shot-map.tsx`), so the rim reads flatter than it is.
- The season switch animates the SVG `r` property in CSS. Checked in Chrome only.
- "Where it stops" is four text blocks and is the plainest section on the page.
- The coverage bars share one axis from 1976-77 because of RAPTOR, which squeezes the 2009-10 to 2025-26 rows into the right third.
- Light theme only. The app defaults to dark.
- The Open Graph image is a plain screenshot of the hero.
- The Data and Quickstart nav links are hidden under 640px with no replacement.
- Not tested in Safari or Firefox, or with a screen reader.
- The directory is still named `dime-variants` from an earlier experiment.
