"use client";

import { Close } from "@/components/v/Close";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import Workbench, { type Tab } from "@/components/workbench/Workbench";
import { Page, Foot, Cap, SetupRows } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

const rows: { tab: Tab; cap: "warehouse" | "skills" | "git"; flip: boolean }[] = [
  { tab: "warehouse", cap: "warehouse", flip: true },
  { tab: "skills", cap: "skills", flip: false },
  { tab: "history", cap: "git", flip: true },
];

function Frame({ tab, tall = false }: { tab: Tab; tall?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`flex items-center justify-center rounded-[6px] bg-field p-2 md:p-4 ${tall ? "h-[560px] md:h-[820px]" : (tab === "warehouse" ? "h-[560px] md:h-[680px]" : "h-[480px] md:h-[560px]")}`}>
      <div className="h-full w-full overflow-hidden rounded-[8px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)]">{seen && <Workbench bare tab={tab} />}</div>
    </div>
  );
}

export default function D() {
  return (
    <Page v="d">
      <header className="h-[52px]">
        <nav className="mx-auto flex h-full max-w-[1300px] items-center justify-between px-5">
          <a href="#top" aria-label="dime home"><Logo size={17} /></a>
          <span />
          <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="ink" size="pill">{short.star}</ButtonLink></div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1300px] px-5">
        <section className="pt-14 md:pt-[112px]">
          <h1 className="max-w-[660px] text-[30px] font-normal leading-[34px] md:text-[44px] md:leading-[48px]">{short.h1a} {short.h1b}</h1>
          <p className="mt-4 max-w-[420px] text-[15px] leading-[22px] text-ink-2">{short.sub}</p>
          <div className="mt-6 flex items-center gap-2"><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink><ButtonLink href="#self-host" variant="ghost" size="pill">{short.setup}</ButtonLink></div>
        </section>
        <section id="product" className="mt-10 md:mt-14"><Frame tab="notebook" tall /><Cap k="notebook" className="mt-3" /></section>
        {rows.map((r) => (
          <section key={r.tab} className={`mt-20 grid gap-5 md:mt-28 md:items-start md:gap-10 ${r.flip ? "md:grid-cols-[1fr_2.4fr]" : "md:grid-cols-[2.4fr_1fr]"}`}>
            <div className={r.flip ? "md:order-2" : ""}><Frame tab={r.tab} /></div>
            <div className={`${r.flip ? "md:order-1" : ""} md:sticky md:top-20 md:pt-2`}>
              <Cap k={r.cap} className="flex-col !items-start gap-1" />
            </div>
          </section>
        ))}
        <SetupRows title />
        <Close max="max-w-[1300px]" flush />
      </main>
      <div className="mt-20"><Foot max="max-w-[1300px]" /></div>
    </Page>
  );
}
