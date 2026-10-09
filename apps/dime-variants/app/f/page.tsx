import { BarNav, Cta, Foot, Page } from "@/components/v/kit";
import { Sql } from "@/components/workbench/Primitives";
import { commits } from "@/components/workbench/data";
import { HostSection, Questions } from "@/components/landing/Sections";
import { copy } from "@/lib/copy";

export default function F() {
  return (
    <Page v="f">
      <BarNav />
      <main className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-14 md:px-6 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-[40px] leading-[44px] md:text-[56px] md:leading-[58px]">The open-source analyst for NBA data</h1>
          <p className="mt-6 max-w-[420px] text-[17px] leading-[27px] text-ink-2">{copy.hero.sub}</p>
          <div className="mt-8"><Cta /></div>
        </aside>
        <ol id="notebooks" className="relative min-w-0 border-l border-line pl-6 md:pl-10">
          {commits.map((c, i) => (
            <li key={c.ref} className="relative pb-12 last:pb-0">
              <span className={`absolute -left-[31px] top-1.5 size-[11px] rounded-full md:-left-[47px] ${i === 0 ? "bg-accent" : "bg-line-strong"}`} />
              <div className="flex items-center gap-3 font-mono text-[12px] text-ink-3"><span className="text-[var(--cobalt-tx)]">{c.ref}</span><span>{c.when}</span></div>
              <h2 className="mt-2 text-[22px] leading-[28px] md:text-[26px] md:leading-[32px]">{c.msg}</h2>
              <div className="mt-4 overflow-hidden rounded-[10px] bg-field shadow-[0_0_0_1px_var(--line)]">
                {c.files.map((f) => (
                  <div key={f} className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[12.5px] last:border-b-0"><span className="text-ink-2">{f}</span><span><span className="text-green">+{c.add}</span> <span className="text-red">-{c.del}</span></span></div>
                ))}
                {i === 0 && <div className="border-t border-line bg-canvas p-4"><Sql /></div>}
              </div>
            </li>
          ))}
        </ol>
      </main>
      <div id="skills" className="mx-auto max-w-[1200px] px-0 md:px-6"><HostSection /><Questions /></div>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
