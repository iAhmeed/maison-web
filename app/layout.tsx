import type { Metadata } from "next";
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
  title: "Maison Web",
  description: "Maison Web accompagne les entrepreneurs et entreprises dans leur transformation digitale avec des solutions sur mesure, modernes et efficaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/maisonweb.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}
      >
        {/* Dynamic animated gradient background */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#10141a] via-[#181e29] to-[#232a3a] animate-gradientBlur" />
          {/* Add animated blurred circles for depth */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[var(--accent)] opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-700 opacity-10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink-600 opacity-10 rounded-full blur-2xl animate-pulse" />
        </div>
        {children}
      </body>
    </html>
  );
}
