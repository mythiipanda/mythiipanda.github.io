export default function UiClip({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-surface ring-1 ring-inset ring-line shadow-[0_20px_50px_-24px_rgb(0_0_0/0.18)] ${className}`}>
      <video
        className="block h-auto w-full"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
