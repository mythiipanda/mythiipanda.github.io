"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import Workbench, { type Tab } from "@/components/workbench/Workbench";
import { Page, RoadmapRows, FaqList, Foot } from "@/components/v/kit";
import { REPO } from "@/lib/copy";

const rows: { tab: Tab; title: string; text: string; flip: boolean }[] = [
  { tab: "notebook", title: "Quick questions in Chat, saved work in Projects", text: "Ask in Chat for a quick answer. Send it to a Project and it becomes a notebook of prompt, SQL, Python, chart and markdown cells.", flip: false },
  { tab: "warehouse", title: "One warehouse, pinned by version.", text: "A prebuilt warehouse on Hugging Face, refreshed nightly, is on the roadmap. Each Project pins the version it ran on.", flip: true },
  { tab: "skills", title: "Skills and workflows are plain files.", text: "A skill is a SKILL.md file. A workflow is a skill with parameters that generates a Project. 14 skills exist today.", flip: false },
  { tab: "history", title: "History you can diff.", text: "Projects save as files in git. Commit, review and roll back like any repo.", flip: true },
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
    <div ref={ref} className={`flex items-center justify-center rounded-[6px] bg-field p-4 md:p-12 ${tall ? "h-[560px] md:h-[820px]" : "h-[460px] md:h-[640px]"}`}>
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
          <div className="hidden gap-6 text-[13px] text-ink-2 md:flex"><a href="#product" className="hover:text-ink">Product</a><a href="#roadmap" className="hover:text-ink">Roadmap</a><a href="#self-host" className="hover:text-ink">Setup</a><a href={REPO} className="hover:text-ink">GitHub</a></div>
          <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="ink" size="pill">Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1300px] px-5">
        <section className="pt-14 md:pt-[112px]">
          <h1 className="max-w-[660px] text-[22px] font-normal leading-[28px] md:text-[26px] md:leading-[32px]">dime is the open-source analyst for NBA data. Ask in Chat, keep the work in Projects, and host it yourself.</h1>
          <div className="mt-6 flex items-center gap-2"><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink><ButtonLink href="#self-host" variant="ghost" size="pill">See the setup steps</ButtonLink></div>
        </section>
        <section id="product" className="mt-10 md:mt-14"><Frame tab="notebook" tall /></section>
        {rows.map((r) => (
          <section key={r.title} className="mt-16 grid gap-6 md:mt-24 md:grid-cols-[1.9fr_1fr] md:items-end md:gap-8">
            <div className={r.flip ? "md:order-2" : ""}><Frame tab={r.tab} /></div>
            <div className={`${r.flip ? "md:order-1" : ""} md:pb-4`}>
              <h2 className="text-[17px] font-medium leading-[24px]">{r.title}</h2>
              
            </div>
          </section>
        ))}
        <section className="mt-24 md:mt-32"><h2 className="mb-8 text-[26px] leading-[32px]">Built in this order</h2><RoadmapRows /></section>
        <FaqList />
        <section className="mt-24 flex flex-col items-start gap-6 border-t border-line pt-12 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[26px] leading-[32px]">Clone it and ask about last season.</h2>
          <ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink>
        </section>
      </main>
      <div className="mt-16"><Foot max="max-w-[1300px]" /></div>
    </Page>
  );
}
