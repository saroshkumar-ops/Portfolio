"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, X, Check, Code2, Cpu, Shield, Layers } from "lucide-react";
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
    image: "/Projects/img_00045.jpg",
    accent: "#9d4edd",
  },
  {
    id: "bharat-auto",
    code: "SYS-04",
    name: "BHARAT AUTO",
    role: "Industrial IoT & Multi-Agent Operations",
    summary:
      "Manufacturing plant ops console streaming 12-machine CNC telemetry into 3 ML risk models with automated Twilio voice escalations. 5 collaborating LLM agents continuously evaluate machine drift and dispatch automated alerts directly to plant floor managers.",
    architecture: [
      "Distributed microservices: Spring Boot handles sensor gateway; FastAPI manages ML risk evaluations.",
      "5 autonomous agents (Maintenance, Production, Supply Chain, Orchestrator, Supervisor).",
      "Twilio Voice API integration escalates emergency thermal shutdowns directly via synthesized telephone calls.",
    ],
    metrics: ["5s Telemetry Loop", "5 Cooperating Agents", "Direct Voice Escalation"],
    stack: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "LLaMA-3.3-70B", "Twilio"],
    command: "curl -X POST https://api.bharatauto.io/telemetry/simulate",
    terminalLogs: [
      "HTTP/1.1 200 OK | Content-Type: application/json",
      "{ 'machine_id': 'CNC-08', 'temperature': '94.2C', 'risk_score': 0.89 }",
      "[SUPERVISOR_AGENT] Evaluated threshold exceedance. Anomaly high.",
      "[TWILIO_CLIENT] Initiating voice call to plant manager...",
      "[TWILIO_CLIENT] Call connected. Audio: 'Warning: Machine 8 thermal overload.'",
    ],
    githubUrl: "https://github.com/saroshkumar-ops",
    image: "/Projects/img_00060.jpg",
    accent: "#f5a623",
  },
  {
    id: "listny",
    code: "SYS-05",
    name: "LISTNY",
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
    image: "/Projects/img_00070.jpg",
    accent: "#ff007f",
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
    <section id="projects" className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-24 bg-[#050608] border-t border-white/10 select-none">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
              <span>02</span>
              <span className="text-white/20">{"//"}</span>
              <span>ENGINEERED BLUEPRINTS</span>
            </div>
            <h2 className="mt-3 font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              System Dossiers
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs uppercase tracking-wider text-paper-muted">
            Deterministic architectures built for latency, privacy, and low-level OS automation.
          </p>
        </div>

        {/* Dossiers List */}
        <div className="space-y-12">
          {SYSTEMS.map((system) => (
            <div
              key={system.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d12] p-8 sm:p-10 transition-all duration-500 hover:border-white/30 hover:bg-[#10121a]"
            >
              {/* Dossier Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-4">
                  <span className="rounded-md border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#00f0ff]">
                    {system.code}
                  </span>
                  <span className="font-mono text-xs text-paper-subtle uppercase tracking-wider">
                    {system.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {system.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/80"
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
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                    {system.name}
                  </h3>

                  <p className="text-base sm:text-lg text-paper-muted leading-relaxed font-light">
                    {system.summary}
                  </p>

                  {/* Key Pillars */}
                  <div className="space-y-2.5 rounded-2xl border border-white/5 bg-black/40 p-5 font-mono text-xs text-paper-muted">
                    {system.architecture.map((arch, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-[#00f0ff] mt-0.5" />
                        <span className="leading-snug">{arch}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {system.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setActiveDossier(system)}
                      className="group/btn flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#00f0ff] hover:scale-105 active:scale-95"
                      data-cursor="hover"
                    >
                      <Terminal className="h-3.5 w-3.5" />
                      <span>Inspect Runbook</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <a
                      href={system.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs font-semibold text-paper hover:bg-white/10 transition-colors"
                      data-cursor="hover"
                    >
                      <SiGithub className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>

                {/* Right: Simulated Terminal Frame (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/90 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[11px] text-paper-subtle">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-paper-muted">$ {system.command}</span>
                      </div>
                      <span className="text-[10px] text-[#00f0ff]">ONLINE</span>
                    </div>

                    <div className="p-4 font-mono text-[11px] text-paper-muted space-y-1.5">
                      {system.terminalLogs.map((line, idx) => (
                        <p key={idx} className="leading-snug">
                          <span className="text-white/30 mr-2">&gt;</span>
                          <span className={idx === system.terminalLogs.length - 1 ? "text-[#00f0ff] font-semibold" : ""}>
                            {line}
                          </span>
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-4 py-2 font-mono text-[10px] text-paper-subtle">
                      <span>STATUS: EXIT 0</span>
                      <span className="text-emerald-400 font-semibold">{system.metrics[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Terminal Inspection Modal */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDossier(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-[#0c0d12] p-6 shadow-2xl sm:p-8 md:p-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#00f0ff] uppercase">
                    SYSTEM RUNBOOK // {activeDossier.code}
                  </span>
                  <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black uppercase text-white">
                    {activeDossier.name}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveDossier(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper-muted hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-paper-subtle">
                    [ Engineering Architecture ]
                  </h4>
                  <p className="mt-2 text-base text-paper leading-relaxed font-light">
                    {activeDossier.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeDossier.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                      <span className="font-mono text-xs font-bold text-[#00f0ff]">{m}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-paper-muted">
                    <Terminal className="h-3.5 w-3.5 text-[#00f0ff]" />
                    <span>bash ~ {activeDossier.command}</span>
                  </div>
                  <div className="rounded-b-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-paper-muted space-y-1">
                    {activeDossier.terminalLogs.map((line, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed">
                        <span className="text-white/30 mr-2">&gt;</span>
                        <span className={idx === activeDossier.terminalLogs.length - 1 ? "text-[#00f0ff] font-semibold" : ""}>
                          {line}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {activeDossier.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-paper"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href={activeDossier.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2 font-mono text-xs font-bold text-black hover:bg-[#00f0ff] transition-colors"
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
