import { ButtonLink, GithubMark } from "./ui";
import { TextEffect } from "@/components/ui/text-effect";
import { copy, REPO } from "@/lib/copy";

export default function Hero() {
  return (
    <section className="px-5 pt-16 md:px-6 md:pt-[104px]">
      <h1 className="max-w-[980px] text-[42px] leading-[46px] md:text-[76px] md:leading-[80px]">
        <TextEffect as="span" per="word" preset="fade" speedReveal={2.2} className="block">{copy.hero.line1}</TextEffect>
        <span className="block text-ink-2">
          <TextEffect as="span" per="word" preset="fade" speedReveal={2.2} delay={0.25}>{copy.hero.line2}</TextEffect>
          <span className="text-[var(--cobalt-tx)]">.</span>
        </span>
      </h1>
      <p className="mt-6 max-w-[560px] text-[16px] leading-[26px] text-ink-2 md:mt-8 md:text-[19px] md:leading-[30px]">{copy.hero.sub}</p>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:mt-10">
        <ButtonLink href={REPO} variant="primary"><GithubMark />{copy.hero.primary}</ButtonLink>
        <ButtonLink href="#self-host" variant="ghost">{copy.hero.secondary} &rarr;</ButtonLink>
        <code className="font-mono text-[12px] text-ink-3 sm:ml-3">git clone github.com/mythiipanda/dime</code>
      </div>
      
    </section>
  );
}
