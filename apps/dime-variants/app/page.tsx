import { DimeMark, GithubMark } from "@/components/mark";
import { ProductWindow } from "@/components/product-window";
import { Query, Sql } from "@/components/query";
import { ShotMap } from "@/components/shot-map";
import { ALL_BINS, HEX } from "@/lib/shots";
import { COUNTS, COVERAGE, README, REPO, SHARE_QUERY, TS_QUERY } from "@/lib/site";

const FIRST = 1977;
const LAST = 2026;
const span = LAST - FIRST + 1;

const LIMITS = [
  ["Coverage has edges.", "Shots, lineups and possessions start in 2009-10. Play-by-play runs 2020-21 through 2024-25. Ask outside those windows and the answer says so instead of guessing."],
  ["The warehouse is a data pack, not a live feed.", "The current pack is dated September 30, 2026. Some datasets can fall back to live sources, and that fallback can fail."],
  ["It can still be wrong.", "A model picks the tables and writes the query. That's why the query and the rows come back with the answer."],
  ["You bring the model.", "Chat runs on your own API keys for the provider you configure. The server boots without them, but it won't answer questions."],
];

export default function Home() {
  return (
    <>
      <header className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="flex h-11 items-center gap-2 text-[17px] font-semibold tracking-[-0.02em]" aria-label="Dime home">
          <DimeMark size={20} />Dime
        </a>
        <nav className="flex items-center gap-1 text-[15px]" aria-label="Primary">
          <a href="#warehouse" className="flex h-11 items-center rounded-[8px] px-3 text-ink-2 max-sm:hidden">Data</a>
          <a href="#run" className="flex h-11 items-center rounded-[8px] px-3 text-ink-2 max-sm:hidden">Quickstart</a>
          <a href={REPO} className="btn btn-quiet ml-2 px-3.5"><GithubMark size={16} />GitHub</a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap pt-12 md:pt-20">
          <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[1fr_400px]">
            <h1 className="display enter max-w-[13ch]">The NBA analyst that shows its work.</h1>
            <div className="enter lg:pb-2" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede">Ask a basketball question in plain English. Dime writes the SQL, runs it on its own warehouse, and gives you the answer with the rows it came from.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={REPO} className="btn btn-primary"><GithubMark />View on GitHub</a>
                <a href="#run" className="link inline-flex h-11 items-center text-[15px]">Read the quickstart</a>
              </div>
            </div>
          </div>

          <div className="enter relative mt-12 overflow-hidden rounded-[20px] bg-court md:mt-16" style={{ "--i": 2 } as React.CSSProperties}>
            <svg viewBox="-258 -26 516 400" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 size-full" aria-hidden="true">
              <g fill="var(--color-court-dot)">
                {ALL_BINS.map((bin) => (
                  <circle key={`${bin[0]}:${bin[1]}`} cx={bin[0]} cy={bin[1]} r={Math.max(0.8, HEX * 0.9 * Math.min(1, Math.sqrt(bin[2] / 70)))} />
                ))}
              </g>
            </svg>
            <div className="relative px-4 pb-5 pt-24 sm:px-10 sm:pb-6 md:px-16 md:pt-40">
              <div className="mx-auto max-w-[980px]">
                <ProductWindow />
                <p className="num mt-5 text-[13px] leading-[1.5] text-court-ink sm:mt-6">Behind the window: all 3,729,459 shots in the warehouse, sized by how often the league shoots from each spot.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap grid gap-x-16 gap-y-10 py-20 md:py-28 lg:grid-cols-[400px_1fr]">
          <div>
            <h2 className="title">Every number has a row behind it.</h2>
            <p className="body mt-5">Dime doesn't recall stats from memory. It queries a DuckDB warehouse and keeps the table, season and fetch date attached to each result, so you can check a figure before you repeat it.</p>
            <p className="body mt-4">The numbers in the window above are real rows from the warehouse. This is the query that returns them.</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-[12px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
            <div className="px-5 py-5"><Sql code={TS_QUERY} /></div>
            <dl className="num m-0 grid grid-cols-2 border-t border-line text-[14px] sm:grid-cols-4">
              {[
                ["Table", "silver_advanced"],
                ["Season", "2025-26"],
                ["Source", "nba_api"],
                ["Fetched", "Sep 9, 2026"],
              ].map(([term, value]) => (
                <div key={term} className="border-line px-5 py-3.5 max-sm:[&:nth-child(-n+2)]:border-b sm:[&:not(:first-child)]:border-l max-sm:[&:nth-child(even)]:border-l">
                  <dt className="text-[13px] text-ink-3">{term}</dt>
                  <dd className="m-0 mt-0.5 truncate font-mono text-[13px] text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="warehouse" className="rule scroll-mt-6">
          <div className="wrap grid gap-x-16 gap-y-12 py-20 md:py-28 lg:grid-cols-[400px_1fr]">
            <div>
              <h2 className="title">17 seasons of shots, possessions and lineups.</h2>
              <p className="body mt-5">The warehouse ships as one DuckDB file. The map shows where the league shot from in a single season. Switch years and watch the midrange empty out.</p>
              <dl className="m-0 mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
                {COUNTS.map((count) => (
                  <div key={count.label}>
                    <dt className="num text-[26px] font-semibold leading-none tracking-[-0.03em]">{count.n}</dt>
                    <dd className="small m-0 mt-2">{count.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="min-w-0">
              <ShotMap />
              <div className="mt-6"><Query code={SHARE_QUERY} source="silver_hist_shots, 3,729,459 rows" /></div>
            </div>
          </div>

          <div className="wrap pb-20 md:pb-28">
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">What's covered</h3>
            <div className="mt-6" role="list">
              {COVERAGE.map((row) => (
                <div key={row.name} role="listitem" className="grid items-center gap-x-8 gap-y-2 border-t border-line py-4 md:grid-cols-[280px_1fr_150px]">
                  <span className="text-[15px] font-medium">{row.name}</span>
                  <span className="relative h-2 rounded-full bg-inset" aria-hidden="true">
                    <span className="absolute inset-y-0 rounded-full bg-accent" style={{ left: `${((row.from - FIRST) / span) * 100}%`, width: `${((row.to - row.from + 1) / span) * 100}%` }} />
                  </span>
                  <span className="num text-[14px] text-ink-2 md:text-right">{row.label}</span>
                </div>
              ))}
              <div className="num grid border-t border-line pt-3 text-[13px] text-ink-3 md:grid-cols-[280px_1fr_150px] md:gap-x-8" aria-hidden="true">
                <span />
                <span className="flex justify-between max-md:hidden"><span>1976-77</span><span>2025-26</span></span>
              </div>
            </div>
          </div>
        </section>

        <section className="rule">
          <div className="wrap grid gap-x-16 gap-y-10 py-20 md:py-28 lg:grid-cols-[400px_1fr]">
            <div>
              <h2 className="title">Where it stops.</h2>
              <p className="body mt-5">Dime is useful because it is narrow. These are the edges you should know about before you trust it with a decision.</p>
            </div>
            <dl className="m-0 grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {LIMITS.map(([term, detail]) => (
                <div key={term}>
                  <dt className="text-[17px] font-semibold tracking-[-0.01em]">{term}</dt>
                  <dd className="body m-0 mt-2 text-[16px]">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="run" className="rule scroll-mt-6">
          <div className="wrap grid gap-x-16 gap-y-10 py-20 md:py-28 lg:grid-cols-[400px_1fr]">
            <div>
              <h2 className="title">Run it yourself.</h2>
              <p className="body mt-5">Dime is MIT licensed. Clone it, fetch the data pack and add your model keys. You need Node 22.19 or later and Python 3.12.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={REPO} className="btn btn-quiet"><GithubMark />View on GitHub</a>
                <a href={README} className="link inline-flex h-11 items-center text-[15px]">Full quickstart in the README</a>
              </div>
            </div>
            <div className="min-w-0 self-start rounded-[12px] bg-surface px-5 py-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <pre className="sql"><code>{"git clone https://github.com/mythiipanda/dime\ncd dime\n./scripts/fetch-data.sh"}</code></pre>
              <p className="mt-4 border-t border-line pt-4 text-[14px] text-ink-2">Then start the backend and frontend, open localhost:3000 and ask: <span className="text-ink">What are the Thunder's four factors this season?</span></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="rule">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-6 text-[14px] text-ink-2">
          <span className="flex items-center gap-2 font-medium text-ink"><DimeMark size={18} />Dime</span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>MIT licensed</span>
            <a href={REPO} className="link inline-flex h-11 items-center">GitHub</a>
            <a href="https://mythiipanda.github.io/" className="link inline-flex h-11 items-center">Built by Tony Lin</a>
          </span>
        </div>
      </footer>
    </>
  );
}
