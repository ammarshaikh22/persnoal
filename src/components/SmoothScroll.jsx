"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
    });
    const updateScroll = () => ScrollTrigger.update();
    lenis.on("scroll", updateScroll);
    window.__lenis = lenis;

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let revealTriggers = [];
    if (!reduceMotion) {
      revealTriggers = ScrollTrigger.batch("[data-r]", {
        start: "top 88%",
        once: true,
        onEnter: (elements) =>
          gsap.fromTo(elements, {
            opacity: 0,
            y: 24,
          }, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
            immediateRender: false,
          }),
      });
    } else {
      gsap.set("[data-r]", { opacity: 1, y: 0 });
    }

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", updateScroll);
      lenis.destroy();
      revealTriggers.forEach((trigger) => trigger.kill());
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return children;
}
