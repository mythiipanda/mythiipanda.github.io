"use client";

import { useState } from "react";
import ChatEmbed from "./chat-embed";
import { scenarios } from "@/lib/replay";

export default function Demo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [tick, setTick] = useState(0);

  function handleReplay() {
    setTick((t) => t + 1);
  }

  function select(id: string) {
    if (id !== activeId) {
      setActiveId(id);
    }
    setTick((t) => t + 1);
  }

  return (
    <div>
      <ChatEmbed
        key={`${activeId}-${tick}`}
        activeId={activeId}
        onReplay={handleReplay}
      />
      <div className="mt-6 border-t border-line" role="list">
        {scenarios.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              role="listitem"
              aria-pressed={active}
              onClick={() => select(s.id)}
              className={`flex min-h-[44px] w-full items-center gap-3 border-b border-line py-3 text-left text-[14px] leading-relaxed transition-colors duration-100 hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] ${
                active ? "font-medium text-ink" : "text-ink-2"
              }`}
            >
              <span
                aria-hidden
                className={`h-4 w-0.5 shrink-0 rounded-full ${
                  active ? "bg-accent" : "bg-line-strong"
                }`}
              />
              <span className="min-w-0 flex-1">{s.question}</span>
              <span className="shrink-0 font-mono text-[11px] text-ink-3">
                {s.noun}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
