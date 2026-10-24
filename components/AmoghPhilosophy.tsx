"use client";

import Image from "next/image";
import StarBorder from "@/components/ui/StarBorder";

export default function AmoghPhilosophy() {
  return (
    <section id="about" className="relative w-full bg-black py-28 px-6 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 select-none">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Star Border Portrait (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <StarBorder borderRadius="36px" color="#00ffb2" speed="7s" className="w-full max-w-sm">
              <div className="p-4 bg-black rounded-[34px]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink-soft">
                  <Image
                    src="/sarosh.png"
                    alt="Sarosh Kumar"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover grayscale contrast-115 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white">
                    <div>
                      <p className="font-bold">Sarosh Kumar</p>
                      <p className="text-[10px] text-paper-muted">KLE Tech, Hubli (2024–2028)</p>
                    </div>
                    <span className="rounded-full bg-accent-mint px-2.5 py-0.5 text-[10px] font-bold text-black">
                      AI &amp; SRE
                    </span>
                  </div>
                </div>
              </div>
            </StarBorder>
          </div>

          {/* Right: Architectural Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
              <span>04</span>
              <span className="text-white/20">{"//"}</span>
              <span>ENGINEERING PHILOSOPHY</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
              Architecture precedes interface. <br />
              <span className="text-white/35">Structure defines outcome.</span>
            </h2>

            <p className="text-base sm:text-xl text-paper-muted font-light leading-relaxed">
              B.E. in Computer Science &amp; Engineering at KLE Technological University, Hubli (2024–2028). Building software with architectural intent and predictable system behavior. Engineering judgment refined through real-world constraints, hackathons, and hands-on systems builds.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-accent-mint font-bold text-sm block">System Design Intent</span>
                <p className="mt-2 text-paper-muted leading-relaxed text-[11px]">
                  Focusing on sub-second incident retrieval (MinHash/LSH), local-first voice control planes, and deterministic state transitions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-white font-bold text-sm block">Zero-Focus Automation</span>
                <p className="mt-2 text-paper-muted leading-relaxed text-[11px]">
                  Computer vision pipelines designed without focus hijacking, ensuring zero disruption to foreground applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
