import { mix } from "./chart-kit";

export interface PillMeterProps {
  value: number;
  max?: number;
  pills?: number;
  offset?: number;
  color?: string;
  label?: string;
  hideHeader?: boolean;
}

/** Capacity / quota as tall pills: filled pills carry the gradient, the remainder is a 16% tint. */
export function PillMeter({ value, max = 100, pills = 24, offset = 0, color = "#fd4b23", label = "Execution capacity", hideHeader = false }: PillMeterProps) {
  const on = Math.round((value / max) * pills);
  return (
    <div className="w-full">
      {!hideHeader && (
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-[13px] text-fu-muted">{label}</span>
          <span className="text-sm font-medium tabular-nums text-fu-ink">
            {value}
            <span className="text-fu-faint"> / {max}</span>
          </span>
        </div>
      )}
      <div className="flex h-1.5 gap-px" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        {Array.from({ length: pills }, (_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full"
            style={i >= offset && i < offset + on ? { background: color } : { background: mix(color, 0.88) }}
          />
        ))}
      </div>
    </div>
  );
}
