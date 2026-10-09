import { Foot, Page, SetupRows } from "@/components/v/kit";
import { Notebook, Warehouse, Skills, History, Inspector } from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO } from "@/lib/copy";
import type { ReactNode } from "react";

function Tile({ name, note, children, span = "" }: { name: string; note: string; children: ReactNode; span?: string }) {
  return (
    <article className={`flex flex-col rounded-[10px] border border-line bg-field ${span}`}>
      <div className="h-[300px] overflow-hidden border-b border-line md:h-[340px]">{children}</div>
      <div className="flex items-baseline justify-between gap-4 px-4 py-3"><h3 className="font-mono text-[12px] uppercase tracking-[0.04em] text-ink">{name}</h3><p className="text-[13px] text-ink-3">{note}</p></div>
    </article>
  );
}

function Index({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 mt-20 flex items-baseline justify-between border-b border-line pb-4 md:mt-28"><h2 className="font-display text-[22px] font-semibold uppercase leading-[30px] tracking-[-0.02em] md:text-[30px] md:leading-[46px]">{label}</h2><span className="font-mono text-[12px] text-ink-3">{n}</span></div>
  );
}

export default function I() {
  return (
    <Page v="i">
      <header className="border-b border-line">
        <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label="dime home"><Logo /></a>
          <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1280px] px-5 md:px-8">
        <section className="pt-16 md:pt-24">
          <h1 className="font-display text-[48px] font-bold uppercase leading-[46px] tracking-[-0.03em] md:text-[96px] md:leading-[92px]">Ask the league.<br /><span className="text-[var(--cobalt-tx)]">Keep the work.</span></h1>
          <p className="mt-6 max-w-[420px] text-[16px] leading-[24px] text-ink-2">Open-source NBA analyst. Self-hosted.</p>
          <div className="mt-8 flex gap-3"><ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink><ButtonLink href="#self-host" variant="ghost">Setup</ButtonLink></div>
        </section>
        <Index n="01" label="Chat and Projects" />
        <div className="grid gap-4 md:grid-cols-2">
          <Tile name="Notebook" note="Sample"><Notebook /></Tile>
          <Tile name="Inspector" note="Sample" span="hidden md:flex"><Inspector /></Tile>
        </div>
        <Index n="02" label="Data and skills" />
        <div className="grid gap-4 md:grid-cols-2">
          <Tile name="Warehouse" note="One DuckDB file"><Warehouse /></Tile>
          <Tile name="Skills" note="14 today"><Skills /></Tile>
        </div>
        <Index n="03" label="History" />
        <div className="grid gap-4">
          <Tile name="Git" note="Commit per run"><History /></Tile>
        </div>
        <Index n="04" label="Setup" />
        <div id="self-host"><SetupRows /></div>
      </main>
      <div className="mt-24"><Foot max="max-w-[1280px]" /></div>
    </Page>
  );
}
