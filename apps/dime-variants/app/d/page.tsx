import { BarNav, Cta, Foot, Page } from "@/components/v/kit";
import { Cell, Pill, Sql } from "@/components/workbench/Primitives";
import { rows, skills, commits } from "@/components/workbench/data";
import { HostSection, Questions } from "@/components/landing/Sections";
import { copy } from "@/lib/copy";

export default function D() {
  return (
    <Page>
      <BarNav max="max-w-[760px]" />
      <main className="mx-auto flex max-w-[760px] flex-col gap-4 px-5 pt-14 md:px-6 md:pt-20">
        <Cell n={1} kind="ask">
          <h1 className="text-[34px] leading-[38px] md:text-[48px] md:leading-[52px]">The open-source analyst for NBA data</h1>
          <p className="mt-4 text-[16px] leading-[26px] text-ink-2">{copy.hero.sub}</p>
          <div className="mt-6"><Cta /></div>
        </Cell>
        <div id="notebooks" />
        <Cell n={2} kind="sql" meta={<Pill tone="ok">ran 41 ms</Pill>}>
          <h2 className="mb-4 text-[22px] leading-[28px]">{copy.pillars[0].title}</h2>
          <Sql />
        </Cell>
        <Cell n={3} kind="table" meta={<span className="font-mono">61 rows</span>}>
          <table className="w-full text-left text-[13px]">
            <thead className="font-mono text-[11px] text-ink-3"><tr><th className="py-1.5 font-normal">player</th><th className="font-normal">team</th><th className="text-right font-normal">ts%</th><th className="text-right font-normal">usg%</th></tr></thead>
            <tbody className="tabular-nums text-ink-2">
              {rows.map((r) => (
                <tr key={r.player} className="border-t border-line"><td className="py-2 text-ink">{r.player}</td><td>{r.team}</td><td className="text-right">{r.ts}</td><td className="text-right">{r.usg}</td></tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <div id="skills" />
        <Cell n={4} kind="skills">
          <h2 className="mb-4 text-[22px] leading-[28px]">{copy.pillars[1].title}</h2>
          <div className="flex flex-col">
            {skills.map((s) => (
              <div key={s.name} className="flex items-baseline justify-between gap-4 border-t border-line py-3 text-[14px]"><span className="font-mono text-ink">{s.name}</span><span className="hidden text-ink-2 sm:block">{s.text}</span></div>
            ))}
          </div>
        </Cell>
        <Cell n={5} kind="git">
          <h2 className="mb-4 text-[22px] leading-[28px]">{copy.pillars[2].title}</h2>
          {commits.map((c) => (
            <div key={c.ref} className="flex items-center justify-between gap-4 border-t border-line py-3 font-mono text-[12.5px]"><span className="text-[var(--cobalt-tx)]">{c.ref}</span><span className="flex-1 truncate text-ink-2">{c.msg}</span><span className="text-ink-3">{c.when}</span></div>
          ))}
        </Cell>
      </main>
      <div className="mx-auto max-w-[760px]"><HostSection /><Questions /></div>
      <div className="mt-24"><Foot max="max-w-[760px]" /></div>
    </Page>
  );
}
