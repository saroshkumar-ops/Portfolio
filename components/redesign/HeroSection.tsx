"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useLenis } from "@/components/ScrollProvider";
import HeroCanvasScrubber from "./HeroCanvasScrubber";
import { ArrowDown, Download, ExternalLink, Sparkles, Terminal, Activity, Radio } from "lucide-react";

export default function RedesignHero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-16 md:py-20 overflow-hidden bg-[#040711] text-white z-20"
    >
      {/* Background Canvas Scrubbing Sequence */}
      <HeroCanvasScrubber />

      {/* Vertical Social Rail (Right Side) */}
      <aside
        className="absolute z-20 hidden md:flex flex-col items-center gap-6"
        style={{ right: "48px", top: "120px", bottom: "160px", justifyContent: "center" }}
      >
        <span className="w-[1px] h-12 bg-white/20" />
        <a
          href={PORTFOLIO_DATA.personal.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 group-hover:text-cyan-400 transition-colors">
            GITHUB ↗
          </span>
        </a>
        <a
          href={PORTFOLIO_DATA.personal.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 group-hover:text-cyan-400 transition-colors">
            LINKEDIN ↗
          </span>
        </a>
        <a
          href={PORTFOLIO_DATA.personal.links.huggingface}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 group-hover:text-cyan-400 transition-colors">
            HUGGINGFACE ↗
          </span>
        </a>
        <span className="w-[1px] h-12 bg-white/20" />
      </aside>

      {/* Top Spacer for Nav */}
      <div className="h-16 w-full" />

      {/* Main Kinetic Content */}
      <div className="relative z-10 max-w-6xl w-full my-auto flex flex-col items-start">
        {/* System telemetry label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
            <Radio size={12} className="animate-pulse" />
            <span>NEURAL FOUNDRY // SCIENTIFIC ML</span>
          </div>
          <span className="text-zinc-500 font-mono text-xs hidden sm:inline">
            Hubli, India • KLE Tech (CGPA 8.06)
          </span>
        </motion.div>

        {/* Massive Kinetic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full"
        >
          <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter leading-[0.88] uppercase select-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            SAROSH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              KUMAR
            </span>
          </h1>
        </motion.div>

        {/* Headline Description */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-sans font-light leading-relaxed">
            {PORTFOLIO_DATA.personal.headline}. Engineering real-time anti-spoofing audio architectures, physics-informed discovery engines, and low-latency inference pipelines.
          </p>
        </motion.div>

        {/* Call to actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("#projects")}
            className="group relative px-7 py-3.5 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs tracking-wider uppercase overflow-hidden shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] transition-all duration-300 flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Flagship Systems
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <a
            href={PORTFOLIO_DATA.personal.links.resume}
            download
            className="px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
          >
            <Download size={14} className="text-cyan-400" />
            Verified Resume
          </a>

          <button
            onClick={() => scrollTo("#contact")}
            className="px-6 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] border border-transparent hover:border-white/10 text-zinc-400 hover:text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
          >
            <Terminal size={14} />
            Command Terminal
          </button>
        </motion.div>
      </div>

      {/* Bottom Live Metrics Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full"
      >
        {PORTFOLIO_DATA.metrics.map((metric, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              {metric.label}
            </span>
            <span className="text-2xl md:text-3xl font-extrabold font-mono tracking-tight text-white mt-1">
              {metric.value}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono mt-0.5 line-clamp-1">
              {metric.note}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
