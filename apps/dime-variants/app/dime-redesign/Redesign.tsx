"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Geist } from "next/font/google";
import HeroWindow from "@/components/dime/HeroWindow";
import { GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";
import "./redesign.css";

const geist = Geist({ subsets: ["latin"], display: "swap" });

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

function LitWords({ lines }: { lines: string[] }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lit, setLit] = useState<Record<number, boolean>>({});
  const words = lines.flatMap((line, li) => line.split(" ").map((w) => ({ w, li })));
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setLit((prev) => {
          const next = { ...prev };
          entries.forEach((e) => {
            const i = Number((e.target as HTMLElement).dataset.i);
            next[i] = e.isIntersecting || e.boundingClientRect.top < 0;
          });
          return next;
        });
      },
      { rootMargin: "0px 0px -42% 0px" },
    );
    refs.current.forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, []);
  let prevLine = -1;
  return (
    <p className="rd-h mx-auto max-w-[680px] text-4xl font-semibold tracking-tight md:text-6xl">
      {words.map(({ w, li }, i) => {
        const br = prevLine !== -1 && li !== prevLine;
        prevLine = li;
        return (
          <span key={i}>
            {br ? <br /> : null}
            <span ref={(n) => { refs.current[i] = n; }} data-i={i} className={`rd-word ${lit[i] ? "is-lit" : ""}`}>{w}</span>{" "}
          </span>
        );
      })}
    </p>
  );
}

const links = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "GitHub", href: REPO },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className={open ? "rd-open" : ""}>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center">
        <nav aria-label="Primary" className="rd-ease mt-6 flex w-max items-center gap-6 rounded-full bg-[#181818]/80 px-6 py-3 backdrop-blur-3xl transition-all duration-700">
          <a href="#top" className="text-base font-semibold lowercase">dime.</a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="relative h-6 w-6">
            <span className={`rd-bar absolute left-1 right-1 top-2 h-0.5 bg-white ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`rd-bar absolute bottom-2 left-1 right-1 h-0.5 bg-white ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </nav>
      </div>
      <div className={`rd-ease fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black/80 backdrop-blur-3xl transition-all duration-700 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        {links.map((l, i) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }} className="rd-link text-4xl font-semibold tracking-tight">
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export function Redesign() {
  return (
    <div id="top" className={`rd ${geist.className}`}>
      <a href="#main" className="rd-skip text-sm font-semibold">Skip to content</a>
      <Nav />
      <main id="main">
        <section className="mx-auto flex max-w-[1320px] flex-col items-center px-3 pb-16 pt-24 text-center md:px-6 md:pt-32">
          <Reveal>
            <h1 className="rd-grad rd-h mx-auto max-w-[680px] text-5xl font-semibold tracking-tight md:text-7xl">Harvey for NBA Analysts</h1>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <p className="rd-p mx-auto max-w-[680px] text-lg text-[#9b9b9b]">Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.</p>
          </Reveal>
          <Reveal delay={200} className="mt-8">
            <a href={REPO} className="rd-btn inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-base font-semibold text-black hover:bg-[#e6e6e6]">
              <GithubMark size={16} />
              {short.star}
            </a>
          </Reveal>
        </section>

        <section id="product" className="mx-auto max-w-[1320px] scroll-mt-24 px-3 pb-24 md:px-6">
          <Reveal>
            <div className="rounded-2xl bg-[#181818] p-2">
              <div data-v="c" className="overflow-hidden rounded-lg bg-canvas text-ink">
                <HeroWindow />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="how" className="mx-auto max-w-[1320px] scroll-mt-24 px-3 pb-24 md:px-6">
          <Reveal>
            <h2 className="rd-h mx-auto max-w-[680px] text-center text-3xl font-semibold tracking-tight md:text-4xl">Quick answers. Saved work. Every run kept.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {copy.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="h-full rounded-2xl bg-[#181818] p-6 transition-colors duration-700 hover:bg-[#1f1f1f]">
                  <h3 className="rd-h text-xl font-semibold">{p.title}</h3>
                  <p className="rd-p mt-3 text-base text-[#9b9b9b]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-3 py-24 text-center md:px-6 md:py-32">
          <LitWords lines={["You ask about a lineup.", "Dime shows the SQL under the answer."]} />
        </section>

        <section className="mx-auto flex max-w-[1320px] flex-col items-center px-3 pb-24 text-center md:px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Coming soon</h2>
          </Reveal>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1320px] items-center justify-between px-3 pb-12 text-sm text-[#9b9b9b] md:px-6">
        <span className="font-semibold lowercase text-white">dime.</span>
        <a href={REPO} className="transition-colors duration-700 hover:text-white">GitHub</a>
      </footer>
    </div>
  );
}
