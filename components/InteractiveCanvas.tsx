"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PenTool, Eraser, Trash2, X, Check, Palette } from "lucide-react";

const COLORS = [
  { name: "Acid Lime", hex: "#d4ff00" },
  { name: "Electric Blue", hex: "#0066ff" },
  { name: "Hot Vermilion", hex: "#ff3b00" },
  { name: "Neon Pink", hex: "#ff007f" },
  { name: "Pure White", hex: "#ffffff" },
];

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#d4ff00");
  const [strokeWidth, setStrokeWidth] = useState(3.5);
  const [hasDrawn, setHasDrawn] = useState(false);
  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to match full page scroll height and width
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = document.documentElement.scrollHeight || window.innerHeight;

    // Save previous canvas content if needed
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // Restore previous drawing
      ctx.drawImage(tempCanvas, 0, 0, width, height);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, [resizeCanvas]);

  // Pointer event handlers for drawing
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode) return;
    isPointerDownRef.current = true;
    setHasDrawn(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPointRef.current = { x, y };

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = selectedColor;
      ctx.arc(x, y, strokeWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !isPointerDownRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx && lastPointRef.current) {
      ctx.beginPath();
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = strokeWidth;
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      // Quadratic curve for silky smooth strokes
      const midX = (lastPointRef.current.x + currentX) / 2;
      const midY = (lastPointRef.current.y + currentY) / 2;
      ctx.quadraticCurveTo(lastPointRef.current.x, lastPointRef.current.y, midX, midY);
      ctx.stroke();
    }
    lastPointRef.current = { x: currentX, y: currentY };
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  return (
    <>
      {/* Absolute full-document drawing canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`absolute inset-0 z-40 ${
          isDrawingMode
            ? "pointer-events-auto cursor-crosshair"
            : "pointer-events-none"
        }`}
      />

      {/* Floating Interactive Canvas Bar (Inspired by creativeed.dev) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#0d0f17]/90 px-3 py-2 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setIsDrawingMode(!isDrawingMode)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
            isDrawingMode
              ? "bg-[#d4ff00] text-black shadow-[0_0_20px_rgba(212,255,0,0.5)]"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          title="Toggle interactive drawing on the page"
        >
          <PenTool className="h-3.5 w-3.5" />
          <span>{isDrawingMode ? "Drawing Active" : "Draw on Screen"}</span>
        </button>

        {isDrawingMode && (
          <>
            {/* Color swatches */}
            <div className="flex items-center gap-1.5 px-2 border-l border-white/10">
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`h-5 w-5 rounded-full transition-transform ${
                    selectedColor === c.hex ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Clear Button */}
            <button
              onClick={clearCanvas}
              className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              title="Clear drawings"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </>
  );
}
