"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the hero for an extra viewport of scroll while the Playbook section
 * (rendered after this, with rounded top corners) slides up and over it —
 * the same "curtain reveal" continuous-motion feel as the reference video.
 * A scroll-scrubbed GSAP tween fades/scales the hero content as it gets covered.
 */
export default function PinnedHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(sticky, {
        opacity: 0.3,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[160vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen">
        <Hero />
      </div>
    </div>
  );
}
