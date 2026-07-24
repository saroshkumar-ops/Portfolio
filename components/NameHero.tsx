import HeroPortrait from "@/components/HeroPortrait";

/**
 * Alternate hero treatment: giant background type behind an overlapping
 * portrait, on a bold accent gradient. Kept as a separate section (not
 * replacing the primary LensReveal hero) so both can be compared before
 * deciding which one to keep.
 */
export default function NameHero() {
  return (
    <section
      id="intro"
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, var(--grad-red) 0%, var(--accent-amber) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center px-4"
      >
        <h2 className="whitespace-nowrap font-serif text-[22vw] font-normal leading-none tracking-tight text-paper sm:text-[20vw] md:text-[18vw]">
          SAROSH
        </h2>
      </div>

      <div className="relative z-10 h-[70%] w-[42%] max-w-sm overflow-hidden rounded-2xl border border-paper/20 shadow-2xl sm:h-[78%]">
        <HeroPortrait src="/sarosh.png" alt="Sarosh Kumar" />
      </div>
    </section>
  );
}
