"use client";

import { useEffect, useRef } from "react";

export default function UiClip({ src, poster, label, className = "", cover = false, anchor = "28%", flat = false }: { src: string; poster?: string; label?: string; className?: string; cover?: boolean; anchor?: string; flat?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);
  return (
    <div className={`${cover ? "h-full" : "h-[300px] md:h-auto"} overflow-hidden ${flat ? "" : "rounded-xl bg-surface ring-1 ring-inset ring-line shadow-[0_20px_50px_-24px_rgb(0_0_0/0.18)]"} ${className}`}>
      <video
        ref={ref}
        className={`block h-full w-full ${cover ? "object-cover object-top" : `${anchor === "58%" ? "object-[58%_top]" : anchor === "45%" ? "object-[45%_top]" : "object-[28%_top]"} md:h-auto md:object-contain md:object-center`}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        title={label}
      />
    </div>
  );
}
