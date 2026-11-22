import { DimeMark, GithubMark } from "@/components/mark";
import UiClip from "@/components/stage/UiClip";
import { README, REPO } from "@/lib/site";
import "./home.css";

export default function Home() {
  return (
    <div className="hx-landing">
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-canvas">
        Skip to content
      </a>
      <header className="wrap flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-0 font-serif text-[30px] leading-none tracking-[-0.02em] text-ink">
          <DimeMark size={22} />
          ime
        </a>
        <nav className="flex items-center gap-7 text-[14.5px] font-medium text-ink-2" aria-label="Primary">
          <a href={REPO} className="flex h-11 items-center gap-2 text-ink transition-colors hover:text-accent">
            <GithubMark size={17} />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap relative overflow-x-clip pb-16 pt-12 md:pb-28 md:pt-[72px]">
          <div className="relative mx-auto flex max-w-[780px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">
              The open-source <em>NBA analyst.</em>
            </h1>
            <div className="enter flex flex-col items-center gap-5" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede mx-auto">A front-office workspace on your machine. Ask in plain English; Dime writes the SQL, runs it on 17 seasons of data, and keeps the answers.</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a href={REPO} className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium leading-none text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,background-color,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.96]">
                  <GithubMark size={17} />
                  Get Dime on GitHub
                </a>
                <a href={README} className="inline-flex h-11 select-none items-center justify-center rounded-full bg-surface px-5 text-[15px] font-medium leading-none text-ink shadow-btn transition-[transform,background-color,opacity] duration-150 ease-out hover:bg-inset active:scale-[0.96]">Quickstart</a>
              </div>
            </div>
          </div>
          <div className="enter hero-still mt-9 md:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
            <UiClip eager anchor="58%" poster="/dime-site/clips/hero-poster.webp" label="Dime answering a true-shooting question: tool calls, streamed answer with sources, and the leaders board" />
          </div>
        </section>

        <section id="work" className="wrap flex scroll-mt-8 flex-col gap-5 pb-14 pt-10 md:gap-6 md:pb-24 md:pt-14">
          <div className="fcard grid items-center gap-8 p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] md:gap-12 md:p-10">
            <div className="flex flex-col gap-4">
              <h2 className="title">Grade the trade</h2>
              <p className="lede">Salaries resolve and the apron rules check out before the deal goes up for approval.</p>
            </div>
            <UiClip anchor="45%" poster="/dime-site/clips/trade-poster.webp" label="Dime running a trade check: salary resolution, apron rules, then pinning the approved check to a board" />
          </div>

          <div className="fcard grid items-center gap-8 p-7 md:grid-cols-[minmax(0,8fr)_minmax(0,5fr)] md:gap-12 md:p-10">
            <UiClip cover poster="/dime-site/clips/lineup-poster.webp" label="Dime's lineup study board: five-man net ratings, clutch scoring and the qualified-lineup pool" />
            <div className="order-first flex flex-col gap-4 md:order-none">
              <h2 className="title">Judge the lineups</h2>
              <p className="lede">Net rating for every qualified five-man unit, clutch scoring included.</p>
            </div>
          </div>

          <div className="fcard grid items-center gap-8 p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] md:gap-12 md:p-10">
            <div className="flex flex-col gap-4">
              <h2 className="title">Scout the class</h2>
              <p className="lede">The 2027 board with college production for every prospect and fit targets for one team's gaps.</p>
            </div>
            <UiClip cover poster="/dime-site/clips/draft-poster.webp" label="Dime's draft workspace: the 2027 prospect board with college stats and Memphis fit targets" />
          </div>
        </section>

        <section className="cta">
          <div className="wrap flex flex-col items-center gap-7 py-20 text-center md:py-28">
            <h2 className="display max-w-[16ch]">Coming <em>soon.</em></h2>
            <a href={REPO} className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium leading-none text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] transition-[transform,background-color] duration-150 ease-out hover:bg-white/10 active:scale-[0.96]">
              <GithubMark size={17} />
              mythiipanda/dime
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-8 text-[13px] text-ink-3">
          <span className="flex items-center gap-0 font-serif text-[22px] leading-none tracking-[-0.02em] text-ink">
            <DimeMark size={17} />
            ime
          </span>
          <nav className="flex items-center gap-6" aria-label="Project">
            <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
            <a href={README} className="transition-colors hover:text-ink">Quickstart</a>
            <a href={`${REPO}/blob/main/LICENSE`} className="transition-colors hover:text-ink">MIT license</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
