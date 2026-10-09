"use client";

import { useState } from "react";
import { BarNav, Cta, FaqList, Foot, Page, SetupRows } from "@/components/v/kit";
import { skills } from "@/components/workbench/data";
import { Tick } from "@/components/workbench/Primitives";
import { copy } from "@/lib/copy";

export default function G() {
  const [sel, setSel] = useState(0);
  const s = skills[sel];
  return (
    <Page v="g">
      <BarNav />
      <main className="mx-auto max-w-[1200px] px-5 md:px-6">
        <section className="pt-14 md:pt-20">
          <h1 className="max-w-[760px] text-[34px] leading-[38px] md:text-[48px] md:leading-[52px]">The open-source analyst for NBA data</h1>
          <p className="mt-5 max-w-[500px] text-[17px] leading-[27px] text-ink-2">{copy.hero.sub}</p>
          <div className="mt-7"><Cta /></div>
        </section>
        <section id="skills" className="mt-16 grid gap-10 border-t border-line pt-10 md:mt-24 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <ul>
            {skills.map((k, i) => (
              <li key={k.name}>
                <button type="button" onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} className={`skill-name flex w-full items-baseline justify-between gap-4 py-3 text-left font-display text-[44px] leading-[1.0] transition-colors duration-150 md:py-4 md:text-[80px] ${sel === i ? "text-ink" : "text-ink-3 hover:text-ink-2"}`}>
                  <span className="">{k.name}</span>
                  <span className="font-mono text-[12px] text-ink-3">{k.runs} runs</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="md:pt-6">
            <p className="text-[17px] leading-[27px] text-ink-2">{s.text}</p>
            <ol className="mt-6">
              {s.steps.map((st) => (
                <li key={st} className="flex items-center gap-3 border-t border-line py-3 font-mono text-[13px] text-ink-2"><Tick />{st}</li>
              ))}
            </ol>
            <p className="mt-6 text-[14px] leading-[22px] text-ink-3">A skill is a file in your repo. dime loads it when you type / in the composer.</p>
          </div>
        </section>
        <div id="notebooks"><h2 className="mb-6 mt-20 text-[28px] leading-[34px] md:mt-28 md:text-[36px]">Runs on your machine</h2><SetupRows /></div>
        <FaqList />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
