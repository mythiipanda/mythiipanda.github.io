import { useId } from "react";
import { DeltaChip } from "./delta-chip";
import { Icon, type IconName } from "./icons";
import { mix, seededSeries } from "./chart-kit";

export interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  icon?: IconName;
  series?: number[];
  color?: string;
  caption?: string;
}

/** KPI card: label + icon, value, delta pill, and an inner well holding an area sparkline. */
export function KpiCard({ label, value, delta, icon = "chart-capsule", series, color, caption = "vs last month" }: KpiCardProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const data = series ?? seededSeries(label.length * 13, 24, 100, delta >= 0 ? 2.2 : -1.6, 22);
  const c = color ?? (delta >= 0 ? "#18b170" : "#e5484d");
  const W = 120;
  const H = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - ((v - min) / (max - min || 1)) * (H - 4) - 2]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  return (
    <div className="flex min-w-56 flex-col gap-3 rounded-fu-lg border border-fu-line bg-fu-surface p-3 shadow-fu-card">
      <div className="flex items-center gap-2 px-1 text-[13px] font-medium text-fu-body">
        <span className="flex size-6 items-center justify-center rounded-fu-xs bg-fu-hover text-fu-muted">
          <Icon name={icon} size={15} />
        </span>
        {label}
      </div>
      <div className="flex items-end justify-between gap-3 rounded-fu-sm bg-white/90 p-3 shadow-[0_0_1px_rgb(0_0_0/0.25)]">
        <div className="flex flex-col gap-1.5">
          <span className="text-xl font-medium tracking-[-0.02em] tabular-nums text-fu-ink">{value}</span>
          <span className="flex items-center gap-1.5 text-[11px] text-fu-muted">
            <DeltaChip value={delta} />
            {caption}
          </span>
        </div>
        <svg viewBox={"0 0 " + W + " " + H} className="h-9 w-28 shrink-0" aria-hidden="true">
          <defs>
            <linearGradient id={"k" + id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={c} stopOpacity="0.22" />
              <stop offset="1" stopColor={c} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={line + " L" + W + " " + H + " L0 " + H + " Z"} fill={"url(#k" + id + ")"} />
          <path d={line} fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round" style={{ filter: "drop-shadow(0 1px 1.5px " + mix(c, 0.4) + ")" }} />
        </svg>
      </div>
    </div>
  );
}
