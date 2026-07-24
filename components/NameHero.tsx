"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroPortrait from "@/components/HeroPortrait";
import FlyingPosters from "@/components/ui/flying-posters";
import { ABOUT_POSTERS } from "@/lib/posters";

gsap.registerPlugin(ScrollTrigger);

/**
 * Alternate hero treatment: giant background type behind an overlapping
 * portrait, on a black backdrop with orange/red accents, plus a strip of
 * "about me" posters. Kept as a separate section (not replacing the primary
 * LensReveal hero) so both can be seen. Content slides in on scroll-into-view
 * and slides back out on scroll-away, in both scroll directions.
 */
export default function NameHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const postersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const targets = [typeRef.current, portraitRef.current, postersRef.current].filter(Boolean);

      gsap.set(targets, { opacity: 0 });
      gsap.set(typeRef.current, { yPercent: -40 });
      gsap.set(portraitRef.current, { y: 80 });
      gsap.set(postersRef.current, { y: 120 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        })
        .to(typeRef.current, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0)
        .to(portraitRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.1)
        .to(postersRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.2);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-hidden bg-ink py-24"
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center px-4"
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
          className="relative z-10 h-[70%] w-[42%] max-w-sm overflow-hidden rounded-2xl border border-accent-amber/20 shadow-2xl sm:h-[78%]"
        >
          <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
        </div>
      </div>

      <div ref={postersRef} className="relative z-10 h-[75vh] w-full max-w-4xl px-6">
        <FlyingPosters
          items={ABOUT_POSTERS}
          planeWidth={220}
          planeHeight={300}
          distortion={1.5}
          cameraZ={16}
          className="rounded-2xl border border-paper/10"
        />
      </div>
    </section>
  );
}
