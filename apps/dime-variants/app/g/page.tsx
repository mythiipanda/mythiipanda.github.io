"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { Kbd } from "@/components/ui/kbd";
import { skills, tables } from "@/components/workbench/data";
import { Page, RoadmapRows, FaqList, SetupRows, Foot } from "@/components/v/kit";
import { REPO } from "@/lib/copy";
import { Search, Zap, Database } from "lucide-react";

type Item = { kind: "skill" | "table"; name: string; text: string };
const items: Item[] = [
  ...skills.map((s) => ({ kind: "skill" as const, name: `/${s.name}`, text: s.text })),
  ...tables.slice(0, 3).map((t) => ({ kind: "table" as const, name: `@${t.name}`, text: `${t.rows} rows, ${t.cols} columns` })),
];

export default function G() {
  const [sel, setSel] = useState(0);
  const cur = items[sel];
  return (
    <Page v="g">
      <header className="sticky top-4 z-30 flex justify-center px-3">
        <nav className="flex h-[52px] w-full max-w-[1100px] items-center justify-between rounded-[12px] border border-line bg-canvas/95 pl-4 pr-2 backdrop-blur">
          <a href="#top" aria-label="dime home"><Logo size={17} /></a>
          <div className="hidden gap-6 text-[13px] text-ink-2 md:flex"><a href="#palette" className="hover:text-ink">Palette</a><a href="#skills" className="hover:text-ink">Skills</a><a href="#roadmap" className="hover:text-ink">Roadmap</a><a href="#self-host" className="hover:text-ink">Setup</a></div>
          <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto max-w-[900px] px-5 pb-16 pt-24 text-center md:pt-40">
          <h1 className="text-[44px] leading-[48px] md:text-[64px] md:leading-[68px]">Your analyst for NBA data</h1>
          <p className="mx-auto mt-6 max-w-[480px] text-[17px] leading-[26px] text-ink-2">Open source, self-hosted and built around one prompt. Type a question, press <Kbd>/</Kbd> for skills or <Kbd>@</Kbd> for tables.</p>
          <div className="mt-8 flex justify-center gap-3"><ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink><ButtonLink href="#self-host" variant="ghost">See the setup steps</ButtonLink></div>
        </section>
        <section id="palette" className="mx-auto max-w-[1100px] px-3 md:px-6">
          <div className="overflow-hidden rounded-[16px] bg-field p-3 shadow-[0_0_0_1px_var(--line)] md:p-10">
            <div className="mx-auto max-w-[760px] overflow-hidden rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)]">
              <div className="flex h-14 items-center gap-3 border-b border-line px-4 text-[15px]"><Search size={16} className="text-ink-3" /><span className="text-ink-3">Search skills and tables</span><span className="ml-auto"><Kbd>/</Kbd></span></div>
              <div className="grid md:grid-cols-[1fr_1fr]">
                <ul className="border-b border-line p-2 md:border-b-0 md:border-r">
                  {items.map((it, i) => (
                    <li key={it.name}><button type="button" onMouseEnter={() => setSel(i)} onClick={() => setSel(i)} className={`flex h-10 w-full items-center gap-3 rounded-[8px] px-3 text-left font-mono text-[13px] transition-colors duration-100 ${sel === i ? "bg-hover-2 text-ink" : "text-ink-2"}`}>{it.kind === "skill" ? <Zap size={14} /> : <Database size={14} />}{it.name}</button></li>
                  ))}
                </ul>
                <div className="p-5">
                  <div className="font-mono text-[12px] text-ink-3">{cur.kind}</div>
                  <div className="mt-2 font-mono text-[15px] text-ink">{cur.name}</div>
                  <p className="mt-3 text-[14px] leading-[22px] text-ink-2">{cur.text}</p>
                </div>
              </div>
              <div className="flex h-10 items-center justify-between border-t border-line px-4 text-[12px] text-ink-3"><span>Sample skills and tables</span><span className="flex gap-1">Run <Kbd>Enter</Kbd></span></div>
            </div>
          </div>
        </section>
        <section id="skills" className="mx-auto max-w-[1100px] px-5 pt-32 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[520px] text-[32px] leading-[38px] md:text-[44px] md:leading-[50px]">14 skills ship in the repo</h2>
            <p className="max-w-[340px] text-[15px] leading-[24px] text-ink-2">A skill is a SKILL.md file. A workflow is a skill with parameters that generates a whole Project. 14 skills exist today.</p>
          </div>
          <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
            {skills.map((s) => (
              <div key={s.name} className="w-[300px] shrink-0 rounded-[14px] bg-field p-5 shadow-[0_0_0_1px_var(--line)]">
                <div className="flex size-9 items-center justify-center rounded-[8px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)]"><Zap size={16} /></div>
                <div className="mt-6 font-mono text-[14px] text-ink">{s.name}</div>
                <p className="mt-2 text-[13px] leading-[20px] text-ink-2">{s.text}</p>
                <ol className="mt-4 border-t border-line pt-3 font-mono text-[11.5px] leading-[20px] text-ink-3">{s.steps.map((x) => (<li key={x}>{x}</li>))}</ol>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-[900px] px-5 pt-32 text-center">
          <h2 className="text-[32px] leading-[38px] md:text-[44px] md:leading-[50px]">Quick questions in Chat, saved work in Projects</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[25px] text-ink-2">Send an answer to a Project and it becomes a notebook of prompt, SQL, Python, chart and markdown cells, saved as files in git.</p>
        </section>
        <section className="mx-auto max-w-[1100px] px-5 pt-28 md:px-6"><h2 className="mb-8 text-[32px] leading-[38px] md:text-[44px]">Built in this order</h2><RoadmapRows /></section>
        <section className="mx-auto max-w-[1100px] px-5 pt-28 md:px-6"><h2 className="mb-8 text-[32px] leading-[38px] md:text-[44px]">Runs on your machine</h2><SetupRows /><FaqList /></section>
      </main>
      <footer className="mt-28 overflow-hidden px-5 pb-6"><div className="font-display text-[34vw] font-bold leading-[0.8] text-ink md:text-[22vw]">dime<span className="text-[var(--cobalt-tx)]">.</span></div></footer>
      <Foot max="max-w-[1100px]" />
    </Page>
  );
}
