import { mix } from "./chart-kit";

export interface RankedRow {
  label: string;
  value: number;
  code?: string;
}

const DEFAULT: RankedRow[] = [
  { label: "United States", code: "US", value: 18420 },
  { label: "Germany", code: "DE", value: 9310 },
  { label: "United Kingdom", code: "GB", value: 7860 },
  { label: "Canada", code: "CA", value: 5120 },
  { label: "Bangladesh", code: "BD", value: 3940 },
];

/** Row-background bars: the row itself is the bar (pale fill = share), label inside, value at the end. */
export function RankedList({ rows = DEFAULT, color = "#fd4b23", title = "Top countries" }: { rows?: RankedRow[]; color?: string; title?: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between px-1 text-[11px] font-medium uppercase tracking-[0.04em] text-fu-faint">
        <span>{title}</span>
        <span>Visitors</span>
      </div>
      <ul className="flex flex-col gap-1">
        {rows.map((r, i) => (
          <li key={r.label} className="relative flex h-9 items-center overflow-hidden rounded-fu-sm px-2.5 text-[13px]">
            <span
              className="absolute inset-y-0 left-0 rounded-fu-sm"
              style={{ width: (r.value / max) * 100 + "%", background: i === 0 ? mix(color, 0.86) : mix(color, 0.93), boxShadow: "inset 0 0 0 1px " + mix(color, 0.8) }}
            />
            {r.code && <span className="relative mr-2 w-6 font-fu-mono text-[11px] text-fu-muted">{r.code}</span>}
            <span className="relative flex-1 text-fu-body">{r.label}</span>
            <span className="relative font-medium tabular-nums text-fu-ink">{r.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
