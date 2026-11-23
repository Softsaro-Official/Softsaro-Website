"use client";
import { useEffect } from "react";

/* Lightweight scroll reveals: one IntersectionObserver, CSS does the animation. */
export default function DmdMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".dmd");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-r]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    root.classList.add("dmd-js");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
    return () => { io.disconnect(); root.classList.remove("dmd-js"); };
  }, []);
  return null;
}