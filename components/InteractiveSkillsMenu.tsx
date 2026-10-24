"use client";

import { ArrowUpRight } from "lucide-react";

interface MenuItem {
  num: string;
  title: string;
  marqueeItems: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    num: "01",
    title: "AI SYSTEMS & LOCAL INFERENCE",
    marqueeItems: [
      "OLLAMA",
      "FASTER-WHISPER",
      "PHI-3 MINI",
      "LOCAL GEMMA",
      "MINHASH LSH",
      "PYTORCH",
    ],
  },
  {
    num: "02",
    title: "DISTRIBUTED BACKENDS & PIPELINES",
    marqueeItems: [
      "FASTAPI",
      "SPRING BOOT",
      "POSTGRESQL",
      "WEBSOCKETS",
      "DOCKER",
      "ASYNCIO",
    ],
  },
  {
    num: "03",
    title: "NATIVE DESKTOP & OS AUTOMATION",
    marqueeItems: [
      "ELECTRON",
      "WIN32 API (POSTMESSAGE)",
      "LINUX XLIB",
      "MEDIAPIPE HANDS",
      "OPENCV",
      "PYSIDE6",
    ],
  },
  {
    num: "04",
    title: "FULL-STACK & SYSTEM DESIGN",
    marqueeItems: [
      "NEXT.JS 16",
      "REACT 19",
      "TAILWIND CSS",
      "GSAP MOTION",
      "LENIS SCROLL",
      "INCIDENT MEMORY",
    ],
  },
];

export default function InteractiveSkillsMenu() {
  return (
    <section className="relative w-full bg-black py-20 border-y border-white/10 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
          <span>03</span>
          <span className="text-white/20">{"//"}</span>
          <span>CAPABILITIES &amp; ARCHITECTURE</span>
        </div>
        <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          System Domains
        </h2>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.num}
            className="group relative h-20 sm:h-24 overflow-hidden cursor-pointer bg-black transition-colors"
            data-cursor="hover"
          >
            {/* Default Resting State */}
            <div className="flex h-full w-full items-center justify-between px-6 sm:px-12 transition-opacity duration-300 group-hover:opacity-10">
              <div className="flex items-center gap-6 sm:gap-10">
                <span className="font-mono text-xs sm:text-sm font-bold text-accent-mint">
                  {item.num}
                </span>
                <span className="font-sans text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                  {item.title}
                </span>
              </div>
              <ArrowUpRight className="h-6 w-6 text-paper-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            {/* Hover Marquee Ribbon Reveal */}
            <div className="absolute inset-0 z-10 flex items-center bg-accent-mint text-black translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
              <div className="animate-marquee flex items-center">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-center flex-shrink-0">
                    {item.marqueeItems.map((tech) => (
                      <span key={tech} className="flex items-center">
                        <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight px-4 sm:px-6">
                          {tech}
                        </span>
                        <span className="font-bold text-black/50 text-xl sm:text-2xl px-2">
                          ★
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
