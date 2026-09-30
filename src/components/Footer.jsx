"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Selected work", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
];

const contactLinks = [
  { label: "GitHub", href: profile.github, Icon: Github, external: true },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "Phone", href: `tel:${profile.phone}`, Icon: Phone },
];

export default function Footer() {
  const footer = useRef(null);

  useEffect(() => {
    const root = footer.current;
    if (!root) return;

    const pieces = Array.from(root.querySelectorAll("[data-footer-reveal]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(pieces, { autoAlpha: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        pieces,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <footer
      id="site-footer"
      ref={footer}
      aria-label="Site footer"
      className="relative mt-10 overflow-x-clip border-t border-white/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-acc/[.06] blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-[6vw]">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-24">
          <div data-footer-reveal className="lg:col-span-9">
            <p className="lbl mb-6 flex items-center gap-3 text-acc">
              <span className="h-px w-8 bg-acc" />
              Have something in mind?
            </p>
            <h2 className="h-display max-w-5xl text-[clamp(2.8rem,8.5vw,7.5rem)]">
              Let&apos;s make
              <br />
              <span className="text-white/35">it happen.</span>
            </h2>
            <a
              href="#contact"
              className="group mt-9 inline-flex min-h-12 items-center gap-4 border-b border-acc/40 pb-3 text-sm uppercase tracking-[.16em] text-white transition-colors duration-300 hover:text-acc"
            >
              Start a conversation
              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div data-footer-reveal className="group flex items-center gap-5 lg:col-span-3 lg:justify-end">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-acc/25 bg-acc/[.04] sm:h-28 sm:w-28">
              <div
                aria-hidden="true"
                className="absolute inset-2 rounded-full border border-dashed border-white/15 transition-transform duration-[1200ms] group-hover:rotate-180"
              />
              <span className="h-display text-2xl text-acc sm:text-3xl">MA.</span>
              <span className="absolute right-2 top-4 h-2 w-2 rounded-full bg-acc shadow-[0_0_14px_#00ff85]" />
            </div>
            <div className="lg:hidden">
              <p className="font-display text-lg">Muhammad Ammar</p>
              <p className="lbl mt-1 text-[9px] text-white/40">{profile.location}</p>
            </div>
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-acc hover:bg-acc hover:text-ink lg:hidden"
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 border-t border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-10">
          <div data-footer-reveal className="lg:col-span-3">
            <a
              href="#top"
              className="font-display text-lg font-semibold tracking-tight"
            >
              {profile.name}<span className="text-acc">.</span>
            </a>
            <p className="mt-2 text-sm text-white/45">
              Full-stack &amp; Jamstack developer · {profile.location}
            </p>
          </div>

          <nav
            data-footer-reveal
            aria-label="Footer navigation"
            className="lg:col-span-2"
          >
            <p className="lbl mb-4 text-[9px] text-white/35">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/65 transition-colors duration-300 hover:text-acc"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav data-footer-reveal aria-label="Connect" className="lg:col-span-4">
            <p className="lbl mb-4 text-[9px] text-white/35">Connect</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {contactLinks.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="inline-flex min-h-8 items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-acc"
                    aria-label={label === "Email" ? `Email ${profile.name}` : label === "Phone" ? `Call ${profile.name}` : `${label} profile`}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-reveal className="flex flex-col justify-between gap-4 lg:col-span-3 lg:items-end">
            <span className="inline-flex items-center gap-2 lbl text-[9px] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-acc shadow-[0_0_10px_#00ff85]" />
              Independent developer
            </span>
            <span className="lbl text-[9px] text-white/35">
              © {new Date().getFullYear()} {profile.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
