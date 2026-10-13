"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { Shell, Reveal, Win, Foot, Star } from "../shell";
import { Kbd } from "@/components/ui/kbd";
import { notes, commits } from "../data";

const prompt = "Chart the top five by TS%";

function Typed() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v >= prompt.length ? 0 : v + 1)), n >= prompt.length ? 2400 : 70);
    return () => clearInterval(t);
  }, [n]);
  return <span>{prompt.slice(0, n)}<span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-[#2458F5]" /></span>;
}

export default function E() {
  return (
    <Shell foot={false}>
      <section className="mx-auto max-w-[1320px] px-5 pt-28 md:px-6 md:pt-44">
        <Reveal>
          <Win tab="notebook" h="h-[460px] md:h-[600px]" />
        </Reveal>
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          <Reveal>
            <h3 className="text-[28px] leading-[32px] md:text-[34px] md:leading-[38px]">{notes.notebook.name}</h3>
            <p className="mt-3 text-[17px] leading-[26px] text-ink-2">{notes.notebook.line}</p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="text-[28px] leading-[32px] md:text-[34px] md:leading-[38px]">{notes.skills.name}</h3>
            <p className="mt-3 flex items-center gap-2 text-[17px] leading-[26px] text-ink-2">Press <Kbd>/</Kbd> to load one.</p>
          </Reveal>
          <Reveal delay={160}>
            <h3 className="text-[28px] leading-[32px] md:text-[34px] md:leading-[38px]">{notes.history.name}</h3>
            <p className="mt-3 text-[17px] leading-[26px] text-ink-2">Diff it. Roll it back.</p>
            <div className="lab-mono mt-4 text-[13px] text-ink-2">{commits[0].ref} <span className="text-[#2458F5]">+{commits[0].add}</span></div>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 pt-28 text-center md:px-6 md:pt-44">
        <Reveal>
          <h2 className="mx-auto max-w-[900px] text-balance text-[38px] leading-[40px] md:text-[64px] md:leading-[66px]">One agent, one workspace, all your NBA research.</h2>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <div className="rd-win mx-auto flex max-w-[640px] items-center gap-3 rounded-[16px] bg-surface p-3 pl-5 text-left text-[17px]">
            <span className="min-w-0 flex-1 truncate"><Typed /></span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2458F5] text-white"><ArrowUp size={18} weight="bold" /></span>
          </div>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[26px] text-ink-2">You ask. Dime researches and saves the work to your files.</p>
        </Reveal>
        <Reveal delay={200} className="mt-8 flex justify-center"><Star /></Reveal>
      </section>
      <Foot />
    </Shell>
  );
}
