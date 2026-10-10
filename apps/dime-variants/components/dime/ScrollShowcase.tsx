"use client";
import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Workbench, { type Tab } from "@/components/workbench/Workbench";

const ORDER: Tab[] = ["chat", "notebook", "warehouse", "skills", "history"];

export default function ScrollShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("chat");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(ORDER.length - 1, Math.max(0, Math.floor(p * ORDER.length)));
    setTab((t) => (ORDER[i] === t ? t : ORDER[i]));
  });
  const driven = !reduce;
  return (
    <div ref={ref} className={`mt-10 lg:mt-12 ${driven ? "lg:h-[380vh]" : ""}`}>
      <div className={driven ? "lg:sticky lg:top-[72px]" : ""}>
        <div className="overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)]">
          <div className="h-[560px] md:h-[640px] lg:h-[min(660px,calc(100vh-96px))]"><Workbench dime initialTab="chat" scrollTab={driven ? tab : undefined} /></div>
        </div>
      </div>
    </div>
  );
}
