import { DimeMark, GithubMark } from "@/components/mark";
import UiClip from "@/components/stage/UiClip";
import { README, REPO } from "@/lib/site";
import "./home.css";

const STEPS = [
  {
    n: "01",
    title: "Ask in plain English",
    body: "\u201cTrue shooting since the break, starters only\u201d is a complete brief. No query language, no dashboard hunting.",
  },
  {
    n: "02",
    title: "Dime writes the SQL",
    body: "It picks the tools, writes the query, and runs it on the warehouse on your machine \u2014 grain and season declared.",
  },
  {
    n: "03",
    title: "The answer cites its evidence",
    body: "Every number lands next to the table it came from, pinned to a board you can audit.",
  },
];

const FAQS = [
  {
    q: "What does Dime cost?",
    a: "Nothing. Dime is free and open source under the MIT license. You run it with your own model provider keys \u2014 free tiers work \u2014 and there is no account and no subscription.",
  },
  {
    q: "Where does my data live?",
    a: "On your machine. The warehouse downloads once at install and every query runs locally against it. Your questions and answers never leave your setup unless you choose a cloud model provider for chat.",
  },
  {
    q: "How much data is in it?",
    a: "Seventeen seasons and counting: 3.7 million charted shots, 4.5 million possessions, full play-by-play, lineup rows, and draft history back to 1997.",
  },
  {
    q: "What can I ask it?",
    a: "Front-office questions in plain English: grade a trade against the apron rules, rank qualified five-man lineups, scout a draft class, audit a team\u2019s shot diet \u2014 the same questions a front office asks its analysts.",
  },
  {
    q: "How do I know the numbers are right?",
    a: "Every answer cites the exact tables it ran, so you can check any figure against the source. The project also ships DAB v1, a benchmark suite that scores answer quality on every change to the codebase.",
  },
  {
    q: "How do I install it?",
    a: "Clone the repo and follow the quickstart: Node 22.19+ and Python 3.12, one download for the warehouse, and the host boots even before you add model keys.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

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
              The open<span className="hyph">-</span>source <em>NBA analyst.</em>
            </h1>
            <div className="enter flex flex-col items-center gap-5" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="lede mx-auto">A front-office workspace on your machine. Ask in plain English; Dime writes the SQL, runs it on decades of NBA data, and cites every table.</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a href={REPO} className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium leading-none text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,background-color,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.96]">
                  <GithubMark size={17} />
                  Get Dime on GitHub
                </a>
                <a href={README} className="inline-flex h-11 select-none items-center justify-center rounded-full bg-surface px-5 text-[15px] font-medium leading-none text-ink shadow-btn transition-[transform,background-color,opacity] duration-150 ease-out hover:bg-inset active:scale-[0.96]">Quickstart</a>
              </div>
              <p className="hero-proof font-mono text-[12.5px] uppercase tracking-[0.14em]">
                3.7M charted shots &middot; 4.5M possessions &middot; 17 seasons
              </p>
            </div>
          </div>
          <div className="enter hero-still mt-9 md:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
            <UiClip eager anchor="58%" className="max-md:h-auto" poster="/clips/hero-poster.webp" w={3600} h={2040} label="Dime answering a true-shooting question: tool calls, streamed answer with sources, and the leaders board" />
          </div>
        </section>

        <section aria-label="How it works" className="wrap grid gap-10 pb-4 pt-16 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] md:gap-16 md:pt-24">
          <div>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-ink-3">How it works</p>
            <h2 className="title mt-4 max-w-[14ch]">Three steps, no dashboard.</h2>
          </div>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 border-t border-[var(--line)] pt-5">
                <span className="font-mono text-[12.5px] tracking-[0.14em] text-ink-3">{s.n}</span>
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="text-[15.5px] leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="mx-auto flex w-full max-w-[1680px] scroll-mt-8 flex-col gap-8 px-3 pb-16 pt-12 md:gap-12 md:px-5 md:pb-28 md:pt-20">
          <div className="fcard grid md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)]">
            <div className="flex flex-col justify-center gap-6 p-8 md:p-16 lg:p-20">
              <h2 className="title">Grade the trade</h2>
              <p className="lede">Salaries resolve and the apron rules check out before the deal goes up for approval.</p>
            </div>
            <UiClip className="m-5 self-center max-md:h-auto md:m-10 lg:m-14" w={3207} h={1680} poster="/clips/trade-poster.webp" label="Dime running a trade check: salary resolution, apron rules, then pinning the approved check to a board" />
          </div>

          <div className="fcard grid md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)]">
            <UiClip className="m-5 self-center max-md:h-auto md:m-10 lg:m-14" w={3207} h={1680} poster="/clips/lineup-poster.webp" label="Dime's lineup study board: five-man net ratings, clutch scoring and the qualified-lineup pool" />
            <div className="order-first flex flex-col justify-center gap-6 p-8 pb-0 md:order-none md:p-16 lg:p-20">
              <h2 className="title">Judge the lineups</h2>
              <p className="lede">Net rating for every qualified five-man unit, clutch scoring included.</p>
            </div>
          </div>

          <div className="fcard grid md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)]">
            <div className="flex flex-col justify-center gap-6 p-8 md:p-16 lg:p-20">
              <h2 className="title">Scout the class</h2>
              <p className="lede">The 2027 board with college production for every prospect and fit targets for Memphis's gaps.</p>
            </div>
            <UiClip className="m-5 self-center max-md:h-auto md:m-10 lg:m-14" w={3207} h={1680} poster="/clips/draft-poster.webp" label="Dime's draft workspace: the 2027 prospect board with college stats and Memphis fit targets" />
          </div>
        </section>

        <section aria-label="Frequently asked questions" className="wrap grid gap-10 pb-20 pt-4 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] md:gap-16 md:pb-28">
          <div>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-ink-3">FAQ</p>
            <h2 className="title mt-4 max-w-[14ch]">Questions, answered.</h2>
          </div>
          <dl className="grid gap-x-10 gap-y-9 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} className="flex flex-col gap-2.5 border-t border-[var(--line)] pt-5">
                <dt className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{f.q}</dt>
                <dd className="text-[15px] leading-relaxed text-ink-2">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cta">
          <div className="wrap flex flex-col items-center gap-7 py-14 text-center md:py-20">
            <h2 className="display max-w-[16ch]">Coming <em>soon.</em></h2>
            <div className="flex flex-col items-center gap-4">
              <a href={REPO} className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium leading-none text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] transition-[transform,background-color] duration-150 ease-out hover:bg-white/10 active:scale-[0.96]">
                <GithubMark size={17} />
                Get Dime on GitHub
              </a>
              <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-white/60">
                Free and open source &middot; MIT licensed &middot; runs on your machine
              </p>
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
