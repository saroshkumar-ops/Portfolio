"use client";

import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Terminal, Copy, Check, Download, Mail, ArrowUpRight, Send, Sparkles } from "lucide-react";

export default function ContactTerminal() {
  const [copied, setCopied] = useState(false);
  const [cmdInput, setCmdInput] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "welcome",
      output: "Neural Terminal v3.2.0 initialized. Type 'help' for available system commands.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const query = cmdInput.trim().toLowerCase();
    if (!query) return;

    let response = "";

    switch (query) {
      case "help":
        response = "Available commands: 'bio', 'projects', 'skills', 'research', 'contact', 'resume', 'clear'";
        break;
      case "bio":
        response = `Sarosh Kumar — ${PORTFOLIO_DATA.personal.role}. ${PORTFOLIO_DATA.personal.bio}`;
        break;
      case "projects":
        response = "1. Voice Integrity (Deepfake audio detection, 91.5% recall) | 2. ExoTerra (NASA Exoplanet Engine) | 3. AQI Forecaster (XGBoost)";
        break;
      case "skills":
        response = "PyTorch, FastAPI, Transformers, WavLM, LFCC-LCNN, GNNs, Scikit-Learn, Docker, WebSockets";
        break;
      case "research":
        response = "Open Source: BrainGlobe (cellfinder), ML-LAM (neural-lam GNNs), ML4SCI (DeepLense)";
        break;
      case "contact":
        response = `Email: ${PORTFOLIO_DATA.personal.email} | Phone: ${PORTFOLIO_DATA.personal.phone}`;
        break;
      case "resume":
        window.open(PORTFOLIO_DATA.personal.links.resume, "_blank");
        response = "Opening resume.pdf in new tab...";
        break;
      case "clear":
        setHistory([]);
        setCmdInput("");
        return;
      default:
        response = `Command '${query}' not recognized. Type 'help' for command directory.`;
        break;
    }

    setHistory((prev) => [...prev, { cmd: cmdInput, output: response }]);
    setCmdInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section
      id="contact"
      className="relative z-20 w-full min-h-screen bg-[#040711] text-white py-28 px-6 md:px-12 lg:px-20 border-t border-white/10 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Contact Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-4">
                <Terminal size={14} />
                <span>06 // TRANSMISSION & INQUIRY</span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-white">
                INITIALIZE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  CONTACT →
                </span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-md">
                Interested in building cutting-edge audio anti-spoofing pipelines, scientific deep learning engines, or low-latency systems? Let's connect.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="mt-10 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                    {PORTFOLIO_DATA.personal.email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Links */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <a
                  href={PORTFOLIO_DATA.personal.links.resume}
                  download
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-bold flex items-center gap-2 hover:bg-cyan-300 transition-colors"
                >
                  <Download size={14} />
                  Download Resume.pdf
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white flex items-center gap-1.5 transition-colors"
                >
                  LinkedIn <ArrowUpRight size={13} />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white flex items-center gap-1.5 transition-colors"
                >
                  GitHub <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive CLI Shell */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#080d1a] border border-white/15 overflow-hidden shadow-2xl">
              {/* Window Bar */}
              <div className="bg-black/80 px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  guest@sarosh-ai:~ (zsh)
                </span>
                <span className="w-12" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs h-72 sm:h-80 overflow-y-auto flex flex-col gap-3">
                {history.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="text-zinc-500">guest@sarosh:~$</span>
                      <span>{item.cmd}</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed pl-4 border-l border-white/10">
                      {item.output}
                    </p>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Terminal Prompt Input Form */}
              <form onSubmit={handleCommand} className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2">
                <span className="font-mono text-xs text-cyan-400 pl-2">❯</span>
                <input
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  placeholder="Type 'help' or command..."
                  className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-cyan-400/20 hover:bg-cyan-400/40 text-cyan-300 font-mono text-xs transition-colors"
                >
                  Execute
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
