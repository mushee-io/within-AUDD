import "./globals.css";
import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Mushee — Heaven",
  description: "AUD settlement, reimagined. A heavenly AUDD demo by Mushee (UK).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-[var(--font-inter)]">{children}</body>
    </html>
  );
}
