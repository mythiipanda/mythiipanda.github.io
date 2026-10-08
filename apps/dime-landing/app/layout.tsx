import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Dime",
  description: "Ask NBA questions. Get answers with the data underneath.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { colorScheme: "light dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
