import Navbar from "@/components/Navbar";
import SaroshHero from "@/components/SaroshHero";
import SystemDossiers from "@/components/SystemDossiers";
import Gallery from "@/components/Gallery";
import AboutPersona from "@/components/AboutPersona";
import ContactOutro from "@/components/ContactOutro";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col bg-[#070814]">
        {/* Act I: Cybernetic Hero & Live Telemetry Control Plane */}
        <SaroshHero />

        {/* Act II: Systems Dossiers (Victor, Context Engine, GestureScroll, BharatAuto, Listny) */}
        <SystemDossiers />

        {/* Act III: 3D Cylindrical Viewport Gallery (TiltedGridHero) */}
        <Gallery />

        {/* Act IV: Identity, Engineering Philosophy & KLE Tech Context */}
        <AboutPersona />

        {/* Act V: High-Impact Outro & Direct Connection Plane */}
        <ContactOutro />
      </main>
    </>
  );
}
