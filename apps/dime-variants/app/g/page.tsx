"use client";

import { useState } from "react";
import { hero } from "@/lib/variants";
import { Page, Cta, SetupRows, FaqList } from "@/components/v/kit";
import { ThemeToggle } from "@/components/landing/Nav";
import { CommitRows } from "@/components/v/features";
import { skills } from "@/components/workbench/data";
import { Tick } from "@/components/workbench/Primitives";
import { DimeMark } from "@/components/product/DimeMark";
import { REPO } from "@/lib/copy";

export default function G() {
  const [sel, setSel] = useState(0);
  return (
    <Page v="g">
      <header className="flex items-center justify-between px-5 py-5 md:px-10">
        <a href="#top" aria-label="dime home" className="flex items-center gap-2 font-display text-[20px] font-semibold"><DimeMark size={20} />dime<span className="text-[var(--cobalt-tx)]">.</span></a>
        <div className="flex items-center gap-6 text-[14px] text-ink-2">
          <a href="#skills" className="hidden hover:text-ink md:block">Skills</a>
          <a href="#history" className="hidden hover:text-ink md:block">History</a>
          <a href="#self-host" className="hidden hover:text-ink md:block">Setup</a>
          <ThemeToggle />
          <a href={REPO} className="text-ink underline decoration-[var(--cobalt-tx)] decoration-2 underline-offset-4">Star on GitHub</a>
        </div>
      </header>
      <main>
        <section className="px-5 pb-10 pt-16 md:px-10 md:pt-28">
          <h1 className="max-w-[1000px] text-[34px] leading-[38px] md:text-[56px] md:leading-[58px]">{hero.g.h1}</h1>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[460px] text-[17px] leading-[27px] text-ink-2">{hero.g.sub}</p>
            <Cta />
          </div>
        </section>
        <section id="skills" className="mt-10 border-t border-line">
          {skills.map((k, i) => (
            <div key={k.name} className="border-b border-line px-5 md:px-10">
              <button type="button" onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} className={`skill-name flex w-full items-baseline justify-between gap-4 py-4 text-left font-display text-[13vw] leading-[0.95] transition-colors duration-150 md:py-6 md:text-[9.5vw] ${sel === i ? "text-ink" : "text-ink-3"}`}>
                <span>{k.name}</span>
                <span className="font-mono text-[12px] font-normal text-ink-3">{k.runs} runs</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${sel === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 md:grid-cols-[1fr_1fr]">
                    <p className="max-w-[420px] text-[17px] leading-[27px] text-ink-2">{k.text}</p>
                    <ol>
                      {k.steps.map((st) => (<li key={st} className="flex items-center gap-3 border-t border-line py-2.5 font-mono text-[13px] text-ink-2"><Tick />{st}</li>))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section id="history" className="px-5 pt-24 md:px-10">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
            <h2 className="text-[32px] leading-[36px] md:text-[44px] md:leading-[48px]">Git keeps the history</h2>
            <CommitRows />
          </div>
        </section>
        <section className="px-5 pt-24 md:px-10"><SetupRows /><FaqList /></section>
      </main>
      <footer className="mt-24 overflow-hidden px-5 pb-6 md:px-10">
        <div className="font-display text-[34vw] font-bold leading-[0.8] text-ink md:text-[26vw]">dime<span className="text-[var(--cobalt-tx)]">.</span></div>
      </footer>
    </Page>
  );
}
