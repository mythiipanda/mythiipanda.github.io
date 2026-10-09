import type { ReactNode } from "react";
import { DimeMark } from "@/components/product/DimeMark";
import { InView } from "@/components/ui/in-view";
import { Button } from "@/components/ui/button";

export const GithubMark = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.82 1.19 3.08 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

export function Logo({ size = 19 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2 font-semibold text-ink" style={{ fontSize: size }}>
      <DimeMark size={size + 1} />
      <span>dime<span className="text-[var(--cobalt-tx)]">.</span></span>
    </span>
  );
}

export function ButtonLink({ href, variant = "primary", size = "hero", children }: { href: string; variant?: "primary" | "ghost" | "ink"; size?: "pill" | "hero"; children: ReactNode }) {
  const v = { primary: "default", ghost: "line", ink: "ink" }[variant] as "default" | "line" | "ink";
  const external = href.startsWith("http");
  return (
    <Button asChild variant={v} size={size}>
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>
    </Button>
  );
}

export function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <InView variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }} viewOptions={{ once: true, margin: "0px 0px -10% 0px" }}>
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start md:justify-between md:gap-12">
      <h2 className="text-[30px] leading-[36px] md:w-[480px] md:text-[40px] md:leading-[46px]">{title}</h2>
      <p className="text-[16px] leading-[26px] text-ink-2 md:w-[460px] md:text-[18px] md:leading-[28px]">{sub}</p>
    </div>
    </InView>
  );
}
