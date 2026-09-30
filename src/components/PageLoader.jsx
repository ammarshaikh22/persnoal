"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./PageLoader.css";
// Pure DOM + GSAP loader. Progress is written straight to the DOM (no React state per tick).
// Exits when: intro finished AND page ready (fonts + load) — or after a hard 2500ms cap.
export default function PageLoader() {
  const root = useRef();
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const el = root.current,
      pct = el.querySelector(".pl-pct"),
      bar = el.querySelector(".pl-bar");
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    html.classList.add("is-loading");
    const p = { v: 0 };
    const paint = () => {
      pct.textContent = String(Math.round(p.v)).padStart(2, "0");
      bar.style.transform = `scaleX(${p.v / 100})`;
    };
    let exited = false;
    let disposed = false;
    let intro;
    let progressTween;
    let exitTimeline;
    let cap;
    let minTimer;
    let shortTimer;
    const exit = () => {
      if (exited || disposed) return;
      exited = true;
      gsap.killTweensOf(p);
      p.v = 100;
      paint();
      window.__loaded = true;
      dispatchEvent(new Event("loader:done"));
      const main = document.querySelector("main");
      exitTimeline = gsap.timeline({
        onComplete: () => {
          html.classList.remove("is-loading");
          setGone(true);
        },
      });
      if (rm) {
        exitTimeline.to(el, { opacity: 0, duration: 0.25 });
      } else {
        exitTimeline.fromTo(
          main,
          { scale: 0.985, transformOrigin: "50% 0" },
          {
            scale: 1,
            duration: 0.9,
            ease: "expo.out",
            clearProps: "transform",
          },
          0,
        ).to(
          el,
          { yPercent: -100, opacity: 0, duration: 0.7, ease: "expo.inOut" },
          0,
        );
      }
    };
    if (rm) {
      p.v = 100;
      paint();
      gsap.set(Array.from(el.querySelectorAll(".pl-glow,.pl-sub")), { opacity: 1 });
      shortTimer = setTimeout(exit, 300);
      return () => {
        disposed = true;
        clearTimeout(shortTimer);
        gsap.killTweensOf([el, p]);
        html.classList.remove("is-loading");
      };
    }
    intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .to(".pl-glow", { opacity: 1, duration: 0.6 }, 0)
      .fromTo(
        ".pl-title",
        { yPercent: 105 },
        { yPercent: 0, duration: 0.8 },
        0.1,
      )
      .to(".pl-sub", { opacity: 1, y: 0, duration: 0.6 }, 0.35);
    gsap.set(".pl-sub", { y: 12 });
    progressTween = gsap.to(p, {
      v: 88,
      duration: 0.75,
      ease: "power2.out",
      onUpdate: paint,
    });
    const ready = Promise.all([
      document.fonts?.ready,
      new Promise((r) =>
        document.readyState === "complete"
          ? r()
          : addEventListener("load", r, { once: true }),
      ),
    ]);
    const minTime = new Promise((r) => {
      minTimer = setTimeout(r, 800);
    });
    Promise.all([ready, minTime]).then(() => {
      if (exited || disposed) return;
      progressTween = gsap.to(p, {
        v: 100,
        duration: 0.2,
        ease: "power2.out",
        onUpdate: paint,
        onComplete: exit,
      });
    });
    cap = setTimeout(exit, 2500); // never trap the user
    return () => {
      disposed = true;
      clearTimeout(cap);
      clearTimeout(minTimer);
      html.classList.remove("is-loading");
      intro?.kill();
      progressTween?.kill();
      exitTimeline?.kill();
      gsap.killTweensOf([el, p]);
    };
  }, []);
  if (gone) return null;
  return (
    <div ref={root} className="pl" role="status" aria-label="Loading">
      <div className="pl-glow" />
      <div className="pl-in">
        <span className="pl-mask">
          <span className="pl-title h-display">Muhammad Ammar</span>
        </span>
        <p className="pl-sub">Full-Stack &amp; Jamstack Developer</p>
      </div>
      <div className="pl-meta">
        <span>Loading experience...</span>
        <span className="pl-pct">00</span>
      </div>
      <div className="pl-track">
        <div className="pl-bar" />
      </div>
    </div>
  );
}
