"use client";

import { useEffect, useState } from "react";
import { AppShell } from "./app-shell";
import { PANES } from "./stills";

const CYCLE_MS = 5000;

export function PlatformWindow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((v) => (v + 1) % PANES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const pane = PANES[index];

  const tabs = (
    <div role="tablist" aria-label="Workspace surfaces" className="flex h-full items-stretch overflow-x-auto">
      {PANES.map((s, k) => (
        <button
          key={s.id}
          role="tab"
          aria-selected={k === index}
          onClick={() => {
            setIndex(k);
            setPaused(true);
          }}
          className={`shrink-0 border-b-2 px-3 text-[12.5px] font-medium transition-colors md:px-3.5 ${
            k === index ? "border-accent text-ink" : "border-transparent text-ink-3 hover:text-ink-2"
          }`}
        >
          {s.label}
        </button>
      ))}
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
