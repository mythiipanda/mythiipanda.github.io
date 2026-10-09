export function CMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2a10 10 0 0 0 0 20Z" fill="currentColor" />
    </svg>
  );
}

export function CLogo({ size = 20 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-ink">
      <CMark size={size} />
      <span className="font-semibold lowercase" style={{ fontSize: size, lineHeight: 1, letterSpacing: "-0.02em" }}>dime<span className="text-[var(--cobalt-tx)]">.</span></span>
    </span>
  );
}
