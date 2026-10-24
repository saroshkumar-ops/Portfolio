"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Layers,
  Terminal as TerminalIcon,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
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

interface TelemetryLog {
  id: string;
  time: string;
  event: string;
  latency: string;
  status: "RESOLVED" | "INGESTING" | "MATCHED";
}

const INITIAL_LOGS: TelemetryLog[] = [
  { id: "INC-8921", time: "01:21:04", event: "Sensor drift detected: Machine-04 spindle heat", latency: "118ms", status: "RESOLVED" },
  { id: "INC-8922", time: "01:21:45", event: "MinHash signature generated for node memory spike", latency: "124ms", status: "MATCHED" },
  { id: "INC-8923", time: "01:22:12", event: "Ollama phi3:mini invoked for desktop voice intent", latency: "89ms", status: "RESOLVED" },
  { id: "INC-8924", time: "01:22:58", event: "GestureScroll background scroll injected via Win32 PostMessage", latency: "4ms", status: "RESOLVED" },
];

const TECH_STACK = [
  { name: "Python", category: "Core", icon: SiPython },
  { name: "FastAPI", category: "Backend", icon: SiFastapi },
  { name: "Next.js 16", category: "Frontend", icon: SiNextdotjs },
  { name: "React 19", category: "Frontend", icon: SiReact },
  { name: "Electron", category: "Desktop", icon: SiElectron },
  { name: "Ollama (phi3 / gemma)", category: "AI/ML", icon: SiOllama },
  { name: "MediaPipe & OpenCV", category: "Vision", icon: VisionIcon },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql },
  { name: "Docker", category: "Infra", icon: SiDocker },
  { name: "Linux / Win32", category: "Systems", icon: SiLinux },
];

