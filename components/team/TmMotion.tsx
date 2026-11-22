"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TmMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".tm-page");
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

    /* hero entrance */
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
    tl.from(q("[data-tm='ln']"), { yPercent: 115, rotate: 2, duration: 1.3, stagger: 0.09 }, 0.1)
      .from(q("[data-h]"), { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.5)
      .from(q(".tm-tile"), { scale: 0.7, autoAlpha: 0, y: 60, duration: 1.4, stagger: 0.12 }, 0.3)
      .from(q(".tm-badge"), { scale: 0, duration: 1, ease: "back.out(2)" }, 1.3);

    /* hero parallax */
    q(".tm-tile").forEach((t, i) => {
      gsap.to(t, { yPercent: (i % 2 ? -1 : 1) * 8, ease: "none", scrollTrigger: { trigger: ".tm-hero", start: "top top", end: "bottom top", scrub: true } });
    });
    const ghost = root.querySelector<HTMLElement>(".tm-ghost");
    if (ghost) gsap.to(ghost, { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".tm-hero", start: "top top", end: "bottom top", scrub: true } });

    /* reveals */
    q("[data-rv]").forEach((el) => {
      gsap.from(el, { y: 36, autoAlpha: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
    q("[data-clip]").forEach((f) => {
      gsap.fromTo(f, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: f, start: "top 86%", once: true } });
    });
    q(".tm-lm").forEach((m) => {
      gsap.from(m, { y: 30, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: m, start: "top 92%", once: true } });
    });

    /* directory rows */
    const rows = q(".tm-li");
    if (rows.length) {
      gsap.set(rows, { autoAlpha: 0, y: 30 });
      ScrollTrigger.batch(rows, {
        start: "top 94%",
        once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.05, ease: "expo.out", clearProps: "transform,opacity,visibility" }),
      });
    }

    /* count-up */
    q("[data-count]").forEach((c) => {
      const to = Number(c.dataset.count || 0);
      const o = { n: 0 };
      c.textContent = "0";
      ScrollTrigger.create({
        trigger: c, start: "top 90%", once: true,
        onEnter: () => gsap.to(o, { n: to, duration: 1.8, ease: "power3.out", onUpdate: () => { c.textContent = String(Math.round(o.n)); } }),
      });
    });

    /* CTA light */
    const cta = root.querySelector<HTMLElement>(".tm-cta");
    if (cta) {
      const d1 = gsap.to(".tm-g1", { x: "8vw", y: "4vw", duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1 });
      const d2 = gsap.to(".tm-g2", { x: "-7vw", y: "-3vw", duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
      ScrollTrigger.create({ trigger: cta, start: "top bottom", end: "bottom top", onToggle: (s) => { if (s.isActive) { d1.play(); d2.play(); } else { d1.pause(); d2.pause(); } } });
      const h = cta.querySelector<HTMLElement>(".tm-cta-h");
      if (h) gsap.fromTo(h, { xPercent: -2 }, { xPercent: 2, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true } });
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);
  return null;
}