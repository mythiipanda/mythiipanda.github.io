import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["opsz", "wdth"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", axes: ["wdth"], display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-code", axes: ["wdth"], display: "swap" });

const url = "https://mythiipanda.github.io/dime-site/";
const title = "dime. The open-source analyst for NBA data";
const description = "Dime is your NBA analyst. It works in your projects, runs your models, and shows its work.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://mythiipanda.github.io"),
  openGraph: { title, description, url, siteName: "dime", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { colorScheme: "dark light", width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0B0C0E" }, { media: "(prefers-color-scheme: light)", color: "#FFFFFF" }] };

const themeScript = `document.documentElement.dataset.theme="light"`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}<Toaster position="bottom-center" /></body>
    </html>
  );
}
