import { Close } from "@/components/v/Close";
import { Page, SetupRows, Foot, Cap } from "@/components/v/kit";
import Workbench from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO, short } from "@/lib/copy";

const stories = [
  { tab: "warehouse" as const, k: "warehouse" as const },
  { tab: "skills" as const, k: "skills" as const },
  { tab: "history" as const, k: "git" as const },
];

export default function H() {
  return (
    <Page v="h">
      <header className="mx-auto flex h-16 max-w-[1425px] items-center justify-between px-6">
        <div className="flex items-center gap-8"><a href="#top" aria-label="dime home"><Logo /></a></div>
        <div className="flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
      </header>
      <main className="mx-auto max-w-[1425px] px-6">
        <section className="grid gap-10 pb-20 pt-24 md:pb-32 md:pt-40">
          <div>
            <h1 className="text-[40px] leading-[42px] tracking-[-0.04em] font-medium md:text-[64px] md:leading-[64px]">{short.h1a}<br />{short.h1b}</h1>
            <p className="mt-6 max-w-[420px] text-[16px] leading-[24px] text-ink-2">{short.sub}</p>
            <div className="mt-8 flex gap-3"><ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink><ButtonLink href="#self-host" variant="ghost">{short.setup}</ButtonLink></div>
          </div>
          
        </section>
        <section id="product" className="pb-20 md:pb-28">
          <div className="h-[620px] overflow-hidden rounded-[8px] shadow-[0_0_0_1px_var(--line-strong)] md:h-[760px]"><Workbench /></div>
          <Cap k="notebook" className="mt-4" />
        </section>
        {stories.map((s) => (
          <section key={s.tab} className="pb-16 md:pb-24">
            <div className="h-[460px] overflow-hidden rounded-[8px] shadow-[0_0_0_1px_var(--line-strong)] md:h-[520px]"><Workbench tab={s.tab} bare /></div>
            <Cap k={s.k} className="mt-4" />
          </section>
        ))}
        <SetupRows title />
        <Close max="max-w-[1425px]" flush />
      </main>
      <Foot max="max-w-[1425px]" />
    </Page>
  );
}
