import { InView } from "@/components/ui/in-view";
import { Card } from "@/components/ui/card";
import { Sql, Pill } from "@/components/workbench/Primitives";
import { skills, commits } from "@/components/workbench/data";
import { Zap } from "lucide-react";
import { copy } from "@/lib/copy";

const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

function Pillar({ title, text, children, delay }: { title: string; text: string; children: React.ReactNode; delay: number }) {
  return (
    <InView variants={reveal} transition={{ duration: 0.3, delay, ease: [0.23, 1, 0.32, 1] }} viewOptions={{ once: true, margin: "0px 0px -8% 0px" }}>
      <Card className="h-full min-w-0 gap-0 rounded-[14px] border-0 bg-field p-0 shadow-[0_0_0_1px_var(--line)]">
        <div className="min-h-[236px] border-b border-line p-5">{children}</div>
        <div className="p-5">
          <h3 className="text-[18px] font-semibold leading-[24px]">{title}</h3>
          <p className="mt-2 text-[14px] leading-[22px] text-ink-2">{text}</p>
        </div>
      </Card>
    </InView>
  );
}

export function Pillars() {
  return (
    <section id="notebooks" className="scroll-mt-24 px-5 pt-24 md:px-0 md:pt-[96px]">
      <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
        <Pillar delay={0} title={copy.pillars[0].title} text={copy.pillars[0].text}>
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-ink-3"><span>cells/02-sql.sql</span><Pill tone="ok">ran 41 ms</Pill></div>
          <Sql />
        </Pillar>
        <Pillar delay={0.06} title={copy.pillars[1].title} text={copy.pillars[1].text}>
          <div id="skills" className="scroll-mt-24 flex flex-col gap-2.5">
            {skills.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-[8px] bg-canvas px-3 py-2.5 shadow-[0_0_0_1px_var(--line)]">
                <b className="flex items-center gap-2 font-mono text-[12.5px] font-medium"><Zap size={13} className="text-ink-3" />{s.name}</b>
                <span className="font-mono text-[11px] text-ink-3">{s.steps.length} steps</span>
              </div>
            ))}
          </div>
        </Pillar>
        <Pillar delay={0.12} title={copy.pillars[2].title} text={copy.pillars[2].text}>
          <div className="flex flex-col">
            {commits.slice(0, 4).map((c, i) => (
              <div key={c.ref} className={`flex items-center justify-between gap-3 py-2.5 ${i ? "border-t border-line" : ""}`}>
                <span className="truncate text-[13px]">{c.msg}</span>
                <span className="font-mono text-[11px] text-ink-3">{c.ref}</span>
              </div>
            ))}
          </div>
        </Pillar>
      </div>
    </section>
  );
}
