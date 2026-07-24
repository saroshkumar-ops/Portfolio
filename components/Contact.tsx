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
          href="mailto:hello@example.com"
          className="block transition-colors hover:text-accent-amber"
        >
          <ScrollReveal
            containerClassName="my-0"
            textClassName="text-4xl font-bold leading-tight sm:text-6xl md:text-7xl"
            baseRotation={3}
            blurStrength={5}
          >
            hello@example.com
          </ScrollReveal>
        </a>
      </div>

      <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 text-xs uppercase tracking-[0.14em] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Jordan Ray. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-accent-amber">
            Instagram
          </a>
          <a href="#" className="transition-colors hover:text-accent-amber">
            Behance
          </a>
          <a href="#" className="transition-colors hover:text-accent-amber">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
