import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const redHatDisplay = Red_Hat_Display({ 
  subsets: ["latin"],
  variable: '--font-red-hat'
});

export const metadata: Metadata = {
  title: "What can I do for Rocky Linux?",
  description: "Find out how you can contribute to Rocky Linux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${redHatDisplay.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
