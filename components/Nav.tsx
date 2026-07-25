"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#intro", id: "intro" },
  { label: "Approach", href: "#approach", id: "approach" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-paper/10 bg-ink/70 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur-xl md:px-5">
        <a
          href="#top"
          className="shrink-0 text-xs font-bold tracking-[0.08em] text-paper uppercase transition-colors hover:text-accent-amber"
        >
          Sarosh Kumar
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors ${
                  isActive ? "bg-paper/10 text-paper" : "text-paper/60 hover:text-paper"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden shrink-0 rounded-full bg-paper px-4 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:bg-accent-amber md:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-8 w-8 items-center justify-center rounded-full text-paper transition-colors hover:text-accent-amber md:hidden"
        >
          {isMenuOpen ? <X size={18} strokeWidth={2.25} /> : <Menu size={18} strokeWidth={2.25} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-3 flex max-w-4xl flex-col gap-1 rounded-3xl border border-paper/10 bg-ink/90 p-3 shadow-lg shadow-black/30 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium tracking-[0.06em] uppercase transition-colors ${
                    isActive ? "bg-paper/10 text-paper" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-1 rounded-2xl bg-paper px-4 py-3 text-center text-sm font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:bg-accent-amber"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
