"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { Hero } from "@/components/landing/heroes";
import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { CLight } from "@/components/v/CLight";
import { Page } from "@/components/v/kit";
import { DEMO, REPO, coverage, cta, honest, method, short, surfaces } from "@/lib/copy";
import "./landing.css";

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

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">{children}</p>;
}

export default function Home() {
  return (
    <Page v="c">
      <CLight />
      <header className="sticky top-0 z-50 h-[58px] bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-5 md:px-6">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <div className="flex items-center gap-2">
            <ButtonLink href={DEMO} variant="ink" size="pill"><span className="max-sm:hidden">Open the demo</span><span className="sm:hidden">Demo</span></ButtonLink>
            <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} /><span className="max-sm:hidden">{short.star}</span><span className="sm:hidden">Star</span></ButtonLink>
          </div>
        </nav>
      </header>
      <main>
        <Reveal><Hero /></Reveal>

        <section className="mx-auto max-w-[1320px] px-5 pt-8 md:px-6">
          <Reveal>
            <div className="rd-win overflow-hidden rounded-[14px] bg-canvas"><HeroWindow /></div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6 md:pt-32">
          <Reveal><Eyebrow>{method.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 className="mt-3 max-w-[640px] text-[32px] leading-[36px] md:text-[44px] md:leading-[46px]">{method.title}</h2></Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {method.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className="flex h-full flex-col gap-3 bg-surface p-6">
                  <span className="font-mono text-[12px] text-ink-2">{s.n}</span>
                  <span className="text-[15px] font-medium">{s.name}</span>
                  <p className="text-[13.5px] leading-[20px] text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6 md:pt-32">
          <Reveal><Eyebrow>{coverage.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 className="mt-3 text-[32px] leading-[36px] md:text-[44px] md:leading-[46px]">{coverage.title}</h2></Reveal>
          <Reveal><p className="mt-4 max-w-[520px] text-[15px] leading-[23px] text-ink-2">{coverage.note}</p></Reveal>
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {coverage.stats.map((s, i) => (
              <Reveal key={s.k} delay={i * 60}>
                <div className="flex h-full flex-col gap-2 bg-surface p-6">
                  <dt className="font-mono text-[13px] text-ink">{s.k}</dt>
                  <dd className="text-[13.5px] leading-[20px] text-ink-2">{s.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6 md:pt-32">
          <Reveal><Eyebrow>{surfaces.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 className="mt-3 max-w-[700px] text-[32px] leading-[36px] md:text-[44px] md:leading-[46px]">{surfaces.title}</h2></Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {surfaces.items.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div className="rd-card flex h-full flex-col gap-2 rounded-[14px] bg-surface p-6">
                  <span className="text-[16px] font-medium">{s.name}</span>
                  <p className="text-[14px] leading-[21px] text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-6 md:pt-32">
          <Reveal>
            <div className="mx-auto max-w-[760px] border-l-2 border-accent pl-6 md:pl-8">
              <h2 className="text-[30px] leading-[36px] md:text-[40px] md:leading-[44px]">{honest.title}</h2>
              <p className="mt-5 text-[16px] leading-[25px] text-ink-2">{honest.body}</p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto flex max-w-[1320px] flex-col items-center px-5 pb-6 pt-24 text-center md:px-6 md:pt-32">
          <Reveal><h2 className="text-[36px] leading-[38px] md:text-[52px] md:leading-[52px]">{cta.title}</h2></Reveal>
          <Reveal delay={100} className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={DEMO} variant="primary">Open the demo</ButtonLink>
              <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} />{short.star}</ButtonLink>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1320px] items-center justify-between px-5 pb-8 pt-16 text-[13px] text-ink-2 md:px-6">
        <CLogo size={18} />
        <div className="flex items-center gap-5">
          <a href={DEMO} className="transition-colors hover:text-[#2458F5]">Demo</a>
          <a href={REPO} className="transition-colors hover:text-[#2458F5]">GitHub</a>
        </div>
      </footer>
    </Page>
  );
}
