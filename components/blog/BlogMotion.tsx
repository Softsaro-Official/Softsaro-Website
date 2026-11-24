"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MAGNETIC = ".blog-topics button, .blog-link, .blog-card-bottom a, .blog-signup button";
const SPRING = "elastic.out(1,.5)";

export default function BlogMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current!;
    const mm = gsap.matchMedia(scope);

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
      if (!motion) return;

      // hero
      gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .from(".blog-hero .lab", { y: 20, autoAlpha: 0, duration: 1 })
        .from(".bl-in", { yPercent: 115, rotate: 3, transformOrigin: "0% 100%", duration: 1.35, stagger: 0.12 }, "-=0.8")
        .from(".blog-hero-row > p", { y: 24, autoAlpha: 0, duration: 1.1 }, "-=1")
        .from(".blog-rule", { scaleX: 0, transformOrigin: "0 50%", duration: 1.4, ease: "power4.inOut" }, "-=0.9")
        .from(".blog-topics button", { y: 18, autoAlpha: 0, scale: 0.92, duration: 0.9, stagger: 0.07 }, "-=1");

      // featured
      const featured = scope.querySelector<HTMLElement>(".blog-featured");
      if (featured) {
        const parts = featured.querySelectorAll(".blog-art-window, .blog-art-line, .blog-art-spark");
        const copy = featured.querySelectorAll(".blog-featured-copy > *");
        const cover = featured.querySelector<HTMLElement>(".blog-cover");
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: featured, start: "top 85%", once: true } });
        tl.from(featured, { y: 56, autoAlpha: 0, duration: 1.2 });
        if (parts.length) tl.from(parts, { scale: 0.7, autoAlpha: 0, duration: 1.1, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.7");
        if (cover) tl.from(cover, { scale: 1.2, duration: 1.6 }, 0);
        tl.from(copy, { y: 26, autoAlpha: 0, duration: 1, stagger: 0.09 }, "-=1.1");
        if (cover) gsap.to(cover, { yPercent: -6, ease: "none", scrollTrigger: { trigger: featured, start: "top bottom", end: "bottom top", scrub: true } });
      }

      // cards
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card", scope);
      if (cards.length) {
        gsap.set(cards, { y: 44, autoAlpha: 0 });
        ScrollTrigger.batch(cards, {
          start: "top 90%", once: true, interval: 0.1, batchMax: 3,
          onEnter: (batch) => {
            const els = (batch as HTMLElement[]).filter((c) => !c.dataset.in);
            if (!els.length) return;
            els.forEach((c) => { c.dataset.in = "1"; });
            gsap.to(els, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "expo.out", overwrite: "auto" });
            const covers = els.map((c) => c.querySelector(".blog-cover")).filter(Boolean);
            if (covers.length) gsap.fromTo(covers, { scale: 1.2 }, { scale: 1, duration: 1.5, stagger: 0.12, ease: "expo.out" });
          },
        });
      }

      // newsletter
      const signup = scope.querySelector(".blog-newsletter-in");
      if (signup) gsap.from(signup.children, { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.16, ease: "expo.out", scrollTrigger: { trigger: signup, start: "top 85%", once: true } });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      if (!fine) return;

      // tilt + magnetic (delegated, so filtered cards work too)
      let tilt: HTMLElement | null = null;
      let mag: HTMLElement | null = null;
      const shifter = (card: HTMLElement) => card.querySelector<HTMLElement>(".blog-cover") ?? card.querySelector<HTMLElement>(".blog-art");
      const release = (card: HTMLElement) => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: SPRING, overwrite: "auto" });
        const s = shifter(card);
        if (s) gsap.to(s, { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      };
      const unpull = (el: HTMLElement) => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.45)", overwrite: "auto" });
      const onMove = (event: PointerEvent) => {
        const target = event.target as Element;
        const card = target.closest<HTMLElement>(".blog-card, .blog-featured");
        if (tilt && tilt !== card) release(tilt);
        tilt = card;
        if (card) {
          const box = card.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width - 0.5;
          const y = (event.clientY - box.top) / box.height - 0.5;
          gsap.to(card, { rotateX: -y * 2.3, rotateY: x * 2.3, transformPerspective: 900, transformOrigin: "center", duration: 0.55, ease: "power3.out", overwrite: "auto" });
          const s = shifter(card);
          if (s) gsap.to(s, { x: x * 9, y: y * 9, duration: 0.65, ease: "power3.out", overwrite: "auto" });
        }
        const el = target.closest<HTMLElement>(MAGNETIC);
        if (mag && mag !== el) unpull(mag);
        mag = el;
        if (el) {
          const b = el.getBoundingClientRect();
          gsap.to(el, { x: (event.clientX - b.left - b.width / 2) * 0.28, y: (event.clientY - b.top - b.height / 2) * 0.28, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      };
      const onLeave = () => { if (tilt) release(tilt); if (mag) unpull(mag); tilt = null; mag = null; };
      scope.addEventListener("pointermove", onMove);
      scope.addEventListener("pointerleave", onLeave);
      return () => { scope.removeEventListener("pointermove", onMove); scope.removeEventListener("pointerleave", onLeave); };
    });

    return () => mm.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}