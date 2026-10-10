"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AX = { fontSize: 11, fill: "var(--ink-3)" } as const;
const COBALTS = ["#1B3FB8", "#2458F5", "#3A72F6", "#5489F8", "#6C9AF9"];

export const tipStyle = {
  contentStyle: { background: "#fff", border: "none", borderRadius: 8, boxShadow: "0 0 0 1px rgba(20,18,12,0.04), 0 4px 14px -6px rgba(20,18,12,0.12)", fontSize: 12, padding: "6px 10px", color: "var(--ink)" },
  labelStyle: { color: "var(--ink-3)", fontSize: 11, marginBottom: 2 },
  itemStyle: { color: "var(--ink)", padding: 0 },
  cursor: { fill: "rgba(20,18,12,0.03)" },
} as const;

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Shot = { x: number; y: number; made: boolean; zone: "Rim" | "Mid" | "Three" };

function makeShots(): Shot[] {
  const r = rng(11);
  const out: Shot[] = [];
  const spec: { zone: Shot["zone"]; n: number; p: number }[] = [
    { zone: "Rim", n: 14, p: 0.71 },
    { zone: "Mid", n: 11, p: 0.45 },
    { zone: "Three", n: 28, p: 0.43 },
  ];
  for (const s of spec) {
    for (let i = 0; i < s.n; i++) {
      let x = 0;
      let y = 0;
      if (s.zone === "Rim") {
        const a = r() * Math.PI * 2;
        const d = 8 + r() * 38;
        x = 250 + Math.cos(a) * d;
        y = 52 + Math.abs(Math.sin(a)) * d;
      } else if (s.zone === "Mid") {
        const a = 0.25 * Math.PI + r() * 0.5 * Math.PI;
        const d = 95 + r() * 75;
        x = 250 + Math.cos(a) * d * (r() > 0.5 ? 1 : -1);
        y = 52 + Math.sin(a) * d;
      } else {
        if (r() < 0.32) {
          x = r() > 0.5 ? 250 + 218 : 250 - 218;
          y = 52 + 6 + r() * 130;
        } else {
          const a = 0.12 * Math.PI + r() * 0.76 * Math.PI;
          const d = 240 + r() * 10;
          x = 250 + Math.cos(a) * d;
          y = 52 + Math.sin(a) * d;
        }
      }
      out.push({ x, y, made: false, zone: s.zone });
    }
    const idx = out.map((o, i) => (o.zone === s.zone ? i : -1)).filter((i) => i >= 0);
    const makes = Math.round(idx.length * s.p);
    idx.forEach((i, k) => { out[i].made = k < makes; });
  }
  const r2 = rng(5);
  return out.map((o) => ({ ...o, made: o.made })).sort(() => r2() - 0.5);
}

const SHOTS = makeShots();

export function shotSummary() {
  const rows = (["Rim", "Mid", "Three"] as const).map((z) => {
    const s = SHOTS.filter((o) => o.zone === z);
    const m = s.filter((o) => o.made).length;
    return { zone: z === "Rim" ? "Rim" : z === "Mid" ? "Midrange" : "Three", fga: s.length, fgm: m, pct: Math.round((m / s.length) * 1000) / 10 };
  });
  const fga = SHOTS.length;
  const fgm = SHOTS.filter((o) => o.made).length;
  return { rows, fga, fgm };
}

