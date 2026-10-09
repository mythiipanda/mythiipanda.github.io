import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function CSetup() {
  return (
    <section id="self-host" className="mx-auto flex max-w-[1320px] scroll-mt-24 flex-col items-start justify-between gap-6 px-5 py-14 md:px-6 lg:flex-row lg:items-center">
      <div>
        <h2 className=" text-[30px] leading-[34px] md:text-[40px] md:leading-[44px]">Setup guide coming soon.</h2>
      </div>
      <a href="https://github.com/mythiipanda/dime" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] text-canvas transition-colors hover:bg-ink/90">
        View on GitHub
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
