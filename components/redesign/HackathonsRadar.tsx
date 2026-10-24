"use client";

import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Award, Trophy, Users, Shield, ArrowUpRight, Flame } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HackathonsRadar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const triggers = items.map((item) => {
      return ScrollTrigger.create({
        trigger: item,
        start: "top center+=12%",
        end: "bottom center-=12%",
        toggleClass: { targets: item, className: "active-award" },
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="hackathons"
      ref={containerRef}
      className="relative z-20 w-full min-h-screen bg-[#040711] text-white py-28 px-6 md:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
              <Trophy size={14} />
              <span>05 // HONORS & COMPETITIVE TRACK RECORD</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              Hackathons & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                Leadership
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-sans leading-relaxed">
            Tested under intense time-pressured environments. Nationwide finalist standings and technical leadership for a 500+ engineer community.
          </p>
        </div>

        {/* Leadership Spotlight Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-black border border-cyan-500/30 shadow-[0_0_30px_rgba(0,242,254,0.1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
                <Users size={24} />
              </div>
              <div>
                <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
                  LEADERSHIP HONORS // 2024 — PRESENT
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Lead — Data Science Club, KLE Tech
                </h3>
                <p className="text-sm text-zinc-300 font-sans mt-2 max-w-2xl leading-relaxed">
                  Spearheaded hands-on learning initiatives, technical masterclasses in machine learning, and directed club hackathons, mentoring a thriving cross-batch community of 500+ students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Focal-Line Radar Grid of Hackathons */}
        <div className="relative flex flex-col gap-4">
          {PORTFOLIO_DATA.hackathons.map((h, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="group p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:scale-110 transition-transform">
                  <Flame size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {h.event}
                    </h4>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {h.achievement}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    {h.organizer}
                  </p>
                </div>
              </div>

              {h.highlight && (
                <div className="sm:text-right font-mono text-xs text-zinc-400 max-w-sm">
                  {h.highlight}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
