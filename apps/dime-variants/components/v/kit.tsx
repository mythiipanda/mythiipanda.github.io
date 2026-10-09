import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { ButtonLink, GithubMark, Logo } from "@/components/landing/ui";
import { copy, REPO } from "@/lib/copy";

export const links = [
  { label: "Notebooks", href: "#notebooks" },
  { label: "Skills", href: "#skills" },
  { label: "Setup", href: "#self-host" },
];

export function BarNav({ max = "max-w-[1200px]" }: { max?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
      <nav className={`mx-auto flex h-14 w-full ${max} items-center justify-between px-5 md:px-6`}>
        <a href="#top" aria-label="dime home"><Logo /></a>
        <div className="hidden gap-8 text-[14px] text-ink-2 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors duration-150 hover:text-ink">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <ButtonLink href={REPO} variant="ink" size="pill">Star</ButtonLink>
        </div>
      </nav>
    </header>
  );
}

export function Cta({ secondary = "#self-host" }: { secondary?: string }) {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink>
      <ButtonLink href={secondary} variant="ghost">See the setup steps &rarr;</ButtonLink>
    </div>
  );
}

export function Foot({ max = "max-w-[1200px]" }: { max?: string }) {
  return (
    <footer className="border-t border-line">
      <div className={`mx-auto flex ${max} items-center justify-between px-5 py-8 text-[13px] text-ink-3 md:px-6`}>
        <Logo size={16} />
        <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
      </div>
    </footer>
  );
}

export function Page({ children, v }: { children: ReactNode; v: string }) {
  return <div id="top" data-v={v} className="min-h-screen overflow-x-clip bg-canvas text-ink">{children}</div>;
}

export function Frame({ children, h = "h-[640px] md:h-[720px]", className = "" }: { children: ReactNode; h?: string; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-line bg-field p-2 md:p-2.5 ${className}`}>
      <div className={`${h} overflow-hidden rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line)]`}>{children}</div>
    </div>
  );
}

export function SetupRows() {
  const notes = ["Get the code", "Download the data pack. nba.duckdb lands in the repo folder", "Start the app. Your model key goes in a local .env file"];
  return (
    <section id="self-host" className="scroll-mt-24">
      <ol className="border-t border-line">
        {copy.host.commands.map((c, i) => (
          <li key={c} className="grid gap-2 border-b border-line py-6 md:grid-cols-[48px_1.4fr_1fr] md:items-baseline md:py-8">
            <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
            <code className={`font-mono text-[15px] text-ink md:text-[20px]`}>{c}</code>
            <span className="text-[14px] leading-[22px] text-ink-2">{notes[i]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FaqList() {
  return (
    <section className="mt-20 grid gap-8 md:mt-28 md:grid-cols-[1fr_2fr] md:gap-16">
      <h2 className="text-[26px] leading-[32px] md:text-[32px]">Questions</h2>
      <dl>
        {copy.faq.map((f) => (
          <div key={f.id} className="border-t border-line py-6 first:border-t-0 first:pt-0">
            <dt className="text-[17px] font-medium text-ink">{f.question}</dt>
            <dd className="mt-2 max-w-[560px] text-[15px] leading-[24px] text-ink-2">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function CobaltBand({ max = "max-w-[1200px]" }: { max?: string }) {
  return (
    <section className={`mx-auto mt-24 ${max} px-5 md:px-6`}>
      <div className="flex flex-col items-start justify-between gap-8 rounded-[20px] bg-[var(--cobalt)] p-8 text-white md:flex-row md:items-center md:p-14">
        <h2 className="max-w-[560px] text-[30px] leading-[34px] md:text-[48px] md:leading-[52px]">{copy.close.title}</h2>
        <a href={REPO} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-[#2458F5] transition-transform duration-150 active:scale-[0.96]"><GithubMark />{copy.close.button}</a>
      </div>
    </section>
  );
}
