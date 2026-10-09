import { FeatureStack } from "@/components/v/features";
import { CenterNav, CobaltBand, Cta, FaqList, Foot, Frame, Page, SetupRows } from "@/components/v/kit";
import Workbench from "@/components/workbench/Workbench";
import { Kbd } from "@/components/ui/kbd";

const asks = [
  "Who sat most on the second night of back to backs in 2025?",
  "Wings over 500 minutes sorted by ts% in 2025?",
  "Five-man units with the best net rating, minutes floor 100",
];

export default function H() {
  return (
    <Page v="h">
      <CenterNav />
      <main className="mx-auto max-w-[1320px] px-5 md:px-6">
        <section className="pt-28 md:pt-36">
          <h1 className="text-[56px] leading-[52px] md:text-[136px] md:leading-[128px]"><span className="md:whitespace-nowrap">The open-source</span> analyst<span className="block text-ink-2">for NBA data<span className="text-[var(--cobalt-tx)]">.</span></span></h1>
          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex h-14 items-center gap-3 rounded-[12px] bg-field px-5 shadow-[0_0_0_1px_var(--line-strong)]"><span className="flex-1 truncate text-[16px] text-ink-3">Ask a question, or press <Kbd>/</Kbd> for skills</span></div>
            <Cta />
          </div>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {asks.map((a) => (<li key={a} className="py-3 text-[15px] text-ink-2">{a}</li>))}
          </ul>
        </section>
        <section className="mt-20 md:mt-28"><Frame h="h-[620px] md:h-[760px]"><Workbench /></Frame></section>
        <FeatureStack />
        <div id="skills"><h2 className="mb-6 mt-20 text-[28px] leading-[34px] md:mt-28 md:text-[36px]">Runs on your machine</h2><SetupRows /></div>
        <FaqList />
      </main>
      <CobaltBand max="max-w-[1320px]" />
      <div className="mt-24"><Foot max="max-w-[1320px]" /></div>
    </Page>
  );
}
