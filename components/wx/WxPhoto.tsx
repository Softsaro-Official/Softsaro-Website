"use client";
import { useEffect, useRef, useState } from "react";

/** Tries each src in order. Also checks on mount, because a 404 can fire before React hydrates. */
export default function WxPhoto({ srcs, alt, className, label }: { srcs: string[]; alt: string; className?: string; label?: string }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setI((n) => n + 1);
  }, [i]);

  if (i >= srcs.length) return <div className={"wx-empty " + (className || "")} role="img" aria-label={alt} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} className={className} src={srcs[i]} alt={alt} loading="lazy" decoding="async" data-cursor-label={label} onError={() => setI((n) => n + 1)} />
  );
}