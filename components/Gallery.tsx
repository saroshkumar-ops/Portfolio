"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const POSTER_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b7ebb74a-8c8a-4f7e-8f80-55e2d74ecd05.webp";
const VIDEO_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/04fd3d5f-99d7-476e-98a4-46c08518ffb3.mp4";

const CARD_COUNT = 10;
const PITCH = 196;
const TOTAL_WIDTH = CARD_COUNT * PITCH; // 1960

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Carousel physics state
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Cards layout state recomputed on animation frame
  const [, setTick] = useState(0);

  // Update scale factor (--u = min(100vw/1440, 100vh/1080))
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setIsMobile(vw <= 820);
      const computedScale = Math.min(vw / 1440, vh / 1080);
      setScale(computedScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous animation loop: auto-scroll right -> left (offset decreases) + momentum coasting
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      if (!isDraggingRef.current) {
        // Coasting deceleration (velocity decays 95% per second)
        if (Math.abs(velocityRef.current) > 1) {
          scrollRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.05, dt);
        } else {
          // Slow continuous auto-scroll: ~50u per second (moving left)
          scrollRef.current -= 50 * dt;
        }

        // Loop seamlessly in [0, TOTAL_WIDTH]
        scrollRef.current =
          ((scrollRef.current % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;

        setTick((t) => t + 1);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pointer drag interactions
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dt = (now - lastTimeRef.current) / 1000;
      const dx = (e.clientX - lastPointerXRef.current) / (scale || 1);

      scrollRef.current += dx;
      scrollRef.current =
        ((scrollRef.current % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;

      if (dt > 0.005) {
        velocityRef.current = dx / dt;
      }

      lastPointerXRef.current = e.clientX;
      lastTimeRef.current = now;
      setTick((t) => t + 1);
    },
    [scale]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  // Generate rounded quad path for cards
  const getRoundedQuadPath = (
    w: number,
    hL: number,
    hR: number,
    r: number = 15
  ) => {
    const maxH = Math.max(hL, hR);
    const yTL = (maxH - hL) / 2;
    const yBL = yTL + hL;
    const yTR = (maxH - hR) / 2;
    const yBR = yTR + hR;

    return `M ${r} ${yTL} L ${w - r} ${yTR} Q ${w} ${yTR} ${w} ${
      yTR + r
    } L ${w} ${yBR - r} Q ${w} ${yBR} ${w - r} ${yBR} L ${r} ${yBL} Q 0 ${yBL} 0 ${
      yBL - r
    } L 0 ${yTL + r} Q 0 ${yTL} ${r} ${yTL} Z`;
  };

  const u = scale;

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F8EF] select-none text-[#101410]"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 1440 x 1080 Contained Frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 1440 * u,
          height: 1080 * u,
          transformOrigin: "center center",
        }}
      >
        {/* --- Top Bar --- */}
        {/* Logo: (37, 36) */}
        <div
          className="absolute flex items-center gap-2 font-bold tracking-tight"
          style={{
            left: 37 * u,
            top: 36 * u,
            fontSize: 22 * u,
            color: "#101410",
          }}
        >
          {/* Green leaf mark */}
          <svg
            width={26 * u}
            height={26 * u}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#08482D"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="font-sans font-bold">Reelmark</span>
        </div>

        {/* Nav: (505, 36) with 31u gap */}
        {!isMobile && (
          <nav
            className="absolute flex items-center"
            style={{
              left: 505 * u,
              top: 39 * u,
              gap: 31 * u,
              fontSize: 16.4 * u,
              color: "#5E5E61",
            }}
          >
            {["Brands", "Creators", "Pricing", "Use Cases", "Contact"].map(
              (item) => (
                <span
                  key={item}
                  className="cursor-pointer transition-colors hover:text-[#101410] font-medium"
                >
                  {item}
                </span>
              )
            )}
          </nav>
        )}

        {/* Buttons: Log in at (1211, 29) & Sign up at (1304, 29) */}
        <div
          className="absolute flex items-center gap-3"
          style={{ right: 39 * u, top: 29 * u }}
        >
          {!isMobile && (
            <button
              className="flex items-center justify-center rounded-full bg-white font-medium shadow-sm transition-transform hover:scale-105"
              style={{
                width: 92 * u,
                height: 40 * u,
                fontSize: 14 * u,
                color: "#101410",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              Log in
            </button>
          )}
          <button
            className="flex items-center justify-center rounded-full font-medium text-white shadow-sm transition-transform hover:scale-105"
            style={{
              width: 97 * u,
              height: 40 * u,
              fontSize: 14 * u,
              backgroundColor: "#08482D",
            }}
          >
            Sign up
          </button>
        </div>

        {/* --- Badge: 292x37 at (575, 115) --- */}
        <div
          className="absolute flex items-center justify-center rounded-full font-medium"
          style={{
            left: 575 * u,
            top: 115 * u,
            width: 292 * u,
            height: 37 * u,
            backgroundColor: "#DAE7C7",
            color: "#08482D",
            fontSize: 14.5 * u,
          }}
        >
          <span>Trusted by 120,000+ indie makers</span>
        </div>

        {/* --- Headline: Centred at top 176 --- */}
        <div
          className="absolute inset-x-0 text-center"
          style={{
            top: 176 * u,
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter Tight', 'Inter', sans-serif",
              fontSize: 88 * u,
              lineHeight: `${92 * u}px`,
              fontWeight: 700,
              color: "#101410",
              letterSpacing: "-0.035em",
            }}
          >
            Captivate Crowds
          </h1>
          <h1
            style={{
              fontFamily: "'Inter Tight', 'Inter', sans-serif",
              fontSize: 88 * u,
              lineHeight: `${92 * u}px`,
              fontWeight: 700,
              color: "#101410",
              letterSpacing: "-0.022em",
            }}
          >
            with Snackable Reels
          </h1>
        </div>

        {/* --- Subline: Centred at top 394 --- */}
        <div
          className="absolute inset-x-0 text-center font-normal"
          style={{
            top: 394 * u,
            fontSize: 20.8 * u,
            lineHeight: `${32 * u}px`,
            color: "#5E5E61",
          }}
        >
          <p>Grow your brand with short, snappy product clips by</p>
          <p>our handpicked video makers. Our crew is ready to</p>
          <p>lift your next launch higher.</p>
        </div>

        {/* --- Hand-drawn Notes & Doodles (Caveat 600, Forest Green) --- */}
        {/* 1. "//" doodle at (263, 377) */}
        <svg
          className="absolute pointer-events-none"
          style={{
            left: 263 * u,
            top: 377 * u,
            width: 40 * u,
            height: 40 * u,
          }}
          viewBox="0 0 40 40"
        >
          <path
            d="M 8 32 L 20 6"
            stroke="#08482D"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 18 32 L 30 6"
            stroke="#08482D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* 2. "Be seen / with clips" rotated 16° at (1212, 310) with curving arrow */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 1212 * u,
            top: 310 * u,
            transform: "rotate(16deg)",
            transformOrigin: "left top",
            fontFamily: "'Caveat', cursive",
            fontSize: 28 * u,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#08482D",
          }}
        >
          <span>
            Be seen
            <br />
            with clips
          </span>

          {/* Curving arrow that starts below the note and curls down to the cards */}
          <svg
            className="absolute"
            style={{
              top: 55 * u,
              left: -35 * u,
              width: 140 * u,
              height: 180 * u,
              overflow: "visible",
            }}
            viewBox="0 0 140 180"
          >
            <path
              d="M 40 0 C 35 45, -20 80, -60 120 C -85 145, -95 160, -98 185"
              stroke="#08482D"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            <path
              d="M -106 173 L -98 187 L -88 178"
              stroke="#08482D"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 3. "Zero cost" rotated 24° at (521, 937) with small arrow to button */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 521 * u,
            top: 937 * u,
            transform: "rotate(24deg)",
            transformOrigin: "left top",
            fontFamily: "'Caveat', cursive",
            fontSize: 26 * u,
            fontWeight: 600,
            color: "#08482D",
          }}
        >
          <span>Zero cost</span>
          <svg
            className="absolute"
            style={{
              left: 85 * u,
              top: 5 * u,
              width: 50 * u,
              height: 30 * u,
              overflow: "visible",
            }}
            viewBox="0 0 50 30"
          >
            <path
              d="M 0 15 C 15 12, 30 8, 40 2"
              stroke="#08482D"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 32 0 L 41 2 L 35 10"
              stroke="#08482D"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* --- Curved Video Carousel (10 Cards) --- */}
        <div
          className="absolute inset-x-0 cursor-grab active:cursor-grabbing touch-none select-none"
          style={{
            top: 480 * u,
            height: 420 * u,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {Array.from({ length: CARD_COUNT }).map((_, i) => {
            // Unpushed linear offset t relative to centre 720
            const p = (i * PITCH + scrollRef.current) % TOTAL_WIDTH;
            let t = p < 0 ? p + TOTAL_WIDTH : p;
            t = t - TOTAL_WIDTH / 2; // in [-980, 980]

            // Outward pushed center x formula
            const pushedX = 720 + t * (1 + 0.083 * Math.pow(t / 706, 2));

            // Normalized distance d = |x - 720| / 706
            const d = Math.abs(pushedX - 720) / 706;

            // Width = (170 + 48 * d^2)
            const w = 170 + 48 * d * d;

            // Edges
            const xLeft = pushedX - w / 2;
            const xRight = pushedX + w / 2;
            const qLeft = Math.abs(xLeft - 720) / 706;
            const qRight = Math.abs(xRight - 720) / 706;

            // Heights
            const hLeft = 280 + 92 * Math.pow(qLeft, 2.6);
            const hRight = 280 + 92 * Math.pow(qRight, 2.6);
            const maxH = Math.max(hLeft, hRight);

            // Vertical center sits at (687 - 12 * d^2)
            const yCenter = 687 - 12 * d * d;

            // Card top
            const topY = yCenter - maxH / 2;

            // Clip path
            const clipPathStr = `path('${getRoundedQuadPath(w, hLeft, hRight, 15)}')`;

            // Tile position in 5x2 grid
            const col = i % 5;
            const row = Math.floor(i / 5);

            // Skip rendering if way off-screen
            if (pushedX < -300 || pushedX > 1740) return null;

            return (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: xLeft * u,
                  top: (topY - 480) * u,
                  width: w * u,
                  height: maxH * u,
                  clipPath: clipPathStr,
                  WebkitClipPath: clipPathStr,
                }}
              >
                {/* 5x2 Tile Video & Poster Container */}
                <div
                  className="relative h-full w-full overflow-hidden bg-[#08482D]/10"
                  style={{
                    backgroundColor: "#DAE7C7",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      width: `${500}%`,
                      height: `${200}%`,
                      left: `-${col * 100}%`,
                      top: `-${row * 100}%`,
                    }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={POSTER_SRC}
                      src={VIDEO_SRC}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Frosted Play Icon at Bottom-Left */}
                  <div
                    className="absolute flex items-center justify-center rounded-full"
                    style={{
                      left: 14 * u,
                      bottom: 14 * u,
                      width: 28 * u,
                      height: 28 * u,
                      backgroundColor: "rgba(255, 255, 255, 0.55)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    <svg
                      width={11 * u}
                      height={11 * u}
                      viewBox="0 0 24 24"
                      fill="#08482D"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Button: Forest-green "Make a Reel" pill inside dashed ring --- */}
        {/* Dashed outline ring (190x74) at (617, 893) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: 617 * u,
            top: 893 * u,
            width: 190 * u,
            height: 74 * u,
            border: `${1.8 * u}px dashed #08482D`,
          }}
        />

        {/* Green "Make a Reel" pill (172x58) at (626, 901) */}
        <button
          className="absolute flex items-center justify-center rounded-full font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          style={{
            left: 626 * u,
            top: 901 * u,
            width: 172 * u,
            height: 58 * u,
            backgroundColor: "#08482D",
            fontSize: 16 * u,
          }}
        >
          Make a Reel
        </button>
      </div>
    </section>
  );
}
