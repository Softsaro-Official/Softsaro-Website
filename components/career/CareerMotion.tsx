"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const MAGNETIC = ".cr-btn, .cr-job-apply, .cr-link, .cr-chip-btn";
const SPRING = "elastic.out(1,.5)";

export default function CareerMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current!;
    const mm = gsap.matchMedia(scope);

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
      if (!motion) return;
      const cleanups: Array<() => void> = [];
      const all = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, scope);
      const one = <T extends HTMLElement>(sel: string) => scope.querySelector<T>(sel);

      // page scroll progress
      gsap.to(".cr-progressbar i", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      // ---------- hero: split text, clip reveal, depth ----------
      const splits = all(".cr-hero [data-split]").map((el) => SplitText.create(el, { type: "words,chars", charsClass: "cr-ch" }));
      cleanups.push(() => splits.forEach((s) => s.revert()));
      const chars = splits.flatMap((s) => s.chars as HTMLElement[]);
      gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
        .from(".cr-hero .cr-eye", { y: 18, autoAlpha: 0, duration: 0.9 })
        .from(chars, { yPercent: 125, rotateX: -80, autoAlpha: 0, transformOrigin: "0% 100%", transformPerspective: 700, duration: 1.25, stagger: 0.03 }, "-=0.5")
        .from(".cr-hero h1 em", { yPercent: 110, autoAlpha: 0, filter: "blur(10px)", duration: 1.4 }, "-=0.95")
        .from(".cr-hero-copy > .cr-lead", { y: 24, autoAlpha: 0, duration: 1 }, "-=1")
        .from(".cr-hero-btns > *", { y: 22, autoAlpha: 0, scale: 0.92, duration: 0.9, stagger: 0.1 }, "-=0.9")
        .from(".cr-plate", { xPercent: -8, yPercent: -8, autoAlpha: 0, duration: 1.2 }, 0.35)
        .from(".cr-photo", { clipPath: "inset(100% 0% 0% 0% round 36px 36px 120px 36px)", duration: 1.5, ease: "expo.inOut" }, 0.3)
        .from(".cr-photo-in img", { scale: 1.4, duration: 1.9 }, 0.3)
        .from(".cr-halo", { scale: 0.6, autoAlpha: 0, duration: 1.6 }, 0.4)
        .from(".cr-tag", { x: -20, autoAlpha: 0, duration: 0.9 }, "-=0.8")
        .from(".cr-chip, .cr-badge", { scale: 0.4, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "back.out(1.8)" }, "-=0.9");

      const count = one("[data-count]");
      if (count) {
        const target = Number(count.dataset.count);
        const o = { v: 0 };
        count.textContent = "0";
        gsap.to(o, { v: target, duration: 1.8, delay: 1.3, ease: "power2.out", onUpdate: () => { count.textContent = String(Math.round(o.v)); } });
        cleanups.push(() => { count.textContent = String(target); });
      }

      const hero = one(".cr-hero");
      if (hero) {
        gsap.to(".cr-hero-copy", { yPercent: -10, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".cr-hero-art", { yPercent: -7, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".cr-photo-in", { yPercent: -6, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      }

      // ---------- marquee (speeds up with scroll velocity) ----------
      const tweens = all(".cr-mq").map((row, i) => {
        const track = row.querySelector<HTMLElement>(".cr-mq-track")!;
        const tw = i % 2 === 0
          ? gsap.to(track, { xPercent: -50, duration: 48, ease: "none", repeat: -1 })
          : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: 48, ease: "none", repeat: -1 });
        ScrollTrigger.create({ trigger: row, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? tw.play() : tw.pause()) });
        return tw;
      });
      if (tweens.length) {
        const speed = { v: 1 };
        const settle = gsap.to(speed, { v: 1, duration: 1.4, ease: "power2.out", paused: true });
        ScrollTrigger.create({ trigger: scope, start: "top bottom", end: "bottom top", onUpdate: (self) => {
          const boost = 1 + Math.min(5, Math.abs(self.getVelocity()) / 450);
          if (boost > speed.v) { speed.v = boost; settle.invalidate().restart(); }
        } });
        const tick = () => tweens.forEach((t) => t.timeScale(speed.v));
        gsap.ticker.add(tick);
        cleanups.push(() => gsap.ticker.remove(tick));
      }

      // ---------- scroll-scrubbed word highlight ----------
      all(".cr-scrub").forEach((el) => {
        const s = SplitText.create(el, { type: "words" });
        cleanups.push(() => s.revert());
        gsap.fromTo(s.words, { opacity: 0.18 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 52%", scrub: true } });
      });

      // ---------- sections open up as they arrive ----------
      all(".cr-sec.lav, .cr-culture").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(7% 3.5% 0% 3.5% round 56px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: el, start: "top 100%", end: "top 30%", scrub: true } });
      });
      all(".cr-blob").forEach((b) => {
        gsap.to(b, { yPercent: -45, ease: "none", scrollTrigger: { trigger: b.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // ---------- generic staggered reveal ----------
      const rv = all(".cr-rv");
      gsap.set(rv, { y: 36, autoAlpha: 0 });
      ScrollTrigger.batch(rv, {
        start: "top 90%", once: true, interval: 0.1, batchMax: 6,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "expo.out", overwrite: "auto" }),
      });

      // ---------- principles + perks ----------
      const prs = one(".cr-prs");
      if (prs) {
        const st = { trigger: prs, start: "top 82%", once: true };
        gsap.from(".cr-pr", { y: 90, rotate: (i: number) => (i % 2 ? 4 : -4), autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: "expo.out", scrollTrigger: st });
        gsap.from(".cr-pr > svg", { scale: 0, rotate: -60, duration: 0.9, stagger: 0.12, delay: 0.3, ease: "back.out(2)", scrollTrigger: st });
        gsap.from(".cr-pr-n", { yPercent: 120, autoAlpha: 0, duration: 1, stagger: 0.12, delay: 0.2, ease: "expo.out", scrollTrigger: st });
      }
      const perks = one(".cr-perk-grid");
      if (perks) gsap.from(perks.querySelectorAll(".cr-ic svg"), { scale: 0, rotate: -45, duration: 0.9, stagger: 0.1, ease: "back.out(2)", scrollTrigger: { trigger: perks, start: "top 80%", once: true } });

      // ---------- application form ----------
      const card = one(".cr-form-card");
      if (card) gsap.from(card.querySelectorAll(".cr-f, .cr-submit"), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 82%", once: true } });

      // ---------- hiring timeline ----------
      const steps = all(".cr-step");
      if (steps.length) {
        const label = one(".cr-pg-l");
        const track = { trigger: ".cr-steps", start: "top 65%", end: "bottom 65%", scrub: 0.4 };
        gsap.fromTo(".cr-rail i", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: track });
        gsap.fromTo(".cr-dot", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: track });
        gsap.fromTo(".cr-progress b", { scaleX: 0.08 }, { scaleX: 1, ease: "none", scrollTrigger: track });
        steps.forEach((step, i) => {
          gsap.from(step.querySelector(".cr-step-card"), { x: 56, rotateY: -12, transformPerspective: 900, autoAlpha: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: step, start: "top 88%", once: true } });
          gsap.from(step.querySelector(".cr-num"), { scale: 0, duration: 0.8, ease: "back.out(2.2)", scrollTrigger: { trigger: step, start: "top 88%", once: true } });
          ScrollTrigger.create({ trigger: step, start: "top 65%", onEnter: () => step.classList.add("on"), onLeaveBack: () => step.classList.remove("on") });
          ScrollTrigger.create({ trigger: step, start: "top 60%", end: "bottom 60%", onToggle: (self) => { step.classList.toggle("cur", self.isActive); if (self.isActive && label) label.textContent = `Step ${i + 1}`; } });
        });
        cleanups.push(() => { if (label) label.textContent = "Step 1"; });
      }

      // ---------- gallery ----------
      const gal = one(".cr-gallery");
      const gtrack = one(".cr-gal-track");
      if (gal && gtrack) {
        gsap.fromTo(gtrack, { xPercent: 6 }, { xPercent: -16, ease: "none", scrollTrigger: { trigger: gal, start: "top bottom", end: "bottom top", scrub: 0.6 } });
        gsap.fromTo(".cr-gal-in", { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: gal, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".cr-gal", { y: 70, autoAlpha: 0, duration: 1.1, stagger: 0.14, ease: "expo.out", scrollTrigger: { trigger: gal, start: "top 88%", once: true } });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      // ---------- pointer effects (fine pointers only) ----------
      if (fine) {
        // hero: spotlight + layered depth
        if (hero) {
          const layers = all(".cr-hero [data-depth]").map((el) => ({
            d: Number(el.dataset.depth),
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          }));
          const onHero = (e: PointerEvent) => {
            const b = hero.getBoundingClientRect();
            hero.style.setProperty("--hx", `${e.clientX - b.left}px`);
            hero.style.setProperty("--hy", `${e.clientY - b.top}px`);
            const nx = (e.clientX - b.left) / b.width - 0.5;
            const ny = (e.clientY - b.top) / b.height - 0.5;
            layers.forEach((l) => { l.x(nx * l.d); l.y(ny * l.d); });
          };
          const offHero = () => layers.forEach((l) => { l.x(0); l.y(0); });
          hero.addEventListener("pointermove", onHero);
          hero.addEventListener("pointerleave", offHero);
          cleanups.push(() => { hero.removeEventListener("pointermove", onHero); hero.removeEventListener("pointerleave", offHero); });
        }

        // spotlight + 3D tilt + magnetic (delegated)
        let tilt: HTMLElement | null = null;
        let mag: HTMLElement | null = null;
        const release = (el: HTMLElement) => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: SPRING, overwrite: "auto" });
        const unpull = (el: HTMLElement) => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.45)", overwrite: "auto" });
        const onMove = (event: PointerEvent) => {
          const target = event.target as Element;
          const el = target.closest<HTMLElement>(".cr-tilt, .cr-spot");
          if (tilt && tilt !== el) release(tilt);
          tilt = null;
          if (el) {
            const box = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${event.clientX - box.left}px`);
            el.style.setProperty("--my", `${event.clientY - box.top}px`);
            if (el.classList.contains("cr-tilt")) {
              tilt = el;
              const x = (event.clientX - box.left) / box.width - 0.5;
              const y = (event.clientY - box.top) / box.height - 0.5;
              gsap.to(el, { rotateX: -y * 7, rotateY: x * 7, transformPerspective: 900, transformOrigin: "center", duration: 0.55, ease: "power3.out", overwrite: "auto" });
            }
          }
          const m = target.closest<HTMLElement>(MAGNETIC);
          if (mag && mag !== m) unpull(mag);
          mag = m;
          if (m) {
            const b = m.getBoundingClientRect();
            gsap.to(m, { x: (event.clientX - b.left - b.width / 2) * 0.28, y: (event.clientY - b.top - b.height / 2) * 0.28, duration: 0.5, ease: "power3.out", overwrite: "auto" });
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