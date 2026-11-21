import type { ReactNode } from "react";
import { BarChart3, Database, FileText, MessageSquare, MoveRight, SquareTerminal } from "@/components/icons";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import { GithubMark } from "@/components/mark";
import { PillMeter } from "@/components/ingot/pill-meter";
import { PlatformWindow } from "@/components/stage/platform-window";
import { ChatWindow } from "@/components/stage/chat-window";
import { Bars, MiniTable, PANES, Ring, Spark } from "@/components/stage/stills";
import { COUNTS, COVERAGE, README, REPO } from "@/lib/site";

const QUICKSTART = ["git clone https://github.com/mythiipanda/dime", "cd dime", "./scripts/fetch-data.sh"];

function MiniStill({ pane, h = 260, scale = 0.5 }: { pane: number; h?: number; scale?: number }) {
  return (
    <div className="pointer-events-none relative overflow-hidden bg-canvas" style={{ height: h }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: 1180, transform: `scale(${scale})` }}>
        <div className="flex h-[560px] flex-col p-5">{PANES[pane].body}</div>
      </div>
    </div>
  );
}

function Tile({ className = "", title, children }: { className?: string; title?: string; children: ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-[14px] bg-surface shadow-[0_0_0_1px_var(--line)] ${className}`}>
      {title && <div className="flex h-10 items-center border-b border-line px-4 text-[13px] font-medium text-ink">{title}</div>}
      <div className="p-4">{children}</div>
    </div>
  );
}

function LayoutHead({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <div className="flex max-w-[620px] flex-col gap-4">
      <p className="eyebrow">{kicker}</p>
      <h2 className="title">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

const LEAD = "A front-office workspace on your machine. Ask in plain English; Dime writes the SQL, runs it on 17 seasons of data, and keeps the work.";

function CTAs() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={REPO} className="btn btn-primary">
        <GithubMark size={17} />
        Get Dime on GitHub
      </a>
      <a href="#quickstart" className="btn btn-ghost">Quickstart</a>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="h-[560px] min-w-0 overflow-hidden">{children}</div>;
}

function Variant({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section className="relative border-b border-line">
      <span className="pointer-events-none absolute right-4 top-4 z-20 font-mono text-[11px] tracking-widest text-ink-3">{id}</span>
      {children}
    </section>
  );
}

export default function Variants() {
  return (
    <main>
      {/* A — float: window as a soft card on the paper ground, airy hero */}
      <Variant id="A">
        <div className="wrap pb-20 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
          <div className="mx-auto mt-14 max-w-[1120px] rounded-[18px] bg-canvas shadow-[0_1px_2px_rgba(20,20,25,0.06),0_12px_40px_-12px_rgba(20,20,25,0.22),0_0_0_1px_var(--line)]">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* B — theater: full-width dark letterbox band carries the window */}
      <Variant id="B">
        <div className="wrap pb-14 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
        </div>
        <div className="bg-[#101014] px-4 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_-20px_rgba(0,0,0,0.7)]">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* C — compact editorial: tighter type, left-aligned, window closer to copy */}
      <Variant id="C">
        <div className="wrap pb-16 pt-14 md:pt-20">
          <div className="flex max-w-[860px] flex-col items-start gap-6">
            <h1 className="display enter max-w-[16ch] text-[clamp(2.6rem,5vw,4rem)]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede max-w-[46ch]">{LEAD}</p>
            <CTAs />
          </div>
          <div className="window window-light mt-10">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* D — plate + satellite: tinted plate behind the window, one card straddling the edge */}
      <Variant id="D">
        <div className="wrap pb-20 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
          <div className="relative mx-auto mt-14 max-w-[1120px]">
            <div className="absolute inset-x-8 -bottom-6 top-10 rounded-[24px] bg-accent-tint/70" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line),0_20px_60px_-24px_rgba(20,20,25,0.28)]">
              <Shell><PlatformWindow /></Shell>
            </div>
            <div className="absolute -left-3 bottom-14 hidden w-[220px] rounded-[12px] bg-surface p-3.5 shadow-[0_0_0_1px_var(--line),0_10px_30px_-8px_rgba(20,20,25,0.25)] md:block">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-3">
                <span>midseason-review</span><span className="text-accent-ink">exported</span>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-5 text-ink-2">Kennard leads at 68.9% TS; Jokić the workload outlier at 28.9% usage.</p>
            </div>
          </div>
        </div>
      </Variant>

      {/* E — rail: pane switcher as a left rail of names, top bar keeps only actions */}
      <Variant id="E">
        <div className="wrap pb-20 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
          <div className="window window-light mt-14">
            <Shell><PlatformWindow variant="rail" /></Shell>
          </div>
        </div>
      </Variant>

      {/* F — split: headline left, window right, linear-style two-column hero */}
      <Variant id="F">
        <div className="wrap grid items-center gap-12 pb-20 pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:pt-24">
          <div className="flex flex-col items-start gap-6">
            <h1 className="display enter text-[clamp(2.6rem,4.6vw,4.2rem)]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede">{LEAD}</p>
            <CTAs />
          </div>
          <div className="overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line),0_20px_60px_-24px_rgba(20,20,25,0.3)]">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* ============ below-hero layout shotgun L1-L6 ============ */}

      {/* L1 — bento: asymmetric tile board, stills + stats + terminal, minimal copy */}
      <Variant id="L1">
        <div className="wrap py-16 md:py-24">
          <LayoutHead kicker="the workspace" title="Every question leaves an artifact" />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
            <Tile className="col-span-2 md:col-span-3" title="Scouting">
              <MiniTable
                head={["player", "team", "ts%", "usg%"]}
                rows={[
                  ["L. Kennard", "LAL", "68.9", "13.1"],
                  ["J. Duren", "DET", "68.8", "23.1"],
                  ["N. Jokić", "DEN", "67.0", "28.9"],
                ]}
              />
            </Tile>
            <Tile className="md:col-span-3" title="Lineups">
              <Bars max={28} rows={[["Bridges +4 · CHA", 26.4], ["McCollum +4 · ATL", 20.3], ["Brown +4 · BOS", 17.9]]} />
            </Tile>
            <Tile className="md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="num text-[30px] font-medium tabular-nums text-ink">14.9M</div>
                  <div className="mt-1 text-[12.5px] text-ink-2">rows in one DuckDB file</div>
                </div>
                <Ring pct={82} size={52} />
              </div>
            </Tile>
            <Tile className="md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="num text-[30px] font-medium tabular-nums text-ink">+26.4</div>
                  <div className="mt-1 text-[12.5px] text-ink-2">best five-man net rating</div>
                </div>
                <Spark points={[9.2, 12.4, 15.8, 14.1, 19.6, 22.3, 26.4]} w={90} h={40} />
              </div>
            </Tile>
            <Tile className="md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="num text-[30px] font-medium tabular-nums text-ink">58</div>
                  <div className="mt-1 text-[12.5px] text-ink-2">warehouse tables</div>
                </div>
                <Ring pct={58} size={52} />
              </div>
            </Tile>
            <div className="col-span-2 overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line)] md:col-span-3">
              <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables · 14.9M rows"]} code={QUICKSTART.join("\n")} filename="quickstart" />
            </div>
            <Tile className="col-span-2 md:col-span-3" title="Coverage">
              <ul className="flex list-none flex-col gap-4 p-0">
                {COVERAGE.slice(0, 2).map((c) => (
                  <li key={c.name} className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12.5px] font-medium text-ink">{c.name}</span>
                      <span className="num text-[11.5px] text-ink-3">{c.label}</span>
                    </div>
                    <PillMeter value={c.to - c.from + 1} max={51} pills={51} offset={c.from - 1976} color="#2b5ce6" label={c.name} hideHeader />
                  </li>
                ))}
              </ul>
            </Tile>
          </div>
        </div>
      </Variant>

      {/* L2 — flow: pipeline diagram ask→sql→warehouse→artifacts→report, then two cards */}
      <Variant id="L2">
        <div className="wrap py-16 md:py-24">
          <LayoutHead kicker="how it works" title="A question becomes a memo" />
          <div className="mt-12 flex flex-wrap items-stretch justify-center gap-3">
            {[
              [MessageSquare, "ask", "plain English"],
              [SquareTerminal, "sql", "Dime writes it"],
              [Database, "warehouse", "58 tables"],
              [BarChart3, "artifacts", "charts + tables"],
              [FileText, "report", "cited memo"],
            ].map(([Icon, name, hint], i, arr) => (
              <div key={name as string} className="flex items-center gap-3">
                <div className="flex w-[150px] flex-col items-center gap-1.5 rounded-[14px] bg-surface px-4 py-5 text-center shadow-[0_0_0_1px_var(--line)]">
                  <Icon size={20} className="text-accent-ink" />
                  <span className="font-mono text-[12.5px] font-medium text-ink">{name as string}</span>
                  <span className="text-[11.5px] text-ink-3">{hint as string}</span>
                </div>
                {i < arr.length - 1 && <MoveRight size={16} className="shrink-0 text-ink-3" />}
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            <div className="window window-light">
              <div className="flex h-10 items-center px-4 font-mono text-[12px] text-ink-2">warehouse.duckdb</div>
              <div className="light m-1.5 mt-0 h-[300px] overflow-hidden rounded-[2px]">
                <RecordsTable fill />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-[14px] shadow-[0_0_0_1px_var(--line)]">
                <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# runs on your machine"]} code={QUICKSTART.join("\n")} filename="quickstart" />
              </div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-line">
                {COUNTS.slice(0, 2).map((c) => (
                  <div key={c.n} className="bg-canvas p-5">
                    <dd className="font-serif text-[26px] text-ink">{c.n}</dd>
                    <dt className="label mt-1">{c.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Variant>

      {/* L3 — gallery: three still crops with mono captions, stats hairline, terminal */}
      <Variant id="L3">
        <div className="wrap py-16 md:py-24">
          <LayoutHead kicker="the platform" title="One workspace, five surfaces" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { pane: 0, cap: "notebooks — ask, sql, chart, note" },
              { pane: 2, cap: "scouting — ranked boards with faces" },
              { pane: 3, cap: "trades — live cap math" },
            ].map((s) => (
              <figure key={s.cap} className="m-0">
                <div className="overflow-hidden rounded-[12px] shadow-[0_0_0_1px_var(--line),0_14px_40px_-16px_rgba(20,20,25,0.2)]">
                  <MiniStill pane={s.pane} h={250} scale={0.44} />
                </div>
                <figcaption className="mt-3 font-mono text-[11.5px] text-ink-3">{s.cap}</figcaption>
              </figure>
            ))}
          </div>
          <dl className="mt-14 grid grid-cols-2 border border-line md:grid-cols-4">
            {COUNTS.map((c) => (
              <div key={c.n} className="flex flex-col border-r border-line p-5 last:border-r-0">
                <dd className="font-serif text-[24px] text-ink">{c.n}</dd>
                <dt className="label mt-1.5">{c.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mx-auto mt-14 max-w-[640px] overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line)]">
            <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables · 14.9M rows"]} code={QUICKSTART.join("\n")} filename="quickstart" />
          </div>
        </div>
      </Variant>

      {/* L4 — data band: warehouse is the visual hero, coverage meters, slim quickstart */}
      <Variant id="L4">
        <div className="wrap py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <LayoutHead kicker="the warehouse" title="58 tables. 14.9 million rows." lede="One DuckDB file on your machine — 17 seasons of shots, salaries, lineups and play-by-play." />
            <a href={README} className="btn btn-ghost">Schema docs</a>
          </div>
          <div className="window window-light mt-12">
            <div className="flex h-11 items-center gap-2 px-4 text-[12.5px]">
              <Database size={14} className="shrink-0 text-ink-3" />
              <span className="truncate font-mono leading-none text-ink">warehouse.duckdb</span>
              <span className="ml-auto shrink-0 font-mono text-[12px] leading-none tabular-nums text-ink-3">58 tables · 14.9M rows</span>
            </div>
            <div className="light m-1.5 mt-0 h-[360px] overflow-hidden rounded-[2px]">
              <RecordsTable fill />
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {COVERAGE.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13.5px] font-medium text-ink">{c.name}</span>
                  <span className="num text-[12px] text-ink-3">{c.label}</span>
                </div>
                <PillMeter value={c.to - c.from + 1} max={51} pills={51} offset={c.from - 1976} color="#2b5ce6" label={c.name} hideHeader />
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center gap-5">
            <p className="lede">Clone, fetch, ask.</p>
            <div className="w-full max-w-[640px] overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line)]">
              <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# runs on your machine"]} code={QUICKSTART.join("\n")} filename="terminal" />
            </div>
          </div>
        </div>
      </Variant>

      {/* L5 — showcase: sticky headline rail left, stacked stills right */}
      <Variant id="L5">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-24">
          <div className="flex flex-col items-start gap-5 self-start md:sticky md:top-10">
            <p className="eyebrow">the platform</p>
            <h2 className="title">Work that stays on disk</h2>
            <p className="lede max-w-[38ch]">Notebooks hold the question and the SQL. Boards pin the charts. Reports cite every number back to its table.</p>
            <CTAs />
          </div>
          <div className="flex flex-col gap-6">
            {[
              { pane: 1, cap: "boards — pinned artifacts" },
              { pane: 3, cap: "trades — live cap math" },
              { pane: 4, cap: "reports — cited memos" },
            ].map((s) => (
              <figure key={s.cap} className="m-0">
                <div className="overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line),0_18px_50px_-20px_rgba(20,20,25,0.25)]">
                  <MiniStill pane={s.pane} h={280} scale={0.52} />
                </div>
                <figcaption className="mt-3 font-mono text-[11.5px] text-ink-3">{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Variant>

      {/* L6 — stealth: stats hairline + one centered terminal, almost no text */}
      <Variant id="L6">
        <div className="wrap py-16 md:py-24">
          <dl className="grid grid-cols-2 border border-line md:grid-cols-4">
            {COUNTS.map((c) => (
              <div key={c.n} className="flex flex-col border-r border-line p-6 text-center last:border-r-0">
                <dd className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-ink">{c.n}</dd>
                <dt className="label mt-3">{c.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mx-auto mt-16 flex max-w-[680px] flex-col items-center gap-6">
            <p className="lede text-center">Clone the repo, fetch the data pack, add a model key.</p>
            <div className="w-full overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line)]">
              <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables · 14.9M rows · duckdb"]} code={QUICKSTART.join("\n")} filename="terminal" />
            </div>
            <a href={REPO} className="btn btn-primary">
              <GithubMark size={17} />
              Get Dime on GitHub
            </a>
          </div>
        </div>
      </Variant>

      {/* T1 — linear.app type system: Inter, 64px display, -0.022em tracking, 510 weight */}
      <Variant id="T1">
        <div className="ty-linear">
          <div className="wrap pb-24 pt-20 md:pt-28">
            <div className="mx-auto flex max-w-[760px] flex-col items-center gap-8 text-center">
              <h1 className="display enter max-w-[16ch]">The open-source NBA analyst.</h1>
              <p className="lede mx-auto max-w-[52ch]">{LEAD}</p>
              <CTAs />
            </div>
            <div className="mx-auto mt-16 max-w-[1120px] rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line),0_8px_32px_-12px_rgba(20,20,25,0.18)]">
              <Shell><PlatformWindow /></Shell>
            </div>
          </div>
        </div>
      </Variant>

      {/* T2 — notion.com type system: Inter, 96px display, -0.048em tracking, 600 weight */}
      <Variant id="T2">
        <div className="ty-notion">
          <div className="wrap pb-24 pt-16 md:pt-24">
            <div className="mx-auto flex max-w-[860px] flex-col items-center gap-9 text-center">
              <h1 className="display enter max-w-[15ch]">The open-source NBA analyst.</h1>
              <p className="lede mx-auto max-w-[54ch]">{LEAD}</p>
              <CTAs />
            </div>
            <div className="mx-auto mt-14 max-w-[1120px] rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--line)]">
              <Shell><PlatformWindow /></Shell>
            </div>
          </div>
        </div>
      </Variant>

      {/* T3 — cursor.com type system: grotesk display + garamond lede, left-aligned */}
      <Variant id="T3">
        <div className="ty-cursor">
          <div className="wrap pb-20 pt-14 md:pt-20">
            <div className="flex max-w-[680px] flex-col items-start gap-7">
              <h1 className="display enter max-w-[18ch]">The open-source NBA analyst.</h1>
              <p className="lede max-w-[48ch]">{LEAD}</p>
              <CTAs />
            </div>
            <div className="window window-light mt-12">
              <Shell><PlatformWindow /></Shell>
            </div>
          </div>
        </div>
      </Variant>

      {/* T4 — harvey.ai type system: serif display 72px, airy spacing, minimal frame */}
      <Variant id="T4">
        <div className="ty-harvey">
          <div className="wrap pb-32 pt-24 md:pt-36">
            <div className="mx-auto flex max-w-[780px] flex-col items-center gap-10 text-center">
              <h1 className="display enter max-w-[16ch]">The open-source NBA analyst.</h1>
              <p className="lede mx-auto max-w-[54ch]">{LEAD}</p>
              <CTAs />
            </div>
            <div className="mx-auto mt-20 max-w-[1120px] overflow-hidden rounded-[8px] bg-canvas shadow-[0_0_0_1px_var(--line)]">
              <Shell><PlatformWindow /></Shell>
            </div>
          </div>
        </div>
      </Variant>

      {/* S1 — converged: original serif+cobalt, metrics lifted from dub/supabase/cal */}
      <Variant id="S1">
        <div className="ty-s1">
          <div className="wrap section-pad">
            <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
              <h1 className="display enter max-w-[15ch]">The open-source <em>NBA analyst.</em></h1>
              <p className="lede mx-auto max-w-[46ch]">{LEAD}</p>
              <CTAs />
            </div>
            <div className="mx-auto mt-14 max-w-[1120px] rounded-[16px] bg-canvas shadow-[0_1px_2px_rgba(20,20,25,0.05),0_16px_48px_-16px_rgba(20,20,25,0.2),0_0_0_1px_var(--line)]">
              <Shell><PlatformWindow /></Shell>
            </div>
          </div>
          <div className="wrap section-pad border-t border-line">
            <div className="flex flex-col gap-12">
              <LayoutHead kicker="the workspace" title="Every question leaves an artifact" />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
                <Tile className="col-span-2 md:col-span-3" title="Scouting">
                  <MiniTable
                    head={["player", "team", "ts%", "usg%"]}
                    rows={[
                      ["L. Kennard", "LAL", "68.9", "13.1"],
                      ["J. Duren", "DET", "68.8", "23.1"],
                      ["N. Jokić", "DEN", "67.0", "28.9"],
                    ]}
                  />
                </Tile>
                <Tile className="md:col-span-3" title="Lineups">
                  <Bars max={28} rows={[["Bridges +4 · CHA", 26.4], ["McCollum +4 · ATL", 20.3], ["Brown +4 · BOS", 17.9]]} />
                </Tile>
                <Tile className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="num text-[30px] font-medium tabular-nums text-ink">14.9M</div>
                      <div className="mt-1 text-[12.5px] text-ink-2">rows in one DuckDB file</div>
                    </div>
                    <Ring pct={82} size={52} />
                  </div>
                </Tile>
                <Tile className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="num text-[30px] font-medium tabular-nums text-ink">+26.4</div>
                      <div className="mt-1 text-[12.5px] text-ink-2">best five-man net rating</div>
                    </div>
                    <Spark points={[9.2, 12.4, 15.8, 14.1, 19.6, 22.3, 26.4]} w={90} h={40} />
                  </div>
                </Tile>
                <Tile className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="num text-[30px] font-medium tabular-nums text-ink">58</div>
                      <div className="mt-1 text-[12.5px] text-ink-2">warehouse tables</div>
                    </div>
                    <Ring pct={58} size={52} />
                  </div>
                </Tile>
                <div className="col-span-2 overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line)] md:col-span-3">
                  <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables · 14.9M rows"]} code={QUICKSTART.join("\n")} filename="quickstart" />
                </div>
                <Tile className="col-span-2 md:col-span-3" title="Coverage">
                  <ul className="flex list-none flex-col gap-4 p-0">
                    {COVERAGE.slice(0, 2).map((c) => (
                      <li key={c.name} className="flex flex-col gap-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[12.5px] font-medium text-ink">{c.name}</span>
                          <span className="num text-[11.5px] text-ink-3">{c.label}</span>
                        </div>
                        <PillMeter value={c.to - c.from + 1} max={51} pills={51} offset={c.from - 1976} color="#2b5ce6" label={c.name} hideHeader />
                      </li>
                    ))}
                  </ul>
                </Tile>
              </div>
            </div>
          </div>
          <div className="wrap section-pad border-t border-line">
            <dl className="grid grid-cols-2 border border-line md:grid-cols-4">
              {COUNTS.map((c) => (
                <div key={c.n} className="flex flex-col border-r border-line p-6 text-center last:border-r-0">
                  <dd className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-ink">{c.n}</dd>
                  <dt className="label mt-3">{c.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mx-auto mt-14 flex max-w-[680px] flex-col items-center gap-6">
              <p className="lede text-center">Clone the repo, fetch the data pack, add a model key.</p>
              <div className="w-full overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line)]">
                <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables · 14.9M rows · duckdb"]} code={QUICKSTART.join("\n")} filename="terminal" />
              </div>
              <a href={REPO} className="btn btn-primary">
                <GithubMark size={17} />
                Get Dime on GitHub
              </a>
            </div>
          </div>
        </div>
      </Variant>

      {/* ============ chat-first IA shotgun ============ */}

      {/* CH-A — Notion-home: centered ask canvas, prompt chips, provenance strip */}
      <Variant id="CH-A">
        <div className="wrap section-pad">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[15ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto max-w-[46ch]">{LEAD}</p>
            <CTAs />
          </div>
          <div className="mx-auto mt-14 max-w-[1120px] rounded-[16px] bg-canvas shadow-[0_1px_2px_rgba(20,20,25,0.05),0_16px_48px_-16px_rgba(20,20,25,0.2),0_0_0_1px_var(--line)]">
            <Shell><ChatWindow state="home" /></Shell>
          </div>
        </div>
      </Variant>

      {/* CH-B — Harvey split: thread lane left, artifact panel right (lead) */}
      <Variant id="CH-B">
        <div className="wrap section-pad">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[15ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto max-w-[46ch]">{LEAD}</p>
            <CTAs />
          </div>
          <div className="mx-auto mt-14 max-w-[1120px] rounded-[16px] bg-canvas shadow-[0_1px_2px_rgba(20,20,25,0.05),0_16px_48px_-16px_rgba(20,20,25,0.2),0_0_0_1px_var(--line)]">
            <Shell><ChatWindow state="split" /></Shell>
          </div>
        </div>
      </Variant>

      {/* CH-C — mid-flight: question sent, tools running, panel loading */}
      <Variant id="CH-C">
        <div className="wrap section-pad">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[15ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto max-w-[46ch]">{LEAD}</p>
            <CTAs />
          </div>
          <div className="mx-auto mt-14 max-w-[1120px] rounded-[16px] bg-canvas shadow-[0_1px_2px_rgba(20,20,25,0.05),0_16px_48px_-16px_rgba(20,20,25,0.2),0_0_0_1px_var(--line)]">
            <Shell><ChatWindow state="pending" /></Shell>
          </div>
        </div>
      </Variant>
    </main>
  );
}
