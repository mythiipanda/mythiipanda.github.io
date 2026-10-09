"use client";

import { useEffect, useState } from "react";
import { ButtonLink, Logo } from "./ui";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { copy, REPO } from "@/lib/copy";

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"), []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("dime-theme", next); } catch {}
    setTheme(next);
  };
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" variant="quiet" size="icon-lg" onClick={flip} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="rounded-full">
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
      )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{theme === "dark" ? "Light mode" : "Dark mode"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 flex justify-center px-3 pt-4 md:px-0 md:pt-5">
      <nav className="flex h-14 w-full max-w-[720px] items-center justify-between rounded-full border border-line bg-canvas/95 pl-5 pr-2 backdrop-blur">
        <a href="#top" aria-label="dime home"><Logo /></a>
        <div className="hidden gap-8 text-[14px] font-medium text-ink-2 md:flex">
          {copy.nav.links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="transition-colors duration-150 hover:text-ink">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <ButtonLink href={REPO} variant="ink" size="pill">★ {copy.nav.star}</ButtonLink>
        </div>
      </nav>
    </header>
  );
}
