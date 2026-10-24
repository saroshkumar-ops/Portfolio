"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Terminal as TerminalIcon, Code2, Cpu, CheckCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  stack: string[];
  metrics: string[];
  architectureDetails: string[];
  command: string;
  terminalOutput: string[];
  githubUrl?: string;
  previewImage?: string;
  accent: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "victor",
    number: "001",
    title: "Victor — AI Desktop Copilot",
    category: "AI Control Plane & Autonomous Desktop",
    summary: "A local-first AI desktop assistant with voice interaction, real-time WebSocket communication, and safe system automation.",
    description: "Victor is not another chat wrapper — it is a local control plane with personality modes, persistent memory, and deterministic execution. It takes voice in via faster-whisper, synthesizes TTS via espeak-ng, drives media, mouse, and keyboard, and watches Copilot/VS Code logs to proactively alert the engineer.",
    stack: ["FastAPI", "Electron", "React", "Ollama (phi3:mini)", "faster-whisper", "WebSockets"],
    metrics: ["<350ms Voice STT Latency", "100% Local Inference", "Zero Cloud Leaks"],
    architectureDetails: [
      "Local-first architecture ensures all audio transcription and model weights reside on-device.",
      "Asynchronous WebSocket pipeline multiplexes voice, telemetry, and system action queues.",
      "Explicit permission guardrails: drafts emails/messages, requiring operator confirmation before sending.",
    ],
    command: "cat victor/architecture.log",
    terminalOutput: [
      "[VICTOR_DAEMON] Initializing phi3:mini local weights via Ollama...",
      "[AUDIO_SUBSYSTEM] faster-whisper stream listening on audio interface 0",
      "[CONTROL_PLANE] Electron IPC bridge attached; permissions locked",
      "[WS_SERVER] Handshake accepted on ws://127.0.0.1:8765/stream",
      "[STATUS] Ready. System operational with 0 external API calls.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    previewImage: "/Projects/img_00015.jpg",
    accent: "#00ffb2",
  },
  {
    id: "persistent-context-engine",
    number: "002",
    title: "Persistent Context Engine",
    category: "Autonomous SRE & Historical Retrieval",
    summary: "Operational memory engine for autonomous SRE incident recovery with ~124ms p95 latency and 100% recall@5.",
    description: "When complex production incidents strike, engineers lose crucial time researching prior post-mortems. The Persistent Context Engine ingests telemetry, generates MinHash signatures over error distributions, and reconstructs historical causal chains in milliseconds using Locality-Sensitive Hashing (LSH).",
    stack: ["FastAPI", "Python", "React", "MinHash", "LSH", "Docker"],
    metrics: ["~124ms p95 Latency", "100% Recall@5 Benchmarks", "Sub-linear Search Time"],
    architectureDetails: [
      "Transforms unstructured incident logs and metric anomalies into dense MinHash representations.",
      "LSH index allows sub-linear approximate nearest neighbor retrieval across millions of log vectors.",
      "FastAPI server surfaces matched remediation runbooks straight to SRE command consoles.",
    ],
    command: "python bench_retrieval.py --scale=100k",
    terminalOutput: [
      "Loading 100,000 synthetic incident vectors into LSH index...",
      "Index built in 1.42s across 16 hash bands (r=8, b=16).",
      "Query: 'Spindle telemetry drift machine-04 thermal cutoff'",
      "Matched: INC-2024-8842 with Jaccard similarity 0.941",
      "Recall@5: 100.0% | P95 Response Latency: 123.8ms | Status: OK",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    previewImage: "/Projects/img_00030.jpg",
    accent: "#00d2ff",
  },
  {
    id: "gesture-scroll",
    number: "003",
    title: "GestureScroll",
    category: "Computer Vision & OS Automation",
    summary: "Scrolls background applications via hand gestures without stealing focus or triggering anti-cheat hooks.",
    description: "Designed for streamers, developers, and gamers: scrolls background windows (browsers, documentation, Discord) using lightweight MediaPipe hand tracking via webcam, while your primary window stays completely focused with zero alt-tabbing.",
    stack: ["Python", "MediaPipe", "OpenCV", "Win32 API (PostMessage)", "Linux Xlib"],
    metrics: ["4-7% CPU Usage", "0ms Focus Interruption", "Anti-Cheat Conscious"],
    architectureDetails: [
      "Bypasses invasive global mouse hooks; directly targets secondary window handles via async PostMessage/XSendEvent.",
      "MediaPipe Hands running at complexity 0 ensures ultralow CPU footprint without requiring dedicated GPU.",
      "Universal mode injects scroll messages into Electron, Chrome, and desktop document readers.",
    ],
    command: "python -m gesturescroll --target=auto-detect",
    terminalOutput: [
      "[GESTURE_INIT] Opening webcam stream @ 640x480 30FPS...",
      "[VISION] MediaPipe Hands model initialized (complexity: 0)",
      "[OS_HOOK] Active monitor 1 foreground: 'Modern Warfare III' (HWnd: 0x004F)",
      "[DETECTED] Gesture: Two-finger vertical scroll down (velocity: 240px/s)",
      "[DISPATCH] PostMessage(0x00A1, WM_MOUSEWHEEL, wParam, lParam) dispatched. Focus untouched.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    previewImage: "/Projects/img_00045.jpg",
    accent: "#9d4edd",
  },
  {
    id: "bharat-auto",
    number: "004",
    title: "BharatAuto — Smart Manufacturing Ops",
    category: "Industrial IoT & Multi-Agent Systems",
    summary: "Smart-manufacturing console streaming 12-machine CNC telemetry into 3 ML risk models with automated Twilio voice escalations.",
    description: "An industrial telemetry console for manufacturing plants. Connects Next.js, Spring Boot, and FastAPI to stream live machine sensor data every 5 seconds. 5 collaborating LLM agents evaluate production risk, and critical anomalies escalate immediately to floor supervisors via real Twilio automated phone calls.",
    stack: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "LLaMA-3.3-70B", "Twilio"],
    metrics: ["5-Second Telemetry Loop", "5 Cooperating LLM Agents", "Direct Voice Escalation"],
    architectureDetails: [
      "Distributed architecture: Spring Boot handles sensor gateway; FastAPI manages ML inferences.",
      "5 autonomous agents (Maintenance, Production, Supply Chain, Orchestrator, Supervisor).",
      "Direct Twilio Voice API integration escalates emergency shutdown risks to human plant managers in real time.",
    ],
    command: "curl -X POST https://api.bharatauto.io/telemetry/simulate",
    terminalOutput: [
      "HTTP/1.1 200 OK | Content-Type: application/json",
      "{ 'machine_id': 'CNC-08', 'temperature': '94.2C', 'risk_score': 0.89 }",
      "[SUPERVISOR_AGENT] Evaluated threshold exceedance. Anomaly high.",
      "[TWILIO_CLIENT] Initiating voice call to plant manager (+91 98XXX XXXXX)...",
      "[TWILIO_CLIENT] Call connected. Audio synthesized: 'Warning: Machine 8 thermal overload.'",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    previewImage: "/Projects/img_00060.jpg",
    accent: "#ff9e00",
  },
  {
    id: "listny",
    number: "005",
    title: "Listny — Linux Acoustic Desktop Streamer",
    category: "Acoustic Fingerprinting & Desktop GUI",
    summary: "Desktop acoustic fingerprinting that recognizes what's playing in speaker output and opens lyrics before the chorus hits.",
    description: "A native Linux desktop application built with PySide6 that listens to desktop audio playback, generates Shazam-style acoustic fingerprints without requiring commercial API keys, de-duplicates songs, and auto-fetches Genius lyrics in real-time.",
    stack: ["Python", "PySide6 / Qt", "shazamio", "Genius API", "Local Gemma"],
    metrics: ["<2s Acoustic Recognition", "0 API Keys Required", "Smart De-duping"],
    architectureDetails: [
      "Pulls raw desktop audio buffer directly from PulseAudio / PipeWire monitor sinks.",
      "Runs Shazam-compatible acoustic fingerprint hashing via async shazamio protocols.",
      "Embedded QtWebEngine window presents dynamic Genius lyric annotations synchronously.",
    ],
    command: "listny --monitor=alsa_output.pci.monitor",
    terminalOutput: [
      "[AUDIO_MONITOR] PipeWire monitor sink attached (48000Hz, stereo)",
      "[FINGERPRINT] Captured 3.2s acoustic sample. Querying hash table...",
      "[MATCHED] Track: 'Starboy' by The Weeknd (confidence: 98.4%)",
      "[GENIUS_API] Resolved lyrics URL: https://genius.com/The-weeknd-starboy-lyrics",
      "[UI] Lyric viewport updated. Local Gemma generating track background insights...",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    previewImage: "/Projects/img_00070.jpg",
    accent: "#ff007f",
  },
];

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates for floating preview card
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Close modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative px-6 py-24 sm:px-10 md:px-16 lg:px-20"
    >
      {/* Section Header */}
      <div className="mb-14 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
          <span>02</span>
          <span className="text-white/20">{"//"}</span>
          <span>SELECTED WORK &amp; ARCHITECTURES</span>
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Engineered From Scratch. <br />
          <span className="text-paper-muted">Tested In Production.</span>
        </h2>
        <p className="mt-4 text-base text-paper-muted leading-relaxed">
          Hover over any system to preview telemetry. Click to inspect full architecture diagrams, command outputs, and engineering specifications.
        </p>
      </div>

      {/* Projects List Table */}
      <div className="divide-y divide-white/10 border-y border-white/10">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative flex flex-col justify-between py-8 transition-all duration-300 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:py-10 cursor-pointer"
            data-cursor="view"
            data-cursor-text="INSPECT"
          >
            {/* Left: Number, Title & Category */}
            <div className="flex items-start gap-6 sm:items-center sm:gap-10">
              <span className="font-mono text-xs sm:text-sm font-semibold text-paper-subtle transition-colors group-hover:text-accent-mint">
                {project.number}
              </span>

              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent-mint">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-paper-muted font-mono">
                  {project.category}
                </p>
              </div>
            </div>

            {/* Right: Stack badges & arrow */}
            <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:justify-end">
              <div className="hidden lg:flex items-center gap-2">
                {project.stack.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-paper-subtle"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper transition-all duration-300 group-hover:scale-110 group-hover:border-accent-mint group-hover:bg-accent-mint group-hover:text-black">
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor Preview Thumbnail (Creative Ed style) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x + 24,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-72 overflow-hidden rounded-2xl border border-white/20 bg-ink-card/95 p-3 shadow-2xl shadow-black/80 backdrop-blur-xl"
          >
            {/* Thumbnail Frame */}
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-ink-soft">
              {hoveredProject.previewImage ? (
                <Image
                  src={hoveredProject.previewImage}
                  alt={hoveredProject.title}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center"
                  style={{ background: `radial-gradient(circle, ${hoveredProject.accent}33 0%, #07080a 80%)` }}
                >
                  <Cpu className="h-10 w-10 text-white/40" />
                </div>
              )}
              <div className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] text-accent-mint backdrop-blur-md">
                {hoveredProject.number}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs font-bold text-white truncate">{hoveredProject.title}</p>
              <p className="mt-1 text-[11px] text-paper-muted line-clamp-2 leading-tight">
                {hoveredProject.summary}
              </p>
              <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-paper-subtle border-t border-white/10 pt-2">
                <span>{hoveredProject.metrics[0]}</span>
                <span className="text-accent-mint font-semibold">CLICK TO EXPAND</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Deep Dive Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-ink-card p-6 shadow-2xl shadow-black sm:p-8 md:p-10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent-mint">
                    PROJECT SPECIFICATION // {selectedProject.number}
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 text-sm text-paper-muted font-mono">{selectedProject.category}</p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper-muted hover:bg-white/10 hover:text-white transition-colors"
                  data-cursor="hover"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="mt-6 space-y-8">
                {/* Description */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-paper-subtle">
                    [ SYSTEM ARCHITECTURE &amp; SCOPE ]
                  </h4>
                  <p className="mt-2 text-base text-paper leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Architecture Highlights & Metrics */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <h5 className="flex items-center gap-2 font-mono text-xs font-semibold text-accent-mint">
                      <Cpu className="h-4 w-4" />
                      <span>KEY ARCHITECTURAL PILLARS</span>
                    </h5>
                    <ul className="mt-3 space-y-2 text-xs text-paper-muted">
                      {selectedProject.architectureDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 shrink-0 text-accent-mint mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <h5 className="flex items-center gap-2 font-mono text-xs font-semibold text-white">
                      <Code2 className="h-4 w-4 text-accent-mint" />
                      <span>PERFORMANCE BENCHMARKS</span>
                    </h5>
                    <div className="mt-3 space-y-2">
                      {selectedProject.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 px-3 py-2 font-mono text-xs"
                        >
                          <span className="text-paper-subtle">Target {idx + 1}</span>
                          <span className="font-bold text-accent-mint">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulated CLI Terminal Output */}
                <div>
                  <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-paper-muted">
                    <div className="flex items-center gap-2">
                      <TerminalIcon className="h-3.5 w-3.5 text-accent-mint" />
                      <span>bash ~ {selectedProject.command}</span>
                    </div>
                    <span className="text-[10px] text-paper-subtle">STATUS: EXIT 0</span>
                  </div>
                  <div className="rounded-b-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-paper-muted space-y-1">
                    {selectedProject.terminalOutput.map((line, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed">
                        <span className="text-white/30 mr-2">&gt;</span>
                        <span className={idx === selectedProject.terminalOutput.length - 1 ? "text-accent-mint font-semibold" : ""}>
                          {line}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-paper"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-accent-mint transition-colors"
                      data-cursor="hover"
                    >
                      <SiGithub className="h-4 w-4" />
                      <span>View Source on GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
