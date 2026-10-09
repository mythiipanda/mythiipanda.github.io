"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Toggle } from "@/components/ui/toggle";

export function CTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === "light"), []);
  const set = (l: boolean) => {
    document.documentElement.dataset.theme = l ? "light" : "dark";
    try { localStorage.setItem("dime-theme", l ? "light" : "dark"); } catch {}
    setLight(l);
  };
  return (
    <Toggle pressed={light} onPressedChange={set} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} className="size-9 rounded-full p-0 text-ink-2 hover:bg-hover hover:text-ink data-[state=on]:bg-transparent">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={light ? "sun" : "moon"} initial={{ opacity: 0, rotate: -50, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 50, scale: 0.6 }} transition={{ duration: 0.18 }} className="flex">
          {light ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </Toggle>
  );
}
