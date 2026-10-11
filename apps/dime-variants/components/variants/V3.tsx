import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";

const H1 = "Harvey for NBA Analysts";
const SUB = "Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.";

const artifacts = [
  { name: "Chat", meta: "quick questions" },
  { name: "Notebook", meta: "saved work" },
  { name: "warehouse.duckdb", meta: "one file" },
  { name: "leaderboard", meta: "SKILL.md" },
  { name: "player-comparison", meta: "SKILL.md" },
  { name: "schedule-rest", meta: "SKILL.md" },
  { name: "14 skills", meta: "today" },
  { name: "Commit per run", meta: "git history" },
  { name: "Shot map", meta: "vision" },
  { name: "RAPTOR", meta: "vision" },
  { name: "ToolChips", meta: "tool calls" },
  { name: "Provenance", meta: "table, snapshot, filter" },
];

export function V3() {
  const row = [...artifacts, ...artifacts];
  return (
    <div id="top" className="vx min-h-screen overflow-x-clip" style={{ background: "var(--vx-paper)", color: "var(--vx-ink)" }}>
      <header className="sticky top-0 z-50 border-b vx-hair" style={{ background: "var(--vx-paper)" }}>
        <nav className="vx-wrap flex h-[58px] items-center justify-between">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} />{short.star}</ButtonLink>
        </nav>
      </header>
      <main>
        <section className="vx-wrap grid items-end gap-6 pt-16 pb-10 md:pt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7"><h1 className="text-[44px] leading-[46px] md:text-[72px] md:leading-[74px]">{H1}</h1></div>
          <div className="lg:col-span-5">
            <p className="max-w-[510px] text-[17px] leading-[26px]" style={{ color: "var(--vx-ink2)" }}>{SUB}</p>
            <div className="mt-6"><ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink></div>
          </div>
        </section>
        <section className="v3-marquee border-y vx-hair py-5" aria-label="What is inside dime">
          <div className="v3-track">
            {row.map((a, i) => (
              <div className="v3-card" key={`${a.name}-${i}`}><b>{a.name}</b><span>{a.meta}</span></div>
            ))}
          </div>
        </section>
        <section className="vx-wrap pt-14"><HeroWindow /></section>
        <section className="vx-wrap grid gap-10 py-20 md:py-28 lg:grid-cols-2">
          <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px]">{copy.git.title}</h2>
          <p className="max-w-[520px] self-end text-[16px] leading-[26px]" style={{ color: "var(--vx-ink2)" }}>{copy.git.sub}</p>
        </section>
        <section className="vx-wrap border-t vx-hair py-20 md:py-24">
          <div className="v3-card flex w-full flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-14" style={{ width: "auto" }}>
            <h2 className="max-w-[560px] text-[28px] leading-[34px] md:text-[36px] md:leading-[42px]">{copy.close.title}</h2>
            <ButtonLink href={REPO} variant="primary"><GithubMark />{copy.close.button}</ButtonLink>
          </div>
        </section>
      </main>
      <footer className="border-t vx-hair">
        <div className="vx-wrap flex items-center justify-between py-6 text-[13px]" style={{ color: "var(--vx-ink3)" }}>
          <CLogo size={18} />
          <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
