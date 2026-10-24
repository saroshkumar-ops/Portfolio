"use client";

import { useRef, useEffect, useState } from "react";
import { MousePointer2 } from "lucide-react";

export default function CreativeLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<"NEURAL" | "RIPPLE" | "GRAVITY">("NEURAL");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener("resize", onResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      life?: number;
    }

    let particles: Particle[] = [];
    const colors = ["#00ffb2", "#00d2ff", "#ffffff", "#9d4edd"];

    const initParticles = () => {
      particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
      }));
    };
    initParticles();

    const mouse = { x: -1000, y: -1000, isDown: false };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isDown = true;

      // Spawn burst of particles on click
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 80,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (mouse.isDown && particles.length < 120) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.9,
          life: 60,
        });
      }
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const render = () => {
      // Create trailing motion blur effect
      ctx.fillStyle = "rgba(7, 8, 10, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Draw mode-specific graphics
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (activeMode === "NEURAL") {
          // Connect nearby nodes
          for (let j = i - 1; j >= 0; j--) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 255, 178, ${0.15 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        } else if (activeMode === "GRAVITY") {
          // Attract towards mouse
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 5 && dist < 300) {
            p.vx += (dx / dist) * 0.15;
            p.vy += (dy / dist) * 0.15;
          }
        }

        // Particle update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce or wrap
        if (p.x < 0 || p.x > width) p.vx *= -0.9;
        if (p.y < 0 || p.y > height) p.vy *= -0.9;

        // Life decay for temporary click particles
        if (p.life !== undefined) {
          p.life--;
          p.alpha = p.life / 80;
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(animId);
    };
  }, [activeMode]);

  return (
    <section id="lab" className="relative px-6 py-24 sm:px-10 md:px-16 lg:px-20">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
            <span>03</span>
            <span className="text-white/20">{"//"}</span>
            <span>CREATIVE LAB &amp; INTERACTIVE PHYSICS</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Interactive Neural Sandbox
          </h2>
          <p className="mt-2 text-sm text-paper-muted">
            Click, drag, and interact with the canvas to test kinetic velocity, gravity wells, and particle mesh topologies.
          </p>
        </div>

        {/* Mode Switchers */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-card p-1">
          {(["NEURAL", "GRAVITY", "RIPPLE"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-all ${
                activeMode === mode
                  ? "bg-accent-mint text-black"
                  : "text-paper-muted hover:text-white"
              }`}
              data-cursor="hover"
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sandbox Container */}
      <div
        className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-white/15 bg-ink-card shadow-2xl shadow-black select-none touch-none"
        data-cursor="drag"
        data-cursor-text="DRAG"
      >
        <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" />

        {/* Overlay Helper Badge */}
        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[11px] text-paper-muted backdrop-blur-md">
          <MousePointer2 className="h-3.5 w-3.5 text-accent-mint" />
          <span>Click &amp; Drag across canvas to manipulate particle vectors</span>
        </div>

        <div className="pointer-events-none absolute top-4 right-4 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-accent-mint backdrop-blur-md">
          FPS: 60+ // ACCELERATED
        </div>
      </div>
    </section>
  );
}