export function ShotMap() {
  const sum = shotSummary();
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <svg viewBox="0 0 500 440" className="w-full max-w-[420px] shrink-0" role="img" aria-label="Luke Kennard shot map">
        <g fill="none" stroke="rgba(20,18,12,0.14)" strokeWidth="1.5">
          <rect x="2" y="2" width="496" height="436" rx="2" />
          <rect x="190" y="2" width="120" height="190" />
          <path d="M190 192 A60 60 0 0 0 310 192" />
          <path d="M32 2 V140 A218 218 0 0 0 468 140 V2" />
          <path d="M210 52 H290" />
          <circle cx="250" cy="52" r="8" />
          <path d="M210 16 A40 40 0 0 0 290 16" transform="translate(0 36)" />
        </g>
        {SHOTS.map((s, i) =>
          s.made ? (
            <circle key={i} cx={s.x} cy={s.y} r="6" fill="#2458F5" />
          ) : (
            <g key={i} stroke="rgba(20,18,12,0.35)" strokeWidth="1.5">
              <path d={`M${s.x - 4} ${s.y - 4} L${s.x + 4} ${s.y + 4}`} />
              <path d={`M${s.x + 4} ${s.y - 4} L${s.x - 4} ${s.y + 4}`} />
            </g>
          ),
        )}
      </svg>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[22px] font-medium leading-[28px] tabular-nums text-ink">{sum.fgm} of {sum.fga}</div>
        <div className="text-[12px] text-ink-3">Kennard field goals, recorded shots</div>
        <div className="mt-3 flex flex-col gap-1.5">
          {sum.rows.map((r, i) => (
            <div key={r.zone} className="flex items-center gap-3 text-[13px]">
              <span className="w-[68px] text-ink-2">{r.zone}</span>
              <span className="h-[6px] flex-1 rounded-full bg-hover-2"><span className="block h-full rounded-full" style={{ width: `${r.pct}%`, background: COBALTS[i + 1] }} /></span>
              <span className="w-[44px] text-right font-mono tabular-nums text-ink">{r.pct}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[11.5px] text-ink-3">
          <span className="flex items-center gap-1.5"><span className="inline-block size-[9px] rounded-full bg-accent" />Made</span>
          <span className="flex items-center gap-1.5"><span className="font-mono">x</span>Missed</span>
        </div>
      </div>
    </div>
  );
}

const LINEUPS = [
  { label: "LAL: Kennard, Ayton +3", net: 11.2 },
  { label: "DET: Duren +4", net: 8.4 },
  { label: "BOS: Queta +4", net: 6.1 },
  { label: "DEN: Jokić +4", net: -3.7 },
  { label: "LAL: Ayton +4", net: -6.9 },
];

export function LineupPulse() {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <BarChart data={LINEUPS} layout="vertical" margin={{ left: 0, right: 8 }}>
        <CartesianGrid stroke="var(--line)" horizontal={false} />
        <XAxis type="number" domain={[-10, 14]} ticks={[-8, 0, 8]} tickFormatter={(v: number) => (v > 0 ? `+${v}` : String(v))} tick={AX} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="label" tick={AX} width={122} interval={0} tickLine={false} axisLine={false} />
        <ReferenceLine x={0} stroke="rgba(20,18,12,0.2)" />
        <Tooltip {...tipStyle} formatter={(v) => [`${Number(v) > 0 ? "+" : ""}${v}`, "Net rating"]} />
        <Bar dataKey="net" radius={[3, 3, 3, 3]} isAnimationActive={false}>
          {LINEUPS.map((d, i) => <Cell key={i} fill={d.net >= 0 ? COBALTS[Math.min(i, 3)] : "#B9C3D9"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const RAPTOR = [
  { season: "16-17", v: 4.1 },
  { season: "17-18", v: 5.2 },
  { season: "18-19", v: 8.0 },
  { season: "19-20", v: 7.0 },
  { season: "20-21", v: 12.7 },
  { season: "21-22", v: 12.8 },
];

export function RaptorLine() {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <LineChart data={RAPTOR} margin={{ left: 0, right: 12, top: 8 }}>
        <CartesianGrid stroke="var(--line)" vertical={false} />
        <XAxis dataKey="season" tick={AX} tickLine={false} axisLine={false} />
        <YAxis tick={AX} width={30} domain={[0, 14]} ticks={[0, 7, 14]} tickLine={false} axisLine={false} />
        <Tooltip {...tipStyle} formatter={(v) => [String(v), "RAPTOR total"]} />
        <Line type="monotone" dataKey="v" stroke="#2458F5" strokeWidth={2} dot={{ r: 3, fill: "#2458F5", strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
