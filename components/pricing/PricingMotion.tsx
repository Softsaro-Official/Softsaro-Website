"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* plain-text split into masked words (used for headings only) */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent ?? "").trim();
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const out: HTMLElement[] = [];
  const words = text.split(/\s+/);
  words.forEach((w, i) => {
    const wrap = document.createElement("span");
    wrap.className = "pm-w";
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "pm-i";
    inner.textContent = w;
    wrap.append(inner);
    el.append(wrap);
    if (i < words.length - 1) el.append(" ");
    out.push(inner);
  });
  return out;
}

export default function PricingMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, scope);
    const one = (s: string) => scope.querySelector<HTMLElement>(s);
    const mm = gsap.matchMedia();

    mm.add({ wide: "(min-width: 851px)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const c = ctx.conditions as unknown as { wide: boolean; fine: boolean };
      const offs: Array<() => void> = [];
      const on = (t: EventTarget, e: string, f: (ev: any) => void) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
      scope.classList.add("pm-on");

      /* smooth scroll - paused while the plan modal is open */
      const lenis = new Lenis({ duration: 1.15, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const mo = new MutationObserver(() => { if (document.body.classList.contains("plan-modal-open")) lenis.stop(); else lenis.start(); });
      mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

      /* ---------- HERO: masked 3D word rise, drifting light, cursor spotlight, scroll-out ---------- */
      const hero = one(".price-hero");
      const h1 = hero?.querySelector<HTMLElement>("h1");
      if (hero && h1) {
        const words = splitWords(h1);
        gsap.set(q(".price-hero .pm-w"), { perspective: 700 });
        gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
          .from(q(".price-fx i"), { autoAlpha: 0, duration: 2.2, stagger: 0.15 }, 0)
          .from(hero.querySelector(".price-eye"), { x: -26, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from(words, { yPercent: 118, rotationX: -80, transformOrigin: "50% 100%", duration: 1.4, stagger: 0.07 }, 0.25)
          .from(hero.querySelector("p:not(.price-eye)"), { y: 26, autoAlpha: 0, duration: 0.9 }, 1.0)
          .from(hero.querySelector(".price-jump"), { y: 26, autoAlpha: 0, scale: 0.9, duration: 1, ease: "back.out(1.6)" }, 1.2);
        const out = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.to(h1, { yPercent: -10, ease: "none", scrollTrigger: out });
        gsap.to(hero.querySelector("p:not(.price-eye)"), { yPercent: -22, ease: "none", scrollTrigger: out });
        gsap.to(q(".price-fx .l1"), { y: 220, ease: "none", scrollTrigger: out });
        gsap.to(q(".price-fx .l2"), { y: 120, ease: "none", scrollTrigger: out });
        gsap.to(q(".price-fx .l3"), { y: -140, ease: "none", scrollTrigger: out });
        if (c.fine) {
          const m = { x: 70, y: 30 };
          const apply = () => { hero.style.setProperty("--mx", m.x + "%"); hero.style.setProperty("--my", m.y + "%"); };
          const qx = gsap.quickTo(m, "x", { duration: 0.9, ease: "power3", onUpdate: apply });
          const qy = gsap.quickTo(m, "y", { duration: 0.9, ease: "power3", onUpdate: apply });
          on(hero, "pointermove", (e: PointerEvent) => { const b = hero.getBoundingClientRect(); qx(((e.clientX - b.left) / b.width) * 100); qy(((e.clientY - b.top) / b.height) * 100); });
        }
      }

      /* ---------- PLANS heading ---------- */
      const heading = one(".price-heading");
      if (heading) gsap.from(Array.from(heading.children), { clipPath: "inset(0 0 100% 0)", y: 24, autoAlpha: 0, duration: 1, stagger: 0.14, ease: "expo.out", scrollTrigger: { trigger: heading, start: "top 88%", once: true } });

      /* ---------- PRICING CARDS ---------- */
      const grid = one(".price-grid");
      const cards = q(".price-card");
      const base = (el: HTMLElement) => (c.wide && el.classList.contains("price-card--featured") ? -22 : 0);
      if (grid && cards.length) {
        gsap.fromTo(cards,
          { y: (i: number) => base(cards[i]) + 120, autoAlpha: 0, rotationX: -16, scale: 0.92, transformPerspective: 1100, clipPath: "inset(10% 5% 10% 5% round 64px)" },
          { y: (i: number) => base(cards[i]), autoAlpha: 1, rotationX: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 64px)", duration: 1.4, ease: "expo.out", stagger: { each: 0.16, from: "center" }, clearProps: "clipPath", scrollTrigger: { trigger: grid, start: "top 82%", once: true } });

        /* feature rows reveal as they scroll into view (long SEO lists stay quick) */
        const rows = q(".price-card li, .price-card .price-extra p, .price-card h3");
        gsap.set(rows, { autoAlpha: 0, x: -16 });
        ScrollTrigger.batch(rows, { start: "top 95%", once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.035, ease: "power3.out", overwrite: true }) });

        cards.forEach((card, i) => {
          /* price count-up (exact text restored at the end) */
          const val = card.querySelector<HTMLElement>(".price-value");
          const txt = val?.textContent ?? "";
          const m = txt.match(/[\d,]+/);
          if (val && m) {
            const target = parseInt(m[0].replace(/,/g, ""), 10), o = { v: 0 };
            val.setAttribute("aria-label", txt);
            val.textContent = txt.replace(m[0], "0");
            ScrollTrigger.create({ trigger: card, start: "top 80%", once: true, onEnter: () => {
              gsap.to(o, { v: target, duration: 1.5, ease: "power3.out", delay: 0.25, onUpdate: () => { val.textContent = txt.replace(m[0], Math.round(o.v).toLocaleString("en-US")); }, onComplete: () => { val.textContent = txt; } });
            } });
          }
          gsap.to(card, { yPercent: card.classList.contains("price-card--featured") ? -2 : 2, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
          /* touch / small screens: highlight the card that is centred in view */
          if (!c.fine) ScrollTrigger.create({ trigger: card, start: "top 62%", end: "bottom 38%", toggleClass: { targets: card, className: "is-active" } });

          if (c.fine) {
            const b = base(card);
            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100;
              card.style.setProperty("--px", x + "%"); card.style.setProperty("--py", y + "%");
              gsap.to(card, { rotationY: (x - 50) * 0.06, rotationX: -(y - 50) * 0.045, transformPerspective: 1100, duration: 0.55, ease: "power3.out", overwrite: "auto" });
            };
            on(card, "pointerenter", () => { gsap.to(card, { y: b - 12, scale: 1.015, duration: 0.7, ease: "power3.out", overwrite: "auto" }); });
            on(card, "pointermove", move);
            on(card, "pointerleave", () => { gsap.to(card, { rotationX: 0, rotationY: 0, y: b, scale: 1, duration: 1, ease: "elastic.out(1,.55)", overwrite: "auto" }); });
            /* magnetic Choose button */
            const act = card.querySelector<HTMLElement>(".price-action");
            if (act) {
              const ax = gsap.quickTo(act, "x", { duration: 0.6, ease: "elastic.out(1,.5)" }), ay = gsap.quickTo(act, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
              on(act, "pointermove", (e: PointerEvent) => { const r = act.getBoundingClientRect(); ax((e.clientX - (r.left + r.width / 2)) * 0.08); ay((e.clientY - (r.top + r.height / 2)) * 0.22); });
              on(act, "pointerleave", () => { ax(0); ay(0); });
            }
          }
        });
      }

      /* ---------- TAILORED-SCOPE CTA ---------- */
      const cta = one(".price-cta");
      const ch2 = cta?.querySelector<HTMLElement>("h2");
      if (cta && ch2) {
        const w = splitWords(ch2);
        gsap.set(cta.querySelectorAll(".pm-w"), { perspective: 700 });
        gsap.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: cta, start: "top 78%", once: true } })
          .from(cta.querySelector(".price-eye"), { x: -26, autoAlpha: 0, duration: 0.8 })
          .from(w, { yPercent: 118, rotationX: -75, transformOrigin: "50% 100%", duration: 1.3, stagger: 0.07 }, 0.1)
          .from(cta.querySelector(":scope > a"), { y: 30, autoAlpha: 0, scale: 0.85, duration: 1.1, ease: "back.out(1.7)" }, 0.9);
        const sc = { trigger: cta, start: "top bottom", end: "bottom top", scrub: true };
        gsap.to(q(".price-cta-fx .l1"), { y: -120, ease: "none", scrollTrigger: sc });
        gsap.to(q(".price-cta-fx .l2"), { y: 80, ease: "none", scrollTrigger: sc });
        const btn = cta.querySelector<HTMLElement>(":scope > a");
        if (btn && c.fine) {
          const bx = gsap.quickTo(btn, "x", { duration: 0.6, ease: "elastic.out(1,.5)" }), by = gsap.quickTo(btn, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
          on(btn, "pointermove", (e: PointerEvent) => { const r = btn.getBoundingClientRect(); bx((e.clientX - (r.left + r.width / 2)) * 0.3); by((e.clientY - (r.top + r.height / 2)) * 0.35); });
          on(btn, "pointerleave", () => { bx(0); by(0); });
        }
      }
      const jump = one(".price-jump");
      if (jump && c.fine) {
        const jx = gsap.quickTo(jump, "x", { duration: 0.6, ease: "elastic.out(1,.5)" }), jy = gsap.quickTo(jump, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
        on(jump, "pointermove", (e: PointerEvent) => { const r = jump.getBoundingClientRect(); jx((e.clientX - (r.left + r.width / 2)) * 0.25); jy((e.clientY - (r.top + r.height / 2)) * 0.3); });
        on(jump, "pointerleave", () => { jx(0); jy(0); });
      }
      ScrollTrigger.refresh();

      return () => {
        offs.forEach((f) => f());
        mo.disconnect();
        gsap.ticker.remove(tick);
        lenis.destroy();
        scope.classList.remove("pm-on");
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => { window.removeEventListener("load", refresh); mm.revert(); };
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}