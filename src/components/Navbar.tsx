"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          XIE Council
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700">
          <Link href="/events" className="hover:text-blue-600">
            Events
          </Link>
          <Link href="/gallery" className="hover:text-blue-600">
            Gallery
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
