"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Maximize2, Minimize2, Copy, Check, ChevronDown } from "lucide-react";

export type Col = { key: string; label: string; numeric?: boolean };

const iconBtn =
  "flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-[background-color,color,transform] duration-150 hover:bg-hover hover:text-ink active:scale-[0.94]";

export function Shell({ title, source, copyText, children }: { title: string; source?: string; copyText?: string; children: ReactNode }) {
  const [tall, setTall] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText ?? title);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      return;
    }
  };
  return (
    <div className="overflow-hidden rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--line)]">
      <div className="flex h-10 items-center justify-between border-b border-line pl-4 pr-2">
        <span className="truncate text-[13px] font-medium text-ink">{title}</span>
        <div className="flex items-center gap-0.5">
          {source && <span className="mr-1.5 hidden truncate font-mono text-[11px] text-ink-3 sm:block">{source}</span>}
          <button type="button" aria-label={tall ? "Collapse" : "Expand"} onClick={() => setTall((v) => !v)} className={iconBtn}>
            {tall ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button type="button" aria-label="Copy" onClick={copy} className={iconBtn}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <div className={tall ? "overflow-x-auto" : "max-h-[360px] overflow-auto overscroll-contain"}>{children}</div>
    </div>
  );
}

export function SortTable({ columns, rows, active }: { columns: Col[]; rows: (string | number)[][]; active?: number }) {
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) => {
      const x = a[sort.col];
      const y = b[sort.col];
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true });
      return c * sort.dir;
    });
  }, [rows, sort]);
  const toggle = (i: number) =>
    setSort((s) => (s && s.col === i ? { col: i, dir: s.dir === 1 ? -1 : 1 } : { col: i, dir: columns[i].numeric ? -1 : 1 }));
  return (
    <table className="w-full min-w-[360px] text-[13px]">
      <thead className="sticky top-0 z-10 bg-canvas">
        <tr className="border-b border-line">
          {columns.map((c, i) => (
            <th key={c.key} className={`p-0 text-[12.5px] font-medium ${i === 0 ? "pl-4" : ""} ${i === columns.length - 1 ? "pr-4" : ""}`}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={`flex h-8 w-full items-center gap-1 transition-colors duration-100 hover:text-ink ${c.numeric ? "justify-end" : ""} ${sort?.col === i ? "text-ink" : "text-ink-2"}`}
              >
                {c.label}
                {sort?.col === i && <ChevronDown size={11} style={{ transform: sort.dir === 1 ? "rotate(180deg)" : "none" }} />}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {sorted.map((r, ri) => (
          <tr key={ri} className={`h-[34px] transition-colors duration-100 hover:bg-hover ${active === ri && !sort ? "bg-hover" : ""}`}>
            {columns.map((c, i) => (
              <td key={c.key} className={`${i === 0 ? "pl-4" : ""} ${i === columns.length - 1 ? "pr-4" : ""} ${c.numeric ? "text-right font-mono tabular-nums text-ink-2" : i === 0 ? "text-ink" : "font-mono text-ink-3"}`}>
                {r[i]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
