"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function CTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"), []);
  const set = (v: string) => {
    if (!v) return;
    document.documentElement.dataset.theme = v;
    try { localStorage.setItem("dime-theme", v); } catch {}
    setTheme(v);
  };
  return (
    <ToggleGroup type="single" variant="outline" size="sm" value={theme} onValueChange={set} aria-label="Theme" className="rounded-full">
      <ToggleGroupItem value="dark" aria-label="Dark" className="rounded-l-full px-3"><Moon /></ToggleGroupItem>
      <ToggleGroupItem value="light" aria-label="Light" className="rounded-r-full px-3"><Sun /></ToggleGroupItem>
    </ToggleGroup>
  );
}
