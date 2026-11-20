import DimeHarness from "@/components/beautiful/DimeHarness";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import ToolChips from "@/components/beautiful/primitives/ToolChips";
import { GithubMark } from "@/components/mark";
import { ShotMap } from "@/components/shot-map";
import { README, REPO, SHARE_QUERY } from "@/lib/site";

const STEPS = [
  { icon: "think", label: "Thinking", chip: "Shot value is in silver_hist_shots…", mono: false, detailMono: false, detail: [{ text: "One row per shot, with its court location." }, { text: "Share is threes over all shots, by season." }] },
  { icon: "write", label: "Write 6 lines", chip: "three_share.sql", mono: true, detailMono: true, detail: [{ text: "+ from silver_hist_shots", tone: "add" as const }, { text: "+ group by season", tone: "add" as const }] },
  { icon: "run", label: "Run on the warehouse", chip: "duckdb", mono: true, detailMono: true, detail: [{ text: "✓ 3,729,459 rows read" }, { text: "✓ 17 rows returned" }] },
  { icon: "read", label: "Check the rows", chip: "2025-26 · 41.4", mono: true, detailMono: false, detail: [{ text: "2009-10 was 22.3." }, { text: "Pack built Nov 19, 2026." }] },
];

const QUICKSTART = ["git clone https://github.com/mythiipanda/dime", "cd dime", "./scripts/fetch-data.sh"];

const LIMITS = [
  ["Coverage", "Shots run 2009-10 to 2025-26. Play-by-play stops at 2024-25."],
  ["Data pack", "Built Nov 19, 2026. A file, not a live feed."],
  ["Keys", "Chat runs on your own provider keys."],
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

        <section className="wrap py-24 md:py-36">
          <h2 className="title">Every number has a receipt.</h2>
          <div className="mt-12 grid items-start gap-10 md:mt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <p className="lede max-w-none">How has shot selection changed since 2009-10?</p>
              <ToolChips steps={STEPS} diffs={[]} labels={{ header: "4 steps, 17 rows", more: "" }} />
              <CodeBlock wide lines={SHARE_QUERY.split("\n")} code={SHARE_QUERY} filename="three_share.sql" />
            </div>
            <div className="exhibit p-5 md:p-7">
              <ShotMap />
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section id="warehouse" className="wrap scroll-mt-8 py-24 md:py-36">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="title">58 tables, one file.</h2>
            <p className="label md:pb-2">14,943,543 rows · DuckDB · built Nov 19, 2026</p>
          </div>
          <div className="exhibit mt-10 flex h-[468px] flex-col md:mt-14">
            <RecordsTable fill />
          </div>
        </section>

        <hr className="rule" />

        <section id="quickstart" className="wrap grid scroll-mt-8 gap-12 py-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-36">
          <div className="flex flex-col items-start gap-6">
            <h2 className="title max-w-[10ch]">Three lines, then ask.</h2>
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
