"use client";

import { Close } from "@/components/v/Close";
import { ThemeToggle } from "@/components/landing/Nav";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { CLogo } from "@/components/v/CLogo";
import Workbench, { Notebook, Warehouse, Skills, History } from "@/components/workbench/Workbench";
import { Page, Foot, SetupRows } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

const tabs = [
  { id: "notebook", h: "h-[440px] md:h-[540px]", k: "notebook" as const, node: <Notebook /> },
  { id: "warehouse", h: "h-[440px] md:h-[540px]", k: "warehouse" as const, node: <Warehouse /> },
  { id: "skills", h: "h-[360px]", k: "skills" as const, node: <Skills /> },
  { id: "git", h: "h-[440px] md:h-[540px]", k: "git" as const, node: <History /> },
];

export default function C() {
    return (
    <Page v="c">
      <header className="h-[58px] border-b border-line">
        <nav className="mx-auto grid h-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <div className="hidden gap-8 text-[14px] text-ink-2 md:flex"><a href="#product" className="transition-colors duration-150 hover:text-ink">Product</a><a href="#self-host" className="transition-colors duration-150 hover:text-ink">Setup</a></div>
          <div className="col-start-3 flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid min-h-[820px] max-w-[1320px] items-center gap-10 px-5 py-14 md:px-6 lg:grid-cols-[480px_1fr] lg:gap-16">
          <div>
            <h1 className="text-[44px] leading-[46px] md:text-[96px] md:leading-[96px]">{short.h1a} {short.h1b}</h1>
            <p className="mt-6 max-w-[440px] text-[18px] leading-[27px] text-ink-2">{short.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
              <ButtonLink href="#self-host" variant="ghost">{short.setup}</ButtonLink>
            </div>
            <code className="mt-5 inline-flex max-w-full overflow-x-auto whitespace-nowrap rounded-[8px] bg-field px-3 py-2 font-mono text-[13px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">git clone github.com/mythiipanda/dime</code>
          </div>
          <div className="min-w-0 lg:-mr-[max(0px,calc((100vw-1320px)/2+24px))]">
            <div className="h-[560px] overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[680px] lg:rounded-r-none"><Workbench bare initialTab="chat" /></div>
          </div>
        </section>
        <section id="product" className="mx-auto max-w-[1320px] px-5 py-20 md:px-6">
          <div className="flex flex-col gap-24 md:gap-32">
            {tabs.map((x, i) => (
              <div key={x.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={`lg:col-span-4 ${i % 2 ? "lg:order-2" : ""}`}>
                  <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
                  <h2 className="mt-3 text-[32px] leading-[36px] md:text-[44px] md:leading-[48px]">{short.tiles[x.k].name}</h2>
                  <p className="mt-4 text-[16px] leading-[24px] text-ink-2">{short.tiles[x.k].note}</p>
                </div>
                <div className={`min-w-0 lg:col-span-8 ${i % 2 ? "lg:order-1" : ""}`}>
                  <div className={`overflow-hidden rounded-[14px] bg-field shadow-[0_0_0_1px_var(--line-strong)] ${x.h}`}>{x.node}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="mx-auto max-w-[1320px] px-5 md:px-6"><SetupRows title /></div>
        <Close max="max-w-[1320px]" />
      </main>
      <div className="mt-24"><Foot brand max="max-w-[1320px]" /></div>
    </Page>
  );
}
