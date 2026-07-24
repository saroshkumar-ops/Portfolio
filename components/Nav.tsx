const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/60 px-6 py-5 backdrop-blur-md md:px-12 md:py-6">
      <a
        href="#top"
        className="text-sm font-bold tracking-[0.08em] uppercase"
      >
        Sarosh Kumar
      </a>
      <nav className="flex gap-4 text-[10px] font-medium tracking-[0.14em] uppercase text-paper/80 sm:gap-6 sm:text-xs md:gap-10 md:tracking-[0.18em]">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-accent-amber"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
