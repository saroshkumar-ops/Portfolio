import Nav from "@/components/Nav";
import PinnedHero from "@/components/PinnedHero";
import Playbook from "@/components/Playbook";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <PinnedHero />
        <Playbook />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
