"use client";
import { useEffect } from "react";

export default function TechReveal() {
  useEffect(() => {
    const el = document.getElementById("tccols");
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("tc-js");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); document.documentElement.classList.remove("tc-js"); };
  }, []);
  return null;
}
