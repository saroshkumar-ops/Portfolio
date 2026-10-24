"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useLenis } from "@/components/ScrollProvider";
import { Download, ExternalLink, Sparkles, Terminal, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Blueprint", href: "#about", num: "01", desc: "Background & Core Thesis" },
  { label: "Flagship Projects", href: "#projects", num: "02", desc: "Voice Integrity, ExoTerra, AQI" },
  { label: "Research Lab", href: "#research", num: "03", desc: "BrainGlobe, ML-LAM, ML4SCI" },
  { label: "Tech Ecosystem", href: "#skills", num: "04", desc: "Deep Learning, Systems, Frameworks" },
  { label: "Honors & Leadership", href: "#hackathons", num: "05", desc: "HackTU 7.0, Data Science Club" },
  { label: "Command Terminal", href: "#contact", num: "06", desc: "Interactive CLI & Direct Contact" },
];

const easeTransition = [0.76, 0, 0.24, 1] as const;

export default function RedesignNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      scrollTo(href);
    }, 400);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-black/60 backdrop-blur-xl border-b border-white/[0.08]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand & Status */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(0);
              }}
              className="group flex items-center gap-2.5 text-white font-mono font-bold text-sm tracking-widest uppercase"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#00f2fe]" />
              <span className="group-hover:text-cyan-400 transition-colors">SAROSH.AI</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for AI / Backend Systems</span>
            </div>
          </div>

          {/* Quick Actions & Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.links.resume}
              download
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-300"
            >
              <Download size={13} className="text-cyan-400" />
              <span>Resume.pdf</span>
            </a>

            {/* Circular Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-11 h-11 rounded-full bg-black/80 border border-white/20 hover:border-cyan-400/80 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-[60]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-[1.5px] bg-white rounded-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Cinematic Fullscreen Curtain Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: easeTransition }}
            className="fixed inset-0 z-50 bg-[#040711] text-white flex flex-col justify-between p-8 md:p-16 lg:p-20 overflow-y-auto"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                SYSTEM NAVIGATION // PORTFOLIO V3
              </span>
              <span className="font-mono text-xs text-cyan-400">
                Hubli, India [15.3647° N, 75.1240° E]
              </span>
            </div>

            {/* Links Grid */}
            <div className="my-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 max-w-5xl">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="group w-full text-left flex items-start gap-4 p-3 rounded-2xl hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-mono text-xs font-bold text-cyan-400 mt-1">
                      {link.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={20}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-cyan-400"
                        />
                      </div>
                      <p className="text-xs md:text-sm text-zinc-400 font-mono mt-1">
                        {link.desc}
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer details in menu */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-6">
                <a
                  href={PORTFOLIO_DATA.personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  GitHub <ExternalLink size={12} />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  LinkedIn <ExternalLink size={12} />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.links.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  Hugging Face <ExternalLink size={12} />
                </a>
              </div>
              <div>saroshkumar00@gmail.com</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
