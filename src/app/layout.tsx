import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus360 | The Smart Campus Assistant",
  description: "Your entire campus. One smart place. The Smart Campus Assistant that helps every student find, know, and get there faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-brand-blue/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
