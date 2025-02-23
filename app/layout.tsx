import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import en from "@/translations/en";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const redHatDisplay = Red_Hat_Display({ 
  subsets: ["latin"],
  variable: '--font-red-hat'
});

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${redHatDisplay.variable}`}>
      <body className="font-inter">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
