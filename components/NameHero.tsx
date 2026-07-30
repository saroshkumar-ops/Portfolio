"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroPortrait from "@/components/HeroPortrait";
import TiltedCard from "@/components/ui/tilted-card";
import ScrubVideoFrames, { type ScrubVideoFramesHandle } from "@/components/ui/scrub-video-frames";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_FRAME_COUNT = 189;
const aboutFrameSrc = (index: number) => `/About/img_${String(index).padStart(5, "0")}.jpg`;

const CARD_BG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="300" viewBox="0 0 240 300">
    <rect width="240" height="300" fill="#0c1220" />
    <rect x="0" y="0" width="240" height="300" fill="none" stroke="#e8452c" stroke-width="6" />
  </svg>`
)}`;

/**
 * Alternate hero treatment: giant background type behind an overlapping
 * portrait, on a black backdrop with orange/red accents, with a TiltedCard
 * info box tucked in the corner. Kept as a separate section (not replacing
 * the primary LensReveal hero) so both can be seen.
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
  const frameApiRef = useRef<ScrubVideoFramesHandle>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
            end: "+=280%",
            scrub: 0.6,
            pin: true,
            // Scrub the background frame sequence in lockstep with the same
            // pinned scroll range driving the entrance/exit timeline below.
            onUpdate: (self) => frameApiRef.current?.setProgress(self.progress),
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
      className="relative flex h-screen items-center justify-center overflow-hidden bg-ink px-6"
    >
      <div className="absolute inset-0 z-0">
        <ScrubVideoFrames ref={frameApiRef} frameCount={ABOUT_FRAME_COUNT} frameSrc={aboutFrameSrc} />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center"
        >
          <h2
            ref={typeRef}
            className="whitespace-nowrap font-serif text-[17vw] italic font-normal leading-none tracking-tight text-grad-red sm:text-[20vw] md:text-[18vw]"
          >
            SAROSH
          </h2>
        </div>

        <div
          ref={portraitRef}
          className="relative z-10 h-[48%] w-[32%] max-w-[200px] overflow-hidden sm:h-[70%] sm:w-[42%] sm:max-w-sm"
        >
          <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
        </div>
      </div>

      <div ref={boxRef} className="absolute bottom-10 right-6 z-20 md:right-12">
        <TiltedCard
          imageSrc={CARD_BG}
          altText="Comp Sci Enthusiast"
          captionText="Comp Sci Enthusiast"
          containerHeight="clamp(200px, 56vw, 300px)"
          containerWidth="clamp(150px, 40vw, 240px)"
          imageHeight="clamp(200px, 56vw, 300px)"
          imageWidth="clamp(150px, 40vw, 240px)"
          rotateAmplitude={12}
          scaleOnHover={1.08}
          showMobileWarning={false}
          showTooltip
          displayOverlayContent
          overlayContent={
            <div className="flex h-[clamp(200px,56vw,300px)] w-[clamp(150px,40vw,240px)] flex-col items-center justify-center gap-2 rounded-[15px] px-3 text-center sm:gap-3 sm:px-5">
              <span className="font-serif text-base italic text-grad-red sm:text-lg">Comp Sci Enthusiast</span>
              <p className="text-[10.5px] leading-snug text-paper/80 sm:text-xs sm:leading-relaxed">
                {isMobile
                  ? "B.E. in CS & Engineering at KLE Tech, Hubli. Building AI, backend, and full-stack projects."
                  : "B.E. in Computer Science & Engineering at KLE Technological University, Hubli (2024–2028). Building AI systems, backend engineering, and full-stack projects through hackathons and hands-on work."}
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
