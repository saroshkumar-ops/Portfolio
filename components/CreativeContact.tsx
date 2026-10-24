"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Copy, Check, Mail, MoveRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { LinkedInIcon } from "@/components/ui/icons";
import { useLenis } from "@/components/ScrollProvider";

const CONTACT_EMAIL = "saroshkumar.dev@gmail.com";

export default function CreativeContact() {
  const { scrollTo } = useLenis();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer
      id="contact"
      className="relative px-6 pt-32 pb-16 sm:px-10 md:px-16 lg:px-20 bg-[#090a10] select-none text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#d4ff00]">
          <span>[ 05 // INITIATE TRANSMISSION ]</span>
          <span className="text-white/20">/</span>
          <span>GET IN TOUCH</span>
        </div>

        {/* Monolith Headline */}
        <div className="mt-8">
          <h2 className="font-sans text-[13vw] sm:text-[11vw] md:text-[9vw] font-black uppercase leading-[0.82] tracking-tighter text-white">
            Have An Project?
            <br />
            <span className="text-[#d4ff00]">Let&apos;s Build.</span>
          </h2>

          <p className="mt-8 max-w-2xl font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            I am currently open to high-impact software engineering roles, distributed systems challenges, and autonomous AI infrastructure opportunities.
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-14 flex flex-wrap items-center gap-4 border-b border-white/10 pb-16 font-mono text-xs uppercase tracking-wider">
          {/* Email Copy Pill */}
          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 rounded-full bg-[#d4ff00] px-7 py-4 font-bold text-black transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-lg"
          >
            <Mail className="h-4 w-4" />
            <span className="lowercase">{CONTACT_EMAIL}</span>
            <span className="ml-2 flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-0.5 text-[10px] text-black">
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-800" />
                  <span className="font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </span>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-white hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors"
          >
            <SiGithub className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sarosh-kumar-132111297/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-white hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Colophon & Bottom Swiss Footer */}
        <div className="mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center font-mono text-xs text-slate-400">
          <div>
            <p className="text-white font-bold">SAROSH KUMAR © 2026</p>
            <p className="mt-1 text-[11px] text-slate-400">
              Built with Next.js 16, GSAP, Lenis, and Tailwind CSS.
            </p>
          </div>

          <button
            onClick={() => scrollTo("#top")}
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
