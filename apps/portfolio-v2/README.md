# Portfolio

Tony Lin's portfolio. Astro 5, static output, no client framework.

## Structure

```
astro.config.mjs        base path from BASE_PATH (empty = domain root)
src/
  content.ts            all copy, carried over verbatim from the original site
  lib/url.ts            prefixes public/ paths with the deploy base
  layouts/Layout.astro  head, font, global stylesheet, client script
  pages/index.astro     page: composes the components below
  components/           Header, Victini, Intro, Experience, Projects, Contact
  scripts/v2.ts         client behavior (thumbnail follow, Victini, copy email)
  styles/v2.css         design tokens (:root) and all styles
public/                 logos, thumbs, victini art, resume pdf, favicon
```

## Run

```
npm install
npm run dev
BASE_PATH=/portfolio-v2 npm run build   # preview subpath build -> dist/
npm run build                           # production (domain root)
```

No design notes or agent files belong in this repo.
