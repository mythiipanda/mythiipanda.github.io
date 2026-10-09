"use client";

import { useEffect, useState } from "react";
import { BarNav, Cta, FaqList, Foot, Page, SetupRows } from "@/components/v/kit";
import { NumberFlow } from "@/components/ui/number-flow";
import { Notebook } from "@/components/workbench/Workbench";
import { copy } from "@/lib/copy";

const figs = [
  { v: 31204, l: "rows scanned" },
  { v: 41, l: "milliseconds" },
  { v: 61, l: "wings qualify" },
  { v: 4, l: "cells saved" },
];

export default function J() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 400); return () => clearTimeout(t); }, []);
  return (
    <Page v="j">
      <BarNav />
      <main className="mx-auto max-w-[1200px] px-5 md:px-6">
        <section className="pt-14 md:pt-20">
          <h1 className="max-w-[820px] text-[38px] leading-[42px] md:text-[56px] md:leading-[58px]">The open-source analyst for NBA data</h1>
          <div className="mt-8"><Cta /></div>
          <div className="mt-14 md:mt-20">
            <div className="font-mono text-[12px] text-ink-3">One question, one run: wings over 500 minutes by true shooting</div>
            <div className="mt-4 grid grid-cols-2 border-t border-line md:grid-cols-[1.7fr_1fr_1fr_1fr]">
              {figs.map((f) => (
                <div key={f.l} className="border-b border-line py-6 pr-4 md:border-b-0 md:py-8">
                  <NumberFlow value={on ? f.v : 0} className="fig text-[44px] leading-[48px] md:text-[60px] md:leading-[64px]" />
                  <div className="mt-2 text-[14px] text-ink-2">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="notebooks" className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <div>
            <h2 className="text-[28px] leading-[34px] md:text-[34px] md:leading-[40px]">{copy.pillars[0].title}</h2>
            <p className="mt-4 max-w-[380px] text-[16px] leading-[26px] text-ink-2">{copy.statement.rest}</p>
          </div>
          <div className="min-w-0"><Notebook /></div>
        </section>
        <div id="skills"><h2 className="mb-6 mt-20 text-[28px] leading-[34px] md:mt-28 md:text-[36px]">Runs on your machine</h2><SetupRows /></div>
        <FaqList />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
