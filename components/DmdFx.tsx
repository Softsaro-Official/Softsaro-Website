"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Interaction layer: progress bar, pinned process, magnetic buttons, spotlight, tilt, hero parallax, drag carousel. */
export default function DmdFx() {
  useGSAP(
    () => {
      const root = document.querySelector<HTMLElement>(".dmd-page");
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
      const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const offs: (() => void)[] = [];
      const on = (t: EventTarget, e: string, f: (ev: any) => void, o?: AddEventListenerOptions) => {
        t.addEventListener(e, f, o);
        offs.push(() => t.removeEventListener(e, f, o));
      };

      root.classList.add("dmd-fx");
      offs.push(() => root.classList.remove("dmd-fx"));

      // page progress bar
      const bar = document.createElement("div");
      bar.className = "dmd-pbar";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
      offs.push(() => bar.remove());
      gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 } });

      // pinned process timeline (desktop)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1101px)", () => {
        const sec = root.querySelector<HTMLElement>(".dmd-process");
        const steps = root.querySelector<HTMLElement>(".dmd-steps");
        if (!sec || !steps) return;
        const items = Array.from(steps.querySelectorAll<HTMLElement>(".dmd-step"));
        // replace the earlier non-pinned progress trigger (keep the entrance tween)
        ScrollTrigger.getAll().filter((t) => t.trigger === steps && !t.vars.pin && t.vars.onUpdate).forEach((t) => t.kill());
        items.forEach((i) => i.classList.remove("on"));
        steps.style.setProperty("--dmdp", "0");
        ScrollTrigger.create({
          trigger: sec,
          start: "top top+=64",
          end: "+=80%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
          onUpdate: (s) => {
            steps.style.setProperty("--dmdp", String(s.progress));
            items.forEach((it, i) => it.classList.toggle("on", s.progress >= i / (items.length - 1) - 0.02));
          },
        });
        return () => {
          items.forEach((i) => i.classList.add("on"));
          steps.style.setProperty("--dmdp", "1");
        };
      });
      offs.push(() => mm.revert());

      // drag-to-scroll testimonials
      const tq = root.querySelector<HTMLElement>(".dmd-tq");
      if (tq && fine) {
        let down = false, sx = 0, sl = 0;
        on(tq, "pointerdown", (e) => { down = true; sx = e.clientX; sl = tq.scrollLeft; tq.classList.add("drag"); });
        on(window, "pointermove", (e) => { if (down) tq.scrollLeft = sl - (e.clientX - sx); });
        on(window, "pointerup", () => { down = false; tq.classList.remove("drag"); });
      }

      if (fine) {
        // magnetic buttons
        q(".dmd-btn").forEach((b) => {
          const x = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1,0.6)" });
          const y = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1,0.6)" });
          on(b, "pointermove", (e) => {
            const r = b.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.25);
            y((e.clientY - (r.top + r.height / 2)) * 0.35);
          });
          on(b, "pointerleave", () => { x(0); y(0); });
        });

        // cursor spotlight
        q(".dmd-svc,.dmd-tools li,.dmd-plan,.dmd-aud li,.dmd-pj").forEach((c) => {
          on(c, "pointermove", (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty("--mx", `${e.clientX - r.left}px`);
            c.style.setProperty("--my", `${e.clientY - r.top}px`);
          });
        });

        // 3D tilt
        q(".dmd-svc,.dmd-pj").forEach((c) => {
          const rx = gsap.quickTo(c, "rotationX", { duration: 0.5, ease: "power3" });
          const ry = gsap.quickTo(c, "rotationY", { duration: 0.5, ease: "power3" });
          const y = gsap.quickTo(c, "y", { duration: 0.5, ease: "power3" });
          on(c, "pointerenter", () => { gsap.set(c, { transformPerspective: 900 }); y(-4); });
          on(c, "pointermove", (e) => {
            const r = c.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 10);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
          });
          on(c, "pointerleave", () => { rx(0); ry(0); y(0); });
        });

        // hero mouse parallax
        const hero = root.querySelector<HTMLElement>(".dmd-hero");
        const img = root.querySelector<HTMLElement>(".dmd-hero-img");
        const card = root.querySelector<HTMLElement>(".dmd-hero-card");
        if (hero && img && card) {
          const ix = gsap.quickTo(img, "x", { duration: 0.9, ease: "power3.out" });
          const iy = gsap.quickTo(img, "y", { duration: 0.9, ease: "power3.out" });
          const cx = gsap.quickTo(card, "x", { duration: 1.1, ease: "power3.out" });
          on(hero, "pointermove", (e) => {
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ix(px * -14); iy(py * -10); cx(px * 26);
          });
          on(hero, "pointerleave", () => { ix(0); iy(0); cx(0); });
        }
      }

      // pin spacers shift later sections: re-sort and refresh
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      return () => offs.forEach((f) => f());
    },
    { dependencies: [] },
  );
  return null;
}