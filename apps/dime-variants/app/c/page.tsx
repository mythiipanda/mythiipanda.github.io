"use client";

import { Close } from "@/components/v/Close";
import { useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import Workbench, { Chat, Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { Page, Foot, Cap, SetupRows } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

const tabs = [
  { id: "chat", k: "chat" as const, node: <Chat /> },
  { id: "notebook", k: "notebook" as const, node: <Notebook /> },
  { id: "warehouse", k: "warehouse" as const, node: <Warehouse /> },
  { id: "skills", k: "skills" as const, node: <Skills /> },
  { id: "git", k: "git" as const, node: <History /> },
];

export default function C() {
  const [tab, setTab] = useState("chat");
  const t = tabs.find((x) => x.id === tab)!;
  return (
    <Page v="c">
      <header className="h-[58px] border-b border-line">
        <nav className="mx-auto grid h-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><Logo /></a>
          <span />
          <div className="col-start-3 flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid min-h-[820px] max-w-[1320px] items-center gap-10 px-5 py-14 md:px-6 lg:grid-cols-[480px_1fr] lg:gap-16">
          <div>
            <h1 className="text-[44px] leading-[46px] md:text-[96px] md:leading-[96px]">{short.h1a} {short.h1b}</h1>
            <p className="mt-6 max-w-[440px] text-[18px] leading-[27px] text-ink-2">{short.sub}</p>
            <div className="mt-8 flex items-center gap-3">
              <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
              <ButtonLink href="#self-host" variant="ghost">{short.setup}</ButtonLink>
            </div>
          </div>
          <div className="min-w-0 lg:-mr-[max(0px,calc((100vw-1320px)/2+24px))]">
            <div className="h-[560px] overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[680px] lg:rounded-r-none"><Workbench bare initialTab="chat" /></div>
          </div>
        </section>
        <section id="product" className="mx-auto max-w-[1320px] px-5 py-20 md:px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((x) => (
              <button key={x.id} type="button" onClick={() => setTab(x.id)} className={`press h-10 rounded-full px-5 text-[14px] transition-colors duration-150 ${tab === x.id ? "bg-ink text-canvas" : "text-ink-2 shadow-[0_0_0_1px_var(--line-strong)] hover:text-ink"}`}>{short.tiles[x.k].name}</button>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-[1000px] overflow-hidden rounded-[14px] bg-field shadow-[0_0_0_1px_var(--line-strong)]">
            <div className="h-[420px] overflow-hidden md:h-[480px]">{t.node}</div>
            <Cap k={t.k} className="border-t border-line px-4 py-3" />
          </div>
        </section>
        <div className="mx-auto max-w-[1320px] px-5 md:px-6"><SetupRows title /></div>
        <Close max="max-w-[1320px]" />
      </main>
      <div className="mt-24"><Foot max="max-w-[1320px]" /></div>
    </Page>
  );
}
