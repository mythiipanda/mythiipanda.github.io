import { Close } from "@/components/v/Close";
import type { ReactNode } from "react";
import { DockNav, Cta, Foot, Page, SetupRows, Cap } from "@/components/v/kit";
import { Sql, Cell } from "@/components/workbench/Primitives";
import { rows } from "@/components/workbench/data";
import { SkillRows, CommitRows } from "@/components/v/features";
import { DimeMark } from "@/components/product/DimeMark";
import { short } from "@/lib/copy";

function Sheet({ id, label, k, children }: { id?: string; label: string; k?: "chat" | "notebook" | "warehouse" | "skills" | "git"; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto mt-6 w-full max-w-[1200px] rounded-[16px] border border-line p-6 md:min-h-[480px] md:p-12">
      <div className="mb-8 flex items-baseline justify-between gap-4 font-mono text-[12px] text-ink-3"><span>{label}</span>{k && <Cap k={k} className="min-w-0 flex-1 justify-end gap-4 [&_h3]:hidden" />}</div>
      {children}
    </section>
  );
}

export default function B() {
  return (
    <Page v="b">
      <DockNav />
      <main className="px-3 pb-24 pt-3 md:px-6 md:pt-6">
        <section className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-between overflow-hidden rounded-[16px] border border-line p-6 md:min-h-[600px] md:p-12">
          <div className="absolute right-6 top-6 md:right-12 md:top-12"><DimeMark size={56} /></div>
          <h1 className="clip-reveal mt-16 text-[34px] leading-[38px] md:mt-24 md:text-[48px] md:leading-[56px]"><span className="block"><span>{short.h1a}</span></span><span className="block md:pl-24"><span style={{ ["--d" as string]: "0.09s" }}>{short.h1b}</span></span></h1>
          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[360px] text-[14px] leading-[22px] text-ink-2">{short.sub}</p>
            <Cta />
          </div>
        </section>
        <Sheet id="notebooks" k="notebook" label="01">
          <div className="grid gap-10">
            <div className="flex flex-col gap-3">
              <Cell n={1} kind="prompt"><p className="text-[13px] text-ink">Who had the best true shooting in 2025-26 with 1,500 or more minutes?</p></Cell>
              <Cell n={2} kind="sql"><Sql /></Cell>
              <Cell n={3} kind="table">
                <table className="w-full text-left text-[12.5px]"><tbody className="tabular-nums text-ink-2">
                  {rows.map((r) => (<tr key={r.player} className="border-t border-line first:border-t-0"><td className="py-1.5 text-ink">{r.player}</td><td>{r.team}</td><td className="text-right">{r.ts}</td></tr>))}
                </tbody></table>
              </Cell>
              
            </div>
          </div>
        </Sheet>
        <Sheet id="skills" k="skills" label="02">
          <SkillRows />
        </Sheet>
        <Sheet k="git" label="03">
          <CommitRows />
        </Sheet>
        <Sheet label="04">
          <SetupRows title />
        </Sheet>
        <Close max="max-w-[1200px]" cmd={false} />
      </main>
      <div className="pb-14"><Foot max="max-w-[1200px]" /></div>
    </Page>
  );
}
