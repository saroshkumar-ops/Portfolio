"use client";

import { useState } from "react";
import InteractiveCanvas from "@/components/InteractiveCanvas";
import CreativeNavbar from "@/components/CreativeNavbar";
import CreativeHero from "@/components/CreativeHero";
import CreativeProjects from "@/components/CreativeProjects";
import Gallery from "@/components/Gallery";
import CreativeAbout from "@/components/CreativeAbout";
import CreativeContact from "@/components/CreativeContact";

export default function Home() {
  const [currentStyle, setCurrentStyle] = useState("swiss");

  return (
    <>
      {/* Interactive Screen Drawing Canvas (Inspired by creativeed.dev) */}
      <InteractiveCanvas />

      {/* Swiss Architectural Navigation with Live Style Switcher */}
      <CreativeNavbar
        currentStyle={currentStyle}
        onStyleChange={setCurrentStyle}
      />

      <main className="relative flex flex-col bg-[#090a10]">
        {/* Act I: Asymmetric Swiss Hero Monolith */}
        <CreativeHero currentStyle={currentStyle} />

        {/* Act II: Tactile Blueprints (Victor, Context Engine, GestureScroll, BharatAuto, Listny) */}
        <CreativeProjects />

        {/* Act III: 3D Cylindrical Viewport (TiltedGridHero) */}
        <Gallery />

        {/* Act IV: Identity, Engineering Philosophy & KLE Tech Context */}
        <CreativeAbout />

        {/* Act V: Monolith Outro & Direct Connection Plane */}
        <CreativeContact />
      </main>
    </>
  );
}
