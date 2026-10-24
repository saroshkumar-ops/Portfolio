"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Cpu, Layers, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import {
  SiPython,
  SiReact,
  SiFastapi,
  SiElectron,
  SiNextdotjs,
  SiPostgresql,
  SiOllama,
  SiDocker,
  SiLinux,
} from "react-icons/si";
import { VisionIcon } from "@/components/ui/icons";

const TECH_ITEMS = [
  { name: "Python", icon: SiPython, color: "#387eb8", bg: "rgba(56, 126, 184, 0.15)" },
  { name: "FastAPI", icon: SiFastapi, color: "#05998b", bg: "rgba(5, 153, 139, 0.15)" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" },
  { name: "React", icon: SiReact, color: "#00d8ff", bg: "rgba(0, 216, 255, 0.15)" },
  { name: "Electron", icon: SiElectron, color: "#9feaf9", bg: "rgba(159, 234, 249, 0.15)" },
  { name: "Ollama (phi3/gemma)", icon: SiOllama, color: "#d946ef", bg: "rgba(217, 70, 239, 0.15)" },
  { name: "MediaPipe & OpenCV", icon: VisionIcon, color: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)" },
  { name: "Docker", icon: SiDocker, color: "#2496ed", bg: "rgba(36, 150, 237, 0.15)" },
  { name: "Linux / Win32 API", icon: SiLinux, color: "#facc15", bg: "rgba(250, 204, 21, 0.15)" },
];

export default function AboutPersona() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 bg-[#070814] overflow-hidden select-none">
      {/* Background Chromatic Aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-fuchsia-600/15 via-indigo-600/10 to-transparent blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-600/15 via-teal-600/10 to-transparent blur-[130px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Index */}
        <div className="mb-16 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>01 // IDENTITY &amp; PHILOSOPHY</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Editorial Portrait Card with Chromatic Frame (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative col-span-1 lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md rounded-3xl p-[2px] bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              <div className="relative overflow-hidden rounded-[22px] bg-[#0c0e22] p-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#12152e]">
                  <Image
                    src="/sarosh.png"
                    alt="Sarosh Kumar"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white">
                    <div>
                      <p className="font-bold text-white text-sm">Sarosh Kumar</p>
                      <p className="text-[11px] text-cyan-300">KLE Tech, Hubli (2024–2028)</p>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 px-3 py-1 text-[10px] font-bold text-cyan-200 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      ENGINEER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Manifesto & Skills (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-1 lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-white">
                Architecture precedes interface. <br />
                <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Structure defines outcome.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                I am a software engineer focused on building robust, deterministic systems. Whether architecting local AI desktop control planes with voice recognition, developing computer-vision utilities that bypass global hooks to maintain game focus, or designing incident context engines with sub-second retrieval, I treat software engineering as an exact craft.
              </p>
            </div>

            {/* Core Tenets Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/30 to-[#0c0e22] p-5 shadow-[0_0_20px_rgba(0,240,255,0.06)]">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <Cpu className="h-4 w-4" />
                  <span>DETERMINISTIC SYSTEMS</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Predictable execution paths and deterministic state machines over probabilistic guesswork.
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/30 to-[#0c0e22] p-5 shadow-[0_0_20px_rgba(99,102,241,0.06)]">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                  <Layers className="h-4 w-4" />
                  <span>LOW-LEVEL OS HOOKS</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Direct Win32 PostMessage and Linux XSendEvent dispatching without focus disruption.
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-950/30 to-[#0c0e22] p-5 shadow-[0_0_20px_rgba(217,70,239,0.06)]">
                <div className="flex items-center gap-2 text-fuchsia-300 font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>LOCAL-FIRST AI SOVEREIGNTY</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Zero cloud telemetry leaks. On-device SLM reasoning running entirely on local silicon.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/30 to-[#0c0e22] p-5 shadow-[0_0_20px_rgba(16,185,129,0.06)]">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <Terminal className="h-4 w-4" />
                  <span>METRIC-DRIVEN VALIDATION</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Every pipeline instrumented with p95/p99 latency ceilings and mathematical verification.
                </p>
              </div>
            </div>

            {/* Tech Stack Grid with Colorful Authentic Brand Pills */}
            <div className="pt-2">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                Core Stack &amp; Technologies
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TECH_ITEMS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-white transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: tech.bg,
                        borderColor: `${tech.color}40`,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" style={{ color: tech.color }} />
                      <span className="font-medium text-slate-200">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
