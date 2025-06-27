import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIM - AI Prompt Library, Consulting, and Learning",
  description: "AIM offers an AI prompt library for any task, AI consulting and solutions, and AI teaching, courses, and learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* AIM Navbar - common to all pages */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
                  AIM
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <Link href="/" className="nav-link text-[var(--foreground)]">About</Link>
                  <Link href="/#services" className="nav-link text-[var(--foreground)]">Services</Link>
                  <Link href="/#contact" className="nav-link text-[var(--foreground)]">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Spacer for fixed navbar */}
        <div className="h-16" />
        {/* Main content */}
        {children}
        {/* AIM Footer - common to all pages */}
        <footer className="w-full py-8 bg-[var(--secondary)] mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--foreground)]/60">
              &copy; {new Date().getFullYear()} AIM. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
