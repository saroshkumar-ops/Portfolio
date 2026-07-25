"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface ScrubVideoFramesHandle {
  /** progress from 0 to 1 across the full frame sequence */
  setProgress: (progress: number) => void;
}

/** Caps the canvas backing-store resolution so full-bleed background draws
 * stay cheap on large/ultrawide viewports; the canvas element itself still
 * fills its container via CSS, so this only affects internal draw cost. */
const MAX_CANVAS_WIDTH = 1600;

interface DrawGeometry {
  drawWidth: number;
  drawHeight: number;
  offsetX: number;
  offsetY: number;
}

function computeCoverGeometry(canvasWidth: number, canvasHeight: number, img: HTMLImageElement): DrawGeometry {
  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > canvasRatio) {
    drawHeight = canvasHeight;
    drawWidth = drawHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
  } else {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imgRatio;
    offsetY = (canvasHeight - drawHeight) / 2;
  }

  return { drawWidth, drawHeight, offsetX, offsetY };
}

const ScrubVideoFrames = forwardRef<
  ScrubVideoFramesHandle,
  {
    /** Total number of frames, e.g. 120. */
    frameCount: number;
    /** Given a 1-indexed frame number, return its image URL. */
    frameSrc: (index: number) => string;
    /** If true, all frames start downloading immediately on mount instead of
     * waiting until the section is nearly in view. Use for above-the-fold
     * sections where frame 1 alone isn't enough (e.g. the landing hero). */
    eager?: boolean;
    className?: string;
  }
>(function ScrubVideoFrames({ frameCount, frameSrc, eager = false, className = "" }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(1);
  const lastDrawnIndexRef = useRef(0);
  const geometryRef = useRef<DrawGeometry | null>(null);

  const draw = (index: number, force = false) => {
    if (!force && index === lastDrawnIndexRef.current) return;

    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    const img = imagesRef.current[index - 1];
    if (!canvas || !ctx2d || !img || !img.complete || img.naturalWidth === 0) return;

    lastDrawnIndexRef.current = index;

    if (!geometryRef.current) {
      geometryRef.current = computeCoverGeometry(canvas.width, canvas.height, img);
    }
    const { drawWidth, drawHeight, offsetX, offsetY } = geometryRef.current;

    // Cover-fit geometry always fully overwrites the canvas, so no clearRect needed.
    ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useImperativeHandle(ref, () => ({
    setProgress: (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const index = Math.max(1, Math.min(frameCount, Math.round(clamped * (frameCount - 1)) + 1));
      currentIndexRef.current = index;
      draw(index);
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      images.push(new Image());
    }
    imagesRef.current = images;

    const loadFrame = (index: number, onFirstLoad?: () => void) => {
      const img = images[index - 1];
      if (!img || img.src) return;
      if (onFirstLoad) img.onload = onFirstLoad;
      img.src = frameSrc(index);
    };

    // Frame 1 always loads immediately so the poster frame is ready as soon
    // as the canvas is visible, regardless of eager/lazy loading below.
    loadFrame(1, () => draw(currentIndexRef.current));

    let intersectionObserver: IntersectionObserver | null = null;

    const loadRemainingFrames = () => {
      for (let i = 2; i <= frameCount; i++) loadFrame(i);
    };

    if (eager) {
      loadRemainingFrames();
    } else {
      const parent = canvas.parentElement;
      if (parent && "IntersectionObserver" in window) {
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              loadRemainingFrames();
              intersectionObserver?.disconnect();
            }
          },
          { rootMargin: "150% 0px" }
        );
        intersectionObserver.observe(parent);
      } else {
        loadRemainingFrames();
      }
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const scale = Math.min(1, MAX_CANVAS_WIDTH / rect.width);
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
      geometryRef.current = null;
      draw(currentIndexRef.current, true);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      images.forEach((img) => {
        img.onload = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, eager]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />;
});

export default ScrubVideoFrames;
