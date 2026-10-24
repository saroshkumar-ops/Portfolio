"use client";

import { useRef, useEffect, useState } from "react";
import { MousePointer2, RotateCcw, Sparkles } from "lucide-react";

export default function CreativePlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState<string>("#00ffb2");

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

    interface StrokeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const particles: StrokeParticle[] = [];
    let isPointerDown = false;
    const lastPos = { x: -100, y: -100 };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      isPointerDown = true;
      lastPos.x = x;
      lastPos.y = y;

      // Burst of particles on click
      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3.5 + 1.5,
          color: currentColor,
          alpha: 1,
          life: 90,
          maxLife: 90,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spawn smooth trail between last and current pos
      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(Math.floor(dist / 6), 8);

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        particles.push({
          x: lastPos.x + dx * t + (Math.random() - 0.5) * 6,
          y: lastPos.y + dy * t + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          radius: Math.random() * 3 + 1.5,
          color: currentColor,
          alpha: 0.9,
          life: 75,
          maxLife: 75,
        });
      }

      lastPos.x = x;
      lastPos.y = y;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const render = () => {
      // Soft trail fade
      ctx.fillStyle = "rgba(5, 5, 7, 0.2)";
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = p.life / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
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
  }, [currentColor]);

  return (
    <section id="lab" className="relative px-6 py-28 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 bg-ink-card/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-mint">
              <span>03</span>
              <span className="text-white/20">{"//"}</span>
              <span>CREATIVE LAB &amp; CANVAS</span>
            </div>
            <h2 className="mt-3 font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Interactive Canvas
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-paper-muted">
              Click &amp; drag anywhere to paint glowing kinetic light trails.
            </p>
          </div>

          {/* Color Palettes */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-card p-1.5">
            {[
              { label: "Mint", color: "#00ffb2" },
              { label: "Cyan", color: "#00d2ff" },
              { label: "Purple", color: "#9d4edd" },
              { label: "White", color: "#ffffff" },
            ].map((c) => (
              <button
                key={c.label}
                onClick={() => setCurrentColor(c.color)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs transition-all ${
                  currentColor === c.color
                    ? "bg-white text-black font-bold"
                    : "text-paper-muted hover:text-white"
                }`}
                data-cursor="hover"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Surface */}
        <div
          className="relative h-[440px] w-full overflow-hidden rounded-3xl border border-white/15 bg-black/90 shadow-2xl select-none touch-none"
          data-cursor="drag"
          data-cursor-text="DRAW"
        >
          <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" />

          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3.5 py-1.5 font-mono text-[11px] text-paper-muted backdrop-blur-md">
            <MousePointer2 className="h-3.5 w-3.5 text-accent-mint" />
            <span>Click &amp; drag pointer to draw kinetic light physics</span>
          </div>

          <div className="pointer-events-none absolute top-4 right-4 rounded-md border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-accent-mint backdrop-blur-md">
            60FPS GPU ACCELERATED
          </div>
        </div>
      </div>
    </section>
  );
}
