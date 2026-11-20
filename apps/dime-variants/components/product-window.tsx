import { ArrowUp, ChevronRight, Database, FileCode2, Home, LayoutGrid, Library, MessageCircle, SquarePen, Workflow } from "lucide-react";
import { DimeMark } from "@/components/mark";
import { TS_ROWS } from "@/lib/site";

const NAV = [
  { icon: Home, label: "Home" },
  { icon: MessageCircle, label: "Ask", active: true },
  { icon: Workflow, label: "Workflows" },
  { icon: LayoutGrid, label: "Boards" },
  { icon: Library, label: "Library" },
  { icon: Database, label: "Data" },
];

const STEPS = [
  { icon: Database, verb: "Read schema", detail: "silver_advanced" },
  { icon: FileCode2, verb: "Wrote SQL", detail: "MIN * GP >= 1500" },
  { icon: Database, verb: "Ran on DuckDB", detail: "5 rows" },
];

export function ProductWindow() {
  return (
    <div aria-hidden="true" className="flex overflow-hidden rounded-[14px] bg-surface text-[13px] leading-[1.45] text-ink shadow-[0_0_0_1px_oklch(0_0_0/0.08),0_24px_60px_-12px_oklch(0.2_0.1_262/0.45)]">
      <aside className="hidden w-[208px] shrink-0 flex-col border-r border-line-soft bg-page p-3 md:flex">
        <div className="flex h-8 items-center gap-2 px-2 font-medium"><DimeMark size={16} />Dime</div>
        <div className="mt-3 flex h-8 items-center gap-2.5 rounded-[8px] px-2 text-ink-2"><SquarePen size={15} strokeWidth={1.6} />New chat</div>
        <div className="mt-3 grid gap-0.5">
          {NAV.map(({ icon: Icon, label, active }) => (
            <div key={label} className={`flex h-8 items-center gap-2.5 rounded-[8px] px-2 ${active ? "bg-inset font-medium text-ink" : "text-ink-2"}`}>
              <Icon size={15} strokeWidth={1.6} />{label}
            </div>
          ))}
        </div>
        <div className="mt-5 px-2 text-[12px] text-ink-3">Chats</div>
        <div className="mt-1.5 truncate rounded-[8px] px-2 py-1.5 text-ink-2">Best true shooting, 2025-26</div>
        <div className="truncate rounded-[8px] px-2 py-1.5 text-ink-2">Thunder four factors</div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-11 items-center border-b border-line-soft px-4 text-ink-2">
          <span className="rounded-[7px] bg-inset px-2.5 py-1 font-medium text-ink">Best true shooting, 2025-26</span>
        </div>
        <div className="mx-auto w-full max-w-[680px] flex-1 px-4 pb-5 pt-6 sm:px-6">
          <div className="ml-auto w-fit max-w-[85%] rounded-[14px] bg-inset px-3.5 py-2.5">
            Who had the best true shooting in 2025-26 with at least 1,500 minutes?
          </div>
          <div className="mt-5 grid gap-1.5 text-ink-2">
            {STEPS.map(({ icon: Icon, verb, detail }) => (
              <div key={verb} className="flex items-center gap-2">
                <Icon size={14} strokeWidth={1.6} className="shrink-0 text-ink-3" />
                <span>{verb}</span>
                <code className="truncate rounded-[5px] bg-inset px-1.5 py-0.5 text-[11.5px] text-ink">{detail}</code>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] leading-[1.55]">
            <span className="font-medium">Luke Kennard led at 68.9%</span> on 13.1% usage. Jalen Duren was a tenth of a point behind at 68.8%. 164 players cleared the 1,500-minute floor.
          </p>
          <div className="mt-4 overflow-hidden rounded-[12px] shadow-[inset_0_0_0_1px_var(--color-line)]">
            <table className="num w-full border-collapse text-left">
              <thead>
                <tr className="text-[12px] text-ink-3">
                  <th className="px-3.5 py-2 font-normal">Player</th>
                  <th className="px-2 py-2 font-normal">Team</th>
                  <th className="px-2 py-2 text-right font-normal">TS%</th>
                  <th className="px-3.5 py-2 text-right font-normal">USG%</th>
                </tr>
              </thead>
              <tbody>
                {TS_ROWS.map((row) => (
                  <tr key={row.player} className="border-t border-line-soft">
                    <td className="whitespace-nowrap py-[7px] pl-3.5 pr-1">{row.player}</td>
                    <td className="px-2 py-[7px] text-ink-2">{row.team}</td>
                    <td className="px-2 py-[7px] text-right">{row.ts}</td>
                    <td className="px-3.5 py-[7px] text-right text-ink-2">{row.usg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-1.5 border-t border-line-soft bg-page px-3.5 py-2 text-[12px] text-ink-2">
              <ChevronRight size={13} strokeWidth={1.8} />Sources and provenance
              <span className="ml-auto text-ink-3">5 of 164 rows</span>
            </div>
          </div>
          <div className="mt-5 flex h-12 items-center rounded-[14px] pl-4 pr-2 text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
            Ask a follow-up
            <span className="ml-auto grid size-8 place-items-center rounded-full bg-accent text-white"><ArrowUp size={15} strokeWidth={2} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
