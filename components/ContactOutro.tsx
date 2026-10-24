"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Copy, Check, Mail, Sparkles, Heart } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { LinkedInIcon } from "@/components/ui/icons";
import { useLenis } from "@/components/ScrollProvider";

const CONTACT_EMAIL = "saroshkumar.dev@gmail.com";

export default function ContactOutro() {
  const { scrollTo } = useLenis();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="relative px-6 pt-32 pb-16 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 bg-[#070814] overflow-hidden select-none">
      {/* Background Chromatic Aurora Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-t from-indigo-600/20 via-fuchsia-600/15 to-transparent blur-[150px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>04 // INITIATE TRANSMISSION</span>
          </span>
        </div>

        {/* Giant Monolith Outro Statement */}
        <div className="mt-10">
          <h2 className="font-sans text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.88] tracking-tighter text-white">
            Let&apos;s Build
            <br />
            <span className="animate-gradient-shimmer bg-gradient-to-r from-cyan-300 via-indigo-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            I am actively seeking high-impact software engineering roles, distributed systems challenges, and autonomous AI infrastructure opportunities.
          </p>
        </div>

        {/* Email & Social Actions with Vibrant Chromatic Borders */}
        <div className="mt-14 flex flex-wrap items-center gap-4 border-b border-white/10 pb-16">
          {/* Primary Email Pill with Glowing Gradient Border */}
          <div className="rounded-full p-[1.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-3 rounded-full bg-[#0c0e22] px-7 py-4 font-mono text-xs sm:text-sm text-white transition-all hover:bg-[#12152e]"
              data-cursor="hover"
            >
              <Mail className="h-4 w-4 text-cyan-400" />
              <span className="font-semibold">{CONTACT_EMAIL}</span>
              <span className="ml-2 flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] text-slate-300 transition-colors group-hover:bg-cyan-500/20 group-hover:text-cyan-200">
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </span>
            </button>
          </div>

          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-6 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-violet-200 transition-all hover:border-violet-400/70 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"
            data-cursor="hover"
          >
            <SiGithub className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-violet-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/sarosh-kumar-132111297/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-200 transition-all hover:border-cyan-400/70 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
            data-cursor="hover"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Colophon & Bottom Navigation */}
        <div className="mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center font-mono text-xs text-slate-400">
          <div>
            <p className="text-slate-300 font-semibold">Sarosh Kumar © 2026</p>
            <p className="mt-1 text-[11px] text-slate-400">
              Systems Architecture · Computer Vision · Autonomous Control Planes
            </p>
          </div>

          <button
            onClick={() => scrollTo("#top")}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all"
            data-cursor="hover"
          >
            <span>Back to Summit</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
