"use client";

import { useEffect, useRef, useState } from "react";
import { Shell, Win, Foot, Star, Reveal } from "../shell";
import { notes } from "../data";

const steps = [
  { id: "notebook" as const, title: notes.notebook.name, line: notes.notebook.line },
  { id: "skills" as const, title: notes.skills.name, line: notes.skills.line },
  { id: "history" as const, title: notes.history.name, line: notes.history.line },
];

export default function D() {
  const [cur, setCur] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) setCur(Number((e.target as HTMLElement).dataset.i));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <Shell foot={false}>
      <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6 md:pt-40">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-14">
          <div className="min-w-0">
            {steps.map((s, i) => (
              <div key={s.id} data-i={i} ref={(n) => { refs.current[i] = n; }} className="flex flex-col justify-center py-10 md:min-h-[70vh]">
                <div className={`lab-mono text-[13px] transition-colors duration-300 ${cur === i ? "text-[#2458F5]" : "text-ink-2"}`}>0{i + 1}</div>
                <h3 className={`mt-4 text-[32px] leading-[36px] transition-opacity duration-300 md:text-[44px] md:leading-[48px] ${cur === i ? "opacity-100" : "md:opacity-30"}`}>{s.title}</h3>
                <p className={`mt-3 text-[17px] leading-[26px] text-ink-2 transition-opacity duration-300 ${cur === i ? "opacity-100" : "md:opacity-30"}`}>{s.line}</p>
                <div className="mt-8 md:hidden"><Win tab={s.id} h="h-[400px]" /></div>
              </div>
            ))}
          </div>
          <div className="hidden min-w-0 md:block">
            <div className="sticky top-[88px] pt-8">
              <Win tab={steps[cur].id} h="h-[620px]" />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-24 text-center md:px-6 md:py-36">
        <Reveal>
          <h2 className="mx-auto max-w-[900px] text-balance text-[38px] leading-[40px] md:text-[64px] md:leading-[66px]">One agent, one workspace, all your NBA research.</h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[26px] text-ink-2">You ask. Dime researches and saves the work to your files.</p>
        </Reveal>
        <Reveal delay={150} className="mt-8 flex justify-center"><Star /></Reveal>
      </section>
      <Foot />
    </Shell>
  );
}
