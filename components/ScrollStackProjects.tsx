"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, X, Code2, Cpu } from "lucide-react";
import { SiGithub } from "react-icons/si";
import StarBorder from "@/components/ui/StarBorder";

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metrics: string[];
  image: string;
  command: string;
  terminalLines: string[];
  githubUrl: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: "victor",
    num: "01",
    title: "VICTOR",
    category: "AI Desktop Copilot & Control Plane",
    description:
      "A local-first AI desktop assistant with voice recognition (faster-whisper), real-time WebSocket communication, and safe desktop automation. Drives mouse, keyboard, and launches applications without external cloud dependencies.",
    stack: ["FastAPI", "Electron", "React", "Ollama (phi3)", "faster-whisper"],
    metrics: ["100% Local Inference", "<350ms Voice STT", "Zero Cloud Leaks"],
    image: "/Projects/img_00015.jpg",
    command: "cat victor/architecture.log",
    terminalLines: [
      "[SYSTEM] Initializing phi3:mini local weights via Ollama...",
      "[AUDIO] faster-whisper stream listening on audio interface 0",
      "[CONTROL_PLANE] Electron IPC bridge attached; permissions locked",
      "[WS_SERVER] Handshake accepted on ws://127.0.0.1:8765/stream",
      "[STATUS] Ready. System operational with 0 external API calls.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    accent: "#00ffb2",
  },
  {
    id: "context-engine",
    num: "02",
    title: "CONTEXT ENGINE",
    category: "Autonomous SRE Incident Retrieval",
    description:
      "Operational memory engine for autonomous SRE incident recovery. Ingests live telemetry, extracts MinHash signatures over error distributions, and reconstructs historical incident causal chains in milliseconds using Locality-Sensitive Hashing (LSH).",
    stack: ["FastAPI", "Python", "React", "MinHash", "LSH", "Docker"],
    metrics: ["~124ms P95 Latency", "100% Recall@5", "Sub-linear Retrieval"],
    image: "/Projects/img_00030.jpg",
    command: "python bench_retrieval.py --scale=100k",
    terminalLines: [
      "Loading 100,000 synthetic incident vectors into LSH index...",
      "Index built in 1.42s across 16 hash bands (r=8, b=16).",
      "Query: 'Spindle telemetry drift machine-04 thermal cutoff'",
      "Matched: INC-2024-8842 with Jaccard similarity 0.941",
      "Recall@5: 100.0% | P95 Response Latency: 123.8ms | Status: OK",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    accent: "#00d2ff",
  },
  {
    id: "gesture-scroll",
    num: "03",
    title: "GESTURE SCROLL",
    category: "Computer Vision & OS Automation",
    description:
      "Scrolls background applications via webcam hand gestures without stealing active window focus or triggering anti-cheat hooks. Uses asynchronous Win32 PostMessage and Linux XSendEvent to scroll documentation while games keep full focus.",
    stack: ["Python", "MediaPipe", "OpenCV", "Win32 API (PostMessage)", "Linux Xlib"],
    metrics: ["4-7% CPU Usage", "0ms Focus Interruption", "Anti-Cheat Conscious"],
    image: "/Projects/img_00045.jpg",
    command: "python -m gesturescroll --target=auto-detect",
    terminalLines: [
      "[GESTURE_INIT] Opening webcam stream @ 640x480 30FPS...",
      "[VISION] MediaPipe Hands model initialized (complexity: 0)",
      "[OS_HOOK] Active monitor 1 foreground: 'Modern Warfare III' (HWnd: 0x004F)",
      "[DETECTED] Gesture: Two-finger vertical scroll down (velocity: 240px/s)",
      "[DISPATCH] PostMessage dispatched to secondary window. Focus untouched.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    accent: "#9d4edd",
  },
  {
    id: "bharat-auto",
    num: "04",
    title: "BHARAT AUTO",
    category: "Smart Manufacturing & Multi-Agent Telemetry",
    description:
      "Industrial telemetry console for manufacturing plants. Connects Next.js, Spring Boot, and FastAPI to stream 12-machine CNC sensor data every 5 seconds. 5 collaborating LLM agents evaluate production risk, escalating critical incidents via real Twilio automated voice calls.",
    stack: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "LLaMA-3.3-70B", "Twilio"],
    metrics: ["5s Telemetry Loop", "5 Cooperating LLM Agents", "Direct Voice Escalation"],
    image: "/Projects/img_00060.jpg",
    command: "curl -X POST https://api.bharatauto.io/telemetry/simulate",
    terminalLines: [
      "HTTP/1.1 200 OK | Content-Type: application/json",
      "{ 'machine_id': 'CNC-08', 'temperature': '94.2C', 'risk_score': 0.89 }",
      "[SUPERVISOR_AGENT] Evaluated threshold exceedance. Anomaly high.",
      "[TWILIO_CLIENT] Initiating voice call to plant manager...",
      "[TWILIO_CLIENT] Call connected. Audio: 'Warning: Machine 8 thermal overload.'",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    accent: "#ff9e00",
  },
  {
    id: "listny",
    num: "05",
    title: "LISTNY",
    category: "Acoustic Fingerprinting & Desktop GUI",
    description:
      "Native Linux desktop application built with PySide6 that listens to desktop audio playback, generates Shazam-style acoustic fingerprints without commercial API keys, de-duplicates songs, and auto-fetches Genius lyrics in real-time.",
    stack: ["Python", "PySide6 / Qt", "shazamio", "Genius API", "Local Gemma"],
    metrics: ["<2s Recognition", "0 API Keys Required", "Smart De-duping"],
    image: "/Projects/img_00070.jpg",
    command: "listny --monitor=alsa_output.pci.monitor",
    terminalLines: [
      "[AUDIO_MONITOR] PipeWire monitor sink attached (48000Hz, stereo)",
      "[FINGERPRINT] Captured 3.2s acoustic sample. Querying hash table...",
      "[MATCHED] Track: 'Starboy' by The Weeknd (confidence: 98.4%)",
      "[GENIUS_API] Resolved lyrics URL: https://genius.com/The-weeknd-starboy-lyrics",
      "[UI] Lyric viewport updated. Local Gemma generating track background insights...",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    accent: "#ff007f",
  },
];

export default function ScrollStackProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section id="projects" className="relative w-full bg-black py-24 select-none">
      <div className="mx-auto flex flex-col items-center px-4 sm:px-8 max-w-7xl">
        {/* Sticky Stacking Cards Container */}
        <div className="relative w-full space-y-16 sm:space-y-24">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="sticky top-20 sm:top-24 w-full transition-transform duration-300"
              style={{
                zIndex: index + 1,
              }}
            >
              <StarBorder
                borderRadius="40px"
                color={project.accent}
                speed="6s"
                className="w-full shadow-2xl shadow-black/90"
              >
                <div className="flex flex-col gap-6 sm:gap-8 bg-black p-6 sm:p-10 md:p-12 text-left rounded-[38px]">
                  {/* Card Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-6 sm:gap-8">
                      <span className="font-sans text-5xl sm:text-7xl font-black text-white leading-none">
                        {project.num}
                      </span>
                      <div>
                        <span className="font-sans text-lg sm:text-2xl font-black uppercase text-white tracking-wide block">
                          {project.title}
                        </span>
                        <span className="font-mono text-xs sm:text-sm text-accent-mint uppercase font-semibold">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Action Star Button */}
                    <div className="flex items-center gap-3">
                      <StarBorder
                        borderRadius="9999px"
                        color={project.accent}
                        speed="4s"
                        className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-center gap-2 px-5 py-2 font-mono text-xs font-bold uppercase text-white">
                          <Terminal className="h-3.5 w-3.5 text-accent-mint" />
                          <span>Inspect</span>
                        </div>
                      </StarBorder>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors"
                        data-cursor="hover"
                      >
                        <SiGithub className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Content Grid: Left Image, Right Description */}
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Left: Project Image Frame (6 cols) */}
                    <div className="lg:col-span-6 relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-soft">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        {project.metrics.map((m) => (
                          <span
                            key={m}
                            className="rounded-full bg-black/80 border border-white/15 px-3 py-1 font-mono text-[10px] text-accent-mint backdrop-blur-md"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Project Description & Stack (6 cols) */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                      <p className="text-base sm:text-xl text-paper leading-relaxed font-light">
                        {project.description}
                      </p>

                      <div className="space-y-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-paper-subtle block">
                          Engineered Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-white"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StarBorder>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Inspect Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-black p-6 shadow-2xl sm:p-8 md:p-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent-mint uppercase">
                    SYSTEM RUNBOOK // {selectedProject.num}
                  </span>
                  <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black uppercase text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper-muted hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-paper-subtle">
                    [ Architecture Specification ]
                  </h4>
                  <p className="mt-2 text-base text-paper leading-relaxed font-light">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Simulated Terminal */}
                <div>
                  <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-paper-muted">
                    <Terminal className="h-3.5 w-3.5 text-accent-mint" />
                    <span>bash ~ {selectedProject.command}</span>
                  </div>
                  <div className="rounded-b-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-paper-muted space-y-1">
                    {selectedProject.terminalLines.map((line, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed">
                        <span className="text-white/30 mr-2">&gt;</span>
                        <span className={idx === selectedProject.terminalLines.length - 1 ? "text-accent-mint font-semibold" : ""}>
                          {line}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="font-mono text-xs text-paper-subtle">
                    KLE Tech Hubli // Software Architecture
                  </span>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2 font-mono text-xs font-bold text-black hover:bg-accent-mint transition-colors"
                  >
                    <SiGithub className="h-4 w-4" />
                    <span>View GitHub</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
