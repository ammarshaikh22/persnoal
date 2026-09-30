"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "About", id: "about" },
  { label: "Works", id: "works" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const shell = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion && shell.current) {
      const context = gsap.context(() => {
        gsap.fromTo(
          shell.current,
          { y: -28, autoAlpha: 0, scale: 0.98 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            delay: 0.15,
            ease: "expo.out",
            clearProps: "transform",
          },
        );
      }, shell);

      return () => context.revert();
    }
  }, []);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );

    updateScroll();
    updateTime();
    window.addEventListener("scroll", updateScroll, { passive: true });
    const clock = window.setInterval(updateTime, 30_000);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.7] },
    );

    links.forEach(({ id }) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.clearInterval(clock);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const navigate = (event, id) => {
    setMenuOpen(false);
    if (window.__lenis) {
      event.preventDefault();
      window.__lenis.scrollTo(`#${id}`, { duration: 1.35, offset: -24 });
    }
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-5 sm:px-6">
      <div className="relative mx-auto w-full max-w-6xl" ref={shell}>
        <div
          className={`relative flex items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 ${
            scrolled
              ? "border-white/15 bg-[#070a08]/90 shadow-[0_16px_60px_rgba(0,0,0,.45)]"
              : "border-white/10 bg-black/45 shadow-[0_10px_45px_rgba(0,0,0,.22)]"
          } backdrop-blur-2xl`}
        >
          <a
            href="#top"
            aria-label="Muhammad Ammar Shaikh, home"
            className="group flex min-w-0 items-center gap-2.5 rounded-full"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-acc/40 bg-acc/[.08] font-display text-xs font-semibold text-acc transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-acc group-hover:text-ink">
              MA
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#080a08] bg-acc shadow-[0_0_12px_#00ff85]" />
            </span>
            <span className="truncate font-display text-sm font-semibold tracking-tight sm:text-base">
              Muhammad Ammar Shaikh<span className="text-acc">.</span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/[.06] bg-white/[.025] p-1">
              {links.map(({ label, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => navigate(event, id)}
                    aria-current={active === id ? "location" : undefined}
                    className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] tracking-[.16em] transition-colors duration-300 ${
                      active === id
                        ? "text-acc"
                        : "text-white/65 hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-acc transition-all duration-300 ${
                        active === id
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 pl-2 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acc opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acc" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-[.12em] text-white/75">
                Freelance developer
              </p>
              <p className="mt-1 text-[9px] tracking-[.16em] text-white/35">
                MIRPURKHAS · PKT {time}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-white transition-all duration-300 hover:border-acc/50 hover:bg-acc/[.08] hover:text-acc md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={`absolute left-0 right-0 top-[calc(100%+0.65rem)] origin-top rounded-[1.65rem] border border-white/10 bg-[#080b09]/95 p-3 shadow-[0_20px_70px_rgba(0,0,0,.55)] backdrop-blur-2xl transition-all duration-300 md:hidden ${
            menuOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-[.98] opacity-0"
          }`}
        >
          <ul className="grid gap-1">
            {links.map(({ label, id }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => navigate(event, id)}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={active === id ? "location" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors ${
                    active === id
                      ? "bg-acc/[.08] text-acc"
                      : "text-white/75 hover:bg-white/[.05] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="lbl text-[9px] text-white/30">0{index + 1}</span>
                    <span className="font-display text-lg">{label}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-white/30" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-white/10 px-4 pt-4 pb-1">
            <span className="lbl text-white/45">Independent developer</span>
            <span className="lbl text-acc">PKT {time}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
