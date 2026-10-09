import { Cta, Page } from "@/components/v/kit";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink } from "@/components/landing/ui";
import { Cell, Pill, Sql } from "@/components/workbench/Primitives";
import { rows } from "@/components/workbench/data";
import { SkillRows, CommitRows } from "@/components/v/features";
import { SetupCells } from "@/components/v/cells";
import { hero } from "@/lib/variants";
import { copy, REPO } from "@/lib/copy";

const toc = [["ask", "1"], ["query", "2"], ["table", "3"], ["skills", "4"], ["history", "5"], ["setup", "6"]];

export default function D() {
  return (
    <Page v="d">
      <div className="mx-auto grid max-w-[1100px] gap-0 px-5 md:grid-cols-[200px_minmax(0,1fr)] md:gap-14 md:px-6">
        <aside className="flex items-center justify-between py-4 md:sticky md:top-0 md:h-screen md:flex-col md:items-start md:justify-between md:py-8">
          <a href="#top" aria-label="dime home"><Logo /></a>
          <ol className="hidden font-mono text-[12.5px] md:block">
            {toc.map(([t, n]) => (
              <li key={t}><a href={`#${t}`} className="flex gap-3 py-1.5 text-ink-3 transition-colors hover:text-ink"><span className="w-3 text-right">{n}</span>{t}</a></li>
            ))}
          </ol>
          <div className="flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill">Star on GitHub</ButtonLink></div>
        </aside>
        <main className="flex min-w-0 flex-col gap-5 pb-24 pt-6 md:pt-16">
          <div id="ask"><Cell n={1} kind="ask">
            <h1 className="text-[44px] md:text-[72px]">{hero.d.h1}</h1>
            <p className="mt-5 max-w-[520px] text-[16px] leading-[26px] text-ink-2">{hero.d.sub}</p>
            <div className="mt-7"><Cta /></div>
          </Cell></div>
          <div id="query"><Cell n={2} kind="sql" meta={<Pill tone="ok">ran 41 ms</Pill>}>
            <h2 className="mb-4 text-[32px] md:text-[40px]">{copy.pillars[0].title}</h2>
            <p className="mb-5 max-w-[480px] text-[15px] leading-[24px] text-ink-2">{copy.pillars[0].text}</p>
            <Sql />
          </Cell></div>
          <div id="table"><Cell n={3} kind="table" meta={<span className="font-mono">61 rows</span>}>
            <table className="w-full text-left text-[13px]">
              <thead className="font-mono text-[11px] text-ink-3"><tr><th className="py-1.5 font-normal">player</th><th className="font-normal">team</th><th className="text-right font-normal">ts%</th><th className="text-right font-normal">usg%</th></tr></thead>
              <tbody className="tabular-nums text-ink-2">
                {rows.map((r) => (<tr key={r.player} className="border-t border-line"><td className="py-2 text-ink">{r.player}</td><td>{r.team}</td><td className="text-right">{r.ts}</td><td className="text-right">{r.usg}</td></tr>))}
              </tbody>
            </table>
          </Cell></div>
          <div id="skills"><Cell n={4} kind="skills">
            <h2 className="mb-3 text-[32px] md:text-[40px]">{copy.pillars[1].title}</h2>
            <p className="mb-5 max-w-[480px] text-[15px] leading-[24px] text-ink-2">{copy.pillars[1].text}</p>
            <SkillRows />
          </Cell></div>
          <div id="history"><Cell n={5} kind="git">
            <h2 className="mb-3 text-[32px] md:text-[40px]">{copy.pillars[2].title}</h2>
            <p className="mb-5 max-w-[480px] text-[15px] leading-[24px] text-ink-2">{copy.pillars[2].text}</p>
            <CommitRows />
          </Cell></div>
          <div id="setup"><SetupCells /></div>
        </main>
      </div>
    </Page>
  );
}
