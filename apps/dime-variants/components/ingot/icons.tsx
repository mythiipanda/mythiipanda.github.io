/**
 * Ingot Icons — original 24px line icons (1.5px stroke, round caps/joins).
 * Construction: 24 grid, 20px live area, keylines, badge zone 7px at (18,18).
 */
import { useId, type SVGProps } from "react";

type Parts = { body: React.ReactNode; badge?: "plus" | "check" };

const P = (d: string) => <path d={d} />;
const ICONS = {
  home: { body: <>{P("M3.75 10.25 L12 3.75 L20.25 10.25 V18.25 Q20.25 20.25 18.25 20.25 H5.75 Q3.75 20.25 3.75 18.25 Z")}{P("M9.75 20.25 V15.75 Q9.75 13.75 12 13.75 Q14.25 13.75 14.25 15.75 V20.25")}</> },
  search: { body: <><circle cx="11" cy="11" r="6.25" />{P("M15.75 15.75 L20.25 20.25")}</> },
  bell: { body: <>{P("M6.25 16.5 V11 A5.75 5.75 0 0 1 17.75 11 V16.5 L19.25 18.25 H4.75 Z")}{P("M10 20.75 H14")}{P("M12 3.75 V5.25")}</> },
  "chart-capsule": { body: <><rect x="4.75" y="13.25" width="3.5" height="7" rx="1.75" /><rect x="10.25" y="8.75" width="3.5" height="11.5" rx="1.75" /><rect x="15.75" y="3.75" width="3.5" height="16.5" rx="1.75" /></> },
  invoice: { body: <><rect x="4.75" y="2.75" width="14.5" height="18.5" rx="2" />{P("M8.5 7.75 H15.5")}{P("M8.5 11.75 H15.5")}{P("M8.5 15.75 H12.5")}</> },
  "invoice-add": { body: <><rect x="4.75" y="2.75" width="14.5" height="18.5" rx="2" />{P("M8.5 7.75 H15.5")}{P("M8.5 11.75 H13")}</>, badge: "plus" },
  user: { body: <><circle cx="12" cy="8" r="3.75" />{P("M4.75 20.25 Q4.75 14.25 12 14.25 Q19.25 14.25 19.25 20.25 Z")}</> },
  "user-check": { body: <><circle cx="11" cy="8" r="3.75" />{P("M3.75 20.25 Q3.75 14.25 11 14.25 Q18.25 14.25 18.25 20.25 Z")}</>, badge: "check" },
  sliders: { body: <><circle cx="8" cy="7" r="2.25" /><circle cx="16" cy="17" r="2.25" />{P("M3.75 7 H5.75")}{P("M10.25 7 H20.25")}{P("M3.75 17 H13.75")}{P("M18.25 17 H20.25")}</> },
  calendar: { body: <><rect x="3.75" y="4.75" width="16.5" height="15.5" rx="2" />{P("M3.75 9.75 H20.25")}{P("M8 2.75 V6.25")}{P("M16 2.75 V6.25")}</> },
  "calendar-check": { body: <><rect x="3.75" y="4.75" width="16.5" height="15.5" rx="2" />{P("M3.75 9.75 H20.25")}{P("M8 2.75 V6.25")}{P("M16 2.75 V6.25")}</>, badge: "check" },
  wallet: { body: <><rect x="3.75" y="5.75" width="16.5" height="13.5" rx="2" />{P("M14.5 10.75 H20.25 V14.25 H14.5 Q12.75 14.25 12.75 12.5 Q12.75 10.75 14.5 10.75 Z")}</> },
  "credit-card": { body: <><rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2" />{P("M2.75 9.75 H21.25")}{P("M6.25 15 H9.25")}</> },
  mail: { body: <><rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />{P("M6.25 8.75 L12 12.75 L17.75 8.75")}</> },
  chat: { body: <>{P("M4.75 5.75 Q4.75 3.75 6.75 3.75 H17.25 Q19.25 3.75 19.25 5.75 V14.25 Q19.25 16.25 17.25 16.25 H10.25 L6.25 19.75 V16.25 Q4.75 16.25 4.75 14.25 Z")}{P("M8.5 8.25 H15.5")}{P("M8.5 11.75 H13")}</> },
  folder: { body: <>{P("M2.75 7 Q2.75 4.75 5 4.75 H9.25 L11.25 6.75 H19 Q21.25 6.75 21.25 9 V17 Q21.25 19.25 19 19.25 H5 Q2.75 19.25 2.75 17 Z")}{P("M2.75 10.25 H21.25")}</> },
  layers: { body: <>{P("M12 3.75 L20.25 8 L12 12.25 L3.75 8 Z")}{P("M3.75 12 L12 16.25 L20.25 12")}{P("M3.75 16 L12 20.25 L20.25 16")}</> },
  lock: { body: <><rect x="4.75" y="10.25" width="14.5" height="10" rx="2" />{P("M12 14.25 V16.25")}{P("M8 10.25 V7.75 A4 4 0 0 1 16 7.75 V10.25")}</> },
  download: { body: <>{P("M12 3.75 V14.75")}{P("M8.25 11 L12 14.75 L15.75 11")}{P("M3.75 15.5 V18.25 Q3.75 20.25 5.75 20.25 H18.25 Q20.25 20.25 20.25 18.25 V15.5")}</> },
  sparkle: { body: <>{P("M11 4.75 C11.6 9.6 13.4 11.4 18.25 12 C13.4 12.6 11.6 14.4 11 19.25 C10.4 14.4 8.6 12.6 3.75 12 C8.6 11.4 10.4 9.6 11 4.75 Z")}{P("M18.5 3.75 V7.25")}{P("M16.75 5.5 H20.25")}</> },
  "chevron-down": { body: P("M7.75 10 L12 14.25 L16.25 10") },
  "chevron-right": { body: P("M10 7.75 L14.25 12 L10 16.25") },
  plus: { body: <>{P("M12 5.75 V18.25")}{P("M5.75 12 H18.25")}</> },
  check: { body: P("M5.75 12.5 L10 16.5 L18.25 7.75") },
  x: { body: <>{P("M7 7 L17 17")}{P("M17 7 L7 17")}</> },
  "arrow-up-right": { body: <>{P("M7.75 16.25 L16.25 7.75")}{P("M9.25 7.75 H16.25 V14.75")}</> },
  "more-horizontal": { body: <><circle cx="6" cy="12" r="0.75" /><circle cx="12" cy="12" r="0.75" /><circle cx="18" cy="12" r="0.75" /></> },
  copy: { body: <><rect x="8.75" y="8.75" width="11.5" height="11.5" rx="2" />{P("M15.25 8.75 V5.75 Q15.25 3.75 13.25 3.75 H5.75 Q3.75 3.75 3.75 5.75 V13.25 Q3.75 15.25 5.75 15.25 H8.75")}</> },
  code: { body: <>{P("M8.25 7.75 L3.75 12 L8.25 16.25")}{P("M15.75 7.75 L20.25 12 L15.75 16.25")}{P("M13.25 4.75 L10.75 19.25")}</> },
  image: { body: <><rect x="3.75" y="4.75" width="16.5" height="14.5" rx="2" /><circle cx="9" cy="10" r="1.75" />{P("M3.75 16.5 L8.75 13.25 L12.25 15.75 L15.75 12.25 L20.25 16")}</> },
} satisfies Record<string, Parts>;

export type IconName = keyof typeof ICONS;
export const iconNames = Object.keys(ICONS) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.5, ...rest }: IconProps) {
  const icon: Parts = ICONS[name];
  const maskId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {icon.badge ? (
        <>
          <mask id={maskId}>
            <rect width="24" height="24" fill="#fff" />
            <circle cx="18" cy="18" r="5" fill="#000" />
          </mask>
          <g mask={`url(#${maskId})`}>{icon.body}</g>
          {icon.badge === "plus" ? <>{P("M18 15.5 V20.5")}{P("M15.5 18 H20.5")}</> : P("M15.75 18.25 L17.25 19.75 L20.25 16.5")}
        </>
      ) : (
        icon.body
      )}
    </svg>
  );
}
