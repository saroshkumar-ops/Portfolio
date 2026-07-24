"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { kanit } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

// Simple Icons dropped the LinkedIn glyph (trademark takedown), so it's
// inlined here instead of pulling from react-icons/lucide.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sarosh-kumar-132111297/",
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/saroshkumar-ops",
    icon: SiGithub,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      gsap.set(targets, { y: 40, opacity: 0 });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink px-6 py-20 md:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(232,69,44,0.16),_transparent_70%)] blur-3xl"
      />

      <div className="relative flex flex-1 flex-col justify-center">
        <p data-reveal className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
          Contact
        </p>

        <h2
          data-reveal
          className={`${kanit.className} gradient-heading max-w-3xl text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl`}
        >
          Let&apos;s build something intelligent.
        </h2>

        <a
          data-reveal
          href="mailto:Saroshkumar00@gmail.com"
          className="group mt-10 inline-flex w-fit items-center gap-4 rounded-full border border-paper/15 bg-ink-soft px-6 py-4 transition-colors hover:border-accent-amber sm:px-8 sm:py-5"
        >
          <span className="text-xl font-semibold text-paper transition-colors group-hover:text-accent-amber sm:text-2xl md:text-3xl">
            Saroshkumar00@gmail.com
          </span>
          <ArrowUpRight
            className="h-6 w-6 shrink-0 text-paper/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-amber"
            strokeWidth={2}
          />
        </a>

        <div data-reveal className="mt-8 flex flex-wrap items-center gap-4 text-sm text-paper/60">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent-amber" strokeWidth={2} />
            Hubli, India
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-mint" />
            Open to opportunities
          </span>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-5 py-2.5 text-sm text-paper/80 transition-colors hover:border-accent-amber hover:text-accent-amber"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <div
        data-reveal
        className="relative mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 text-xs uppercase tracking-[0.14em] text-paper/50 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>&copy; {new Date().getFullYear()} Sarosh Kumar. All rights reserved.</span>
        <span>Built with Next.js, GSAP &amp; a lot of scroll.</span>
      </div>
    </section>
  );
}
