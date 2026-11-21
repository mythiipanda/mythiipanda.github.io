import type { ReactNode } from "react";
import { GithubMark } from "@/components/mark";
import { PlatformWindow } from "@/components/stage/platform-window";
import { REPO } from "@/lib/site";

const LEAD = "A front-office workspace on your machine. Ask in plain English; Dime writes the SQL, runs it on 17 seasons of data, and keeps the work.";

function CTAs() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={REPO} className="btn btn-primary">
        <GithubMark size={17} />
        Get Dime on GitHub
      </a>
      <a href="#quickstart" className="btn btn-ghost">Quickstart</a>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="h-[560px] min-w-0 overflow-hidden">{children}</div>;
}

function Variant({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section className="relative border-b border-line">
      <span className="pointer-events-none absolute right-4 top-4 z-20 font-mono text-[11px] tracking-widest text-ink-3">{id}</span>
      {children}
    </section>
  );
}

export default function Variants() {
  return (
    <main>
      {/* A — float: window as a soft card on the paper ground, airy hero */}
      <Variant id="A">
        <div className="wrap pb-20 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
          <div className="mx-auto mt-14 max-w-[1120px] rounded-[18px] bg-canvas shadow-[0_1px_2px_rgba(20,20,25,0.06),0_12px_40px_-12px_rgba(20,20,25,0.22),0_0_0_1px_var(--line)]">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* B — theater: full-width dark letterbox band carries the window */}
      <Variant id="B">
        <div className="wrap pb-14 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
        </div>
        <div className="bg-[#101014] px-4 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_-20px_rgba(0,0,0,0.7)]">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* C — compact editorial: tighter type, left-aligned, window closer to copy */}
      <Variant id="C">
        <div className="wrap pb-16 pt-14 md:pt-20">
          <div className="flex max-w-[860px] flex-col items-start gap-6">
            <h1 className="display enter max-w-[16ch] text-[clamp(2.6rem,5vw,4rem)]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede max-w-[46ch]">{LEAD}</p>
            <CTAs />
          </div>
          <div className="window window-light mt-10">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>

      {/* D — plate + satellite: tinted plate behind the window, one card straddling the edge */}
      <Variant id="D">
        <div className="wrap pb-20 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
          <div className="relative mx-auto mt-14 max-w-[1120px]">
            <div className="absolute inset-x-8 -bottom-6 top-10 rounded-[24px] bg-accent-tint/70" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line),0_20px_60px_-24px_rgba(20,20,25,0.28)]">
              <Shell><PlatformWindow /></Shell>
            </div>
            <div className="absolute -left-3 bottom-14 hidden w-[220px] rounded-[12px] bg-surface p-3.5 shadow-[0_0_0_1px_var(--line),0_10px_30px_-8px_rgba(20,20,25,0.25)] md:block">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-3">
                <span>midseason-review</span><span className="text-accent-ink">exported</span>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-5 text-ink-2">Kennard leads at 68.9% TS; Jokić the workload outlier at 28.9% usage.</p>
            </div>
          </div>
        </div>
      </Variant>

      {/* E — rail: pane switcher as a left rail of names, top bar keeps only actions */}
      <Variant id="E">
        <div className="wrap pb-20 pt-16 md:pt-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
            <h1 className="display enter max-w-[14ch]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede mx-auto">{LEAD}</p>
            <CTAs />
          </div>
          <div className="window window-light mt-14">
            <Shell><PlatformWindow variant="rail" /></Shell>
          </div>
        </div>
      </Variant>

      {/* F — split: headline left, window right, linear-style two-column hero */}
      <Variant id="F">
        <div className="wrap grid items-center gap-12 pb-20 pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:pt-24">
          <div className="flex flex-col items-start gap-6">
            <h1 className="display enter text-[clamp(2.6rem,4.6vw,4.2rem)]">The open-source <em>NBA analyst.</em></h1>
            <p className="lede">{LEAD}</p>
            <CTAs />
          </div>
          <div className="overflow-hidden rounded-[14px] shadow-[0_0_0_1px_var(--line),0_20px_60px_-24px_rgba(20,20,25,0.3)]">
            <Shell><PlatformWindow /></Shell>
          </div>
        </div>
      </Variant>
    </main>
  );
}
