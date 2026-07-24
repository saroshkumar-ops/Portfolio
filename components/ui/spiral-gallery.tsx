"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export type SpiralGalleryProps = {
  images: string[];
  className?: string;
};

/**
 * A diagonal band of individually tilted photo cards that drifts and loops
 * continuously in 3D space — inspired by a spiral-gallery reference video.
 * Each card gets a seeded pseudo-random tilt/lane so the band reads as a
 * loosely scattered, floating deck rather than a uniform grid.
 */
export default function SpiralGallery({ images, className = "" }: SpiralGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const container = containerRef.current;
    if (prefersReducedMotion || !container) return;

    const ctx = gsap.context(() => {
      const containerWidth = container.clientWidth;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const cardWidth = el.offsetWidth || 240;
        const startX = containerWidth + cardWidth;
        const endX = -cardWidth * 1.5;

        const laneOffset = ((i * 61) % 5) * 60 - 120;
        const tiltZ = ((i * 37) % 17) - 8;
        const tiltY = ((i * 53) % 31) - 15;
        const duration = 26 + (i % 5) * 3;
        const stagger = duration / images.length;

        gsap.set(el, {
          x: startX,
          y: laneOffset,
          yPercent: -50,
          rotationZ: tiltZ,
          rotationY: tiltY,
          force3D: true,
        });

        gsap.to(el, {
          x: endX,
          duration,
          repeat: -1,
          ease: "none",
          delay: -i * stagger,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[50vh] w-full overflow-hidden sm:h-[60vh] ${className}`}
      style={{ perspective: "1600px" }}
    >
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="group absolute left-0 top-1/2 h-32 w-44 overflow-hidden rounded-2xl border border-paper/15 shadow-2xl transition-[filter] duration-300 hover:z-10 hover:brightness-110 sm:h-44 sm:w-60"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
