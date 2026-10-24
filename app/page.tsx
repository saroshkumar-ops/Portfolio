import Navbar from "@/components/Navbar";
import AmoghStyleHero from "@/components/AmoghStyleHero";
import MarqueeRibbon from "@/components/ui/MarqueeRibbon";
import ScrollStackProjects from "@/components/ScrollStackProjects";
import InteractiveSkillsMenu from "@/components/InteractiveSkillsMenu";
import Gallery from "@/components/Gallery";
import AmoghPhilosophy from "@/components/AmoghPhilosophy";
import ContactOutro from "@/components/ContactOutro";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col bg-black">
        {/* Act I: Hero with Rotating Star Border & Kinetic Manifesto */}
        <AmoghStyleHero />

        {/* Act II: Giant 13vw Infinite Marquee Divider */}
        <MarqueeRibbon text="SELECTED WORKS" />

        {/* Act III: Pinned 3D Stacking Project Cards (Victor, Context Engine, GestureScroll, BharatAuto, Listny) */}
        <ScrollStackProjects />

        {/* Act IV: Full-Width Interactive Hover-Marquee Capabilities Menu */}
        <InteractiveSkillsMenu />

        {/* Act V: The Reelmark Curved Video Carousel Showcase (Requested for Gallery) */}
        <Gallery />

        {/* Act VI: Architectural Philosophy & KLE Tech Identity */}
        <AmoghPhilosophy />

        {/* Act VII: High-Impact Outro & 1-Click Clipboard Connect */}
        <ContactOutro />
      </main>
    </>
  );
}
