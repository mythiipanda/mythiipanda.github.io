import type { ReactNode } from "react";

export function Spark({ points, w = 76, h = 22 }: { points: number[]; w?: number; h?: number }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points
    .map((v, i) => `${((i / (points.length - 1)) * w).toFixed(1)},${(h - 2 - ((v - min) / (max - min || 1)) * (h - 4)).toFixed(1)}`)
    .join(" ");
  const last = points.length - 1;
  const lx = w;
  const ly = h - 2 - ((points[last] - min) / (max - min || 1)) * (h - 4);
  return (
    <svg width={w} height={h} className="shrink-0 text-accent-ink" aria-hidden>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={lx} cy={ly} r="2" fill="currentColor" />
    </svg>
  );
}

export function Ring({ pct, size = 44 }: { pct: number; size?: number }) {
  const r = 15.5;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} className="shrink-0 -rotate-90" aria-hidden>
      <circle cx="18" cy="18" r={r} fill="none" stroke="var(--field)" strokeWidth="3.4" />
      <circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
      />
    </svg>
  );
}

export function Rise({ delay, className = "", children }: { delay: number; className?: string; children: ReactNode }) {
  return (
    <div className={`rise-in ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

