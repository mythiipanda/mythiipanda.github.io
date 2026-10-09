import { Sql, Pill } from "@/components/workbench/Primitives";
import { skills, commits, rows } from "@/components/workbench/data";
import { copy } from "@/lib/copy";

export function SkillRows() {
  return (
    <div className="border-t border-line">
      {skills.map((s) => (
        <div key={s.name} className="grid gap-1 border-b border-line py-4 md:grid-cols-[220px_1fr_80px] md:items-baseline md:gap-6">
          <span className="font-mono text-[14px] text-ink">{s.name}</span>
          <span className="text-[14px] leading-[22px] text-ink-2">{s.text}</span>
          <span className="font-mono text-[12px] text-ink-3 md:text-right">{s.runs} runs</span>
        </div>
      ))}
    </div>
  );
}

export function CommitRows() {
  return (
    <div className="border-t border-line">
      {commits.map((c) => (
        <div key={c.ref} className="flex items-center gap-4 border-b border-line py-3 font-mono text-[12.5px]">
          <span className="text-[var(--cobalt-tx)]">{c.ref}</span>
          <span className="min-w-0 flex-1 truncate text-ink-2">{c.msg}</span>
          <span className="text-ink-3">{c.when}</span>
        </div>
      ))}
    </div>
  );
}

export function FeatureStack() {
  const items = [
    { title: copy.pillars[0].title, text: copy.pillars[0].text, demo: <div className="rounded-[12px] bg-field p-5 shadow-[0_0_0_1px_var(--line)]"><div className="mb-3 flex justify-between font-mono text-[11px] text-ink-3"><span>cells/02-sql.sql</span><Pill tone="ok">ran 41 ms</Pill></div><Sql /></div> },
    { title: copy.pillars[1].title, text: copy.pillars[1].text, demo: <div className="rounded-[12px] bg-field p-5 shadow-[0_0_0_1px_var(--line)]"><SkillRows /></div> },
    { title: copy.pillars[2].title, text: copy.pillars[2].text, demo: <div className="rounded-[12px] bg-field p-5 shadow-[0_0_0_1px_var(--line)]"><CommitRows /></div> },
  ];
  return (
    <section id="notebooks" className="mt-24 flex flex-col gap-20 md:mt-32 md:gap-28">
      {items.map((it, i) => (
        <div key={it.title} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <h2 className="text-[28px] leading-[34px] md:text-[40px] md:leading-[44px]">{it.title}</h2>
            <p className="mt-4 max-w-[420px] text-[16px] leading-[26px] text-ink-2">{it.text}</p>
          </div>
          <div className="min-w-0">{it.demo}</div>
        </div>
      ))}
    </section>
  );
}

export function CapTable() {
  const caps = [
    ["notebook", "SQL, chart and note cells saved as plain files", "cells/"],
    ["skills", "Metrics and minute floors, loaded with /", "skills/"],
    ["history", "Staged on every run. Commit, diff, roll back", ".git"],
    ["warehouse", "One DuckDB file fetched by script", "nba.duckdb"],
  ];
  return (
    <section id="skills" className="mt-20 md:mt-28">
      <div className="overflow-hidden shadow-[0_0_0_1px_var(--line)]">
        <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-line bg-field px-5 py-3 font-mono text-[11px] text-ink-3 md:grid-cols-[180px_1fr_140px]"><span>feature</span><span className="hidden md:block">what it does</span><span className="text-right">where</span></div>
        {caps.map(([a, b, c]) => (
          <div key={a} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line px-5 py-5 last:border-b-0 md:grid-cols-[180px_1fr_140px]">
            <span className="font-mono text-[16px] text-ink">{a}</span>
            <span className="order-3 col-span-2 text-[14px] leading-[22px] text-ink-2 md:order-none md:col-span-1">{b}</span>
            <span className="text-right font-mono text-[13px] text-ink-3">{c}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ManSections() {
  return (
    <section id="notebooks" className="mt-16 flex flex-col gap-14 md:mt-24">
      {[
        ["notebooks", copy.pillars[0].text, <Sql key="s" />],
        ["skills", copy.pillars[1].text, <SkillRows key="k" />],
        ["history", copy.pillars[2].text, <CommitRows key="c" />],
      ].map(([t, x, d]) => (
        <div key={t as string} className="grid gap-4 md:grid-cols-[160px_1fr] md:gap-10">
          <h2 className="text-[16px] leading-[24px] text-ink-3"># {t as string}</h2>
          <div className="min-w-0"><p className="mb-5 max-w-[520px] text-[15px] leading-[24px] text-ink-2">{x as string}</p>{d}</div>
        </div>
      ))}
    </section>
  );
}

export function TopRows() {
  return (
    <table className="w-full text-left text-[13px]">
      <tbody className="tabular-nums text-ink-2">
        {rows.map((r) => (<tr key={r.player} className="border-t border-line"><td className="py-2 text-ink">{r.player}</td><td>{r.team}</td><td className="text-right">{r.ts}</td></tr>))}
      </tbody>
    </table>
  );
}
