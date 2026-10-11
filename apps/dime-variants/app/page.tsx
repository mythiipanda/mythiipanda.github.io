"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { CLight } from "@/components/v/CLight";
import { CSetup } from "@/components/v/CSetup";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { CLogo } from "@/components/v/CLogo";
import HeroWindow from "@/components/dime/HeroWindow";
import { Page } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
    <Page v="c">
      <CLight />
      <header className={`sticky top-0 z-50 h-[58px] border-b bg-canvas transition-[border-color] duration-200 ${scrolled ? "border-line" : "border-transparent"}`}>
        <nav className="mx-auto grid h-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <span />
          <div className="col-start-3 flex items-center gap-2"><ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} /><span className="max-sm:hidden">{short.star}</span><span className="sm:hidden">Star</span></ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="relative mx-auto max-w-[1320px] px-5 pb-12 pt-10 md:px-6 lg:pt-14">
          <svg aria-hidden="true" className="pointer-events-none absolute right-[10px] top-[26px] hidden lg:block" width="150" height="104" viewBox="0 0 150 104" fill="none">
            <path d="M18 78 C 52 76, 66 60, 78 34" stroke="#2458F5" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round"/>
            <path d="M78 34 l-9 2 M78 34 l-1 9" stroke="#2458F5" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="16" cy="80" r="5" stroke="#2458F5" strokeOpacity="0.4" strokeWidth="1.5"/>
            <path d="M108 62 l9 9 M117 62 l-9 9" stroke="#2458F5" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M124 22 l9 9 M133 22 l-9 9" stroke="#2458F5" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
            <BlurFade className="lg:col-span-7" direction="up" offset={8} duration={0.5}><h1 className="text-[44px] leading-[46px] md:text-[72px] md:leading-[74px]">Harvey for NBA Analysts</h1></BlurFade>
            <BlurFade className="lg:col-span-5" direction="up" offset={8} duration={0.5} delay={0.08}><div>
              <p className="max-w-[510px] text-[17px] leading-[26px] text-ink-2">Dime is your NBA analyst. It works in your projects, runs your models, and <span className="c-hl">shows its work</span>.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
              </div>
            </div></BlurFade>
          </div>
          <HeroWindow />
        </section>
        <CSetup />
      </main>
      <footer className="mx-auto max-w-[1320px] px-5 pb-10 pt-4 md:px-6">
        <div className="flex flex-col items-center gap-0">
          <div className="flex w-full items-center justify-between text-[13px] text-ink-3">
            <CLogo size={18} />
            <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
          </div>
        </div>
      </footer>
    </Page>
    </MotionConfig>
  );
}
