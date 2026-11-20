import DimeHarness from "@/components/beautiful/DimeHarness";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import ToolChips from "@/components/beautiful/primitives/ToolChips";
import { GithubMark } from "@/components/mark";
import { ShotMap } from "@/components/shot-map";
import { COUNTS, README, REPO, TS_QUERY } from "@/lib/site";

const STEPS = [
  { icon: "think", label: "Thinking", chip: "Salaries live in silver_salaries…", mono: false, detailMono: false, detail: [{ text: "One row per player, one column per season." }, { text: "Cap share is salary over the $165.5M cap." }] },
  { icon: "write", label: "Write 6 lines", chip: "query.sql", mono: true, detailMono: true, detail: [{ text: "+ from silver_salaries", tone: "add" as const }, { text: "+ order by SALARY_2026_27 desc limit 5", tone: "add" as const }] },
  { icon: "run", label: "Run on the warehouse", chip: "duckdb", mono: true, detailMono: true, detail: [{ text: "✓ 464 rows read" }, { text: "✓ 5 rows returned" }] },
  { icon: "read", label: "Check the rows", chip: "Stephen Curry · GSW · 59.6", mono: true, detailMono: false, detail: [{ text: "Source: bref_contracts, season 2026-27." }, { text: "Pack built Nov 19, 2026." }] },
];

const SQL_LINES = TS_QUERY.split("\n").map((line) => line.replace(/^ {7}/, "  ").replace(/ {2,}as /, " as "));

const QUICKSTART = ["git clone https://github.com/mythiipanda/dime", "cd dime", "./scripts/fetch-data.sh"];

const LIMITS = [
  ["Coverage", "Shots and possessions run 2009-10 to 2025-26. Play-by-play stops at 2024-25."],
  ["Data pack", "Built Nov 19, 2026. A file, not a live feed."],
  ["Fallible", "A model writes the query, so the rows ship with the answer."],
  ["Keys", "Chat runs on your own provider API keys."],
];

export default function Home() {
  return (
    <>
      <header className="wrap flex h-[72px] items-center justify-between">
        <a href="#top" className="font-serif text-[30px] leading-none tracking-[-0.02em] text-ink">
          dime<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-7 text-[14.5px] font-medium text-ink-2">
          <a href="#warehouse" className="hidden transition-colors hover:text-ink sm:block">Warehouse</a>
          <a href="#quickstart" className="hidden transition-colors hover:text-ink sm:block">Quickstart</a>
          <a href={REPO} className="flex items-center gap-2 text-ink transition-colors hover:text-accent">
            <GithubMark size={17} />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap pb-24 pt-10 md:pb-36 md:pt-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <h1 className="display enter max-w-[11ch]">
              The NBA analyst that <em>shows its work.</em>
            </h1>
            <div className="enter flex flex-col gap-6 md:pb-3" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede">Ask in plain English. Dime writes the SQL, runs it on its own warehouse, and hands back the rows.</p>
              <div className="flex items-center gap-6">
                <a href={REPO} className="btn btn-primary">
                  <GithubMark size={17} />
                  Get Dime
                </a>
                <a href="#quickstart" className="link">Quickstart</a>
              </div>
            </div>
          </div>

          <div className="window window-hero enter mt-12 md:mt-16" style={{ "--i": 2 } as React.CSSProperties}>
            <DimeHarness />
          </div>
          <p className="label mt-4 text-center">Try it. Answers here are scripted; the rows are from the Nov 19, 2026 pack.</p>
        </section>

        <hr className="rule" />

        <section className="wrap grid gap-12 py-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-36">
          <div className="flex flex-col gap-5">
            <h2 className="title max-w-[12ch]">
              Every number has <em>a receipt.</em>
            </h2>
            <p className="lede">The steps it took, the query it ran, the table it read.</p>
          </div>
          <div className="exhibit grid gap-8 p-6 md:p-8 ">
            <ToolChips steps={STEPS} diffs={[]} labels={{ header: "4 steps, 5 rows", more: "" }} />
            <CodeBlock wide lines={SQL_LINES} code={TS_QUERY} filename="query.sql" />
          </div>
        </section>

        <hr className="rule" />

        <section id="warehouse" className="wrap scroll-mt-8 py-24 md:py-36">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="title max-w-[14ch]">
              Its own warehouse, <em>not the open web.</em>
            </h2>
            <p className="lede">12.2 million rows of shots, possessions, play-by-play and lineups. One file on your machine.</p>
          </div>
          <div className="exhibit mt-12 flex h-[468px] flex-col md:mt-16">
            <RecordsTable fill />
          </div>

          <div className="mt-20 grid items-center gap-12 md:mt-28 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-20">
            <div className="exhibit p-5 md:p-7">
              <ShotMap />
            </div>
            <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-1 md:gap-y-8">
              {COUNTS.map((c) => (
                <div key={c.label}>
                  <dd className="num m-0 font-serif text-[clamp(34px,4vw,54px)] leading-none tracking-[-0.02em] text-ink">{c.n}</dd>
                  <dt className="mt-2 text-[14.5px] text-ink-2">{c.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <hr className="rule" />

        <section id="quickstart" className="wrap grid scroll-mt-8 gap-12 py-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-36">
          <div className="flex flex-col items-start gap-6">
            <h2 className="title max-w-[10ch]">
              Three lines, <em>then ask.</em>
            </h2>
            <p className="lede">Open source. Runs on your machine.</p>
            <a href={README} className="btn btn-primary">
              <GithubMark size={17} />
              Read the quickstart
            </a>
          </div>
          <div className="flex flex-col gap-10">
            <CodeBlock wide lines={QUICKSTART} code={QUICKSTART.join("\n")} filename="terminal" />
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
        <div className="wrap flex h-20 items-center justify-between text-[14px] text-ink-3">
          <span className="font-serif text-[22px] leading-none text-ink">
            dime<span className="text-accent">.</span>
          </span>
          <a href={REPO} className="transition-colors hover:text-ink">github.com/mythiipanda/dime</a>
        </div>
      </footer>
    </>
  );
}
