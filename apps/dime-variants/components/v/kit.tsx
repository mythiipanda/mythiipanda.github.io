import { CLogo } from "@/components/v/CLogo";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { ButtonLink, GithubMark, Logo } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";
import { roadmap } from "@/lib/roadmap";

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
    <div className="flex flex-wrap items-center gap-3">
      <ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink>
      <ButtonLink href={secondary} variant="ghost">{short.setup}</ButtonLink>
    </div>
  );
}

export function Foot({ max = "max-w-[1200px]", brand = false }: { max?: string; brand?: boolean }) {
  return (
    <footer className="border-t border-line">
      <div className={`mx-auto flex ${max} items-center justify-between px-5 py-8 text-[13px] text-ink-3 md:px-6`}>
        {brand ? <CLogo size={18} /> : <Logo size={16} />}
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

export function SetupRows({ title = false, className = "mt-20 md:mt-28" }: { title?: boolean; className?: string }) {
  const notes = ["Clone", "Fetch data", "Run"];
  return (
    <section id="self-host" className={`scroll-mt-24 ${title ? className : ""}`}>
      {title && <h2 className="mb-6 font-display text-[26px] leading-[32px] md:text-[34px] md:leading-[40px]">{short.groups.setup}</h2>}
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

export function DockNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas">
      <div className="mx-auto flex h-14 max-w-[880px] items-center gap-4 px-5 font-mono text-[13px] md:px-6">
        <a href="#top" aria-label="dime home" className="shrink-0"><Logo size={16} /></a>
        <div className="flex min-w-0 flex-1 items-center gap-2 text-ink-3"><span className="text-[var(--cobalt-tx)]">&gt;</span><span className="hidden truncate sm:block">ask about the league</span></div>
        <ThemeToggle />
        <ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink>
      </div>
    </nav>
  );
}

export function CenterNav({ max = "max-w-[1320px]" }: { max?: string }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className={`mx-auto grid h-16 w-full ${max} grid-cols-[1fr_auto_1fr] items-center px-5 md:px-6`}>
        <div className="hidden gap-6 text-[14px] text-ink-2 md:flex">
          {links.map((l) => (<a key={l.label} href={l.href} className="transition-colors hover:text-ink">{l.label}</a>))}
        </div>
        <a href="#top" aria-label="dime home" className="col-start-2 justify-self-center"><Logo /></a>
        <div className="col-start-3 flex items-center justify-self-end gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="ink" size="pill">Star on GitHub</ButtonLink></div>
      </nav>
    </header>
  );
}

export function RunNav({ label }: { label: string }) {
  return (
    <header className="border-b-[3px] border-[var(--cobalt)]">
      <nav className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-5 md:px-6">
        <a href="#top" aria-label="dime home"><Logo /></a>
        <span className="hidden font-mono text-[12px] text-ink-3 md:block">{label}</span>
        <div className="flex items-center gap-1"><ThemeToggle /><ButtonLink href={REPO} variant="ink" size="pill">Star on GitHub</ButtonLink></div>
      </nav>
    </header>
  );
}

export function RoadmapRows() {
  return (
    <section id="roadmap" className="scroll-mt-24">
      <ol className="border-t border-line">
        {roadmap.map((r) => (
          <li key={r.n} className="grid gap-2 border-b border-line py-6 md:grid-cols-[56px_1fr] md:items-baseline md:gap-8 md:py-6">
            <span className="font-mono text-[12px] text-ink-3">0{r.n}</span>
            <h3 className="text-[18px] font-medium leading-[24px] text-ink md:text-[20px]">{r.title}</h3>
            {r.text ? <p className="text-[15px] leading-[24px] text-ink-2">{r.text}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Cap({ k, className = "" }: { k: keyof typeof short.tiles; className?: string }) {
  const t = short.tiles[k];
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}><h3 className="font-mono text-[12px] uppercase tracking-[0.04em] text-ink">{t.name}</h3><p className="text-[13px] text-ink-3">{t.note}</p></div>
  );
}

export function Group({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 mt-20 flex items-baseline justify-between border-b border-line pb-4 md:mt-28"><h2 className="font-display text-[22px] font-semibold uppercase leading-[30px] tracking-[-0.02em] md:text-[30px] md:leading-[46px]">{label}</h2><span className="font-mono text-[12px] text-ink-3">{n}</span></div>
  );
}
