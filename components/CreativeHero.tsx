"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useLenis } from "@/components/ScrollProvider";

export default function CreativeHero() {
  const { scrollTo } = useLenis();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 pt-32 pb-12 sm:px-10 md:px-16 lg:px-24"
    >
      {/* Ambient Mouse Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 178, 0.05), transparent 80%)`,
        }}
      />

      {/* Subtle Background Grid Lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* Top Status Metadata */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono uppercase tracking-widest text-paper-muted">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent-mint animate-pulse" />
          <span className="text-white font-bold">SAROSH KUMAR</span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">SOFTWARE ENGINEER &amp; SYSTEMS ARCHITECT</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-paper">Available for 2026 Roles</span>
        </div>
      </div>

      {/* Center Giant Kinetic Headline */}
      <div className="relative z-10 my-auto py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest text-accent-mint">
            <Sparkles className="h-4 w-4" />
            <span>Creative Developer · AI Control Planes · Distributed Systems</span>
          </div>

          <h1 className="font-sans text-[13vw] sm:text-[11vw] md:text-[9vw] font-black uppercase leading-[0.88] tracking-tighter text-white select-none">
            Creative
            <br />
            <span className="text-paper-muted transition-colors hover:text-white">
              Engineer
            </span>
          </h1>
        </motion.div>

        {/* Narrative Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base sm:text-xl text-paper-muted font-light leading-relaxed"
        >
          I design and engineer <strong className="text-white font-medium">deterministic AI systems</strong>, low-latency incident memory engines, and visceral interactive web experiences.
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("#projects", { offset: -30 })}
            className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-accent-mint hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            data-cursor="hover"
          >
            <span>View Selected Work</span>
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          <button
            onClick={() => scrollTo("#contact", { offset: -30 })}
            className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
            data-cursor="hover"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="h-4 w-4 text-paper-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Metric Strip */}
      <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 font-mono text-xs">
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">Core Architecture</span>
          <span className="mt-1 font-bold text-white text-sm sm:text-base">Local-First AI</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">P95 Retrieval Latency</span>
          <span className="mt-1 font-bold text-accent-mint text-sm sm:text-base">~124ms</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">Desktop Automation</span>
          <span className="mt-1 font-bold text-white text-sm sm:text-base">Zero-Focus Hijack</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">Telemetry Recall</span>
          <span className="mt-1 font-bold text-accent-mint text-sm sm:text-base">100% Recall@5</span>
        </div>
      </div>
    </section>
  );
}
