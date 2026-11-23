"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function DaleyMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ reduce: "(prefers-reduced-motion: reduce)", fine: "(hover: hover) and (pointer: fine)", wide: "(min-width: 761px)" }, (ctx) => {
        const c = ctx.conditions as { reduce: boolean; fine: boolean; wide: boolean };
        const q = <T extends HTMLElement = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
        const offs: Array<() => void> = [];
        const on = (t: EventTarget, e: string, f: (ev: any) => void) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
        const nodes = q("[data-node]");
        const line = q("[data-line]")[0];

        if (c.reduce) {
          nodes.forEach((n) => n.setAttribute("data-on", "true"));
          if (line) gsap.set(line, { scaleX: 1, scaleY: 1 });
          return;
        }

        // image parallax
        q("[data-par]").forEach((el) => {
          gsap.fromTo(el, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // drifting blobs
        q("[data-drift]").forEach((el) => {
          gsap.to(el, { y: Number(el.dataset.drift || 30), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // section label lines draw in
        q("[data-lab] i").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });

        // icon pops (technology badges and app cards)
        const pops = q("[data-pop]");
        if (pops.length) {
          gsap.set(pops, { scale: 0, rotate: -70 });
          ScrollTrigger.batch(pops, {
            start: "top 92%",
            once: true,
            onEnter: (b) => gsap.to(b, { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.8)", stagger: 0.08 }),
          });
        }

        // process timeline
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

        // image mask reveals: gallery (from bottom) and related projects (from left)
        const reveal = (els: HTMLElement[], hide: string, dur: number) => {
          if (!els.length) return;
          const inner = (el: HTMLElement) => el.querySelector("img") as HTMLElement | null;
          gsap.set(els, { clipPath: hide });
          els.forEach((el) => { const im = inner(el); if (im) { im.style.transition = "none"; gsap.set(im, { scale: 1.25 }); } });
          ScrollTrigger.batch(els, {
            start: "top 92%",
            once: true,
            onEnter: (batch) => {
              const list = batch as HTMLElement[];
              gsap.to(list, { clipPath: "inset(0% 0% 0% 0%)", duration: dur, ease: "power4.inOut", stagger: 0.12, onComplete: () => { gsap.set(list, { clearProps: "clipPath" }); } });
              list.forEach((el, i) => {
                const im = inner(el);
                if (!im) return;
                gsap.to(im, { scale: 1, duration: dur + 0.6, ease: "power3.out", delay: i * 0.12, onComplete: () => { gsap.set(im, { clearProps: "transform" }); im.style.transition = ""; } });
              });
            },
          });
        };
        reveal(q("[data-shot]"), "inset(100% 0% 0% 0%)", 1.1);
        reveal(q("[data-wipe]"), "inset(0% 100% 0% 0%)", 1.2);

        if (c.fine) {
          // tilt + cursor spotlight
          q("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 900 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
            on(el, "pointermove", (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              el.style.setProperty("--mx", `${e.clientX - r.left}px`);
              el.style.setProperty("--my", `${e.clientY - r.top}px`);
              rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
              ry(((e.clientX - r.left) / r.width - 0.5) * 9);
            });
            on(el, "pointerleave", () => { rx(0); ry(0); });
          });
          // magnetic buttons
          q("[data-mag]").forEach((el) => {
            const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,.5)" });
            const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
            on(el, "pointermove", (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              x((e.clientX - r.left - r.width / 2) * 0.25);
              y((e.clientY - r.top - r.height / 2) * 0.32);
            });
            on(el, "pointerleave", () => { x(0); y(0); });
          });
          // hero chips follow the mouse at different depths
          const chips = q("[data-depth]").map((el) => ({
            d: Number(el.dataset.depth || 0),
            x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
          }));
          if (chips.length && ref.current) {
            on(ref.current, "pointermove", (e: PointerEvent) => {
              const px = e.clientX / window.innerWidth - 0.5, py = e.clientY / window.innerHeight - 0.5;
              chips.forEach((ch) => { ch.x(px * ch.d); ch.y(py * ch.d); });
            });
          }
        }

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        if (document.fonts) document.fonts.ready.then(refresh);
        return () => { window.removeEventListener("load", refresh); offs.forEach((f) => f()); };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}