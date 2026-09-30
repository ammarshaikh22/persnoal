"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin } from "lucide-react";
import { education, experience, profile } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export const R = ({ children, className = "", as: T = "div", id }) => (
  <T
    id={id}
    data-r
    className={`will-change-transform ${className}`}
  >
    {children}
  </T>
);

const facts = [
  ["Focus", "Full-stack & Jamstack development"],
  ["Current", "Independent project work · 2026—Present"],
  ["Education", "BS Computer Science · 2026—Present"],
  ["Location", profile.location],
];

const introduction =
  "I build responsive web products with React, Next.js and Node.js — from polished interfaces to API-connected apps and CMS-backed websites.";

export default function About() {
  const section = useRef(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    const words = Array.from(root.querySelectorAll("[data-about-word]"));
    const entries = Array.from(root.querySelectorAll("[data-experience-entry]"));
    const line = root.querySelector("[data-experience-line]");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { autoAlpha: 1 });
      gsap.set(entries, { autoAlpha: 1, y: 0 });
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        words,
        { autoAlpha: 0.45 },
        {
          autoAlpha: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector("[data-about-intro]"),
            start: "top 82%",
            end: "bottom 58%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector("[data-experience-list]"),
            start: "top 78%",
            end: "bottom 70%",
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        entries,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-experience-list]"),
            start: "top 82%",
            once: true,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  const words = introduction.split(" ");

  return (
    <section
      id="about"
      ref={section}
      className="sec relative overflow-x-clip"
      aria-labelledby="about-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 h-96 w-96 rounded-full bg-acc/[.04] blur-[110px]"
      />

      <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <R className="lbl flex items-center gap-3 text-acc">
            <span className="h-px w-8 bg-acc" />
            01 / About
          </R>
          <R className="mt-6 hidden max-w-[15rem] text-sm leading-relaxed text-dim lg:block">
            Thoughtful engineering for products that need to feel as good as
            they work.
          </R>
          <div className="mt-12 hidden items-center gap-3 border-t border-white/10 pt-5 lg:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-acc">
              <MapPin size={15} />
            </span>
            <div>
              <p className="lbl text-[9px] text-white/40">Based in</p>
            <p className="mt-1 text-sm text-white/75">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <R>
            <h2
              id="about-title"
              className="h-display max-w-5xl text-[clamp(3rem,8.5vw,7.5rem)]"
            >
              Ideas into
              <br />
              <span className="text-white/35">working products.</span>
            </h2>
          </R>

          <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
            <p
              data-about-intro
              aria-label={introduction}
              className="max-w-3xl text-[clamp(1.35rem,2.5vw,2.25rem)] leading-tight md:col-span-8"
            >
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  data-about-word
                  aria-hidden="true"
                  className="mr-[.22em] inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            <R className="border-l border-acc/40 pl-5 md:col-span-4 md:self-end">
              <p className="lbl mb-3 text-[9px] text-acc">How I think</p>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                Performance first. Motion with purpose. AI where it makes the
                product more useful.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-white/40">
                Learn by shipping <ArrowUpRight size={14} />
              </span>
            </R>
          </div>
        </div>
      </div>

      <div className="relative mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {facts.map(([label, value], index) => (
          <R
            key={label}
            className="group min-h-32 bg-[#080a08] p-5 transition-colors duration-500 hover:bg-[#0b120d] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="lbl text-[9px] text-white/40">{label}</span>
              <span className="font-mono text-[10px] text-acc/50">
                0{index + 1}
              </span>
            </div>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-white/85">
              {value}
            </p>
          </R>
        ))}
      </div>

      <div className="relative mt-24 lg:mt-32">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <R className="lbl mb-4 text-acc">The path so far</R>
            <R as="h3" className="h-display text-[clamp(2.5rem,6vw,5rem)]">
              Experience
            </R>
          </div>
          <R className="lbl text-white/40">Roles & practice · 2023—Present</R>
        </div>

        <div data-experience-list className="relative">
          <div
            data-experience-line
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px origin-top scale-y-0 bg-gradient-to-b from-acc/80 to-transparent sm:left-[27px]"
          />
          <ol className="relative space-y-3">
            {experience.map(([period, role, company, description], index) => {
              const current = period.toLowerCase().includes("present");

              return (
                <li key={`${period}-${role}`} data-experience-entry>
                  <article className="group relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[56px_1fr] sm:gap-7">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink font-mono text-[10px] text-white/55 transition-all duration-500 group-hover:border-acc group-hover:bg-acc group-hover:text-ink sm:h-14 sm:w-14">
                      0{index + 1}
                    </div>

                    <div className="grid gap-5 border border-white/10 bg-white/[.02] p-5 transition-all duration-500 group-hover:border-acc/35 group-hover:bg-white/[.04] md:grid-cols-12 md:items-center md:p-7">
                      <div className="flex items-center gap-3 md:col-span-2 md:block">
                        <span className="lbl text-[10px] text-acc">{period}</span>
                        {current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-acc/25 bg-acc/[.07] px-2 py-1 text-[8px] uppercase tracking-[.14em] text-acc md:mt-3">
                            <span className="h-1 w-1 rounded-full bg-acc" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="md:col-span-4">
                        <h4 className="font-display text-xl leading-tight sm:text-2xl">
                          {role}
                        </h4>
                        <p className="mt-2 text-sm text-white/45">{company}</p>
                      </div>
                      <p className="text-sm leading-relaxed text-dim md:col-span-6">
                        {description}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div id="education" className="mt-24 lg:mt-32" aria-labelledby="education-title">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <R className="lbl mb-4 text-acc">Learning alongside the work</R>
            <R id="education-title" as="h3" className="h-display text-[clamp(2.5rem,6vw,5rem)]">
              Education
            </R>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-dim">
            Building a computer science foundation while continuing to practise modern web development.
          </p>
        </div>
        <ol className="grid gap-3 md:grid-cols-2">
          {education.map(([period, qualification, institution], index) => (
            <li key={`${period}-${qualification}`}>
              <article className="group h-full border border-white/10 bg-white/[.02] p-5 transition-colors duration-300 hover:border-acc/35 hover:bg-white/[.04] sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="lbl text-[9px] text-acc">{period}</span>
                  <span className="font-mono text-[10px] text-white/30">0{index + 1}</span>
                </div>
                <h4 className="mt-8 font-display text-xl leading-tight sm:text-2xl">
                  {qualification}
                </h4>
                <p className="mt-3 text-sm text-white/50">{institution}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
