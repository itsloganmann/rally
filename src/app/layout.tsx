import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rally Waitlist | Coming Soon",
  description: "Join the Rally waitlist to get early access to the AI-powered campus brand-student matching platform. Connect college students and micro-influencers with brands through smart semantic matching.",
  keywords: "campus marketing, influencer matching, student brands, college marketing, AI matching",
  authors: [{ name: "Rally" }],
  robots: "index, follow",
  openGraph: {
    title: "Rally Waitlist | Coming Soon",
    description: "Join the Rally waitlist to get early access to the AI-powered campus brand-student matching platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
