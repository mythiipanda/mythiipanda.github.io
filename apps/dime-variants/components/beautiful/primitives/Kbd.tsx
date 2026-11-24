import type * as React from "react";

/* vendored from t3code apps/web/src/components/ui/kbd.tsx —
 * cn stripped, tokens mapped (muted-foreground → secondary-label). */

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Kbd({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"kbd"> & {
  variant?: "default" | "outline";
}) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded px-1 font-sans text-xs font-medium text-secondary-label [&_svg:not([class*='size-'])]:size-3",
        variant === "outline"
          ? "border border-b-2 border-ink/15 px-1.5"
          : "bg-ink/[0.07]",
        className
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

export function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd className={cn("inline-flex items-center gap-1", className)} data-slot="kbd-group" {...props} />;
}
