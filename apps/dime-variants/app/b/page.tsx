import type { ReactNode } from "react";
import { DockNav, Cta, FaqList, Foot, Page, RoadmapRows, SetupRows } from "@/components/v/kit";
import { Sql, Cell } from "@/components/workbench/Primitives";
import { rows, runSteps } from "@/components/workbench/data";
import { SkillRows, CommitRows } from "@/components/v/features";
import { DimeMark } from "@/components/product/DimeMark";
import { copy } from "@/lib/copy";

const lines = [
  ["dime is an open-source", false],
  ["analyst for NBA data", true],
  ["you can host yourself,", false],
  ["with Chat for answers", true],
  ["and Projects for", false],
  ["notebooks kept in git", true],
] as const;

function Sheet({ id, label, children }: { id?: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto mt-6 w-full max-w-[1200px] rounded-[16px] border border-line p-6 md:min-h-[720px] md:p-12">
      <div className="mb-8 font-mono text-[12px] text-ink-3">{label}</div>
      {children}
    </section>
  );
}

export default function B() {
  return (
    <Page v="b">
      <DockNav />
      <main className="px-3 pb-24 pt-3 md:px-6 md:pt-6">
        <section className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-between overflow-hidden rounded-[16px] border border-line p-6 md:min-h-[720px] md:p-12">
          <div className="absolute right-6 top-6 md:right-12 md:top-12"><DimeMark size={56} /></div>
          <h1 className="mt-16 text-[19px] leading-[28px] md:mt-24 md:text-[48px] md:leading-[56px]">
            {lines.map(([t, off], i) => (
              <span key={t} className={`clip-reveal whitespace-nowrap ${off ? "md:pl-24" : ""}`}><span style={{ ["--d" as string]: `${i * 0.09}s` }}>{t}</span></span>
            ))}
          </h1>
          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[360px] text-[14px] leading-[22px] text-ink-2">Stat nerds first. No paid plan.</p>
            <Cta />
          </div>
        </section>
        <Sheet id="notebooks" label="01 / projects">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-[26px] leading-[32px] md:text-[34px] md:leading-[40px]">{copy.pillars[0].title}</h2>
              
            </div>
            <div className="flex flex-col gap-3">
              <Cell n={1} kind="prompt"><p className="text-[13px] text-ink">Which wings over 500 minutes have the best true shooting?</p></Cell>
              <Cell n={2} kind="sql"><Sql /></Cell>
              <Cell n={3} kind="table">
                <table className="w-full text-left text-[12.5px]"><tbody className="tabular-nums text-ink-2">
                  {rows.map((r) => (<tr key={r.player} className="border-t border-line first:border-t-0"><td className="py-1.5 text-ink">{r.player}</td><td>{r.team}</td><td className="text-right">{r.ts}</td></tr>))}
                </tbody></table>
              </Cell>
              <p className="font-mono text-[11px] text-ink-3">{runSteps.length} steps, saved to git. Sample data.</p>
            </div>
          </div>
        </Sheet>
        <Sheet id="skills" label="02 / skills">
          <h2 className="mb-8 max-w-[560px] text-[26px] leading-[32px] md:text-[34px] md:leading-[40px]">{copy.pillars[1].title}</h2>
          <SkillRows />
          
        </Sheet>
        <Sheet label="03 / history">
          <h2 className="mb-8 max-w-[560px] text-[26px] leading-[32px] md:text-[34px] md:leading-[40px]">{copy.pillars[2].title}</h2>
          <CommitRows />
        </Sheet>
        <Sheet label="04 / roadmap"><RoadmapRows /></Sheet>
        <Sheet label="05 / setup">
          <h2 className="mb-8 text-[26px] leading-[32px] md:text-[34px]">Runs on your machine</h2>
          <SetupRows />
          <FaqList />
        </Sheet>
      </main>
      <div className="pb-14"><Foot max="max-w-[1200px]" /></div>
    </Page>
  );
}
