"use client";

import { useState, type ReactNode } from "react";
import { Foot, Page, SetupRows } from "@/components/v/kit";
import { Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO } from "@/lib/copy";

const items: { id: string; name: string; tag: string; node: ReactNode }[] = [
  { id: "chat", name: "Notebook", tag: "Projects", node: <Notebook /> },
  { id: "data", name: "Warehouse", tag: "DuckDB", node: <Warehouse /> },
  { id: "skills", name: "Skills", tag: "SKILL.md", node: <Skills /> },
  { id: "git", name: "History", tag: "Git", node: <History /> },
];

export default function E() {
  const [f, setF] = useState("all");
  const shown = f === "all" ? items : items.filter((i) => i.id === f);
  return (
    <Page v="e">
      <header className="fixed left-3 top-3 z-30 flex h-10 items-center gap-2 rounded-[10px] border border-line bg-canvas/90 pl-3 pr-1 backdrop-blur">
        <a href="#top" aria-label="dime home"><Logo size={15} /></a>
        <ThemeToggle />
      </header>
      <div className="fixed right-3 top-3 z-30"><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
      <main className="mx-auto max-w-[760px] px-5 pb-10 pt-28 md:pt-16 lg:ml-[max(20px,calc(50vw-420px))] lg:mr-auto lg:px-0">
        <h1 className="max-w-[600px] text-[34px] leading-[38px] md:text-[46px] md:leading-[50px]">Open-source analyst for NBA data</h1>
        <p className="mt-4 max-w-[480px] text-[15px] leading-[22px] text-ink-2">Chat for quick questions. Projects for the work you keep.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {[["all", "All"], ...items.map((i) => [i.id, i.name])].map(([id, label]) => (
            <button key={id} type="button" onClick={() => setF(id)} aria-pressed={f === id} className={`press h-10 rounded-full px-4 text-[13px] shadow-[0_0_0_1px_var(--line-strong)] ${f === id ? "bg-ink text-canvas" : "text-ink-2 hover:text-ink"}`}>{label}</button>
          ))}
        </div>
        <h2 className="mt-14 text-[22px] leading-[35px]">Inside dime</h2>
        <div className="mt-6 space-y-10">
          {shown.map((it) => (
            <article key={it.id}>
              <div className="h-[440px] overflow-hidden rounded-[12px] bg-field shadow-[0_0_0_1px_var(--line)] md:h-[520px]">{it.node}</div>
              <div className="mt-3 flex items-center justify-between text-[13px]"><span className="text-ink">{it.name}</span><span className="rounded-full px-2.5 py-1 font-mono text-[11px] text-ink-3 shadow-[0_0_0_1px_var(--line)]">{it.tag} / sample</span></div>
            </article>
          ))}
        </div>
        <h2 className="mb-6 mt-20 text-[22px] leading-[35px]">Run it</h2>
        <div id="self-host"><SetupRows /></div>
      </main>
      <Foot max="max-w-[760px]" />
    </Page>
  );
}
