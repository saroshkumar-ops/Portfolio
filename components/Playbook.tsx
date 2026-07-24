import AuroraBackground from "@/components/AuroraBackground";
import ProjectCarousel from "@/components/ProjectCarousel";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function Playbook() {
  return (
    <section
      id="work"
      className="relative z-10 flex min-h-screen items-center overflow-hidden rounded-t-[2.5rem] bg-ink px-6 py-24 shadow-[0_-40px_80px_rgba(0,0,0,0.6)] md:px-12"
    >
      <AuroraBackground />

      <div className="relative grid w-full gap-16 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
            Approach
          </p>
          <ScrollReveal
            containerClassName="my-0"
            textClassName="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            baseRotation={4}
            blurStrength={6}
          >
            {"I build "}
            <span className="font-serif italic font-normal text-accent-mint">
              considered
            </span>
            {" interfaces that balance craft with clarity, for the web and beyond."}
          </ScrollReveal>
          <ScrollReveal
            containerClassName="my-0 mt-8"
            textClassName="max-w-md text-sm uppercase tracking-[0.14em] text-paper/50 font-normal leading-normal"
            baseRotation={2}
            blurStrength={4}
          >
            Product design / UX & UI / Brand systems
          </ScrollReveal>
        </div>

        <ProjectCarousel />
      </div>
    </section>
  );
}
