"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroPortrait from "@/components/HeroPortrait";
import TiltedCard from "@/components/ui/tilted-card";

gsap.registerPlugin(ScrollTrigger);

const CARD_BG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
    <rect width="220" height="220" fill="#0c1220" />
    <rect x="0" y="0" width="220" height="220" fill="none" stroke="#e8452c" stroke-width="6" />
  </svg>`
)}`;

/**
 * Alternate hero treatment: giant background type behind an overlapping
 * portrait, on a black backdrop with orange/red accents, with a row of
 * TiltedCard info boxes underneath. Kept as a separate section (not
 * replacing the primary LensReveal hero) so both can be seen.
 *
 * The section pins while scrolling: the portrait slides in from the left,
 * the name slides in from the right, and the box slides up from below, all
 * into their resting positions. Continuing to scroll sends each element out
 * in the opposite direction it entered from (portrait exits right, name
 * exits left, box exits up); scrolling back up reverses the same path.
 */
export default function NameHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(typeRef.current, { xPercent: 120, opacity: 0 });
      gsap.set(portraitRef.current, { xPercent: -120, opacity: 0 });
      gsap.set(boxRef.current, { yPercent: 120, opacity: 0 });

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
        // Entrance: portrait from the left, name from the right, box up from below.
        .to(typeRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .to(portraitRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .to(boxRef.current, { yPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        // Hold at rest briefly.
        .to({}, { duration: 0.4 })
        // Exit: each element continues out the opposite side from where it entered.
        .to(typeRef.current, { xPercent: -120, opacity: 0, duration: 1, ease: "power2.in" })
        .to(portraitRef.current, { xPercent: 120, opacity: 0, duration: 1, ease: "power2.in" }, "<")
        .to(boxRef.current, { yPercent: -120, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-ink px-6 pb-12 pt-20"
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center"
        >
          <h2
            ref={typeRef}
            className="whitespace-nowrap font-serif text-[18vw] italic font-normal leading-none tracking-tight text-grad-red sm:text-[16vw] md:text-[14vw]"
          >
            SAROSH
          </h2>
        </div>

        <div
          ref={portraitRef}
          className="relative z-10 h-[60%] w-[38%] max-w-xs overflow-hidden rounded-2xl shadow-2xl sm:h-[68%]"
        >
          <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
        </div>
      </div>

      <div ref={boxRef} className="relative z-10 flex w-full max-w-xs items-center justify-center">
        <TiltedCard
          imageSrc={CARD_BG}
          altText="Comp Sci Enthusiast"
          captionText="Comp Sci Enthusiast"
          containerHeight="220px"
          containerWidth="220px"
          imageHeight="220px"
          imageWidth="220px"
          rotateAmplitude={12}
          scaleOnHover={1.08}
          showMobileWarning={false}
          showTooltip
          displayOverlayContent
          overlayContent={
            <div className="flex h-[220px] w-[220px] flex-col items-center justify-center rounded-[15px] px-4 text-center">
              <span className="font-serif text-xl italic text-grad-red">Comp Sci</span>
              <span className="font-serif text-xl italic text-grad-red">Enthusiast</span>
            </div>
          }
        />
      </div>
    </section>
  );
}
