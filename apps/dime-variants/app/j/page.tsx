"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Foot, Page } from "@/components/v/kit";
import { NumberFlow } from "@/components/ui/number-flow";
import { Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO, copy } from "@/lib/copy";

function Tile({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`flex h-[440px] flex-col overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--line)] ${className.includes("bg-") ? "" : "bg-field"} ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      <figcaption className="flex h-10 shrink-0 items-center border-t border-line px-4 font-mono text-[11px] opacity-80">{label}</figcaption>
    </figure>
  );
}

const figs = [
  { v: 31204, l: "rows scanned" },
  { v: 61, l: "wings qualify" },
];

export default function J() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 400); return () => clearTimeout(t); }, []);
  return (
    <Page v="j">
      <header className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 md:px-6">
        <a href="#top" aria-label="dime home"><Logo /></a>
        <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 md:px-6">
        <section className="mx-auto max-w-[880px] pb-12 pt-16 md:pb-16 md:pt-28">
          <h1 className="text-[40px] leading-[44px] tracking-[-0.025em] md:text-[60px] md:leading-[66px]">Open-source NBA analyst</h1>
          <p className="mt-4 text-[17px] leading-[26px] text-ink-2">Chat for quick questions. Projects for the work you keep.</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <Tile label="Notebook"><Notebook /></Tile>
          <Tile label="Sample run" className="bg-[var(--cobalt)] text-white">
            <div className="absolute inset-0 flex flex-col justify-end gap-8 p-6 md:p-10">
              {figs.map((f) => (
                <div key={f.l}><NumberFlow value={on ? f.v : 0} className="fig text-[34px] leading-[40px] md:text-[56px] md:leading-[60px] whitespace-nowrap" /><div className="mt-2 text-[14px] opacity-80">{f.l}</div></div>
              ))}
            </div>
          </Tile>
          <Tile label="Warehouse" className="md:col-span-2 md:h-[400px]"><Warehouse /></Tile>
          <Tile label="Skills"><Skills /></Tile>
          <Tile label="History"><History /></Tile>
          <Tile label="Self-host" className="md:col-span-2 md:h-[300px]">
            <ol className="flex h-full flex-col justify-center p-6 md:p-10">
              {copy.host.commands.map((c) => (<li key={c} className="border-b border-line py-4 font-mono text-[13px] text-ink last:border-b-0 md:text-[15px]">{c}</li>))}
            </ol>
          </Tile>
        </section>
      </main>
      <div className="mt-24"><Foot max="max-w-[1100px]" /></div>
    </Page>
  );
}
