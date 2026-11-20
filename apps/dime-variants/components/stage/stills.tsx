import type { ReactNode } from "react";
import { Check, Download, Pin, Scale, Search } from "lucide-react";
import { ActionPill, AppShell, Card, Cell, Headshot, Pill } from "./app-shell";
import { CLUTCH, CLUTCH_COUNT, LINEUPS, LINEUP_COUNT } from "@/lib/exhibits";

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
            <th key={h} className={`h-7 border-b border-line px-2 font-mono text-[11px] font-normal text-ink-3 ${i > 1 ? "text-right" : "text-left"}`}>
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
        <div key={label} className="flex items-center gap-3">
          <span className="w-32 truncate text-[12px] text-ink-2 md:w-40">{label}</span>
          <div className="h-[18px] flex-1 rounded-[4px] bg-field">
            <div
              className={`h-full rounded-[4px] ${i === 0 ? "bg-accent" : "bg-accent/45"}`}
              style={{ width: `${Math.max(4, (v / max) * 100)}%` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-[12px] tabular-nums text-ink">{v.toFixed(1)}{unit}</span>
        </div>
      ))}
    </div>
  );
}

export function NotebookStill() {
  return (
    <AppShell
      active="notebook"
      crumb="notebooks / true-shooting"
      actions={<ActionPill icon={<Check size={12} />}>saved</ActionPill>}
      paneClass="px-3 py-4 md:px-5 md:py-5"
    >
      <div className="mx-auto flex h-full max-w-[640px] flex-col gap-3 overflow-hidden">
        <Cell n={1} kind="ask" meta={<span className="font-mono text-[11px]">11:42</span>}>
          <p className="text-[13.5px] leading-6 text-ink">
            Who leads the league in true shooting among rotation players?{" "}
            <Pill>@silver_advanced</Pill> <Pill>/leaderboard</Pill>
          </p>
        </Cell>
        <Cell n={2} kind="sql" meta={<ActionPill icon={<Check size={12} />}>5 rows · 41 ms</ActionPill>}>
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
        <Cell n={3} kind="chart" meta={<ActionPill icon={<Pin size={11} />}>pinned</ActionPill>}>
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
        <Cell n={4} kind="note">
          <p className="text-[13px] leading-6 text-ink-2">
            Kennard edges Duren by 0.1 on a third of the usage. Jokić is the outlier: top-five efficiency at <span className="font-mono text-[12.5px] text-ink">28.9%</span> usage, nearly double anyone else on the list.
          </p>
        </Cell>
      </div>
    </AppShell>
  );
}

