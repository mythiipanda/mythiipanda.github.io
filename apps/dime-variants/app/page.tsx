import DimeHarness from "@/components/beautiful/DimeHarness";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import { GithubMark } from "@/components/mark";
import { PillMeter } from "@/components/ingot/pill-meter";
import { BoardsStill, NotebookStill, ReportStill, ScoutStill, TradesStill } from "@/components/stage/stills";
import { COUNTS, COVERAGE, README, REPO } from "@/lib/site";

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
          <a href="#features" className="hidden transition-colors hover:text-ink sm:block">Surfaces</a>
          <a href="#warehouse" className="hidden transition-colors hover:text-ink sm:block">Warehouse</a>
          <a href="#quickstart" className="hidden transition-colors hover:text-ink sm:block">Quickstart</a>
          <a href={REPO} className="flex items-center gap-2 text-ink transition-colors hover:text-accent">
            <GithubMark size={17} />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap relative pb-14 pt-10 md:pb-24 md:pt-[72px]">
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-[780px] flex-col items-center gap-8 text-center">
            <h1 className="display enter max-w-[14ch]">
              The open-source <em>NBA analyst.</em>
            </h1>
            <div className="enter flex flex-col items-center gap-6" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede mx-auto">Ask a question in plain English. Dime runs it against 17 seasons of NBA data on your machine and shows you the query.</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a href={REPO} className="btn btn-primary">
                  <GithubMark size={17} />
                  Get Dime on GitHub
                </a>
                <a href="#quickstart" className="btn btn-ghost">Quickstart</a>
                <a href="#features" className="hidden min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-ink-3 underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-ink sm:inline-flex">See the workspace ↓</a>
              </div>
            </div>
          </div>

          <div className="window window-hero window-light enter mt-10 md:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
            <DimeHarness autoplay="shots" />
          </div>
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
          <Head n="01" title="Notebooks">Every answer lands in a notebook: the question, the SQL it ran, the rows, and the chart. Analysis you can reopen, extend, and share.</Head>
          <div className="window window-light mt-8 md:mt-14">
            <div className="light m-1.5 mt-0 h-[620px] min-w-0 overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <NotebookStill />
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap py-12 md:py-20">
          <Head n="02" title="Boards">Pin any artifact to a board and Dime keeps it a live dashboard. Net ratings, clutch tables, coverage — one place to stand and watch.</Head>
          <div className="window window-light mt-8 md:mt-14">
            <div className="light m-1.5 mt-0 h-[460px] min-w-0 overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <BoardsStill />
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap py-12 md:py-20">
          <Head n="03" title="Scouting">Ranked boards over the real table, with faces. Filter to a pool, sort on a metric, drag two names into the tray to compare.</Head>
          <div className="window window-light mt-8 md:mt-14">
            <div className="light m-1.5 mt-0 h-[480px] min-w-0 overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <ScoutStill />
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap py-12 md:py-20">
          <Head n="04" title="Trade room">Build a deal and Dime keeps the cap math live — outgoing, incoming, match percentage, apron status.</Head>
          <div className="window window-light mt-8 md:mt-14">
            <div className="light m-1.5 mt-0 h-[460px] min-w-0 overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <TradesStill />
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section className="wrap py-12 md:py-20">
          <Head n="05" title="Reports">Turn a notebook into a memo with the numbers cited to their tables. Export when it's ready for the room.</Head>
          <div className="window window-light mt-8 md:mt-14">
            <div className="light m-1.5 mt-0 h-[520px] min-w-0 overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <ReportStill />
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
              <span className="ml-auto shrink-0 whitespace-nowrap font-mono text-[12px] leading-none tabular-nums text-ink-3">58 tables · 14.9M rows</span>
            </div>
            <div className="light m-1.5 mt-0 flex h-[440px] min-w-0 flex-col overflow-hidden rounded-[2px] md:m-2 md:mt-0">
              <RecordsTable fill />
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">Coverage</p>
              <p className="lede max-w-none">Where each kind of data starts and stops.</p>
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
        </section>

        <hr className="rule" />

        <section id="quickstart" className="wrap grid scroll-mt-8 gap-10 py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-20">
          <div className="flex flex-col items-start gap-5 md:justify-center">
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
