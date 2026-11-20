"use client";
import { useState } from "react";
import { Bar, ChartDefs, GridLines, TipCard, mix, useChartIds } from "./chart-kit";

const LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];
const A = [38, 44, 41, 52, 49, 57, 61, 55, 66, 63, 71, 76];
const B = [18, 22, 26, 21, 29, 27, 31, 36, 33, 39, 37, 42];

export interface StackedBlocksProps {
  a?: number[];
  b?: number[];
  labels?: string[];
  color?: string;
  nameA?: string;
  nameB?: string;
}

/** Parts of a total over time: separate rounded blocks, saturated base + tint top, 3px white gap. */
export function StackedBlocks({ a = A, b = B, labels = LABELS, color = "#fd4b23", nameA = "New", nameB = "Returning" }: StackedBlocksProps) {
  const ids = useChartIds();
  const [sel, setSel] = useState(9);
  const W = 560;
  const H = 200;
  const gap = 12;
  const g = 3;
  const w = (W - gap * (a.length - 1)) / a.length;
  const max = Math.max(...a.map((v, i) => v + b[i])) * 1.12;
  return (
    <div className="relative w-full">
      <svg viewBox={"0 0 " + W + " " + (H + 24)} className="w-full overflow-visible" role="img" aria-label="Stacked weekly totals">
        <ChartDefs ids={ids} colors={{ a: color }} />
        <GridLines width={W} height={H} rows={4} />
        {a.map((va, i) => {
          const x = i * (w + gap);
          const ha = (va / max) * H;
          const hb = (b[i] / max) * H;
          return (
            <g key={i} onMouseEnter={() => setSel(i)} className="cursor-pointer">
              {i === sel && <rect x={x - gap / 2} y={0} width={w + gap} height={H} fill="#0d0d12" opacity={0.035} rx={6} />}
              <Bar x={x} y={H - ha} w={w} h={ha} r={5} color={color} ids={ids} gradKey="a" />
              <Bar x={x} y={H - ha - g - hb} w={w} h={hb} r={5} color={color} ids={ids} gradKey="a" tint />
              <text x={x + w / 2} y={H + 18} textAnchor="middle" fontSize="11" fill={i === sel ? "#202020" : "#8b8b91"}>
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
      <TipCard
        className="absolute left-2 top-2"
        title={labels[sel] + ", total " + (a[sel] + b[sel])}
        rows={[
          { label: nameA, value: String(a[sel]), color },
          { label: nameB, value: String(b[sel]), color: mix(color, 0.7) },
        ]}
      />
    </div>
  );
}
