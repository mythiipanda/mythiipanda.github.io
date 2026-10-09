"use client";

import { useState } from "react";
import { ButtonLink, GithubMark, Logo, SectionHead } from "./ui";
import { Button } from "@/components/ui/button";
import { Tree, Folder, File } from "@/components/ui/file-tree";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { InView } from "@/components/ui/in-view";
import { Faq1 } from "@/components/ui/faq1";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { copy, REPO } from "@/lib/copy";
import { notebookFile, files, commits } from "@/lib/demo";

export function HostSection() {
  const [copied, setCopied] = useState(false);
  const text = copy.host.commands.join("\n");
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(text); } catch {}
    toast("Copied the three commands");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <section id="self-host" className="scroll-mt-24 px-5 pt-24 md:px-0 md:pt-[96px]">
      <div className="rounded-[16px] bg-field px-5 py-8 shadow-[0_0_0_1px_var(--line)] md:p-10">
      <SectionHead title={copy.host.title} sub={copy.host.sub} />
      <div className="relative">
        <Terminal className="bg-canvas font-mono text-[14px] leading-[26px]">
          {copy.host.commands.map((c) => (
            <TypingAnimation key={c} duration={22} className="block whitespace-pre-wrap break-all text-ink">{"$ " + c}</TypingAnimation>
          ))}
          <AnimatedSpan className="text-ink-3">ready on http://localhost:3000</AnimatedSpan>
        </Terminal>
        <Button type="button" variant="line" size="sm" onClick={onCopy} className="absolute right-3 top-2.5 h-7 bg-field text-[12px] text-ink-2">{copied ? "Copied" : "Copy"}</Button>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
        {copy.host.items.map((it, i) => (
          <div key={it.title} className={`text-[14px] leading-[22px] text-ink-2 ${i ? "lg:pl-6" : ""}`}>
            <b className="mb-2 block text-[15px] font-semibold text-ink">{it.title}</b>
            {it.text}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export function Questions() {
  return (
    <section className="px-5 pt-24 md:px-0 md:pt-[96px]">
      <Faq1 heading="Questions" items={copy.faq} className="py-0 [&_.container]:px-0 [&>div>div]:mx-0 [&_h1]:text-[30px] [&_h1]:md:text-[40px]" />
    </section>
  );
}

export function Closing() {
  return (
    <>
      <section className="flex flex-col items-start gap-8 px-5 pb-24 pt-24 md:px-0 md:pb-[120px] md:pt-[120px]">
        <h2 className="text-[34px] leading-[40px] md:text-[48px] md:leading-[54px]">{copy.close.title}<span className="text-[var(--cobalt-tx)]">.</span></h2>
        <ButtonLink href={REPO} variant="primary"><GithubMark />{copy.close.button}</ButtonLink>
      </section>
      <footer className="flex flex-col gap-8 border-t border-line px-5 py-10 text-[13px] text-ink-2 md:flex-row md:items-start md:justify-between md:px-6">
        <Logo size={16} />
        <div className="flex gap-16">
          <div className="flex flex-col gap-3"><span className="text-ink">Product</span><a href="#notebooks" className="hover:text-ink">Notebooks</a><a href="#skills" className="hover:text-ink">Skills</a><a href="#self-host" className="hover:text-ink">Setup</a></div>
          <div className="flex flex-col gap-3"><span className="text-ink">Source</span><a href={REPO} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a><a href={REPO + "#readme"} target="_blank" rel="noreferrer" className="hover:text-ink">README</a></div>
        </div>
      </footer>
    </>
  );
}
