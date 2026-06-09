import type { Metadata } from "next";
import { Fraunces, Hind_Siliguri, Noto_Serif_Bengali, Schibsted_Grotesk, Tiro_Bangla } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["600", "700"],
  display: "swap"
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const tiro = Tiro_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-body",
  weight: "400",
  display: "swap"
});

const notoSerif = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-head",
  weight: ["600", "700"],
  display: "swap"
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-lat",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "ekNojor",
  description: "এক নজরে সব খবর"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${fraunces.variable} ${hind.variable} ${tiro.variable} ${notoSerif.variable} ${grotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
