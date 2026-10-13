"use client";

import { useState } from "react";
import { BookOpenText, GitCommit, Database, Lightning } from "@phosphor-icons/react";
import { Shell, Reveal, Win, Foot, Star } from "../shell";
import { notes } from "../data";

const tabs = [
  { id: "notebook" as const, label: "Notebooks", Icon: BookOpenText, line: notes.notebook.line },
  { id: "skills" as const, label: "Skills", Icon: Lightning, line: notes.skills.line },
  { id: "history" as const, label: "History", Icon: GitCommit, line: notes.history.line },
  { id: "warehouse" as const, label: "Warehouse", Icon: Database, line: notes.warehouse.line },
];

export default function A() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("notebook");
  const cur = tabs.find((t) => t.id === tab)!;
  return (
    <Shell foot={false}>
      <section className="mx-auto max-w-[1320px] px-5 pt-28 md:px-6 md:pt-44">
        <Reveal>
          <div className="mx-auto flex max-w-[760px] flex-wrap justify-center gap-1.5" role="tablist">
            {tabs.map(({ id, label, Icon }) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`lab-tab flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-medium md:h-10 ${tab === id ? "bg-[#2458F5] text-white" : "bg-field text-ink-2 hover:text-ink"}`}>
                <Icon size={18} />{label}
              </button>
            ))}
          </div>
        </Reveal>
        <p className="mt-5 text-center text-[17px] leading-[26px] text-ink-2" key={tab}>{cur.line}</p>
        <Reveal className="mt-8">
          <Win tab={tab} h="h-[480px] md:h-[620px]" />
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 pt-28 text-center md:px-6 md:pt-40">
        <Reveal>
          <h2 className="mx-auto max-w-[900px] text-balance text-[38px] leading-[40px] md:text-[64px] md:leading-[66px]">One agent, one workspace, all your NBA research.</h2>
        </Reveal>
        <Reveal delay={100} className="mt-5">
          <p className="mx-auto max-w-[480px] text-[17px] leading-[26px] text-ink-2">You ask. Dime researches and saves the work to your files.</p>
        </Reveal>
        <Reveal delay={200} className="mt-8 flex justify-center"><Star /></Reveal>
      </section>
      <Foot />
    </Shell>
  );
}
