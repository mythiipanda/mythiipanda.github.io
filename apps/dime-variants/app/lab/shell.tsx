"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import HeroWindow from "@/components/dime/HeroWindow";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { CLogo } from "@/components/v/CLogo";
import { CLight } from "@/components/v/CLight";
import { Page } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";
import heroArt from "../art-hero.jpg";
import footArt from "../art-foot.jpg";
import "../landing.css";
import "./lab.css";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSeen(true);
        io.disconnect();
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`rd-reveal ${seen ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Star() {
  return <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>;
}

export function Shell({ children, foot = true }: { children: ReactNode; foot?: boolean }) {
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
          <Reveal delay={200} className="mt-8"><Star /></Reveal>
        </section>
        <section className="relative mt-10 md:mt-6">
          <motion.div style={{ y }} className="rd-fade-b mx-auto max-w-[1600px]">
            <Image src={heroArt} alt="" priority className="rd-art rd-art-m md:!h-auto" />
          </motion.div>
          <div className="relative z-10 mx-auto -mt-24 max-w-[1320px] px-5 md:-mt-[17vw] md:px-6 xl:-mt-[240px]">
            <Reveal><div className="rd-win overflow-hidden rounded-[14px]"><HeroWindow /></div></Reveal>
          </div>
        </section>
        {children}
      </main>
      {foot && <Foot />}
    </Page>
  );
}

export function Foot({ overlay }: { overlay?: ReactNode }) {
  return (
    <footer className="relative mt-6">
      <div className="rd-fade-t mx-auto max-w-[1600px]">
        <Image src={footArt} alt="" className="rd-art rd-art-m" style={{ objectPosition: "60% 50%" }} />
      </div>
      {overlay}
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1320px] items-center justify-between px-5 pb-8 text-[13px] text-[#0b1b4d] md:px-6">
        <CLogo size={18} />
        <a href={REPO} className="transition-colors hover:text-[#2458F5]">GitHub</a>
      </div>
    </footer>
  );
}

export function Win({ tab, h = "h-[420px] md:h-[560px]", className = "" }: { tab: "chat" | "notebook" | "warehouse" | "skills" | "history"; h?: string; className?: string }) {
  return (
    <div className={`rd-embed rd-win w-full min-w-0 max-w-full overflow-hidden rounded-[12px] bg-canvas ${h} ${className}`}>
      <WorkbenchTab tab={tab} />
    </div>
  );
}

import Workbench from "@/components/workbench/Workbench";
function WorkbenchTab({ tab }: { tab: "chat" | "notebook" | "warehouse" | "skills" | "history" }) {
  return <Workbench dime bare tab={tab} />;
}

export function Close({ children }: { children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 text-center md:px-6 md:py-36">
      <Reveal>
        <h2 className="mx-auto max-w-[900px] text-balance text-[38px] leading-[40px] md:text-[64px] md:leading-[66px]">One agent, one workspace, all your NBA research.</h2>
      </Reveal>
      <Reveal delay={100} className="mt-5">
        <p className="mx-auto max-w-[480px] text-[17px] leading-[26px] text-ink-2">You ask. Dime researches and saves the work to your files.</p>
      </Reveal>
      <Reveal delay={200} className="mt-8 flex justify-center"><Star /></Reveal>
      {children}
    </section>
  );
}