export default function ArchitectureBento() {
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateNewIncident = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const id = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const time = now.toTimeString().split(" ")[0];
      const latencies = ["112ms", "124ms", "98ms", "131ms", "105ms"];
      const events = [
        "Historical causal chain reconstructed via LSH bucket",
        "Autonomous agent escalated severity via Twilio payload",
        "Acoustic fingerprint matched in shazamio cache",
        "XSendEvent routed to secondary Linux desktop workspace",
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const randomLatency = latencies[Math.floor(Math.random() * latencies.length)];

      setLogs((prev) => [
        { id, time, event: randomEvent, latency: randomLatency, status: "MATCHED" },
        ...prev.slice(0, 4),
      ]);
      setIsSimulating(false);
    }, 450);
  };

  return (
    <section id="architecture" className="relative px-6 py-24 sm:px-10 md:px-16 lg:px-20">
      {/* Section Header */}
      <div className="mb-14 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
          <span>01</span>
          <span className="text-white/20">{"//"}</span>
          <span>SYSTEMS &amp; PHILOSOPHY</span>
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Deterministic Logic. <br />
          <span className="text-paper-muted">Autonomous Intelligence.</span>
        </h2>
        <p className="mt-4 text-base text-paper-muted leading-relaxed">
          &quot;Architecture precedes interface. Structure defines outcome.&quot; From sub-second incident retrieval to zero-focus desktop automation, every system is engineered for resilience, determinism, and scale.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Card 1: Core Architectural Manifesto (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative col-span-1 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 lg:col-span-7 flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-colors"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent-mint">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-paper-subtle">
                [ PHILOSOPHY ]
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Local-First AI &amp; High-Throughput Pipelines
            </h3>
            <p className="text-sm sm:text-base text-paper-muted leading-relaxed">
              Modern AI applications frequently suffer from high cloud latency, unpredictable API pricing, and flaky privacy boundaries. My engineering focus centers on <strong className="text-paper">local-first AI agents</strong> (Ollama, Whisper, PyTorch), coupled with deterministic systems automation (FastAPI, Win32/X11 hooks) to deliver immediate, tactile performance.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 font-mono text-xs">
            <div>
              <p className="text-paper-subtle uppercase text-[10px]">Retrieval Engine</p>
              <p className="mt-1 font-semibold text-white">MinHash + LSH</p>
            </div>
            <div>
              <p className="text-paper-subtle uppercase text-[10px]">Execution Plane</p>
              <p className="mt-1 font-semibold text-accent-mint">Local Inference</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-paper-subtle uppercase text-[10px]">Interaction Latency</p>
              <p className="mt-1 font-semibold text-white">&lt; 150ms Loop</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: System Telemetry Console (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative col-span-1 rounded-3xl border border-white/10 bg-ink-card p-6 lg:col-span-5 flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-paper">
                <TerminalIcon className="h-4 w-4 text-accent-mint" />
                <span>INCIDENT_STREAM.LOG</span>
              </div>
              <button
                onClick={simulateNewIncident}
                disabled={isSimulating}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-paper-muted hover:text-white transition-all active:scale-95"
                data-cursor="hover"
              >
                <RefreshCw className={`h-3 w-3 ${isSimulating ? "animate-spin text-accent-mint" : ""}`} />
                <span>Trigger</span>
              </button>
            </div>

            {/* Simulated Live Incident Stream */}
            <div className="mt-4 space-y-2.5 font-mono text-xs">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-accent-mint">{log.id}</span>
                    <span className="text-paper-subtle">{log.time}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-paper-muted truncate">{log.event}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-white/40">Latency: {log.latency}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{log.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-paper-subtle border-t border-white/5 pt-3">
            <span>PIPELINE: ACTIVE</span>
            <span className="text-accent-mint font-semibold">100% RECALL@5</span>
          </div>
        </motion.div>

        {/* Card 3: Interactive Tech Stack Radar (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative col-span-1 rounded-3xl border border-white/10 bg-ink-card p-8 lg:col-span-8 flex flex-col justify-between group hover:border-white/20 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-subtle">
                <Layers className="h-4 w-4 text-accent-mint" />
                <span>TOOLING &amp; SYSTEM ECOSYSTEM</span>
              </div>
              <span className="font-mono text-xs text-accent-mint">[ PRODUCTION-READY ]</span>
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
              Engineered with High-Performance Primitives
            </h3>
            <p className="mt-1 text-sm text-paper-muted">
              Specialized tools chosen for deterministic latency, memory efficiency, and ergonomic developer experience.
            </p>

            {/* Tech Tags Grid */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {TECH_STACK.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="group/tag flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-paper transition-all duration-300 hover:border-accent-mint hover:bg-accent-mint/10 hover:text-white"
                    data-cursor="hover"
                  >
                    <Icon className="h-3.5 w-3.5 text-paper-muted group-hover/tag:text-accent-mint transition-colors" />
                    <span>{tech.name}</span>
                    <span className="rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-paper-subtle group-hover/tag:bg-accent-mint/20 group-hover/tag:text-accent-mint">
                      {tech.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-paper-muted">
            <span>Architecture: Microservices + Local Agents</span>
            <span className="text-accent-mint">Continuous Profiling</span>
          </div>
        </motion.div>

        {/* Card 4: Quantitative Impact / System Metrics (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative col-span-1 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 lg:col-span-4 flex flex-col justify-between group hover:border-white/20 transition-colors"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-subtle">
              <Activity className="h-4 w-4 text-accent-mint" />
              <span>METRICS &amp; SPEED</span>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">~124<span className="text-accent-mint text-xl">ms</span></p>
                <p className="mt-1 text-xs text-paper-muted">P95 Historical Incident Retrieval</p>
              </div>

              <div>
                <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">0<span className="text-accent-mint text-xl">%</span></p>
                <p className="mt-1 text-xs text-paper-muted">Focus Hijack via Async Win32 Hooks</p>
              </div>

              <div>
                <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">5<span className="text-accent-mint text-xl">+</span></p>
                <p className="mt-1 text-xs text-paper-muted">Full-Scale Systems Built &amp; Deployed</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] text-paper-subtle">
            Verified across simulated multi-service benchmark environments.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
