"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Layers3, Wrench } from "lucide-react";
import { skills } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    number: "01",
    title: "Frontend",
    label: "INTERFACES",
    description: "Responsive web experiences with a focus on clarity and usability.",
    Icon: Code2,
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    accent: "from-emerald-300/20",
  },
  {
    number: "02",
    title: "Backend & APIs",
    label: "APPLICATIONS",
    description: "Application logic, data layers and real-time communication.",
    Icon: Database,
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.IO"],
    accent: "from-cyan-300/15",
  },
  {
    number: "03",
    title: "Content & delivery",
    label: "JAMSTACK · CMS",
    description: "Flexible publishing workflows and modern delivery foundations.",
    Icon: Layers3,
    skills: ["WordPress", "Sanity CMS", "Jamstack", "Firebase"],
    accent: "from-lime-300/15",
  },
  {
    number: "04",
    title: "Tools & exploration",
    label: "WORKFLOW · AI",
    description: "Development tools and emerging technologies used for learning and prototyping.",
    Icon: Wrench,
    skills: ["Git & GitHub", "GitHub Copilot", "Cursor AI", "OpenAI API", "Python (basic)"],
    accent: "from-violet-300/15",
  },
];

export default function Skills() {
  const section = useRef(null);

  useEffect(() => {
    const root = section.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(root.querySelectorAll("[data-skill-card]"));
    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={section} id="skills" className="sec relative" aria-labelledby="skills-title">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
        <div>
          <p className="lbl mb-6 flex items-center gap-3 text-acc">
            <span className="h-px w-10 bg-acc" />
            The toolkit
          </p>
          <h2 id="skills-title" className="h-display text-[clamp(3.5rem,10vw,8.5rem)]">
            Made to <span className="text-white/35">make.</span>
          </h2>
        </div>
        <div className="flex max-w-sm items-end justify-between gap-8 lg:pb-2">
          <p className="text-sm leading-relaxed text-dim">
            A practical toolkit for building interfaces, application features and content-led websites.
          </p>
          <div className="shrink-0 border-l border-white/15 pl-4">
            <span className="h-display block text-3xl text-acc">
              {String(skills.length).padStart(2, "0")}
            </span>
            <span className="lbl text-[9px] text-white/40">SKILLS</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {disciplines.map(({ number, title, label, description, Icon, skills: names, accent }) => {
          const includedSkills = names.filter((name) => skills.includes(name));

          return (
            <article
              key={number}
              data-skill-card
              className={`group relative flex min-h-[310px] flex-col overflow-hidden border border-white/10 bg-gradient-to-br ${accent} via-transparent to-transparent p-6 transition-all duration-500 hover:-translate-y-1 hover:border-acc/40 hover:bg-white/[.035] sm:p-7`}
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-acc/[.07] blur-3xl transition-all duration-700 group-hover:bg-acc/[.15]" />
              <div className="relative flex items-start justify-between">
                <span className="lbl text-white/35">{number} / 04</span>
                <span className="flex h-11 w-11 items-center justify-center border border-white/10 bg-black/20 text-acc transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-acc/40 group-hover:bg-acc/[.08]">
                  <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
              <div className="relative mt-9">
                <p className="lbl text-[9px] text-acc/80">{label}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-3 min-h-10 text-sm leading-relaxed text-dim">{description}</p>
              </div>
              <ul className="relative mt-auto flex flex-wrap gap-2 pt-7" aria-label={`${title} skills`}>
                {includedSkills.map((name, index) => (
                  <li key={name} className="flex items-center gap-2 border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/75 transition-colors duration-300 group-hover:border-white/15 group-hover:text-white">
                    <span className="font-mono text-[9px] text-acc/60">{String(index + 1).padStart(2, "0")}</span>
                    {name}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
        <span className="h-1.5 w-1.5 rounded-full bg-acc shadow-[0_0_12px_#00ff85]" />
        <p className="lbl text-[9px] text-white/35">
          Practical experience in the stack; deeper learning is always in progress.
        </p>
      </div>
    </section>
  );
}
