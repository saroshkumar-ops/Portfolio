"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { inter, jetbrainsMono } from "@/lib/fonts";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BorderGlow from "@/components/ui/border-glow";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { PROJECT_DETAILS } from "@/components/projectDetails";
import ScrubVideoFrames, { type ScrubVideoFramesHandle } from "@/components/ui/scrub-video-frames";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_FRAME_COUNT = 75;
const projectsFrameSrc = (index: number) => `/Projects/img_${String(index).padStart(5, "0")}.jpg`;

type Role = "center" | "left" | "right" | "back";

type Project = {
  accent: string;
  glowColor: string;
  colors: string[];
  eyebrow: string;
  title: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    accent: "var(--accent-mint)",
    glowColor: "0 255 178",
    colors: ["var(--accent-mint)", "var(--accent-cyan)", "var(--accent-amber)"],
    eyebrow: "AI Desktop Assistant",
    title: "Victor — AI Desktop Copilot",
    description:
      "A local AI desktop assistant built with FastAPI, Electron, and Ollama — voice recognition, real-time WebSocket chat, desktop automation, memory persistence, and autonomous scheduling.",
  },
  {
    accent: "var(--accent-cyan)",
    glowColor: "0 210 255",
    colors: ["var(--accent-cyan)", "var(--accent-mint)", "var(--accent-purple)"],
    eyebrow: "Autonomous SRE",
    title: "Persistent Context Engine",
    description:
      "A context engine for autonomous SRE using MinHash and LSH-based incident retrieval with a FastAPI + React dashboard — ~124ms p95 latency, 100% recall@5 on large-scale benchmarks.",
  },
  {
    accent: "var(--accent-purple)",
    glowColor: "157 78 221",
    colors: ["var(--accent-purple)", "var(--accent-mint)", "var(--accent-cyan)"],
    eyebrow: "Computer Vision",
    title: "GestureScroll",
    description:
      "A computer-vision background scrolling utility built with Python and MediaPipe — gesture-controlled scrolling for secondary windows without interrupting fullscreen tasks or games.",
  },
  {
    accent: "var(--accent-amber)",
    glowColor: "245 166 35",
    colors: ["var(--accent-amber)", "var(--accent-mint)", "var(--accent-purple)"],
    eyebrow: "Smart Manufacturing",
    title: "BharatAuto",
    description:
      "An AI-driven smart manufacturing platform using Next.js, Spring Boot, FastAPI, and PostgreSQL — live sensor streaming, ML risk models, and LLM agents with Twilio-based incident escalation.",
  },
  {
    accent: "#ff007f",
    glowColor: "255 0 127",
    colors: ["#ff007f", "var(--accent-amber)", "var(--accent-mint)"],
    eyebrow: "Linux Utility",
    title: "Listny",
    description:
      "A Linux desktop utility that identifies playing songs via ShazamIO acoustic fingerprinting, fetches lyrics through the Genius API, and surfaces local Ollama LLM-powered music insights.",
  },
];

