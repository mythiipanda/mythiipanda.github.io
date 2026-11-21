import type { Metadata, Viewport } from "next";
import { EB_Garamond, Instrument_Sans, Instrument_Serif, Inter, Martian_Mono, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif-face", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", axes: ["wdth"], display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-code", axes: ["wdth"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-garamond", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-news", display: "swap" });

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

export const viewport: Viewport = { colorScheme: "light", width: "device-width", initialScale: 1, themeColor: "#f7f4ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${inter.variable} ${grotesk.variable} ${garamond.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
