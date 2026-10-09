"use client";

import { Close } from "@/components/v/Close";
import { useState, type ReactNode } from "react";
import { Foot, Page, SetupRows, Cap } from "@/components/v/kit";
import { Chat, Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import { REPO, short } from "@/lib/copy";

const items: { id: string; k: "chat" | "notebook" | "warehouse" | "skills" | "git"; node: ReactNode }[] = [
  { id: "chat", k: "chat", node: <Chat /> },
  { id: "notebook", k: "notebook", node: <Notebook /> },
  { id: "data", k: "warehouse", node: <Warehouse /> },
  { id: "skills", k: "skills", node: <Skills /> },
  { id: "git", k: "git", node: <History /> },
];

export default function E() {
  const [f, setF] = useState("all");
  const shown = f === "all" ? items : items.filter((i) => i.id === f);
  return (
    <Page v="e">
      <header className="fixed left-3 top-3 z-30 flex h-10 items-center gap-2 rounded-[10px] border border-line bg-canvas/90 pl-3 pr-1 backdrop-blur">
        <a href="#top" aria-label="dime home"><Logo size={15} /></a>
        <ThemeToggle />
      </header>
      <div className="fixed right-3 top-3 z-30"><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
      <main className="mx-auto max-w-[760px] px-5 pb-10 pt-28 md:pt-16 lg:ml-[max(20px,calc(50vw-420px))] lg:mr-auto lg:px-0">
        <h1 className="max-w-[600px] text-[34px] leading-[38px] md:text-[46px] md:leading-[50px]">{short.h1a} {short.h1b}</h1>
        <p className="mt-4 max-w-[480px] text-[15px] leading-[22px] text-ink-2">{short.sub}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {[["all", "All"], ...items.map((i) => [i.id, short.tiles[i.k].name])].map(([id, label]) => (
            <button key={id} type="button" onClick={() => setF(id)} aria-pressed={f === id} className={`press h-10 rounded-full px-4 text-[13px] shadow-[0_0_0_1px_var(--line-strong)] ${f === id ? "bg-ink text-canvas" : "text-ink-2 hover:text-ink"}`}>{label}</button>
          ))}
        </div>
        <div className="mt-10 space-y-10">
          {shown.map((it) => (
            <article key={it.id}>
              <div className="max-h-[520px] min-h-[300px] overflow-hidden rounded-[12px] bg-field shadow-[0_0_0_1px_var(--line)]">{it.node}</div>
              <Cap k={it.k} className="mt-3" />
            </article>
          ))}
        </div>
        <SetupRows title />
        <Close max="max-w-[760px]" flush cmd={false} />
      </main>
      <Foot max="max-w-[760px]" />
    </Page>
  );
}
