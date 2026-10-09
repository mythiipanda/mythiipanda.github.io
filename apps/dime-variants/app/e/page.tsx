"use client";

import { useState } from "react";
import { CapTable } from "@/components/v/features";
import { BarNav, Cta, FaqList, Foot, Page, SetupRows } from "@/components/v/kit";
import { tables, schema } from "@/components/workbench/data";
import { NumberFlow } from "@/components/ui/number-flow";
import { copy } from "@/lib/copy";
import { hero } from "@/lib/variants";

export default function E() {
  const [sel, setSel] = useState(0);
  return (
    <Page v="e">
      <BarNav />
      <main className="mx-auto max-w-[1200px] px-5 md:px-6">
        <section className="grid gap-8 pt-14 md:grid-cols-[1.3fr_1fr] md:items-end md:pt-20">
          <h1 className="text-[40px] leading-[44px] md:text-[64px] md:leading-[66px]">{hero.e.h1}</h1>
          <div><p className="mb-6 text-[17px] leading-[27px] text-ink-2">{hero.e.sub}</p><Cta /></div>
        </section>
        <section id="notebooks" className="mt-14 grid gap-px overflow-hidden rounded-[14px] bg-line shadow-[0_0_0_1px_var(--line)] md:mt-20 md:grid-cols-[1.6fr_1fr]">
          <div className="bg-canvas">
            <div className="grid grid-cols-[1fr_auto_auto] gap-6 border-b border-line bg-field px-5 py-3 font-mono text-[11px] text-ink-3 md:grid-cols-[1fr_110px_70px_110px]"><span>table</span><span className="text-right">rows</span><span className="hidden text-right md:block">cols</span><span className="hidden text-right md:block">refreshed</span></div>
            {tables.map((t, i) => (
              <button key={t.name} type="button" onClick={() => setSel(i)} className={`grid w-full grid-cols-[1fr_auto_auto] gap-6 border-b border-line px-5 py-5 text-left transition-colors last:border-b-0 md:grid-cols-[1fr_110px_70px_110px] md:py-6 ${sel === i ? "bg-hover" : "hover:bg-hover"}`}>
                <span className="font-mono text-[18px] text-ink md:text-[22px]">{t.name}</span>
                <span className="text-right font-mono text-[14px] tabular-nums text-ink-2">{t.rows}</span>
                <span className="hidden text-right font-mono text-[14px] tabular-nums text-ink-2 md:block">{t.cols}</span>
                <span className="hidden text-right font-mono text-[14px] text-ink-3 md:block">{t.fresh}</span>
              </button>
            ))}
          </div>
          <div className="bg-canvas p-6">
            <div className="mb-4 font-mono text-[12px] text-ink-3">{tables[sel].name}</div>
            <div className="flex items-baseline gap-2"><NumberFlow value={Number(tables[sel].rows.replace(/,/g, ""))} className="font-display text-[44px] leading-[48px]" /><span className="text-[14px] text-ink-3">rows</span></div>
            <div className="mt-6">
              {schema.map(([c, t]) => (
                <div key={c} className="flex justify-between border-t border-line py-2 font-mono text-[12.5px]"><span className="text-ink">{c}</span><span className="text-ink-3">{t}</span></div>
              ))}
            </div>
          </div>
        </section>
        <CapTable />
        <h2 className="mb-6 mt-20 text-[28px] leading-[34px] md:mt-28 md:text-[36px]">Runs on your machine</h2><SetupRows /><FaqList />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
