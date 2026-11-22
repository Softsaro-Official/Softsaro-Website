"use client";
import { useEffect, useRef, useState } from "react";

/** Loads /assets/web/<name>.jpg; if that file is missing, tries the fallback; if both fail, renders nothing (gradient frame shows). */
export default function Photo({ name, fallback, alt }: { name: string; fallback?: string; alt: string }) {
  const list = [`/assets/web/${name}.jpg`, fallback].filter(Boolean) as string[];
  const [i, setI] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const im = ref.current;
    if (im && im.complete && im.naturalWidth === 0) setI((n) => n + 1);
  }, [i]);

  if (i >= list.length) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={list[i]} alt={alt} loading="lazy" decoding="async" onError={() => setI((n) => n + 1)} />
  );
}