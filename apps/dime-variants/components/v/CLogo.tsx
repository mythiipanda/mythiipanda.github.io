export function CMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="13.5" r="6.5" stroke="var(--cobalt-tx)" strokeWidth="3" />
      <rect x="17" y="3" width="3.2" height="18" rx="1.6" fill="var(--cobalt-tx)" />
    </svg>
  );
}

export function CLogo({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-ink">
      <CMark size={size} />
      <span className="font-semibold lowercase" style={{ fontFamily: "var(--font-display)", fontSize: size, lineHeight: 1, letterSpacing: "-0.035em" }}>dime</span>
    </span>
  );
}
