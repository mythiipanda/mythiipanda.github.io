# UI review — dime landing hero window

The hero window is ready for the next rating round; no task-blocking defects found.

`Ready to ship: yes, with fixes (0 blocking, 2 should-fix, 3 notes).`

## Review record

- Scope: landing page `/dime-site/` hero chat window + page sections, local static build served from `out/dime-site` (playwright, chromium).
- Widths: 1440 and 390. Date: 2026-11-21. Criteria: `.agents/skills/ui-review/references/criteria.md`.
- Purpose (assumed): a landing page demonstrating the Dime product's chat → artifact loop.
- Probes: press feedback via Event Timing (`click`/`pointerdown` = 40 ms, under the 100 ms bar); keyboard Tab walk over rail, thread actions, cite links (all stops showed a solid visible outline); `prefers-reduced-motion: reduce` navigation rendered the full streamed answer immediately. Lint: no lint script exists in `apps/dime-variants` (package.json has dev/build only) — recorded as a gap, not a finding.
- Captures: `.ui-review/hero-now.png`, `i-pending.png`, `i-sent-trade.png`, `fp-mob.png`, `fp-desk.png`.

## Findings

### should-fix

1. **First thread bubble sits half-clipped under the pane top** (criterion 12/3, `hero-now.png`, 1440). "Who leads the league in true shooting?" is readable only in its bottom half at rest; it reads as scrolled-by-accident on first paint. Fix: give the thread a small top padding or start scroll position so the first message clears the pane edge by ≥8 px.
2. **Rail status labels ("Approval", "Working 4m") look like live state** (criterion 7, `hero-now.png`, both widths). They are static strings; clicking the chat resolves correctly but the badge stays "Working" even after the send loop resolves for a user's own message. Minor since the rail is a story fixture; worth either freezing the labels or making the badge match the resolved state.

### notes

3. **Cite chips open `#warehouse` in a new tab** (`target="_blank"` from the vendored SourceChip). Works, but a same-page anchor in a new tab may surprise; acceptable.
4. **Giannis headshot is a dark photo at 18 px** — legible but the dimmest circle in the column (criterion 11). Consider a brighter crop if a better asset exists; not a defect.
5. **`2 sources` disclosure and follow-up rows work but follow-ups only fill the composer** — honest, matches Notion-AI behavior; kept as designed.

## Edge cases

- Shown: empty (panel), error (panel retry), loading (skeleton), pending (Working), resolved (streamed answer + artifact), narrow (390), touch width, reduced motion, keyboard traversal.
- Not shown: offline, long real names beyond the longest fixture (Giannis Antetokounmpo renders truncated by design in tabs only — cell text is full width), throttled CPU (not measured).

## For a person to decide

- Whether rail status chips should be live (they are fixture data today).

## Dismissed / left out

- "Ask anything" placeholder styling (taste).
- New-tab behavior on cite chips kept (vendored component default).

Coverage: `/dime-site/` at 1440 and 390, light theme; probes — Event Timing (2 presses, 40 ms), Tab walk (14 stops, all visible rings), reduced-motion (instant render). Not covered: dark section variants on /variants, CPU throttling, screen reader.
