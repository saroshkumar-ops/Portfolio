"use client";

import { useRef, useState } from "react";
import { UserRound } from "lucide-react";

export default function HeroPortrait({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-ink-soft to-black">
        <UserRound
          className="h-1/3 w-1/3 text-paper/25"
          strokeWidth={1}
        />
      </div>
    );
  }

  return (
    // Plain <img> (not next/image) so a missing file can be caught client-side
    // via onError and swapped for the placeholder above. The image can 404
    // before React hydrates and attaches the onError listener, so a ref
    // callback also checks `complete`/`naturalWidth` for that race.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(node) => {
        imgRef.current = node;
        if (node && node.complete && node.naturalWidth === 0) {
          setErrored(true);
        }
      }}
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-full w-full object-cover object-top"
    />
  );
}
