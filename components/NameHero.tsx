"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroPortrait from "@/components/HeroPortrait";
import FlyingPosters, { type FlyingPostersHandle } from "@/components/ui/flying-posters";
import { ABOUT_POSTERS } from "@/lib/posters";

gsap.registerPlugin(ScrollTrigger);

/**
 * Alternate hero treatment: giant background type behind an overlapping
 * portrait, beside a column of flying "about me" posters, on a black
 * backdrop with orange/red accents. Kept as a separate section (not
 * replacing the primary LensReveal hero) so both can be seen.
 *
 * The section pins while scrolling: first the poster column cycles through,
 * then the portrait slides in from the left and the name slides in from the
 * right into their resting positions. Scrolling back up reverses the same
 * path (posters rewind, then portrait/name slide back out to their sides).
 */
export default function NameHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const postersColRef = useRef<HTMLDivElement>(null);
  const postersApiRef = useRef<FlyingPostersHandle>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(typeRef.current, { xPercent: 120, opacity: 0 });
      gsap.set(portraitRef.current, { xPercent: -120, opacity: 0 });
      gsap.set(postersColRef.current, { opacity: 0 });

      const posterDrive = { value: 0 };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=180%",
            scrub: 0.6,
            pin: true,
          },
        })
        .to(postersColRef.current, { opacity: 1, duration: 0.05 }, 0)
        .to(
          posterDrive,
          {
            value: 60,
            duration: 0.55,
            ease: "none",
            onUpdate: () => postersApiRef.current?.setScroll(posterDrive.value),
          },
          0
        )
        .to(typeRef.current, { xPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.55)
        .to(portraitRef.current, { xPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.55);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center gap-6 overflow-hidden bg-ink px-6 md:gap-10 md:px-12"
    >
      <div className="relative flex h-full flex-1 items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center"
        >
          <h2
            ref={typeRef}
            className="whitespace-nowrap font-serif text-[16vw] italic font-normal leading-none tracking-tight text-grad-red sm:text-[14vw] md:text-[11vw]"
          >
            SAROSH
          </h2>
        </div>

        <div
          ref={portraitRef}
          className="relative z-10 h-[70%] w-[55%] max-w-xs overflow-hidden rounded-2xl border border-accent-amber/20 shadow-2xl sm:h-[78%]"
        >
          <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
        </div>
      </div>

      <div ref={postersColRef} className="relative hidden h-[72%] w-[30%] shrink-0 md:block">
        <FlyingPosters
          ref={postersApiRef}
          items={ABOUT_POSTERS}
          planeWidth={200}
          planeHeight={260}
          distortion={1.5}
          cameraZ={16}
          className="rounded-2xl border border-paper/10"
        />
      </div>
    </section>
  );
}
