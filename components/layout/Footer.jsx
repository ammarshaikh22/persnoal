'use client';

import Link from 'next/link';
import { NAVIGATION_LINKS, SOCIAL_LINKS } from '@/config/constants';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

const ICON_MAP = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Image src='logo.png' alt="Logo" width={110} height={110} className="-ml-8" />
            <p className="text-foreground/60 text-sm">
              Full-stack developer crafting digital experiences
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Performance Optimization
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Backend Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    title={link.name}
                  >
                    {Icon && <Icon size={20} />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            &copy; {currentYear} Alex Developer. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm text-foreground/50">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
