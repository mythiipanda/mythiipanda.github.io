import Demo from "@/components/demo";
import { DimeMark } from "@/components/product/DimeMark";

const GITHUB_URL = "https://github.com/mythiipanda/dime";

const steps = [
  { name: "Ask", text: "You write the question in plain words." },
  { name: "Check", text: "You read the query Dime ran." },
  { name: "Answer", text: "You use the table and the chart." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between px-6">
          <span className="flex items-center gap-2">
            <DimeMark size={18} />
            <span className="text-[14px] font-medium tracking-[-0.01em]">Dime</span>
          </span>
          <a
            href={GITHUB_URL}
            className="flex h-10 items-center text-[13px] font-medium text-accent"
          >
            GitHub
          </a>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1120px] px-6">
        <section aria-labelledby="demo-heading" className="pb-16 pt-10">
          <p id="demo-heading" className="max-w-[640px] text-[15px] leading-relaxed text-ink-2">
            Ask an NBA question. You get the query, the table, and the chart.
          </p>
        </section>
        <section aria-labelledby="ask-heading" className="border-t border-line py-12">
          <h2 id="ask-heading" className="text-[24px] font-medium">
            Try a question
          </h2>
          <div className="mt-6">
            <Demo />
          </div>
        </section>
        <section aria-labelledby="how-heading" className="border-t border-line py-12">
          <h2 id="how-heading" className="text-[24px] font-medium">
            How it works
          </h2>
          <div className="mt-6 border-t border-line">
            {steps.map((s) => (
              <div
                key={s.name}
                className="flex items-baseline gap-6 border-b border-line py-4"
              >
                <span className="w-16 shrink-0 text-[13px] font-medium text-ink">
                  {s.name}
                </span>
                <span className="text-[14px] leading-relaxed text-ink-2">{s.text}</span>
              </div>
            ))}
          </div>
        </section>
        <section aria-label="Get the code" className="border-t border-line py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] leading-relaxed text-ink-2">
              The code is open.
            </p>
            <a
              href={GITHUB_URL}
              className="press flex h-10 w-fit items-center rounded-control border border-line-strong px-4 text-[13px] font-medium text-ink"
            >
              Open the GitHub repo
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-ink-3">
            Sample data. Every number is illustrative.
          </p>
          <a href={GITHUB_URL} className="text-[12px] font-medium text-accent">
            github.com/mythiipanda/dime
          </a>
        </div>
      </footer>
    </div>
  );
}
