"use client";

import { Close } from "@/components/v/Close";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import Workbench, { type Tab } from "@/components/workbench/Workbench";
import { Page, Cta, Foot, Cap, SetupRows } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

const features: { tab: Tab; cap: "warehouse" | "skills" | "git" }[] = [
  { tab: "warehouse", cap: "warehouse" },
  { tab: "skills", cap: "skills" },
  { tab: "history", cap: "git" },
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
          <a href="#top" aria-label="dime home"><Logo /></a>
          <div className="flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1284px] px-5 md:px-6">
        <section className="pt-16 md:pt-[130px]">
          <h1 className="max-w-[820px] text-[40px] leading-[42px] md:text-[64px] md:font-[510] md:leading-[64px]">{short.h1a} {short.h1b}</h1>
          <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[420px] text-[15px] leading-[24px] text-ink-2">{short.sub}</p>
            <Cta />
          </div>
        </section>
        <section id="product" className="mt-14 md:mt-[72px]">
          <div className="rounded-[20px] border border-line bg-field p-2 md:p-3">
            <div className="h-[640px] overflow-hidden rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[780px]"><Workbench /></div>
          </div>
        </section>
        {features.map((f) => (
          <section key={f.tab} id={f.tab === "skills" ? "skills" : undefined} className="pt-16 md:pt-[96px]">
            <Shot tab={f.tab} />
            <Cap k={f.cap} className="mt-4" />
          </section>
        ))}
        <SetupRows title />
        <Close max="max-w-[1284px]" flush />
      </main>
      <div className="mt-20"><Foot max="max-w-[1284px]" /></div>
    </Page>
  );
}
