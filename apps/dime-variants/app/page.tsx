import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import { DimeMark, GithubMark } from "@/components/mark";
import UiClip from "@/components/stage/UiClip";
import { README, REPO } from "@/lib/site";

const QUICKSTART = ["git clone https://github.com/mythiipanda/dime", "cd dime", "./scripts/fetch-data.sh"];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow m-0">{children}</p>;
}

function Head({ index, kicker, title, children }: { index: string; kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Kicker>{`${index} · ${kicker}`}</Kicker>
      <div className="flex max-w-[620px] flex-col gap-5">
        <h2 className="title">{title}</h2>
        {children && <p className="lede">{children}</p>}
      </div>
    </div>
  );
}

function Fig({ n, cap, children }: { n: string; cap: string; children: React.ReactNode }) {
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-3">
      {children}
      <figcaption className="figcap">{`fig. ${n} — ${cap}`}</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <a href="#platform" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-canvas">
        Skip to content
      </a>
      <header className="wrap flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-0 font-serif text-[30px] leading-none tracking-[-0.02em] text-ink">
          <DimeMark size={22} />
          ime
        </a>
        <nav className="flex items-center gap-7 text-[14.5px] font-medium text-ink-2" aria-label="Primary">
          <a href="#platform" className="hidden items-center transition-colors hover:text-ink sm:flex sm:h-11">Artifacts</a>
          <a href="#warehouse" className="hidden items-center transition-colors hover:text-ink sm:flex sm:h-11">Warehouse</a>
          <a href="#quickstart" className="hidden items-center transition-colors hover:text-ink sm:flex sm:h-11">Quickstart</a>
          <a href={REPO} className="flex h-11 items-center gap-2 text-ink transition-colors hover:text-accent">
            <GithubMark size={17} />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap relative overflow-x-clip pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative flex max-w-[860px] flex-col gap-5">
            <p className="eyebrow enter m-0">DIME · FRONT-OFFICE AGENT · LOCAL-FIRST</p>
            <h1 className="title enter max-w-[20ch]" style={{ "--i": 1 } as React.CSSProperties}>
              Ask anything about the NBA. Get the SQL, the rows, and the <em>decision.</em>
            </h1>
            <p className="lede enter max-w-[56ch]" style={{ "--i": 2 } as React.CSSProperties}>Dime writes the query, runs it on your disk — 58 warehouse tables, 14.9 million rows, 17 seasons — and shows every row it used.</p>
            <div className="enter" style={{ "--i": 3 } as React.CSSProperties}>
              <a href={REPO} className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium leading-none text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,background-color,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.96]">
                <GithubMark size={17} />
                Get Dime on GitHub
              </a>
            </div>
          </div>

          <div className="enter mt-8 md:mt-10" style={{ "--i": 4 } as React.CSSProperties}>
            <Fig n="00" cap="a trade check — apron math in the card, the silver_contracts rows under the claim">
              <div className="exhibit">
                <UiClip eager flat anchor="58%" className="max-md:h-auto" poster="/clips/hero-trade.jpg" label="A trade check in Dime: the ask, tool calls resolving salaries and apron rules, the answer citing silver_contracts, and the trade card marked legal" />
              </div>
            </Fig>
          </div>
        </section>

        <hr className="rule" />

        <section id="platform" className="wrap scroll-mt-8 py-16 md:py-24">
          <Head index="01" kicker="ARTIFACTS" title="Every answer shows its work">
            Boards, trade checks and notebooks. Every claim cites the rows it ran on.
          </Head>
          <div className="mt-10 flex flex-col gap-16 md:mt-16 md:gap-24">
            <div>
              <p className="eyebrow m-0">fig. 01</p>
              <h3 className="m-0 mt-2 font-serif text-[24px] leading-snug text-ink">Check a trade before you make it</h3>
              <p className="m-0 mt-2 max-w-[56ch] text-[14.5px] leading-relaxed text-ink-2">Salaries resolve against the apron, the rules pass, and the check pins to a board.</p>
              <div className="exhibit mt-5">
                <UiClip flat anchor="45%" poster="/clips/trade-detail.jpg" w={870} h={920} className="max-md:h-auto" label="Trade-check card: WAS receives, salaries resolved against the apron, cap hit 35.3% marked legal" />
              </div>
            </div>
            <div>
              <p className="eyebrow m-0">fig. 02</p>
              <h3 className="m-0 mt-2 font-serif text-[24px] leading-snug text-ink">Write the morning review</h3>
              <p className="m-0 mt-2 max-w-[56ch] text-[14.5px] leading-relaxed text-ink-2">Every number in the memo footnotes the warehouse rows it ran on.</p>
              <div className="exhibit mt-5">
                <UiClip flat anchor="45%" poster="/clips/memo-detail.jpg" w={870} h={985} className="max-md:h-auto" label="Midseason efficiency review document: every number carries a footnote to its warehouse rows, plus an exhibit table" />
              </div>
            </div>
            <div>
              <p className="eyebrow m-0">fig. 03</p>
              <h3 className="m-0 mt-2 font-serif text-[24px] leading-snug text-ink">See the work behind every claim</h3>
              <p className="m-0 mt-2 max-w-[56ch] text-[14.5px] leading-relaxed text-ink-2">Tool calls stay listed; each claim carries its DuckDB table chip and linked sources.</p>
              <div className="exhibit mt-5">
                <UiClip flat anchor="45%" poster="/clips/provenance-detail.jpg" w={1063} h={690} className="max-md:h-auto" label="An answer inline: tool calls listed, every claim carries a silver_hist_player_seasons source chip, and two sources are linked" />
              </div>
            </div>
            <div>
              <p className="eyebrow m-0">fig. 04</p>
              <h3 className="m-0 mt-2 font-serif text-[24px] leading-snug text-ink">Sort the board without leaving the thread</h3>
              <p className="m-0 mt-2 max-w-[56ch] text-[14.5px] leading-relaxed text-ink-2">Headshots, team and rate columns — the leaders board stays pinned beside the conversation.</p>
              <div className="exhibit mt-5">
                <UiClip flat anchor="45%" poster="/clips/board-detail.jpg" w={870} h={865} className="max-md:h-auto" label="True-shooting leaders board: player headshots, team, ts% and usage columns" />
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section id="warehouse" className="wrap scroll-mt-8 py-16 md:py-24">
          <Head index="02" kicker="WAREHOUSE" title="17 seasons in one file">
            58 tables, 14.9 million rows, on your disk. Shots, play-by-play, lineups, salaries and trades.
          </Head>
          <div className="mt-10 md:mt-14">
            <Fig n="05" cap="the warehouse browser · kind, rows, coverage, source">
              <div className="window window-light">
                <div className="flex h-11 items-center gap-2 border-b border-line px-4 text-[12.5px]">
                  <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-ink-3"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M9 9v11" /></svg>
                  <span className="min-w-0 truncate font-mono leading-none text-ink">warehouse.duckdb</span>
                  <span className="ml-auto shrink-0 whitespace-nowrap font-mono text-[12px] leading-none tabular-nums text-ink-3">58 tables<span className="hidden min-[420px]:inline"> · 14.9M rows</span></span>
                </div>
                <div className="light h-[300px] min-w-0 overflow-hidden md:h-[460px]">
                  <UiClip cover flat w={2240} h={922} poster="/clips/warehouse-poster.jpg" label="Dime's warehouse browser: scrolling the silver-layer tables with row counts and coverage" />
                </div>
              </div>
            </Fig>
          </div>
        </section>

        <hr className="rule" />

        <section id="quickstart" className="wrap grid scroll-mt-8 gap-10 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-24">
          <div className="flex flex-col items-start gap-5 md:justify-center">
            <Head index="03" kicker="QUICKSTART" title="Run it locally">
              Clone the repo, fetch the data pack and add your own model key.
            </Head>
            <a href={README} className="mt-2 inline-flex h-11 select-none items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium leading-none text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,background-color,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.96]">
              <GithubMark size={17} />
              Read the quickstart
            </a>
          </div>
          <div className="flex min-w-0 flex-col gap-3 md:justify-center">
            <div className="rounded-xl">
              <CodeBlock wide flat lines={[...QUICKSTART.map((l) => `$ ${l}`), "# 58 tables \u00b7 14.9M rows \u00b7 duckdb"]} code={QUICKSTART.join("\n")} filename="terminal" />
            </div>
            <p className="figcap">fig. 06 — three commands to a local warehouse</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-20">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-0 font-serif text-[30px] leading-none tracking-[-0.02em] text-ink">
              <DimeMark size={22} />
              ime
            </span>
            <p className="m-0 max-w-[40ch] text-[14.5px] leading-relaxed text-ink-2">
              An open-source NBA analyst that runs on your machine and shows every row it used.
            </p>
          </div>
          <nav className="flex flex-col gap-3 text-[14px] md:text-right" aria-label="Footer">
            <a href={REPO} className="text-ink-2 transition-colors hover:text-ink">GitHub · mythiipanda/dime</a>
            <a href={README} className="text-ink-2 transition-colors hover:text-ink">Quickstart</a>
            <a href={`${REPO}/blob/main/LICENSE`} className="text-ink-2 transition-colors hover:text-ink">MIT license</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
