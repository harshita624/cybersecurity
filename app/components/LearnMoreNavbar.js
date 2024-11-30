import Link from 'next/link';
import React from 'react';

export default function LearnMoreNavbar() {
  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              CyberSecure
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/services" className="hover:underline text-white">
              Services
            </Link>
            <Link href="/contact" className="hover:underline text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
