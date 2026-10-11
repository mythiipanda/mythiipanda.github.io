import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";

const H1 = "Harvey for NBA Analysts";
const SUB = "Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.";

export function V5({ grid = true }: { grid?: boolean }) {
  return (
    <div id="top" className={`vx v5-bg min-h-screen overflow-x-clip ${grid ? "v5-grid" : ""}`} style={{ color: "var(--vx-ink)" }}>
      <div className="v5-tick" aria-hidden="true" />
      <header className="vx-wrap flex h-[56px] items-center justify-between border-b vx-hair">
        <a href="#top" className="flex items-center gap-3" aria-label="dime home"><CLogo /><span className="v5-coord">dime / 0.3.0</span></a>
        <a href={REPO} className="v5-coord flex items-center gap-2" style={{ color: "var(--vx-ink)" }}><GithubMark size={14} />{short.star}</a>
      </header>
      <main>
        <section className="vx-wrap border-b vx-hair pt-16 pb-14 md:pt-24">
          <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>s.01 / hero</span>
          <h1 className="mt-4 max-w-[900px] text-[44px] leading-[46px] md:text-[72px] md:leading-[74px]">{H1}</h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <p className="max-w-[510px] text-[17px] leading-[26px] lg:col-span-6" style={{ color: "var(--vx-ink2)" }}>{SUB}</p>
            <div className="flex items-end lg:col-span-6 lg:justify-end">
              <a href={REPO} className="inline-flex h-11 items-center gap-2 rounded-[3px] bg-[#2458F5] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#1d49d4]"><GithubMark />{short.star}</a>
            </div>
          </div>
        </section>
        <section className="vx-wrap border-b vx-hair py-14">
          <div className="mb-6 flex items-baseline justify-between">
            <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>s.02 / product</span>
            <span className="v5-coord">recorded run</span>
          </div>
          <HeroWindow />
        </section>
        <section className="vx-wrap border-b vx-hair py-14">
          <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>s.03 / surfaces</span>
          <div className="mt-6 grid gap-px md:grid-cols-3" style={{ background: "var(--vx-rule)" }}>
            {[
              { k: "chat", v: "Quick questions", d: copy.pillars[0].text },
              { k: "notebook", v: "Saved work", d: copy.pillars[1].text },
              { k: "warehouse", v: "One DuckDB file", d: copy.pillars[2].text },
            ].map((s) => (
              <div key={s.k} className="v5-spec border-0 p-6" style={{ borderRadius: 0 }}>
                <span className="v5-coord">{s.k}</span>
                <p className="mt-3 text-[17px] font-medium">{s.v}</p>
                <p className="mt-1 text-[14px] leading-[22px]" style={{ color: "var(--vx-ink2)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="setup" className="vx-wrap border-b vx-hair py-14">
          <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>s.04 / setup</span>
          <ol className="mt-6">
            {copy.host.commands.map((c, i) => (
              <li key={c} className="grid items-baseline gap-2 border-b vx-hair py-5 last:border-b-0 md:grid-cols-[64px_1.4fr_1fr]">
                <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>0{i + 1}</span>
                <code className="num text-[15px] md:text-[18px]" style={{ fontFamily: "var(--vx-mono)" }}>{c}</code>
                <span className="text-[14px]" style={{ color: "var(--vx-ink2)" }}>{copy.host.items[i].title}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="vx-wrap py-14">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>s.05 / close</span>
              <h2 className="mt-3 max-w-[560px] text-[28px] leading-[34px] md:text-[36px] md:leading-[42px]">{copy.close.title}</h2>
            </div>
            <a href={REPO} className="inline-flex h-11 items-center gap-2 rounded-[3px] bg-[#2458F5] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#1d49d4]"><GithubMark />{copy.close.button}</a>
          </div>
        </section>
      </main>
      <footer className="border-t vx-hair">
        <div className="vx-wrap flex items-center justify-between py-5">
          <span className="v5-coord">dime, open source</span>
          <a href={REPO} className="v5-coord" style={{ color: "var(--vx-ink)" }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
