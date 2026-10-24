"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Cpu, Terminal, Database, Code2, Server, BrainCircuit, Sparkles } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Languages": Code2,
  "Deep Learning & Audio AI": BrainCircuit,
  "Machine Learning & Data": Database,
  "Systems & Tools": Server,
  "Core CS Fundamentals": Cpu,
};

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allCategories = ["All", ...PORTFOLIO_DATA.skillCategories.map((c) => c.category)];

  const displayedSkills =
    activeCategory === "All"
      ? PORTFOLIO_DATA.skillCategories.flatMap((c) =>
          c.skills.map((s) => ({ skill: s, category: c.category }))
        )
      : PORTFOLIO_DATA.skillCategories
          .find((c) => c.category === activeCategory)
          ?.skills.map((s) => ({ skill: s, category: activeCategory })) || [];

  return (
    <section
      id="skills"
      className="relative z-20 w-full min-h-screen bg-[#040711] text-white py-28 px-6 md:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
              <Cpu size={14} />
              <span>04 // SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Technical <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500">
                Ecosystem
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-sans leading-relaxed">
            Neural architectures, audio processing pipelines, streaming inference backends, and low-level algorithms honed through real-world deployments.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {allCategories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || Sparkles;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <Icon size={13} className={isSelected ? "text-black" : "text-cyan-400"} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
        >
          <AnimatePresence>
            {displayedSkills.map(({ skill, category }, i) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="group relative p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider line-clamp-1 mb-2">
                  {category}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                  {skill}
                </span>
                <div className="w-full h-[2px] bg-white/5 rounded-full mt-3 overflow-hidden">
                  <div className="w-0 group-hover:w-full h-full bg-cyan-400 transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
