"use client";

import RedesignNavbar from "@/components/redesign/Navbar";
import ScrollHUD from "@/components/redesign/ScrollHUD";
import RedesignHero from "@/components/redesign/HeroSection";
import UnderHeroReveal from "@/components/redesign/UnderHeroReveal";
import ProjectsStack from "@/components/redesign/ProjectsStack";
import ResearchPortal from "@/components/redesign/ResearchPortal";
import SkillsMatrix from "@/components/redesign/SkillsMatrix";
import HackathonsRadar from "@/components/redesign/HackathonsRadar";
import ContactTerminal from "@/components/redesign/ContactTerminal";
import CurtainFooter from "@/components/redesign/CurtainFooter";

export default function Home() {
  return (
    <>
      {/* Dynamic Floating Glass Header & Fullscreen Menu */}
      <RedesignNavbar />

      {/* Real-time Percentage & Coordinate HUD */}
      <ScrollHUD />

      {/* Fixed Under-the-Hero Architectural Blueprint (Revealed as Hero slides up) */}
      <UnderHeroReveal />

      <main className="relative flex flex-col bg-transparent">
        {/* Act 0: The Hero Monolith with Canvas Scrubbing & Kinetic Typography */}
        <RedesignHero />

        {/* 100vh Transparent Spacer: lets the Hero slide off, revealing the fixed UnderHero Blueprint */}
        <div id="about" className="h-screen w-full pointer-events-none" />

        {/* Act I: Pinned Card Stack Deck with Dynamic Lenis Lerp Friction */}
        <ProjectsStack />

        {/* Act II: Expanding Center Portal Canvas (Open-Source Research Observatory) */}
        <ResearchPortal />

        {/* Act III: Interactive Categorized Tech Ecosystem */}
        <SkillsMatrix />

        {/* Act IV: Focal-Line Hackathons Radar & Leadership Showcase */}
        <HackathonsRadar />

        {/* Act V: Interactive Command Terminal & Transmission Deck */}
        <ContactTerminal />

        {/* Act VI: Parallax Curtain Reveal Footer */}
        <CurtainFooter />
      </main>
    </>
  );
}
