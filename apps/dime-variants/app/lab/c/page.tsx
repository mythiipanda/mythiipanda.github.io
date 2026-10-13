"use client";

import { BookOpenText, GitCommit, Lightning, Database, Terminal, Check } from "@phosphor-icons/react";
import { Shell, Reveal, Foot, Star } from "../shell";
import { notes, rows, commits, skills, tables, runSteps } from "../data";

function Tile({ icon, title, line, className = "", children }: { icon: React.ReactNode; title: string; line?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`rd-card flex min-w-0 flex-col overflow-hidden rounded-[18px] bg-field p-5 md:p-6 ${className}`}>
      <div className="flex items-center gap-2 text-[15px] font-medium text-ink"><span className="text-[#2458F5]">{icon}</span>{title}</div>
      {line && <p className="mt-1 text-[15px] leading-[22px] text-ink-2">{line}</p>}
      <div className="mt-5 min-h-0 flex-1 overflow-hidden rounded-[12px] bg-canvas rd-win">{children}</div>
    </div>
  );
}

export default function C() {
  return (
    <Shell foot={false}>
      <section className="mx-auto max-w-[1320px] px-5 pt-28 md:px-6 md:pt-44">
        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <Tile icon={<BookOpenText size={18} />} title={notes.notebook.name} line={notes.notebook.line} className="h-full">
              <table className="w-full text-[14px]">
                <thead><tr className="lab-rule border-b text-left text-ink-2"><th className="px-4 py-2.5 font-medium">Player</th><th className="px-4 py-2.5 font-medium">Team</th><th className="px-4 py-2.5 text-right font-medium">TS%</th><th className="px-4 py-2.5 text-right font-medium">USG%</th></tr></thead>
                <tbody>{rows.map((r, i) => (
                  <tr key={r.player} className="lab-rule border-b last:border-0"><td className="px-4 py-2.5">{r.player}</td><td className="px-4 py-2.5 text-ink-2">{r.team}</td><td className="px-4 py-2.5 text-right tabular-nums">{r.ts.toFixed(1)}</td><td className="px-4 py-2.5 text-right tabular-nums text-ink-2">{r.usg.toFixed(1)}</td></tr>
                ))}</tbody>
              </table>
            </Tile>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <Tile icon={<Terminal size={18} />} title="Run" className="h-full">
              <ul className="divide-y lab-rule p-1">
                {runSteps.map((s) => (
                  <li key={s.label} className="flex items-center gap-2 px-3 py-2.5 text-[14px]"><Check size={14} className="text-[#2458F5]" /><span className="flex-1">{s.label}</span><span className="lab-mono text-[12px] text-ink-2">{s.ms}</span></li>
                ))}
              </ul>
            </Tile>
          </Reveal>
          <Reveal className="md:col-span-2">
            <Tile icon={<Lightning size={18} />} title={notes.skills.name} line={notes.skills.line} className="h-full">
              <ul className="divide-y lab-rule">
                {skills.map((s, i) => (
                  <li key={s.name} className={`flex items-center justify-between px-4 py-3 text-[14px] ${i === 0 ? "bg-surface" : ""}`}><span className="lab-mono">{s.name}</span><span className="lab-mono text-[12px] text-ink-2">SKILL.md</span></li>
                ))}
              </ul>
            </Tile>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <Tile icon={<GitCommit size={18} />} title={notes.history.name} line="Diff it. Roll it back." className="h-full">
              <ul className="divide-y lab-rule">
                {commits.slice(0, 3).map((c) => (
                  <li key={c.ref} className="px-4 py-3 text-[14px]"><div className="flex justify-between gap-3"><span className="truncate">{c.msg}</span><span className="lab-mono text-[12px] text-ink-2">{c.ref}</span></div><div className="lab-mono mt-1 text-[12px]"><span className="text-[#2458F5]">+{c.add}</span> <span className="text-ink-2">-{c.del}</span></div></li>
                ))}
              </ul>
            </Tile>
          </Reveal>
          <Reveal delay={160} className="md:col-span-2">
            <Tile icon={<Database size={18} />} title={notes.warehouse.name} line="Tables your agent can query." className="h-full">
              <ul className="divide-y lab-rule">
                {tables.slice(0, 4).map((t) => (
                  <li key={t.name} className="flex items-center justify-between px-4 py-3 text-[14px]"><span className="lab-mono">{t.name}</span><span className="text-[12px] tabular-nums text-ink-2">{t.rows}</span></li>
                ))}
              </ul>
            </Tile>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 pt-28 text-center md:px-6 md:pt-40">
        <Reveal>
          <h2 className="mx-auto max-w-[900px] text-balance text-[38px] leading-[40px] md:text-[64px] md:leading-[66px]">One agent, one workspace, all your NBA research.</h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[26px] text-ink-2">You ask. Dime researches and saves the work to your files.</p>
        </Reveal>
        <Reveal delay={150} className="mt-8 flex justify-center"><Star /></Reveal>
      </section>
      <Foot />
    </Shell>
  );
}
