const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function build(r: number) {
  const size = r * 2;
  const parts: string[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - r;
      const dy = y + 0.5 - r;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > r) continue;
      if (dx < 0) {
        parts.push(`M${x} ${y}h1v1h-1z`);
        continue;
      }
      const density = Math.pow(1 - dx / r, 0.65);
      if (density * 16 > BAYER[y % 4][x % 4] + 0.5) parts.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  return { size, path: parts.join("") };
}

const R = 28;
const { size, path } = build(R);

export default function DitherMark({ cell = 3 }: { cell?: number }) {
  return (
    <svg aria-hidden width={size * cell} height={size * cell} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" className="text-ink">
      <path d={path} fill="currentColor" />
    </svg>
  );
}
