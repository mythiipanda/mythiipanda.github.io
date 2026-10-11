import HeroWindow from "@/components/dime/HeroWindow";
import { CLogo } from "@/components/v/CLogo";
import { ButtonLink, GithubMark } from "@/components/landing/ui";
import { copy, REPO, short } from "@/lib/copy";

const H1 = "Harvey for NBA Analysts";
const SUB = "Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.";

function Note({ children }: { children: string }) {
  return <div className="v2-note"><span />{children}</div>;
}

export function V2() {
  return (
    <div id="top" className="vx min-h-screen overflow-x-clip" style={{ background: "var(--canvas)", color: "var(--vx-ink)" }}>
      <header className="sticky top-0 z-50 border-b vx-hair" style={{ background: "var(--canvas)" }}>
        <nav className="vx-wrap flex h-[58px] items-center justify-between">
          <a href="#top" aria-label="dime home"><CLogo /></a>
          <ButtonLink href={REPO} variant="ghost" size="pill"><GithubMark size={14} />{short.star}</ButtonLink>
        </nav>
      </header>
      <main className="pb-24">
        <section className="vx-wrap v2-grid border-b vx-hair pt-14 pb-16 md:pt-20">
          <Note>the pitch</Note>
          <div>
            <h1 className="text-[44px] leading-[46px] md:text-[72px] md:leading-[74px]">{H1}</h1>
            <p className="mt-6 max-w-[510px] text-[17px] leading-[26px]" style={{ color: "var(--vx-ink2)" }}>{SUB}</p>
            <div className="mt-6"><ButtonLink href={REPO} variant="primary"><GithubMark />{short.star}</ButtonLink></div>
          </div>
        </section>
        <section className="vx-wrap v2-grid border-b vx-hair py-14">
          <Note>the product</Note>
          <div className="relative xl:px-[110px]">
            <span className="v1-anno" style={{ right: 0, top: "24%" }}><i />Answer, then the SQL</span>
            <span className="v1-anno v1-anno-l" style={{ left: 0, bottom: "18%" }}>Ask about the league<i /></span>
            <HeroWindow />
          </div>
        </section>
        <section className="vx-wrap v2-grid border-b vx-hair py-14">
          <Note>how it reads</Note>
          <div className="grid gap-10 md:grid-cols-3">
            {copy.pillars.map((p) => (
              <div key={p.title}>
                <p className="text-[17px] font-medium">{p.title}</p>
                <p className="mt-2 text-[14px] leading-[22px]" style={{ color: "var(--vx-ink2)" }}>{p.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="setup" className="vx-wrap v2-grid border-b vx-hair py-14">
          <Note>self-host, in order</Note>
          <ol>
            {copy.host.commands.map((c, i) => (
              <li key={c} className="grid items-baseline gap-2 border-b vx-hair py-5 first:pt-0 last:border-b-0 md:grid-cols-[48px_1.4fr_1fr]">
                <span className="v5-coord" style={{ color: "var(--vx-cobalt)" }}>0{i + 1}</span>
                <code className="text-[15px] md:text-[18px]" style={{ fontFamily: "var(--vx-mono)" }}>{c}</code>
                <span className="text-[14px]" style={{ color: "var(--vx-ink2)" }}>{copy.host.items[i].title}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="vx-wrap v2-grid py-14">
          <Note>questions</Note>
          <dl>
            {copy.faq.map((f) => (
              <div key={f.id} className="border-t vx-hair py-5 first:border-t-0 first:pt-0">
                <dt className="text-[16px] font-medium">{f.question}</dt>
                <dd className="mt-1 max-w-[560px] text-[14px] leading-[22px]" style={{ color: "var(--vx-ink2)" }}>{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <footer className="border-t vx-hair">
        <div className="vx-wrap flex items-center justify-between py-6 text-[13px]" style={{ color: "var(--vx-ink3)" }}>
          <CLogo size={18} />
          <a href={REPO} className="transition-colors hover:text-ink">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
