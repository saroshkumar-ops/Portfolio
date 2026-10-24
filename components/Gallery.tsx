"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";
import { Eye, Sliders, Sparkles, Layers, MoveRight } from "lucide-react";

const GALLERY_IMAGES: TiltedGridImage[] = [
  {
    src: "/Projects/img_00015.jpg",
    alt: "Victor Copilot — Local-First AI Control Plane",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Silicon Architecture & Hardware Logic",
  },
  {
    src: "/Projects/img_00030.jpg",
    alt: "Persistent Context Engine — LSH Incident Vectors",
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    alt: "Telemetry & Network Ingestion Matrix",
  },
  {
    src: "/Projects/img_00007.jpg",
    alt: "GestureScroll — Zero-Focus Computer Vision Automation",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Computational Fluid & Geometric Flow",
  },
  {
    src: "/Projects/img_00020.jpg",
    alt: "BharatAuto — High-Throughput Dispatch Engine",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    alt: "Terminal Kernel Stream & Telemetry Buffers",
  },
  {
    src: "/Projects/img_00025.jpg",
    alt: "Listny — Audio Synthesis & Offline Storage",
  },
  {
    src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimal Monolith Concrete Architecture",
  },
];

export default function Gallery() {
  const [curve, setCurve] = useState<number>(78);
  const [speed, setSpeed] = useState<number>(3.5);
  const [tileHeight, setTileHeight] = useState<number>(34);

  return (
    <section
      id="gallery"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-white/10 bg-[#090a10] px-6 py-28 sm:px-10 md:px-16 lg:px-20 text-white select-none"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8 mb-12 font-mono text-xs">
          <div>
            <div className="flex items-center gap-2 text-[#d4ff00]">
              <span>[ 03 // EXPERIMENTAL VIEWPORT ]</span>
              <span className="text-white/20">/</span>
              <span>CYLINDRICAL PROJECTION</span>
            </div>
            <h2 className="mt-3 font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Curved{" "}
              <span className="text-[#d4ff00] underline decoration-2 underline-offset-8">
                Cylinder.
              </span>
            </h2>
          </div>

          {/* Interactive Parameter Controls */}
          <div className="flex flex-wrap items-center gap-2 text-slate-300">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2">
              <Sliders className="h-3.5 w-3.5 text-[#d4ff00]" />
              <span className="text-slate-400">CURVE:</span>
              <button
                type="button"
                onClick={() => setCurve((c) => (c === 82 ? 65 : c === 65 ? 75 : 82))}
                className="font-bold text-white hover:text-[#d4ff00] transition-colors"
                title="Cycle cylinder curvature angle"
              >
                {curve}°
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2">
              <Sparkles className="h-3.5 w-3.5 text-[#0066ff]" />
              <span className="text-slate-400">VELOCITY:</span>
              <button
                type="button"
                onClick={() => setSpeed((s) => (s === 3.5 ? 2.0 : s === 2.0 ? 5.0 : 3.5))}
                className="font-bold text-white hover:text-[#0066ff] transition-colors"
                title="Cycle scroll velocity"
              >
                {speed}s/tile
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2">
              <Layers className="h-3.5 w-3.5 text-[#ff3b00]" />
              <span className="text-slate-400">SCALE:</span>
              <button
                type="button"
                onClick={() => setTileHeight((h) => (h === 34 ? 26 : h === 26 ? 42 : 34))}
                className="font-bold text-white hover:text-[#ff3b00] transition-colors"
                title="Cycle tile vertical scale"
              >
                {tileHeight}%
              </button>
            </div>
          </div>
        </div>

        {/* 3D Cylindrical Hero Viewport with Hairline Architectural Frame */}
        <div className="relative mx-auto my-6 w-full rounded-3xl border border-white/15 bg-[#0e1017] p-2 shadow-2xl">
          <div className="relative h-[480px] sm:h-[560px] md:h-[640px] lg:h-[700px] w-full overflow-hidden rounded-[20px] bg-black">
            <TiltedGridHero
              images={GALLERY_IMAGES}
              speed={speed}
              tileHeight={tileHeight}
              aspectRatio={16 / 9}
              gap={6}
              axis={52}
              curve={curve}
              fade={14}
              className="h-full w-full"
            >
              {/* Overlaid Minimal HUD */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 font-mono text-xs">
                {/* Top Telemetry */}
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4ff00] animate-pulse" />
                    <span className="font-bold text-white">HARDWARE COMPOSITOR 60FPS</span>
                  </div>
                  <span>CAMERA DISTANCE: 1.6R</span>
                </div>

                {/* Bottom Watermark */}
                <div className="flex items-end justify-between text-slate-400">
                  <div>
                    <span className="text-[10px] text-white/40 block">CYLINDRICAL FACETS</span>
                    <p className="font-bold text-white">16 SLICES / TILE ARC</p>
                  </div>

                  <div className="rounded-full border border-white/15 bg-black/70 px-4 py-1.5 text-[11px] text-slate-300 backdrop-blur-md">
                    CYCLE CURVE &amp; RATE ABOVE
                  </div>
                </div>
              </div>
            </TiltedGridHero>
          </div>
        </div>

        {/* Bottom Swiss Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-6 font-mono text-xs text-slate-400">
          <div>
            <span className="block text-[10px] text-white/30">PROJECTION MODEL</span>
            <span className="font-semibold text-white">Cylindrical Harmonic</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/30">FACET SLICES</span>
            <span className="font-semibold text-[#d4ff00]">16 Strips / No Drift</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/30">DISPATCH PLANE</span>
            <span className="font-semibold text-white">CSS 3D preserve-3d</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/30">CONTAINER QUERIES</span>
            <span className="font-semibold text-[#0066ff]">cqw / cqh Responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
