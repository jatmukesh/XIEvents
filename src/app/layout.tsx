"use client"; // this layout will be a client component so we can use usePathname()

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Define all routes where navbar should NOT appear
  const hiddenNavbarRoutes = ["/admin"];

  // ✅ Check if current path starts with any of those
  const hideNavbar = hiddenNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Conditionally render Navbar */}
        {!hideNavbar && <Navbar />}

        {/* Add top padding if navbar exists */}
        <div className={!hideNavbar ? "pt-16" : ""}>{children}</div>
      </body>
    </html>
  );
}
