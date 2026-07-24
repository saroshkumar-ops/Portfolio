"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    eyebrow: "Project 01",
    title: "Project title goes here",
    description:
      "Replace this placeholder with a short one- or two-line description of the project.",
  },
  {
    accent: "var(--accent-mint)",
    eyebrow: "Project 02",
    title: "Project title goes here",
    description:
      "Replace this placeholder with a short one- or two-line description of the project.",
  },
  {
    accent: "var(--grad-purple)",
    eyebrow: "Project 03",
    title: "Project title goes here",
    description:
      "Replace this placeholder with a short one- or two-line description of the project.",
  },
  {
    accent: "var(--grad-teal)",
    eyebrow: "Project 04",
    title: "Project title goes here",
    description:
      "Replace this placeholder with a short one- or two-line description of the project.",
  },
];

const TRANSITION =
  "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)";

function getBoxStyle(role: Role, isMobile: boolean): CSSProperties {
  const base: CSSProperties = {
    position: "absolute",
    top: "50%",
    aspectRatio: "0.72 / 1",
    transition: TRANSITION,
    willChange: "transform, filter, opacity, left, height",
  };

  switch (role) {
    case "center":
      return {
        ...base,
        left: "50%",
        height: isMobile ? "82%" : "94%",
        transform: "translate(-50%, -50%)",
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };
    case "left":
      return {
        ...base,
        left: isMobile ? "10%" : "22%",
        height: isMobile ? "50%" : "64%",
        transform: "translate(-50%, -50%) scale(0.94)",
        filter: "blur(3px)",
        opacity: 0.45,
        zIndex: 10,
      };
    case "right":
      return {
        ...base,
        left: isMobile ? "90%" : "78%",
        height: isMobile ? "50%" : "64%",
        transform: "translate(-50%, -50%) scale(0.94)",
        filter: "blur(3px)",
        opacity: 0.45,
        zIndex: 10,
      };
    case "back":
      return {
        ...base,
        left: "50%",
        height: isMobile ? "46%" : "56%",
        transform: "translate(-50%, -50%) scale(0.9)",
        filter: "blur(5px)",
        opacity: 0.2,
        zIndex: 5,
      };
  }
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === "next"
          ? (prev + 1) % PROJECTS.length
          : (prev + PROJECTS.length - 1) % PROJECTS.length
      );
      window.setTimeout(() => setIsAnimating(false), 650);
    },
    [isAnimating]
  );

  const roleByIndex = useMemo<Role[]>(() => {
    const roles: Role[] = new Array(PROJECTS.length);
    roles[activeIndex] = "center";
    roles[(activeIndex + PROJECTS.length - 1) % PROJECTS.length] = "left";
    roles[(activeIndex + 1) % PROJECTS.length] = "right";
    roles[(activeIndex + 2) % PROJECTS.length] = "back";
    return roles;
  }, [activeIndex]);

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
            A closer look at recent product, brand, and interface work —
            each box below is ready for your project details.
          </ScrollReveal>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => navigate("prev")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 transition-colors hover:border-accent-amber hover:text-accent-amber"
            >
              <ArrowLeft size={20} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => navigate("next")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 transition-colors hover:border-accent-amber hover:text-accent-amber"
            >
              <ArrowRight size={20} strokeWidth={2.25} />
            </button>
          </div>

          <a
            href="#contact"
            className={`${anton.className} hidden items-center gap-2 text-2xl uppercase leading-none tracking-tight text-paper/85 transition-opacity hover:text-paper hover:opacity-100 sm:flex`}
          >
            Discuss a project
            <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
          </a>
        </div>
      </div>

      <div className="relative h-[56vh] sm:h-[60vh] md:h-[64vh]">
        {PROJECTS.map((project, index) => {
          const role = roleByIndex[index];
          return (
            <div key={project.eyebrow} style={getBoxStyle(role, isMobile)}>
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
          );
        })}
      </div>
    </section>
  );
}
