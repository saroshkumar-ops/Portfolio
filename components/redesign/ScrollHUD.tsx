"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/ScrollProvider";

const SECTIONS = [
  { id: "hero", label: "00 // ORIGIN" },
  { id: "about", label: "01 // BLUEPRINT" },
  { id: "projects", label: "02 // PROJECTS" },
  { id: "research", label: "03 // RESEARCH" },
  { id: "skills", label: "04 // TECH STACK" },
  { id: "hackathons", label: "05 // HONORS" },
  { id: "contact", label: "06 // TERMINAL" },
];

export default function ScrollHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      // Detect active section
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const percentageStr = String(Math.round(scrollProgress * 100)).padStart(3, "0");

  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-none select-none mix-blend-difference"
      aria-hidden="true"
    >
      {/* Percentage Indicator */}
      <div className="font-mono text-xs font-bold tracking-widest text-white/90">
        {percentageStr}
        <span className="text-[10px] text-cyan-400">%</span>
      </div>

      {/* Progress Track */}
      <div className="relative w-[2px] h-32 bg-white/15 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Section dots with hover tooltips */}
      <div className="flex flex-col gap-2.5 pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(`#${sec.id}`)}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Jump to ${sec.label}`}
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#00f2fe]"
                    : "w-1 h-1 bg-white/40 group-hover:bg-white"
                }`}
              />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-mono text-[10px] tracking-widest uppercase bg-black/90 px-2 py-0.5 rounded border border-white/10 text-cyan-400">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Coordinate Stamp */}
      <div
        className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mt-2"
        style={{ writingMode: "vertical-rl" }}
      >
        HUBLI // 15.36°N
      </div>
    </aside>
  );
}
