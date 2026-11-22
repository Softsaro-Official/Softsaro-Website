"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const hero = scope.querySelector(".blog-hero");
    const featured = scope.querySelector(".blog-featured");
    const cards = gsap.utils.toArray<HTMLElement>(".blog-card", scope);
    const signup = scope.querySelector(".blog-newsletter-in");

    if (hero) {
      gsap.from(hero.querySelectorAll(".lab, h1, .blog-hero-row > p, .blog-rule, .blog-topics"), {
        y: 32, autoAlpha: 0, duration: 1, stagger: 0.11, ease: "expo.out", delay: 0.15,
      });
    }
    let featuredObserver: IntersectionObserver | undefined;
    if (featured) {
      const art = featured.querySelectorAll(".blog-art-window, .blog-art-line, .blog-art-spark");
      gsap.set(featured, { y: 48, autoAlpha: 0 });
      gsap.set(art, { scale: 0.7, autoAlpha: 0 });
      featuredObserver = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        gsap.timeline().to(featured, { y: 0, autoAlpha: 1, duration: 1.15, ease: "expo.out" })
          .to(art, { scale: 1, autoAlpha: 1, duration: 1.1, stagger: 0.08, ease: "back.out(1.5)" }, "-=.65");
        featuredObserver?.disconnect();
      }, { threshold: 0.08 });
      featuredObserver.observe(featured);
    }
    const grid = scope.querySelector(".blog-grid");
    gsap.set(cards, { y: 38, autoAlpha: 0 });
    const cardObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      gsap.to(cards, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: "expo.out", overwrite: true });
      cardObserver.disconnect();
    }, { threshold: 0.12 });
    if (grid) cardObserver.observe(grid);
    if (signup) gsap.from(signup.children, { y: 36, autoAlpha: 0, duration: 1, stagger: 0.16, ease: "expo.out", scrollTrigger: { trigger: signup, start: "top 83%" } });
    ScrollTrigger.refresh();

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return () => { featuredObserver?.disconnect(); cardObserver.disconnect(); };
    const cleanups: (() => void)[] = [];
    [featured, ...cards].filter(Boolean).forEach((card) => {
      const el = card as HTMLElement;
      const art = el.querySelector<HTMLElement>(".blog-art");
      const move = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - .5;
        const y = (event.clientY - box.top) / box.height - .5;
        gsap.to(el, { rotateX: -y * 2.3, rotateY: x * 2.3, transformPerspective: 900, transformOrigin: "center", duration: .55, ease: "power3.out", overwrite: true });
        if (art) gsap.to(art, { x: x * 9, y: y * 9, duration: .65, ease: "power3.out", overwrite: true });
      };
      const leave = () => { gsap.to(el, { rotateX: 0, rotateY: 0, duration: .75, ease: "elastic.out(1,.5)", overwrite: true }); if (art) gsap.to(art, { x: 0, y: 0, duration: .75, ease: "power3.out", overwrite: true }); };
      el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
    });
    return () => { featuredObserver?.disconnect(); cardObserver.disconnect(); cleanups.forEach((cleanup) => cleanup()); };
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
