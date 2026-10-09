"use client";

import { useEffect, useRef, useState } from "react";
import { Cta, FaqList, Foot, Frame, Page, SetupRows } from "@/components/v/kit";
import Workbench, { type Tab } from "@/components/workbench/Workbench";
import { copy, REPO } from "@/lib/copy";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink } from "@/components/landing/ui";
import { hero } from "@/lib/variants";

const steps: { tab: Tab; title: string; text: string }[] = [
  { tab: "notebook", title: "Ask", text: "Write the question in plain English. Tag a table with @ or a skill with /." },
  { tab: "warehouse", title: "Query", text: "dime writes SQL against the DuckDB file on your machine and shows it under the answer." },
  { tab: "skills", title: "Reuse", text: copy.pillars[1].text },
  { tab: "history", title: "Commit", text: copy.pillars[2].text },
];

export default function I() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <Page v="i">
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><Logo /></a>
          <ol className="hidden items-center gap-1 md:flex">
            {steps.map((s, n) => (
              <li key={s.title}><a href="#notebooks" className={`flex h-8 items-center gap-2 rounded-full px-3 text-[13px] transition-colors ${active === n ? "bg-hover-2 text-ink" : "text-ink-3 hover:text-ink"}`}><span className="font-mono text-[11px]">0{n + 1}</span>{s.title}</a></li>
            ))}
          </ol>
          <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill">Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1200px] px-5 md:px-6">
        <section className="pt-14 md:pt-20">
          <h1 className="max-w-[820px] text-[40px] leading-[44px] md:text-[68px] md:leading-[70px]">{hero.i.h1}</h1>
          <p className="mt-6 max-w-[500px] text-[17px] leading-[27px] text-ink-2">{hero.i.sub}</p>
          <div className="mt-8"><Cta /></div>
        </section>
        <section id="notebooks" className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <ol className="order-2 lg:order-1">
            {steps.map((s, i) => (
              <li key={s.title} ref={(el) => { refs.current[i] = el; }} data-i={i} className={`flex min-h-[200px] flex-col justify-center border-l pl-6 transition-colors duration-200 lg:min-h-[62vh] ${active === i ? "border-accent" : "border-line"}`}>
                <div className="font-mono text-[12px] text-ink-3">0{i + 1}</div>
                <h2 className={`mt-2 text-[32px] leading-[36px] transition-colors duration-200 ${active === i ? "text-ink" : "text-ink-3"}`}>{s.title}</h2>
                <p className="mt-3 max-w-[380px] text-[16px] leading-[25px] text-ink-2">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="order-1 lg:sticky lg:top-24 lg:order-2 lg:h-[calc(100vh-8rem)] lg:self-start">
            <Frame h="h-[520px] lg:h-[calc(100vh-8rem-20px)] lg:max-h-[720px]"><Workbench bare tab={steps[active].tab} /></Frame>
          </div>
        </section>
        <div id="skills"><h2 className="mb-6 mt-20 text-[28px] leading-[34px] md:mt-28 md:text-[36px]">Runs on your machine</h2><SetupRows /></div>
        <FaqList />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
