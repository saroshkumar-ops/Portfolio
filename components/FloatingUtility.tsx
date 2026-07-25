"use client";

import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

const ITEMS = [
  { label: "Get in touch", href: "#contact", external: false },
  { label: "GitHub", href: "https://github.com/saroshkumar-ops", external: true },
];

/**
 * A small stack of fixed, always-visible utility links pinned under the nav,
 * inspired by the reference's persistent right-side notification cards.
 * Desktop-only (lg+) so it doesn't compete with the nav's hamburger/CTA
 * on small screens.
 */
export default function FloatingUtility() {
  return (
    <div className="pointer-events-auto fixed right-4 top-24 z-40 hidden flex-col items-end gap-2 lg:flex xl:right-8">
      {ITEMS.map(({ label, href, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center gap-2 rounded-full border border-paper/10 bg-ink/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-paper/70 shadow-lg shadow-black/30 backdrop-blur-xl transition-colors hover:border-accent-amber hover:text-accent-amber"
        >
          {label === "GitHub" ? <SiGithub className="h-3 w-3" /> : null}
          {label}
          <ArrowUpRight
            className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.25}
          />
        </a>
      ))}
    </div>
  );
}
