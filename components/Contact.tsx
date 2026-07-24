import ScrollReveal from "@/components/ui/scroll-reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] flex-col justify-between bg-ink px-6 py-16 md:px-12"
    >
      <div>
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
          Contact
        </p>
        <a
          href="mailto:Saroshkumar00@gmail.com"
          className="block transition-colors hover:text-accent-amber"
        >
          <ScrollReveal
            containerClassName="my-0"
            textClassName="text-4xl font-bold leading-tight sm:text-6xl md:text-7xl"
            baseRotation={0}
            baseOpacity={0.2}
            enableBlur={false}
          >
            Saroshkumar00@gmail.com
          </ScrollReveal>
        </a>
      </div>

      <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 text-xs uppercase tracking-[0.14em] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Sarosh Kumar. All rights reserved.</span>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/sarosh-kumar-132111297/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent-amber"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/saroshkumar-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent-amber"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
