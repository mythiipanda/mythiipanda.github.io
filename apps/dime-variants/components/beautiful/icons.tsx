import { Check, ChevronDown, Database, House, LogOut, PanelLeft, Plus, Search, Settings, SquarePen, UserPlus, X } from "@/components/icons";
import { DimeMark } from "@/components/mark";

type IconProps = { size?: number; className?: string };

const wrap = (Icon: typeof Check) =>
  function Wrapped({ size = 16, className }: IconProps) {
    return <Icon size={size} className={className} aria-hidden="true" />;
  };

export const IconArrowBoxLeft = wrap(LogOut);
export const IconCheckmark1Small = wrap(Check);
export const IconChevronDownSmall = wrap(ChevronDown);
export const IconCrossSmall = wrap(X);
export const IconEditBig = wrap(SquarePen);
export const IconHome = wrap(House);
export const IconMagnifyingGlass = wrap(Search);
export const IconPlusMedium = wrap(Plus);
export const IconSettingsGear1 = wrap(Settings);
export const IconSidebarLeftArrow = wrap(PanelLeft);
export const IconUserAdd = wrap(UserPlus);
export const IconDatabase = wrap(Database);
export function IconPopsicle2({ size = 18 }: IconProps) {
  return <DimeMark size={size} />;
}
