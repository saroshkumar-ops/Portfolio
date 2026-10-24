"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 200;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/Landing/ezgif-frame-${padded}.jpg`;
}

export default function HeroCanvasScrubber() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const isLoadedRef = useRef<boolean>(false);
  const [loadPct, setLoadPct] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number = 0;
    let isUnmounted = false;

    // Canvas resize handler (crisp Retina scaling & cover math)
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      renderFrame(Math.round(currentFrameRef.current));
    };

    const renderFrame = (frameIndex: number) => {
      if (!ctx || !canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Find exact image or nearest available loaded frame
      let img = imagesRef.current.get(frameIndex);
      if (!img || !img.complete) {
        for (let diff = 1; diff <= 15; diff++) {
          const prev = imagesRef.current.get(frameIndex - diff);
          if (prev && prev.complete) {
            img = prev;
            break;
          }
          const next = imagesRef.current.get(frameIndex + diff);
          if (next && next.complete) {
            img = next;
            break;
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        // Draw image with cover aspect ratio
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const screenAspect = width / height;
        let drawW = width;
        let drawH = height;
        let offsetX = 0;
        let offsetY = 0;

        if (screenAspect > imgAspect) {
          drawW = width;
          drawH = width / imgAspect;
          offsetY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgAspect;
          offsetX = (width - drawW) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        // Add subtle neural dark tint so text pops with contrast
        ctx.fillStyle = "rgba(4, 7, 17, 0.45)";
        ctx.fillRect(0, 0, width, height);

        // Soft radial vignette
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          width * 0.15,
          width / 2,
          height / 2,
          width * 0.7
        );
        grad.addColorStop(0, "rgba(4, 7, 17, 0.1)");
        grad.addColorStop(1, "rgba(4, 7, 17, 0.85)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Fallback backdrop gradient while frame initializes
        ctx.fillStyle = "#040711";
        ctx.fillRect(0, 0, width, height);
      }
    };

    // Progressive frame loading
    const loadFrames = async () => {
      // 1. Load First Frame immediately
      const firstImg = new Image();
      firstImg.src = getFrameUrl(1);
      firstImg.onload = () => {
        if (isUnmounted) return;
        imagesRef.current.set(1, firstImg);
        renderFrame(1);
        isLoadedRef.current = true;
      };

      // 2. Load keyframes (every 5th frame) for rapid responsive scrubbing
      let loadedCount = 1;
      const keyframePromises: Promise<void>[] = [];
      for (let i = 5; i <= TOTAL_FRAMES; i += 5) {
        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (!isUnmounted) {
              imagesRef.current.set(i, img);
              loadedCount++;
              setLoadPct(Math.round((loadedCount / 40) * 100));
            }
            resolve();
          };
          img.onerror = () => resolve();
        });
        keyframePromises.push(p);
      }
      await Promise.all(keyframePromises);

      // 3. Load remaining frames sequentially in background
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isUnmounted) break;
        if (imagesRef.current.has(i)) continue;

        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (!isUnmounted) {
            imagesRef.current.set(i, img);
          }
        };
      }
    };

    handleResize();
    loadFrames();
    window.addEventListener("resize", handleResize, { passive: true });

    // GSAP ScrollTrigger Scrub
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.4,
      onUpdate: (self) => {
        const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(self.progress * (TOTAL_FRAMES - 1)) + 1));
        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          renderFrame(targetFrame);
        }
      },
    });

    return () => {
      isUnmounted = true;
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040711]/60 via-transparent to-[#040711] pointer-events-none" />
    </div>
  );
}
