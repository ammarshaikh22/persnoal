"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
const MAX = 12; // px, keeps the pull subtle
export default function MagneticButton({ children, ...p }) {
  const r = useRef(),
    q = useRef();
  useEffect(() => {
    q.current = {
      x: gsap.quickTo(r.current, "x", { duration: 0.35, ease: "power3.out" }),
      y: gsap.quickTo(r.current, "y", { duration: 0.35, ease: "power3.out" }),
    };
  }, []);
  const mv = (e) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = r.current.getBoundingClientRect();
    const c = (v) => Math.max(-MAX, Math.min(MAX, v));
    q.current.x(c((e.clientX - b.left - b.width / 2) * 0.2));
    q.current.y(c((e.clientY - b.top - b.height / 2) * 0.25));
  };
  const lv = () => {
    q.current.x(0);
    q.current.y(0);
  };
  return (
    <button
      ref={r}
      onMouseMove={mv}
      onMouseLeave={lv}
      {...p}
      className="group inline-flex items-center gap-3 border border-white/30 hover:border-acc hover:text-acc rounded-full px-8 py-4 text-sm tracking-widest uppercase transition-colors duration-500"
    >
      {children}
      <ArrowUpRight
        size={18}
        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </button>
  );
}
