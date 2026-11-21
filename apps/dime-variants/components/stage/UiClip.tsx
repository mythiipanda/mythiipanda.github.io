export default function UiClip({ src, poster, label, className = "", cover = false }: { src: string; poster?: string; label?: string; className?: string; cover?: boolean }) {
  return (
    <div className={`${cover ? "h-full" : "h-[300px] md:h-auto"} overflow-hidden rounded-xl bg-surface ring-1 ring-inset ring-line shadow-[0_20px_50px_-24px_rgb(0_0_0/0.18)] ${className}`}>
      <video
        className={`block h-full w-full ${cover ? "object-cover object-top" : "object-cover object-[28%_top] md:h-auto md:object-contain md:object-center"}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        title={label}
      />
    </div>
  );
}
