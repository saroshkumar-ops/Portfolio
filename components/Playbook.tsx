"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiFastapi,
  SiElectron,
  SiNextdotjs,
  SiMysql,
  SiSqlite,
  SiPostgresql,
  SiOllama,
  SiGit,
  SiGithub,
  SiLinux,
  SiSelenium,
} from "react-icons/si";
import ScrollReveal from "@/components/ui/scroll-reveal";
import LogoLoop, { type LogoItem } from "@/components/ui/logo-loop";
import ScrubVideoFrames, { type ScrubVideoFramesHandle } from "@/components/ui/scrub-video-frames";

gsap.registerPlugin(ScrollTrigger);

const APPROACH_FRAME_COUNT = 241;
const approachFrameSrc = (index: number) => `/approach/img_${String(index).padStart(5, "0")}.webp`;

const TECH_LOGOS: LogoItem[] = [
  { node: <SiPython />, title: "Python" },
  { node: <SiC />, title: "C" },
  { node: <SiCplusplus />, title: "C++" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss />, title: "CSS" },
  { node: <SiReact />, title: "React" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiElectron />, title: "Electron" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiSqlite />, title: "SQLite" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiOllama />, title: "Ollama" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiLinux />, title: "Linux" },
  { node: <SiSelenium />, title: "Selenium" },
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
      className="relative z-10 flex min-h-screen items-center overflow-hidden rounded-t-[2.5rem] bg-ink px-6 py-24 shadow-[0_-40px_80px_rgba(0,0,0,0.6)] md:px-12"
    >
      <div className="absolute inset-0 z-0">
        <ScrubVideoFrames ref={frameApiRef} frameCount={APPROACH_FRAME_COUNT} frameSrc={approachFrameSrc} />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="relative grid w-full grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
            [ Approach ]
          </p>
          <ScrollReveal
            containerClassName="my-0"
            textClassName="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            {"I build "}
            <span className="font-serif italic font-normal text-accent-mint">
              intelligent
            </span>
            {" systems — from real-time backends to AI-powered tools, sharpened through hackathons and hands-on engineering."}
          </ScrollReveal>
          <ScrollReveal
            containerClassName="my-0 mt-8"
            textClassName="max-w-md text-sm uppercase tracking-[0.14em] text-paper/50 font-normal leading-normal"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            AI Systems / Backend Engineering / Full-Stack Development
          </ScrollReveal>
        </div>

        <div className="w-full">
          <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-ink-soft p-6 shadow-2xl md:p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
              Tools &amp; Tech
            </p>
            <LogoLoop
              logos={TECH_LOGOS}
              speed={60}
              direction="left"
              logoHeight={32}
              gap={40}
              fadeOut
              fadeOutColor="#0c1220"
              scaleOnHover
              ariaLabel="Languages, frameworks, and tools"
              className="text-paper/70"
              active={isVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
