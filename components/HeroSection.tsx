"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { LinkedInIcon } from "@/components/ui/icons";
import { useLenis } from "@/components/ScrollProvider";

export default function HeroSection() {
  const { scrollTo } = useLenis();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lightweight Interactive Particle Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const mouse = { x: -1000, y: -1000, radius: 150 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Particle nodes
    const particleCount = Math.min(width > 768 ? 60 : 30, 75);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 178, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 178, 0.45)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 pt-32 pb-12 sm:px-10 md:px-16 lg:px-20"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      />

      {/* Subtle Radial Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(0,255,178,0.12),_transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-100px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(0,210,255,0.08),_transparent_70%)] blur-3xl"
      />

      {/* Header Info Tagline */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono uppercase tracking-wider text-paper-muted">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
          <span>PORTFOLIO // 2026</span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">28°38&apos; N, 77°13&apos; E</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-mint opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-mint" />
          </span>
          <span className="text-paper">Available for New Engineering Roles</span>
        </motion.div>
      </div>

      {/* Center Kinetic Hero Headline */}
      <div className="relative z-10 my-auto py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-2 md:space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-accent-mint uppercase"
          >
            <Zap className="h-4 w-4" />
            <span>AI Systems · Autonomous Agents · Distributed Backends</span>
          </motion.div>

          {/* Massive Inter Monolith Typography */}
          <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.92] select-none">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Sarosh
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-paper-muted"
            >
              Kumar
            </motion.span>
          </h1>
        </motion.div>

        {/* Sub-Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-paper-muted leading-relaxed font-light"
        >
          Architecting deterministic AI desktop control planes, autonomous SRE incident recovery engines, and low-latency systems. Bridging deep systems engineering with kinetic creative interfaces.
        </motion.div>

        {/* Quick CTA and Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("#projects", { offset: -40 })}
            className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-accent-mint hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
            data-cursor="hover"
          >
            <span>Explore Selected Work</span>
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            data-cursor="hover"
          >
            <SiGithub className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-paper-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/sarosh-kumar-132111297/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            data-cursor="hover"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-paper-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 font-mono text-xs"
      >
        <div>
          <p className="text-[10px] text-paper-subtle uppercase">P95 Retrieval Latency</p>
          <p className="mt-1 font-bold text-white text-sm sm:text-base">~124ms</p>
        </div>
        <div>
          <p className="text-[10px] text-paper-subtle uppercase">Benchmark Recall@5</p>
          <p className="mt-1 font-bold text-accent-mint text-sm sm:text-base">100%</p>
        </div>
        <div>
          <p className="text-[10px] text-paper-subtle uppercase">Autonomous Control</p>
          <p className="mt-1 font-bold text-white text-sm sm:text-base">Zero-Focus Hijack</p>
        </div>
        <div>
          <p className="text-[10px] text-paper-subtle uppercase">Core Architecture</p>
          <p className="mt-1 font-bold text-white text-sm sm:text-base">Local-First / ML</p>
        </div>
      </motion.div>
    </section>
  );
}
