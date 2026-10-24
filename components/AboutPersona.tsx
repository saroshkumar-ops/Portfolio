"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Cpu, Layers, ShieldCheck, ArrowRight } from "lucide-react";
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
  { name: "Python", icon: SiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Electron", icon: SiElectron },
  { name: "Ollama (phi3/gemma)", icon: SiOllama },
  { name: "MediaPipe & OpenCV", icon: VisionIcon },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Docker", icon: SiDocker },
  { name: "Linux / Win32 API", icon: SiLinux },
];

export default function AboutPersona() {
  return (
    <section id="intro" className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 bg-ink-card/50">
      <div className="mx-auto max-w-7xl">
        {/* Section Index */}
        <div className="mb-16 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
          <span>01</span>
          <span className="text-white/20">{"//"}</span>
          <span>IDENTITY &amp; PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Editorial Portrait Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative col-span-1 lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-ink p-4 shadow-2xl shadow-black/80">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink-soft">
                <Image
                  src="/sarosh.png"
                  alt="Sarosh Kumar"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale contrast-110 transition-transform duration-700 hover:scale-105 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white">
                  <div>
                    <p className="font-bold">Sarosh Kumar</p>
                    <p className="text-[10px] text-paper-muted">KLE Tech, Hubli (2024–2028)</p>
                  </div>
                  <span className="rounded-full bg-accent-mint/20 px-2.5 py-1 text-[10px] font-bold text-accent-mint border border-accent-mint/30">
                    ENGINEER
                  </span>
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
                <span className="text-paper-muted">Structure defines outcome.</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-paper-muted font-light leading-relaxed">
                I am a software engineer focused on building robust, deterministic systems. Whether architecting local AI desktop control planes with voice recognition, developing computer-vision utilities that bypass global hooks to maintain game focus, or designing incident context engines with sub-second retrieval, I treat software engineering as an exact craft.
              </p>
            </div>

            {/* Core Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-accent-mint font-semibold">
                  <Cpu className="h-4 w-4" />
                  <span>DETERMINISTIC SYSTEMS</span>
                </div>
                <p className="mt-2 text-paper-muted text-[11px] leading-relaxed">
                  Local-first inference with Ollama and whisper. Prioritizing low latency, deterministic execution, and zero unnecessary cloud dependencies.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="h-4 w-4 text-accent-mint" />
                  <span>ZERO-INTERRUPTION HOOKS</span>
                </div>
                <p className="mt-2 text-paper-muted text-[11px] leading-relaxed">
                  Asynchronous Win32 PostMessage &amp; X11 event routing for seamless background automation that never touches active focus.
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-paper-subtle mb-3">
                Core Stack &amp; Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_ITEMS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-paper transition-all hover:border-accent-mint hover:bg-accent-mint/10 hover:text-white"
                      data-cursor="hover"
                    >
                      <Icon className="h-3.5 w-3.5 text-paper-muted group-hover:text-accent-mint transition-colors" />
                      <span>{tech.name}</span>
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
