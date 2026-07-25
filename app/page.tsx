import Nav from "@/components/Nav";
import FloatingUtility from "@/components/FloatingUtility";
import PinnedHero from "@/components/PinnedHero";
import NameHero from "@/components/NameHero";
import Playbook from "@/components/Playbook";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <FloatingUtility />
      <main>
        <PinnedHero />
        <NameHero />
        <Playbook />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
