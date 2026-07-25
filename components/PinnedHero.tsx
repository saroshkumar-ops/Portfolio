"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import type { ScrubVideoFramesHandle } from "@/components/ui/scrub-video-frames";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the hero for an extra viewport of scroll while the Playbook section
 * (rendered after this, with rounded top corners) slides up and over it —
 * the same "curtain reveal" continuous-motion feel as the reference video.
 * A scroll-scrubbed GSAP tween fades/scales the hero content as it gets covered,
 * and the same scroll range drives Hero's background frame sequence.
 *
 * Uses GSAP's own ScrollTrigger `pin` (not CSS `position: sticky`) — pairing
 * `position: sticky` with a `scale` transform on the same element is a known
 * source of visual popping/misalignment during scroll (most noticeable with
 * continuously-repainting content like a playing <video>, since there's no
 * static frame to mask the glitch). GSAP's pin uses its own spacer element
 * and is built to coexist with transforms on the pinned element.
 */
export default function PinnedHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameApiRef = useRef<ScrubVideoFramesHandle>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        opacity: 0.3,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          onUpdate: (self) => frameApiRef.current?.setProgress(self.progress),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="h-screen">
      <Hero frameApiRef={frameApiRef} />
    </div>
  );
}
