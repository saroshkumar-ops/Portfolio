import LensReveal from "@/components/LensReveal";
import { StarsBackground } from "@/components/ui/stars";
import GradualBlur from "@/components/ui/gradual-blur";
import OptionWheel from "@/components/ui/option-wheel";
import TextPressure from "@/components/ui/text-pressure";
import { robotoFlex } from "@/lib/fonts";

const FOCUS_AREAS = [
  "Product Design",
  "UX & UI",
  "Brand Identity",
  "Web Development",
  "Motion & Illustration",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-full overflow-hidden bg-ink"
    >
      <StarsBackground className="flex h-full flex-col justify-between px-6 pt-32 pb-12 md:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,_rgba(53,110,232,0.35),_transparent_70%)] blur-3xl"
        />

        <div className="relative hidden h-16 w-full max-w-2xl shrink-0 sm:block sm:h-20 md:h-24">
          <TextPressure
            text="WELCOME"
            fontFamily={robotoFlex.style.fontFamily}
            fontUrl=""
            textColor="#e8452c"
            minFontSize={20}
            flex
            width
            weight
            italic={false}
            alpha={false}
            stroke={false}
            scale
          />
        </div>

        <div className="relative flex flex-1 items-center">
          <LensReveal />
        </div>

        <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-wrap gap-10 text-xs uppercase tracking-[0.14em] text-paper/60 md:gap-16">
            <div>
              <p className="font-semibold text-paper/90">Product / Brand</p>
              <p>Design & Motion</p>
            </div>
            <div>
              <p className="font-semibold text-paper/90">Based in</p>
              <p>Remote, worldwide</p>
            </div>
            <div>
              <p className="font-semibold text-paper/90">Status</p>
              <p>Open for new projects</p>
            </div>
          </div>

          <div
            aria-hidden
            className="hidden h-10 w-px animate-bounce self-end bg-paper/40 md:block"
          />
        </div>
      </StarsBackground>

      <div className="pointer-events-auto absolute right-6 top-1/2 hidden h-[46vh] w-56 -translate-y-1/2 xl:block xl:right-12">
        <OptionWheel
          items={FOCUS_AREAS}
          defaultSelected={0}
          side="right"
          textColor="#7c828f"
          activeColor="#f5a623"
          fontSize={1.15}
          spacing={1.7}
          curve={1}
          tilt={9}
          blur={2.5}
          fade={0.35}
          smoothing={220}
          inset={24}
          loop
          draggable
        />
      </div>

      <GradualBlur
        target="parent"
        position="bottom"
        preset="subtle"
        curve="bezier"
      />
    </section>
  );
}
