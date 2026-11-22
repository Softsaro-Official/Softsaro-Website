"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PageReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const scope = root.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
    gsap.set(items, { autoAlpha: 0, y: 26 });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        gsap.to(entry.target, { autoAlpha: 1, y: 0, duration: .8, ease: "expo.out", overwrite: true });
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
