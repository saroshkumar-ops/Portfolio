"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LENS_SIZE = 190;

/**
 * Renders the hero headline twice: a plain layer, and a chromatic-aberration
 * layer clipped to a circular "lens" that tracks the pointer. When the
 * pointer is idle (or on touch devices), the lens sweeps across the headline
 * on its own so the effect is always visible, mirroring the reference video.
 */
export default function LensReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleFrame = useRef<number | null>(null);
  const idleT = useRef(0);
  const idleActive = useRef(true);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [bounds, setBounds] = useState({ width: 800, height: 300 });

  const x = useMotionValue(bounds.width * 0.35);
  const y = useMotionValue(bounds.height * 0.5);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateBounds = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };
    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const tick = () => {
      if (idleActive.current) {
        idleT.current += 0.006;
        const sweep = (Math.sin(idleT.current) + 1) / 2;
        x.set(bounds.width * (0.15 + sweep * 0.55));
        y.set(bounds.height * (0.35 + Math.sin(idleT.current * 1.7) * 0.18));
      }
      idleFrame.current = requestAnimationFrame(tick);
    };
    idleFrame.current = requestAnimationFrame(tick);

    return () => {
      if (idleFrame.current) cancelAnimationFrame(idleFrame.current);
    };
  }, [bounds, x, y]);

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
    e
  ) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    idleActive.current = false;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      idleActive.current = true;
    }, 1800);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const clipPath = useSpringCircle(springX, springY);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full select-none"
    >
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="chromatic-aberration" colorInterpolationFilters="sRGB">
          <feOffset in="SourceGraphic" dx="-4" dy="0" result="rOffset" />
          <feColorMatrix
            in="rOffset"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="rOnly"
          />
          <feOffset in="SourceGraphic" dx="4" dy="1" result="bOffset" />
          <feColorMatrix
            in="bOffset"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="bOnly"
          />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="gOnly"
          />
          <feBlend in="rOnly" in2="bOnly" mode="screen" result="rb" />
          <feBlend in="rb" in2="gOnly" mode="screen" result="rgb" />
          <feGaussianBlur in="rgb" stdDeviation="1.4" />
        </filter>
      </svg>

      <Headline />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath }}
      >
        <div style={{ filter: "url(#chromatic-aberration)" }}>
          <Headline />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full border border-paper/25 backdrop-blur-[1px]"
        style={{
          width: LENS_SIZE,
          height: LENS_SIZE,
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}

function useSpringCircle(
  springX: ReturnType<typeof useSpring>,
  springY: ReturnType<typeof useSpring>
) {
  const [clip, setClip] = useState(
    `circle(${LENS_SIZE / 2}px at 0px 0px)`
  );

  useEffect(() => {
    const update = () => {
      setClip(
        `circle(${LENS_SIZE / 2}px at ${springX.get()}px ${springY.get()}px)`
      );
    };
    const unsubX = springX.on("change", update);
    const unsubY = springY.on("change", update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY]);

  return clip;
}

function Headline() {
  return (
    <h1 className="font-sans text-[15vw] font-bold leading-[0.85] tracking-tight text-paper sm:text-[10vw] md:text-[7.5vw]">
      Designing
      <br />
      <span className="font-serif italic font-normal text-accent-amber">
        thoughtful
      </span>{" "}
      products
    </h1>
  );
}
