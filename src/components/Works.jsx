"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { concepts, projects } from "@/data/content";
import { R } from "./About";

gsap.registerPlugin(ScrollTrigger);

const chartHeights = [40, 65, 50, 85, 60, 95, 72];
const previewThemes = {
  finance: {
    mark: "NORTHSTAR / PERSONAL FINANCE",
    heading: "A clearer view of your money.",
    metric: "$12,480.50",
    note: "TOTAL BALANCE",
    accent: "#73e3b0",
    glow: "rgba(44, 176, 126, .2)",
  },
  journal: {
    mark: "FIELDNOTE / YOUR LIBRARY",
    heading: "Make a little room to read.",
    metric: "The creative mind",
    note: "PICK UP WHERE YOU LEFT OFF",
    accent: "#efb887",
    glow: "rgba(209, 139, 94, .2)",
  },
  dispatch: {
    mark: "WAYFINDER / LIVE OPERATIONS",
    heading: "Routes are looking good.",
    metric: "24 active shipments",
    note: "TODAY AT A GLANCE",
    accent: "#86caff",
    glow: "rgba(61, 155, 231, .2)",
  },
  studio: {
    mark: "FORMA OBJECTS / STUDIO",
    heading: "Spaces for living well.",
    metric: "Objects with intention",
    note: "A STUDY IN MATERIAL & LIGHT",
    accent: "#e2c9a9",
    glow: "rgba(213, 183, 145, .2)",
  },
  market: {
    mark: "GOODFOLK / NEW SEASON",
    heading: "Small things, made well.",
    metric: "Curated for everyday",
    note: "A FEW CUSTOMER FAVOURITES",
    accent: "#f2a18a",
    glow: "rgba(236, 122, 97, .2)",
  },
  workspace: {
    mark: "LUMEN / WORKSPACE",
    heading: "What would you like to make?",
    metric: "Your ideas, in one place",
    note: "A QUIETER WAY TO GET STARTED",
    accent: "#c9a7ff",
    glow: "rgba(158, 106, 238, .2)",
  },
};

