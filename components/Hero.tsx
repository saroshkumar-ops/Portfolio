"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { RefreshCw } from "lucide-react";
import LensReveal from "@/components/LensReveal";
import OptionWheel from "@/components/ui/option-wheel";
import ScrubVideoFrames, { type ScrubVideoFramesHandle } from "@/components/ui/scrub-video-frames";

const FOCUS_AREAS = [
  "AI Systems",
  "Backend Engineering",
  "Full-Stack Development",
  "Computer Vision",
  "Developer Tools",
];

const LANDING_FRAME_COUNT = 200;
const landingFrameSrc = (index: number) => `/Landing/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
const LANDING_VIDEO_SRC = "/Landing/large-sakura-tree.3840x2160.mp4";

export default function Hero({
  frameApiRef,
}: {
  frameApiRef?: RefObject<ScrubVideoFramesHandle | null>;
}) {
  const [mode, setMode] = useState<"animation" | "video">("animation");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mode === "video") {
      videoRef.current?.play().catch(() => {});
    }
  }, [mode]);

  return (
    <section
      id="top"
      className="relative h-full overflow-hidden bg-ink"
    >
      <div className="relative flex h-full flex-col justify-between px-6 pt-32 pb-12 md:px-12">
        <div className="absolute inset-0 z-0">
          {mode === "animation" ? (
            <ScrubVideoFrames ref={frameApiRef} frameCount={LANDING_FRAME_COUNT} frameSrc={landingFrameSrc} eager />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              src={LANDING_VIDEO_SRC}
            />
          )}
          <div className="absolute inset-0 bg-ink/70" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,_rgba(0,255,178,0.2),_transparent_70%)] blur-3xl"
        />

        <div className="relative flex flex-1 items-center">
          <LensReveal />
        </div>

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-wrap items-end gap-10 font-mono text-xs uppercase tracking-[0.14em] text-paper/60 md:gap-16">
            <div>
              <p className="font-semibold text-paper/90">Focus</p>
              <p className="text-white">AI &amp; Backend Systems</p>
            </div>
            <div>
              <p className="font-semibold text-paper/90">Based in</p>
              <p className="text-white">India [ 28°N, 77°E ]</p>
            </div>
            <div>
              <p className="font-semibold text-paper/90">Status</p>
              <p className="text-accent-mint font-bold">Open to Opportunities</p>
            </div>

            <button
              type="button"
              onClick={() => setMode((m) => (m === "animation" ? "video" : "animation"))}
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-ink/40 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.1em] text-paper/80 backdrop-blur-md transition-colors hover:border-accent-mint hover:text-accent-mint"
              data-cursor="hover"
            >
              <RefreshCw size={12} strokeWidth={2.25} />
              {mode === "animation" ? "Play 4K Video" : "Scrub Sequence"}
            </button>
          </div>

          <div
            aria-hidden
            className="hidden h-10 w-px animate-bounce self-end bg-accent-mint/60 md:block"
          />
        </div>
      </div>

      <div className="pointer-events-auto absolute right-6 top-1/2 hidden h-[46vh] w-56 -translate-y-1/2 xl:block xl:right-12">
        <OptionWheel
          items={FOCUS_AREAS}
          defaultSelected={0}
          side="right"
          textColor="#7c828f"
          activeColor="#00ffb2"
          fontSize={1.15}
          spacing={1.7}
          curve={1}
          tilt={9}
          blur={2.5}
          fade={0.35}
          smoothing={220}
          inset={24}
          loop
          draggable
        />
      </div>
    </section>
  );
}
