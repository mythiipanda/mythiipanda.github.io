"use client";

import { CLight } from "@/components/v/CLight";
import { CSetup } from "@/components/v/CSetup";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { CLogo } from "@/components/v/CLogo";
import Workbench from "@/components/workbench/Workbench";
import { Page, Foot } from "@/components/v/kit";
import { REPO, short } from "@/lib/copy";

export default function C() {
    return (
    <Page v="c">
      <CLight />
      <header className="h-[58px] border-b border-line">
        <nav className="mx-auto grid h-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <span />
          <div className="col-start-3 flex items-center gap-2"><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} /><span className="max-sm:hidden">{short.star}</span><span className="sm:hidden">Star</span></ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto max-w-[1320px] px-5 pb-12 pt-10 md:px-6 lg:pt-14">
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
            <h1 className="text-[44px] leading-[46px] md:text-[72px] md:leading-[74px] lg:col-span-7">Harvey for NBA Analysts</h1>
            <div className="lg:col-span-5">
              <p className="max-w-[440px] text-[18px] leading-[27px] text-ink-2">{short.sub}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
                <code className="inline-flex max-w-full overflow-x-auto whitespace-nowrap rounded-[8px] bg-field px-3 py-3 font-mono text-[11.5px] text-ink-2 shadow-[0_0_0_1px_var(--line)] sm:text-[13px]">git clone github.com/mythiipanda/dime</code>
              </div>
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] lg:hidden"><div className="h-[560px] md:h-[640px]"><Workbench dime bare initialTab="chat" /></div></div>
          <div className="mt-12 hidden overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] lg:block"><div className="h-[660px]"><Workbench dime initialTab="chat" /></div></div>
        </section>
        <CSetup />
      </main>
      <div><Foot brand max="max-w-[1320px]" /></div>
    </Page>
  );
}
