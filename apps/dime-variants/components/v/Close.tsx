"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO } from "@/lib/copy";

const CMD = "git clone https://github.com/mythiipanda/dime";

function CopyCmd() {
  const [done, setDone] = useState(false);
  const go = async () => {
    try {
      await navigator.clipboard.writeText(CMD);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {
      return;
    }
  };
  return (
    <button type="button" onClick={go} aria-label="Copy clone command" className="press group flex h-11 w-full max-w-[460px] items-center gap-3 rounded-[10px] bg-field px-3.5 text-left font-mono text-[13px] text-ink-2 shadow-[0_0_0_1px_var(--line)] transition-colors hover:text-ink hover:shadow-[0_0_0_1px_var(--line-strong)]">
      <span className="text-ink-3">$</span>
      <span className="min-w-0 flex-1 truncate">{CMD}</span>
      {done ? <Check size={14} className="text-green" /> : <Copy size={14} className="text-ink-3 group-hover:text-ink" />}
    </button>
  );
}

export function Close({ max = "max-w-[1200px]", center = false, title = "Run it on your machine." }: { max?: string; center?: boolean; title?: string }) {
  return (
    <section id="close" className={`mx-auto ${max} px-5 pt-20 md:px-6 md:pt-28`}>
      <div className={`flex flex-col gap-8 border-t border-line pt-12 md:pt-16 ${center ? "items-center text-center" : "items-start md:flex-row md:items-end md:justify-between"}`}>
        <div className={`flex flex-col gap-5 ${center ? "items-center" : "items-start"}`}>
          <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px]">{title}</h2>
          <CopyCmd />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink>
          <ButtonLink href={`${REPO}#readme`} variant="ghost">Read the setup</ButtonLink>
        </div>
      </div>
    </section>
  );
}
