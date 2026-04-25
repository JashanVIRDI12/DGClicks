import { Outfit, Inter } from "next/font/google";
import SiteWrapper from "@/components/SiteWrapper";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agentic | Lead Gen & Digital Marketing",
  description: "We empower our clients' vision with disruptive innovation and cutting-edge products.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  );
}
