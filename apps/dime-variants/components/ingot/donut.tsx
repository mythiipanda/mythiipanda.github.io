"use client";
import { useState } from "react";
import { mix } from "./chart-kit";

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

const DEFAULT: DonutSlice[] = [
  { label: "Direct", value: 4820, color: "#fd4b23" },
  { label: "Organic search", value: 3140, color: "#4d98fe" },
  { label: "Referral", value: 1760, color: "#ff72ab" },
  { label: "Social", value: 980, color: "#f3c83d" },
];

/** Thick ring with rounded ends and 6° gaps, centre value, legend list with values and shares. */
export function Donut({ data = DEFAULT, caption = "Total visits" }: { data?: DonutSlice[]; caption?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 70;
  const T = 18;
  const gapDeg = 6;
  let start = -90;
  const arcs = data.map((d, i) => {
    const sweep = (d.value / total) * 360 - gapDeg;
    const a0 = ((start + gapDeg / 2) * Math.PI) / 180;
    const a1 = ((start + gapDeg / 2 + sweep) * Math.PI) / 180;
    start += (d.value / total) * 360;
    const p = (a: number) => (90 + R * Math.cos(a)).toFixed(2) + " " + (90 + R * Math.sin(a)).toFixed(2);
    return { d: "M" + p(a0) + " A" + R + " " + R + " 0 " + (sweep > 180 ? 1 : 0) + " 1 " + p(a1), color: d.color, i };
  });
  const shown = active === null ? null : data[active];
  return (
    <div className="flex w-full flex-wrap items-center gap-6">
      <svg viewBox="0 0 180 180" className="w-40 shrink-0" role="img" aria-label={caption}>
        <circle cx="90" cy="90" r={R} fill="none" stroke="#f4f4f5" strokeWidth={T} />
        {arcs.map((a) => (
          <path
            key={a.i}
            d={a.d}
            fill="none"
            stroke={a.color}
            strokeWidth={active === a.i ? T + 4 : T}
            strokeLinecap="round"
            opacity={active === null || active === a.i ? 1 : 0.35}
            className="cursor-pointer transition-[opacity,stroke-width] duration-150"
            onMouseEnter={() => setActive(a.i)}
            onMouseLeave={() => setActive(null)}
          />
        ))}
        <text x="90" y="86" textAnchor="middle" fontSize="22" fontWeight="500" fill="#202020">
          {(shown ? shown.value : total).toLocaleString()}
        </text>
        <text x="90" y="106" textAnchor="middle" fontSize="11" fill="#747474">
          {shown ? shown.label : caption}
        </text>
      </svg>
      <ul className="flex min-w-48 flex-1 flex-col gap-2.5">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2.5 text-[13px]" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <span className="size-2.5 rounded-[3px]" style={{ background: "linear-gradient(" + mix(d.color, 0.13) + "," + d.color + ")" }} />
            <span className="flex-1 text-fu-body">{d.label}</span>
            <span className="tabular-nums text-fu-muted">{Math.round((d.value / total) * 100)}%</span>
            <span className="w-14 text-right font-medium tabular-nums text-fu-ink">{d.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
