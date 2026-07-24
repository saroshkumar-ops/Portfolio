"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface ScrubVideoFramesHandle {
  /** progress from 0 to 1 across the full frame sequence */
  setProgress: (progress: number) => void;
}

const ScrubVideoFrames = forwardRef<
  ScrubVideoFramesHandle,
  {
    /** Total number of frames, e.g. 120. */
    frameCount: number;
    /** Given a 1-indexed frame number, return its image URL. */
    frameSrc: (index: number) => string;
    className?: string;
  }
>(function ScrubVideoFrames({ frameCount, frameSrc, className = "" }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(1);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    const img = imagesRef.current[index - 1];
    if (!canvas || !ctx2d || !img || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
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
      const img = new Image();
      img.src = frameSrc(i);
      if (i === 1) {
        img.onload = () => draw(currentIndexRef.current);
      }
      images.push(img);
    }
    imagesRef.current = images;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      draw(currentIndexRef.current);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    return () => {
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.onload = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />;
});

export default ScrubVideoFrames;
