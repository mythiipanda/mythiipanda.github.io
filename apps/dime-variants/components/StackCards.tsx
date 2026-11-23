"use client";

import { useEffect, useRef } from "react";

const STICKY_TOP0 = 24;
const STICKY_STEP = 16;
const DISTANCE = 752;
const SHADE_PER_CARD = 0.12;
const MIN_VIEWPORT_HEIGHT = 560;

export default function StackCards({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".fcard"));
    if (cards.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const update = () => {
      raf = 0;
      const enabled = window.innerHeight >= MIN_VIEWPORT_HEIGHT && !reduce.matches;
      const secTop = el.getBoundingClientRect().top + window.scrollY;
      const dist = DISTANCE * Math.min(1.2, Math.max(0.7, window.innerHeight / 896));
      cards.forEach((card, i) => {
        if (!enabled) {
          card.style.removeProperty("--o");
          card.style.removeProperty("--k");
          return;
        }
        const stickY = secTop + card.offsetTop - (STICKY_TOP0 + i * STICKY_STEP);
        const k = Math.min(Math.max((window.scrollY - stickY) / dist, 0), cards.length - 1 - i);
        card.style.setProperty("--k", String(k));
        card.style.setProperty("--o", String(k * SHADE_PER_CARD));
      });
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (Math.abs(h - lastH) < 120 && w === lastW) return;
      lastW = w;
      lastH = h;
      queue();
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
