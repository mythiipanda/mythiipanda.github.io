import { Close } from "@/components/v/Close";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { Chat, Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { Page, Foot, Cap, SetupRows } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

function Win({ title, children, className = "", fit = false }: { title: string; children: ReactNode; className?: string; fit?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] ${className}`}>
      <div className="flex h-9 items-center gap-2 border-b border-line bg-field px-3 font-mono text-[11px] text-ink-3"><span className="size-2 rounded-full bg-line-strong" /><span className="size-2 rounded-full bg-line-strong" /><span className="size-2 rounded-full bg-line-strong" /><span className="ml-2">{title}</span></div>
      <div className={`overflow-hidden p-3 md:p-4 ${fit ? "max-h-[520px]" : "h-[420px] md:h-[520px]"}`}>{children}</div>
    </div>
  );
}


export default function F() {
  return (
    <Page v="f">
      <header className="sticky top-5 z-30 flex justify-center px-3">
        <nav className="flex h-[62px] w-full max-w-[860px] items-center justify-between rounded-[14px] border border-line bg-canvas/95 px-5 backdrop-blur">
          <a href="#top" aria-label="dime home"><Logo /></a>
          <div className="flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid max-w-[1200px] gap-8 px-5 pb-10 pt-16 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14 md:pt-[110px]">
          <h1 className="text-[44px] leading-[50px] md:text-[74px] md:leading-[88px]"><span className="serif-i block font-normal">{short.h1a}</span>{short.h1b}</h1>
          <div>
            <p className="max-w-[360px] text-[17px] leading-[26px] text-ink-2">{short.sub}</p>
            <div className="mt-7 flex items-center gap-3"><ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink><ButtonLink href="#self-host" variant="ghost">{short.setup}</ButtonLink></div>
          </div>
        </section>
        <section id="product" className="mx-auto max-w-[1300px] px-3 md:px-6">
          <div className="grid gap-4 md:grid-cols-[1fr_1.35fr_1fr] md:items-start">
            <Win title={short.tiles.notebook.name} className="md:mt-16"><Notebook /></Win>
            <Win title={short.tiles.chat.name} className="md:z-10 md:scale-[1.03]"><Chat /></Win>
            <Win title={short.tiles.warehouse.name} className="md:mt-16"><Warehouse /></Win>
          </div>
        </section>
        <section id="skills" className="mx-auto max-w-[1200px] px-5 pt-20 md:pt-32">
          <Win title={short.tiles.skills.name} fit><Skills /></Win>
          <Cap k="skills" className="mt-4" />
        </section>
        <section className="mx-auto max-w-[1200px] px-5 pt-16 md:pt-24">
          <Win title={short.tiles.git.name} fit><History /></Win>
          <Cap k="git" className="mt-4" />
        </section>
        <div className="mx-auto max-w-[1200px] px-5"><SetupRows title /></div>
        <Close max="max-w-[900px]" center />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
