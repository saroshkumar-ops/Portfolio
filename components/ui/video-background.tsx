"use client";

import { useState } from "react";

export default function VideoBackground({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLoaded(true)}
        className="h-full w-full object-cover transition-opacity duration-[1800ms] ease-out"
        style={{ opacity: loaded ? 1 : 0, transform: `scale(${loaded ? 1 : 1.05})` }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
    </div>
  );
}
