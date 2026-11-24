"use client";

import { useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Headshot({ src, alt, size = 26 }: { src: string; alt: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = alt.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  if (failed) {
    return (
      <span
        aria-label={alt}
        className="flex shrink-0 items-center justify-center rounded-full bg-hover-2 font-mono text-[9px] font-medium text-ink-3 ring-1 ring-ink/10"
        style={{ width: size, height: size }}
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={`${BASE}${src}`}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="shrink-0 rounded-full bg-hover-2 object-cover object-top ring-1 ring-ink/10"
      style={{ width: size, height: size }}
    />
  );
}
