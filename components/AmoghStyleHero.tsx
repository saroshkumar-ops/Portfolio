"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import { useLenis } from "@/components/ScrollProvider";

export default function AmoghStyleHero() {
  const { scrollTo } = useLenis();
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const update = () => {
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
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 pt-32 pb-12 sm:px-10 md:px-16 lg:px-24 bg-black select-none"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,_rgba(0,255,178,0.12),_transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,_rgba(0,210,255,0.08),_transparent_70%)] blur-3xl"
      />

      {/* Top Header Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono uppercase tracking-widest text-paper-muted">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent-mint animate-ping" />
          <span className="text-white font-bold">SAROSH KUMAR</span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">KLE TECH, HUBLI</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-paper-subtle hidden sm:inline">{timeString}</span>
          <StarBorder borderRadius="9999px" color="#00ffb2" speed="4s">
            <div className="flex items-center gap-2 px-3 py-1 font-mono text-[10px] text-white font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
              <span>AVAILABLE FOR WORK</span>
            </div>
          </StarBorder>
        </div>
      </div>

      {/* Main Hero Headline */}
      <div className="relative z-10 my-auto py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest text-accent-mint">
            <Sparkles className="h-4 w-4" />
            <span>AI Systems · Autonomous Control · Distributed Backends</span>
          </div>

          <h1 className="font-sans text-[13vw] sm:text-[11vw] md:text-[9.5vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
            SAROSH
            <br />
            <span className="text-white/35 transition-colors hover:text-white">
              KUMAR
            </span>
          </h1>
        </motion.div>

        {/* Amogh Kini Inspired Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base sm:text-xl text-paper-muted font-light leading-relaxed"
        >
          Driven by logic. Building robust software, automating the complex, and focused on transforming static systems into intelligent, deterministic control planes.
        </motion.div>

        {/* Star Border CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <StarBorder
            borderRadius="9999px"
            color="#00ffb2"
            speed="3.5s"
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={() => scrollTo("#projects", { offset: -30 })}
          >
            <div className="flex items-center gap-3 px-7 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              <span>Selected Works</span>
              <ArrowDown className="h-4 w-4 text-accent-mint" />
            </div>
          </StarBorder>

          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:border-white/50 hover:bg-white/10"
            data-cursor="hover"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-4 w-4 text-paper-muted" />
          </a>

          <button
            onClick={() => scrollTo("#contact", { offset: -30 })}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:border-white/50 hover:bg-white/10"
            data-cursor="hover"
          >
            <span>Contact</span>
            <ArrowUpRight className="h-4 w-4 text-paper-muted" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 font-mono text-xs">
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">01 // Retrieval Latency</span>
          <span className="mt-1 font-bold text-accent-mint text-sm sm:text-base">~124ms P95</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">02 // Benchmark Recall</span>
          <span className="mt-1 font-bold text-white text-sm sm:text-base">100% Recall@5</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">03 // Desktop Automation</span>
          <span className="mt-1 font-bold text-white text-sm sm:text-base">Zero-Focus Hijack</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-paper-subtle block">04 // Core Philosophy</span>
          <span className="mt-1 font-bold text-accent-mint text-sm sm:text-base">Local-First / ML</span>
        </div>
      </div>
    </section>
  );
}
