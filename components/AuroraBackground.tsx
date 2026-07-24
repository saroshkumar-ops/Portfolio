"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BLOBS = [
  { color: "var(--grad-teal)", top: "5%", left: "60%", size: "45vw" },
  { color: "var(--grad-purple)", top: "20%", left: "5%", size: "40vw" },
  { color: "var(--grad-gold)", top: "60%", left: "10%", size: "35vw" },
  { color: "var(--grad-red)", top: "70%", left: "65%", size: "38vw" },
];

export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const blobs = el.querySelectorAll<HTMLElement>("[data-blob]");
    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-80, 80),
          y: () => gsap.utils.random(-60, 60),
          scale: () => gsap.utils.random(0.9, 1.2),
          duration: 8 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          data-blob
          className="absolute rounded-full opacity-60 blur-[90px]"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
