import { Cell } from "@/components/workbench/Primitives";
import { copy } from "@/lib/copy";

export function SetupCells() {
  return (
    <div id="self-host" className="mt-4 flex flex-col gap-4">
      <Cell n={6} kind="shell">
        <h2 className="mb-4 text-[26px] leading-[30px]">{copy.host.title}</h2>
        <pre className="overflow-x-auto font-mono text-[13px] leading-[24px] text-ink-2">{copy.host.commands.map((c) => `$ ${c}`).join("\n")}</pre>
      </Cell>
      <Cell n={7} kind="note">
        <dl>
          {copy.faq.map((f) => (
            <div key={f.id} className="border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0">
              <dt className="text-[16px] font-medium text-ink">{f.question}</dt>
              <dd className="mt-1.5 text-[14px] leading-[22px] text-ink-2">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </Cell>
    </div>
  );
}
