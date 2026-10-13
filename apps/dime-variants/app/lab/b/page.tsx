"use client";

import { BookOpenText, GitCommit, Lightning } from "@phosphor-icons/react";
import { Shell, Reveal, Win, Foot, Star } from "../shell";
import { notes, rows, commits } from "../data";

const items = [
  { n: "01", title: notes.notebook.name, line: notes.notebook.line, tab: "notebook" as const, Icon: BookOpenText, meta: ["silver_advanced", "582 rows", "4 cells"] },
  { n: "02", title: notes.skills.name, line: notes.skills.line, tab: "skills" as const, Icon: Lightning, meta: ["leaderboard", "player-comparison", "schedule-rest"] },
  { n: "03", title: notes.history.name, line: notes.history.line, tab: "history" as const, Icon: GitCommit, meta: commits.slice(0, 3).map((c) => c.ref) },
];

export default function B() {
  return (
    <Shell foot={false}>
      <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6 md:pt-40">
        {items.map((it, i) => (
          <Reveal key={it.n}>
            <div className={`lab-rule grid grid-cols-[minmax(0,1fr)] gap-8 border-t py-12 md:gap-14 md:py-20 ${i % 2 ? "md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]" : "md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]"}`}>
              <div className={`flex flex-col justify-between ${i % 2 ? "md:order-2" : ""}`}>
                <div>
                  <div className="lab-mono text-[13px] text-ink-2">{it.n}</div>
                  <h3 className="mt-6 flex items-center gap-3 text-[32px] leading-[36px] md:text-[44px] md:leading-[48px]"><it.Icon size={28} className="text-[#2458F5]" />{it.title}</h3>
                  <p className="mt-4 text-[17px] leading-[26px] text-ink-2">{it.line}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {it.meta.map((m) => <span key={m} className="lab-mono rounded-md bg-field px-2 py-1 text-[12px] text-ink-2">{m}</span>)}
                </div>
              </div>
              <Win tab={it.tab} h="h-[400px] md:h-[500px]" />
            </div>
          </Reveal>
        ))}
        <div className="lab-rule border-t" />
      </section>
      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-24 md:grid-cols-[1fr_auto] md:items-end md:px-6 md:py-36">
        <Reveal>
          <h2 className="max-w-[820px] text-balance text-[38px] leading-[40px] md:text-[64px] md:leading-[66px]">One agent, one workspace, all your NBA research.</h2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-[26px] text-ink-2">You ask. Dime researches and saves the work to your files.</p>
        </Reveal>
        <Reveal delay={150}><Star /></Reveal>
      </section>
      <Foot />
    </Shell>
  );
}
