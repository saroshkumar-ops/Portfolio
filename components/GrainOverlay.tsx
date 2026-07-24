"use client";

/**
 * Fixed, pointer-transparent film-grain texture layered over the whole viewport.
 * Uses an SVG feTurbulence filter (cheaper than a canvas/video texture) and a
 * subtle keyframe animation that jitters the pattern position for a "live" grain feel.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
    >
      <svg className="h-full w-full animate-grain-shift opacity-[0.18]">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