type Target = {
  left: string;
  height: string;
  scale: number;
  blur: number;
  opacity: number;
  zIndex: number;
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getTarget(role: Role | undefined, isMobile: boolean): Target {
  switch (role) {
    case "center":
      return {
        left: "50%",
        height: isMobile ? "82%" : "94%",
        scale: 1,
        blur: 0,
        opacity: 1,
        zIndex: 20,
      };
    case "left":
      return {
        left: isMobile ? "10%" : "22%",
        height: isMobile ? "50%" : "64%",
        scale: 0.94,
        blur: 3,
        opacity: 0.45,
        zIndex: 10,
      };
    case "right":
      return {
        left: isMobile ? "90%" : "78%",
        height: isMobile ? "50%" : "64%",
        scale: 0.94,
        blur: 3,
        opacity: 0.45,
        zIndex: 10,
      };
    case "back":
      return {
        left: "50%",
        height: isMobile ? "46%" : "56%",
        scale: 0.9,
        blur: 5,
        opacity: 0.2,
        zIndex: 5,
      };
    default:
      return {
        left: "50%",
        height: isMobile ? "40%" : "48%",
        scale: 0.6,
        blur: 8,
        opacity: 0,
        zIndex: 0,
      };
  }
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimatingRef = useRef(false);
  const hasMountedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const frameApiRef = useRef<ScrubVideoFramesHandle>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<{ x: number; moved: boolean } | null>(null);
  const justDraggedRef = useRef(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => frameApiRef.current?.setProgress(self.progress),
    });

    return () => trigger.kill();
  }, []);

  const navigate = useCallback((direction: "next" | "prev") => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveIndex((prev) =>
      direction === "next"
        ? (prev + 1) % PROJECTS.length
        : (prev + PROJECTS.length - 1) % PROJECTS.length
    );
    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  }, []);

  const roleByIndex = useMemo<(Role | undefined)[]>(() => {
    const roles: (Role | undefined)[] = new Array(PROJECTS.length).fill(undefined);
    roles[activeIndex] = "center";
    roles[(activeIndex + PROJECTS.length - 1) % PROJECTS.length] = "left";
    roles[(activeIndex + 1) % PROJECTS.length] = "right";
    roles[(activeIndex + 2) % PROJECTS.length] = "back";
    return roles;
  }, [activeIndex]);

  useIsomorphicLayoutEffect(() => {
    const isFirstRun = !hasMountedRef.current;
    hasMountedRef.current = true;

    roleByIndex.forEach((role, i) => {
      const el = boxRefs.current[i];
      if (!el) return;
      const target = getTarget(role, isMobile);
      const vars = {
        left: target.left,
        height: target.height,
        scale: target.scale,
        filter: `blur(${target.blur}px)`,
        opacity: target.opacity,
        zIndex: target.zIndex,
        xPercent: -50,
        yPercent: -50,
        overwrite: "auto" as const,
      };

      if (isFirstRun) {
        gsap.set(el, vars);
      } else {
        gsap.to(el, { ...vars, duration: 0.7, ease: "power3.inOut" });
      }
    });
  }, [roleByIndex, isMobile]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let wheelLock = false;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;
      wheelLock = true;
      navigate(delta > 0 ? "next" : "prev");
      window.setTimeout(() => {
        wheelLock = false;
      }, 700);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [navigate]);

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: e.clientX, moved: false };
    justDraggedRef.current = false;
  }, []);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.moved) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 60) {
        drag.moved = true;
        justDraggedRef.current = true;
        navigate(dx < 0 ? "next" : "prev");
      }
    },
    [navigate]
  );

  const handlePointerEnd = useCallback(() => {
    dragRef.current = null;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigate("next");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigate("prev");
      }
    },
    [navigate]
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-ink px-6 py-24 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <ScrubVideoFrames ref={frameApiRef} frameCount={PROJECTS_FRAME_COUNT} frameSrc={projectsFrameSrc} />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 z-10 flex select-none items-center justify-center font-sans text-[18vw] font-black uppercase text-white/10 tracking-tighter"
        style={{
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        PROJECTS
      </div>

      <div className="relative z-10 mb-12 flex flex-col justify-between gap-8 sm:mb-16 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
            <span>02</span>
            <span className="text-white/20">{"//"}</span>
            <span>FEATURED SYSTEMS</span>
          </div>
          <h2 className="font-sans text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Engineered Work
          </h2>
          <ScrollReveal
            containerClassName="my-0 mt-4"
            textClassName="max-w-md font-mono text-xs uppercase tracking-wider text-paper/60 font-medium leading-normal"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            AI tools, backend infrastructure, and full-scale systems built from scratch.
          </ScrollReveal>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent-mint">
            {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")} — DRAG OR SCROLL DECK
          </span>
          <a
            href="#contact"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper/85 transition-colors hover:text-accent-mint"
          >
            <span>Discuss architecture</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </a>
        </div>
      </div>

      <div
        ref={carouselRef}
        role="listbox"
        tabIndex={0}
        aria-label="Featured projects carousel"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        data-cursor="drag"
        data-cursor-text="DRAG"
        className="relative z-10 h-[56vh] cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing sm:h-[60vh] md:h-[64vh]"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.eyebrow}
            ref={(el) => {
              boxRefs.current[index] = el;
            }}
            role="option"
            aria-selected={activeIndex === index}
            data-cursor="view"
            data-cursor-text="EXPAND"
            className="absolute top-1/2 cursor-pointer"
            style={{
              aspectRatio: "0.72 / 1",
              willChange: "transform, filter, opacity",
            }}
            onClick={() => {
              if (justDraggedRef.current) {
                justDraggedRef.current = false;
                return;
              }
              setSelectedProject(project);
            }}
          >
            <BorderGlow
              className="h-full w-full"
              backgroundColor="var(--ink-soft)"
              borderRadius={16}
              colors={project.colors}
              glowColor={project.glowColor}
              edgeSensitivity={35}
              glowRadius={30}
              glowIntensity={1.1}
            >
              <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <span
                    className="font-mono text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: project.accent }}
                  >
                    {project.eyebrow}
                  </span>
                  <h3 className="mt-4 font-sans text-xl font-extrabold sm:text-2xl tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-paper/70 font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: project.accent }}
                >
                  <span>Inspect Architecture</span>
                  <ArrowRight size={14} strokeWidth={2.25} />
                </div>
              </div>
            </BorderGlow>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent-mint hover:text-accent-mint"
            >
              <X size={20} strokeWidth={2.25} />
            </button>
            <motion.div
              key={selectedProject.title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl"
            >
              <p
                className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: selectedProject.accent }}
              >
                {selectedProject.eyebrow}
              </p>
              <h3 className="mb-4 font-sans text-2xl font-black uppercase tracking-tight text-paper sm:text-3xl">
                {selectedProject.title}
              </h3>
              <Terminal className={jetbrainsMono.className}>
                <TypingAnimation className="text-accent-mint">
                  {`$ ${PROJECT_DETAILS[selectedProject.title]?.command ?? "info"}`}
                </TypingAnimation>
                {PROJECT_DETAILS[selectedProject.title]?.lines.map((line) => (
                  <AnimatedSpan key={line}>
                    <span style={{ color: selectedProject.accent }}>✔ </span>
                    {line}
                  </AnimatedSpan>
                ))}
                <AnimatedSpan className="text-paper/50 font-mono text-xs">
                  {PROJECT_DETAILS[selectedProject.title]?.stack}
                </AnimatedSpan>
                <TypingAnimation className="text-paper/70 font-mono text-xs">
                  {PROJECT_DETAILS[selectedProject.title]?.summary ?? ""}
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
