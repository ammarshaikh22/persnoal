"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});
const split = (w) =>
  w.split("").map((c, i) => (
    <span key={i} className="ch inline-block will-change-transform">
      {c}
    </span>
  ));
export default function Hero() {
  const root = useRef();
  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".ch", { yPercent: 0 });
        gsap.set(".hl, .hf", { opacity: 1, y: 0 });
        gsap.set(".sc", { opacity: 1, scale: 1 });
        return;
      }
      gsap.set(".ch", { yPercent: 110 });
      gsap.set(".hf", { opacity: 0, y: 20 });
      gsap.set(".sc", { opacity: 0, scale: 0.85 });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".hl", { opacity: 1, y: 0, duration: 0.8 })
        .to(".ch", { yPercent: 0, duration: 1.2, stagger: 0.05 }, "-=.4")
        .to(".hf", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=.7")
        .to(".sc", { opacity: 1, scale: 1, duration: 1.6 }, "-=1.1");
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-[105vh] px-[6vw] pt-32 pb-16 flex flex-col justify-end overflow-hidden"
    >
      <div
        className="sc absolute inset-y-0 right-0 w-full lg:w-[62%] z-0"
        aria-hidden="true"
      >
        <Scene3D />
      </div>
      <div className="relative z-10 pointer-events-none">
        <p className="hl lbl mb-8 opacity-0">
          Full-Stack Developer — Jamstack / React / Next.js
        </p>
        <h1 className="h-display text-[clamp(3rem,13vw,9.5rem)]">
          <span className="clip">{split("MUHAMMAD")}</span>
          <span className="clip">
            {split("AMMAR")}
            <span className="text-acc">.</span>
          </span>
        </h1>
        <div className="hf mt-10 flex flex-col md:flex-row md:items-end gap-8 justify-between">
          <p className="max-w-md text-lg text-dim">
            I build responsive web products with React, Next.js and Node.js —
            from polished interfaces to connected APIs and CMS-backed platforms.
            Based in Mirpurkhas, Pakistan.
          </p>
          <div className="pointer-events-auto">
            <MagneticButton
              onClick={() =>
                window.__lenis?.scrollTo("#works", { duration: 1.6 })
              }
            >
              View selected work
            </MagneticButton>
          </div>
        </div>
      </div>
      <div className="hf absolute right-[6vw] top-32 lbl text-right hidden md:block">
        INDEPENDENT DEVELOPER<br />
        MIRPURKHAS, PAKISTAN
      </div>
      <div className="hf absolute left-[6vw] bottom-4 z-10 lbl flex items-center gap-3">
        <span className="relative w-px h-10 bg-white/20 overflow-hidden">
          <span className="absolute inset-x-0 h-1/2 bg-acc animate-[sc_2s_ease-in-out_infinite]" />
        </span>
        Scroll to explore
      </div>
      <style>{`@keyframes sc{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
