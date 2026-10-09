import { BarNav, Cta, Foot, Page } from "@/components/v/kit";
import { Sql } from "@/components/workbench/Primitives";
import { rows, runSteps } from "@/components/workbench/data";
import { HostSection, Questions } from "@/components/landing/Sections";
import { BlurFade } from "@/components/ui/blur-fade";

export default function B() {
  return (
    <Page>
      <BarNav max="max-w-[880px]" />
      <main className="mx-auto max-w-[880px] px-5 md:px-6">
        <section className="pt-16 md:pt-24">
          <h1 className="max-w-[720px] text-[40px] leading-[44px] md:text-[64px] md:leading-[66px]">The open-source analyst for NBA data</h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-[27px] text-ink-2">Ask in plain English. dime writes the SQL, runs it on your DuckDB file and saves every cell to your repo.</p>
          <div className="mt-8"><Cta /></div>
        </section>
        <section id="notebooks" className="mt-16 md:mt-24">
          <div className="overflow-hidden rounded-[12px] bg-field font-mono text-[13px] leading-[22px] shadow-[0_0_0_1px_var(--line)]">
            <div className="flex h-9 items-center border-b border-line px-4 text-[11px] text-ink-3">~/dime/wing-efficiency</div>
            <div className="space-y-6 p-5 md:p-7">
              <BlurFade delay={0.05}><p className="text-ink"><span className="text-[var(--cobalt-tx)]">&gt; </span>Which wings over 500 minutes have the best true shooting?</p></BlurFade>
              <BlurFade delay={0.35}>
                <div>
                  {runSteps.map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 text-ink-2"><span><span className="text-green">ok </span>{s.label} <span className="text-ink-3">{s.detail}</span></span><span className="text-ink-3">{s.ms}</span></div>
                  ))}
                </div>
              </BlurFade>
              <BlurFade delay={0.65}><Sql /></BlurFade>
              <BlurFade delay={0.95}>
                <table className="w-full max-w-[520px] text-left text-ink-2">
                  <thead className="text-ink-3"><tr><th className="py-1 font-normal">player</th><th className="font-normal">team</th><th className="text-right font-normal">ts%</th><th className="text-right font-normal">usg%</th></tr></thead>
                  <tbody className="tabular-nums">
                    {rows.map((r, i) => (
                      <tr key={r.player} className={i === 0 ? "text-ink" : ""}><td className="py-1">{r.player}</td><td>{r.team}</td><td className="text-right">{r.ts}</td><td className="text-right">{r.usg}</td></tr>
                    ))}
                  </tbody>
                </table>
              </BlurFade>
              <BlurFade delay={1.2}><p className="text-ink-3">saved 4 cells, committed 4f2a9c1</p></BlurFade>
            </div>
          </div>
        </section>
        <div id="skills" />
        <HostSection />
        <Questions />
      </main>
      <div className="mt-24"><Foot max="max-w-[880px]" /></div>
    </Page>
  );
}
