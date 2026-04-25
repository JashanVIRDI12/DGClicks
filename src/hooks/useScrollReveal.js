"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal elements marked with .js-reveal, .js-reveal-left, .js-reveal-scale
 * inside a given scope ref. Call once per component.
 */
export function useScrollReveal(scope) {
  useEffect(() => {
    if (!scope?.current) return;
    const ctx = gsap.context(() => {

      // Fade + rise
      gsap.utils.toArray(".js-reveal", scope.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // Slide in from left
      gsap.utils.toArray(".js-reveal-left", scope.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      // Scale up
      gsap.utils.toArray(".js-reveal-scale", scope.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // Staggered children (add data-stagger to parent)
      gsap.utils.toArray("[data-stagger]", scope.current).forEach((parent) => {
        const children = gsap.utils.toArray(".js-reveal", parent);
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: parent,
            start: "top 85%",
            once: true,
          },
        });
      });

    }, scope);

    return () => ctx.revert();
  }, [scope]);
}
