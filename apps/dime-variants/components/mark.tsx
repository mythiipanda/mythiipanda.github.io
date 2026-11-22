export function DimeMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="296 204 428 552" preserveAspectRatio="xMaxYMid meet" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="dime-bowl">
          <circle cx="478" cy="573" r="176" />
        </clipPath>
      </defs>
      <path fill="#2458F5" d="M577 300 L718 210 L718 748 L577 748 Z" />
      <path fill="#2458F5" fillRule="evenodd" d="M478 397 a176 176 0 1 0 0 352 a176 176 0 1 0 0 -352 Z M478 467 a106 106 0 1 1 0 212 a106 106 0 1 1 0 -212 Z" />
      <g stroke="#2458F5" strokeWidth="16" fill="none" clipPath="url(#dime-bowl)">
        <path d="M495 565 C505 495 510 445 522 398" />
        <path d="M495 565 C435 555 372 545 312 560" />
        <path d="M495 565 C528 548 562 525 592 488" />
        <path d="M495 565 C548 590 575 620 605 700" />
        <path d="M495 565 C478 645 462 705 452 748" />
      </g>
    </svg>
  );
}

export function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
