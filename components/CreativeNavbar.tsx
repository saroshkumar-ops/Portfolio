"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, PenTool, Sparkles } from "lucide-react";
import { useLenis } from "@/components/ScrollProvider";

interface CreativeNavbarProps {
  currentStyle?: string;
  onStyleChange?: (style: string) => void;
}

export default function CreativeNavbar({ currentStyle = "swiss", onStyleChange }: CreativeNavbarProps) {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState<string>("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -20 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a10]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10 font-mono text-xs">
        {/* Brand & Swiss Meta Marker */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="flex items-center gap-2 font-bold tracking-tight text-white hover:text-[#d4ff00] transition-colors"
          >
            <span className="text-[#d4ff00]">[01]</span>
            <span className="font-sans font-black tracking-tighter text-sm uppercase">SAROSH KUMAR</span>
          </a>
          <span className="hidden lg:inline text-white/20">/</span>
          <span className="hidden lg:inline text-slate-400 text-[11px]">
            KLE TECH HUBLI (2024–2028)
          </span>
        </div>

        {/* Center: Style Switcher Inspired by creativeed.dev */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1">
          {[
            { id: "swiss", label: "01 : SWISS EDITORIAL" },
            { id: "neobrutal", label: "02 : NEOBRUTALISM" },
            { id: "studio", label: "03 : MINIMAL STUDIO" },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleChange?.(style.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-mono transition-all ${
                currentStyle === style.id
                  ? "bg-[#d4ff00] text-black font-bold shadow-[0_0_12px_rgba(212,255,0,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              [ {style.label} ]
            </button>
          ))}
        </div>

        {/* Navigation Links & Action */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 font-mono text-xs uppercase tracking-wider text-slate-400">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="hover:text-[#d4ff00] transition-colors"
            >
              Works
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "#gallery")}
              className="hover:text-[#d4ff00] transition-colors"
            >
              Gallery
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="hover:text-[#d4ff00] transition-colors"
            >
              About
            </a>
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold text-black transition-all hover:bg-[#d4ff00] hover:scale-105"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-1 text-slate-400 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#090a10] px-6 py-6 md:hidden font-mono text-xs"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="py-2 text-slate-300 hover:text-[#d4ff00] uppercase"
              >
                // 01 Works &amp; Blueprints
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "#gallery")}
                className="py-2 text-slate-300 hover:text-[#d4ff00] uppercase"
              >
                // 02 Cylindrical Gallery
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className="py-2 text-slate-300 hover:text-[#d4ff00] uppercase"
              >
                // 03 About &amp; Philosophy
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="py-2 text-slate-300 hover:text-[#d4ff00] uppercase"
              >
                // 04 Contact
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
              {["swiss", "neobrutal", "studio"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStyleChange?.(s);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-full px-3 py-1 text-[10px] uppercase ${
                    currentStyle === s ? "bg-[#d4ff00] text-black font-bold" : "border border-white/20 text-white"
                  }`}
                >
                  Style: {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
