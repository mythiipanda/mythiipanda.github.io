import DimeHarness from "@/components/beautiful/DimeHarness";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import ToolChips from "@/components/beautiful/primitives/ToolChips";
import { Clutch, Lineups } from "@/components/exhibits/boards";
import { PlayerCard } from "@/components/exhibits/player-card";
import { GithubMark } from "@/components/mark";
import { ShotMap } from "@/components/shot-map";
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

function Fig({ n, children }: { n: string; children: React.ReactNode }) {
  return <figcaption className="label mt-4 text-center">fig. {n} — {children}</figcaption>;
}

function Head({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
      <div className="flex flex-col gap-5">
        <p className="eyebrow">{n}</p>
        <h2 className="title">{title}</h2>
      </div>
      <p className="lede md:self-end md:justify-self-end">{children}</p>
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
        <section className="wrap pb-20 pt-10 md:pb-24 md:pt-16">
          <div className="flex max-w-[720px] flex-col gap-8">
            <h1 className="display enter max-w-[12ch]">
              The open-source <em>NBA analyst.</em>
            </h1>
            <div className="enter flex flex-col gap-6" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede">Ask a question in plain English. Dime runs it against 17 seasons of NBA data on your machine and shows you the query.</p>
              <div className="flex items-center gap-6">
                <a href={REPO} className="btn btn-primary">
                  <GithubMark size={17} />
                  Get Dime on GitHub
                </a>
                <a href="#quickstart" className="btn btn-ghost">Quickstart</a>
              </div>
            </div>
          </div>

          <div className="window window-hero enter mt-12 md:mt-16" style={{ "--i": 2 } as React.CSSProperties}>
            <DimeHarness />
          </div>
          <p className="label mt-4 text-center">fig. 0 — the answers on this page are scripted; the rows come from the Nov 19, 2026 data pack.</p>

          <dl className="enter mt-14 grid grid-cols-2 border border-line md:mt-20 md:grid-cols-4" style={{ "--i": 3 } as React.CSSProperties}>
            {COUNTS.map((c, i) => (
              <div key={c.n} className={`flex flex-col border-line p-6 text-center md:p-8 ${["border-b border-r md:border-b-0", "border-b md:border-b-0 md:border-r", "border-r", ""][i]}`}>
                <dd className="order-1 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none tracking-[-0.02em] text-ink">{c.n}</dd>
                <dt className="label order-2 mt-3">{c.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        <hr className="rule" />

        <section id="features" className="wrap scroll-mt-8 py-20 md:py-24">
          <Head n="01" title="Player cards">Ask about a player and get the season on one card.</Head>
          <div className="mt-10 md:mt-14">
            <PlayerCard />
          </div>
          <Fig n="1">player card from silver_player_season · silver_advanced · silver_hist_player_seasons.</Fig>
        </section>

        <hr className="rule" />

        <section className="wrap py-20 md:py-24">
          <Head n="02" title="Shot charts">Plot 3.7 million shots by court location, for the league or for one player.</Head>
          <div className="exhibit mx-auto mt-10 max-w-[880px] p-5 md:mt-14 md:p-8">
            <ShotMap />
          </div>
          <Fig n="2">shot density from silver_hist_shots, binned by court location.</Fig>
        </section>

        <hr className="rule" />

        <section className="wrap grid gap-20 py-20 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">03</p>
              <h2 className="title">Lineups</h2>
              <p className="lede max-w-none">Rank five-man units by net rating and see the minutes behind each one.</p>
            </div>
            <Lineups />
            <Fig n="3">five-man units from silver_hist_lineups.</Fig>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">04</p>
              <h2 className="title">Clutch</h2>
              <p className="lede max-w-none">Find who scores in the last five minutes of close games.</p>
            </div>
            <Clutch />
            <Fig n="4">clutch scoring from silver_clutch.</Fig>
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap py-20 md:py-24">
          <Head n="05" title="Sources">Open any answer to read the SQL Dime ran and the rows it returned.</Head>
          <div className="mt-10 grid items-stretch gap-px overflow-hidden rounded-[2px] border border-line bg-line md:mt-14 lg:grid-cols-2">
            <div className="flex flex-col gap-7 bg-surface p-6 md:p-9">
              <p className="m-0 max-w-[85%] self-end rounded-[16px] rounded-br-[6px] bg-hover-2 px-4 py-2.5 text-[14.5px] text-ink">How has shot selection changed since 2009-10?</p>
              <ToolChips steps={STEPS} diffs={[]} labels={{ header: "4 steps, 17 rows", more: "" }} />
              <figure className="m-0 mt-auto">
                <ol className="m-0 flex h-24 list-none items-end gap-1 p-0" aria-hidden>
                  {THREE_SHARE.map(([season, share]) => (
                    <li key={season} className={`flex-1 rounded-t-[3px] ${season === 2026 ? "bg-accent" : "bg-line-strong"}`} style={{ height: `${(share / 41.4) * 100}%` }} />
                  ))}
                </ol>
                <figcaption className="num mt-3 flex justify-between text-[13px] text-ink-2">
                  <span><span className="font-medium text-ink">22.3%</span> threes in 2009-10</span>
                  <span><span className="font-medium text-ink">41.4%</span> in 2025-26</span>
                </figcaption>
              </figure>
            </div>
            <CodeBlock wide seam lines={SHARE_QUERY.split("\n")} code={SHARE_QUERY} filename="three_share.sql" />
          </div>
          <Fig n="5">the tool trace and the SQL behind the answer, from silver_hist_shots.</Fig>
        </section>

        <hr className="rule" />

        <section id="warehouse" className="wrap scroll-mt-8 py-20 md:py-24">
          <Head n="06" title="Warehouse">Query 58 tables and 14.9 million rows from one DuckDB file.</Head>
          <div className="exhibit mt-10 flex h-[468px] flex-col md:mt-14">
            <RecordsTable fill />
          </div>
          <Fig n="6">table list and row counts from the Nov 19, 2026 pack.</Fig>
          <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">Coverage</p>
              <p className="lede max-w-none">Where the seasons start and stop for each kind of data.</p>
            </div>
            <ul className="m-0 flex list-none flex-col border border-line p-0">
              {COVERAGE.map((c) => (
                <li key={c.name} className="grid grid-cols-1 items-baseline gap-4 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_112px] md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[14.5px] font-medium text-ink">{c.name}</span>
                      <span className="num whitespace-nowrap text-[12.5px] text-ink-3">{c.from}–{c.to}</span>
                    </div>
                    <div className="relative h-[3px] w-full bg-line-soft">
                      <div
                        className="absolute inset-y-0 bg-ink"
                        style={{ left: `${((c.from - 1976) / 51) * 100}%`, right: `${((2026 - c.to) / 51) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="label hidden justify-self-end text-right md:block">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Fig n="7">season coverage by data kind, 1976-77 through 2026-27.</Fig>
        </section>

        <hr className="rule" />

        <section id="quickstart" className="wrap grid scroll-mt-8 gap-12 py-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-32">
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
              <CodeBlock wide flat lines={QUICKSTART} code={QUICKSTART.join("\n")} filename="terminal" />
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
        <div className="border-t border-line">
          <div className="wrap flex h-14 flex-wrap items-center justify-between gap-2 text-[12.5px] text-ink-3">
            <span className="label">Data pack — Nov 19, 2026</span>
            <span className="label">Open source · bring your own model key</span>
          </div>
        </div>
      </footer>
    </>
  );
}
