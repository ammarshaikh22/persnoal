'use client';

import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/config/constants';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
          >
            <Image src='logo.png' alt="Logo" width={110} height={110} />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact">
            <button className="px-4 py-2 rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
              Get In Touch
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
              Get In Touch
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
