"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { GraduationCap, Award, Compass, Cpu, Activity, Brain } from "lucide-react";

export default function UnderHeroReveal() {
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const updateH = () => setWindowHeight(window.innerHeight);
    updateH();
    window.addEventListener("resize", updateH, { passive: true });
    return () => window.removeEventListener("resize", updateH);
  }, []);

  const { scrollY } = useScroll();

  // Parallax transform mapping as user scrolls past hero
  const yHeader = useTransform(scrollY, [0, windowHeight * 0.4], [60, 0]);
  const opacityHeader = useTransform(scrollY, [0, windowHeight * 0.3], [0, 1]);

  const yCol1 = useTransform(scrollY, [windowHeight * 0.1, windowHeight * 0.5], [70, 0]);
  const opacityCol1 = useTransform(scrollY, [windowHeight * 0.1, windowHeight * 0.4], [0, 1]);

  const yCol2 = useTransform(scrollY, [windowHeight * 0.2, windowHeight * 0.6], [70, 0]);
  const opacityCol2 = useTransform(scrollY, [windowHeight * 0.2, windowHeight * 0.5], [0, 1]);

  return (
    <div className="fixed inset-0 z-0 bg-[#070b14] text-white overflow-hidden flex items-center justify-center px-6 md:px-16 lg:px-20 pointer-events-auto">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-14 items-center">
        {/* Left Column: Dossier Card & Education */}
        <motion.div
          style={{ y: yCol1, opacity: opacityCol1 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-[0_0_20px_rgba(0,242,254,0.15)] flex-shrink-0 bg-black">
                <Image
                  src="/sarosh.png"
                  alt="Sarosh Kumar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
                  ARCHITECT DOSSIER
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Sarosh Kumar
                </h2>
                <span className="text-xs text-zinc-400 font-mono">
                  {PORTFOLIO_DATA.personal.role}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-start gap-2.5">
                <GraduationCap size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">
                    {PORTFOLIO_DATA.personal.education.institution}
                  </span>
                  <div className="text-zinc-400">
                    {PORTFOLIO_DATA.personal.education.degree} ({PORTFOLIO_DATA.personal.education.timeline})
                  </div>
                  <div className="text-cyan-300 font-bold mt-0.5">
                    CGPA: {PORTFOLIO_DATA.personal.education.cgpa}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 mt-2">
                <Compass size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">
                    Lead — Data Science Club
                  </span>
                  <div className="text-zinc-400">
                    Mentoring a community of 500+ engineers at KLE Tech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Architectural Blueprint & Core Thesis */}
        <motion.div
          style={{ y: yCol2, opacity: opacityCol2 }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div>
            <motion.div style={{ y: yHeader, opacity: opacityHeader }} className="mb-3">
              <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
                01 // THE BLUEPRINT & PHILOSOPHY
              </span>
            </motion.div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
              Bridging Theory with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Low-Latency Production
              </span>
            </h3>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              {PORTFOLIO_DATA.personal.bio}
            </p>
          </div>

          {/* Three Core Engineering Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/40 transition-colors">
              <Brain size={20} className="text-cyan-400 mb-2" />
              <h4 className="font-bold text-white uppercase tracking-wider mb-1">
                Neural Systems
              </h4>
              <p className="text-zinc-400 text-[11px] font-sans leading-normal">
                Audio anti-spoofing, LFCC-LCNN, and WavLM Base+ transformers with low-pass parity gates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-400/40 transition-colors">
              <Activity size={20} className="text-indigo-400 mb-2" />
              <h4 className="font-bold text-white uppercase tracking-wider mb-1">
                Streaming APIs
              </h4>
              <p className="text-zinc-400 text-[11px] font-sans leading-normal">
                Sub-250ms WebSocket streaming with RMS voice activity detection and zero-day model evaluation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/40 transition-colors">
              <Cpu size={20} className="text-amber-400 mb-2" />
              <h4 className="font-bold text-white uppercase tracking-wider mb-1">
                Scientific ML
              </h4>
              <p className="text-zinc-400 text-[11px] font-sans leading-normal">
                NASA exoplanet celestial modeling, Kopparapu Habitable Zones, and graph neural weather prediction.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
