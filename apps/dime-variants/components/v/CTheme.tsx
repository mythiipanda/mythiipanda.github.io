"use client";

import { useEffect, useState } from "react";

export function CTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === "light"), []);
  const set = (l: boolean) => {
    document.documentElement.dataset.theme = l ? "light" : "dark";
    try { localStorage.setItem("dime-theme", l ? "light" : "dark"); } catch {}
    setLight(l);
  };
  const seg = "relative z-10 flex size-8 items-center justify-center rounded-full transition-colors duration-200";
  return (
    <div role="group" aria-label="Theme" className="relative flex h-10 items-center rounded-full bg-field p-1 shadow-[0_0_0_1px_var(--line-strong)]">
      <span aria-hidden className="absolute left-1 top-1 size-8 rounded-full bg-canvas shadow-[0_0_0_1px_var(--line-strong)] transition-transform duration-200 ease-out" style={{ transform: light ? "translateX(32px)" : "translateX(0)" }} />
      <button type="button" aria-label="Dark" aria-pressed={!light} onClick={() => set(false)} className={`${seg} ${light ? "text-ink-3 hover:text-ink" : "text-ink"}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" /></svg>
      </button>
      <button type="button" aria-label="Light" aria-pressed={light} onClick={() => set(true)} className={`${seg} ${light ? "text-ink" : "text-ink-3 hover:text-ink"}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1 1M17.4 17.4l1 1M5.6 18.4l1-1M17.4 6.6l1-1" /></svg>
      </button>
    </div>
  );
}
