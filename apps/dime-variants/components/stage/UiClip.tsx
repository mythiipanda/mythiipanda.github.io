export default function UiClip({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-surface ring-1 ring-inset ring-line shadow-[0_12px_36px_-18px_rgb(0_0_0/0.28),0_2px_8px_-4px_rgb(0_0_0/0.12)] ${className}`}>
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
