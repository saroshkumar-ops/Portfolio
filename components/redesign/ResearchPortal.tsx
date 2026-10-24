"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { GitPullRequest, Atom, ShieldAlert, Cpu, Sparkles, ExternalLink } from "lucide-react";

export default function ResearchPortal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const sectionTopRef = useRef<number>(0);
  const pathLengthRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);

  const CARD_W = 340;
  const CARD_H = 220;

  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Build dynamic SVG curve that leads into the card
    const startX = w * 0.15;
    const startY = 0;
    const endX = w / 2 - CARD_W / 2;
    const endY = h / 2;
    const pathData = `M ${startX},${startY} C ${startX},${h * 0.3} ${endX - 100},${endY} ${endX},${endY}`;

    if (pathRef.current) {
      pathRef.current.setAttribute("d", pathData);
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) pathLengthRef.current = len;
      } catch {}
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!cardRef.current || !contentRef.current || !sectionRef.current) return;

        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const delta = scrollY - sectionTopRef.current;

        // Animate SVG Path line drawing
        if (pathRef.current && pathLengthRef.current > 0) {
          const pathProgress = Math.min(Math.max((delta + vh) / vh, 0), 1);
          pathRef.current.style.strokeDasharray = `${pathLengthRef.current}`;
          pathRef.current.style.strokeDashoffset = `${(pathLengthRef.current * (1 - pathProgress)).toFixed(1)}`;
        }

        // Before section enters: hide
        if (delta < -vh * 0.3) {
          cardRef.current.style.visibility = "hidden";
          cardRef.current.style.opacity = "0";
          return;
        }

        cardRef.current.style.visibility = "visible";
        cardRef.current.style.opacity = "1";

        const PIN_DURATION = vh * 1.4;

        if (delta <= 0) {
          // Pre-pinning state
          cardRef.current.style.position = "absolute";
          cardRef.current.style.top = "50vh";
          cardRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
          contentRef.current.style.transform = "scale(1)";
          cardRef.current.style.borderWidth = "2px";
        } else if (delta < PIN_DURATION) {
          // Pinned expanding state
          const progress = delta / PIN_DURATION; // 0 to 1
          const eased = Math.min(Math.max(Math.pow(progress, 1.8), 0), 1);

          cardRef.current.style.position = "fixed";
          cardRef.current.style.top = "50%";

          const scaleX = 1 + eased * (vw / CARD_W - 1);
          const scaleY = 1 + eased * (vh / CARD_H - 1);

          cardRef.current.style.transform = `translate3d(0, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
          contentRef.current.style.transform = `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;

          // Fade border out as it expands to full screen
          const borderOpacity = Math.max(0, 1 - eased / 0.6);
          cardRef.current.style.borderColor = `rgba(0, 242, 254, ${borderOpacity.toFixed(2)})`;
          cardRef.current.style.borderWidth = borderOpacity < 0.01 ? "0px" : "2px";
        } else {
          // Unpinned post-expansion: lock at bottom of pin zone
          cardRef.current.style.position = "absolute";
          cardRef.current.style.top = `${PIN_DURATION + vh / 2}px`;
          const scaleX = vw / CARD_W;
          const scaleY = vh / CARD_H;
          cardRef.current.style.transform = `translate3d(0, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
          contentRef.current.style.transform = `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;
          cardRef.current.style.borderWidth = "0px";
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [measure]);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#040711] text-white overflow-hidden"
      style={{ minHeight: "260vh" }}
    >
      {/* SVG Arc path that draws as user enters */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-10">
        <svg width="100%" height="100%" className="overflow-visible">
          <path
            ref={pathRef}
            fill="none"
            stroke="#00f2fe"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ strokeDasharray: "9999", strokeDashoffset: "9999" }}
          />
        </svg>
      </div>

      {/* The Central Expanding Card */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          top: "50vh",
          left: "50%",
          width: `${CARD_W}px`,
          height: `${CARD_H}px`,
          marginLeft: `-${CARD_W / 2}px`,
          marginTop: `-${CARD_H / 2}px`,
          transformOrigin: "center center",
          willChange: "transform, top, position",
        }}
        className="rounded-3xl bg-[#090e1c] border-2 border-cyan-400 overflow-hidden shadow-[0_0_50px_rgba(0,242,254,0.25)] flex items-center justify-center z-20"
      >
        {/* Inner Content (Counter-Scaled to remain sharp & un-squished) */}
        <div
          ref={contentRef}
          style={{ width: "100vw", height: "100vh", transformOrigin: "center center" }}
          className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12"
        >
          <div className="max-w-6xl mx-auto w-full">
            {/* Header */}
            <div className="mb-10">
              <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
                03 // OPEN-SOURCE RESEARCH OBSERVATORY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-2">
                Advancing Scientific ML <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  Across Global Organizations
                </span>
              </h2>
              <p className="mt-3 text-sm text-zinc-400 font-sans max-w-xl">
                Direct code contributions to computational neuroscience pipelines, graph neural weather forecasting frameworks, and transformer acceleration on Apple Silicon.
              </p>
            </div>

            {/* Research Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PORTFOLIO_DATA.openSource.map((org, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {org.project}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {org.role}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {org.organization}
                    </h3>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {org.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                    {org.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
