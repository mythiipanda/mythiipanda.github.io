"use client";

import { Close } from "@/components/v/Close";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import Workbench, { type Tab } from "@/components/workbench/Workbench";
import { Pillars } from "@/components/landing/Pillars";
import { Closing } from "@/components/landing/Sections";
import { Page, Cta } from "@/components/v/kit";
import { copy, REPO } from "@/lib/copy";

const nav = [["Product", "#product"], ["Skills", "#skills"], ["Setup", "#self-host"]];

const features: { tab: Tab; title: string; text: string }[] = [
  { tab: "warehouse", title: "One warehouse, pinned by version", text: "Every Project pins to a warehouse version, so a result from last week reruns on the same data." },
  { tab: "history", title: "History you can diff", text: "Each run stages its cells. Commit, review and roll back like any repo." },
];

function Shot({ tab }: { tab: Tab }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-[520px] overflow-hidden rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[640px]">
      {seen && <Workbench bare tab={tab} />}
    </div>
  );
}

export default function A() {
  return (
    <Page v="a">
      <header className="h-[72px] border-b border-line">
        <nav className="mx-auto flex h-full max-w-[1284px] items-center justify-between px-5 md:px-6">
          <div className="flex items-center gap-10">
            <a href="#top" aria-label="dime home"><Logo /></a>
            <div className="hidden gap-7 text-[14px] text-ink-2 md:flex">
              {nav.map(([l, h]) => (<a key={l} href={h} className="transition-colors duration-150 hover:text-ink">{l}</a>))}
            </div>
          </div>
          <div className="flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1284px] px-5 md:px-6">
        <section className="pt-16 md:pt-[130px]">
          <h1 className="max-w-[820px] text-[40px] leading-[42px] md:text-[64px] md:font-[510] md:leading-[64px]">The open-source analyst for NBA data</h1>
          <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[420px] text-[15px] leading-[24px] text-ink-2">Chat for quick questions. Projects for the work you keep.</p>
            <Cta />
          </div>
        </section>
        <section id="product" className="mt-14 md:mt-[72px]">
          <div className="rounded-[20px] border border-line bg-field p-2 md:p-3">
            <div className="h-[640px] overflow-hidden rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[780px]"><Workbench /></div>
          </div>
        </section>
        <section className="pt-24 md:pt-[128px]">
          <p className="max-w-[900px] text-[28px] leading-[32px] md:text-[48px] md:font-[510] md:leading-[48px]">Harvey for the NBA. <span className="text-ink-2">An open-source agent you host yourself.</span></p>
        </section>
        <Pillars />
        {features.map((f, i) => (
          <section key={f.title} id={f.tab === "skills" ? "skills" : undefined} className="pt-24 md:pt-[128px]">
            <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-start md:justify-between md:gap-16">
              <h2 className="max-w-[460px] text-[30px] leading-[34px] md:text-[48px] md:font-[510] md:leading-[48px]">{f.title}</h2>
              
            </div>
            <Shot tab={f.tab} />
          </section>
        ))}
        <Closing />
        <Close max="max-w-[1284px]" flush />
      </main>
    </Page>
  );
}
