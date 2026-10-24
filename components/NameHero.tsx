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
    <rect x="0" y="0" width="240" height="300" fill="none" stroke="#00ffb2" stroke-width="4" />
  </svg>`
)}`;

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
            onUpdate: (self) => frameApiRef.current?.setProgress(self.progress),
          },
        })
        // Entrance: portrait from left, name from right, box from below
        .to(typeRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .to(portraitRef.current, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .to(boxRef.current, { yPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        // Hold at rest
        .to({}, { duration: 0.4 })
        // Exit
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
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center"
        >
          <h2
            ref={typeRef}
            className="whitespace-nowrap font-sans text-[20vw] font-black uppercase leading-none tracking-tighter text-white/15 sm:text-[22vw] md:text-[20vw]"
          >
            SAROSH
          </h2>
        </div>

        <div
          ref={portraitRef}
          className="relative z-10 h-[48%] w-[32%] max-w-[200px] overflow-hidden sm:h-[70%] sm:w-[42%] sm:max-w-sm rounded-3xl border border-white/20 shadow-2xl shadow-black/80"
        >
          <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
        </div>
      </div>

      <div ref={boxRef} className="absolute bottom-10 right-6 z-20 md:right-12">
        <TiltedCard
          imageSrc={CARD_BG}
          altText="Software Engineer & AI Systems Architect"
          captionText="Sarosh Kumar"
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
              <span className="font-mono text-xs uppercase tracking-widest text-accent-mint font-bold">
                SYSTEMS ARCHITECT
              </span>
              <p className="text-[10.5px] font-sans leading-snug text-paper/80 sm:text-xs sm:leading-relaxed">
                {isMobile
                  ? "B.E. in CS & Engineering at KLE Tech, Hubli. Building AI, backend, and full-stack projects."
                  : "B.E. in Computer Science & Engineering at KLE Technological University, Hubli (2024–2028). Building deterministic AI systems, distributed backends, and creative interfaces."}
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
