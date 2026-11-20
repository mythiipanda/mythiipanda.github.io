"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { CLight } from "@/components/v/CLight";
import { Page } from "@/components/v/kit";
import { DEMO, REPO, coverage, cta, hero, honest, method, surfaces } from "@/lib/copy";
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
  return <p className="font-mono text-[12px] tracking-[0.02em] text-ink-2">{children}</p>;
}

function Section({ children }: { children: ReactNode }) {
  return <section className="mx-auto max-w-[1200px] border-t border-line px-5 py-20 md:px-8 md:py-28">{children}</section>;
}

function CellGrid({ children, cols = "lg:grid-cols-4" }: { children: ReactNode; cols?: string }) {
  return <div className={`grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 ${cols}`}>{children}</div>;
}

export default function Home() {
  return (
    <Page v="g">
      <CLight />
      <header className="sticky top-0 z-50 h-[60px] border-b border-line bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <div className="flex items-center gap-2">
            <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} /><span className="max-sm:hidden">Star on GitHub</span><span className="sm:hidden">Star</span></ButtonLink>
            <ButtonLink href={DEMO} variant="ink" size="pill"><span className="max-sm:hidden">Open the demo</span><span className="sm:hidden">Demo</span></ButtonLink>
          </div>
        </nav>
      </header>
      <main>
        <section className="mx-auto max-w-[1200px] px-5 pt-20 md:px-8 md:pt-28">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-[720px] text-[44px] leading-[1.04] tracking-[-0.01em] md:text-[68px]">{hero.h1}</h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[27px] text-ink-2">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={DEMO} variant="ink" size="hero">Open the demo</ButtonLink>
              <ButtonLink href={REPO} variant="ghost" size="hero"><GithubMark size={15} />Star on GitHub</ButtonLink>
            </div>
            <p className="mt-9 font-mono text-[12px] text-ink-2">{hero.proof}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rd-win mt-14 overflow-hidden rounded-lg bg-canvas"><HeroWindow /></div>
          </Reveal>
        </section>

        <Section>
          <Reveal><Eyebrow>{method.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 className="mt-4 max-w-[560px] text-[32px] leading-[1.08] md:text-[44px]">{method.title}</h2></Reveal>
          <Reveal delay={80}>
            <div className="mt-12"><CellGrid>
              {method.steps.map((s) => (
                <div key={s.n} className="flex h-full flex-col gap-3 bg-canvas p-6">
                  <span className="font-mono text-[12px] text-ink-2">{s.n}</span>
                  <span className="text-[15px] font-medium tracking-[-0.005em]">{s.name}</span>
                  <p className="text-[13.5px] leading-[20px] text-ink-2">{s.body}</p>
                </div>
              ))}
            </CellGrid></div>
          </Reveal>
        </Section>

        <Section>
          <Reveal><Eyebrow>{coverage.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 className="mt-4 text-[32px] leading-[1.08] md:text-[44px]">{coverage.title}</h2></Reveal>
          <Reveal><p className="mt-5 max-w-[520px] text-[15px] leading-[23px] text-ink-2">{coverage.note}</p></Reveal>
          <Reveal delay={80}>
            <div className="mt-12"><CellGrid cols="lg:grid-cols-4">
              {coverage.stats.map((s) => (
                <div key={s.k} className="flex h-full flex-col gap-2 bg-canvas p-6">
                  <span className="font-mono text-[13px]">{s.k}</span>
                  <span className="text-[13.5px] leading-[20px] text-ink-2">{s.v}</span>
                </div>
              ))}
            </CellGrid></div>
          </Reveal>
        </Section>

        <Section>
          <Reveal><Eyebrow>{surfaces.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 className="mt-4 max-w-[640px] text-[32px] leading-[1.08] md:text-[44px]">{surfaces.title}</h2></Reveal>
          <Reveal delay={80}>
            <div className="mt-12"><CellGrid>
              {surfaces.items.map((s) => (
                <div key={s.name} className="flex h-full flex-col gap-2 bg-canvas p-6">
                  <span className="text-[15px] font-medium tracking-[-0.005em]">{s.name}</span>
                  <p className="text-[13.5px] leading-[20px] text-ink-2">{s.body}</p>
                </div>
              ))}
            </CellGrid></div>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <h2 className="max-w-[780px] text-[30px] leading-[1.15] md:text-[40px] md:leading-[1.15]">{honest.title}</h2>
            <p className="mt-6 max-w-[640px] text-[16px] leading-[25px] text-ink-2">{honest.body}</p>
          </Reveal>
        </Section>

        <section className="mx-auto flex max-w-[1200px] flex-col items-start border-t border-line px-5 pb-10 pt-20 md:px-8 md:pt-28">
          <Reveal><h2 className="text-[36px] leading-[1.05] md:text-[56px]">{cta.title}</h2></Reveal>
          <Reveal delay={80} className="mt-9">
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href={DEMO} variant="ink" size="hero">Open the demo</ButtonLink>
              <ButtonLink href={REPO} variant="ghost" size="hero"><GithubMark size={15} />Star on GitHub</ButtonLink>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1200px] items-center justify-between px-5 pb-10 pt-8 text-[13px] text-ink-2 md:px-8">
        <CLogo size={18} />
        <div className="flex items-center gap-6">
          <a href={DEMO} className="transition-colors hover:text-ink">Demo</a>
          <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
        </div>
      </footer>
    </Page>
  );
}
