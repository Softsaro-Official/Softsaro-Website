"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FULL = "inset(0% 0% 0% 0%)";
const DIAG_FROM = "polygon(0% 0%, 0% 0%, -40% 100%, 0% 100%)";
const DIAG_TO = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIPS: Record<string, string> = {
  expand: "inset(0% 50% 0% 50%)",
  vert: "inset(50% 0% 50% 0%)",
  l: "inset(0% 100% 0% 0%)",
  r: "inset(0% 0% 0% 100%)",
  t: "inset(0% 0% 100% 0%)",
  b: "inset(100% 0% 0% 0%)",
};

export default function AdsaroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ reduce: "(prefers-reduced-motion: reduce)", wide: "(min-width: 901px)" }, (ctx) => {
        const c = ctx.conditions as { reduce: boolean; wide: boolean };
        const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel);
        const nodes = q("[data-node]");
        const line = q("[data-line]")[0];

        if (c.reduce) {
          gsap.set(q("[data-fx]"), { autoAlpha: 1 });
          nodes.forEach((n) => n.setAttribute("data-on", "true"));
          if (line) gsap.set(line, { scaleX: 1, scaleY: 1 });
          return;
        }

        const once = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

        // hero: 3D perspective settle
        q("[data-hero]").forEach((el) => {
          gsap.fromTo(el,
            { autoAlpha: 0, rotationX: 24, rotationY: -16, scale: 0.84, y: 70, transformPerspective: 1400, transformOrigin: "50% 100%" },
            { autoAlpha: 1, rotationX: 0, rotationY: 0, scale: 1, y: 0, duration: 2, ease: "expo.out", delay: 0.35 });
        });

        // hero chips: pop in, then float
        q("[data-chip]").forEach((el, i) => {
          gsap.fromTo(el, { autoAlpha: 0, scale: 0.6, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.8)", delay: 1.4 + i * 0.2 });
        });

        // diagram nodes: staggered entrance
        const flow = q("[data-flow]")[0];
        const fn = q("[data-fnode]");
        if (flow && fn.length) {
          gsap.fromTo(fn, { autoAlpha: 0, scale: 0.7, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.15, scrollTrigger: once(flow, "top 80%") });
        }

        // floating elements (yPercent so it never fights the entrance tweens)
        q("[data-float]").forEach((el, i) => {
          gsap.to(el, { yPercent: -12, duration: 3 + (i % 3) * 0.7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i % 4) * 0.3 });
        });

        // clip-path reveals (hero excluded): each image picks its own direction
        q("[data-clip]").forEach((el) => {
          const k = el.dataset.clip || "l";
          const diag = k === "diag";
          gsap.fromTo(el,
            { clipPath: diag ? DIAG_FROM : CLIPS[k], autoAlpha: 1 },
            { clipPath: diag ? DIAG_TO : FULL, duration: diag ? 1.6 : 1.4, ease: "power4.inOut", scrollTrigger: once(el) });
        });

        // inner image settle (scale) triggered by its frame
        q("[data-in]").forEach((el) => {
          gsap.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: "power3.out", scrollTrigger: once(el.parentElement || el) });
        });

        // inner image parallax (scrub)
        q("[data-par]").forEach((el) => {
          gsap.fromTo(el, { yPercent: -7, scale: 1.15 }, { yPercent: 7, scale: 1.15, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // solution: offset outline layer slides into place
        q("[data-layer]").forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, x: -34, y: -34 }, { autoAlpha: 1, x: 0, y: 0, duration: 1.6, ease: "power3.out", scrollTrigger: once(el.parentElement || el) });
        });

        // results: perspective reveal, then scroll-scaled frame
        q("[data-persp]").forEach((el) => {
          gsap.fromTo(el,
            { autoAlpha: 0, rotationX: 18, y: 50, transformPerspective: 1400, transformOrigin: "50% 100%" },
            { autoAlpha: 1, rotationX: 0, y: 0, duration: 1.6, ease: "expo.out", scrollTrigger: once(el, "top 82%") });
        });
        q("[data-zoom]").forEach((el) => {
          gsap.fromTo(el, { scale: 0.9 }, { scale: 1.04, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center 40%", scrub: true } });
        });

        // related projects: staggered cards, image wipes up inside
        const relImgs = q("[data-relimg]");
        gsap.set(relImgs, { clipPath: CLIPS.b });
        ScrollTrigger.batch(q("[data-rel]"), {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            (batch as HTMLElement[]).forEach((card, i) => {
              gsap.fromTo(card, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: i * 0.15 });
              const im = card.querySelector("[data-relimg]");
              if (im) gsap.to(im, { clipPath: FULL, duration: 1.3, ease: "power4.inOut", delay: 0.15 + i * 0.15 });
            });
          },
        });

        // label lines draw in
        q("[data-sep]").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: once(el, "top 92%") });
        });

        // ghost words and numerals drift
        q("[data-drift]").forEach((el) => {
          gsap.to(el, { y: Number(el.dataset.drift || 40), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // development timeline
        const steps = q("[data-steps]")[0];
        if (steps && line) {
          gsap.set(line, c.wide ? { transformOrigin: "0% 50%", scaleX: 0, scaleY: 1 } : { transformOrigin: "50% 0%", scaleX: 1, scaleY: 0 });
          ScrollTrigger.create({
            trigger: steps, start: "top 78%", end: "bottom 60%", scrub: true,
            onUpdate: (self) => {
              gsap.set(line, c.wide ? { scaleX: self.progress } : { scaleY: self.progress });
              nodes.forEach((n, i) => n.setAttribute("data-on", String(self.progress >= i / (nodes.length - 1) - 0.02)));
            },
          });
        }

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        if (document.fonts) document.fonts.ready.then(refresh);
        return () => window.removeEventListener("load", refresh);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}