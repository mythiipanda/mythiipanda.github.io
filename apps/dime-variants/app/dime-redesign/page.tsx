import type { Metadata } from "next";
import { Redesign } from "./Redesign";

export const metadata: Metadata = { title: "dime redesign preview", description: "Dime is your NBA analyst. It works in your notebooks, runs your models, and shows its work.", openGraph: { description: "Dime is your NBA analyst. It works in your notebooks, runs your models, and shows its work." }, twitter: { description: "Dime is your NBA analyst. It works in your notebooks, runs your models, and shows its work." }, robots: { index: false, follow: false } };

export default function Page() {
  return <Redesign />;
}
