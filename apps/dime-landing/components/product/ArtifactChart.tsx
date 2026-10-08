"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

export type ChartSeries = { name: string; tone: "ink" | "muted"; values: number[] };

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function formatBarValue(value: ReactNode) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }
  return String(value ?? "");
}

export default function ArtifactChart({
  series,
  height = 180,
  footnote,
  kind = "line",
  labels,
}: {
  series: ChartSeries[];
  height?: number;
  footnote?: string;
  kind?: "line" | "bars";
  labels?: string[];
}) {
  const narrow = useMedia("(max-width: 479px)");

  if (kind === "bars") {
    const count = Math.max(...series.map((s) => s.values.length));
    const rowLabels = Array.from(
      { length: count },
      (_, i) => labels?.[i] ?? `${i + 1}`
    );
    const data = rowLabels.map((label, i) => {
      const row: Record<string, string | number> = { label };
      for (const s of series) {
        row[s.name] = s.values[i] ?? 0;
      }
      return row;
    });
    const config: ChartConfig = Object.fromEntries(
      series.map((s) => [s.name, { label: s.name }])
    );
    const effectiveHeight = narrow ? Math.max(height, 220) : height;
    const all = series.flatMap((s) => s.values);
    const rawMin = Math.min(...all);
    const rawMax = Math.max(...all);

    return (
      <div className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {series.map((s) => (
            <span
              key={s.name}
              className="flex min-w-0 max-w-full items-center gap-1.5 text-[11.5px] text-ink-2"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-[2px] ${s.tone === "ink" ? "bg-ink" : "bg-ink-3"}`}
              />
              <span className="min-w-0 break-words">{s.name}</span>
            </span>
          ))}
          <span className="ml-auto shrink-0 font-mono text-[11px] tabular-nums text-ink-3">
            {rawMin.toFixed(0)}–{rawMax.toFixed(0)}
          </span>
        </div>
        <ChartContainer
          config={config}
          className="mt-2 aspect-auto w-full"
          style={{ height: effectiveHeight }}
        >
          <BarChart layout="vertical" data={data} margin={{ left: 0, right: 40, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} stroke="var(--line)" strokeWidth={1} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickCount={narrow ? 4 : 6}
              tick={{ fontSize: 11, fill: "var(--ink-3)" }}
            />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{ fontSize: 11, fill: "var(--ink-2)" }}
            />
            {series.map((s) => (
              <Bar
                key={s.name}
                dataKey={s.name}
                fill={s.tone === "ink" ? "var(--ink)" : "var(--ink-3)"}
                radius={[0, 6, 6, 0]}
                barSize={16}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey={s.name}
                  position="right"
                  fontSize={11}
                  fill="var(--ink-2)"
                  formatter={formatBarValue}
                />
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
        {footnote && <div className="mt-1 font-mono text-[11px] text-ink-3">{footnote}</div>}
      </div>
    );
  }

  const W = 720;
  const H = height;
  const PAD = 10;
  const LABEL_W = 30;
  const all = series.flatMap((s) => s.values);
  const rawMin = Math.min(...all);
  const rawMax = Math.max(...all);
  const lo = Math.floor(rawMin / 5) * 5;
  const hi = Math.ceil((rawMax + 0.5) / 5) * 5;
  const span = Math.max(hi - lo, 5);
  const n = Math.max(...series.map((s) => s.values.length));
  const x0 = PAD + LABEL_W;
  const x = (i: number) => x0 + (i / Math.max(n - 1, 1)) * (W - x0 - PAD);
  const y = (v: number) => PAD + (1 - (v - lo) / span) * (H - PAD * 2);
  const line = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  const mid = (lo + hi) / 2;
  const ticks = [hi, mid, lo];

  const labelGap = 14;
  const labelY = series.map((s) => y(s.values[s.values.length - 1]));
  const order = series.map((_, i) => i).sort((a, b) => labelY[a] - labelY[b]);
  const placedY = [...labelY];
  for (let k = 1; k < order.length; k++) {
    const prev = order[k - 1];
    const curr = order[k];
    if (placedY[curr] - placedY[prev] < labelGap) {
      placedY[curr] = placedY[prev] + labelGap;
    }
  }

  return (
    <div className="px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {series.map((s) => (
          <span
            key={s.name}
            className="flex min-w-0 max-w-full items-center gap-1.5 text-[11.5px] text-ink-2"
          >
            <span className={`h-[2px] w-4 shrink-0 rounded-full ${s.tone === "ink" ? "bg-ink" : "bg-ink-3"}`} />
            <span className="min-w-0 break-words">{s.name}</span>
          </span>
        ))}
        <span className="ml-auto shrink-0 font-mono text-[11px] tabular-nums text-ink-3">
          {rawMin.toFixed(0)}–{rawMax.toFixed(0)}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-2 w-full max-[479px]:h-[220px] max-[479px]:min-h-[220px]"
        role="img"
        aria-label="Scoring trend chart"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x0} x2={W - PAD} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth={1} />
            <text
              x={x0 - 6} y={y(t) + 3} textAnchor="end"
              fontSize={9} fontFamily="var(--font-mono)" fill="var(--ink-3)"
            >
              {Number.isInteger(t) ? t : t.toFixed(1)}
            </text>
          </g>
        ))}
        {series.map((s, si) => {
          const last = s.values[s.values.length - 1];
          const muted = s.tone !== "ink";
          return (
            <g key={s.name}>
              <path
                d={line(s.values)}
                fill="none"
                stroke={muted ? "var(--ink-3)" : "var(--ink)"}
                strokeWidth={muted ? 1.25 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={muted ? "4 3" : undefined}
              />
              <circle
                cx={x(s.values.length - 1)} cy={y(last)} r={3}
                fill={muted ? "var(--ink-3)" : "var(--ink)"}
                stroke="var(--surface)" strokeWidth={1.5}
              />
              <text
                x={Math.min(x(s.values.length - 1) + 7, W - PAD - 18)} y={placedY[si] + 3.5}
                fontSize={10} fontWeight={600} fontFamily="var(--font-mono)"
                fill={muted ? "var(--ink-2)" : "var(--ink)"}
              >
                {last.toFixed(0)}
              </text>
            </g>
          );
        })}
      </svg>
      {footnote && <div className="mt-1 font-mono text-[11px] text-ink-3">{footnote}</div>}
    </div>
  );
}
