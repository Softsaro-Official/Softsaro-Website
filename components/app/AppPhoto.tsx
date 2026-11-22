"use client";
import { useEffect, useRef, useState } from "react";

/** Photo with fallback sources; shows a purple panel if none load. */
export default function AppPhoto({ srcs, alt, className = "", label = "View" }: { srcs: string[]; alt: string; className?: string; label?: string }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const im = ref.current;
    if (im && im.complete && im.naturalWidth === 0) setI((v) => v + 1);
  }, [i]);
  const src = srcs[i];
  return (
    <div className={`ma-px ${className}`} data-cursor="image" data-cursor-label={label}>
      {src ? (
        <img ref={ref} key={src} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setI((v) => v + 1)} />
      ) : (
        <div className="ma-empty" role="img" aria-label={alt}></div>
      )}
    </div>
  );
}