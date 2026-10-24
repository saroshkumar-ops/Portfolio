"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, X, Check, Code2, Cpu, Shield, Layers, Radio, MoveRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface Project {
  id: string;
  code: string;
  title: string;
  role: string;
  tagline: string;
  summary: string;
  highlights: string[];
  metrics: string[];
  tags: string[];
  image: string;
  accent: string;
  githubUrl: string;
  command: string;
  logs: string[];
}

const PROJECTS: Project[] = [
  {
    id: "victor",
    code: "// PROJECT_01",
    title: "VICTOR — AI DESKTOP COPILOT",
    role: "Local-First Control Plane",
    tagline: "Voice-driven on-device operating system automation.",
    summary:
      "A deterministic local control plane running completely on-device. Bridges voice input (faster-whisper), local LLM intent routing (phi3:mini via Ollama), and direct mouse/keyboard automation via WebSocket pipelines without ever exposing user data to cloud APIs.",
    highlights: [
      "100% local weights running on device CPU/GPU.",
      "Asynchronous WebSocket stream multiplexes audio and action queues.",
      "Human-in-the-loop: draft actions execute only with explicit operator confirmation.",
    ],
    metrics: ["100% Local Inference", "<350ms Voice STT", "0 Cloud Leaks"],
    tags: ["#FastAPI", "#Electron", "#React", "#phi3:mini", "#faster-whisper", "#WebSockets"],
    image: "/Projects/img_00015.jpg",
    accent: "#d4ff00",
    githubUrl: "https://github.com/saroshkumar-ops",
    command: "python -m victor.daemon --listen=local",
    logs: [
      "[DAEMON] Initializing phi3:mini local weights via Ollama...",
      "[AUDIO] faster-whisper stream listening on audio interface 0",
      "[CONTROL_PLANE] Electron IPC bridge attached; permissions locked",
      "[WS_SERVER] Handshake accepted on ws://127.0.0.1:8765/stream",
      "[STATUS] Ready. System operational with 0 external API calls.",
    ],
  },
  {
    id: "context-engine",
    code: "// PROJECT_02",
    title: "PERSISTENT CONTEXT ENGINE",
    role: "Autonomous SRE Memory",
    tagline: "Sub-second incident vector retrieval via MinHash & LSH.",
    summary:
      "Context retrieval engine designed to resolve production incidents before human triage begins. Ingests high-frequency telemetry, transforms error distributions into MinHash signatures, and matches historical causal chains via Locality-Sensitive Hashing (LSH) in milliseconds.",
    highlights: [
      "MinHash representations encode telemetry distributions into dense compact vectors.",
      "Sub-linear approximate nearest neighbor retrieval across millions of historical vectors.",
      "FastAPI server surfaces matched runbooks with 100% recall@5 benchmarks.",
    ],
    metrics: ["~124ms P95 Latency", "100% Recall@5", "Sub-Linear Scaling"],
    tags: ["#FastAPI", "#Python", "#MinHash", "#LSH", "#Docker", "#Telemetry"],
    image: "/Projects/img_00030.jpg",
    accent: "#0066ff",
    githubUrl: "https://github.com/saroshkumar-ops",
    command: "python bench_retrieval.py --scale=100k",
    logs: [
      "Loading 100,000 synthetic incident vectors into LSH index...",
      "Index built in 1.42s across 16 hash bands (r=8, b=16).",
      "Query: 'Spindle telemetry drift machine-04 thermal cutoff'",
      "Matched: INC-2024-8842 with Jaccard similarity 0.941",
      "Recall@5: 100.0% | P95 Response Latency: 123.8ms | Status: OK",
    ],
  },
  {
    id: "gesture-scroll",
    code: "// PROJECT_03",
    title: "GESTURE SCROLL",
    role: "Zero-Focus Computer Vision",
    tagline: "Scroll background windows via webcam gestures without stealing game focus.",
    summary:
      "A computer-vision utility built for gamers and streamers: scrolls secondary background windows (documentation, chats, browsers) via webcam hand gestures without stealing active window focus or tripping anti-cheat hooks.",
    highlights: [
      "Bypasses invasive global mouse hooks; directly targets secondary window handles via Win32 PostMessage.",
      "MediaPipe Hands @ complexity 0 runs at 4-7% CPU without requiring dedicated GPU acceleration.",
      "Universal mode injects scroll messages into Electron, Chrome, and desktop document readers.",
    ],
    metrics: ["4-7% CPU Usage", "0ms Focus Interruption", "Anti-Cheat Safe"],
    tags: ["#Python", "#MediaPipe", "#OpenCV", "#Win32PostMessage", "#LinuxXlib"],
    image: "/Projects/img_00007.jpg",
    accent: "#ff3b00",
    githubUrl: "https://github.com/saroshkumar-ops",
    command: "python -m gesturescroll --target=auto-detect",
    logs: [
      "[GESTURE_INIT] Opening webcam stream @ 640x480 30FPS...",
      "[VISION] MediaPipe Hands model initialized (complexity: 0)",
      "[OS_HOOK] Active monitor 1 foreground: 'Modern Warfare III' (HWnd: 0x004F)",
      "[DETECTED] Gesture: Two-finger vertical scroll down (velocity: 240px/s)",
      "[DISPATCH] PostMessage dispatched to secondary window. Focus untouched.",
    ],
  },
  {
    id: "bharatauto",
    code: "// PROJECT_04",
    title: "BHARATAUTO INDUSTRIAL DISPATCH",
    role: "Autonomous Manufacturing IoT",
    tagline: "MQTT sensor ingestion and LangGraph automated voice triage.",
    summary:
      "Real-time industrial IoT monitoring system engineered for MSME machining facilities. Ingests current, vibration, and thermal sensor payloads via MQTT, evaluates downtime anomalies via LangGraph agent workflows, and initiates emergency automated telephone alerts.",
    highlights: [
      "Low-overhead MQTT broker aggregates CNC sensor payloads with sub-50ms ingestion latency.",
      "LangGraph agent orchestrator models escalation policies based on historic failure patterns.",
      "Twilio Voice API integration dispatches automated real-time voice calls to plant supervisors.",
    ],
    metrics: ["Sub-50ms Ingestion", "Autonomous Phone Triage", "Production Tested"],
    tags: ["#FastAPI", "#MQTT", "#LangGraph", "#TwilioAPI", "#PostgreSQL", "#Next.js"],
    image: "/Projects/img_00020.jpg",
    accent: "#f59e0b",
    githubUrl: "https://github.com/saroshkumar-ops",
    command: "curl -X POST https://api.bharatauto.internal/telemetry/evaluate",
    logs: [
      "HTTP/1.1 200 OK | Content-Type: application/json",
      "{ 'machine_id': 'CNC-08', 'temperature': '94.2C', 'risk_score': 0.89 }",
      "[SUPERVISOR_AGENT] Evaluated threshold exceedance. Anomaly high.",
      "[TWILIO_CLIENT] Initiating voice call to plant manager...",
      "[TWILIO_CLIENT] Call connected. Audio: 'Warning: Machine 8 thermal overload.'",
    ],
  },
  {
    id: "listny",
    code: "// PROJECT_05",
    title: "LISTNY ACOUSTIC STREAMER",
    role: "Desktop Acoustic Fingerprinting",
    tagline: "Captures PulseAudio/PipeWire monitor sinks with real-time lyric sync.",
    summary:
      "Native Linux desktop utility capturing raw audio output directly from PulseAudio/PipeWire monitor sinks, generating Shazam-compatible acoustic fingerprints without commercial API keys, and auto-fetching synchronized Genius lyrics in real time.",
    highlights: [
      "Direct desktop audio capture from PipeWire monitor sinks without virtual audio cable drivers.",
      "Asynchronous ShazamIO protocol matches acoustic fingerprints within 2 seconds of playback.",
      "Local Gemma LLM generates background track annotations and artist context on the fly.",
    ],
    metrics: ["<2s Recognition", "0 API Keys Required", "Smart De-duping"],
    tags: ["#Python", "#PySide6", "#Qt", "#shazamio", "#GeniusAPI", "#LocalGemma"],
    image: "/Projects/img_00025.jpg",
    accent: "#ff007f",
    githubUrl: "https://github.com/saroshkumar-ops",
    command: "listny --monitor=alsa_output.pci.monitor",
    logs: [
      "[AUDIO_MONITOR] PipeWire monitor sink attached (48000Hz, stereo)",
      "[FINGERPRINT] Captured 3.2s acoustic sample. Querying hash table...",
      "[MATCHED] Track: 'Starboy' by The Weeknd (confidence: 98.4%)",
      "[GENIUS_API] Resolved lyrics URL: https://genius.com/The-weeknd-starboy-lyrics",
      "[UI] Lyric viewport updated. Local Gemma generating track background insights...",
    ],
  },
];

