# Dime landing page

Served at https://mythiipanda.github.io/dime-site/. Next.js static export, built by `.github/workflows/deploy.yml` with `BASE_PATH=/dime-site` and copied into the Astro site's `dist/dime-site`.

```sh
npm ci
npm run dev                          # http://localhost:3000
BASE_PATH=/dime-site npm run build   # writes out/, serve it under /dime-site/ to check paths
```

## Design system

The page is built from [Beautiful UI](https://github.com/slev12397/beautiful-ui) (MIT), vendored rather than installed:

- `app/beautiful.css` is its foundation stylesheet (tokens, Tailwind v4 theme, primitive styles, reduced-motion fallbacks), with the fonts remapped.
- `components/beautiful/primitives/` holds the primitives the page uses: `PromptBar`, `SidebarNav`, `ThinkingState`, `ToolChips`, `CodeBlock`, `RecordsTable`, `LoadingState`, `GlideMenu`. `icons.tsx` swaps the paid icon set for lucide.
- `components/beautiful/DimeHarness.tsx` is Beautiful UI's harness mockup with Dime scenarios. It is the hero, and it is interactive: five scripted questions, one autoplays.
- `components/exhibits/` holds the feature exhibits that are not Beautiful UI primitives: the player card and the lineup and clutch boards. They show what the product does with real rows; none of them is the product's own component.
- `app/globals.css` is the landing layer: warm light tokens for the page, the serif display type, buttons, the window frame. The harness opts into the dark tokens with a scoped `.dark` class.

Type is Instrument Serif for display, Instrument Sans for everything else, Martian Mono for code. Each section is named after a feature, has one sentence, and shows that feature as a mock interface. Section copy follows the pattern on Linear, Resend and Supabase: a feature name, then one sentence that starts with a verb.

## Where things came from

- Every fact on the page was read from the Nov 19, 2026 data pack (sha256 `3787644e…`): the salary query in `lib/site.ts` and its five rows, shot bins in `lib/shots.ts`, the eleven table row counts in `RecordsTable.tsx`, and the player card, lineup and clutch rows in `lib/exhibits.ts` (from `silver_player_season`, `silver_advanced`, `silver_hist_player_seasons`, `silver_hist_shots`, `silver_hist_lineups` and `silver_clutch`).
- The salary demo reads `silver_contracts`. The earlier `silver_salaries` query named a `SALARY_2026_27` column that the pack does not have.
- Answers in the harness are scripted, and the page says so under the window.

## What is still rough

- The harness sidebar and side pane hide below 1024px, so phones see the chat only.
- Menus that portal to `body` (workspace switcher, column config) render with the light tokens.
- The column config popover in `RecordsTable` is Beautiful UI's, lightly renamed.
- The vendored primitives keep Beautiful UI's sample content as prop defaults. The page always passes its own, so none of it renders.
- The composer's attach and dictation buttons are canned, as in the upstream mockup.
- No Safari, Firefox or screen-reader pass yet.
