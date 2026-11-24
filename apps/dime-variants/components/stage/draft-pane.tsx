"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSortHead, type TableSort } from "../beautiful/primitives/Table";

const BOARD = [
  { pick: 1, name: "Tyran Stokes", pos: "SF", school: "Kansas", pts: 14.8, reb: 8.0, ast: 2.0, ts: 61.6, usg: 27.7 },
  { pick: 2, name: "Caleb Holt", pos: "SG", school: "Arizona", pts: 17.6, reb: 7.0, ast: 1.2, ts: 59.1, usg: 25.4 },
  { pick: 3, name: "Quentin Coleman", pos: "SG/PG", school: "Illinois", pts: 17.8, reb: 6.8, ast: 4.4, ts: 66.6, usg: 25.8 },
  { pick: 4, name: "Jordan Smith Jr.", pos: "SG/PG", school: "Arkansas", pts: 13.2, reb: 3.2, ast: 2.4, ts: 52.0, usg: 24.5 },
  { pick: 5, name: "Stefan Joksimović", pos: "PG/SG", school: "Baskonia", pts: null, reb: null, ast: null, ts: null, usg: null },
  { pick: 6, name: "Bruce Branch III", pos: "SF", school: "BYU", pts: 15.0, reb: 4.6, ast: 2.8, ts: 57.8, usg: 27.0 },
  { pick: 7, name: "Amari Allen", pos: "SF", school: "Alabama", pts: 16.2, reb: 5.0, ast: 6.0, ts: 72.3, usg: 21.9 },
  { pick: 8, name: "Ivan Kharchenkov", pos: "SF", school: "Arizona", pts: 22.6, reb: 8.0, ast: 4.8, ts: 63.1, usg: 28.9 },
];

const GAPS = ["defensive rating · #27 of 30", "defensive rebounding · #30 of 30"];

const TARGETS = [
  { name: "Rudy Gobert", team: "MIN", type: "player opt", prior: "$36.5M", ppg: 10.9, rpg: 11.5, apg: 1.7 },
  { name: "De'Andre Hunter", team: "SAC", type: "ufa", prior: "$24.9M", ppg: 13.7, rpg: 4.1, apg: 2.0 },
  { name: "Luguentz Dort", team: "ATL", type: "ufa", prior: "$18.2M", ppg: 8.3, rpg: 3.6, apg: 1.2 },
];

const num = (v: number | null) => (v == null ? "—" : v.toFixed(1));

function DraftPane() {
  const [sort, setSort] = useState<TableSort>(undefined);
  const toggle = (id: string) =>
    setSort((cur) => (cur?.id === id ? (cur.desc ? { id, desc: false } : undefined) : { id, desc: true }));
  const rows = [...BOARD].sort((a, b) => {
    if (!sort) return a.pick - b.pick;
    const key = sort.id as "name" | "school" | "pts" | "ts" | "usg";
    const va = a[key] ?? -1;
    const vb = b[key] ?? -1;
    return (typeof va === "string" ? va.localeCompare(vb as string) : (va as number) - (vb as number)) * (sort.desc ? -1 : 1);
  });
  return (
    <>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Table variant="default" size="xs" scrollFade={false}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8 px-3 text-[11px]">#</TableHead>
              <TableSortHead id="name" sort={sort} onSort={toggle} title="player" className="px-3" />
              <TableHead className="px-3 text-[11px]">pos</TableHead>
              <TableSortHead id="school" sort={sort} onSort={toggle} title="school" className="px-3" />
              <TableSortHead id="pts" sort={sort} onSort={toggle} title="pts" align="end" className="px-3" />
              <TableHead className="hidden px-3 text-right text-[11px] lg:table-cell">reb</TableHead>
              <TableHead className="hidden px-3 text-right text-[11px] lg:table-cell">ast</TableHead>
              <TableSortHead id="ts" sort={sort} onSort={toggle} title="ts%" align="end" className="px-3" />
              <TableSortHead id="usg" sort={sort} onSort={toggle} title="usg%" align="end" className="hidden px-3 lg:table-cell" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p, i) => (
              <TableRow key={p.name} className="rise-in" style={{ animationDelay: `${i * 55}ms` }}>
                <TableCell className="w-8 px-3 font-mono text-[12px] text-ink-3">
                  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-[5px] ${i < 2 && !sort ? "bg-accent/15 font-medium text-accent-ink" : ""}`}>{p.pick}</span>
                </TableCell>
                <TableCell className="px-3"><span className="truncate text-[13px] font-medium text-ink">{p.name}</span></TableCell>
                <TableCell className="px-3 font-mono text-[12px] text-ink-2">{p.pos}</TableCell>
                <TableCell className="px-3 text-[12.5px] text-ink-2">{p.school}</TableCell>
                <TableCell align="end" className="px-3 text-[12.5px] tabular-nums text-ink">{num(p.pts)}</TableCell>
                <TableCell align="end" className="hidden px-3 text-[12.5px] tabular-nums text-ink-3 lg:table-cell">{num(p.reb)}</TableCell>
                <TableCell align="end" className="hidden px-3 text-[12.5px] tabular-nums text-ink-3 lg:table-cell">{num(p.ast)}</TableCell>
                <TableCell align="end" className="px-3 text-[12.5px] tabular-nums text-ink">{num(p.ts)}</TableCell>
                <TableCell align="end" className="hidden px-3 text-[12.5px] tabular-nums text-ink-3 lg:table-cell">{num(p.usg)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="rise-in shrink-0 border-t border-line bg-surface px-4 py-3" style={{ animationDelay: "320ms" }}>
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[11px] font-medium text-secondary-label">memphis fit</span>
          {GAPS.map((g) => (
            <span key={g} className="rounded-full bg-field px-2.5 py-0.5 text-[11px] text-ink-2">{g}</span>
          ))}
          <span className="ml-auto font-mono text-[11px] tabular-nums text-ink-3">$65.6M room</span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-3">
          {TARGETS.map((t) => (
            <div key={t.name} className="flex items-baseline justify-between gap-2 border-t border-line/60 pt-1.5">
              <span className="min-w-0 truncate text-[12.5px] font-medium text-ink">{t.name}</span>
              <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-ink-3">{t.team} · {t.type} · {t.prior}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DraftPane;
