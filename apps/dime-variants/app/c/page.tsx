"use client";

import { CTheme } from "@/components/v/CTheme";
import { CSetup } from "@/components/v/CSetup";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { CLogo } from "@/components/v/CLogo";
import Workbench from "@/components/workbench/Workbench";
import { Page, Foot } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

export default function C() {
    return (
    <Page v="c">
      <header className="h-[58px] border-b border-line">
        <nav className="mx-auto grid h-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <div className="hidden gap-8 text-[14px] text-ink-2 md:flex"><a href="#self-host" className="transition-colors duration-150 hover:text-ink">Setup</a></div>
          <div className="col-start-3 flex items-center gap-2"><CTheme /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />{short.star}</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid min-h-[680px] max-w-[1320px] items-center gap-10 px-5 py-12 md:px-6 lg:grid-cols-[460px_1fr] lg:gap-16">
          <div>
            <h1 className="text-[44px] leading-[46px] md:text-[72px] md:leading-[74px]">Harvey for NBA Analysts</h1>
            <p className="mt-6 max-w-[440px] text-[18px] leading-[27px] text-ink-2">{short.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
              <ButtonLink href="#self-host" variant="ghost">{short.setup}</ButtonLink>
            </div>
            <code className="mt-5 inline-flex max-w-full overflow-x-auto whitespace-nowrap rounded-[8px] bg-field px-3 py-2 font-mono text-[13px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">git clone github.com/mythiipanda/dime</code>
          </div>
          <div className="min-w-0 lg:-mr-[max(0px,calc((100vw-1320px)/2+24px))]">
            <div className="h-[560px] overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[640px] lg:rounded-r-none"><Workbench bare initialTab="chat" /></div>
          </div>
        </section>
        <CSetup />
      </main>
      <div><Foot brand max="max-w-[1320px]" /></div>
    </Page>
  );
}
