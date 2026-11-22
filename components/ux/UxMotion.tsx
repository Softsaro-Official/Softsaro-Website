"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function split(el: HTMLElement) {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const parts = (n.textContent || "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "ux-w";
          const i = document.createElement("span"); i.className = "ux-i"; i.textContent = p;
          w.appendChild(i); frag.appendChild(w); words.push(i);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  return words;
}

export default function UxMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const offs: Array<() => void> = [];
    const on = (t: EventTarget, e: string, f: EventListener) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
    const html = document.documentElement;
    const prevSB = html.style.scrollBehavior;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ---- expertise (click works with or without scroll pin)
    const items = q(".ux-ex-item");
    const lays = q(".ux-lay");
    let cur = -1;
    const setActive = (i: number, d = 0.7) => {
      if (i === cur) return;
      cur = i;
      items.forEach((it, k) => it.classList.toggle("on", k === i));
      lays.forEach((l, k) => gsap.to(l, { clipPath: k <= i ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)", duration: reduce ? 0 : d, ease: "power3.inOut", overwrite: true }));
    };
    items.forEach((it, k) => on(it, "click", () => setActive(k)));
    setActive(0, 0);

    // ---- accordion
    const acs = q(".ux-ac-p");
    const act = (i: number) => acs.forEach((p, k) => p.classList.toggle("on", k === i));
    acs.forEach((p, k) => { on(p, "click", () => act(k)); if (fine) on(p, "mouseenter", () => act(k)); });

    // ---- theme chips
    const stage = el.querySelector<HTMLElement>(".ux-sc-stage");
    const chips = q(".ux-chip");
    chips.forEach((c) => on(c, "click", () => {
      stage?.setAttribute("data-theme", c.dataset.t || "purple");
      chips.forEach((x) => x.classList.toggle("on", x === c));
    }));

    if (reduce) return () => offs.forEach((f) => f());

    // ---- smooth scroll
    html.style.scrollBehavior = "auto";
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    q('a[href^="#"]').forEach((a) => on(a, "click", (e) => {
      const id = a.getAttribute("href") || "";
      const t = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
      if (t) { e.preventDefault(); lenis.scrollTo(t); }
    }));
    const rf = () => ScrollTrigger.refresh();
    on(window, "load", rf);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(rf);

    const orig = new Map<HTMLElement, string>();
    const sp = (e: HTMLElement) => { if (!orig.has(e)) orig.set(e, e.innerHTML); return split(e); };

    // ---- HERO
    const h1 = el.querySelector<HTMLElement>(".ux-h1");
    if (h1) {
      const w = sp(h1);
      gsap.set(w, { yPercent: 115, rotate: 5 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.to(w, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.07 })
        .from(".ux-hero .ux-eye", { y: 20, opacity: 0, duration: 0.8 }, 0.1)
        .from(".ux-hero .ux-sub, .ux-hero .ux-cta", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.5)
        .fromTo(".ux-win", { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "expo.inOut" }, 0.2)
        .from(".ux-phone", { y: 160, rotate: 10, opacity: 0, duration: 1.3 }, 0.8)
        .from(".ux-pal, .ux-sel", { scale: 0.6, opacity: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.15 }, 1.2);
    }

    // wireframe -> final morph loop
    const fills = q(".ux-win .ux-fill");
    if (fills.length) {
      gsap.set(fills, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(".ux-bd-b", { opacity: 0 });
      const morph = gsap.timeline({ repeat: -1, delay: 2.2 });
      morph.to(".ux-bd-a", { opacity: 0, duration: 0.3 }, 0)
        .to(".ux-bd-b", { opacity: 1, duration: 0.3 }, 0)
        .to(fills, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.09, ease: "expo.inOut" }, 0)
        .to({}, { duration: 2.6 })
        .to(".ux-bd-b", { opacity: 0, duration: 0.3 })
        .to(".ux-bd-a", { opacity: 1, duration: 0.3 }, "<")
        .to(fills, { clipPath: "inset(0% 0% 0% 100%)", duration: 0.7, stagger: 0.05, ease: "expo.inOut" }, "<")
        .set(fills, { clipPath: "inset(0% 100% 0% 0%)" });
    }

    gsap.to(".ux-dcur", { keyframes: [{ left: "18%", top: "30%" }, { left: "58%", top: "46%" }, { left: "40%", top: "70%" }, { left: "72%", top: "22%" }, { left: "30%", top: "48%" }], duration: 12, ease: "power2.inOut", repeat: -1 });
    q("[data-float]").forEach((f, i) => gsap.to(f, { y: "+=12", duration: 2.4 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.8, overwrite: false }));
    gsap.to(".ux-stage", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".ux-hero", start: "top top", end: "bottom top", scrub: true } });

    const hero = el.querySelector<HTMLElement>(".ux-hero");
    if (hero && fine) {
      const layers = q(".ux-l").map((l) => ({ x: gsap.quickTo(l, "x", { duration: 0.8, ease: "power3" }), y: gsap.quickTo(l, "y", { duration: 0.8, ease: "power3" }), d: parseFloat(l.dataset.depth || "0") }));
      on(hero, "mousemove", (e) => {
        const ev = e as MouseEvent;
        const r = hero.getBoundingClientRect();
        const nx = (ev.clientX - r.left) / r.width - 0.5;
        const ny = (ev.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => { l.x(-nx * l.d * 40); l.y(-ny * l.d * 40); });
      });
    }

    // ---- generic reveals
    q("[data-split]").forEach((h) => {
      const w = sp(h);
      gsap.set(w, { yPercent: 110 });
      ScrollTrigger.create({ trigger: h, start: "top 88%", once: true, onEnter: () => gsap.to(w, { yPercent: 0, duration: 1.1, stagger: 0.045, ease: "expo.out" }) });
    });
    q("[data-reveal]").forEach((f) => {
      const img = f.querySelector("img, .ux-empty");
      gsap.fromTo(f, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: f, start: "top 88%", toggleActions: "play none none none" } });
      if (img) {
        gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: f, start: "top 88%", toggleActions: "play none none none" } });
        gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
    q("[data-stagger]").forEach((g) => {
      gsap.from(Array.from(g.children), { y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: g, start: "top 85%", once: true } });
    });

    // ---- showcase
    const br = el.querySelector(".ux-sc-browser");
    if (br) gsap.fromTo(br, { rotateX: 36, y: 140, scale: 0.86, transformPerspective: 1400 }, { rotateX: 0, y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".ux-sc-stage", start: "top 92%", end: "top 25%", scrub: 0.6 } });
    q("[data-speed]").forEach((p) => {
      const s = parseFloat(p.dataset.speed || "0");
      gsap.to(p, { y: () => -s * 140, ease: "none", scrollTrigger: { trigger: ".ux-sc-stage", start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.set(".ux-bar", { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(".ux-ln", { strokeDashoffset: 1 });
    ScrollTrigger.create({ trigger: ".ux-sc-browser", start: "top 70%", once: true, onEnter: () => {
      gsap.to(".ux-bar", { scaleY: 1, duration: 1.1, stagger: 0.06, ease: "expo.out" });
      gsap.to(".ux-ln", { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" });
    } });
    if (fine) q("[data-tilt]").forEach((t) => {
      on(t, "pointermove", (e) => {
        const ev = e as PointerEvent;
        const r = t.getBoundingClientRect();
        const nx = (ev.clientX - r.left) / r.width - 0.5;
        const ny = (ev.clientY - r.top) / r.height - 0.5;
        gsap.to(t, { rotationY: nx * 14, rotationX: -ny * 14, transformPerspective: 800, duration: 0.5, ease: "power3" });
      });
      on(t, "pointerleave", () => gsap.to(t, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "elastic.out(1,.5)" }));
    });

    // ---- process stack
    const pcs = q(".ux-pc");
    pcs.forEach((c, i) => {
      const next = pcs[i + 1];
      if (next) gsap.to(c, { scale: 0.92, transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger: next, start: "top 85%", end: "top " + (100 + (i + 1) * 20) + "px", scrub: true } });
      const dr = c.querySelectorAll(".ux-dr");
      gsap.set(dr, { strokeDashoffset: 1 });
      ScrollTrigger.create({ trigger: c, start: "top 75%", once: true, onEnter: () => gsap.to(dr, { strokeDashoffset: 0, duration: 1.6, stagger: 0.15, ease: "power2.inOut" }) });
    });

    // ---- statement scrub + counters
    const st = el.querySelector<HTMLElement>(".ux-stmt");
    if (st) {
      const w = sp(st);
      gsap.set(w, { opacity: 0.14 });
      gsap.to(w, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 50%", scrub: true } });
    }
    q("[data-count]").forEach((c) => {
      const end = parseFloat(c.dataset.count || "0");
      const suf = c.dataset.suf || "";
      const o = { v: 0 };
      c.textContent = "0" + suf;
      ScrollTrigger.create({ trigger: c, start: "top 88%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: "power2.out", onUpdate: () => { c.textContent = Math.round(o.v) + suf; } }) });
    });

    // ---- magnetic buttons
    if (fine) q("[data-mag]").forEach((b) => {
      const xt = gsap.quickTo(b, "x", { duration: 0.6, ease: "power3" });
      const yt = gsap.quickTo(b, "y", { duration: 0.6, ease: "power3" });
      on(b, "pointermove", (e) => {
        const ev = e as PointerEvent;
        const r = b.getBoundingClientRect();
        xt((ev.clientX - r.left - r.width / 2) * 0.3);
        yt((ev.clientY - r.top - r.height / 2) * 0.3);
      });
      on(b, "pointerleave", () => { xt(0); yt(0); });
    });

    // ---- pinned expertise (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const n = items.length;
      ScrollTrigger.create({
        trigger: ".ux-ex-pin", start: "top top", end: () => "+=" + window.innerHeight * (n - 0.2), pin: true, scrub: true,
        onUpdate: (s) => { setActive(Math.min(n - 1, Math.floor(s.progress * n))); gsap.set(".ux-ex-bar i", { scaleY: s.progress }); },
      });
    });

    return () => {
      offs.forEach((f) => f());
      mm.revert();
      orig.forEach((h, e) => { e.innerHTML = h; });
      gsap.ticker.remove(tick);
      lenis.destroy();
      html.style.scrollBehavior = prevSB;
    };
  }, { scope: root });

  return <div ref={root} className="ux-page">{children}</div>;
}