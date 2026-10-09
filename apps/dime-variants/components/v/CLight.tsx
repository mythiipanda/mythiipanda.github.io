"use client";

import { useLayoutEffect } from "react";

export function CLight() {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = "light";
  }, []);
  return null;
}
