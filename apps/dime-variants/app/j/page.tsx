import { Close } from "@/components/v/Close";
import type { ReactNode } from "react";
import { Foot, Page, SetupRows, Cap } from "@/components/v/kit";
import { Chat, Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO, short } from "@/lib/copy";

function Tile({ k, children, className = "" }: { k: "chat" | "notebook" | "warehouse" | "skills" | "git"; children: ReactNode; className?: string }) {
  return (
    <figure className={`flex h-[520px] flex-col overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--line)] ${className.includes("bg-") ? "" : "bg-field"} ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-y-auto p-3">{children}</div>
      <figcaption className="shrink-0 border-t border-line px-4 py-3"><Cap k={k} /></figcaption>
    </figure>
  );
}

export default function J() {
  return (
    <Page v="j">
      <header className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 md:px-6">
        <a href="#top" aria-label="dime home"><Logo /></a>
        <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 md:px-6">
        <section className="mx-auto max-w-[880px] pb-12 pt-16 md:pb-16 md:pt-28">
          <h1 className="text-[36px] leading-[40px] tracking-[-0.025em] md:text-[60px] md:leading-[66px]">{short.h1a} {short.h1b}</h1>
          <p className="mt-4 text-[17px] leading-[26px] text-ink-2">{short.sub}</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <Tile k="chat"><Chat /></Tile>
          <Tile k="notebook"><Notebook /></Tile>
          <Tile k="warehouse" className="md:col-span-2 md:h-[620px]"><Warehouse /></Tile>
          <Tile k="skills"><Skills /></Tile>
          <Tile k="git"><History /></Tile>
        </section>
        <SetupRows title />
        <Close max="max-w-[1100px]" flush cmd={false} />
      </main>
      <div className="mt-24"><Foot max="max-w-[1100px]" /></div>
    </Page>
  );
}
