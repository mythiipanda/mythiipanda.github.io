"use client";

import { CodeBlock } from "@/components/arc/code-block/code-block";
import { copy } from "@/lib/copy";

export function CSetup() {
  return (
    <section id="self-host" className="mx-auto grid max-w-[1320px] scroll-mt-24 items-center gap-8 px-5 py-14 md:px-6 lg:grid-cols-12 lg:gap-12">
      <h2 className="text-[30px] leading-[34px] md:text-[40px] md:leading-[44px] lg:col-span-5">Run it on your machine.</h2>
      <div className="min-w-0 lg:col-span-7">
        <CodeBlock filename="setup.sh" language="bash" code={copy.host.commands.join("\n")} />
      </div>
    </section>
  );
}
