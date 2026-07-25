"use client";

import { useCallback, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import OrbitImages from "@/components/ui/orbit-images";
import { kanit } from "@/lib/fonts";

const GALLERY_IMAGES = [
  "https://picsum.photos/300/300?grayscale&random=1",
  "https://picsum.photos/300/300?grayscale&random=2",
  "https://picsum.photos/300/300?grayscale&random=3",
  "https://picsum.photos/300/300?grayscale&random=4",
  "https://picsum.photos/300/300?grayscale&random=5",
  "https://picsum.photos/300/300?grayscale&random=6",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage]);

  // OrbitImages renders plain <img> tags without per-item click hooks, so
  // clicks are picked up via delegation on the wrapper instead of modifying
  // the ported component.
  const handleGalleryClick = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      setSelectedImage((target as HTMLImageElement).src);
    }
  }, []);

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
          [ Gallery ]
        </p>
        <h2
          className={`${kanit.className} gradient-heading text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl`}
        >
          A few frames
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-paper/60">
          Placeholder snapshots — click one to preview, swap these for
          your own images whenever you&apos;re ready.
        </p>
      </div>

      <div
        onClick={handleGalleryClick}
        className="relative w-full max-w-6xl [&_img]:cursor-pointer [&_img]:rounded-xl [&_img]:border [&_img]:border-paper/15 [&_img]:shadow-2xl [&_img]:transition-transform [&_img]:duration-300 [&_img]:hover:scale-105"
      >
        <OrbitImages
          images={GALLERY_IMAGES}
          shape="ellipse"
          baseWidth={1200}
          radiusX={550}
          radiusY={160}
          rotation={-8}
          duration={30}
          itemSize={140}
          responsive
        />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent-amber hover:text-accent-amber"
            >
              <X size={20} strokeWidth={2.25} />
            </button>
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt=""
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-paper/15 object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
