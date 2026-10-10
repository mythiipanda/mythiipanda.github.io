import type { Metadata } from "next";

const url = "https://mythiipanda.github.io/dime-site/c/";
const title = "dime. The open-source analyst for NBA data";
const description = "Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mythiipanda.github.io"),
  title,
  description,
  openGraph: { title, description, url, siteName: "dime", type: "website"},
  twitter: { card: "summary_large_image", title, description },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
