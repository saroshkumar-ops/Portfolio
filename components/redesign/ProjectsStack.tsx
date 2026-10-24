"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/lib/portfolio-data";
import { useLenis } from "@/components/ScrollProvider";
import { ExternalLink, Code2, Radio, Cpu, Layers, Sparkles, Activity, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setLerp, resetLerp } = useLenis();

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, index) => {
      // Dynamic Lenis lerp braking (tactile drag over project cards inspired by Luke Baffait)
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 60%",
        end: "bottom 30%",
        onEnter: () => setLerp(0.045),
        onLeave: () => resetLerp(),
        onEnterBack: () => setLerp(0.045),
        onLeaveBack: () => resetLerp(),
      });
      triggers.push(st);

      // Card Stacking & scaling effect (inspired by Amogh Kini)
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.92 - index * 0.02,
          opacity: 0.75,
          y: -20,
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 75%",
            end: "top 35%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      resetLerp();
    };
  }, [setLerp, resetLerp]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 w-full min-h-screen bg-[#040711] text-white py-28 px-6 md:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
              <Layers size={14} />
              <span>02 // PRODUCTION DEPLOYMENTS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Flagship <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500">
                AI Architectures
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-sans leading-relaxed">
            Physics-informed discovery engines, streaming audio anti-spoofing models, and low-latency inference pipelines benchmarked against real-world constraints.
          </p>
        </div>

        {/* Stacked Cards Gallery */}
        <div className="flex flex-col gap-16 md:gap-24">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="scroll-stack-card sticky top-24 md:top-28 w-full rounded-3xl bg-[#080d1a] border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/60">
                      SYSTEM // 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.tags.slice(0, 3).join(" • ")}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mt-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.links.huggingface && (
                    <a
                      href={project.links.huggingface}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                    >
                      <span>HF Models</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                    >
                      <Code2 size={13} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body & Architecture Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
                {/* Description & Detailed Bullet Points */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-2 flex flex-col gap-2.5">
                    {project.bulletPoints.map((bp, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 font-sans">
                        <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badge pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Live Telemetry Grid */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4 p-5 rounded-2xl bg-black/50 border border-white/[0.08]">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                        {m.label}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
