"use client";

import { useState } from "react";
import { LUKA, LUKA_BINS } from "@/lib/exhibits";
import { HEX, SEASON_BINS, THREE_SHARE } from "@/lib/shots";

const share = (season: number) => THREE_SHARE.find((row) => row[0] === season)!;
const league = (col: 2 | 3) => SEASON_BINS.map((bin) => [bin[0], bin[1], bin[col]] as [number, number, number]);

const VIEWS = [
  { key: "2010", label: "League 2009-10", bins: league(2), stats: [[`${share(2010)[1].toFixed(1)}%`, "threes"], [`${share(2010)[2].toFixed(1)}%`, "midrange"]] },
  { key: "2026", label: "League 2025-26", bins: league(3), stats: [[`${share(2026)[1].toFixed(1)}%`, "threes"], [`${share(2026)[2].toFixed(1)}%`, "midrange"]] },
  { key: "luka", label: LUKA.name, bins: LUKA_BINS, stats: [[LUKA.shots.toLocaleString("en-US"), "shots"], [`${LUKA.three.toFixed(1)}%`, "threes"]] },
];

const CAP = 45;
const radius = (f: number) => (f <= 0 ? 0 : Math.max(1.3, HEX * 1.1 * Math.min(1, Math.sqrt(f / CAP))));

export function Court({ stroke }: { stroke: string }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth="1.2" vectorEffect="non-scaling-stroke">
      <path d="M-250 -47.5H250" />
      <path d="M-220 -47.5V92.5A237.5 237.5 0 0 0 220 92.5V-47.5" />
      <path d="M-80 -47.5V142.5H80V-47.5" />
      <path d="M-60 142.5A60 60 0 0 0 60 142.5" />
      <circle cx="0" cy="0" r="7.5" />
      <path d="M-30 -7.5H30" />
    </g>
  );
}

export function ShotMap({ fill }: { fill?: boolean }) {
  const [view, setView] = useState(VIEWS[1]);
  return (
    <figure className={`m-0 ${fill ? "lg:flex lg:h-full lg:flex-col" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Shots to plot" className="inline-flex max-w-full flex-wrap rounded-[10px] bg-inset p-1">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              aria-pressed={view.key === v.key}
              onClick={() => setView(v)}
              className="num h-11 rounded-[8px] px-4 text-[14px] font-medium text-ink-2 transition-[background-color,color,box-shadow] duration-150 aria-pressed:bg-surface aria-pressed:text-ink aria-pressed:shadow-[0_0_0_1px_var(--color-line),0_1px_2px_oklch(0_0_0/0.06)]"
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="num text-[14px] text-ink-2" aria-live="polite">
          {view.stats.map(([value, unit], i) => (
            <span key={unit}>
              {i > 0 && " · "}
              <span className="font-medium text-ink">{value}</span> {unit}
            </span>
          ))}
        </p>
      </div>
      <svg viewBox="-258 -56 516 404" className={`mt-5 block w-full ${fill ? "h-auto lg:min-h-0 lg:flex-1" : "h-auto"}`} role="img" aria-label={`Where shots were taken: ${view.label}. Larger dots mean more shots from that spot.`} preserveAspectRatio={fill ? "xMidYMid slice" : undefined}>
        <Court stroke="var(--line-strong)" />
        <g key={view.key === "luka" ? "luka" : "league"} fill="var(--color-accent)">
          {view.bins.map((bin) => (
            <circle key={`${bin[0]}:${bin[1]}`} className="dot" cx={bin[0]} cy={bin[1]} r={radius(bin[2])} />
          ))}
        </g>
      </svg>
    </figure>
  );
}
