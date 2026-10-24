"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Cpu, Radio, Shield, Terminal } from "lucide-react";
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
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 pt-32 pb-12 sm:px-10 md:px-16 lg:px-24 bg-[#050608] select-none text-white"
    >
      {/* Specular Ambient Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.04), transparent 80%)`,
        }}
      />

      {/* Cybernetic Dot Matrix Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono uppercase tracking-widest text-paper-muted">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f0ff] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00f0ff]" />
          </div>
          <span className="font-bold text-white tracking-wider">SAROSH KUMAR</span>
          <span className="text-white/20">|</span>
          <span className="text-paper-subtle hidden sm:inline">CONTROL PLANE &amp; SYSTEMS ARCHITECT</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="font-mono text-paper-subtle hidden sm:inline">{timeString}</span>
          <div className="flex items-center gap-2 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-3.5 py-1 text-[#00f0ff]">
            <Radio className="h-3 w-3 animate-pulse" />
            <span className="font-bold">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Hero Core Monolith */}
      <div className="relative z-10 my-auto py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-paper-muted">
            <Cpu className="h-3.5 w-3.5 text-[#00f0ff]" />
            <span>Autonomous Agents · Computer Vision · Low-Latency Backends</span>
          </div>

          <h1 className="font-sans text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase leading-[0.86] tracking-tighter text-white">
            SAROSH
            <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-[#00f0ff] bg-clip-text text-transparent">
              KUMAR
            </span>
          </h1>
        </motion.div>

        {/* Narrative Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base sm:text-xl text-paper-muted font-light leading-relaxed"
        >
          Engineering deterministic software that interfaces with the physical OS — from <strong className="text-white font-medium">local-first voice copilots</strong> and zero-interruption gesture automation to high-throughput incident retrieval engines.
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("#projects", { offset: -30 })}
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            data-cursor="hover"
          >
            <span>Explore Systems</span>
            <ArrowDown className="h-4 w-4 text-[#00f0ff] transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:border-[#00f0ff]/50 hover:bg-white/10 hover:text-white"
            data-cursor="hover"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-4 w-4 text-paper-muted" />
          </a>

          <button
            onClick={() => scrollTo("#contact", { offset: -30 })}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:border-white/50 hover:bg-white/10"
            data-cursor="hover"
          >
            <span>Connect</span>
            <ArrowUpRight className="h-4 w-4 text-paper-muted" />
          </button>
        </motion.div>
      </div>

      {/* Hardware Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 font-mono text-xs">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-[10px] uppercase text-paper-subtle block">01 // Audio STT Latency</span>
          <span className="mt-1 font-bold text-[#00f0ff] text-sm sm:text-base">&lt;350ms Whisper</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-[10px] uppercase text-paper-subtle block">02 // Incident Retrieval</span>
          <span className="mt-1 font-bold text-white text-sm sm:text-base">~124ms P95 LSH</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-[10px] uppercase text-paper-subtle block">03 // Vision Tracking</span>
          <span className="mt-1 font-bold text-[#00ffb2] text-sm sm:text-base">0ms Focus Hijack</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <span className="text-[10px] uppercase text-paper-subtle block">04 // Inference Pipeline</span>
          <span className="mt-1 font-bold text-white text-sm sm:text-base">100% Local Weights</span>
        </div>
      </div>
    </section>
  );
}
