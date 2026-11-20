import DimeHarness from "@/components/beautiful/DimeHarness";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import { Clutch, Lineups } from "@/components/exhibits/boards";
import { PlayerCard } from "@/components/exhibits/player-card";
import { GithubMark } from "@/components/mark";
import { ShotMap } from "@/components/shot-map";
import { CapsuleBars } from "@/components/ingot/capsule-bars";
import { HatchTrackList } from "@/components/ingot/hatch-track-list";
import { PillMeter } from "@/components/ingot/pill-meter";
import { THREE_SHARE } from "@/lib/shots";
import { COUNTS, COVERAGE, README, REPO, SHARE_QUERY } from "@/lib/site";

const STEPS = [
  { icon: "think", label: "Thinking", chip: "Shot value is in silver_hist_shots…", mono: false, detailMono: false, detail: [{ text: "One row per shot, with its court location." }, { text: "Share is threes over all shots, by season." }] },
  { icon: "write", label: "Write 7 lines", chip: "three_share.sql", mono: true, detailMono: true, detail: [{ text: "+ from silver_hist_shots", tone: "add" as const }, { text: "+ group by season", tone: "add" as const }] },
  { icon: "run", label: "Run on the warehouse", chip: "duckdb", mono: true, detailMono: true, detail: [{ text: "✓ 3,729,459 rows read" }, { text: "✓ 17 rows returned" }] },
  { icon: "read", label: "Check the rows", chip: "2025-26 · 41.4", mono: true, detailMono: false, detail: [{ text: "2009-10 was 22.3." }, { text: "Pack built Nov 19, 2026." }] },
];

const QUICKSTART = ["git clone https://github.com/mythiipanda/dime", "cd dime", "./scripts/fetch-data.sh"];

const LIMITS = [
  ["Coverage", "Shots run 2009-10 to 2025-26. Play-by-play stops at 2024-25."],
  ["Data pack", "Built Nov 19, 2026. It is a file, so it does not update during games."],
  ["Keys", "Chat runs on your own model provider keys."],
];

