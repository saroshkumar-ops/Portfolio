"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiFastapi,
  SiElectron,
  SiNextdotjs,
  SiPostgresql,
  SiOllama,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker,
} from "react-icons/si";
import ScrollReveal from "@/components/ui/scroll-reveal";
import LogoLoop, { type LogoItem } from "@/components/ui/logo-loop";
import ScrubVideoFrames, { type ScrubVideoFramesHandle } from "@/components/ui/scrub-video-frames";

gsap.registerPlugin(ScrollTrigger);

const APPROACH_FRAME_COUNT = 241;
const approachFrameSrc = (index: number) => `/approach/img_${String(index).padStart(5, "0")}.jpg`;

const TECH_LOGOS: LogoItem[] = [
  { node: <SiPython />, title: "Python" },
  { node: <SiC />, title: "C" },
  { node: <SiCplusplus />, title: "C++" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiReact />, title: "React" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiElectron />, title: "Electron" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiOllama />, title: "Ollama" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiLinux />, title: "Linux" },
];

export default function Playbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameApiRef = useRef<ScrubVideoFramesHandle>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=350%",
      scrub: true,
      pin: true,
      onUpdate: (self) => frameApiRef.current?.setProgress(self.progress),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative z-10 flex min-h-screen items-center overflow-hidden rounded-t-[3rem] border-t border-white/10 bg-ink px-6 py-24 shadow-[0_-40px_80px_rgba(0,0,0,0.8)] md:px-16 lg:px-20"
    >
      <div className="absolute inset-0 z-0">
        <ScrubVideoFrames ref={frameApiRef} frameCount={APPROACH_FRAME_COUNT} frameSrc={approachFrameSrc} />
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className="relative z-10 grid w-full grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
            <span>01</span>
            <span className="text-white/20">{"//"}</span>
            <span>SYSTEMS PHILOSOPHY</span>
          </div>

          <ScrollReveal
            containerClassName="my-0"
            textClassName="text-3xl font-black uppercase tracking-tight leading-tight sm:text-4xl md:text-5xl"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            {"I architect "}
            <span className="text-accent-mint">
              deterministic
            </span>
            {" systems — from local AI control planes to sub-second incident retrieval engines."}
          </ScrollReveal>

          <ScrollReveal
            containerClassName="my-0 mt-8"
            textClassName="max-w-md font-mono text-xs uppercase tracking-[0.16em] text-paper/60 font-medium leading-relaxed"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            AI Systems · Distributed Backends · OS-Level Automation
          </ScrollReveal>

          <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <span className="text-[10px] text-paper-subtle block uppercase">Retrieval Latency</span>
              <span className="font-bold text-accent-mint text-sm">~124ms P95</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <span className="text-[10px] text-paper-subtle block uppercase">Execution Hook</span>
              <span className="font-bold text-white text-sm">Zero Focus Interruption</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink-card/90 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-paper-muted">
              <span>Tooling &amp; Stack</span>
              <span className="text-accent-mint">60FPS Active</span>
            </div>
            <LogoLoop
              logos={TECH_LOGOS}
              speed={55}
              direction="left"
              logoHeight={34}
              gap={36}
              fadeOut
              fadeOutColor="#12141a"
              scaleOnHover
              ariaLabel="Languages, frameworks, and tools"
              className="text-paper/80"
              active={isVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
