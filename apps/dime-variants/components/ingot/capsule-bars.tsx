"use client";
import { useState } from "react";
import { Bar, ChartDefs, TipCard, useChartIds } from "./chart-kit";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DEFAULT = [42, 55, 48, 63, 58, 71, 66, 79, 74, 88, 82, 94];

export interface CapsuleBarsProps {
  data?: number[];
  labels?: string[];
  color?: string;
  title?: string;
  unit?: string;
}

/** Capsules in full-height pale tracks; the focused period is saturated, the rest tint + hatch. */
export function CapsuleBars({ data = DEFAULT, labels = MONTHS, color = "#fd4b23", title = "Revenue", unit = "k" }: CapsuleBarsProps) {
  const ids = useChartIds();
  const [focus, setFocus] = useState(data.length - 1);
  const W = 560;
  const H = 200;
  const gap = 14;
  const w = (W - gap * (data.length - 1)) / data.length;
  const max = Math.max(...data) * 1.08;
  return (
    <div className="relative w-full pt-16">
      <TipCard className="absolute left-0 top-0" title={labels[focus]} rows={[{ label: title, value: data[focus] + unit, color }]} />
      <svg viewBox={"0 0 " + W + " " + (H + 24)} className="w-full overflow-visible" role="img" aria-label={title + " by month"}>
        <ChartDefs ids={ids} colors={{ a: color }} />
        {data.map((v, i) => {
          const x = i * (w + gap);
          const h = (v / max) * H;
          const on = i === focus;
          return (
            <g key={i} onMouseEnter={() => setFocus(i)} className="cursor-pointer">
              <rect x={x} y={0} width={w} height={H} rx={w / 2} fill="#f6f6f4" />
              <Bar x={x} y={H - h} w={w} h={h} r={w / 2} color={color} ids={ids} gradKey="a" tint={!on} hatch={!on} />
              <text x={x + w / 2} y={H + 18} textAnchor="middle" fontSize="11" fill={on ? "#202020" : "#8b8b91"} fontWeight={on ? 500 : 400}>
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
