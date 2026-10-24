"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, X, Check, Code2, Cpu, Shield, Layers, Radio, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface SystemDossier {
  id: string;
  code: string;
  name: string;
  role: string;
  summary: string;
  architecture: string[];
  metrics: string[];
  stack: string[];
  command: string;
  terminalLogs: string[];
  githubUrl: string;
  image: string;
  accent: string;
  accentGlow: string;
  gradient: string;
}

const SYSTEMS: SystemDossier[] = [
  {
    id: "victor",
    code: "SYS-01",
    name: "VICTOR — AI DESKTOP COPILOT",
    role: "Local-First AI Control Plane",
    summary:
      "A deterministic local control plane running completely on-device. Bridges voice input (faster-whisper), local LLM intent routing (phi3:mini via Ollama), and direct mouse/keyboard automation via WebSocket pipelines without ever exposing user data to the cloud.",
    architecture: [
      "Local-first inference: Audio transcription & language reasoning executed entirely on CPU/local GPU.",
      "Asynchronous WebSocket stream multiplexes voice streams, system telemetry, and action queues.",
      "Operator-in-the-loop: Drafts system automation actions, executing only with explicit confirmation.",
    ],
    metrics: ["100% Local Weights", "<350ms Voice STT", "0 Cloud Leaks"],
    stack: ["FastAPI", "Electron", "React", "Ollama (phi3)", "faster-whisper", "WebSockets"],
    command: "cat victor/architecture.log",
    terminalLogs: [
      "[DAEMON] Initializing phi3:mini local weights via Ollama...",
      "[AUDIO] faster-whisper stream listening on audio interface 0",
      "[CONTROL_PLANE] Electron IPC bridge attached; permissions locked",
      "[WS_SERVER] Handshake accepted on ws://127.0.0.1:8765/stream",
      "[STATUS] Ready. System operational with 0 external API calls.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    image: "/Projects/img_00015.jpg",
    accent: "#00f0ff",
    accentGlow: "rgba(0, 240, 255, 0.25)",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "context-engine",
    code: "SYS-02",
    name: "PERSISTENT CONTEXT ENGINE",
    role: "Operational Memory for Autonomous SRE",
    summary:
      "Context retrieval engine designed to resolve production incidents before human triage begins. Ingests high-frequency telemetry, transforms error distributions into MinHash signatures, and matches historical causal chains via Locality-Sensitive Hashing (LSH) in milliseconds.",
    architecture: [
      "Transforms unstructured incident logs and metric drift into dense MinHash representations.",
      "LSH index enables sub-linear approximate nearest neighbor retrieval across millions of historical vectors.",
      "FastAPI server surfaces matched runbooks and post-mortems with 100% recall@5 benchmarks.",
    ],
    metrics: ["~124ms P95 Latency", "100% Recall@5", "Sub-Linear Scaling"],
    stack: ["FastAPI", "Python", "React", "MinHash", "LSH", "Docker"],
    command: "python bench_retrieval.py --scale=100k",
    terminalLogs: [
      "Loading 100,000 synthetic incident vectors into LSH index...",
      "Index built in 1.42s across 16 hash bands (r=8, b=16).",
      "Query: 'Spindle telemetry drift machine-04 thermal cutoff'",
      "Matched: INC-2024-8842 with Jaccard similarity 0.941",
      "Recall@5: 100.0% | P95 Response Latency: 123.8ms | Status: OK",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    image: "/Projects/img_00030.jpg",
    accent: "#00ffb2",
    accentGlow: "rgba(0, 255, 178, 0.25)",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "gesture-scroll",
    code: "SYS-03",
    name: "GESTURE SCROLL",
    role: "Zero-Focus Computer Vision Automation",
    summary:
      "A computer-vision utility built for gamers and streamers: scrolls secondary background windows (documentation, chats, browsers) via webcam hand gestures without stealing active window focus or tripping anti-cheat hooks.",
    architecture: [
      "Bypasses invasive global mouse hooks; directly targets secondary window handles via async Win32 PostMessage & Linux XSendEvent.",
      "MediaPipe Hands @ complexity 0 runs at 4-7% CPU without requiring dedicated GPU acceleration.",
      "Universal mode injects scroll messages into Electron, Chrome, and desktop document readers.",
    ],
    metrics: ["4-7% CPU Usage", "0ms Focus Interruption", "Anti-Cheat Conscious"],
    stack: ["Python", "MediaPipe", "OpenCV", "Win32 API (PostMessage)", "Linux Xlib"],
    command: "python -m gesturescroll --target=auto-detect",
    terminalLogs: [
      "[GESTURE_INIT] Opening webcam stream @ 640x480 30FPS...",
      "[VISION] MediaPipe Hands model initialized (complexity: 0)",
      "[OS_HOOK] Active monitor 1 foreground: 'Modern Warfare III' (HWnd: 0x004F)",
      "[DETECTED] Gesture: Two-finger vertical scroll down (velocity: 240px/s)",
      "[DISPATCH] PostMessage dispatched to secondary window. Focus untouched.",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    image: "/Projects/img_00007.jpg",
    accent: "#f43f5e",
    accentGlow: "rgba(244, 63, 94, 0.25)",
    gradient: "from-rose-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "bharatauto",
    code: "SYS-04",
    name: "BHARATAUTO INDUSTRIAL DISPATCH",
    role: "Autonomous Manufacturing Dispatch & Telemetry",
    summary:
      "Real-time industrial IoT monitoring system engineered for MSME machining facilities. Ingests current, vibration, and thermal sensor payloads via MQTT, evaluates downtime anomalies via LangGraph agent workflows, and initiates emergency automated telephone alerts.",
    architecture: [
      "Low-overhead MQTT broker aggregates CNC sensor payloads with sub-50ms ingestion latency.",
      "LangGraph agent orchestrator models escalation policies based on historic failure patterns.",
      "Twilio Voice API integration dispatches automated real-time voice calls to plant supervisors.",
    ],
    metrics: ["Sub-50ms Ingestion", "Autonomous Phone Triage", "Production Tested"],
    stack: ["FastAPI", "MQTT", "LangGraph", "Twilio API", "PostgreSQL", "Next.js"],
    command: "curl -X POST https://api.bharatauto.internal/telemetry/evaluate",
    terminalLogs: [
      "HTTP/1.1 200 OK | Content-Type: application/json",
      "{ 'machine_id': 'CNC-08', 'temperature': '94.2C', 'risk_score': 0.89 }",
      "[SUPERVISOR_AGENT] Evaluated threshold exceedance. Anomaly high.",
      "[TWILIO_CLIENT] Initiating voice call to plant manager...",
      "[TWILIO_CLIENT] Call connected. Audio: 'Warning: Machine 8 thermal overload.'",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    image: "/Projects/img_00020.jpg",
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    id: "listny",
    code: "SYS-05",
    name: "LISTNY ACOUSTIC STREAMER",
    role: "Desktop Acoustic Streamer & Fingerprinter",
    summary:
      "Native Linux desktop utility capturing raw audio output directly from PulseAudio/PipeWire monitor sinks, generating Shazam-compatible acoustic fingerprints without commercial API keys, and auto-fetching synchronized Genius lyrics in real time.",
    architecture: [
      "Direct desktop audio capture from PipeWire monitor sinks without virtual audio cable drivers.",
      "Asynchronous ShazamIO protocol matches acoustic fingerprints within 2 seconds of playback.",
      "Local Gemma LLM generates background track annotations and artist context on the fly.",
    ],
    metrics: ["<2s Recognition", "0 API Keys Required", "Smart De-duping"],
    stack: ["Python", "PySide6 / Qt", "shazamio", "Genius API", "Local Gemma"],
    command: "listny --monitor=alsa_output.pci.monitor",
    terminalLogs: [
      "[AUDIO_MONITOR] PipeWire monitor sink attached (48000Hz, stereo)",
      "[FINGERPRINT] Captured 3.2s acoustic sample. Querying hash table...",
      "[MATCHED] Track: 'Starboy' by The Weeknd (confidence: 98.4%)",
      "[GENIUS_API] Resolved lyrics URL: https://genius.com/The-weeknd-starboy-lyrics",
      "[UI] Lyric viewport updated. Local Gemma generating track background insights...",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    image: "/Projects/img_00025.jpg",
    accent: "#d946ef",
    accentGlow: "rgba(217, 70, 239, 0.25)",
    gradient: "from-fuchsia-500/20 via-violet-500/10 to-transparent",
  },
];

export default function SystemDossiers() {
  const [activeDossier, setActiveDossier] = useState<SystemDossier | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDossier(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section id="projects" className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-24 bg-[#070814] border-t border-white/10 select-none overflow-hidden">
      {/* Chromatic ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-indigo-600/15 via-violet-600/10 to-transparent blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-transparent blur-[130px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>02 // ENGINEERED BLUEPRINTS</span>
            </div>
            <h2 className="mt-3 font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              System{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                Dossiers
              </span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs uppercase tracking-wider text-slate-400">
            Deterministic architectures built for latency, privacy, and low-level OS automation.
          </p>
        </div>

        {/* Dossiers List */}
        <div className="space-y-12">
          {SYSTEMS.map((system) => (
            <div
              key={system.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-[#0d1020]/90 to-[#070814] p-8 sm:p-10 transition-all duration-500 hover:border-white/30 backdrop-blur-xl"
              style={{
                boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 50px rgba(0, 0, 0, 0.6)`,
              }}
            >
              {/* Dynamic Accent Color Glow Top Rim */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${system.accent}, transparent)`,
                  boxShadow: `0 0 20px ${system.accent}`,
                }}
              />

              {/* Dossier Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-4">
                  <span
                    className="rounded-lg border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: `${system.accent}50`,
                      backgroundColor: `${system.accent}15`,
                      color: system.accent,
                      boxShadow: `0 0 15px ${system.accent}25`,
                    }}
                  >
                    {system.code}
                  </span>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    {system.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {system.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-slate-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blueprint Content Grid */}
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left: Summary & Architecture (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <h3
                    className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white transition-colors duration-300"
                  >
                    {system.name}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                    {system.summary}
                  </p>

                  {/* Key Pillars */}
                  <div className="space-y-2.5 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs text-slate-300">
                    {system.architecture.map((arch, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: system.accent }}
                        />
                        <span className="leading-snug">{arch}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Pills with colored badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {system.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1 font-mono text-[11px] text-white/90 hover:border-white/30 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setActiveDossier(system)}
                      className="group/btn flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 active:scale-95 shadow-lg"
                      style={{
                        backgroundColor: system.accent,
                        boxShadow: `0 0 25px ${system.accentGlow}`,
                      }}
                      data-cursor="hover"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>Inspect Runbook</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <a
                      href={system.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-xs text-slate-300 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                      data-cursor="hover"
                    >
                      <SiGithub className="h-4 w-4" />
                      <span>Source Blueprint</span>
                    </a>
                  </div>
                </div>

                {/* Right: Simulated Live Terminal Runbook (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#090b16] shadow-2xl">
                    {/* Terminal Top Chrome */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#f43f5e]" />
                        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        {system.id}.sh — zsh
                      </span>
                      <span
                        className="h-2 w-2 rounded-full animate-pulse"
                        style={{ backgroundColor: system.accent }}
                      />
                    </div>

                    {/* Terminal Body */}
                    <div className="p-5 font-mono text-xs space-y-3">
                      <div className="flex items-center gap-2" style={{ color: system.accent }}>
                        <span className="text-white/40">$</span>
                        <span className="font-semibold">{system.command}</span>
                      </div>

                      <div className="space-y-1.5 text-slate-400 text-[11px] border-t border-white/5 pt-3">
                        {system.terminalLogs.map((log, i) => (
                          <div key={i} className="leading-relaxed">
                            {log.startsWith("[") ? (
                              <>
                                <span style={{ color: system.accent }} className="font-semibold">
                                  {log.slice(0, log.indexOf("]") + 1)}
                                </span>{" "}
                                <span className="text-slate-300">{log.slice(log.indexOf("]") + 1)}</span>
                              </>
                            ) : (
                              <span className="text-slate-300">{log}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/5">
                        <span className="flex items-center gap-1.5">
                          <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
                          <span>PIPELINE HEALTHY</span>
                        </span>
                        <span className="font-mono uppercase text-slate-400">P95 ~ 124ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide-Over Modal Dossier Detail ── */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDossier(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-[#0a0c1a] p-6 sm:p-8 md:p-10 text-white shadow-2xl"
              style={{
                boxShadow: `0 0 60px ${activeDossier.accentGlow}`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-md border px-2.5 py-0.5 font-mono text-xs font-bold"
                      style={{
                        borderColor: `${activeDossier.accent}50`,
                        backgroundColor: `${activeDossier.accent}20`,
                        color: activeDossier.accent,
                      }}
                    >
                      {activeDossier.code}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      {activeDossier.role}
                    </span>
                  </div>
                  <h3 className="mt-2 font-sans text-2xl sm:text-3xl font-black uppercase text-white">
                    {activeDossier.name}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveDossier(null)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-6 pt-6 font-mono text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-2">Summary</h4>
                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {activeDossier.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3">
                    Architectural Tenets
                  </h4>
                  <ul className="space-y-2">
                    {activeDossier.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <Check
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: activeDossier.accent }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3">
                    Verified Execution Log
                  </h4>
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-[11px] space-y-2 text-slate-300">
                    <div style={{ color: activeDossier.accent }}>$ {activeDossier.command}</div>
                    {activeDossier.terminalLogs.map((log, i) => (
                      <div key={i} className="text-slate-400">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={activeDossier.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10 transition-colors"
                  >
                    <SiGithub className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>

                  <button
                    onClick={() => setActiveDossier(null)}
                    className="rounded-full px-5 py-2.5 font-bold text-black"
                    style={{ backgroundColor: activeDossier.accent }}
                  >
                    Done
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
