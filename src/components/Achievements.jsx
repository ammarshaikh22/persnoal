"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/data/content";
import { Award, ArrowUpRight, Sparkles, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const marks = [Award, Sparkles, Zap];

export default function Achievements() {
  const section = useRef(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll("[data-achievement]"));
    const line = root.querySelector("[data-timeline-line]");
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector("[data-achievement-list]"),
            start: "top 72%",
            end: "bottom 72%",
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 38 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-achievement-list]"),
            start: "top 78%",
            once: true,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={section}
      className="sec relative overflow-x-clip"
      aria-labelledby="achievements-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-acc/[.06] blur-[110px]"
      />

      <div className="relative mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
        <div>
          <p className="lbl mb-6 flex items-center gap-3 text-acc">
            <span className="h-px w-10 bg-acc" />
            Work & study
          </p>
          <h2
            id="achievements-title"
            className="h-display text-[clamp(2.8rem,11vw,9rem)]"
          >
            Steady progress.
            <br />
            <span className="text-white/35">Built over time.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-dim md:mb-3">
          Milestones across development work, independent projects and computer science studies.
        </p>
      </div>

      <div className="relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <aside className="relative lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="relative flex aspect-square max-w-sm items-center justify-center overflow-hidden border border-white/10 bg-white/[.015]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              <div
                aria-hidden="true"
                className="absolute h-[78%] w-[78%] rounded-full border border-acc/20"
              />
              <div
                aria-hidden="true"
                className="absolute h-[58%] w-[58%] rounded-full border border-acc/30"
              />
              <div
                aria-hidden="true"
                className="absolute h-[38%] w-[38%] rounded-full border border-acc/50 shadow-[0_0_70px_rgba(0,255,133,.12)]"
              />
              <div className="relative text-center">
                <span className="h-display block text-[clamp(6rem,15vw,10rem)] leading-none text-acc">
                  {String(achievements.length).padStart(2, "0")}
                </span>
                <span className="lbl mt-3 block text-white/60">Milestones</span>
              </div>
              <div className="absolute left-[13%] top-[20%] h-2 w-2 rounded-full bg-acc shadow-[0_0_18px_#00ff85]" />
              <div className="absolute bottom-[18%] right-[16%] h-1.5 w-1.5 rounded-full bg-white/70" />
              <span className="lbl absolute left-5 top-5 text-white/35">
                A / 01—{String(achievements.length).padStart(2, "0")}
              </span>
              <span className="lbl absolute bottom-5 right-5 text-white/35">KEEP MOVING ↗</span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="lbl text-white/45">Progress, in public</span>
              <span className="lbl text-acc">
                {achievements[0]?.[0]} — {achievements[achievements.length - 1]?.[0]}
              </span>
            </div>
          </div>
        </aside>

        <div
          data-achievement-list
          className="relative lg:col-span-8 lg:pl-5"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px bg-white/10 sm:left-[27px]"
          />
          <div
            data-timeline-line
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px origin-top scale-y-0 bg-gradient-to-b from-acc via-acc/70 to-transparent sm:left-[27px]"
          />

          <ol className="relative space-y-5">
            {achievements.map(([year, title, description], index) => {
              const Mark = marks[index % marks.length];

              return (
                <li key={`${year}-${title}`} data-achievement>
                  <article className="group relative grid grid-cols-[40px_1fr] gap-5 sm:grid-cols-[56px_1fr] sm:gap-7">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-acc/50 bg-ink text-acc transition-all duration-500 group-hover:scale-110 group-hover:bg-acc group-hover:text-ink sm:h-14 sm:w-14">
                      <Mark size={19} strokeWidth={1.5} />
                    </div>

                    <div className="relative overflow-hidden border border-white/10 bg-white/[.025] p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-acc/40 group-hover:bg-white/[.045] sm:p-8">
                      <div
                        aria-hidden="true"
                        className="absolute right-0 top-0 h-24 w-24 translate-x-1/2 -translate-y-1/2 rounded-full bg-acc/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="relative flex flex-wrap items-center justify-between gap-3">
                        <span className="lbl text-acc">
                          Milestone 0{index + 1}
                        </span>
                        <span className="h-display text-4xl leading-none text-white/15 transition-colors duration-500 group-hover:text-acc/60 sm:text-5xl">
                          {year}
                        </span>
                      </div>
                      <h3 className="relative mt-5 font-display text-2xl leading-tight sm:text-3xl">
                        {title}
                      </h3>
                      <p className="relative mt-3 max-w-xl leading-relaxed text-dim">
                        {description}
                      </p>
                      <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="lbl text-white/35">Build · Learn · Ship</span>
                        <ArrowUpRight
                          size={17}
                          aria-hidden="true"
                          className="text-white/35 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acc"
                        />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
