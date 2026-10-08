"use client";

import { useEffect, useMemo, useState } from "react";
import ThinkingState from "./product/ThinkingState";
import ToolChips from "./product/ToolChips";
import type { ToolStep } from "./product/ToolChips";
import ArtifactShell from "./product/ArtifactShell";
import ArtifactTable from "./product/ArtifactTable";
import ArtifactChart from "./product/ArtifactChart";
import { DimeMark } from "./product/DimeMark";
import { scenarios } from "@/lib/replay";

const FINAL = 5;
const DELAYS = [700, 1200, 1300, 1100, 1100];

function iconFor(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("run")) return "run";
  if (lower.includes("write")) return "write";
  return "read";
}

export default function ChatEmbed({
  activeId,
  onReplay,
}: {
  activeId: string;
  onReplay?: () => void;
}) {
  const scenario = useMemo(
    () => scenarios.find((s) => s.id === activeId) ?? scenarios[0],
    [activeId]
  );
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(FINAL);
    } else {
      setPhase(0);
    }
    setRun((r) => r + 1);
  }, [activeId]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(FINAL);
      return;
    }
    if (phase >= FINAL) return;
    const delay = DELAYS[Math.min(phase, DELAYS.length - 1)];
    const t = setTimeout(() => setPhase((p) => Math.min(p + 1, FINAL)), delay);
    return () => clearTimeout(t);
  }, [phase, run]);

  const thinkingRows = useMemo(
    () => scenario.thinking.map((primary) => ({ primary })),
    [scenario]
  );

  const steps: ToolStep[] = useMemo(
    () =>
      scenario.toolChips.map((t) => ({
        icon: iconFor(t.label),
        label: t.label,
        chip: t.chip,
        mono: true,
        detailMono: true,
        detail: [{ text: t.chip }],
      })),
    [scenario]
  );

  const header = `${scenario.toolChips.length} tool calls`;
  const readSource =
    scenario.toolChips.find((t) => t.label.toLowerCase().includes("read"))
      ?.chip ?? "sample";
  const chartTitle = (() => {
    const prefix = "Sample data. ";
    const raw = scenario.chart.footnote.startsWith(prefix)
      ? scenario.chart.footnote.slice(prefix.length)
      : scenario.chart.footnote;
    const trimmed = raw.endsWith(".") ? raw.slice(0, -1) : raw;
    return trimmed || scenario.noun;
  })();

  return (
    <section
      aria-label="Dime sample answer"
      className="overflow-hidden rounded-window bg-surface shadow-hairline"
    >
      <div className="flex h-10 items-center justify-between border-b border-line px-3">
        <span className="flex min-w-0 items-center gap-2">
          <DimeMark size={16} />
          <span className="text-[13px] font-medium text-ink">dime</span>
          <span className="rounded-chip bg-field px-1.5 py-0.5 text-[11px] font-medium text-ink-2">
            Sample
          </span>
        </span>
        <button
          type="button"
          onClick={() => {
            setRun((r) => r + 1);
            setPhase(0);
            onReplay?.();
          }}
          className="press flex h-7 items-center rounded-control border border-line px-2.5 text-[12px] font-medium text-ink-2 hover:bg-hover"
        >
          Replay
        </button>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="w-fit max-w-full rounded-control bg-field px-3 py-2 text-[13px] font-medium text-ink">
          {scenario.question}
        </div>
        {phase >= 1 && (
          <div key={`think-${run}`} className="rise">
            <ThinkingState rows={thinkingRows} />
          </div>
        )}
        {phase >= 2 && (
          <div key={`tools-${run}`} className="rise">
            <ToolChips
              steps={steps}
              diffs={[]}
              diffLines={{}}
              labels={{ header, more: "Sample data" }}
            />
          </div>
        )}
        {phase >= 3 && (
          <p className="rise text-[13.5px] leading-relaxed text-ink">
            {scenario.answer}
          </p>
        )}
        {phase >= 4 && (
          <div className="rise">
            <ArtifactShell
              title={scenario.noun}
              source={readSource}
              copyText={scenario.answer}
            >
              <ArtifactTable
                columns={scenario.table.columns}
                rows={scenario.table.rows}
              />
            </ArtifactShell>
          </div>
        )}
        {phase >= 5 && (
          <div className="rise">
            <ArtifactShell
              title={chartTitle}
              source={readSource}
              copyText={scenario.sample.disclosure}
            >
              <ArtifactChart
                series={scenario.chart.series}
                height={scenario.chart.height}
                footnote={scenario.chart.footnote}
                kind={scenario.chart.kind}
                labels={scenario.chart.labels}
              />
            </ArtifactShell>
          </div>
        )}
        <p className="font-mono text-[11px] leading-relaxed text-ink-3">
          {scenario.sample.disclosure}
        </p>
      </div>
    </section>
  );
}
