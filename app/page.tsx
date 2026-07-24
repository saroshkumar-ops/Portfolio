import Nav from "@/components/Nav";
import PinnedHero from "@/components/PinnedHero";
import Playbook from "@/components/Playbook";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <PinnedHero />
        <Playbook />
        <Contact />
      </main>
    </>
  );
}
