import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function CSetup() {
  return (
    <section id="self-host" className="mx-auto flex max-w-[1320px] scroll-mt-24 flex-col items-start justify-between gap-6 px-5 py-14 md:px-6 lg:flex-row lg:items-center">
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-3">Self-host</p>
        <h2 className="mt-3 text-[30px] leading-[34px] md:text-[40px] md:leading-[44px]">Setup guide coming soon.</h2>
        <p className="mt-4 max-w-[440px] text-[15px] leading-[23px] text-ink-2">The code is open today. A one-command install is planned.</p>
      </div>
      <a href="https://github.com/mythiipanda/dime" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] text-canvas transition-colors hover:bg-ink/90">
        View on GitHub
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