export function BoardsStill() {
  return (
    <AppShell
      active="boards"
      crumb="boards / lineup-study"
      actions={<ActionPill icon={<Pin size={11} />}>4 pinned</ActionPill>}
      paneClass="px-3 py-4 md:px-5 md:py-5"
    >
      <div className="grid h-full grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
        <Card title="Five-man net rating" source="silver_lineups · min 200 poss" wide>
          <Bars
            max={28}
            rows={LINEUPS.map(([names, team, gp, poss, ortg, drtg, net]) => [`${names.split(" - ")[0]} +4 · ${team}`, net] as [string, number])}
          />
        </Card>
        <Card title="Clutch scoring" source="silver_boxscores · ≤5 pts, 4Q/OT">
          <MiniTable
            head={["player", "pts", "fg%", "gp"]}
            rows={CLUTCH.slice(0, 4).map(([name, team, gp, pts, fga, fg, pm]) => [name, String(pts), fg.toFixed(1), String(gp)])}
          />
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[12px] bg-surface p-4 shadow-[0_0_0_1px_var(--line)]">
            <div className="num text-[26px] font-medium tabular-nums text-ink">+26.4</div>
            <div className="mt-1 text-[12px] text-ink-2">CHA starters, best net</div>
          </div>
          <div className="rounded-[12px] bg-surface p-4 shadow-[0_0_0_1px_var(--line)]">
            <div className="num text-[26px] font-medium tabular-nums text-ink">{CLUTCH_COUNT}</div>
            <div className="mt-1 text-[12px] text-ink-2">clutch-qualified players</div>
          </div>
          <div className="col-span-2 rounded-[12px] bg-surface p-4 shadow-[0_0_0_1px_var(--line)]">
            <div className="flex items-baseline justify-between">
              <span className="num text-[22px] font-medium tabular-nums text-ink">{LINEUP_COUNT}</span>
              <span className="font-mono text-[11px] text-ink-3">lineups ≥ 200 poss</span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-[3px]">
              {LINEUPS.map((l, i) => (
                <div key={i} className={`flex-1 rounded-t-[2px] ${i === 0 ? "bg-accent" : "bg-accent/35"}`} style={{ height: `${(l[6] / 28) * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const SCOUT = [
  { img: "/dime-site/headshots/kennard.png", name: "Luke Kennard", team: "LAL", pos: "SG", ts: "68.9", usg: "13.1", age: 29 },
  { img: "/dime-site/headshots/duren.png", name: "Jalen Duren", team: "DET", pos: "C", ts: "68.8", usg: "23.1", age: 22 },
  { img: "/dime-site/headshots/ayton.png", name: "Deandre Ayton", team: "LAL", pos: "C", ts: "67.6", usg: "16.4", age: 27 },
  { img: "/dime-site/headshots/queta.png", name: "Neemias Queta", team: "BOS", pos: "C", ts: "67.4", usg: "14.5", age: 26 },
  { img: "/dime-site/headshots/jokic.png", name: "Nikola Jokić", team: "DEN", pos: "C", ts: "67.0", usg: "28.9", age: 30 },
];

export function ScoutStill() {
  return (
    <AppShell
      active="explore"
      crumb="scouting / efficiency-board"
      actions={
        <>
          <span className="hidden h-7 items-center gap-2 rounded-full bg-field px-3 font-mono text-[11px] text-ink-3 shadow-[0_0_0_1px_var(--line)] sm:inline-flex">
            <Search size={12} /> min 1,500 min
          </span>
          <ActionPill>2 comparing</ActionPill>
        </>
      }
      paneClass="flex flex-col px-0 py-0"
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["#", "player", "team", "ts%", "usg%", "age"].map((h, i) => (
                <th key={h} className={`h-9 border-b border-line px-3 font-mono text-[11px] font-normal text-ink-3 ${i >= 3 ? "text-right" : "text-left"} ${i === 5 ? "hidden sm:table-cell" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCOUT.map((p, i) => (
              <tr key={p.name} className={i < 2 ? "bg-accent-tint/60" : ""}>
                <td className="h-11 w-8 border-b border-line px-3 font-mono text-[12px] tabular-nums text-ink-3">{i + 1}</td>
                <td className="h-11 border-b border-line px-3">
                  <span className="flex items-center gap-2.5">
                    <Headshot src={p.img} alt={p.name} size={26} />
                    <span className="truncate text-[13px] font-medium text-ink">{p.name}</span>
                  </span>
                </td>
                <td className="h-11 border-b border-line px-3 font-mono text-[12px] text-ink-2">{p.team}</td>
                <td className="h-11 border-b border-line px-3 text-right font-mono text-[12.5px] font-medium tabular-nums text-ink">{p.ts}</td>
                <td className="h-11 border-b border-line px-3 text-right font-mono text-[12.5px] tabular-nums text-ink-2">{p.usg}</td>
                <td className="hidden h-11 border-b border-line px-3 text-right font-mono text-[12.5px] tabular-nums text-ink-2 sm:table-cell">{p.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 border-t border-line bg-surface px-4 py-3">
        <div className="mb-2 font-mono text-[11px] text-ink-3">compare</div>
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
                      <span className="w-7 font-mono text-[10px] text-ink-3">{l}</span>
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
    </AppShell>
  );
}

export function TradesStill() {
  return (
    <AppShell
      active="trades"
      crumb="trades / giannis-ad"
      actions={<ActionPill icon={<Scale size={12} />}>legal · within 125%</ActionPill>}
      paneClass="flex flex-col px-3 py-4 md:px-5 md:py-5"
    >
      <div className="grid min-h-0 flex-1 content-start grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
        {[
          { team: "MIA", label: "receives", rows: [["Anthony Davis", "davis", "58.5", "35.3"]], picks: [] as string[], sends: "Giannis Antetokounmpo" },
          { team: "WAS", label: "receives", rows: [["Giannis Antetokounmpo", "giannis", "58.5", "35.3"]], picks: ["2028 1st (top-4 prot.)", "2030 pick swap"], sends: "Anthony Davis" },
        ].map((side) => (
          <div key={side.team} className="overflow-hidden rounded-[12px] bg-surface shadow-[0_0_0_1px_var(--line)]">
            <div className="flex h-10 items-center justify-between border-b border-line px-4">
              <span className="font-mono text-[13px] font-medium text-ink">{side.team}</span>
              <span className="font-mono text-[11px] text-ink-3">{side.label}</span>
            </div>
            <div className="p-3">
              {side.rows.map(([name, img, sal, cap]) => (
                <div key={name} className="flex items-center gap-3 rounded-[8px] px-2 py-2">
                  <Headshot src={`/dime-site/headshots/${img}.png`} alt={name} size={34} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-ink">{name}</div>
                    <div className="font-mono text-[11px] text-ink-3">${sal}M · {cap}% of cap</div>
                  </div>
                  <span className="font-mono text-[11px] text-ink-2">in</span>
                </div>
              ))}
              {side.picks.map((p) => (
                <div key={p} className="flex items-center gap-3 px-2 py-2">
                  <span className="flex size-[34px] items-center justify-center rounded-full bg-field font-mono text-[11px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">pick</span>
                  <span className="flex-1 text-[12.5px] text-ink-2">{p}</span>
                  <span className="font-mono text-[11px] text-ink-2">in</span>
                </div>
              ))}
              <div className="mt-1 flex items-center gap-3 border-t border-line px-2 py-2">
                <span className="w-[34px] text-center font-mono text-[11px] text-ink-3">out</span>
                <span className="flex-1 truncate text-[12.5px] text-ink-2">{side.sends} · $58.5M</span>
              </div>
            </div>
            <div className="border-t border-line px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="w-16 font-mono text-[10.5px] text-ink-3">cap hit</span>
                <div className="h-[6px] flex-1 rounded-full bg-field">
                  <div className="h-full rounded-full bg-accent/70" style={{ width: "35.3%" }} />
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
          <span className="text-ink-2">match <span className="tabular-nums text-ink">100.0%</span></span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-ink-2"><Check size={12} className="text-accent-ink" />both below second apron</span>
        </div>
      </div>
    </AppShell>
  );
}

export function ReportStill() {
  return (
    <AppShell
      active="reports"
      crumb="reports / midseason-review"
      actions={
        <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-medium text-surface">
          <Download size={12} /> export
        </span>
      }
      paneClass="px-0 py-0"
    >
      <div className="flex h-full min-h-0">
        <div className="hidden w-44 shrink-0 border-r border-line py-4 md:block">
          {["Summary", "True shooting", "Clutch pool", "Method"].map((s, i) => (
            <div key={s} className={`mx-2 flex h-8 items-center rounded-[8px] px-2.5 text-[12.5px] ${i === 0 ? "bg-hover-2 text-ink" : "text-ink-2"}`}>{s}</div>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto max-w-[560px]">
            <h3 className="text-[17px] font-semibold text-ink">Midseason efficiency review</h3>
            <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-ink-3">
              <span>generated from true-shooting</span>
              <span>·</span>
              <span>4 sources</span>
            </div>
            <p className="mt-4 text-[13.5px] leading-7 text-ink-2">
              Among <span className="font-medium text-ink">164 rotation players</span> (≥1,500 minutes), Luke Kennard leads the league at <span className="font-mono text-[13px] font-medium text-ink">68.9%</span> true shooting, edging Jalen Duren (<span className="font-mono text-[13px] text-ink">68.8%</span>) on a third of the usage. <Pill>silver_advanced</Pill>
            </p>
            <p className="mt-3 text-[13.5px] leading-7 text-ink-2">
              Nikola Jokić remains the workload outlier — top-five efficiency (<span className="font-mono text-[13px] text-ink">67.0%</span>) at <span className="font-mono text-[13px] text-ink">28.9%</span> usage, nearly double every other name on the board. <Pill>silver_advanced</Pill>
            </p>
            <div className="mt-4 rounded-[10px] bg-field p-3.5">
              <MiniTable
                head={["player", "team", "ts%", "usg%"]}
                rows={[
                  ["L. Kennard", "LAL", "68.9", "13.1"],
                  ["J. Duren", "DET", "68.8", "23.1"],
                  ["N. Jokić", "DEN", "67.0", "28.9"],
                ]}
              />
            </div>
            <p className="mt-4 text-[13.5px] leading-7 text-ink-2">
              The clutch pool stands at <span className="font-mono text-[13px] text-ink">492 qualified players</span>; Shai Gilgeous-Alexander tops it at 175 points on 51.5% shooting. <Pill>silver_boxscores</Pill>
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
