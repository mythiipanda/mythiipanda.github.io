import { Close } from "@/components/v/Close";
import { Page, SetupRows, FaqList, Foot } from "@/components/v/kit";
import Workbench from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO } from "@/lib/copy";
import { roadmap } from "@/lib/roadmap";

const stories = [
  { tab: "warehouse" as const, title: "One warehouse, five tables", lead: "One DuckDB file.", list: ["player_season", "boxscores", "lineups", "shots", "schedule"] },
  { tab: "skills" as const, title: "Skills are SKILL.md files", lead: "Press / to load one.", list: ["14 skills today", "Load with /", "Edit in any editor"] },
  { tab: "history" as const, title: "Every run is a commit", lead: "Diff it. Roll it back.", list: ["Commit per run", "Pinned to a warehouse version", "Files you own"] },
];

const h2 = "text-[36px] leading-[38px] tracking-[-0.03em] md:text-[56px] md:leading-[56px] md:tracking-[-0.04em] font-medium";

export default function H() {
  return (
    <Page v="h">
      <header className="mx-auto flex h-16 max-w-[1425px] items-center justify-between px-6">
        <div className="flex items-center gap-8"><a href="#top" aria-label="dime home"><Logo /></a><nav className="hidden gap-6 text-[14px] text-ink-2 md:flex"><a href="#product" className="hover:text-ink">Product</a><a href="#self-host" className="hover:text-ink">Setup</a></nav></div>
        <div className="flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
      </header>
      <main className="mx-auto max-w-[1425px] px-6">
        <section className="grid gap-10 pb-20 pt-24 md:grid-cols-[1.4fr_1fr] md:pb-32 md:pt-40">
          <div>
            <h1 className="text-[44px] leading-[44px] tracking-[-0.04em] font-medium md:text-[64px] md:leading-[64px]">Open-source analyst for NBA data</h1>
            <div className="mt-8"><ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink></div>
          </div>
          <ul className="space-y-1 pt-2 text-[15px] leading-[24px] text-ink-2 md:self-end md:text-right">
            <li>Chat for the quick answer</li>
            <li>Projects for the work you keep</li>
            <li>Self-hosted, any OpenAI-compatible model</li>
          </ul>
        </section>
        <section id="product" className="pb-24 md:pb-40">
          <h2 className={`${h2} max-w-[680px]`}>Ask a question. Keep the notebook.</h2>
          <div className="mt-12 h-[620px] overflow-hidden rounded-[8px] shadow-[0_0_0_1px_var(--line-strong)] md:h-[760px]"><Workbench /></div>
        </section>
        {stories.map((s, i) => (
          <section key={s.title} className="pb-24 md:pb-40">
            <h2 className={`${h2} max-w-[680px] ${i % 2 ? "md:ml-auto" : ""}`}>{s.title}</h2>
            <div className={`mt-12 grid items-end gap-8 md:grid-cols-[1.7fr_1fr] ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <div className="h-[460px] overflow-hidden rounded-[8px] shadow-[0_0_0_1px_var(--line-strong)] md:h-[520px]"><Workbench tab={s.tab} bare /></div>
              <div>
                <p className="max-w-[320px] text-[17px] leading-[26px] text-ink">{s.lead}</p>
                <ul className="mt-6 space-y-1 text-[14px] leading-[22px] text-ink-3">{s.list.map((x) => (<li key={x}>{x}</li>))}</ul>
              </div>
            </div>
          </section>
        ))}
        <Close max="max-w-[1425px]" />
      </main>
      <Foot max="max-w-[1425px]" />
    </Page>
  );
}
