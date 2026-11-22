"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MAGNETIC = ".cr-btn, .cr-job-apply";
const SPRING = "elastic.out(1,.5)";

export default function CareerMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current!;
    const mm = gsap.matchMedia(scope);

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
      if (!motion) return;

      // hero
      gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .from(".cr-hero .cr-eye", { y: 18, autoAlpha: 0, duration: 0.9 })
        .from(".cr-hero .cr-in", { yPercent: 115, rotate: 3, transformOrigin: "0% 100%", duration: 1.3, stagger: 0.14 }, "-=0.6")
        .from(".cr-hero-copy > .cr-lead", { y: 24, autoAlpha: 0, duration: 1 }, "-=0.8")
        .from(".cr-hero-btns > *", { y: 20, autoAlpha: 0, scale: 0.94, duration: 0.9, stagger: 0.1 }, "-=0.8")
        .from(".cr-plate", { x: -22, y: -22, autoAlpha: 0, duration: 1.1 }, 0.3)
        .from(".cr-photo", { y: 70, autoAlpha: 0, rotate: 1.6, duration: 1.4 }, 0.25)
        .from(".cr-photo-in img", { scale: 1.35, duration: 1.8 }, 0.25)
        .from(".cr-tag", { x: -20, autoAlpha: 0, duration: 0.9 }, "-=0.9")
        .from(".cr-chip", { scale: 0.6, autoAlpha: 0, duration: 1, stagger: 0.15, ease: "back.out(1.6)" }, "-=0.9");
      gsap.to(".cr-photo-in", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".cr-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".cr-chip.c1", { y: -10, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".cr-chip.c2", { y: 10, duration: 3.1, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // generic staggered scroll reveal
      const rv = gsap.utils.toArray<HTMLElement>(".cr-rv", scope);
      gsap.set(rv, { y: 36, autoAlpha: 0 });
      ScrollTrigger.batch(rv, {
        start: "top 90%", once: true, interval: 0.1, batchMax: 6,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "expo.out", overwrite: "auto" }),
      });

      // icons pop in
      ([".cr-prs", ".cr-perk-grid"] as const).forEach((sel) => {
        const box = scope.querySelector(sel);
        if (!box) return;
        gsap.from(box.querySelectorAll("svg"), { scale: 0, rotate: -45, duration: 0.9, stagger: 0.1, ease: "back.out(2)", scrollTrigger: { trigger: box, start: "top 80%", once: true } });
      });

      // application form fields
      const card = scope.querySelector(".cr-form-card");
      if (card) gsap.from(card.querySelectorAll(".cr-f, .cr-submit"), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 82%", once: true } });

      // hiring timeline
      const steps = gsap.utils.toArray<HTMLElement>(".cr-step", scope);
      if (steps.length) {
        const track = { trigger: ".cr-steps", start: "top 70%", end: "bottom 70%", scrub: 0.4 };
        gsap.fromTo(".cr-rail i", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: track });
        gsap.fromTo(".cr-progress b", { scaleX: 0.08 }, { scaleX: 1, ease: "none", scrollTrigger: track });
        steps.forEach((step) => {
          gsap.from(step.querySelector(".cr-step-card"), { x: 44, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: step, start: "top 88%", once: true } });
          ScrollTrigger.create({ trigger: step, start: "top 70%", onEnter: () => step.classList.add("on"), onLeaveBack: () => step.classList.remove("on") });
        });
      }

      // culture band
      gsap.fromTo(".cr-culture-orb", { yPercent: 20 }, { yPercent: -20, ease: "none", scrollTrigger: { trigger: ".cr-culture", start: "top bottom", end: "bottom top", scrub: true } });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      if (!fine) return;

      // spotlight + tilt + magnetic (delegated)
      let tilt: HTMLElement | null = null;
      let mag: HTMLElement | null = null;
      const release = (el: HTMLElement) => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: SPRING, overwrite: "auto" });
      const unpull = (el: HTMLElement) => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.45)", overwrite: "auto" });
      const onMove = (event: PointerEvent) => {
        const target = event.target as Element;
        const card = target.closest<HTMLElement>(".cr-tilt, .cr-spot");
        if (tilt && tilt !== card) release(tilt);
        tilt = null;
        if (card) {
          const box = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${event.clientX - box.left}px`);
          card.style.setProperty("--my", `${event.clientY - box.top}px`);
          if (card.classList.contains("cr-tilt")) {
            tilt = card;
            const x = (event.clientX - box.left) / box.width - 0.5;
            const y = (event.clientY - box.top) / box.height - 0.5;
            gsap.to(card, { rotateX: -y * 4, rotateY: x * 4, transformPerspective: 900, transformOrigin: "center", duration: 0.55, ease: "power3.out", overwrite: "auto" });
          }
        }
        const el = target.closest<HTMLElement>(MAGNETIC);
        if (mag && mag !== el) unpull(mag);
        mag = el;
        if (el) {
          const b = el.getBoundingClientRect();
          gsap.to(el, { x: (event.clientX - b.left - b.width / 2) * 0.25, y: (event.clientY - b.top - b.height / 2) * 0.25, duration: 0.5, ease: "power3.out", overwrite: "auto" });
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