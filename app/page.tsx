import Nav from "@/components/Nav";
import PinnedHero from "@/components/PinnedHero";
import Playbook from "@/components/Playbook";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <PinnedHero />
        <Playbook />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
