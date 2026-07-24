"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroPortrait from "@/components/HeroPortrait";

gsap.registerPlugin(ScrollTrigger);

/**
 * Alternate hero treatment: giant background type behind an overlapping
 * portrait, on a black backdrop with orange/red accents. Kept as a separate
 * section (not replacing the primary LensReveal hero) so both can be seen.
 *
 * The section pins while scrolling: the portrait slides in from the left and
 * the name slides in from the right into their resting positions. Scrolling
 * back up reverses the same path (portrait/name slide back out to their sides).
 */
export default function NameHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(typeRef.current, { xPercent: 120, opacity: 0 });
      gsap.set(portraitRef.current, { xPercent: -120, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 0.6,
            pin: true,
          },
        })
        .to(typeRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .to(portraitRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-ink px-6"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center"
        >
          <h2
            ref={typeRef}
            className="whitespace-nowrap font-serif text-[22vw] italic font-normal leading-none tracking-tight text-grad-red sm:text-[20vw] md:text-[18vw]"
          >
            SAROSH
          </h2>
        </div>

        <div
          ref={portraitRef}
          className="relative z-10 h-[70%] w-[42%] max-w-sm overflow-hidden rounded-2xl shadow-2xl sm:h-[78%]"
        >
          <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
        </div>
      </div>
    </section>
  );
}
