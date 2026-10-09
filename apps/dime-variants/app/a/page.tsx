import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Window from "@/components/landing/Window";
import { Pillars } from "@/components/landing/Pillars";
import { HostSection, Questions, Closing } from "@/components/landing/Sections";

export default function Page() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <Nav />
      <div className="relative mx-auto w-full max-w-[1224px] px-0 md:px-3">
        <div className="pointer-events-none absolute inset-y-0 left-3 hidden w-px bg-line md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-3 hidden w-px bg-line md:block" />
        <main className="mx-auto max-w-[1200px] min-w-0">
          <Hero />
          <div className="mt-14 px-3 md:-mx-3 md:mt-20 md:px-0"><Window /></div>
          <Pillars />
          <HostSection />
          <Questions />
          <Closing />
        </main>
      </div>
    </div>
  );
}
