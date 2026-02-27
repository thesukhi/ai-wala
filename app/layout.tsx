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
  title: "Agent Store",
  description: "Access powerful AI agents to simplify your work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-950 text-white antialiased`}
      >
        {/* 🔥 Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-black border-b border-gray-800">
          <a href="/" className="text-xl font-bold">
            🧠 Agent Store
          </a>

          <div className="flex gap-6 text-gray-300">
            <a href="/agents" className="hover:text-white transition">
              Agents
            </a>
            <a href="/submit" className="hover:text-white transition">
              Submit
            </a>
            <a href="/admin" className="hover:text-white transition">
              Admin
            </a>
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}