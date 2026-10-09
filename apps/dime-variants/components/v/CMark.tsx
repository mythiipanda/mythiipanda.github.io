export function CMark({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="8" fill="var(--ink)" />
      <path d="M8 3a5 5 0 0 1 0 10z" fill="var(--canvas)" />
    </svg>
  );
}
