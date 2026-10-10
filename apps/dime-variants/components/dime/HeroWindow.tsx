import Workbench from "@/components/workbench/Workbench";

export default function ScrollShowcase() {
  return (
    <div className="mt-10 lg:mt-12">
      <div className="overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)]">
        <div className="h-[560px] md:h-[640px] lg:h-[660px]"><Workbench dime initialTab="chat" /></div>
      </div>
    </div>
  );
}
