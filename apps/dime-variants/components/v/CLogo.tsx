import { CMark } from "@/components/v/CMark";

export function CLogo({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center text-ink" style={{ gap: Math.round(size * 0.45) }}>
      <CMark size={Math.round(size * 0.9)} className="shrink-0" />
      <span className="font-semibold lowercase" style={{ fontSize: size, lineHeight: 1, letterSpacing: "-0.03em" }}>dime<span className="text-[var(--cobalt-tx)]">.</span></span>
    </span>
  );
}
