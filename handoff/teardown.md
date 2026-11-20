# Landing teardown — what strong pages actually do

Studied: t3.codes, harvey.ai, devin.ai, doop.design, cal.com, dub.co, plane.so, posthog.com, supabase.com (plus the OSS repos where the code is public: pingdotgg/t3code marketing app). Cross-checked against the local skills: jakub.kr `better-*` set (interface, typography, layout, colors, motion, writing, `interface-review`, `variant`, `explain-interface`) and `unslop` (pstack).

## The grammar every good page shares

1. **One display headline, under ~8 words.** "Design with AI agents." "Build a Frontier Legal Organization." "The open-source control plane for coding agents." One lede line max, and it states the mechanism, not a promise.
2. **The hero is the product.** Doop's hero is the canvas mid-design. t3's hero is the app. Nobody uses stock illustration; the artifact does the selling. (Our animated stageshow window is the right instinct — keep it.)
3. **Sections = short title + one line + exhibit.** Harvey/devin/t3 never run two paragraphs. Deviating to "explaining" reads as filler immediately.
4. **A texture that is theirs alone.** t3's tweet wall, doop's live canvas, our shot-dot field. One motif, carried consistently.
5. **Type is one grotesque + one mono.** Serif only as an accent word inside the display headline. Numbers in tabular figures, mono for labels/code/provenance.
6. **CTA discipline:** one primary button + one text link. Every extra button dilutes.
7. **Trust through mechanism, not adjectives.** Dates, table names, row counts, "fetch a DuckDB file" — devin.ai's "Tests end to end on its own computer" pattern: a verifiable claim, not a vibe.
8. **Rhythm over ornament.** Hairline rules, consistent section padding, no cards-in-cards. Supabase/PostHog win on spacing discipline, not decoration.

## Where our page still reads as slop

- Any sentence that could sit on another project's page ("powered by AI", "seamless experience") dies by unslop rule 27 — say the mechanism or the number.
- Feature sections that "explain" instead of "show" — replaced by real exhibits (the player_card, the SQL, the shot map, the receipts strip).
- Even spacing without a motif — fixed by carrying the court-dot field into sections.
- Stale facts are instant slop signals — every number on the page now traces to the HF dataset card dated Nov 19, 2026.

## The one missing move

Every reference page has a social-proof or receipts block (t3's tweet wall, harvey's "3,500+ orgs", cal's logos). Ours has no human voice at all — the honest analog for a data tool is a **receipts strip**: real question → real answer → table/season/source, the same way t3 shows real tweets. That becomes the personality section between the warehouse and the limits.
