import { cx } from "./cx";

export interface DeltaChipProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Soft 10% pill with a filled triangle. Positive = up/green, negative = down/red. */
export function DeltaChip({ value, suffix = "%", className }: DeltaChipProps) {
  const up = value >= 0;
  return (
    <span
      className={cx(
        "inline-flex h-5 items-center gap-1 rounded-full px-1.5 text-[11px] font-medium tabular-nums",
        up ? "bg-fu-positive-soft text-fu-positive-text" : "bg-fu-negative-soft text-fu-negative-text",
        className,
      )}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" className={up ? "" : "rotate-180"}>
        <path d="M4 1.2 L7.2 6.4 H0.8 Z" fill="currentColor" />
      </svg>
      {Math.abs(value).toFixed(1)}
      {suffix}
    </span>
  );
}
