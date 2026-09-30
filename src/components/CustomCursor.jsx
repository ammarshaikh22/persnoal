"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CustomCursor.css";
// States are keyed by data-cursor="project|explore|image"; <a> => OPEN, <button> => expand only.
const S = {
  def: {
    s: 1,
    bg: "rgba(0,0,0,0)",
    bd: "rgba(245,245,245,.28)",
    t: "",
    c: "#F5F5F5",
    dot: 1,
  },
  link: {
    s: 1.6,
    bg: "rgba(0,0,0,0)",
    bd: "rgba(0,255,133,.7)",
    t: "OPEN",
    c: "#F5F5F5",
    dot: 0.3,
  },
  button: {
    s: 1.6,
    bg: "rgba(0,0,0,0)",
    bd: "rgba(0,255,133,.7)",
    t: "",
    c: "#F5F5F5",
    dot: 0.3,
  },
  project: {
    s: 2.9,
    bg: "#00FF85",
    bd: "#00FF85",
    t: "VIEW PROJECT",
    c: "#050505",
    dot: 0,
  },
  explore: {
    s: 2.1,
    bg: "rgba(0,255,133,.07)",
    bd: "rgba(0,255,133,.5)",
    t: "EXPLORE",
    c: "#F5F5F5",
    dot: 0,
  },
  image: {
    s: 1.9,
    bg: "rgba(255,255,255,.08)",
    bd: "rgba(245,245,245,.4)",
    t: "",
    c: "#F5F5F5",
    dot: 0.3,
  },
};
export default function CustomCursor() {
  const wrap = useRef(),
    ring = useRef(),
    label = useRef(),
    dot = useRef();
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("cur");
    // quickTo reuses one tween per property and rides GSAP's existing ticker: no React state, no extra loop.
    const dx = gsap.quickTo(dot.current, "x", {
        duration: 0.05,
        ease: "power3.out",
      }),
      dy = gsap.quickTo(dot.current, "y", {
        duration: 0.05,
        ease: "power3.out",
      });
    const rd = rm ? 0.01 : 0.28;
    const wx = gsap.quickTo(wrap.current, "x", {
        duration: rd,
        ease: "power3.out",
      }),
      wy = gsap.quickTo(wrap.current, "y", {
        duration: rd,
        ease: "power3.out",
      });
    let shown = false,
      last = null;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([wrap.current, dot.current], { x: e.clientX, y: e.clientY });
        gsap.to([wrap.current, dot.current], { opacity: 1, duration: 0.2 });
      }
      dx(e.clientX);
      dy(e.clientY);
      wx(e.clientX);
      wy(e.clientY);
    };
    const set = (k) => {
      const s = S[k];
      const d = rm ? 0 : 0.25;
      gsap.to(ring.current, {
        scale: s.s,
        backgroundColor: s.bg,
        borderColor: s.bd,
        duration: d,
        ease: "power3.out",
        overwrite: true,
      });
      label.current.textContent = s.t;
      gsap.to(label.current, { opacity: s.t ? 1 : 0, color: s.c, duration: d });
      gsap.to(dot.current, { opacity: s.dot, duration: d });
    };
    const over = (e) => {
      const t = e.target;
      if (t === last) return;
      last = t;
      const d = t.closest?.("[data-cursor]")?.dataset.cursor;
      const k =
        S[d] && d !== "def"
          ? d
          : t.closest?.("a")
            ? "link"
            : t.closest?.("button")
              ? "button"
              : "def";
      set(k);
    };
    const leave = () => {
      shown = false;
      gsap.to([wrap.current, dot.current], { opacity: 0, duration: 0.2 });
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.body.classList.remove("cur");
      removeEventListener("pointermove", move);
      removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <>
      <div ref={wrap} className="cur-wrap" aria-hidden="true">
        <div ref={ring} className="cur-ring" />
        <span ref={label} className="cur-label" />
      </div>
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
