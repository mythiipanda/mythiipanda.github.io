"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";

const notes = ["Clone", "Fetch data", "Run"];

function Line({ cmd, note, i }: { cmd: string; note: string; i: number }) {
  const [done, setDone] = useState(false);
  const go = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {
      return;
    }
  };
  return (
    <li className="flex items-center gap-3 border-t border-line px-4 py-4 first:border-t-0 md:px-5">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] text-ink-3 shadow-[0_0_0_1px_var(--line-strong)]">{i + 1}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] text-ink-3">{note}</div>
        <code className="mt-1 block overflow-x-auto break-words font-mono md:whitespace-nowrap text-[13px] text-ink md:text-[15px]"><span className="text-[var(--cobalt-tx)]">$ </span>{cmd}</code>
      </div>
      <button type="button" onClick={go} aria-label={`Copy ${note}`} className="press flex size-10 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors hover:text-ink">
        {done ? <Check size={15} className="text-green" /> : <Copy size={15} />}
      </button>
    </li>
  );
}

export function CSetup() {
  return (
    <section id="self-host" className="mx-auto grid max-w-[1320px] scroll-mt-24 items-center gap-10 px-5 py-24 md:px-6 lg:grid-cols-12 lg:gap-16 lg:py-32">
      <div className="min-w-0 lg:col-span-5">
        <h2 className="text-balance text-[34px] leading-[38px] md:text-[56px] md:leading-[58px]">Run it on your machine.</h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
        </div>
      </div>
      <div className="min-w-0 lg:col-span-7">
        <div className="overflow-hidden rounded-[16px] bg-field p-1.5 shadow-[0_0_0_1px_var(--line-strong)]">
          <ol className="min-w-0 overflow-hidden rounded-[11px] bg-canvas shadow-[0_0_0_1px_var(--line)]">
            {copy.host.commands.map((c, i) => <Line key={c} cmd={c} note={notes[i]} i={i} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}
