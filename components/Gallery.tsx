"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";
import { Eye, Sliders, Sparkles, Layers, Maximize2, Cpu } from "lucide-react";

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
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-t border-white/10 bg-[#050608] px-4 py-20 sm:px-8 md:px-12 lg:px-16 text-white select-none"
    >
      {/* Background radial atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#00f0ff]/10 via-[#00f0ff]/[0.02] to-transparent blur-3xl"
      />

      {/* Cybernetic Dot Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Top Header / Section Index */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-[#00f0ff]">
              <Eye className="h-3.5 w-3.5" />
              <span>03 // VISUAL PERSPECTIVES</span>
            </div>

            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              CYLINDRICAL{" "}
              <span className="bg-gradient-to-r from-white via-white/80 to-[#00f0ff] bg-clip-text text-transparent">
                VIEWPORT
              </span>
            </h2>

            <p className="max-w-2xl font-sans text-sm sm:text-base text-white/60 font-light leading-relaxed">
              Real-time hardware-accelerated 3D cylindrical projection. Sixteen faceted slices per tile curl toward the camera across continuous perspective calculations.
            </p>
          </div>

          {/* Interactive Live Geometry Controls */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/70">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur-md">
              <Sliders className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span className="text-white/40">CURVE:</span>
              <button
                type="button"
                onClick={() => setCurve((c) => (c === 82 ? 65 : c === 65 ? 75 : 82))}
                className="font-bold text-white transition-colors hover:text-[#00f0ff]"
                title="Cycle cylinder curvature angle"
              >
                {curve}°
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#00ffb2]" />
              <span className="text-white/40">RATE:</span>
              <button
                type="button"
                onClick={() => setSpeed((s) => (s === 3.5 ? 2.0 : s === 2.0 ? 5.0 : 3.5))}
                className="font-bold text-white transition-colors hover:text-[#00ffb2]"
                title="Cycle scroll velocity"
              >
                {speed}s/tile
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur-md">
              <Layers className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span className="text-white/40">HEIGHT:</span>
              <button
                type="button"
                onClick={() => setTileHeight((h) => (h === 34 ? 26 : h === 26 ? 42 : 34))}
                className="font-bold text-white transition-colors hover:text-[#00f0ff]"
                title="Cycle tile vertical scale"
              >
                {tileHeight}%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The 3D Cylindrical Hero Viewport */}
      <div className="relative z-10 mx-auto my-8 w-full max-w-7xl">
        <div className="relative h-[480px] sm:h-[560px] md:h-[640px] lg:h-[700px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a0d14]/80 to-[#040609]/90 shadow-2xl shadow-black/90 backdrop-blur-2xl">
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
            {/* Ambient vignette and overlay HUD */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
              {/* Top watermark */}
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/40">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                  <span>STREAM PERSISTENT // COMPOSITOR 60FPS</span>
                </div>
                <span>CAMERA D: 1.6R</span>
              </div>

              {/* Bottom focus indicator */}
              <div className="flex items-end justify-between font-mono text-[11px] text-white/50">
                <div className="space-y-1">
                  <p className="text-white/30 text-[10px]">FACET TILE ENGINE</p>
                  <p className="font-bold text-white tracking-wider">16 STRIPS / CYLINDER AXIS</p>
                </div>

                <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] text-white/60 backdrop-blur-md">
                  CLICK CONTROLS ABOVE TO RESHAPE CURVATURE
                </div>
              </div>
            </div>
          </TiltedGridHero>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 mx-auto w-full max-w-7xl pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6 font-mono text-xs text-white/50">
          <div>
            <span className="block text-[10px] text-white/30">PROJECTION MODEL</span>
            <span className="font-semibold text-white/80">Cylindrical Harmonic</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/30">TRANSFORM DISPATCH</span>
            <span className="font-semibold text-white/80">CSS 3D preserve-3d</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/30">GEOMETRY FACETS</span>
            <span className="font-semibold text-white/80">16 Slices / 0 Drift</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/30">CONTAINER SIZING</span>
            <span className="font-semibold text-white/80">cqw / cqh Responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
