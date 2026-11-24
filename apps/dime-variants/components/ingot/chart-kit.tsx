/**
 * Ingot chart kit — the bar "finish" every chart shares:
 * vertical gradient (top ~13% lighter), barely-visible inside stroke, 1px top highlight,
 * tiny drop shadow, optional 45° hatch for tint / forecast bars.
 */
import { useId } from "react";

export function mix(hex: string, amount: number, to = "#ffffff") {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex);
  const b = p(to);
  return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, "0")).join("");
}

export function useChartIds() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return { grad: (k: string) => "g" + id + k, hatch: "h" + id, shadow: "s" + id, area: (k: string) => "a" + id + k };
}
export type ChartIds = ReturnType<typeof useChartIds>;

export function ChartDefs({ ids, colors }: { ids: ChartIds; colors: Record<string, string> }) {
  return (
    <defs>
      {Object.entries(colors).map(([k, c]) => (
        <linearGradient key={k} id={ids.grad(k)} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={mix(c, 0.13)} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      ))}
      {Object.entries(colors).map(([k, c]) => (
        <linearGradient key={"a" + k} id={ids.area(k)} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity="0.16" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      ))}
      <pattern id={ids.hatch} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="1.3" height="5" fill="#fff" opacity="0.6" />
      </pattern>
      <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="1" stdDeviation="0.7" floodColor="#0d0d12" floodOpacity="0.09" />
      </filter>
    </defs>
  );
}

export interface BarProps {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  color: string;
  ids: ChartIds;
  gradKey: string;
  tint?: boolean;
  hatch?: boolean;
  opacity?: number;
}

/** One finished bar / capsule / segment. */
export function Bar({ x, y, w, h, r = 4, color, ids, gradKey, tint, hatch, opacity = 1 }: BarProps) {
  if (h <= 0 || w <= 0) return null;
  const rr = Math.min(r, w / 2, h / 2);
  const stroke = tint ? mix(color, 0.05, "#000000") : mix(color, 0.22, "#000000");
  return (
    <g filter={"url(#" + ids.shadow + ")"} opacity={opacity}>
      <rect x={x} y={y} width={w} height={h} rx={rr} fill={tint ? mix(color, 0.78) : "url(#" + ids.grad(gradKey) + ")"} />
      {hatch && <rect x={x} y={y} width={w} height={h} rx={rr} fill={"url(#" + ids.hatch + ")"} />}
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={Math.max(rr - 0.5, 0)} fill="none" stroke={stroke} strokeOpacity={tint ? 0.2 : 0.38} />
      {h > 3 && w > 2 * rr && <line x1={x + rr} x2={x + w - rr} y1={y + 1.5} y2={y + 1.5} stroke="#fff" strokeOpacity={tint ? 0.55 : 0.3} />}
    </g>
  );
}

export function GridLines({ width, height, rows, left = 0 }: { width: number; height: number; rows: number; left?: number }) {
  return (
    <g>
      {Array.from({ length: rows + 1 }, (_, i) => {
        const y = (height / rows) * i;
        const base = i === rows;
        return <line key={i} x1={left} x2={width} y1={y} y2={y} stroke={base ? "#e2e2e5" : "#ececee"} strokeDasharray={base ? undefined : "3 3"} />;
      })}
    </g>
  );
}

export function TipCard({ title, rows, className = "" }: { title: string; rows: { label: string; value: string; color: string }[]; className?: string }) {
  return (
    <div className={"pointer-events-none min-w-40 rounded-[10px] border border-[#e4e4e6] bg-white px-3 py-2.5 shadow-[0_8px_20px_-4px_rgb(13_13_18/0.08),0_1px_2px_rgb(13_13_18/0.05)] " + className}>
      <p className="text-[11px] text-fu-muted">{title}</p>
      <div className="mt-1.5 flex flex-col gap-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2 text-xs">
            <span className="size-2 rounded-[3px]" style={{ background: r.color }} />
            <span className="flex-1 text-fu-muted">{r.label}</span>
            <span className="font-medium tabular-nums text-fu-ink">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Deterministic pseudo-random walk so demo data looks real (dense, irregular). */
export function seededSeries(seed: number, n: number, start: number, drift: number, vol: number) {
  let s = seed;
  let v = start;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280 - 0.5;
    v = Math.max(start * 0.2, v + drift + r * vol);
    out.push(Math.round(v));
  }
  return out;
}
