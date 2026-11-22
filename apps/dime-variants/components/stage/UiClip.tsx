export default function UiClip({ poster, label, className = "", cover = false, anchor = "28%", flat = false, w = 2400, h = 1360, eager = false }: { src?: string; poster: string; label?: string; className?: string; cover?: boolean; anchor?: string; flat?: boolean; zoom?: boolean; w?: number; h?: number; eager?: boolean }) {
  const anchorCls = anchor === "58%" ? "object-[58%_top]" : anchor === "45%" ? "object-[45%_top]" : "object-[28%_top]";
  const loading = eager ? { loading: "eager" as const, fetchPriority: "high" as const } : { loading: "lazy" as const };
  return (
    <div className={`${cover ? "h-full" : "h-[300px] md:h-auto"} overflow-hidden ${flat ? "" : "rounded-xl bg-surface ring-1 ring-inset ring-line shadow-[0_20px_50px_-24px_rgb(0_0_0/0.18)]"} ${className}`}>
      <img
        className={`block h-full w-full object-cover object-top md:hidden ${cover ? "" : anchorCls}`}
        src={poster}
        alt={label ?? ""}
        width={w}
        height={h}
        decoding="async"
        {...loading}
      />
      <img
        className={`hidden h-full w-full md:block ${cover ? "object-cover object-top" : "md:h-auto md:object-contain md:object-center"}`}
        src={poster}
        alt={label ?? ""}
        width={w}
        height={h}
        decoding="async"
        {...loading}
      />
    </div>
  );
}
