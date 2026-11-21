"use client";

import { useState } from "react";
import { Headshot } from "./app-shell";
import { Spark } from "./viz";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSortHead, type TableSort } from "../beautiful/primitives/Table";

const SCOUT = [
  { img: "/dime-site/headshots/kennard.png", name: "Luke Kennard", team: "LAL", pos: "SG", ts: "68.9", usg: "13.1", age: 29, trend: [61.2, 62.8, 64.5, 63.9, 66.1, 68.9] },
  { img: "/dime-site/headshots/duren.png", name: "Jalen Duren", team: "DET", pos: "C", ts: "68.8", usg: "23.1", age: 22, trend: [63.4, 65.1, 64.2, 66.8, 67.5, 68.8] },
  { img: "/dime-site/headshots/ayton.png", name: "Deandre Ayton", team: "LAL", pos: "C", ts: "67.6", usg: "16.4", age: 27, trend: [64.0, 65.5, 66.9, 66.2, 67.1, 67.6] },
  { img: "/dime-site/headshots/queta.png", name: "Neemias Queta", team: "BOS", pos: "C", ts: "67.4", usg: "14.5", age: 26, trend: [62.6, 64.9, 65.8, 66.0, 66.8, 67.4] },
  { img: "/dime-site/headshots/jokic.png", name: "Nikola Jokić", team: "DEN", pos: "C", ts: "67.0", usg: "28.9", age: 30, trend: [65.8, 66.4, 66.1, 67.2, 66.6, 67.0] },
];

function ScoutPane() {
  const [sort, setSort] = useState<TableSort>({ id: "ts", desc: true });
  const toggle = (id: string) =>
    setSort((cur) => (cur?.id === id ? (cur.desc ? { id, desc: false } : undefined) : { id, desc: true }));
  const rows = [...SCOUT].sort((a, b) => {
    if (!sort) return 0;
    const va = sort.id === "player" ? a.name : sort.id === "team" ? a.team : sort.id === "age" ? a.age : Number(a[sort.id as "ts" | "usg"]);
    const vb = sort.id === "player" ? b.name : sort.id === "team" ? b.team : sort.id === "age" ? b.age : Number(b[sort.id as "ts" | "usg"]);
    return (typeof va === "string" ? va.localeCompare(vb as string) : (va as number) - (vb as number)) * (sort.desc ? -1 : 1);
  });
  return (
    <>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Table variant="default" size="default" scrollFade={false}>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9 w-8 px-3 text-[11px]">#</TableHead>
              <TableSortHead id="player" sort={sort} onSort={toggle} title="player" className="h-9 px-3" />
              <TableSortHead id="team" sort={sort} onSort={toggle} title="team" className="h-9 px-3" />
              <TableSortHead id="ts" sort={sort} onSort={toggle} title="ts%" align="end" className="h-9 px-3" />
              <TableSortHead id="usg" sort={sort} onSort={toggle} title="usg%" align="end" className="h-9 px-3" />
              <TableHead className="hidden h-9 px-3 text-[11px] lg:table-cell">trend</TableHead>
              <TableSortHead id="age" sort={sort} onSort={toggle} title="age" align="end" className="hidden h-9 px-3 lg:table-cell" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p, i) => (
              <TableRow key={p.name} className={`rise-in ${i < 2 ? "bg-accent-tint/60" : ""}`} style={{ animationDelay: `${i * 55}ms` }}>
                <TableCell className="h-11 w-8 px-3 font-mono text-[12px] text-ink-3">
                  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-[5px] ${i < 2 ? "bg-accent/15 font-medium text-accent-ink" : ""}`}>{i + 1}</span>
                </TableCell>
                <TableCell className="h-11 px-3">
                  <span className="flex items-center gap-2.5">
                    <Headshot src={p.img} alt={p.name} size={26} />
                    <span className="truncate text-[13px] font-medium text-ink">{p.name}</span>
                  </span>
                </TableCell>
                <TableCell className="h-11 px-3 font-mono text-[12px] text-ink-2">{p.team}</TableCell>
                <TableCell align="end" className="h-11 px-3 font-mono text-[12.5px] font-medium text-ink">{p.ts}</TableCell>
                <TableCell align="end" className="h-11 px-3 font-mono text-[12.5px] text-ink-2">{p.usg}</TableCell>
                <TableCell className="hidden h-11 px-3 lg:table-cell"><Spark points={p.trend} w={60} h={18} /></TableCell>
                <TableCell align="end" className="hidden h-11 px-3 font-mono text-[12.5px] text-ink-2 lg:table-cell">{p.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

export default ScoutPane;
