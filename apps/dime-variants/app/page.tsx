import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import { GithubMark } from "@/components/mark";
import { PillMeter } from "@/components/ingot/pill-meter";
import { ChatWindow, ArtifactPanel } from "@/components/stage/chat-window";
import { COUNTS, COVERAGE, README, REPO } from "@/lib/site";

const QUICKSTART = ["git clone https://github.com/mythiipanda/dime", "cd dime", "./scripts/fetch-data.sh"];

const LIMITS = [
  ["Coverage", "Shots run 2009-10 to 2025-26. Play-by-play stops at 2024-25."],
  ["Data pack", "Built Nov 19, 2026. It is a file, so it does not update during games."],
  ["Keys", "Chat runs on your own model provider keys."],
];


function Head({ n, title, children }: { n: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex max-w-[560px] flex-col gap-5">
      <p className="eyebrow">{n}</p>
      <h2 className="title">{title}</h2>
      {children && <p className="lede">{children}</p>}
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
          <a href="#platform" className="hidden transition-colors hover:text-ink sm:block">Platform</a>
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
              <p className="lede mx-auto">A front-office workspace on your machine. Ask in plain English; Dime writes the SQL, runs it on 17 seasons of data, and keeps the work.</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a href={REPO} className="btn btn-primary">
                  <GithubMark size={17} />
                  Get Dime on GitHub
                </a>
                <a href="#quickstart" className="btn btn-ghost">Quickstart</a>
              </div>
            </div>
          </div>

          <div className="window window-hero window-light enter mt-10 md:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="light m-1.5 mt-0 h-[500px] min-w-0 overflow-hidden rounded-[2px] md:m-2 md:mt-0 md:h-[620px]">
              <ChatWindow state="split" artifact="board" />
            </div>
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

        <section id="platform" className="wrap scroll-mt-8 py-12 md:py-20">
          <Head n="01" title="Artifacts, not answers" />
          <div className="mt-8 grid gap-4 md:mt-14 md:grid-cols-3">
            {(["board", "trade", "report"] as const).map((k) => (
              <div key={k} className="h-[320px] overflow-hidden">
                <ArtifactPanel kind={k} framed />
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" />

        <section id="warehouse" className="wrap scroll-mt-8 py-12 md:py-20">
          <Head n="02" title="Warehouse">Query 58 tables and 14.9 million rows from one DuckDB file.</Head>
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
            <p className="eyebrow">03</p>
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
