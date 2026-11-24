// @ts-nocheck
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "@/components/about-motion.css";

gsap.registerPlugin(ScrollTrigger);

/** Masked word split that keeps inline wrappers (such as the italic em) intact. */
function splitWords(el) {
  const orig = el.innerHTML;
  const words = [];
  const mk = (node) => {
    const w = document.createElement("span");
    w.className = "am-w";
    const i = document.createElement("span");
    i.className = "am-i";
    i.appendChild(node);
    w.appendChild(i);
    words.push(i);
    return w;
  };
  const walk = (parent, out) => {
    Array.from(parent.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        (n.textContent || "").split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) out.appendChild(document.createTextNode(" "));
          else out.appendChild(mk(document.createTextNode(p)));
        });
      } else if (n.tagName === "BR") out.appendChild(n.cloneNode());
      else { const c = n.cloneNode(false); walk(n, c); out.appendChild(c); }
    });
  };
  const frag = document.createDocumentFragment();
  walk(el, frag);
  el.textContent = "";
  el.appendChild(frag);
  return { words, restore: () => { el.innerHTML = orig; } };
}

export default function AboutMotion({ children }) {
  const root = useRef(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const safe = contextSafe;
      const scope = root.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const offs = [];
      const on = (t, e, f, o) => { t.addEventListener(e, f, o); offs.push(() => t.removeEventListener(e, f, o)); };
      const q = (s) => Array.from(scope.querySelectorAll(s));
      const one = (s) => scope.querySelector(s);
      const splits = [];
      offs.push(() => splits.forEach((s) => s.restore()));
      const once = (trigger, start = "top 82%") => ({ trigger, start, once: true });
      const reveal = (el, gap = 0.045) => {
        const s = splitWords(el);
        splits.push(s);
        gsap.set(s.words, { yPercent: 112 });
        return s.words;
      };

      /* ===== HERO: cinematic entrance ===== */
      const hero = one(".about-hero");
      const h1 = one(".about-hero h1");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.5 });
      if (h1) {
        const w = reveal(h1);
        gsap.set(w, { rotate: 3 });
        tl.to(w, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.08 }, 0);
      }
      tl.from(".about-hero .lab", { x: -30, opacity: 0, duration: 1.1 }, 0.1)
        .from(".about-hero-grid p", { y: 28, opacity: 0, duration: 1.2 }, 1)
        .from(".about-orbit", { scale: 0.55, opacity: 0, duration: 1.9 }, 0.3)
        .from(".about-orbit-ring", { scale: 0.82, opacity: 0, duration: 1.9 }, 0.7)
        .from(".about-orbit b", { scale: 0.6, opacity: 0, y: 20, duration: 1.3 }, 1)
        .from(".about-orbit-dot", { scale: 0, duration: 0.9, stagger: 0.2, ease: "back.out(2)" }, 1.5)
        .from(".about-scroll span", { opacity: 0, y: 10, duration: 0.9 }, 1.7)
        .from(".about-scroll i", { scaleX: 0, transformOrigin: "left center", duration: 1.3 }, 1.7);
      q(".about-orbit-dot").forEach((d, i) => gsap.to(d, { xPercent: i ? -45 : 45, yPercent: i ? 40 : -40, duration: 5 + i * 1.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.6 }));
      gsap.to(".about-orbit", { yPercent: -12, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".about-hero-grid > div:first-child", { yPercent: -6, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      if (fine && hero) {
        const parts = [[".about-orbit", 16], [".about-orbit-ring", 26], [".about-orbit-dot", 34]].flatMap(([s, d]) =>
          q(s).map((el) => ({ x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }), d })));
        let live = false;
        tl.call(() => { live = true; }, null, 2.4);
        on(hero, "pointermove", (e) => {
          if (!live) return;
          const r = hero.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          parts.forEach((p) => { p.x(px * p.d); p.y(py * p.d); });
        });
        on(hero, "pointerleave", () => parts.forEach((p) => { p.x(0); p.y(0); }));
      }

      /* ===== WHO WE ARE: word reveal, then the paragraph fills in as you read ===== */
      const intro = one(".about-intro");
      const cat = one(".about-intro .blog-category");
      if (cat) {
        gsap.from(cat, { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(intro, "top 75%") });
        gsap.to(cat, { yPercent: -60, ease: "none", scrollTrigger: { trigger: intro, start: "top bottom", end: "bottom top", scrub: true } });
      }
      const h2a = one(".about-intro h2");
      if (h2a) { const w = reveal(h2a); gsap.to(w, { yPercent: 0, duration: 1.2, stagger: 0.05, ease: "expo.out", scrollTrigger: once(h2a) }); }
      const big = one(".about-large");
      if (big) {
        const s = splitWords(big);
        splits.push(s);
        gsap.fromTo(s.words, { opacity: 0.22 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: big, start: "top 82%", end: "bottom 55%", scrub: true } });
      }
      gsap.from(".about-text-link", { y: 24, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: once(".about-text-link", "top 92%") });

      /* ===== STATS: band opens from an inset frame, numbers count up ===== */
      const stats = one(".about-stats");
      if (stats) gsap.fromTo(stats, { clipPath: "inset(0% 5% 0% 5% round 36px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: stats, start: "top 96%", end: "top 40%", scrub: true } });
      const cells = q(".about-stat-grid > div");
      gsap.from(cells, { y: 50, opacity: 0, duration: 1.1, stagger: 0.14, ease: "expo.out", scrollTrigger: once(stats, "top 70%") });
      q(".about-stat-grid strong").forEach((el) => {
        const node = Array.from(el.childNodes).find((n) => n.nodeType === 3);
        if (!node) return;
        const end = parseInt(node.nodeValue, 10);
        if (!Number.isFinite(end)) return;
        const o = { v: 0 };
        node.nodeValue = "0";
        offs.push(() => { node.nodeValue = String(end); });
        gsap.to(o, { v: end, duration: 2.2, ease: "power2.out", scrollTrigger: once(stats, "top 70%"), onUpdate: () => { node.nodeValue = String(Math.round(o.v)); } });
      });

      /* ===== HOW WE WORK: heading, then cards wipe up and their icons draw ===== */
      const appr = one(".about-approach");
      const h2b = one(".about-approach h2");
      if (h2b) { const w = reveal(h2b); gsap.to(w, { yPercent: 0, duration: 1.2, stagger: 0.05, ease: "expo.out", scrollTrigger: once(h2b) }); }
      gsap.from(".about-approach .lab", { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(appr, "top 75%") });
      gsap.from(".about-approach-heading > p", { x: 60, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: once(".about-approach-heading > p", "top 88%") });
      const cards = q(".about-principles article");
      if (cards.length) {
        gsap.set(cards, { clipPath: "inset(100% 0% 0% 0% round 22px)" });
        const ct = gsap.timeline({ scrollTrigger: once(".about-principles", "top 82%"), onComplete: () => gsap.set(cards, { clearProps: "clipPath" }) });
        cards.forEach((c, i) => {
          const at = i * 0.18;
          ct.to(c, { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.3, ease: "expo.inOut" }, at);
          ct.from(Array.from(c.children).filter((k) => k.tagName !== "svg"), { y: 26, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity" }, at + 0.5);
          const shapes = Array.from(c.querySelectorAll("svg *")).filter((s) => typeof s.getTotalLength === "function");
          shapes.forEach((s) => { try { const L = s.getTotalLength(); gsap.set(s, { strokeDasharray: L, strokeDashoffset: L }); } catch (e) {} });
          ct.to(shapes, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", onComplete: () => gsap.set(shapes, { clearProps: "strokeDasharray,strokeDashoffset" }) }, at + 0.5);
        });
        if (fine) {
          cards.forEach((c) => {
            const rx = gsap.quickTo(c, "rotationX", { duration: 0.8, ease: "power3.out" });
            const ry = gsap.quickTo(c, "rotationY", { duration: 0.8, ease: "power3.out" });
            const yy = gsap.quickTo(c, "y", { duration: 0.8, ease: "power3.out" });
            gsap.set(c, { transformPerspective: 900 });
            on(c, "pointermove", (e) => { const r = c.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 7); rx(-((e.clientY - r.top) / r.height - 0.5) * 7); yy(-6); });
            on(c, "pointerleave", () => { rx(0); ry(0); yy(0); });
          });
        }
      }

      /* ===== CLOSING: heading rises, button wipes in ===== */
      const clos = one(".about-closing");
      const cc = one(".about-closing .blog-category");
      if (cc) gsap.from(cc, { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(clos, "top 78%") });
      const h2c = one(".about-closing h2");
      if (h2c) { const w = reveal(h2c); gsap.to(w, { yPercent: 0, duration: 1.3, stagger: 0.07, ease: "expo.out", scrollTrigger: once(h2c, "top 85%") }); }
      gsap.from(".about-closing p:not(.blog-category)", { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(clos, "top 70%") });
      const cta = one(".about-closing a");
      if (cta) {
        gsap.fromTo(cta, { clipPath: "inset(0% 100% 0% 0% round 999px)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 999px)", opacity: 1, duration: 1.2, ease: "expo.inOut", delay: 0.2, scrollTrigger: once(clos, "top 70%"), onComplete: () => gsap.set(cta, { clearProps: "clipPath" }) });
      }

      /* ===== about-v2: company intro, collage, leadership, clients ===== */
      [".about-co h2", ".about-who-extra h3", ".about-why h2", ".about-lead h2", ".about-clients h2", ".about-contact .lab"].forEach((s) => {
        const el = one(s);
        if (!el || s.endsWith(".lab")) return;
        const w = reveal(el);
        gsap.to(w, { yPercent: 0, duration: 1.25, stagger: 0.05, ease: "expo.out", scrollTrigger: once(el, "top 86%") });
      });
      if (one(".about-co")) gsap.from(".about-co-side > *", { y: 30, opacity: 0, duration: 1.1, stagger: 0.12, ease: "expo.out", scrollTrigger: once(".about-co", "top 70%") });
      if (one(".about-who-extra")) gsap.from(".about-who-extra > :not(h3)", { y: 28, opacity: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", scrollTrigger: once(".about-who-extra", "top 85%") });

      q(".about-collage figure").forEach((f) => {
        const shot = f.querySelector(".about-shot"), inner = f.querySelector(".about-shot-in"), img = f.querySelector("img");
        gsap.fromTo(shot, { clipPath: "inset(100% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "expo.inOut", scrollTrigger: once(f, "top 86%"), onComplete: () => gsap.set(shot, { clearProps: "clipPath" }) });
        if (img) gsap.from(img, { scale: 1.3, duration: 2, ease: "expo.out", scrollTrigger: once(f, "top 86%") });
        if (inner) gsap.fromTo(inner, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.from(".about-shot-tag", { y: 16, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: once(".about-collage", "top 70%") });

      const pt = one(".about-portrait");
      if (pt) {
        gsap.fromTo(pt, { clipPath: "inset(100% 0% 0% 0% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.5, ease: "expo.inOut", scrollTrigger: once(pt, "top 85%"), onComplete: () => gsap.set(pt, { clearProps: "clipPath" }) });
        gsap.fromTo(".about-portrait-in", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: pt, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".about-portrait-chip", { y: 20, opacity: 0, stagger: 0.12, duration: 1, ease: "expo.out", scrollTrigger: once(pt, "top 70%") });
      }
      if (one(".about-lead-copy .blog-category")) gsap.from(".about-lead-copy .blog-category", { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(".about-lead", "top 75%") });
      if (one(".about-quote")) gsap.from(".about-quote", { x: 70, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: once(".about-quote", "top 88%") });
      const qt = one(".about-quote blockquote");
      if (qt) { const s = splitWords(qt); splits.push(s); gsap.fromTo(s.words, { opacity: 0.2 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: qt, start: "top 80%", end: "bottom 55%", scrub: true } }); }

      q("[data-about-count]").forEach((el) => {
        const end = parseInt(el.getAttribute("data-about-count"), 10), o = { v: 0 };
        if (!Number.isFinite(end)) return;
        el.textContent = "0";
        offs.push(() => { el.textContent = String(end); });
        gsap.to(o, { v: end, duration: 2.2, ease: "power2.out", scrollTrigger: once(el, "top 88%"), onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
      });
      if (one(".about-mq")) gsap.from(".about-mq", { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: once(".about-clients", "top 62%") });

      /* ===== magnetic links with arrow nudge ===== */
      if (fine) {
        q(".about-text-link, .about-closing a").forEach((b) => {
          const xt = gsap.quickTo(b, "x", { duration: 0.7, ease: "elastic.out(1,.5)" });
          const yt = gsap.quickTo(b, "y", { duration: 0.7, ease: "elastic.out(1,.5)" });
          const ar = b.querySelector("svg");
          on(b, "pointermove", (e) => { const r = b.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.22); yt((e.clientY - r.top - r.height / 2) * 0.32); });
          on(b, "pointerenter", safe(() => ar && gsap.to(ar, { x: 4, y: -4, duration: 0.4, ease: "power3.out" })));
          on(b, "pointerleave", safe(() => { xt(0); yt(0); if (ar) gsap.to(ar, { x: 0, y: 0, duration: 0.5, ease: "power3.out" }); }));
        });
      }

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => offs.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}