"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { useLenis } from "@/components/ScrollProvider";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Works", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState<string>("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState<string>("");

  // Live IST Clock (India Standard Time UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-GB", options).format(now) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: 0.25 }
    );

    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -30 });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/15 bg-[#090b1e]/80 px-4 py-2.5 shadow-[0_8px_32px_rgba(99,102,241,0.2)] backdrop-blur-2xl sm:px-6">
        {/* Brand / Logo */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="group flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-white transition-colors"
          data-cursor="hover"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
          </span>
          <span className="font-mono tracking-wider font-bold">SAROSH KUMAR</span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 font-mono text-xs font-medium tracking-wide transition-colors ${
                  isActive ? "text-cyan-300 font-bold" : "text-slate-400 hover:text-white"
                }`}
                data-cursor="hover"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Info: Live Time & CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-400 border-r border-white/10 pr-4">
            <span className="text-emerald-400">●</span>
            <span>{timeString || "00:00:00 IST"}</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            data-cursor="hover"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-full p-1.5 text-slate-400 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden rounded-3xl border border-white/15 bg-[#090b1e]/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 font-bold text-cyan-300 border border-cyan-400/30"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-slate-400">
              <p>India Standard Time: {timeString}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
