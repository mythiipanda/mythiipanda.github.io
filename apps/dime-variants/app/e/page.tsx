"use client";

import { useState } from "react";
import { hero } from "@/lib/variants";
import { Page, Cta } from "@/components/v/kit";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink } from "@/components/landing/ui";
import { tables, schema } from "@/components/workbench/data";
import { NumberFlow } from "@/components/ui/number-flow";
import { RoadmapRows } from "@/components/v/kit";
import { CapTable } from "@/components/v/features";
import { copy, REPO } from "@/lib/copy";

const cell = "border-b border-line";

export default function E() {
  const [sel, setSel] = useState(0);
  return (
    <Page v="e">
      <div className="mx-auto max-w-[1320px] border-x border-line">
        <header className={`grid grid-cols-[1fr_auto] md:grid-cols-[240px_1fr_auto_auto] ${cell}`}>
          <a href="#top" aria-label="dime home" className="flex h-14 items-center border-r border-line px-5"><Logo /></a>
          <nav className="hidden items-center gap-8 px-6 font-mono text-[12px] text-ink-2 md:flex">
            <a href="#warehouse" className="hover:text-ink">warehouse</a><a href="#skills" className="hover:text-ink">features</a><a href="#self-host" className="hover:text-ink">setup</a>
          </nav>
          <div className="flex items-center border-l border-line px-2"><ThemeToggle /></div>
          <div className="flex items-center border-l border-line px-3"><ButtonLink href={REPO} variant="primary" size="pill">Star on GitHub</ButtonLink></div>
        </header>
        <section className={`grid md:grid-cols-[240px_1fr] ${cell}`}>
          <div className="hidden border-r border-line p-5 font-mono text-[11px] leading-[18px] text-ink-3 md:block">nba.duckdb<br />5 tables<br />267,237 rows<br />refreshed today</div>
          <div className="px-5 py-14 md:px-10 md:py-24">
            <h1 className="max-w-[900px] text-[38px] md:text-[72px]">{hero.e.h1}</h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-[26px] text-ink-2">Fetch the data pack and ask.</p>
            <div className="mt-8"><Cta /></div>
          </div>
        </section>
        <section id="warehouse" className={`grid md:grid-cols-[1.6fr_1fr] ${cell}`}>
          <div className="md:border-r md:border-line">
            <div className={`grid grid-cols-[1fr_auto] gap-6 bg-field px-5 py-3 font-mono text-[11px] text-ink-3 md:grid-cols-[1fr_110px_70px_110px] ${cell}`}><span>table</span><span className="text-right">rows</span><span className="hidden text-right md:block">cols</span><span className="hidden text-right md:block">refreshed</span></div>
            {tables.map((t, i) => (
              <button key={t.name} type="button" onClick={() => setSel(i)} className={`grid w-full grid-cols-[1fr_auto] gap-6 border-b border-line px-5 py-5 text-left transition-colors last:border-b-0 md:grid-cols-[1fr_110px_70px_110px] md:py-6 ${sel === i ? "bg-hover" : "hover:bg-hover"}`}>
                <span className="font-mono text-[18px] text-ink md:text-[22px]">{t.name}</span>
                <span className="text-right font-mono text-[14px] tabular-nums text-ink-2">{t.rows}</span>
                <span className="hidden text-right font-mono text-[14px] tabular-nums text-ink-2 md:block">{t.cols}</span>
                <span className="hidden text-right font-mono text-[14px] text-ink-3 md:block">{t.fresh}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-line p-6 md:border-t-0">
            <div className="mb-4 font-mono text-[12px] text-ink-3">{tables[sel].name}</div>
            <div className="flex items-baseline gap-2"><NumberFlow value={Number(tables[sel].rows.replace(/,/g, ""))} className="font-mono text-[40px] leading-[44px]" /><span className="text-[14px] text-ink-3">rows</span></div>
            <div className="mt-6">
              {schema.map(([c, t]) => (
                <div key={c} className="flex justify-between border-t border-line py-2 font-mono text-[12.5px]"><span className="text-ink">{c}</span><span className="text-ink-3">{t}</span></div>
              ))}
            </div>
          </div>
        </section>
        <div className="px-5 md:px-10"><CapTable /></div>
        <section id="self-host" className={`grid md:grid-cols-[240px_1fr] ${cell}`}>
          <h2 className="border-b border-line p-5 text-[20px] md:border-b-0 md:border-r">Runs on your machine</h2>
          <ol>
            {copy.host.commands.map((c, i) => (
              <li key={c} className={`flex items-baseline gap-5 px-5 py-5 md:px-10 ${i < 2 ? cell : ""}`}><span className="font-mono text-[12px] text-ink-3">0{i + 1}</span><code className="font-mono text-[14px] text-ink md:text-[17px]">{c}</code></li>
            ))}
          </ol>
        </section>
        <section className={`grid md:grid-cols-[240px_1fr] ${cell}`}>
          <h2 className="border-b border-line p-5 text-[20px] md:border-b-0 md:border-r">Questions</h2>
          <dl>
            {copy.faq.map((f, i) => (
              <div key={f.id} className={`px-5 py-6 md:px-10 ${i < copy.faq.length - 1 ? cell : ""}`}><dt className="text-[16px] font-medium">{f.question}</dt><dd className="mt-2 max-w-[600px] text-[14px] leading-[22px] text-ink-2">{f.answer}</dd></div>
            ))}
          </dl>
        </section>
        <footer className="flex items-center justify-between px-5 py-6 font-mono text-[12px] text-ink-3"><Logo size={15} /><a href={REPO} className="hover:text-ink">github.com/mythiipanda/dime</a></footer>
      </div>
    </Page>
  );
}
