"use client";

import "./luke.css";
import LukeBaffaitPortfolio from "@/components/luke/LukeBaffaitPortfolio";

export default function Home() {
  return (
    <main className="relative w-full bg-[#0a0a0a] text-[#f0f0f0] overflow-x-clip selection:bg-white selection:text-black">
      <LukeBaffaitPortfolio />
    </main>
  );
}
