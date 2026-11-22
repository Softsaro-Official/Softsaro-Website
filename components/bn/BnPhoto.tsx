"use client";
import { useEffect, useRef, useState } from "react";

export default function BnPhoto({ srcs, alt, label = "View" }: { srcs: string[]; alt: string; label?: string }) {
  const [i, setI] = useState(0);
  const r = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const im = r.current;
    if (im && im.complete && im.naturalWidth === 0) setI((n) => n + 1);
  }, [i]);
  if (i >= srcs.length) return <div className="bn-empty" />;
  return <img ref={r} src={srcs[i]} alt={alt} decoding="async" data-cursor-label={label} onError={() => setI((n) => n + 1)} />;
}