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
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            {"I build "}
            <span className="font-serif italic font-normal text-accent-mint">
              intelligent
            </span>
            {" systems — from real-time backends to AI-powered tools, sharpened through hackathons and hands-on engineering."}
          </ScrollReveal>
          <ScrollReveal
            containerClassName="my-0 mt-8"
            textClassName="max-w-md text-sm uppercase tracking-[0.14em] text-paper/50 font-normal leading-normal"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            AI Systems / Backend Engineering / Full-Stack Development
          </ScrollReveal>
        </div>

        <ProjectCarousel />
      </div>
    </section>
  );
}
