"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";
import { Eye, Sliders, Sparkles, Layers, Palette, Radio } from "lucide-react";

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

type Mood = "aurora" | "cyber" | "solar" | "mint";

const MOODS: Record<Mood, { label: string; accent: string; glow: string; gradient: string }> = {
  aurora: {
    label: "AURORA",
    accent: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.4)",
    gradient: "from-cyan-500/40 via-indigo-500/30 to-fuchsia-500/40",
  },
  cyber: {
    label: "CYBER",
    accent: "#00f0ff",
    glow: "rgba(0, 240, 255, 0.4)",
    gradient: "from-cyan-500/50 via-blue-600/30 to-cyan-300/40",
  },
  solar: {
    label: "SOLAR",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.4)",
    gradient: "from-amber-500/50 via-rose-500/30 to-purple-600/40",
  },
  mint: {
    label: "MINT",
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.4)",
    gradient: "from-emerald-500/50 via-teal-500/30 to-cyan-500/40",
  },
};

export default function Gallery() {
  const [curve, setCurve] = useState<number>(78);
  const [speed, setSpeed] = useState<number>(3.5);
  const [tileHeight, setTileHeight] = useState<number>(34);
  const [mood, setMood] = useState<Mood>("aurora");

  const currentMood = MOODS[mood];

  return (
    <section
      id="gallery"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-t border-white/10 bg-[#070814] px-4 py-24 sm:px-8 md:px-12 lg:px-16 text-white select-none"
    >
      {/* Dynamic Chromatic Aurora Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[850px] -translate-x-1/2 rounded-full blur-[140px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentMood.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Cybernetic High-Tech Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Top Header / Section Index */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors duration-500"
              style={{
                borderColor: `${currentMood.accent}50`,
                backgroundColor: `${currentMood.accent}15`,
                color: currentMood.accent,
                boxShadow: `0 0 15px ${currentMood.glow}`,
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>03 // VISUAL PERSPECTIVES</span>
            </div>

            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              CYLINDRICAL{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                VIEWPORT
              </span>
            </h2>

            <p className="max-w-2xl font-sans text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Hardware-accelerated 3D cylindrical projection. Sixteen faceted slices per tile curl toward the camera across continuous trigonometric perspective calculations.
            </p>
          </div>

          {/* Interactive Live Geometry & Palette Controls */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-slate-300">
            {/* Palette Switcher */}
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
              {(["aurora", "cyber", "solar", "mint"] as Mood[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase transition-all ${
                    mood === m
                      ? "text-black shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: mood === m ? MOODS[m].accent : "transparent",
                  }}
                >
                  {MOODS[m].label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md">
              <Sliders className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-slate-400">CURVE:</span>
              <button
                type="button"
                onClick={() => setCurve((c) => (c === 82 ? 65 : c === 65 ? 75 : 82))}
                className="font-bold text-white transition-colors hover:text-cyan-400"
                title="Cycle cylinder curvature angle"
              >
                {curve}°
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-slate-400">RATE:</span>
              <button
                type="button"
                onClick={() => setSpeed((s) => (s === 3.5 ? 2.0 : s === 2.0 ? 5.0 : 3.5))}
                className="font-bold text-white transition-colors hover:text-emerald-400"
                title="Cycle scroll velocity"
              >
                {speed}s/tile
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md">
              <Layers className="h-3.5 w-3.5 text-fuchsia-400" />
              <span className="text-slate-400">SCALE:</span>
              <button
                type="button"
                onClick={() => setTileHeight((h) => (h === 34 ? 26 : h === 26 ? 42 : 34))}
                className="font-bold text-white transition-colors hover:text-fuchsia-400"
                title="Cycle tile vertical scale"
              >
                {tileHeight}%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The 3D Cylindrical Hero Viewport with Chromatic Gradient Border Frame */}
      <div className="relative z-10 mx-auto my-10 w-full max-w-7xl">
        <div
          className={`relative rounded-3xl p-[2px] transition-all duration-700 bg-gradient-to-r ${currentMood.gradient}`}
          style={{
            boxShadow: `0 0 50px ${currentMood.glow}`,
          }}
        >
          <div className="relative h-[480px] sm:h-[560px] md:h-[640px] lg:h-[700px] w-full overflow-hidden rounded-[22px] bg-gradient-to-b from-[#0c0e22]/95 via-[#080a18]/95 to-[#050610]/95 backdrop-blur-2xl">
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
              {/* Overlaid Chromatic HUD */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
                {/* Top Watermark */}
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-slate-300/70">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full animate-ping"
                      style={{ backgroundColor: currentMood.accent }}
                    />
                    <span className="font-semibold text-white">
                      STREAM ACTIVE // COMPOSITOR 60FPS
                    </span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
                    CAMERA DISTANCE: 1.6R
                  </span>
                </div>

                {/* Bottom HUD info */}
                <div className="flex items-end justify-between font-mono text-[11px] text-slate-300">
                  <div className="space-y-1">
                    <p className="text-slate-400 text-[10px]">FACET TILE ENGINE</p>
                    <p className="font-bold text-white tracking-wider">
                      16 SLICES / CYLINDER AXIS
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[10px] text-slate-200 backdrop-blur-md shadow-lg">
                    CLICK MOOD &amp; GEOMETRY CONTROLS ABOVE
                  </div>
                </div>
              </div>
            </TiltedGridHero>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 mx-auto w-full max-w-7xl pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6 font-mono text-xs text-slate-400">
          <div>
            <span className="block text-[10px] text-slate-400">PROJECTION MODEL</span>
            <span className="font-semibold text-white">Cylindrical Harmonic</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">TRANSFORM DISPATCH</span>
            <span className="font-semibold text-cyan-300">CSS 3D preserve-3d</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">GEOMETRY FACETS</span>
            <span className="font-semibold text-emerald-300">16 Slices / 0 Drift</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">CONTAINER SIZING</span>
            <span className="font-semibold text-fuchsia-300">cqw / cqh Responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
