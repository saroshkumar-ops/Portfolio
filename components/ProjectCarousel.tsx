"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    label: "Product Design",
    accent: "var(--grad-teal)",
    detail: "End-to-end UX for web & mobile products",
  },
  {
    label: "Brand Identity",
    accent: "var(--grad-gold)",
    detail: "Logo systems, type, and visual language",
  },
  {
    label: "Motion & Illustration",
    accent: "var(--grad-purple)",
    detail: "Custom illustration and interface motion",
  },
];

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-black/60 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-paper/10 px-6 py-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-lg font-bold uppercase tracking-tight md:text-2xl"
            >
              {slide.label}
            </motion.span>
          </AnimatePresence>
          <button
            type="button"
            onClick={next}
            aria-label="Next category"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/30 transition-colors hover:border-accent-amber hover:text-accent-amber"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative h-64 overflow-hidden md:h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${slide.accent}33, transparent 60%)`,
              }}
            >
              <p className="max-w-xs text-center text-sm text-paper/70 md:text-base">
                {slide.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-label={`Go to ${s.label}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-accent-amber" : "w-2 bg-paper/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
