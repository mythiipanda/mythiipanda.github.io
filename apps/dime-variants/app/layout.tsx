import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-inter", axes: ["opsz"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const url = "https://mythiipanda.github.io/dime-site/";
const title = "Dime: the NBA analyst that shows its work";
const description =
  "Ask a basketball question in plain English. Dime writes the SQL, runs it on its own warehouse, and gives you the answer with the rows it came from. Open source.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://mythiipanda.github.io"),
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Dime", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { colorScheme: "light", width: "device-width", initialScale: 1, themeColor: "#fbfbfc" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
