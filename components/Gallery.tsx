import SpiralGallery from "@/components/ui/spiral-gallery";
import { kanit } from "@/lib/fonts";

const GALLERY_IMAGES = [
  "https://picsum.photos/400/260?grayscale&random=1",
  "https://picsum.photos/400/260?grayscale&random=2",
  "https://picsum.photos/400/260?grayscale&random=3",
  "https://picsum.photos/400/260?grayscale&random=4",
  "https://picsum.photos/400/260?grayscale&random=5",
  "https://picsum.photos/400/260?grayscale&random=6",
  "https://picsum.photos/400/260?grayscale&random=7",
  "https://picsum.photos/400/260?grayscale&random=8",
  "https://picsum.photos/400/260?grayscale&random=9",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24 md:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(53,110,232,0.18),_transparent_70%)] blur-3xl"
      />

      <div className="relative mb-16 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
          Gallery
        </p>
        <h2
          className={`${kanit.className} gradient-heading text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl`}
        >
          A few frames
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-paper/60">
          Placeholder snapshots — swap these for your own images whenever
          you&apos;re ready.
        </p>
      </div>

      <SpiralGallery images={GALLERY_IMAGES} className="relative" />
    </section>
  );
}