function ConceptScreen({ concept }) {
  const theme = previewThemes[concept.theme];
  const rows = ["A fresh place to start", "A few things to explore", "Your saved collection"];

  return (
    <div
      className="relative h-full overflow-hidden p-4 sm:p-6 lg:p-8"
      style={{
        background: `radial-gradient(circle at 78% 18%, ${theme.glow}, transparent 34%), linear-gradient(135deg, #17201b, #090c0a 70%)`,
      }}
    >
      <div className="relative flex h-full flex-col border border-white/10 bg-[#f1f0eb] p-4 text-[#1c221f] shadow-[0_25px_80px_rgba(0,0,0,.38)] sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent }} />
            <span className="text-[8px] font-semibold uppercase tracking-[.15em] sm:text-[10px]">
              {concept.name}
            </span>
          </div>
          <span className="lbl !text-[7px] !tracking-[.12em] !text-black/45 sm:!text-[9px]">
            CONCEPT SCREEN
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] gap-3 pt-4 sm:gap-6 sm:pt-6">
          <div className="flex min-h-0 flex-col">
            <span className="text-[7px] uppercase tracking-[.12em] text-black/40 sm:text-[9px]">
              {theme.mark}
            </span>
            <p className="mt-3 line-clamp-2 max-w-sm font-display text-lg leading-tight sm:mt-5 sm:text-2xl lg:text-4xl">
              {theme.heading}
            </p>
            <div className="mt-4 border border-black/[.08] bg-white/70 p-3 sm:mt-7 sm:p-4">
              <p className="text-[7px] uppercase tracking-[.12em] text-black/40 sm:text-[8px]">
                {theme.note}
              </p>
              <p className="mt-1 truncate font-display text-sm sm:text-xl">{theme.metric}</p>
              <div className="mt-3 flex h-10 items-end gap-1.5 sm:h-16">
                {chartHeights.map((height, index) => (
                  <span
                    key={index}
                    className="preview-bar flex-1 rounded-t-sm opacity-80"
                    style={{ height: `${height}%`, backgroundColor: theme.accent }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-col gap-2 sm:gap-3">
            <div className="flex flex-1 flex-col justify-between border border-black/[.08] bg-white/65 p-2.5 sm:p-4">
              {rows.map((row, index) => (
                <div key={row} className="flex items-center gap-2 border-b border-black/[.07] pb-2 last:border-0 last:pb-0 sm:gap-3 sm:pb-3">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[7px]"
                    style={{ backgroundColor: `${theme.accent}55` }}
                  >
                    0{index + 1}
                  </span>
                  <span className="line-clamp-1 text-[7px] text-black/65 sm:text-[9px]">{row}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 border border-black/[.08] bg-white/65 p-2.5 sm:p-4">
              <span className="text-[7px] uppercase tracking-[.1em] text-black/45 sm:text-[8px]">This week</span>
              <span className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: theme.accent }} />
            </div>
          </div>
        </div>

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 border border-white/20 bg-black/70 px-2.5 py-1.5 text-[8px] uppercase tracking-[.14em] text-white/80 sm:bottom-4 sm:left-4">
          <Sparkles size={10} aria-hidden="true" /> Self-initiated concept
        </span>
      </div>
    </div>
  );
}

function Panel({ project, total, concept = false }) {
  const tilt = useRef(null);

  const movePreview = (event) => {
    if (!tilt.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = tilt.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(tilt.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.65,
      ease: "power3.out",
    });
  };

  const resetPreview = () => {
    if (!tilt.current) return;
    gsap.to(tilt.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: "expo.out",
    });
  };

  const projectNumber = project.n.padStart(2, "0");

  return (
    <div className="panel lg:sticky lg:top-0 lg:h-screen">
      <article className="inner group grid grid-cols-1 items-center gap-9 border-t border-white/10 bg-ink px-[6vw] py-14 lg:h-full lg:grid-cols-12 lg:gap-10 lg:py-0">
        <div className="lg:col-span-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 lbl">
            <span>{projectNumber} / {String(total).padStart(2, "0")}</span>
            <span className={concept ? "text-acc" : "text-white/45"}>
              {concept ? "Self-initiated · concept study" : "Portfolio project"}
            </span>
          </div>
          <div className="h-display translate-x-0 text-[clamp(5.5rem,15vw,13rem)] leading-none text-transparent transition-all duration-700 [-webkit-text-stroke:1px_rgba(245,245,245,.22)] group-hover:translate-x-3 group-hover:[-webkit-text-stroke-color:#00FF85]">
            {projectNumber}
          </div>
          <h3 className="h-display mt-2 text-[clamp(1.75rem,4vw,3.6rem)] leading-none">
            {project.name}
          </h3>
          {concept && (
            <p className="lbl mt-3 text-[9px] text-acc">Concept preview · not a client project</p>
          )}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-dim sm:text-base">
            {project.desc}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
            {project.stack.map((technology) => (
              <li key={technology} className="lbl border border-[#333] px-3 py-1.5 !text-[8px] !tracking-[.12em] text-white/75">
                {technology}
              </li>
            ))}
          </ul>
          {project.live && (
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 lbl">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-8 items-center gap-2 text-white transition-colors hover:text-acc"
                aria-label={`Visit ${project.name}`}
              >
                Visit project <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>

        <div
          className="lg:col-span-7"
          style={{ perspective: 1200 }}
          data-cursor="project"
          onMouseMove={movePreview}
          onMouseLeave={resetPreview}
        >
          <div ref={tilt} style={{ transformStyle: "preserve-3d" }}>
            <div className="mock relative aspect-[4/3] max-h-[68vh] w-full overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_40px_120px_-40px_rgba(0,255,133,.18)] transition-transform duration-[900ms] ease-out group-hover:scale-[1.015]">
              <div className="relative z-10 flex items-center gap-1.5 border-b border-white/10 bg-[#0a0a0a] px-4 py-3">
                <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <i className="h-1.5 w-1.5 rounded-full bg-acc" />
                <span className="lbl ml-3 truncate !text-[9px] normal-case tracking-wider text-white/50">
                  {concept ? "concept-study" : "project-preview"} / {project.name}
                </span>
              </div>
              <div className="relative h-[calc(100%-41px)] overflow-hidden">
                {concept ? (
                  <ConceptScreen concept={project} />
                ) : (
                  <Image
                    src={project.image}
                    alt={`${project.name} original portfolio screenshot`}
                    fill
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="object-cover object-top"
                  />
                )}
              </div>
              <div className="absolute bottom-0 left-0 z-20 h-px w-0 bg-acc transition-all duration-1000 group-hover:w-full" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function PanelGroup({ items, concept = false }) {
  const root = useRef(null);

  useEffect(() => {
    const section = root.current;
    if (!section || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = matchMedia("(min-width: 1024px)").matches;
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");

      panels.forEach((panel, index) => {
        const preview = panel.querySelector(".mock");
        const bars = Array.from(panel.querySelectorAll(".preview-bar"));
        gsap.set(preview, { clipPath: "inset(100% 0 0 0)" });
        if (bars.length) gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });

        ScrollTrigger.create({
          trigger: panel,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(preview, {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.3,
              ease: "expo.out",
            });
            if (bars.length) {
              gsap.to(bars, {
                scaleY: 1,
                duration: 1,
                ease: "expo.out",
                stagger: 0.06,
                delay: 0.35,
              });
            }
          },
        });

        if (desktop && index < panels.length - 1) {
          gsap.to(panel.querySelector(".inner"), {
            scale: 0.94,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: panels[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, root);

    return () => context.revert();
  }, [items]);

  return (
    <div ref={root} className={concept ? "concept-panels" : "project-panels"}>
      {items.map((project, index) => (
        <Panel
          key={`${project.n}-${project.name}`}
          project={project}
          total={items.length}
          concept={concept}
        />
      ))}
    </div>
  );
}

export default function Works() {
  return (
    <section id="works" className="overflow-x-clip" aria-labelledby="works-title">
      <div className="sec !pb-16 lg:!pb-24">
        <div className="mb-6 flex flex-wrap justify-between gap-4 lbl">
          <R>Selected work</R>
          <R>(09) Portfolio projects</R>
        </div>
        <R>
          <h2 id="works-title" className="h-display text-[clamp(3rem,10vw,8rem)]">
            Selected works
          </h2>
        </R>
      </div>

      <PanelGroup items={projects} />

      <div className="sec !pb-12 !pt-24 lg:!pb-16 lg:!pt-36">
        <div className="mb-6 flex flex-wrap justify-between gap-4 lbl">
          <R>The interface lab</R>
          <R>(06) Self-initiated studies</R>
        </div>
        <R>
          <h3 className="h-display text-[clamp(2.5rem,8vw,6.5rem)]">
            Concept studies
          </h3>
        </R>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-dim">
          These are clearly labeled interface explorations, not client engagements or completed products.
        </p>
      </div>

      <PanelGroup items={concepts} concept />
    </section>
  );
}
