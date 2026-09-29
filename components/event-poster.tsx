"use client";

import { useState } from "react";

type EventPosterProps = {
  remoteSrc: string | null;
  className?: string;
};

const fallbackSrc = "/event-poster-fallback.svg";

export function EventPoster({ remoteSrc, className }: EventPosterProps) {
  const [src, setSrc] = useState(remoteSrc ?? fallbackSrc);

  return (
    // A plain img keeps remote fallback behavior independent of Next image host configuration.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      alt="BUILD THE FUTURE HACKATHON 2026 event poster"
      onError={() => {
        if (src !== fallbackSrc) setSrc(fallbackSrc);
      }}
    />
  );
}
