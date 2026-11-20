import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif, Martian_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["opsz", "wdth"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", axes: ["wdth"], display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-code", axes: ["wdth"], display: "swap" });

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
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
