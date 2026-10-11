import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";

export function V4() {
  return (
    <div id="top" className="vx min-h-screen overflow-x-clip" style={{ background: "var(--vx-paper)", color: "var(--vx-ink)" }}>
      <header className="vx-wrap flex h-[72px] items-center justify-between">
        <a href="#top" aria-label="dime home"><CLogo /></a>
        <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} />{short.star}</ButtonLink>
      </header>
      <main>
        <section className="vx-wrap grid items-end gap-6 v4-air lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7"><h1 className="v4-hero">Harvey for <em>NBA Analysts</em></h1></div>
          <div className="lg:col-span-5">
            <p className="max-w-[510px] text-[17px] leading-[27px]" style={{ color: "var(--vx-ink2)" }}>Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.</p>
            <div className="mt-8"><ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink></div>
          </div>
        </section>
        <section className="vx-wrap pb-8"><HeroWindow /></section>
        <section className="vx-wrap v4-air">
          <div className="mx-auto max-w-[760px]">
            {copy.pillars.map((p) => (
              <div key={p.title} className="border-t vx-hair py-10 first:border-t-0">
                <h2 className="v4-h2">{p.title}</h2>
                <p className="mt-3 text-[16px] leading-[26px]" style={{ color: "var(--vx-ink2)" }}>{p.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="vx-wrap v4-air text-center">
          <h2 className="v4-h2 mx-auto max-w-[640px]">{copy.close.title}</h2>
          <div className="mt-10 flex justify-center"><ButtonLink href={REPO} variant="primary"><GithubMark />{copy.close.button}</ButtonLink></div>
        </section>
      </main>
      <footer className="vx-wrap flex items-center justify-between py-8 text-[13px]" style={{ color: "var(--vx-ink3)" }}>
        <CLogo size={18} />
        <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
      </footer>
    </div>
  );
}
