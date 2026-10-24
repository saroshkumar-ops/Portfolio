"use client";

interface MarqueeRibbonProps {
  text?: string;
  speed?: string;
  className?: string;
}

export default function MarqueeRibbon({
  text = "SELECTED WORKS",
  className = "",
}: MarqueeRibbonProps) {
  const items = Array.from({ length: 6 });

  return (
    <div className={`relative w-full overflow-hidden border-y border-white/10 bg-black py-4 select-none ${className}`}>
      <div className="animate-marquee flex items-center">
        {items.map((_, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <span className="font-sans text-[11vw] sm:text-[9vw] font-black uppercase tracking-tighter text-white/90 leading-none">
              {text}
            </span>
            <span className="font-sans text-[11vw] sm:text-[9vw] font-light text-accent-mint px-6 sm:px-10 leading-none">
              —
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
