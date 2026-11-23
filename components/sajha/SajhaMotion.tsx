"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SPRING = "elastic.out(1,.5)";

/** GSAP layer: parallax, drifting backgrounds, timeline, magnetic + tilt. Framer Motion handles entrances. */
export default function SajhaMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current!;
    const mm = gsap.matchMedia(scope);

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)", wide: "(min-width: 761px)" }, (ctx) => {
      const { motion, fine, wide } = ctx.conditions as { motion: boolean; fine: boolean; wide: boolean };
      if (!motion) return;
      const cleanups: Array<() => void> = [];
      const all = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, scope);

      // image parallax
      all("[data-par]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.closest("[data-frame]") ?? el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // drifting background shapes
      all("[data-drift]").forEach((el) => {
        gsap.to(el, { yPercent: Number(el.dataset.drift), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // development timeline: line draws, nodes light up
      const line = scope.querySelector<HTMLElement>("[data-line]");
      const nodes = all("[data-node]");
      if (line && nodes.length) {
        nodes.forEach((n) => { n.dataset.on = "false"; });
        gsap.fromTo(line, wide ? { scaleX: 0 } : { scaleY: 0 }, {
          ...(wide ? { scaleX: 1 } : { scaleY: 1 }), ease: "none",
          scrollTrigger: {
            trigger: "[data-steps]", start: "top 72%", end: "bottom 62%", scrub: 0.5,
            onUpdate: (self) => nodes.forEach((n, i) => { n.dataset.on = self.progress >= (i / (nodes.length - 1)) * 0.98 ? "true" : "false"; }),
          },
        });
        cleanups.push(() => nodes.forEach((n) => { delete n.dataset.on; }));
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      if (fine) {
        let tilt: HTMLElement | null = null;
        let mag: HTMLElement | null = null;
        const release = (el: HTMLElement) => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: SPRING, overwrite: "auto" });
        const unpull = (el: HTMLElement) => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.45)", overwrite: "auto" });
        const onMove = (e: PointerEvent) => {
          const target = e.target as Element;
          const card = target.closest<HTMLElement>("[data-tilt]");
          if (tilt && tilt !== card) release(tilt);
          tilt = card;
          if (card) {
            const b = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - b.left}px`);
            card.style.setProperty("--my", `${e.clientY - b.top}px`);
            const x = (e.clientX - b.left) / b.width - 0.5;
            const y = (e.clientY - b.top) / b.height - 0.5;
            gsap.to(card, { rotateX: -y * 6, rotateY: x * 6, transformPerspective: 900, duration: 0.55, ease: "power3.out", overwrite: "auto" });
          }
          const m = target.closest<HTMLElement>("[data-mag]");
          if (mag && mag !== m) unpull(mag);
          mag = m;
          if (m) {
            const b = m.getBoundingClientRect();
            gsap.to(m, { x: (e.clientX - b.left - b.width / 2) * 0.28, y: (e.clientY - b.top - b.height / 2) * 0.28, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          }
        };
        const onLeave = () => { if (tilt) release(tilt); if (mag) unpull(mag); tilt = null; mag = null; };
        scope.addEventListener("pointermove", onMove);
        scope.addEventListener("pointerleave", onLeave);
        cleanups.push(() => { scope.removeEventListener("pointermove", onMove); scope.removeEventListener("pointerleave", onLeave); });
      }

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}