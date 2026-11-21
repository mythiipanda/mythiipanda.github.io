"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "./app-shell";
import { PANES } from "./stills";

const CYCLE_MS = 5000;

export function PlatformWindow({ variant = "tabs" }: { variant?: "tabs" | "rail" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState({ left: 8, width: 0 });

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((v) => (v + 1) % PANES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[index];
      if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    const t = window.setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [index]);

  const pane = PANES[index];

  if (variant === "rail") {
    return (
      <div className="flex h-full min-h-0">
        <div className="flex w-[132px] shrink-0 flex-col gap-0.5 border-r border-line bg-field px-2 py-3">
          {PANES.map((s, k) => (
            <button
              key={s.id}
              onClick={() => {
                setIndex(k);
                setPaused(true);
              }}
              className={`flex h-8 items-center rounded-[7px] px-2.5 text-left text-[12.5px] font-medium ${
                k === index ? "bg-hover-2 text-ink" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <AppShell active={pane.active} crumb={pane.crumb} actions={pane.actions} paneClass={pane.paneClass}>
            <div key={pane.id} className="pane-in flex h-full min-h-0 flex-col">
              {pane.body}
            </div>
          </AppShell>
        </div>
      </div>
    );
  }

  const tabs = (
    <div role="tablist" aria-label="Workspace surfaces" className="relative flex h-full items-stretch overflow-x-auto">
      {PANES.map((s, k) => (
        <button
          key={s.id}
          ref={(el) => {
            tabRefs.current[k] = el;
          }}
          role="tab"
          aria-selected={k === index}
          onClick={() => {
            setIndex(k);
            setPaused(true);
          }}
          className={`shrink-0 px-3 text-[12.5px] font-medium transition-colors md:px-3.5 ${
            k === index ? "text-ink" : "text-ink-3 hover:text-ink-2"
          }`}
        >
          {s.label}
        </button>
      ))}
      <span
        aria-hidden
        className="absolute bottom-0 h-[2px] rounded-full bg-accent transition-[left,width] duration-300 ease-out"
        style={{ left: ind.left, width: ind.width }}
      />
    </div>
  );

  return (
    <AppShell active={pane.active} crumb={pane.crumb} actions={pane.actions} paneClass={pane.paneClass} tabs={tabs}>
      <div key={pane.id} className="pane-in flex h-full min-h-0 flex-col">
        {pane.body}
      </div>
    </AppShell>
  );
}
