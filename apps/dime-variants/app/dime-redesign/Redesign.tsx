"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Workbench from "@/components/workbench/Workbench";
import HeroWindow from "@/components/dime/HeroWindow";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { CLogo } from "@/components/v/CLogo";
import { CLight } from "@/components/v/CLight";
import { Page } from "@/components/v/kit";
import { copy, REPO, short } from "@/lib/copy";
import heroArt from "./art-hero.jpg";
import footArt from "./art-foot.jpg";
import "./redesign.css";

const features = [
  { title: "Quick questions in Chat, saved work in Notebooks", text: "Send an answer to a Notebook to keep it.", tab: "notebook" as const, wide: true },
  { ...copy.pillars[1], tab: "skills" as const, wide: false },
  { ...copy.pillars[2], tab: "history" as const, wide: false },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`rd-reveal ${seen ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Redesign() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 48]);
  return (
    <Page v="c">
      <CLight />
      <header className="sticky top-0 z-50 h-[58px] bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-5 md:px-6">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} /><span className="max-sm:hidden">{short.star}</span><span className="sm:hidden">Star</span></ButtonLink>
        </nav>
      </header>
      <main>
        <section className="mx-auto max-w-[1320px] px-5 pt-14 text-center md:px-6 md:pt-20">
          <Reveal>
            <h1 className="mx-auto max-w-[900px] text-[48px] leading-[48px] md:text-[96px] md:leading-[92px]">Harvey for NBA Analysts</h1>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <p className="mx-auto max-w-[560px] text-[17px] leading-[26px] text-ink-2">Dime is your NBA analyst. It works in your notebooks, runs your models, and <span className="c-hl">shows its work</span>.</p>
          </Reveal>
          <Reveal delay={200} className="mt-8">
            <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
          </Reveal>
        </section>

        <section ref={ref} className="relative mt-10 md:mt-6">
          <motion.div style={{ y }} className="rd-fade-b mx-auto max-w-[1600px]">
            <Image src={heroArt} alt="" priority className="rd-art rd-art-m md:!h-auto" />
          </motion.div>
          <div className="relative z-10 mx-auto -mt-24 max-w-[1320px] px-5 md:-mt-[17vw] md:px-6 xl:-mt-[240px]">
            <Reveal>
              <div className="rd-win overflow-hidden rounded-[14px]"><HeroWindow /></div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 100} className={`min-w-0 ${f.wide ? "md:col-span-2" : ""}`}>
                <div className="rd-card h-full overflow-hidden rounded-[18px] bg-field">
                  <div className={f.wide ? "grid min-w-0 gap-6 p-6 grid-cols-1 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-10 md:p-10" : "p-6 md:p-8"}>
                    <div className={f.wide ? "md:pt-4" : ""}>
                      <h3 className="text-[24px] leading-[28px] md:text-[28px] md:leading-[32px]">{f.title}</h3>
                      <p className="mt-3 text-[15px] leading-[22px] text-ink-2">{f.text}</p>
                    </div>
                    <div className={`rd-embed rd-win overflow-hidden rounded-[12px] bg-canvas ${f.wide ? "h-[400px] md:h-[440px]" : "mt-6 h-[360px] md:h-[400px]"}`}>
                      <Workbench dime bare tab={f.tab} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-24 text-center md:px-6 md:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-[760px] text-balance text-[40px] leading-[42px] md:text-[72px] md:leading-[72px]">NBA research, in your own files.</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 flex justify-center">
            <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
          </Reveal>
        </section>

        <section className="mx-auto flex max-w-[1320px] flex-col items-center px-5 pb-6 text-center md:px-6">
          <Reveal>
            <h2 className="text-[30px] leading-[34px] md:text-[40px] md:leading-[44px]">Coming Soon<span className="text-[#2458F5]">.</span></h2>
          </Reveal>
        </section>
      </main>
      <footer className="relative mt-6">
        <div className="rd-fade-t mx-auto max-w-[1600px]">
          <Image src={footArt} alt="" className="rd-art rd-art-m" style={{ objectPosition: "60% 50%" }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1320px] items-center justify-between px-5 pb-8 text-[13px] text-[#0b1b4d] md:px-6">
          <CLogo size={18} />
          <a href={REPO} className="transition-colors hover:text-[#2458F5]">GitHub</a>
        </div>
      </footer>
    </Page>
  );
}
