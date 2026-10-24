"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, Layers, ShieldCheck, Terminal, Sparkles, Check, ArrowUpRight } from "lucide-react";
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

const STACK = [
  { name: "Python", icon: SiPython, tag: "#Engine" },
  { name: "FastAPI", icon: SiFastapi, tag: "#AsyncAPI" },
  { name: "Next.js", icon: SiNextdotjs, tag: "#SSR" },
  { name: "React", icon: SiReact, tag: "#Client" },
  { name: "Electron", icon: SiElectron, tag: "#Desktop" },
  { name: "Ollama (phi3)", icon: SiOllama, tag: "#LocalWeights" },
  { name: "MediaPipe", icon: VisionIcon, tag: "#ComputerVision" },
  { name: "PostgreSQL", icon: SiPostgresql, tag: "#Database" },
  { name: "Docker", icon: SiDocker, tag: "#Containers" },
  { name: "Linux / Win32", icon: SiLinux, tag: "#SystemHooks" },
];

export default function CreativeAbout() {
  return (
    <section
      id="about"
      className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-20 border-b border-white/10 bg-[#090a10] select-none text-white"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#d4ff00] mb-16">
          <span>[ 04 // IDENTITY &amp; PHILOSOPHY ]</span>
          <span className="text-white/20">/</span>
          <span>HUMAN CONTEXT</span>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Portrait & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0e1017] p-3 shadow-2xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black">
                <Image
                  src="/sarosh.png"
                  alt="Sarosh Kumar"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs">
                  <div>
                    <p className="font-bold text-white text-sm">Sarosh Kumar</p>
                    <p className="text-[11px] text-[#d4ff00]">KLE Tech, Hubli (2024–2028)</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-md border border-white/10">
                    ENGINEER
                  </span>
                </div>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 font-mono text-xs space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>LOCATION</span>
                <span className="text-white font-semibold">Hubli / Bengaluru, India</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DEGREE</span>
                <span className="text-white font-semibold">B.E. Computer Science</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SPECIALTY</span>
                <span className="text-[#d4ff00] font-semibold">Local AI &amp; Vision Systems</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Tenets (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs text-[#d4ff00] uppercase tracking-wider block mb-2">
                Manifesto
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-white">
                Studied the algorithms, <br />
                <span className="text-slate-400">craved the architecture.</span>
              </h2>

              <p className="mt-6 font-sans text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                I build software where architecture precedes interface. In an era saturated with ephemeral wrappers and superficial clones, I focus on deterministic engineering: local AI pipelines that run offline on device silicon, computer-vision utilities that respect user focus without invasive hooks, and incident retrieval engines that operate with sub-linear algorithmic complexity.
              </p>
            </div>

            {/* Core Tenets Swiss Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-2xl border border-white/10 bg-[#0e1017] p-5">
                <div className="flex items-center gap-2 text-[#d4ff00] font-bold">
                  <Cpu className="h-4 w-4" />
                  <span>DETERMINISTIC LOGIC</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Explicit state transitions and verifiable outcomes over probabilistic cloud blackboxes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0e1017] p-5">
                <div className="flex items-center gap-2 text-[#0066ff] font-bold">
                  <Layers className="h-4 w-4" />
                  <span>LOW-LEVEL OS HOOKS</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Direct asynchronous Win32 PostMessage and Linux XSendEvent dispatching without focus interruption.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0e1017] p-5">
                <div className="flex items-center gap-2 text-[#ff007f] font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>LOCAL DATA SOVEREIGNTY</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  Audio inference, language routing, and personal memory running 100% on local hardware.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0e1017] p-5">
                <div className="flex items-center gap-2 text-[#ff3b00] font-bold">
                  <Terminal className="h-4 w-4" />
                  <span>SUB-LINEAR RETRIEVAL</span>
                </div>
                <p className="mt-2 text-slate-300 font-sans text-xs leading-relaxed">
                  LSH and MinHash indexing achieving 100% recall@5 across 100,000 incident vectors in ~124ms.
                </p>
              </div>
            </div>

            {/* Stack Pills with Tag Labels */}
            <div className="pt-2">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                Core Stack &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {STACK.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0e1017] px-3.5 py-1.5 hover:border-white/30 transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#d4ff00]" />
                      <span className="text-white font-medium">{item.name}</span>
                      <span className="text-[10px] text-slate-400">{item.tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
