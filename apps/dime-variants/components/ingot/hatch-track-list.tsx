import { mix } from "./chart-kit";

export interface HatchTrackRow {
  label: string;
  value: number;
  meta?: string;
}

const DEFAULT: HatchTrackRow[] = [
  { label: "Stripe", value: 64, meta: "$42,180" },
  { label: "PayPal", value: 21, meta: "$13,840" },
  { label: "Bank transfer", value: 11, meta: "$7,260" },
  { label: "Crypto", value: 4, meta: "$2,640" },
];

/** Share of total in a list: gradient fill on a hatched pale track, value at the end. */
export function HatchTrackList({ rows = DEFAULT, color = "#fd4b23" }: { rows?: HatchTrackRow[]; color?: string }) {
  const hatch = "repeating-linear-gradient(135deg, " + mix(color, 0.86) + " 0 1.3px, " + mix(color, 0.94) + " 1.3px 5px)";
  return (
    <ul className="flex w-full flex-col gap-4">
      {rows.map((r) => (
        <li key={r.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="text-fu-body">{r.label}</span>
            <span className="tabular-nums text-fu-muted">
              {r.meta && <span className="mr-2 font-medium text-fu-ink">{r.meta}</span>}
              {r.value}%
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: hatch }}>
            <div
              className="h-full rounded-full"
              style={{ width: r.value + "%", background: "linear-gradient(90deg," + mix(color, 0.13) + "," + color + ")", boxShadow: "inset 0 0 0 1px " + mix(color, 0.22, "#000000") + "40" }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
