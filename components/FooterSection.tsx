"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { LinkedInIcon } from "@/components/ui/icons";
import { useLenis } from "@/components/ScrollProvider";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "@saroshkumar-ops",
    url: "https://github.com/saroshkumar-ops",
    icon: SiGithub,
  },
  {
    name: "LinkedIn",
    handle: "Sarosh Kumar",
    url: "https://www.linkedin.com/in/sarosh-kumar-132111297/",
    icon: LinkedInIcon,
  },
];

const CONTACT_EMAIL = "saroshkumar.dev@gmail.com";

export default function FooterSection() {
  const { scrollTo } = useLenis();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-ink-card px-6 pt-24 pb-12 sm:px-10 md:px-16 lg:px-20 overflow-hidden">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,255,178,0.1),_transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Marker */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
          <span>04</span>
          <span className="text-white/20">{"//"}</span>
          <span>GET IN TOUCH</span>
        </div>

        {/* Massive Headline Callout */}
        <div className="mt-8">
          <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            Let&apos;s Build <br />
            <span className="text-paper-muted hover:text-accent-mint transition-colors duration-500">
              Something Extraordinary.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-paper-muted leading-relaxed font-light">
            I am currently open to high-impact software engineering roles, distributed systems challenges, and autonomous AI infrastructure opportunities.
          </p>
        </div>

        {/* Action Row: Email Copy & Links */}
        <div className="mt-12 flex flex-wrap items-center gap-4 border-b border-white/10 pb-16">
          {/* Email Copy Card */}
          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-xs sm:text-sm font-mono font-medium text-paper transition-all duration-300 hover:border-accent-mint hover:bg-accent-mint/10 hover:text-white"
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

          {/* Direct Social Links */}
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                data-cursor="hover"
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-paper-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            );
          })}
        </div>

        {/* Colophon & Bottom Bar */}
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center text-xs font-mono text-paper-subtle">
          <div>
            <p className="text-paper-muted">Sarosh Kumar © 2026</p>
            <p className="mt-1 text-[11px]">Crafted with Next.js 16, GSAP, Framer Motion &amp; Lenis</p>
          </div>

          <div className="flex items-center gap-6">
            <span>28°38&apos; N, 77°13&apos; E</span>

            <button
              onClick={() => scrollTo("#top", { offset: 0 })}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-paper hover:border-accent-mint hover:text-accent-mint transition-colors"
              data-cursor="hover"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
