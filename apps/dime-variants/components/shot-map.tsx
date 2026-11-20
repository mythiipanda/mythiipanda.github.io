"use client";

import { useState } from "react";
import { HEX, SEASON_BINS, THREE_SHARE } from "@/lib/shots";

const SEASONS = [
  { key: 2010, label: "2009-10", col: 2 },
  { key: 2026, label: "2025-26", col: 3 },
] as const;

const CAP = 70;
const radius = (f: number) => (f <= 0 ? 0 : Math.max(0.9, HEX * 0.92 * Math.min(1, Math.sqrt(f / CAP))));

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

export function ShotMap() {
  const [season, setSeason] = useState<(typeof SEASONS)[number]>(SEASONS[1]);
  const share = THREE_SHARE.find((row) => row[0] === season.key)!;
  return (
    <figure className="m-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Season" className="inline-flex rounded-[10px] bg-inset p-1">
          {SEASONS.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={season.key === s.key}
              onClick={() => setSeason(s)}
              className="num h-11 rounded-[8px] px-4 text-[14px] font-medium text-ink-2 transition-[background-color,color,box-shadow] duration-150 aria-pressed:bg-surface aria-pressed:text-ink aria-pressed:shadow-[0_0_0_1px_var(--color-line),0_1px_2px_oklch(0_0_0/0.06)]"
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="num text-[14px] text-ink-2" aria-live="polite">
          <span className="font-medium text-ink">{share[1].toFixed(1)}%</span> threes ·{" "}
          <span className="font-medium text-ink">{share[2].toFixed(1)}%</span> midrange
        </p>
      </div>
      <svg viewBox="-258 -56 516 392" className="mt-5 block h-auto w-full" role="img" aria-label={`Where NBA shots were taken in ${season.label}. Larger dots mean more shots from that spot.`}>
        <Court stroke="var(--color-line)" />
        <g fill="var(--color-accent)">
          {SEASON_BINS.map((bin) => (
            <circle key={`${bin[0]}:${bin[1]}`} className="dot" cx={bin[0]} cy={bin[1]} r={radius(bin[season.col])} />
          ))}
        </g>
      </svg>
    </figure>
  );
}
