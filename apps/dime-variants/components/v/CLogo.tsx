export function CLogo({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center text-ink">
      <span className="font-semibold lowercase" style={{ fontSize: size, lineHeight: 1, letterSpacing: "-0.03em" }}>dime<span className="text-[var(--cobalt-tx)]">.</span></span>
    </span>
  );
}
