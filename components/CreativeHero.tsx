"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, PenTool, Sparkles, MoveRight, Code2 } from "lucide-react";
import { useLenis } from "@/components/ScrollProvider";

interface CreativeHeroProps {
  currentStyle?: string;
}

export default function CreativeHero({ currentStyle = "swiss" }: CreativeHeroProps) {
  const { scrollTo } = useLenis();
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now) + " IST"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full pt-28 pb-16 px-6 sm:px-10 md:px-16 lg:px-20 border-b border-white/10 bg-[#090a10] select-none text-white overflow-hidden"
    >
      {/* ── Architectural Swiss Grid Lines (creativeed.dev aesthetic) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle 12-column structural guideline */}
        <div className="mx-auto h-full max-w-7xl grid grid-cols-6 md:grid-cols-12 border-x border-white/[0.06]">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="border-r border-white/[0.04] h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col justify-between min-h-[calc(100vh-180px)]">
        {/* ── Top Meta Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 font-mono text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="font-bold text-[#d4ff00]">[ 05 // HELLO ]</span>
            <span className="text-white/30">/</span>
            <span>THIS ACTION WILL HAVE CONSEQUENCES.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="hidden sm:inline">GRID 12-B // ASYMMETRIC</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-[#d4ff00] font-bold">BLR // HUB // {timeString}</span>
          </div>
        </div>

        {/* ── Main Hero Monolith ── */}
        <div className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-[#d4ff00] animate-pulse" />
              <span>STUDIED THE ALGORITHMS, CRAVED THE ARCHITECTURE.</span>
            </div>

            {/* Giant Asymmetric Grotesque Headline */}
            <h1 className="font-sans text-[15vw] sm:text-[13vw] md:text-[10.5vw] font-black uppercase leading-[0.82] tracking-tighter">
              <span className="block text-white hover:text-[#d4ff00] transition-colors duration-300">
                SAROSH.
              </span>
              <span className="block text-white/90">
                SYSTEMS.
              </span>
            </h1>

            {/* Subline with creativeed.dev editorial cadence */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              <div className="md:col-span-8 space-y-4">
                <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-slate-200 leading-snug">
                  <span className="font-semibold text-white">Creative developer &amp; systems engineer</span> at KLE Technological University, Hubli. Redefined through <span className="text-[#d4ff00] font-normal underline decoration-1 underline-offset-4">subtraction and absolute focus</span>.
                </p>

                <p className="font-mono text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Building deterministic local-first control planes, zero-focus computer vision utilities, and sub-second incident retrieval engines. Turning web browsers and operating systems into responsive digital canvases.
                </p>
              </div>

              {/* Hand-drawn whimsical annotation like creativeed.dev */}
              <div className="md:col-span-4 flex flex-col justify-end">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 font-hand text-lg text-[#d4ff00] leading-snug">
                  <p>
                    ✏️ Click &quot;Draw on Screen&quot; at the bottom right to doodle directly over the page!
                  </p>
                  <span className="font-mono text-[10px] text-slate-400 block mt-1 uppercase">
                    Interactive Drawing Canvas Enabled
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-6 font-mono text-xs uppercase tracking-wider">
              <button
                onClick={() => scrollTo("#projects", { offset: -30 })}
                className="group flex items-center gap-3 rounded-full bg-[#d4ff00] px-7 py-4 font-bold text-black transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>[ Explore Selected Works ]</span>
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("#gallery", { offset: -30 })}
                className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-white hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors"
              >
                <span>[ 3D Cylindrical Viewport ]</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Metric Ticker (Swiss Asymmetric) ── */}
        <div className="border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-white/40 block text-[10px]">[ 01 ] DISCIPLINE</span>
            <p className="font-bold text-white text-sm">Deterministic Systems</p>
          </div>

          <div className="space-y-1">
            <span className="text-white/40 block text-[10px]">[ 02 ] REPOSITORY</span>
            <p className="font-bold text-[#d4ff00] text-sm">5 Shipped Blueprints</p>
          </div>

          <div className="space-y-1">
            <span className="text-white/40 block text-[10px]">[ 03 ] INSTITUTION</span>
            <p className="font-bold text-white text-sm">KLE Tech, Hubli</p>
          </div>

          <div className="space-y-1">
            <span className="text-white/40 block text-[10px]">[ 04 ] STATUS</span>
            <p className="font-bold text-emerald-400 text-sm">Available for 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
