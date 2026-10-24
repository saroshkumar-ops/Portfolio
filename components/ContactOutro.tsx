"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Copy, Check, Mail } from "lucide-react";
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
    <footer id="contact" className="relative px-6 pt-28 pb-12 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
          <span>04</span>
          <span className="text-white/20">{"//"}</span>
          <span>GET IN TOUCH</span>
        </div>

        {/* Giant Monolith Outro Statement */}
        <div className="mt-8">
          <h2 className="font-sans text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
            Let&apos;s Work
            <br />
            <span className="text-paper-muted hover:text-accent-mint transition-colors duration-500">
              Together.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-base sm:text-xl text-paper-muted font-light leading-relaxed">
            I am currently open to high-impact software engineering roles, distributed systems challenges, and autonomous AI infrastructure opportunities.
          </p>
        </div>

        {/* Email & Social Actions */}
        <div className="mt-12 flex flex-wrap items-center gap-4 border-b border-white/10 pb-16">
          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs sm:text-sm text-paper transition-all hover:border-accent-mint hover:bg-accent-mint/10 hover:text-white"
            data-cursor="hover"
          >
            <Mail className="h-4 w-4 text-accent-mint" />
            <span>{CONTACT_EMAIL}</span>
            <span className="ml-2 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-paper-subtle group-hover:bg-accent-mint/20 group-hover:text-accent-mint">
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </span>
          </button>

          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:border-white/50 hover:bg-white/10"
            data-cursor="hover"
          >
            <SiGithub className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-paper-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/sarosh-kumar-132111297/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all hover:border-white/50 hover:bg-white/10"
            data-cursor="hover"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-paper-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Colophon & Bottom Navigation */}
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center font-mono text-xs text-paper-subtle">
          <div>
            <p className="text-paper-muted">Sarosh Kumar © 2026</p>
            <p className="mt-1 text-[11px]">Crafted with Next.js 16, GSAP, Framer Motion &amp; Lenis</p>
          </div>

          <div className="flex items-center gap-6">
            <span>28°38&apos; N, 77°13&apos; E</span>

            <button
              onClick={() => scrollTo("#top", { offset: 0 })}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-paper hover:border-accent-mint hover:text-accent-mint transition-colors"
              data-cursor="hover"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
