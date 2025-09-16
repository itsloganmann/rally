import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rally – Campus brand–student matching",
  description:
    "Rally connects college students and campus micro‑influencers with brands through a smart two‑sided marketplace using AI-powered resume parsing and a vector DB for semantic matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Navigation */}
        <nav className="fixed top-0 w-full z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">R</span>
                </div>
                <Link href="/" className="text-xl font-semibold">Rally</Link>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
                <Link href="/platform" className="hover:text-cyan-400 transition-colors">Platform</Link>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/auth" className="hover:text-cyan-400 transition-colors">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Offset for fixed nav */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
