// @ts-nocheck
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "@/components/team-motion.css";

gsap.registerPlugin(ScrollTrigger);

/** Masked word split that keeps inline wrappers (such as the italic em) intact. */
function splitWords(el) {
  const orig = el.innerHTML;
  const words = [];
  const mk = (node) => {
    const w = document.createElement("span");
    w.className = "tm-w";
    const i = document.createElement("span");
    i.className = "tm-i";
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

export default function TeamMotion({ children }) {
  const root = useRef(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const safe = contextSafe;
      const scope = root.current;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const offs = [];
      const on = (t, e, f, o) => { t.addEventListener(e, f, o); offs.push(() => t.removeEventListener(e, f, o)); };
      const q = (s) => Array.from(scope.querySelectorAll(s));
      const one = (s) => scope.querySelector(s);
      const splits = [];
      offs.push(() => splits.forEach((s) => s.restore()));
      const mm = gsap.matchMedia();
      offs.push(() => mm.revert());
      const once = (trigger, start = "top 82%") => ({ trigger, start, once: true });
      const words = (el) => { const s = splitWords(el); splits.push(s); gsap.set(s.words, { yPercent: 112 }); return s.words; };
      const revealH = (el, start) => { const w = words(el); gsap.to(w, { yPercent: 0, duration: 1.2, stagger: 0.05, ease: "expo.out", scrollTrigger: once(el, start) }); };
      const add = (parent, tag, cls, first) => {
        const el = document.createElement(tag);
        el.className = cls;
        el.setAttribute("aria-hidden", "true");
        first ? parent.insertBefore(el, parent.firstChild) : parent.appendChild(el);
        offs.push(() => el.remove());
        return el;
      };

      /* scroll progress (appended to body so page transforms cannot break position:fixed) */
      const bar = document.createElement("div");
      bar.className = "tm-progress";
      document.body.appendChild(bar);
      offs.push(() => bar.remove());
      gsap.set(bar, { scaleX: 0, transformOrigin: "0 50%" });
      gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      /* status dots: pulse only if the existing indicator really is green */
      const dot = one(".team-avatar i");
      if (dot) {
        const c = (getComputedStyle(dot).backgroundColor.match(/\d+/g) || []).map(Number);
        if (c.length >= 3 && c[1] > c[0] + 20 && c[1] > c[2] + 20) scope.classList.add("tm-dots");
        offs.push(() => scope.classList.remove("tm-dots"));
      }

      /* ===== HERO ===== */
      const hero = one(".team-hero");
      const h1 = one(".team-hero h1");
      const sym = one(".team-symbol");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.5 });
      if (h1) {
        const w = words(h1);
        gsap.set(w, { rotate: 3 });
        tl.to(w, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.08 }, 0);
      }
      tl.from(".team-hero .lab", { x: -30, opacity: 0, duration: 1.1 }, 0.1)
        .from(".team-hero-grid > div:first-child > p", { y: 28, opacity: 0, duration: 1.2 }, 1.1)
        .from(sym, { scale: 0.7, opacity: 0, rotate: -8, duration: 1.8 }, 0.3)
        .from(".team-symbol span", { y: 20, opacity: 0, duration: 1.1 }, 1.3);
      const shapes = q(".team-symbol svg *").filter((s) => typeof s.getTotalLength === "function");
      shapes.forEach((s) => { try { const L = s.getTotalLength(); gsap.set(s, { strokeDasharray: L, strokeDashoffset: L }); } catch (e) {} });
      tl.to(shapes, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", onComplete: () => gsap.set(shapes, { clearProps: "strokeDasharray,strokeDashoffset" }) }, 0.9);
      if (sym) gsap.to(sym, { yPercent: -10, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".team-hero-grid > div:first-child", { yPercent: -5, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      if (fine && sym) {
        gsap.set(sym, { transformPerspective: 900 });
        const rx = gsap.quickTo(sym, "rotationX", { duration: 0.9, ease: "power3.out" });
        const ry = gsap.quickTo(sym, "rotationY", { duration: 0.9, ease: "power3.out" });
        on(hero, "pointermove", (e) => { const r = hero.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 14); rx(-((e.clientY - r.top) / r.height - 0.5) * 12); });
        on(hero, "pointerleave", () => { rx(0); ry(0); });
      }

      /* orbit of real team initials around the symbol (desktop only) */
      mm.add("(min-width: 901px)", () => {
        const grid = one(".team-hero-grid");
        if (!grid || !sym) return;
        const orbit = add(grid, "div", "tm-orbit");
        const chips = q(".team-card").slice(0, 8).map((card) => {
          const c = document.createElement("i");
          const tone = (card.className.match(/team-(violet|ink|lime|coral)/) || [])[1] || "violet";
          c.className = "tm-chip tm-" + tone;
          c.textContent = (card.querySelector(".team-avatar span") || {}).textContent || "";
          orbit.appendChild(c);
          return c;
        });
        gsap.set(chips, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.to(chips, { opacity: 1, duration: 1, stagger: 0.1, delay: 2.2 });
        const sx = chips.map((c) => gsap.quickSetter(c, "x", "px"));
        const sy = chips.map((c) => gsap.quickSetter(c, "y", "px"));
        const ss = chips.map((c) => gsap.quickSetter(c, "scale"));
        let cx = 0, cy = 0, R = 200, live = true;
        const measure = () => {
          const g = grid.getBoundingClientRect(), s = sym.getBoundingClientRect();
          cx = s.left - g.left + s.width / 2; cy = s.top - g.top + s.height / 2;
          R = Math.min(Math.max(s.width, s.height) * 0.62, 300);
        };
        measure();
        const tick = () => {
          if (!live) return;
          const t = gsap.ticker.time * 0.16;
          chips.forEach((_, i) => {
            const a = t + (i * Math.PI * 2) / chips.length;
            sx[i](cx + Math.cos(a) * R);
            sy[i](cy + Math.sin(a) * R * 0.72);
            ss[i](0.82 + 0.18 * ((Math.sin(a) + 1) / 2));
          });
        };
        gsap.ticker.add(tick);
        const st = ScrollTrigger.create({ trigger: hero, start: "top bottom", end: "bottom top", onToggle: (s) => { live = s.isActive; } });
        const onResize = () => measure();
        window.addEventListener("resize", onResize);
        ScrollTrigger.addEventListener("refreshInit", measure);
        return () => { gsap.ticker.remove(tick); st.kill(); window.removeEventListener("resize", onResize); ScrollTrigger.removeEventListener("refreshInit", measure); orbit.remove(); };
      });

      /* ===== SECTION HEADINGS ===== */
      q(".team-heading h2").forEach((h) => revealH(h));
      q(".team-heading .blog-category").forEach((c) => gsap.from(c, { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(c, "top 88%") }));
      q(".team-heading > p").forEach((p) => gsap.from(p, { x: 50, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: once(p, "top 90%") }));

      /* ===== TEAM CARDS ===== */
      const cards = q(".team-card");
      cards.forEach((card) => add(card, "i", "tm-spot", true));
      const lead = q(".management-grid .team-card");
      if (lead.length) {
        gsap.set(lead, { opacity: 0, y: 80, rotationX: -16, transformPerspective: 900, transformOrigin: "50% 100%" });
        gsap.to(lead, { opacity: 1, y: 0, rotationX: 0, duration: 1.3, stagger: 0.14, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: once(".management-grid", "top 84%") });
      }
      const wide = q(".team-grid:not(.management-grid) .team-card");
      if (wide.length) {
        gsap.set(wide, { opacity: 0, y: 70, scale: 0.92 });
        ScrollTrigger.batch(wide, { start: "top 92%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.07, ease: "expo.out", clearProps: "transform,opacity" }) });
      }
      cards.forEach((card) => {
        const ini = card.querySelector(".team-avatar span");
        if (ini) gsap.fromTo(ini, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });
      if (fine) {
        cards.forEach((card) => {
          const av = card.querySelector(".team-avatar");
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });
          const yy = gsap.quickTo(card, "y", { duration: 0.7, ease: "power3.out" });
          const sc = gsap.quickTo(card, "scale", { duration: 0.7, ease: "power3.out" });
          const ax = av && gsap.quickTo(av, "x", { duration: 0.8, ease: "power3.out" });
          const ay = av && gsap.quickTo(av, "y", { duration: 0.8, ease: "power3.out" });
          on(card, "pointerenter", safe(() => { gsap.set(card, { transformPerspective: 900 }); card.classList.add("tm-hot"); sc(1.02); yy(-8); }));
          on(card, "pointermove", (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
            ry((px - 0.5) * 12); rx(-(py - 0.5) * 12);
            card.style.setProperty("--mx", px * 100 + "%"); card.style.setProperty("--my", py * 100 + "%");
            if (ax) { ax((px - 0.5) * 14); ay((py - 0.5) * 14); }
          });
          on(card, "pointerleave", () => { rx(0); ry(0); yy(0); sc(1); if (ax) { ax(0); ay(0); } card.classList.remove("tm-hot"); });
        });
      }

      /* ===== WIDER TEAM: section opens, a soft light follows the pointer ===== */
      const alt = one(".team-group-alt");
      if (alt) {
        gsap.fromTo(alt, { clipPath: "inset(0% 4% 0% 4% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: alt, start: "top 96%", end: "top 45%", scrub: true } });
        if (fine) {
          const L = add(alt, "i", "tm-light", true);
          gsap.set(L, { xPercent: -50, yPercent: -50, opacity: 0 });
          const lx = gsap.quickTo(L, "x", { duration: 0.9, ease: "power3.out" });
          const ly = gsap.quickTo(L, "y", { duration: 0.9, ease: "power3.out" });
          on(alt, "pointermove", (e) => { const r = alt.getBoundingClientRect(); lx(e.clientX - r.left); ly(e.clientY - r.top); });
          on(alt, "pointerenter", safe(() => gsap.to(L, { opacity: 1, duration: 0.6 })));
          on(alt, "pointerleave", safe(() => gsap.to(L, { opacity: 0, duration: 0.6 })));
        }
      }

      /* ===== CTA: moving light, oversized heading, magnetic link ===== */
      const cta = one(".team-cta");
      if (cta) {
        const b1 = add(cta, "i", "tm-blob b1", true);
        const b2 = add(cta, "i", "tm-blob b2", true);
        const d1 = gsap.to(b1, { x: "10vw", y: "5vw", duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1 });
        const d2 = gsap.to(b2, { x: "-9vw", y: "-4vw", duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
        ScrollTrigger.create({ trigger: cta, start: "top bottom", end: "bottom top", onToggle: (s) => { s.isActive ? (d1.play(), d2.play()) : (d1.pause(), d2.pause()); } });
        gsap.fromTo(cta, { clipPath: "inset(0% 4% 0% 4% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: cta, start: "top 98%", end: "top 50%", scrub: true } });
        const cc = one(".team-cta .blog-category");
        if (cc) gsap.from(cc, { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(cta, "top 75%") });
        const h2 = one(".team-cta h2");
        if (h2) {
          const w = words(h2);
          gsap.to(w, { yPercent: 0, duration: 1.4, stagger: 0.08, ease: "expo.out", scrollTrigger: once(h2, "top 85%") });
          gsap.fromTo(h2, { xPercent: -3 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true } });
        }
        const a = one(".team-cta a");
        if (a) {
          gsap.fromTo(a, { clipPath: "inset(0% 100% 0% 0% round 999px)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 999px)", opacity: 1, duration: 1.2, ease: "expo.inOut", delay: 0.2, scrollTrigger: once(cta, "top 70%"), onComplete: () => gsap.set(a, { clearProps: "clipPath" }) });
          if (fine) {
            const xt = gsap.quickTo(a, "x", { duration: 0.7, ease: "elastic.out(1,.5)" });
            const yt = gsap.quickTo(a, "y", { duration: 0.7, ease: "elastic.out(1,.5)" });
            const ar = a.querySelector("svg");
            on(a, "pointermove", (e) => { const r = a.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.22); yt((e.clientY - r.top - r.height / 2) * 0.32); });
            on(a, "pointerenter", safe(() => ar && gsap.to(ar, { x: 4, y: -4, duration: 0.4, ease: "power3.out" })));
            on(a, "pointerleave", safe(() => { xt(0); yt(0); if (ar) gsap.to(ar, { x: 0, y: 0, duration: 0.5, ease: "power3.out" }); }));
            on(cta, "pointermove", (e) => { const r = cta.getBoundingClientRect(); gsap.to(b2, { xPercent: ((e.clientX - r.left) / r.width - 0.5) * 12, duration: 1.2, ease: "power3.out", overwrite: "auto" }); });
          }
        }
      }

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => offs.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}