export default function CreativeProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-20 border-b border-white/10 bg-[#090a10] select-none text-white"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header with Swiss Architectural Framing */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8 mb-16 font-mono text-xs">
          <div>
            <div className="flex items-center gap-2 text-[#d4ff00]">
              <span>[ 02 // SELECTED WORKS ]</span>
              <span className="text-white/20">/</span>
              <span>ENGINEERED ARTIFACTS</span>
            </div>
            <h2 className="mt-3 font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Tactile{" "}
              <span className="text-[#d4ff00] underline decoration-2 underline-offset-8">
                Blueprints.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-400 font-sans text-sm leading-relaxed">
            Five production systems engineered for low-latency, deterministic execution, and zero cloud surveillance.
          </p>
        </div>

        {/* Project Cards (Tactile Slide & Tilt inspired by creativeed.dev) */}
        <div className="space-y-16">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl border border-white/10 bg-[#0e1017] p-6 sm:p-10 transition-all duration-500 hover:border-white/30 hover:bg-[#121520]"
            >
              {/* Card Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span
                    className="font-bold tracking-wider"
                    style={{ color: project.accent }}
                  >
                    {project.code}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="text-slate-300 font-medium uppercase tracking-wider">
                    {project.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-slate-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid: Details (7 cols) + Screenshot Frame (5 cols) */}
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="font-sans text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Highlights Pillar */}
                  <div className="space-y-2.5 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs text-slate-300">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#d4ff00]" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-400 hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs uppercase tracking-wider">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group/btn flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-bold text-black transition-all hover:bg-[#d4ff00] hover:scale-105"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>[ Inspect Runbook ]</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-slate-300 hover:border-white/40 hover:text-white transition-colors"
                    >
                      <SiGithub className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Screenshot Visual Column with Tilt Frame */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group/img relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                      {/* Overlay badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-white">
                        <span className="rounded-full bg-black/70 px-3 py-1 backdrop-blur-md border border-white/10">
                          {project.metrics[0]}
                        </span>
                        <span className="flex items-center gap-1 text-[#d4ff00] font-bold">
                          <span>Inspect</span>
                          <MoveRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-Over Modal for Full Blueprint Runbook */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-[#0e1017] p-6 sm:p-8 md:p-10 text-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#d4ff00]">
                    {selectedProject.code}
                  </span>
                  <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black uppercase">
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-xs text-slate-400 mt-1 uppercase">
                    {selectedProject.tagline}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 pt-6 font-mono text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-2">
                    System Architecture
                  </h4>
                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-2">
                    Verified Execution Stream
                  </h4>
                  <div className="rounded-2xl border border-white/10 bg-black/70 p-5 font-mono text-xs space-y-2 text-slate-300">
                    <div className="text-[#d4ff00] font-semibold">$ {selectedProject.command}</div>
                    <div className="border-t border-white/10 pt-3 space-y-1 text-slate-400">
                      {selectedProject.logs.map((log, i) => (
                        <div key={i}>{log}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10"
                  >
                    <SiGithub className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-[#d4ff00] px-5 py-2.5 font-bold text-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
