import { Close } from "@/components/v/Close";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { Page, RoadmapRows, FaqList, Foot } from "@/components/v/kit";
import { REPO } from "@/lib/copy";

function Win({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] ${className}`}>
      <div className="flex h-9 items-center gap-2 border-b border-line bg-field px-3 font-mono text-[11px] text-ink-3"><span className="size-2 rounded-full bg-line-strong" /><span className="size-2 rounded-full bg-line-strong" /><span className="size-2 rounded-full bg-line-strong" /><span className="ml-2">{title}</span></div>
      <div className="h-[420px] overflow-hidden p-3 md:h-[520px] md:p-4">{children}</div>
    </div>
  );
}

const chips = ["Which wings have the best true shooting?", "Rest-day splits by team", "Five-man units by net rating"];

export default function F() {
  return (
    <Page v="f">
      <header className="sticky top-5 z-30 flex justify-center px-3">
        <nav className="flex h-[62px] w-full max-w-[860px] items-center justify-between rounded-[14px] border border-line bg-canvas/95 px-5 backdrop-blur">
          <div className="hidden gap-6 text-[14px] text-ink-2 md:flex"><a href="#product" className="hover:text-ink">Product</a><a href="#skills" className="hover:text-ink">Skills</a></div>
          <a href="#top" aria-label="dime home"><Logo /></a>
          <div className="flex items-center gap-2"><div className="hidden gap-6 text-[14px] text-ink-2 md:flex"><a href="#self-host" className="hover:text-ink">Setup</a></div><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid max-w-[1200px] gap-8 px-5 pb-10 pt-16 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14 md:pt-[110px]">
          <h1 className="text-[48px] leading-[54px] md:text-[74px] md:leading-[88px]"><span className="serif-i block font-normal">The open-source</span>analyst for NBA data</h1>
          <div>
            <p className="max-w-[360px] text-[17px] leading-[26px] text-ink-2">Chat for quick questions. Projects for the work you keep.</p>
            <div className="mt-7 flex items-center gap-3"><ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink><ButtonLink href="#self-host" variant="ghost">See the setup steps</ButtonLink></div>
          </div>
        </section>
        <section id="product" className="mx-auto max-w-[1300px] px-3 md:px-6">
          <div className="grid gap-4 md:grid-cols-[1fr_1.35fr_1fr] md:items-start">
            <Win title="wing-efficiency / notebook" className="md:mt-16"><Notebook /></Win>
            <Win title="chat" className="md:z-10 md:scale-[1.03]"><Notebook /></Win>
            <Win title="history" className="md:mt-16"><History /></Win>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (<span key={c} className="rounded-full px-4 py-2 text-[13px] text-ink-2 shadow-[0_0_0_1px_var(--line-strong)]">{c}</span>))}
          </div>
        </section>
        <section className="mx-auto max-w-[900px] px-5 pb-10 pt-28 text-center md:pt-40">
          <h2 className="text-[34px] leading-[40px] md:text-[56px] md:leading-[64px]"><span className="serif-i block font-normal">Chat for the quick answer.</span>Projects for the work you keep.</h2>
          
        </section>
        <section id="skills" className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-20 md:grid-cols-[320px_1fr] md:items-center md:gap-16 md:pt-32">
          <div>
            <h3 className="text-[28px] leading-[34px] md:text-[34px] md:leading-[40px]">Skills and workflows are plain files</h3>
            <p className="mt-4 text-[16px] leading-[25px] text-ink-2">14 skills ship today.</p>
          </div>
          <Win title="skills"><Skills /></Win>
        </section>
        <section className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-20 md:grid-cols-[1fr_320px] md:items-center md:gap-16 md:pt-32">
          <Win title="history" className="md:order-1"><History /></Win>
          <div className="md:order-2">
            <h3 className="text-[28px] leading-[34px] md:text-[34px] md:leading-[40px]">History you can diff</h3>
            
          </div>
        </section>
        <Close max="max-w-[900px]" center />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
