"use client";

import { useState } from "react";

export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(command).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      className="flex select-none items-center gap-3 rounded-lg bg-white/10 py-3 pl-4 pr-3 font-mono text-[13.5px] text-white/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)] transition-colors hover:bg-white/15"
      aria-live="polite"
    >
      <span>{command}</span>
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-[11px] font-sans font-medium text-white/80">
        {copied ? "✓" : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
}
