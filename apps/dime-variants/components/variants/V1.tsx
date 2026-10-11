import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";

const H1 = "Harvey for NBA Analysts";
const SUB = "Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.";

export function V1({ grain = true }: { grain?: boolean }) {
  return (
    <div id="top" className={`vx v1-bg min-h-screen overflow-x-clip ${grain ? "v1-grain" : ""}`} style={{ color: "var(--vx-ink)" }}>
      <header className="vx-wrap flex h-[72px] items-center justify-between border-b vx-hair">
        <a href="#top" className="flex items-center gap-3" aria-label="dime home"><CLogo /><span className="v1-wordmark">dime</span></a>
        <a href={REPO} className="v1-ghost gap-2"><GithubMark size={14} />{short.star}</a>
      </header>
      <main>
        <section className="vx-wrap grid items-end gap-10 pt-16 pb-6 md:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-8"><h1 className="v1-display">{H1}</h1></div>
          <div className="lg:col-span-4">
            <p className="max-w-[420px] text-[17px] leading-[26px]" style={{ color: "var(--vx-ink2)" }}>{SUB}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={REPO} className="v1-pill"><GithubMark />{short.star}</a>
              <a href="#setup" className="v1-ghost">How it works</a>
            </div>
          </div>
        </section>
        <section className="vx-wrap relative pb-8">
          <span className="v1-anno" style={{ left: "-4px", top: "38%" }}><i />Frozen sidebar</span>
          <span className="v1-anno" style={{ right: "-4px", top: "18%" }}><i />ToolChips, not dots</span>
          <span className="v1-anno" style={{ right: "6%", bottom: "64px" }}><i />Borderless pill composer</span>
          <HeroWindow />
        </section>
        <section className="vx-wrap border-t vx-hair py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5"><h2 className="v1-h2">You ask about a lineup. dime shows the SQL under the answer.</h2></div>
            <div className="grid gap-8 lg:col-span-7">
              {copy.pillars.map((p) => (
                <div key={p.title} className="border-t vx-hair pt-5">
                  <p className="text-[17px] font-medium" style={{ color: "var(--vx-ink)" }}>{p.title}</p>
                  <p className="mt-1 text-[15px] leading-[24px]" style={{ color: "var(--vx-ink2)" }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="setup" className="vx-wrap border-t vx-hair py-20 md:py-28">
          <div className="flex flex-col gap-10">
            <span className="vx-micro">Self-host, three steps</span>
            <ol>
              {copy.host.commands.map((c, i) => (
                <li key={c} className="grid items-baseline gap-2 border-b vx-hair py-7 md:grid-cols-[64px_1.5fr_1fr]">
                  <span className="vx-micro" style={{ color: "var(--vx-cobalt)" }}>0{i + 1}</span>
                  <code className="text-[16px] md:text-[20px]" style={{ fontFamily: "var(--vx-mono)", color: "var(--vx-ink)" }}>{c}</code>
                  <span className="text-[14px]" style={{ color: "var(--vx-ink2)" }}>{copy.host.items[i].text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="vx-wrap border-t vx-hair py-20 md:py-28">
          <div className="v1-card flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-14">
            <h2 className="v1-h2 max-w-[560px]">{copy.close.title}</h2>
            <a href={REPO} className="v1-pill"><GithubMark />{copy.close.button}</a>
          </div>
        </section>
      </main>
      <footer className="vx-wrap flex items-center justify-between border-t vx-hair py-8">
        <span className="vx-micro">dime, open source</span>
        <a href={REPO} className="vx-micro" style={{ color: "var(--vx-ink)" }}>GitHub</a>
      </footer>
    </div>
  );
}
