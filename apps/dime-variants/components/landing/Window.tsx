"use client";

import { useEffect, useRef, useState } from "react";
import Workbench from "@/components/workbench/Workbench";

export default function Window() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative z-[2] rounded-[24px] border border-line bg-field p-2 md:p-3">
      <div className="h-[640px] overflow-hidden rounded-[14px] bg-canvas shadow-[0_0_0_1px_var(--line)] md:h-[780px]">
        {seen && <Workbench />}
      </div>
    </div>
  );
}
