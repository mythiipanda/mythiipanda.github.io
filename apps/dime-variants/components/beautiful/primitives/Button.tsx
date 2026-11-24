"use client";

import { ButtonHTMLAttributes } from "react";

const cn = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

const filledShadow = "shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]";

const VARIANTS = {
  primary: `bg-ink text-canvas hover:opacity-90 dark:bg-ink dark:text-canvas ${filledShadow}`,
  secondary: "bg-surface text-ink shadow-btn hover:bg-inset aria-expanded:bg-hover",
  ghost: "bg-hover-2 text-ink hover:bg-line-strong",
  accent: `bg-accent text-white hover:bg-accent-ink ${filledShadow}`,
  success: `bg-green text-white hover:brightness-95 ${filledShadow}`,
  quiet: "text-ink hover:bg-hover",
};

const SIZES = {
  xs: "h-7 rounded-full px-2.5 text-[12px] font-normal leading-none gap-1",
  sm: "h-[27px] px-3 text-[13px] leading-none rounded-full gap-1.5",
  md: "px-4 py-[9px] text-sm leading-none rounded-full gap-2",
};

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cn(
        `inline-flex items-center justify-center font-medium select-none
         transition-[transform,background-color,opacity] duration-150 ease-out
         active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none`,
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
