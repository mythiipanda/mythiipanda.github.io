"use client";

import type { ReactNode } from "react";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { DEMO, REPO, hero, trace } from "@/lib/copy";

function TraceCard() {
  return (
    <div className="rd-card rounded-[14px] bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">An answer, traced</span>
        <span className="font-mono text-[11px] text-ink-2">sample</span>
      </div>
      <div className="mt-4 rounded-[10px] bg-field px-3.5 py-2.5 text-[13px] text-ink">{trace.question}</div>
      <div className="mt-3 flex flex-col gap-1.5">
        {trace.calls.map((c) => (
          <div key={c.step} className="flex items-baseline gap-2 font-mono text-[11.5px]">
            <span className="w-[104px] shrink-0 text-ink-2">{c.step}</span>
            <span className="truncate text-ink-2">{c.detail}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-line pt-3 text-[13px] leading-[19px] text-ink-2">{trace.answer}</p>
    </div>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <p className="text-[17px] leading-[26px] text-ink-2">{children}</p>;
}

function Ctas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonLink href={DEMO} variant="primary">Open the demo</ButtonLink>
      <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink>
    </div>
  );
}

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-5 pt-16 md:px-6 md:pt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div>
        <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">{hero.eyebrow}</p>
        <h1 className="max-w-[620px] text-[44px] leading-[1.02] md:text-[72px]">{hero.h1}</h1>
        <div className="mt-6 max-w-[520px]"><Sub>{hero.sub}</Sub></div>
        <div className="mt-8"><Ctas /></div>
        <p className="mt-8 font-mono text-[12px] text-ink-2">{hero.proof}</p>
      </div>
      <div className="relative">
        <TraceCard />
      </div>
    </section>
  );
}
