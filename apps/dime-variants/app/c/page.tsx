import { BarNav, CobaltBand, Cta, FaqList, Foot, Frame, Page, SetupRows } from "@/components/v/kit";
import Workbench from "@/components/workbench/Workbench";
import { copy } from "@/lib/copy";
import { hero } from "@/lib/variants";

export default function C() {
  return (
    <Page v="c">
      <BarNav />
      <main>
        <section className="mx-auto grid max-w-[1320px] gap-10 px-5 pt-14 md:px-6 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col justify-center lg:pr-6">
            <h1 className="text-[52px] md:text-[104px]">{hero.c.h1}</h1>
            <p className="mt-6 max-w-[440px] text-[17px] leading-[27px] text-ink-2">{hero.c.sub}</p>
            <div className="mt-8"><Cta /></div>
          </div>
          <div className="min-w-0 lg:-mr-[max(0px,calc((100vw-1320px)/2+24px))]">
            <Frame h="h-[560px] md:h-[680px]" className="lg:rounded-r-none lg:border-r-0"><Workbench bare initialTab="notebook" /></Frame>
          </div>
        </section>
        <section id="notebooks" className="mx-auto mt-20 max-w-[1200px] px-5 md:mt-28 md:px-6">
          <dl className="border-t border-line">
            {copy.pillars.map((p) => (
              <div key={p.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-[1fr_1fr] md:gap-12 md:py-9">
                <dt className="text-[22px] font-semibold leading-[28px] md:text-[28px] md:leading-[34px]">{p.title}</dt>
                <dd className="text-[16px] leading-[26px] text-ink-2">{p.text}</dd>
              </div>
            ))}
          </dl>
        </section>
        <div id="skills" className="mx-auto max-w-[1200px] px-5 md:px-6"><h2 className="mb-6 mt-20 text-[28px] leading-[34px] md:mt-28 md:text-[36px]">Runs on your machine</h2><SetupRows /><FaqList /></div>
        <CobaltBand />
      </main>
      <div className="mt-24"><Foot /></div>
    </Page>
  );
}
