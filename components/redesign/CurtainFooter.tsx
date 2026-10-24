"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useLenis } from "@/components/ScrollProvider";
import { ArrowUp, Heart, Globe, Terminal } from "lucide-react";

export default function CurtainFooter() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo } = useLenis();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full min-h-[80vh] bg-black text-white overflow-hidden flex flex-col justify-between pt-16 pb-8 px-6 md:px-16 border-t border-white/10"
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between"
      >
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 font-mono text-xs">
          {/* Identity */}
          <div className="flex flex-col gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
              IDENTIFICATION
            </span>
            <p className="font-bold text-white text-sm">
              {PORTFOLIO_DATA.personal.name}
            </p>
            <p className="text-zinc-400">
              {PORTFOLIO_DATA.personal.role}
            </p>
            <p className="text-zinc-500">
              {PORTFOLIO_DATA.personal.location}
            </p>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
              CHANNELS
            </span>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-zinc-300 hover:text-cyan-400 transition-colors"
            >
              Email ↗
            </a>
            <a
              href={PORTFOLIO_DATA.personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-cyan-400 transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={PORTFOLIO_DATA.personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-cyan-400 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={PORTFOLIO_DATA.personal.links.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-cyan-400 transition-colors"
            >
              Hugging Face ↗
            </a>
          </div>

          {/* Architecture / Colophon */}
          <div className="flex flex-col gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
              COLOPHON
            </span>
            <p className="text-zinc-400 leading-relaxed">
              Engine: Next.js 16 • React 19 • GSAP ScrollTrigger • Lenis • Framer Motion
            </p>
            <p className="text-zinc-500 mt-1">
              Typeface: Inter & JetBrains Mono
            </p>
          </div>

          {/* Back to top */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={() => scrollTo(0)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-cyan-300 transition-all duration-300"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <span className="text-zinc-500 text-[10px] tracking-widest mt-6 md:mt-0">
              © 2026 SAROSH KUMAR
            </span>
          </div>
        </div>

        {/* Giant Kinetic Wordmark */}
        <div className="w-full flex items-center justify-center overflow-hidden py-10 select-none">
          <h2 className="font-sans font-black text-[18vw] leading-[0.8] text-white/90 uppercase tracking-tighter text-center">
            SAROSH
          </h2>
        </div>
      </motion.div>
    </footer>
  );
}
