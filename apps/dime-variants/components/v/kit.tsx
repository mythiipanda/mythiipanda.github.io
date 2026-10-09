import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { ButtonLink, GithubMark, Logo } from "@/components/landing/ui";
import { REPO } from "@/lib/copy";

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

export function Page({ children }: { children: ReactNode }) {
  return <div id="top" className="min-h-screen overflow-x-clip bg-canvas text-ink">{children}</div>;
}

export function Frame({ children, h = "h-[640px] md:h-[720px]", className = "" }: { children: ReactNode; h?: string; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-line bg-field p-2 md:p-2.5 ${className}`}>
      <div className={`${h} overflow-hidden rounded-[12px] bg-canvas shadow-[0_0_0_1px_var(--line)]`}>{children}</div>
    </div>
  );
}
