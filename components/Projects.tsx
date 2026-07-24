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
import { ArrowRight } from "lucide-react";
import { anton } from "@/lib/fonts";
import ScrollReveal from "@/components/ui/scroll-reveal";

type Role = "center" | "left" | "right" | "back";

type Project = {
  accent: string;
  eyebrow: string;
  title: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    accent: "var(--accent-amber)",
    eyebrow: "AI Desktop Assistant",
    title: "Victor — AI Desktop Copilot",
    description:
      "A local AI desktop assistant built with FastAPI, Electron, and Ollama — voice recognition, real-time WebSocket chat, desktop automation, memory persistence, and autonomous scheduling.",
  },
  {
    accent: "var(--accent-mint)",
    eyebrow: "Autonomous SRE",
    title: "Persistent Context Engine",
    description:
      "A context engine for autonomous SRE using MinHash and LSH-based incident retrieval with a FastAPI + React dashboard — ~124ms p95 latency, 100% recall@5 on large-scale benchmarks.",
  },
  {
    accent: "var(--grad-purple)",
    eyebrow: "Computer Vision",
    title: "GestureScroll",
    description:
      "A computer-vision background scrolling utility built with Python and MediaPipe — gesture-controlled scrolling for secondary windows without interrupting fullscreen tasks or games.",
  },
  {
    accent: "var(--grad-teal)",
    eyebrow: "Smart Manufacturing",
    title: "BharatAuto",
    description:
      "An AI-driven smart manufacturing platform using Next.js, Spring Boot, FastAPI, and PostgreSQL — live sensor streaming, ML risk models, and LLM agents with Twilio-based incident escalation.",
  },
  {
    accent: "var(--grad-gold)",
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
      // Extra items beyond the 4 visible slots sit hidden until they
      // rotate into view.
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<{ x: number; moved: boolean } | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
    const roles: (Role | undefined)[] = new Array(PROJECTS.length).fill(
      undefined
    );
    roles[activeIndex] = "center";
    roles[(activeIndex + PROJECTS.length - 1) % PROJECTS.length] = "left";
    roles[(activeIndex + 1) % PROJECTS.length] = "right";
    roles[(activeIndex + 2) % PROJECTS.length] = "back";
    return roles;
  }, [activeIndex]);

  // GSAP drives every position/scale/blur/opacity change so switching
  // between projects (via scroll, drag, or keyboard — no buttons) animates
  // smoothly rather than jumping between states. Runs as a layout effect
  // so the very first positioning happens before paint, avoiding a flash
  // of unstyled/stacked cards.
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
  }, []);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.moved) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 60) {
        drag.moved = true;
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
      id="projects"
      className="relative overflow-hidden bg-ink px-6 py-24 md:px-12"
    >
      <div
        aria-hidden
        className={`${anton.className} pointer-events-none absolute inset-x-0 top-8 flex select-none items-center justify-center opacity-[0.14]`}
        style={{
          color: "var(--grad-red)",
          fontSize: "clamp(70px, 18vw, 260px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        PROJECTS
      </div>

      <div className="relative mb-12 flex flex-col justify-between gap-8 sm:mb-16 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
            Selected Work
          </p>
          <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Featured projects
          </h2>
          <ScrollReveal
            containerClassName="my-0 mt-4"
            textClassName="max-w-md text-sm text-paper/60 font-normal leading-normal"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            AI tools, backend systems, and full-stack builds from
            hackathons and hands-on engineering.
          </ScrollReveal>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")} — scroll, drag, or
            use arrow keys
          </span>
          <a
            href="#contact"
            className={`${anton.className} flex items-center gap-2 text-2xl uppercase leading-none tracking-tight text-paper/85 transition-opacity hover:text-paper hover:opacity-100`}
          >
            Discuss a project
            <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
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
        className="relative h-[56vh] cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing sm:h-[60vh] md:h-[64vh]"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.eyebrow}
            ref={(el) => {
              boxRefs.current[index] = el;
            }}
            role="option"
            aria-selected={activeIndex === index}
            className="absolute top-1/2"
            style={{
              aspectRatio: "0.72 / 1",
              willChange: "transform, filter, opacity",
            }}
          >
            <div
              className="flex h-full w-full flex-col justify-between rounded-2xl border border-paper/10 bg-ink-soft/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
              style={{
                boxShadow: `0 0 0 1px ${project.accent}22, 0 30px 60px -25px ${project.accent}55`,
              }}
            >
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: project.accent }}
                >
                  {project.eyebrow}
                </span>
                <h3 className="mt-4 text-xl font-bold sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-paper/60">
                  {project.description}
                </p>
              </div>

              <div
                className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: project.accent }}
              >
                View project
                <ArrowRight size={14} strokeWidth={2.25} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
