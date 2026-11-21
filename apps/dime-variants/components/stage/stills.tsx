import type { ReactNode } from "react";
import { ArrowLeftRightIcon, CheckIcon, DownloadIcon, PinIcon } from "lucide-react";
import { ActionPill, Card, Cell, Headshot } from "./app-shell";
import DiffTable from "../beautiful/primitives/DiffTable";
import ScoutPane from "./scout-pane";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../beautiful/primitives/Table";
import CodeBlock from "../beautiful/primitives/CodeBlock";
import { Spark, Ring, Rise } from "./viz";
import { CLUTCH, CLUTCH_COUNT, LINEUPS, LINEUP_COUNT } from "@/lib/exhibits";
import { CiteChip } from "./chat-window";

function MiniTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Table variant="default" size="xs" scrollFade={false}>
      <TableHeader>
        <TableRow>
          {head.map((h, i) => (
            <TableHead key={h} align={i > 1 ? "end" : "start"} className="text-[11px]">
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>
            {r.map((c, j) => (
              <TableCell key={j} align={j > 1 ? "end" : "start"} className={`text-[12.5px] ${j > 1 ? "font-mono tabular-nums" : ""}`}>
                {c}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
          <CodeBlock
            flat
            wide
            filename="cell.sql"
            lines={[
              "select PLAYER_NAME, TEAM,",
              "       TS_PCT, USG_PCT",
              "from silver_advanced",
              "where MIN >= 1500",
              "order by TS_PCT desc limit 5",
            ]}
          />
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

function TradesPane() {
  return (
    <>
      <div className="relative grid min-h-0 flex-1 content-start grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
        <span className="pop-in absolute left-1/2 top-[46%] z-10 hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface shadow-[0_0_0_1px_var(--line)] md:flex" style={{ animationDelay: "420ms" }}>
          <ArrowLeftRightIcon className="size-3.5 text-accent-ink" />
        </span>
        <Rise delay={0}>
          <DiffTable
            title="MIA receives"
            rows={[{ key: "giannis", id: "Giannis Antetokounmpo", dept: "Player", email: "$58.5M · to WAS", removed: true }]}
            added={[{ key: "ad", id: "Anthony Davis", dept: "Player", email: "$58.5M · from WAS" }]}
          />
        </Rise>
        <Rise delay={90}>
          <DiffTable
            title="WAS receives"
            rows={[{ key: "ad", id: "Anthony Davis", dept: "Player", email: "$58.5M · to MIA", removed: true }]}
            added={[
              { key: "giannis", id: "Giannis Antetokounmpo", dept: "Player", email: "$58.5M · from MIA" },
              { key: "p1", id: "2028 1st (top-4 prot.)", dept: "Pick", email: "from MIA" },
              { key: "p2", id: "2030 pick swap", dept: "Pick", email: "from MIA" },
            ]}
          />
        </Rise>
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
              Among <span className="font-medium text-ink">164 rotation players</span> (≥1,500 minutes), Luke Kennard leads the league at <span className="font-mono text-[13px] font-medium text-ink">68.9%</span> true shooting<CiteChip>1</CiteChip>, edging Jalen Duren (<span className="font-mono text-[13px] text-ink">68.8%</span>) on a third of the usage.
            </p>
            <p className="rise-in mt-3 text-[13.5px] leading-7 text-ink-2" style={{ animationDelay: "120ms" }}>
              Nikola Jokić remains the workload outlier, top-five efficiency (<span className="font-mono text-[13px] text-ink">67.0%</span>) at <span className="font-mono text-[13px] text-ink">28.9%</span> usage, nearly double every other name on the board.<CiteChip>2</CiteChip>
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
              The clutch pool stands at <span className="font-mono text-[13px] text-ink">492 qualified players</span>; Shai Gilgeous-Alexander tops it at 175 points on 51.5% shooting.<CiteChip>3</CiteChip>
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
    actions: <ActionPill icon={DownloadIcon}>export</ActionPill>,
    paneClass: "px-0 py-0",
    body: <ReportPane />,
  },
];

export { Bars, MiniTable, Spark, Ring, Rise };
