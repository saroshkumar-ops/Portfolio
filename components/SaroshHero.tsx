"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Cpu, Radio, Shield, Terminal, Sparkles, Layers, Activity } from "lucide-react";
import { useLenis } from "@/components/ScrollProvider";

export default function SaroshHero() {
  const { scrollTo } = useLenis();
  const [timeString, setTimeString] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#070814] px-6 pt-32 pb-14 sm:px-10 md:px-16 lg:px-24 select-none text-white"
    >
      {/* ── Dynamic Multi-Chromatic Aurora Mesh Background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Aurora Blob 1: Electric Cyan & Teal */}
        <div
          className="animate-aurora-1 absolute -top-24 -left-20 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#00f0ff]/25 via-[#06b6d4]/15 to-transparent blur-[110px]"
        />

        {/* Aurora Blob 2: Deep Indigo & Royal Violet */}
        <div
          className="animate-aurora-2 absolute top-1/4 -right-28 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-[#8b5cf6]/25 via-[#6366f1]/20 to-transparent blur-[130px]"
        />

        {/* Aurora Blob 3: Vivid Fuchsia & Rose Glow */}
        <div
          className="animate-aurora-3 absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#d946ef]/20 via-[#f43f5e]/15 to-transparent blur-[120px]"
        />

        {/* Aurora Blob 4: Neon Mint / Emerald Accent */}
        <div
          className="absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-[#10b981]/10 blur-[100px]"
        />

        {/* Interactive Mouse-Reactive Chromatic Spotlight */}
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), rgba(0, 240, 255, 0.06) 40%, transparent 75%)`,
          }}
        />

        {/* Geometric High-Tech Grid with soft gradient fade */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        />
      </div>

      {/* ── Top Telemetry Status Header ── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono uppercase tracking-wider text-slate-400">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f0ff] opacity-80" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]" />
          </div>
          <span className="font-bold tracking-widest text-white">SAROSH KUMAR</span>
          <span className="text-white/20">|</span>
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent font-medium hidden sm:inline">
            SYSTEMS ARCHITECT &amp; SOFTWARE ENGINEER
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="font-mono text-slate-400 hidden sm:inline">{timeString}</span>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
            <span className="font-bold">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* ── Center Stage: Monolith Kinetic Typographic Hero ── */}
      <div className="relative z-10 my-auto py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Chromatic Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-1 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Cpu className="h-3.5 w-3.5" />
              <span>Autonomous Agents</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 px-3.5 py-1 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Computer Vision</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-500/10 px-3.5 py-1 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
              <Activity className="h-3.5 w-3.5" />
              <span>Low-Latency Backends</span>
            </span>
          </div>

          {/* Hero Name: Iridescent Chromatic Shimmer Gradient */}
          <h1 className="font-sans text-[13vw] sm:text-[11vw] md:text-[9.2vw] font-black uppercase leading-[0.85] tracking-tighter">
            <span className="block text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]">
              SAROSH
            </span>
            <span className="animate-gradient-shimmer block bg-gradient-to-r from-cyan-300 via-indigo-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.4)]">
              KUMAR
            </span>
          </h1>

          {/* Manifesto Subtitle */}
          <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            Architecting <span className="font-semibold text-cyan-300">deterministic on-device control planes</span>,{" "}
            <span className="font-semibold text-violet-300">zero-focus computer vision automation</span>, and{" "}
            <span className="font-semibold text-fuchsia-300">sub-second incident retrieval engines</span>.
          </p>

          {/* Vibrant Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollTo("#projects", { offset: -30 })}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#00f0ff] via-[#6366f1] to-[#d946ef] px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(0,240,255,0.7)]"
            >
              <span>Explore Blueprints</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>

            <button
              onClick={() => scrollTo("#gallery", { offset: -30 })}
              className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-6 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-violet-200 backdrop-blur-md transition-all duration-300 hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-white"
            >
              <span>Curved Gallery</span>
              <ArrowUpRight className="h-4 w-4 text-violet-300" />
            </button>

            <button
              onClick={() => scrollTo("#about", { offset: -30 })}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 font-mono text-sm font-medium tracking-wider text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              <span>Philosophy</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Telemetry Highlights (Vibrant Glassmorphic Cards) ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8">
        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/40 to-slate-950/60 p-4.5 backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.08)]">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
            <span className="font-bold">VICTOR COPILOT</span>
            <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] text-cyan-200">100% LOCAL</span>
          </div>
          <p className="mt-2 text-sm text-slate-300 font-light">
            Audio inference + phi3:mini intent routing with zero cloud data transmission.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-950/40 to-slate-950/60 p-4.5 backdrop-blur-xl shadow-[0_0_25px_rgba(139,92,246,0.08)]">
          <div className="flex items-center justify-between text-xs font-mono text-violet-300">
            <span className="font-bold">CONTEXT ENGINE</span>
            <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[10px] text-violet-200">&lt;124ms P95</span>
          </div>
          <p className="mt-2 text-sm text-slate-300 font-light">
            MinHash &amp; LSH approximate nearest neighbor retrieval across 100k+ vectors.
          </p>
        </div>

        <div className="rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-950/40 to-slate-950/60 p-4.5 backdrop-blur-xl shadow-[0_0_25px_rgba(244,63,94,0.08)]">
          <div className="flex items-center justify-between text-xs font-mono text-rose-300">
            <span className="font-bold">GESTURE SCROLL</span>
            <span className="rounded-full bg-rose-400/20 px-2 py-0.5 text-[10px] text-rose-200">4-7% CPU</span>
          </div>
          <p className="mt-2 text-sm text-slate-300 font-light">
            Computer-vision window scroll without stealing active gaming focus.
          </p>
        </div>
      </div>
    </section>
  );
}
