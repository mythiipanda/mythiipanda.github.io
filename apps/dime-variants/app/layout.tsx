import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["opsz", "wdth"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", axes: ["wdth"], display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-code", axes: ["wdth"], display: "swap" });

export const metadata: Metadata = {
  title: "dime. The open-source analyst for NBA data",
  description: "Ask in plain English. dime writes the SQL, builds the chart and saves the notebook to your own git repo.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { colorScheme: "dark light", width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0B0C0E" }, { media: "(prefers-color-scheme: light)", color: "#FFFFFF" }] };

const themeScript = `if(/\/c\/?$/.test(location.pathname)){document.documentElement.dataset.theme="light"}else try{var t=localStorage.getItem("dime-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}<Toaster position="bottom-center" /></body>
    </html>
  );
}
