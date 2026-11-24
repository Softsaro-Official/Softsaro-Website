"use client";
import { useEffect, useRef, useState } from "react";

export default function UiUxDesignPhoto({ srcs, alt, className = "", label = "View" }: { srcs: string[]; alt: string; className?: string; label?: string }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const im = ref.current;
    if (im && im.complete && im.naturalWidth === 0) setI((n) => n + 1);
  }, [i]);
  if (i >= srcs.length) return <div className={"ux-empty " + className} />;
  return <img ref={ref} src={srcs[i]} alt={alt} className={className} decoding="async" data-cursor-label={label} onError={() => setI((n) => n + 1)} />;
}