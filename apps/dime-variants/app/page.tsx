export default function Index() {
  return (
    <main className="mx-auto max-w-[560px] p-10">
      <ul className="font-mono text-[14px] leading-8">
        {"abcdefghij".split("").map((l) => (
          <li key={l}><a className="text-ink underline" href={`${l}/`}>{l}</a></li>
        ))}
      </ul>
    </main>
  );
}