function Head({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex max-w-[560px] flex-col gap-5">
      <p className="eyebrow">{n}</p>
      <h2 className="title">{title}</h2>
      <p className="lede">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="wrap flex h-[72px] items-center justify-between">
        <a href="#top" className="font-serif text-[30px] leading-none tracking-[-0.02em] text-ink">
          dime<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-7 text-[14.5px] font-medium text-ink-2">
          <a href="#features" className="hidden transition-colors hover:text-ink sm:block">Features</a>
          <a href="#warehouse" className="hidden transition-colors hover:text-ink sm:block">Warehouse</a>
          <a href="#quickstart" className="hidden transition-colors hover:text-ink sm:block">Quickstart</a>
          <a href={REPO} className="flex items-center gap-2 text-ink transition-colors hover:text-accent">
            <GithubMark size={17} />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap pb-14 pt-8 md:pb-24 md:pt-16">
          <div className="flex max-w-[720px] flex-col gap-8">
            <h1 className="display enter max-w-[12ch]">
              The open-source <em>NBA analyst.</em>
            </h1>
            <div className="enter flex flex-col gap-6" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede">Ask a question in plain English. Dime runs it against 17 seasons of NBA data on your machine and shows you the query.</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={REPO} className="btn btn-primary">
                  <GithubMark size={17} />
                  Get Dime on GitHub
                </a>
                <a href="#quickstart" className="btn btn-ghost">Quickstart</a>
                <a href="#sources" className="hidden min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-ink-3 underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-ink sm:inline-flex">Read the SQL it ran ↓</a>
              </div>
            </div>
          </div>

          <div className="window window-hero window-light enter mt-10 md:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
            <DimeHarness />
          </div>
          <p className="label mt-4 text-center">the answers here are scripted; the rows are real.</p>

          <dl className="enter mt-10 grid grid-cols-2 border border-line md:mt-20 md:grid-cols-4" style={{ "--i": 3 } as React.CSSProperties}>
            {COUNTS.map((c, i) => (
              <div key={c.n} className={`flex flex-col border-line p-6 text-center md:p-8 ${["border-b border-r md:border-b-0", "border-b md:border-b-0 md:border-r", "border-r", ""][i]}`}>
                <dd className="order-1 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none tracking-[-0.02em] text-ink">{c.n}</dd>
                <dt className="label order-2 mt-3">{c.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        <hr className="rule" />

        <section id="features" className="wrap scroll-mt-8 py-12 md:py-20">
          <Head n="01" title="Player cards">Ask about a player and get the season on one card.</Head>
          <div className="mt-8 md:mt-14">
            <PlayerCard />
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap py-12 md:py-20">
          <Head n="02" title="Shot charts">Plot 3.7 million shots by court location, for the league or for one player.</Head>
          <div className="exhibit mt-8 p-4 md:mt-14 md:p-8">
            <ShotMap />
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap grid gap-14 py-12 md:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">03</p>
              <h2 className="title">Lineups</h2>
              <p className="lede max-w-none">Rank five-man units by net rating and see the minutes behind each one.</p>
            </div>
            <Lineups />
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">04</p>
              <h2 className="title">Clutch</h2>
              <p className="lede max-w-none">Find who scores in the last five minutes of close games.</p>
            </div>
            <Clutch />
          </div>
        </section>

        <hr className="rule" />

        <section id="sources" className="wrap scroll-mt-8 py-12 md:py-20">
          <Head n="05" title="Sources">Open any answer to read the SQL Dime ran and the rows it returned.</Head>
          <div className="mt-8 grid items-stretch gap-px overflow-hidden rounded-[2px] border border-line bg-line md:mt-14 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-7 bg-surface p-6 md:p-9">
              <p className="m-0 max-w-[85%] self-end rounded-[16px] rounded-br-[6px] bg-hover-2 px-4 py-2.5 text-[14.5px] text-ink">How has shot selection changed since 2009-10?</p>
              <ol className="m-0 list-none p-0 font-mono text-[12.5px] leading-[1.7]">
              {STEPS.map((row, i) => (
                <li key={row.label} className="border-b border-line py-2.5 first:pt-0 last:border-0">
                  <p className="m-0 flex items-baseline gap-3">
                    <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink">{row.label.toLowerCase()}</span>
                    <span className="truncate text-ink-3">{row.chip}</span>
                  </p>
                  <p className="m-0 mt-0.5 pl-7 text-[11.5px] text-ink-2">{row.detail.map((d) => d.text.replace(/^[+✓]\s*/, "")).join(" · ")}</p>
                </li>
              ))}
            </ol>
              <figure className="m-0 mt-auto border-t border-line pt-6">
                <CapsuleBars
                  data={THREE_SHARE.map(([, share]) => share)}
                  labels={THREE_SHARE.map(([season]) => `’${String(season).slice(2)}`)}
                  tipLabels={THREE_SHARE.map(([season]) => `${season - 1}–${String(season).slice(2)}`)}
                  color="#2b5ce6"
                  title="3PA share"
                  unit="%"
                />
              </figure>
            </div>
            <div className="flex min-w-0 flex-col bg-surface">
            <CodeBlock wide seam lines={SHARE_QUERY.split("\n")} code={SHARE_QUERY} filename="three_share.sql" />
            <div className="flex min-h-0 flex-1 flex-col border-t border-line">
              <p className="m-0 px-4 pb-1 pt-3 font-mono text-[11.5px] text-ink-3 md:px-5 md:pt-3.5">result · 17 rows</p>
              <div className="min-h-0 flex-1 overflow-auto px-1 pb-2 md:px-2 md:pb-3">
                <table className="w-full border-collapse font-mono text-[12px] tabular-nums">
                  <thead>
                    <tr>
                      <th className="records-header-cell sticky top-0 bg-surface pb-1 text-left align-bottom"><span className="records-header-button flex items-center font-normal text-ink-3">season</span></th>
                      <th className="records-header-cell sticky top-0 bg-surface pb-1 text-right align-bottom"><span className="records-header-button flex items-center justify-end font-normal text-ink-3">three_share</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {THREE_SHARE.map(([season, share], i) => (
                      <tr key={season} className={`records-row${i >= 6 ? " hidden md:table-row" : ""}${i === THREE_SHARE.length - 1 ? " is-selected" : ""}`}>
                        <td className="records-cell text-ink-2">{season - 1}–{String(season).slice(2)}</td>
                        <td className="records-cell text-right font-medium text-ink">{share.toFixed(1)}</td>
                      </tr>
                    ))}
                    <tr className="md:hidden">
                      <td colSpan={2} className="records-cell text-ink-3">+ {THREE_SHARE.length - 6} rows</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
        </section>

        <hr className="rule" />

        <section id="warehouse" className="wrap scroll-mt-8 py-12 md:py-20">
          <Head n="06" title="Warehouse">Query 58 tables and 14.9 million rows from one DuckDB file.</Head>
          <div className="window window-light mt-8 md:mt-14">
            <div className="flex h-11 items-center gap-2 px-4 text-[12.5px]">
              <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-ink-3"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M9 9v11" /></svg>
              <span className="truncate font-mono leading-none text-ink">warehouse.duckdb</span>
              <span className="ml-auto font-mono text-[12px] leading-none tabular-nums text-ink-3">58 tables · 14.9M rows</span>
            </div>
            <div className="light m-1.5 mt-0 flex h-[440px] min-w-0 flex-col overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <RecordsTable fill />
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">Coverage</p>
              <p className="lede max-w-none">Where the seasons start and stop for each kind of data.</p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-7 p-0">
              {COVERAGE.map((c) => (
                <li key={c.name} className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-[14.5px] font-medium text-ink">{c.name}</span>
                    <span className="num whitespace-nowrap text-[12.5px] text-ink-3">{c.label}</span>
                  </div>
                  <PillMeter
                    value={c.to - c.from + 1}
                    max={51}
                    pills={51}
                    offset={c.from - 1976}
                    color="#2b5ce6"
                    label={c.name}
                    hideHeader
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">Composition</p>
              <p className="lede max-w-none">What the 14.9 million rows are made of.</p>
            </div>
            <HatchTrackList
              color="#2b5ce6"
              rows={[
                { label: "Possessions", value: 30, meta: "4.5M" },
                { label: "Shots with court coordinates", value: 25, meta: "3.7M" },
                { label: "Play-by-play events", value: 22, meta: "3.2M" },
                { label: "Lineup rows", value: 5, meta: "753k" },
              ]}
            />
          </div>
        </section>

        <hr className="rule" />

        <section id="quickstart" className="wrap grid scroll-mt-8 gap-10 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-32">
          <div className="flex flex-col items-start gap-5">
            <p className="eyebrow">07</p>
            <h2 className="title">Run it locally</h2>
            <p className="lede">Clone the repo, fetch the data pack and add your own model key.</p>
            <a href={README} className="btn btn-primary">
              <GithubMark size={17} />
              Read the quickstart
            </a>
          </div>
          <div className="flex flex-col gap-10">
            <div className="dark rounded-md">
              <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables · 14.9M rows · duckdb"]} code={QUICKSTART.join("\n")} filename="terminal" />
            </div>
            <dl className="m-0">
              {LIMITS.map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[92px_1fr] gap-4 border-t border-line py-3.5 text-[14.5px]">
                  <dt className="label pt-[3px]">{term}</dt>
                  <dd className="m-0 text-ink-2">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-20">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-[30px] leading-none tracking-[-0.02em] text-ink">
              dime<span className="text-accent">.</span>
            </span>
            <p className="m-0 max-w-[40ch] text-[14.5px] leading-relaxed text-ink-2">
              An open-source NBA analyst that runs on your machine and shows every row it used.
            </p>
          </div>
          <nav className="flex flex-col gap-3 text-[14px] md:text-right" aria-label="Footer">
            <a href={REPO} className="text-ink-2 transition-colors hover:text-ink">GitHub — mythiipanda/dime</a>
            <a href={README} className="text-ink-2 transition-colors hover:text-ink">Quickstart</a>
            <a href={`${REPO}/blob/main/LICENSE`} className="text-ink-2 transition-colors hover:text-ink">MIT license</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
