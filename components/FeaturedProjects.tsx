"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, X, Check, Code2, Cpu, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface Project {
  id: string;
  num: string;
  title: string;
  eyebrow: string;
  summary: string;
  details: string;
  stack: string[];
  metrics: string[];
  command: string;
  terminalLines: string[];
  githubUrl: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: "victor",
    num: "01",
    title: "Victor — AI Desktop Copilot",
    eyebrow: "AI Desktop Assistant & Control Plane",
    summary: "Local-first AI desktop assistant with voice recognition, real-time WebSocket chat, system automation, and persistent memory.",
    details: "Built with FastAPI, Electron, and Ollama. Victor drives media, mouse, keyboard, and launches applications without sending your audio or prompts to external cloud APIs. Watches Copilot/VS Code logs to proactively alert the engineer.",
    stack: ["FastAPI", "Electron", "React", "Ollama (phi3)", "faster-whisper", "WebSockets"],
    metrics: ["100% Local Inference", "<350ms Voice STT", "Zero Cloud Leaks"],
    command: "cat victor/architecture.log",
    terminalLines: [
      "[SYSTEM] Initializing phi3:mini local weights via Ollama daemon...",
      "[AUDIO] faster-whisper stream listening on audio interface 0",
      "[CONTROL_PLANE] Electron IPC bridge attached; permissions locked",
      "[WS_SERVER] Handshake accepted on ws://127.0.0.1:8765/stream",
      "[STATUS] Ready. System operational with 0 external API calls.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    accent: "#00ffb2",
  },
  {
    id: "persistent-context-engine",
    num: "02",
    title: "Persistent Context Engine",
    eyebrow: "Autonomous SRE Incident Retrieval",
    summary: "Context retrieval engine for autonomous SRE incident recovery with ~124ms p95 latency and 100% recall@5.",
    details: "Ingests live telemetry, extracts MinHash signatures over error distributions, and reconstructs historical incident causal chains in milliseconds using Locality-Sensitive Hashing (LSH) paired with a FastAPI backend.",
    stack: ["FastAPI", "Python", "React", "MinHash", "LSH", "Docker"],
    metrics: ["~124ms P95 Latency", "100% Recall@5", "Sub-linear Retrieval"],
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
    title: "GestureScroll",
    eyebrow: "Computer Vision & OS Automation",
    summary: "Scrolls background applications via hand gestures without stealing active window focus or triggering anti-cheat hooks.",
    details: "Built with Python, MediaPipe, and OpenCV. Uses asynchronous Win32 PostMessage and Linux XSendEvent to scroll secondary documentation or chat windows while your primary game or editor keeps 100% focused.",
    stack: ["Python", "MediaPipe", "OpenCV", "Win32 API (PostMessage)", "Linux Xlib"],
    metrics: ["4-7% CPU Usage", "0ms Focus Interruption", "Anti-Cheat Conscious"],
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
    title: "BharatAuto — Smart Manufacturing",
    eyebrow: "Industrial IoT & Multi-Agent Telemetry",
    summary: "Smart-manufacturing console streaming 12-machine CNC telemetry into 3 ML risk models with automated Twilio voice escalations.",
    details: "Coordinating 4 microservices across Next.js, Spring Boot, FastAPI, and PostgreSQL. 5 LLM agents evaluate machine telemetry every 5 seconds, escalating critical overheating alerts via automated Twilio phone calls.",
    stack: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "LLaMA-3.3-70B", "Twilio"],
    metrics: ["5s Telemetry Loop", "5 Cooperating LLM Agents", "Direct Voice Escalation"],
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
    title: "Listny — Linux Acoustic Streamer",
    eyebrow: "Acoustic Fingerprinting & Desktop GUI",
    summary: "Desktop acoustic fingerprinting utility that identifies desktop playback and opens synchronized Genius lyrics in real-time.",
    details: "Native Linux PySide6 desktop app capturing raw desktop audio streams directly from PulseAudio/PipeWire monitor sinks, querying Shazam fingerprint hashes without commercial API keys, and pulling track annotations via local Gemma.",
    stack: ["Python", "PySide6 / Qt", "shazamio", "Genius API", "Local Gemma"],
    metrics: ["<2s Recognition", "0 API Keys Required", "Smart De-duping"],
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

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section id="projects" className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
              <span>02</span>
              <span className="text-white/20">{"//"}</span>
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="mt-3 font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Featured Systems
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs uppercase tracking-wider text-paper-muted">
            Engineered from scratch. Tested in real production, desktop automation, and multi-service environments.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-card p-8 sm:p-10 transition-all duration-500 hover:border-white/30 hover:bg-ink-card-hover"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left: Info (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-accent-mint tracking-wider">
                      {project.num} // {project.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white transition-colors group-hover:text-accent-mint">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-paper-muted leading-relaxed font-light">
                    {project.summary}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-paper-subtle"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Action triggers */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="group/btn flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-accent-mint hover:scale-105 active:scale-95"
                      data-cursor="hover"
                    >
                      <Terminal className="h-3.5 w-3.5" />
                      <span>Inspect Architecture</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs font-semibold text-paper hover:bg-white/10 transition-colors"
                      data-cursor="hover"
                    >
                      <SiGithub className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>

                {/* Right: Simulated Terminal Preview (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[11px] text-paper-subtle">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80" />
                        <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                        <span className="h-2 w-2 rounded-full bg-green-500/80" />
                        <span className="ml-2 text-paper-muted">$ {project.command}</span>
                      </div>
                      <span className="text-[10px] text-accent-mint">EXIT 0</span>
                    </div>

                    <div className="p-4 font-mono text-[11px] text-paper-muted space-y-1.5">
                      {project.terminalLines.slice(0, 4).map((line, idx) => (
                        <p key={idx} className="leading-snug">
                          <span className="text-white/30 mr-2">&gt;</span>
                          <span className={idx === 3 ? "text-accent-mint font-semibold" : ""}>
                            {line}
                          </span>
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-4 py-2 font-mono text-[10px] text-paper-subtle">
                      <span>METRIC: {project.metrics[0]}</span>
                      <span className="text-emerald-400 font-semibold">{project.metrics[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Deep-Dive Architecture Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-ink-card p-6 shadow-2xl sm:p-8 md:p-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent-mint uppercase">
                    SYSTEM ARCHITECTURE // {activeProject.num}
                  </span>
                  <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black uppercase text-white">
                    {activeProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper-muted hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-paper-subtle">
                    [ Engineering Deep Dive ]
                  </h4>
                  <p className="mt-2 text-base text-paper leading-relaxed font-light">
                    {activeProject.details}
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                      <span className="font-mono text-xs font-bold text-accent-mint">{m}</span>
                    </div>
                  ))}
                </div>

                {/* CLI Output */}
                <div>
                  <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-paper-muted">
                    <Terminal className="h-3.5 w-3.5 text-accent-mint" />
                    <span>bash ~ {activeProject.command}</span>
                  </div>
                  <div className="rounded-b-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-paper-muted space-y-1">
                    {activeProject.terminalLines.map((line, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed">
                        <span className="text-white/30 mr-2">&gt;</span>
                        <span className={idx === activeProject.terminalLines.length - 1 ? "text-accent-mint font-semibold" : ""}>
                          {line}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-paper"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href={activeProject.githubUrl}
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
