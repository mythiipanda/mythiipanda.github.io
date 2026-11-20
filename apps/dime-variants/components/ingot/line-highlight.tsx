"use client";
import { useMemo, useState } from "react";
import { ChartDefs, GridLines, TipCard, mix, seededSeries, useChartIds } from "./chart-kit";

export interface LineHighlightProps {
  data?: number[];
  compare?: number[];
  color?: string;
  title?: string;
  /** index of the annotated event */
  event?: number;
  eventLabel?: string;
}

/** Dense, almost-straight trend line + soft area, a dashed comparison, a dotted highlight band and one annotation. */
export function LineHighlight({ data, compare, color = "#fd4b23", title = "Active users", event = 33, eventLabel = "Launch week +1,015" }: LineHighlightProps) {
  const ids = useChartIds();
  const series = useMemo(() => data ?? seededSeries(7, 52, 4200, 120, 900), [data]);
  const prev = useMemo(() => compare ?? seededSeries(19, 52, 3900, 70, 700), [compare]);
  const [hover, setHover] = useState<number | null>(null);
  const W = 560;
  const H = 200;
  const all = [...series, ...prev];
  const min = Math.min(...all) * 0.9;
  const max = Math.max(...all) * 1.08;
  const x = (i: number) => (i / (series.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const path = (s: number[]) => s.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
  const area = path(series) + " L" + W + " " + H + " L0 " + H + " Z";
  const ev = hover ?? event;
  return (
    <div className="relative w-full">
      <svg
        viewBox={"0 0 " + W + " " + (H + 24)}
        className="w-full overflow-visible"
        role="img"
        aria-label={title + " over 52 weeks"}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const i = Math.round(((e.clientX - r.left) / r.width) * (series.length - 1));
          setHover(Math.max(0, Math.min(series.length - 1, i)));
        }}
      >
        <ChartDefs ids={ids} colors={{ a: color }} />
        <GridLines width={W} height={H} rows={4} />
        <path d={area} fill={"url(#" + ids.area("a") + ")"} />
        <path d={path(prev)} fill="none" stroke={mix(color, 0.55)} strokeWidth="1.4" strokeDasharray="4 4" />
        <path d={path(series)} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" style={{ filter: "drop-shadow(0 2px 3px " + mix(color, 0.5) + "66)" }} />
        <rect x={x(ev) - 10} y={y(series[ev])} width={20} height={H - y(series[ev])} fill={color} opacity="0.07" rx="4" />
        <line x1={x(ev)} x2={x(ev)} y1={y(series[ev])} y2={H} stroke={color} strokeDasharray="2 3" />
        <line x1={x(ev) - 6} x2={x(ev) + 6} y1={H} y2={H} stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx={x(ev)} cy={y(series[ev])} r="4.5" fill="#fff" stroke={color} strokeWidth="2" />
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m, i) => (
          <text key={m} x={(i / 6) * W + 4} y={H + 18} fontSize="11" fill="#8b8b91">
            {m}
          </text>
        ))}
      </svg>
      {hover === null ? (
        <div className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-full bg-fu-ink px-2.5 py-1 text-[11px] font-medium text-white" style={{ left: (x(event) / W) * 100 + "%", top: (y(series[event]) / (H + 24)) * 100 - 3 + "%" }}>
          {eventLabel}
        </div>
      ) : (
        <TipCard
          className="absolute top-0"
          title={"Week " + (hover + 1)}
          rows={[
            { label: "This year", value: series[hover].toLocaleString(), color },
            { label: "Last year", value: prev[hover].toLocaleString(), color: mix(color, 0.55) },
          ]}
        />
      )}
    </div>
  );
}
