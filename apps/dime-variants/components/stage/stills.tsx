import type { ReactNode } from "react";
import { ArrowLeftRightIcon, CheckIcon, DownloadIcon, PinIcon } from "lucide-react";
import { ActionPill, Card, Cell, Headshot } from "./app-shell";
import { CLUTCH, CLUTCH_COUNT, LINEUPS, LINEUP_COUNT } from "@/lib/exhibits";

function Spark({ points, w = 76, h = 22 }: { points: number[]; w?: number; h?: number }) {
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

function Ring({ pct, size = 44 }: { pct: number; size?: number }) {
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

function Rise({ delay, className = "", children }: { delay: number; className?: string; children: ReactNode }) {
  return (
    <div className={`rise-in ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function K({ children }: { children: ReactNode }) {
  return <span className="text-accent-ink">{children}</span>;
}

function Td({ children, right, mono }: { children: ReactNode; right?: boolean; mono?: boolean }) {
  return (
    <td className={`h-8 border-b border-line px-2 text-[12.5px] last:border-b-0 ${right ? "text-right" : ""} ${mono ? "font-mono tabular-nums" : ""}`}>
      {children}
    </td>
  );
}

function MiniTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={h} className={`h-7 border-b border-line px-2 text-[11px] font-medium text-secondary-label ${i > 1 ? "text-right" : "text-left"}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <Td key={j} right={j > 1} mono={j > 1}>
                {c}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Bars({ rows, max, unit }: { rows: [string, number][]; max: number; unit?: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map(([label, v], i) => (
        <div key={label} className="group flex items-center gap-3">
          <span className="w-32 truncate text-[12px] text-ink-2 transition-colors group-hover:text-ink md:w-40">{label}</span>
          <div className="h-[18px] flex-1 rounded-[4px] bg-field">
            <div
              className={`bar-grow h-full rounded-[4px] ${i === 0 ? "bg-accent" : "bg-accent/45"}`}
              style={{ width: `${Math.max(4, (v / max) * 100)}%`, animationDelay: `${140 + i * 70}ms` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-[12px] tabular-nums text-ink">{v.toFixed(1)}{unit}</span>
        </div>
      ))}
    </div>
  );
}

function NotebookPane() {
  return (
      <div className="mx-auto flex h-full max-w-[640px] flex-col gap-3 overflow-hidden">
        <Rise delay={0}>
        <Cell n={1} kind="ask" meta={<span className="tabular-nums">11:42</span>}>
          <p className="text-[13.5px] leading-6 text-ink">
            Who leads the league in true shooting among rotation players?
          </p>
        </Cell>
        </Rise>
        <Rise delay={70}>
        <Cell n={2} kind="sql">
          <pre className="font-mono text-[12px] leading-6 text-ink-2">
            <K>select</K> PLAYER_NAME, TEAM, {"\n"}
            {"       "}TS_PCT, USG_PCT {"\n"}
            <K>from</K> silver_advanced {"\n"}
            <K>where</K> MIN {">"}= <K>1500</K> {"\n"}
            <K>order by</K> TS_PCT <K>desc limit</K> <K>5</K>
          </pre>
          <div className="mt-3">
            <MiniTable
              head={["player", "team", "ts%", "usg%"]}
              rows={[
                ["L. Kennard", "LAL", "68.9", "13.1"],
                ["J. Duren", "DET", "68.8", "23.1"],
                ["D. Ayton", "LAL", "67.6", "16.4"],
                ["N. Queta", "BOS", "67.4", "14.5"],
                ["N. Jokić", "DEN", "67.0", "28.9"],
              ]}
            />
          </div>
        </Cell>
        </Rise>
        <Rise delay={140}>
        <Cell n={3} kind="chart" meta={<ActionPill icon={PinIcon}>pinned</ActionPill>}>
          <Bars
            max={70}
            rows={[
              ["Kennard · LAL", 68.9],
              ["Duren · DET", 68.8],
              ["Ayton · LAL", 67.6],
              ["Queta · BOS", 67.4],
              ["Jokić · DEN", 67.0],
            ]}
          />
        </Cell>
        </Rise>
        <Rise delay={210}>
        <Cell n={4} kind="note">
          <p className="text-[13px] leading-6 text-ink-2">
            Kennard edges Duren by 0.1 on a third of the usage. Jokić is the outlier: top-five efficiency at <span className="font-mono text-[12.5px] text-ink">28.9%</span> usage, nearly double anyone else on the list.
          </p>
        </Cell>
        </Rise>
      </div>
  );
}

function StatCard({ value, label, delay, children }: { value: ReactNode; label: string; delay: number; children?: ReactNode }) {
  return (
    <Rise delay={delay}>
      <div className="h-full rounded-[12px] bg-surface p-4 shadow-[0_0_0_1px_var(--line)] transition-transform duration-200 ease-out hover:-translate-y-0.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="num text-[26px] font-medium tabular-nums text-ink">{value}</div>
            <div className="mt-1 text-[12px] text-ink-2">{label}</div>
          </div>
          {children}
        </div>
      </div>
    </Rise>
  );
}

function BoardsPane() {
  return (
      <div className="grid h-full grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
        <Rise delay={0} className="md:col-span-2">
        <Card title="Five-man net rating" wide>
          <Bars
            max={28}
            rows={LINEUPS.map(([names, team, gp, poss, ortg, drtg, net]) => [`${names.split(" - ")[0]} +4 · ${team}`, net] as [string, number])}
          />
        </Card>
        </Rise>
        <Rise delay={80}>
        <Card title="Clutch scoring">
          <MiniTable
            head={["player", "pts", "fg%", "gp"]}
            rows={CLUTCH.slice(0, 4).map(([name, team, gp, pts, fga, fg, pm]) => [name, String(pts), fg.toFixed(1), String(gp)])}
          />
        </Card>
        </Rise>
        <div className="grid grid-cols-2 gap-3">
          <StatCard value="+26.4" label="CHA starters, best net" delay={160}>
            <Spark points={[9.2, 12.4, 15.8, 14.1, 19.6, 22.3, 26.4]} />
          </StatCard>
          <StatCard value={CLUTCH_COUNT} label="clutch-qualified players" delay={220}>
            <Ring pct={82} />
          </StatCard>
          <Rise delay={280} className="col-span-2">
          <div className="rounded-[12px] bg-surface p-4 shadow-[0_0_0_1px_var(--line)]">
            <div className="flex items-baseline justify-between">
              <span className="num text-[22px] font-medium tabular-nums text-ink">{LINEUP_COUNT}</span>
              <span className="text-[11px] font-medium text-secondary-label">qualified lineups</span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-[3px]">
              {LINEUPS.map((l, i) => (
                <div
                  key={i}
                  className={`bar-grow-y flex-1 rounded-t-[2px] ${i === 0 ? "bg-accent" : "bg-accent/35"}`}
                  style={{ height: `${(l[6] / 28) * 100}%`, animationDelay: `${300 + i * 50}ms` }}
                />
              ))}
            </div>
          </div>
          </Rise>
        </div>
      </div>
  );
}

const SCOUT = [
  { img: "/dime-site/headshots/kennard.png", name: "Luke Kennard", team: "LAL", pos: "SG", ts: "68.9", usg: "13.1", age: 29, trend: [61.2, 62.8, 64.5, 63.9, 66.1, 68.9] },
  { img: "/dime-site/headshots/duren.png", name: "Jalen Duren", team: "DET", pos: "C", ts: "68.8", usg: "23.1", age: 22, trend: [63.4, 65.1, 64.2, 66.8, 67.5, 68.8] },
  { img: "/dime-site/headshots/ayton.png", name: "Deandre Ayton", team: "LAL", pos: "C", ts: "67.6", usg: "16.4", age: 27, trend: [64.0, 65.5, 66.9, 66.2, 67.1, 67.6] },
  { img: "/dime-site/headshots/queta.png", name: "Neemias Queta", team: "BOS", pos: "C", ts: "67.4", usg: "14.5", age: 26, trend: [62.6, 64.9, 65.8, 66.0, 66.8, 67.4] },
  { img: "/dime-site/headshots/jokic.png", name: "Nikola Jokić", team: "DEN", pos: "C", ts: "67.0", usg: "28.9", age: 30, trend: [65.8, 66.4, 66.1, 67.2, 66.6, 67.0] },
];

function ScoutPane() {
  return (
    <>
      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["#", "player", "team", "ts%", "usg%", "trend", "age"].map((h, i) => (
                <th key={h} className={`h-9 border-b border-line px-3 text-[11px] font-medium text-secondary-label ${i === 3 || i === 4 ? "text-right" : "text-left"} ${i >= 5 ? "hidden lg:table-cell" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCOUT.map((p, i) => (
              <tr key={p.name} className={`rise-in transition-colors hover:bg-hover-2/40 ${i < 2 ? "bg-accent-tint/60" : ""}`} style={{ animationDelay: `${i * 55}ms` }}>
                <td className="h-11 w-8 border-b border-line px-3 font-mono text-[12px] tabular-nums text-ink-3">
                  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-[5px] ${i < 2 ? "bg-accent/15 font-medium text-accent-ink" : ""}`}>{i + 1}</span>
                </td>
                <td className="h-11 border-b border-line px-3">
                  <span className="flex items-center gap-2.5">
                    <Headshot src={p.img} alt={p.name} size={26} />
                    <span className="truncate text-[13px] font-medium text-ink">{p.name}</span>
                  </span>
                </td>
                <td className="h-11 border-b border-line px-3 font-mono text-[12px] text-ink-2">{p.team}</td>
                <td className="h-11 border-b border-line px-3 text-right font-mono text-[12.5px] font-medium tabular-nums text-ink">{p.ts}</td>
                <td className="h-11 border-b border-line px-3 text-right font-mono text-[12.5px] tabular-nums text-ink-2">{p.usg}</td>
                <td className="hidden h-11 border-b border-line px-3 lg:table-cell"><Spark points={p.trend} w={60} h={18} /></td>
                <td className="hidden h-11 border-b border-line px-3 text-right font-mono text-[12.5px] tabular-nums text-ink-2 lg:table-cell">{p.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rise-in shrink-0 border-t border-line bg-surface px-4 py-3" style={{ animationDelay: "320ms" }}>
        <div className="mb-2 text-[11px] font-medium text-secondary-label">compare</div>
        <div className="grid grid-cols-2 gap-4">
          {[SCOUT[0], SCOUT[4]].map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <Headshot src={p.img} alt={p.name} size={34} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-medium text-ink">{p.name}</div>
                <div className="mt-1.5 flex flex-col gap-1">
                  {[
                    ["TS", parseFloat(p.ts), 70],
                    ["USG", parseFloat(p.usg), 30],
                  ].map(([l, v, m]) => (
                    <div key={l as string} className="flex items-center gap-2">
                      <span className="w-7 text-[10px] font-medium text-secondary-label">{l}</span>
                      <div className="h-[5px] flex-1 rounded-full bg-field">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${((v as number) / (m as number)) * 100}%` }} />
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-ink-2">{(v as number).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TradesPane() {
  return (
    <>
      <div className="relative grid min-h-0 flex-1 content-start grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
        <span className="pop-in absolute left-1/2 top-[46%] z-10 hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface shadow-[0_0_0_1px_var(--line)] md:flex" style={{ animationDelay: "420ms" }}>
          <ArrowLeftRightIcon className="size-3.5 text-accent-ink" />
        </span>
        {[
          { team: "MIA", label: "receives", rows: [["Anthony Davis", "davis", "58.5", "35.3"]], picks: [] as string[], sends: "Giannis Antetokounmpo" },
          { team: "WAS", label: "receives", rows: [["Giannis Antetokounmpo", "giannis", "58.5", "35.3"]], picks: ["2028 1st (top-4 prot.)", "2030 pick swap"], sends: "Anthony Davis" },
        ].map((side, si) => (
          <div key={side.team} className="rise-in overflow-hidden rounded-[12px] bg-surface shadow-[0_0_0_1px_var(--line)]" style={{ animationDelay: `${si * 90}ms` }}>
            <div className="flex h-10 items-center justify-between border-b border-line px-4">
              <span className="font-mono text-[13px] font-medium text-ink">{side.team}</span>
              <span className="text-[11px] font-medium text-secondary-label">{side.label}</span>
            </div>
            <div className="p-3">
              {side.rows.map(([name, img, sal, cap]) => (
                <div key={name} className="flex items-center gap-3 rounded-[8px] px-2 py-2">
                  <Headshot src={`/dime-site/headshots/${img}.png`} alt={name} size={34} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-ink">{name}</div>
                    <div className="font-mono text-[11px] text-ink-3">${sal}M · {cap}% of cap</div>
                  </div>
                  <span className="text-[11px] font-medium text-secondary-label">in</span>
                </div>
              ))}
              {side.picks.map((p) => (
                <div key={p} className="flex items-center gap-3 px-2 py-2">
                  <span className="flex size-[34px] items-center justify-center rounded-full bg-field text-[10px] font-medium text-secondary-label ring-1 ring-inset ring-line">pick</span>
                  <span className="flex-1 text-[12.5px] text-ink-2">{p}</span>
                  <span className="text-[11px] font-medium text-secondary-label">in</span>
                </div>
              ))}
              <div className="mt-1 flex items-center gap-3 border-t border-line px-2 py-2">
                <span className="w-[34px] text-center text-[11px] font-medium text-secondary-label">out</span>
                <span className="flex-1 truncate text-[12.5px] text-ink-2">{side.sends} · $58.5M</span>
              </div>
            </div>
            <div className="border-t border-line px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="w-16 text-[11px] font-medium text-secondary-label">cap hit</span>
                <div className="h-[6px] flex-1 rounded-full bg-field">
                  <div className="bar-grow h-full rounded-full bg-accent/70" style={{ width: "35.3%", animationDelay: "500ms" }} />
                </div>
                <span className="font-mono text-[11px] tabular-nums text-ink-2">35.3%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 shrink-0 rounded-[12px] bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--line)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px]">
          <span className="text-ink-2">out <span className="tabular-nums text-ink">$58.5M</span></span>
          <span className="text-ink-2">in <span className="tabular-nums text-ink">$58.5M</span></span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-ink-2"><span className="pop-in inline-flex" style={{ animationDelay: "600ms" }}><CheckIcon className="size-3 text-accent-ink" /></span>legal</span>
        </div>
      </div>
    </>
  );
}

function Cite({ children }: { children: ReactNode }) {
  return (
    <sup className="ml-0.5 inline-flex h-4 items-center rounded-[4px] bg-accent-tint px-1 font-mono text-[9.5px] font-medium leading-none text-accent-ink">
      {children}
    </sup>
  );
}

function ReportPane() {
  return (
      <div className="flex h-full min-h-0">
        <div className="hidden w-44 shrink-0 flex-col border-r border-line py-4 md:flex">
          <div className="mx-4 mb-3 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-field">
              <div className="bar-grow h-full w-2/5 rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-secondary-label">40%</span>
          </div>
          {["Summary", "True shooting", "Clutch pool", "Method"].map((s, i) => (
            <div key={s} className={`mx-2 flex h-8 items-center gap-2 rounded-[8px] px-2.5 text-[12.5px] ${i === 0 ? "bg-hover-2 text-ink" : "text-ink-2"}`}>
              {i === 0 && <span className="h-3.5 w-[2px] rounded-full bg-accent" />}
              {s}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto max-w-[560px]">
            <h3 className="text-[17px] font-semibold text-ink">Midseason efficiency review</h3>

            <p className="rise-in mt-4 text-[13.5px] leading-7 text-ink-2" style={{ animationDelay: "60ms" }}>
              Among <span className="font-medium text-ink">164 rotation players</span> (≥1,500 minutes), Luke Kennard leads the league at <span className="font-mono text-[13px] font-medium text-ink">68.9%</span> true shooting<Cite>1</Cite>, edging Jalen Duren (<span className="font-mono text-[13px] text-ink">68.8%</span>) on a third of the usage.
            </p>
            <p className="rise-in mt-3 text-[13.5px] leading-7 text-ink-2" style={{ animationDelay: "120ms" }}>
              Nikola Jokić remains the workload outlier — top-five efficiency (<span className="font-mono text-[13px] text-ink">67.0%</span>) at <span className="font-mono text-[13px] text-ink">28.9%</span> usage, nearly double every other name on the board.<Cite>2</Cite>
            </p>
            <div className="rise-in mt-4 rounded-[10px] bg-field p-3.5" style={{ animationDelay: "180ms" }}>
              <div className="mb-2 text-[11px] font-medium text-secondary-label">exhibit 1 · true-shooting leaders</div>
              <MiniTable
                head={["player", "team", "ts%", "usg%"]}
                rows={[
                  ["L. Kennard", "LAL", "68.9", "13.1"],
                  ["J. Duren", "DET", "68.8", "23.1"],
                  ["N. Jokić", "DEN", "67.0", "28.9"],
                ]}
              />
            </div>
            <p className="rise-in mt-4 text-[13.5px] leading-7 text-ink-2" style={{ animationDelay: "240ms" }}>
              The clutch pool stands at <span className="font-mono text-[13px] text-ink">492 qualified players</span>; Shai Gilgeous-Alexander tops it at 175 points on 51.5% shooting.<Cite>3</Cite>
            </p>
          </div>
        </div>
      </div>
  );
}

export const PANES = [
  {
    id: "notebook",
    label: "Notebook",
    active: "notebook",
    crumb: "notebooks / true-shooting",
    actions: <ActionPill icon={CheckIcon}>saved</ActionPill>,
    paneClass: "px-3 py-4 md:px-5 md:py-5",
    body: <NotebookPane />,
  },
  {
    id: "boards",
    label: "Board",
    active: "boards",
    crumb: "boards / lineup-study",
    actions: <ActionPill icon={PinIcon}>4 pinned</ActionPill>,
    paneClass: "px-3 py-4 md:px-5 md:py-5",
    body: <BoardsPane />,
  },
  {
    id: "scouting",
    label: "Scouting",
    active: "explore",
    crumb: "scouting / efficiency-board",
    actions: <ActionPill>2 comparing</ActionPill>,
    paneClass: "flex flex-col px-0 py-0",
    body: <ScoutPane />,
  },
  {
    id: "trades",
    label: "Trades",
    active: "trades",
    crumb: "trades / giannis-ad",
    actions: <ActionPill icon={CheckIcon}>legal</ActionPill>,
    paneClass: "flex flex-col px-3 py-4 md:px-5 md:py-5",
    body: <TradesPane />,
  },
  {
    id: "report",
    label: "Report",
    active: "reports",
    crumb: "reports / midseason-review",
    actions: (
      <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-medium text-surface">
        <DownloadIcon className="size-3" /> export
      </span>
    ),
    paneClass: "px-0 py-0",
    body: <ReportPane />,
  },
];

export { Bars, MiniTable, Spark, Ring, Rise, Cite };
