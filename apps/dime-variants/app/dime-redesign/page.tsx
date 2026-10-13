import type { Metadata } from "next";
import { Redesign } from "./Redesign";

export const metadata: Metadata = { title: "dime redesign preview", robots: { index: false, follow: false } };

export default function Page() {
  return <Redesign />;
}
