"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function split(el: HTMLElement) {
  const out: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (n.textContent || "").split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(" ")); return; }
          const ww = document.createElement("span"); ww.className = "bn-ww";
          Array.from(w).forEach((c) => {
            const cw = document.createElement("span"); cw.className = "bn-cw";
            const ci = document.createElement("span"); ci.className = "bn-ci"; ci.textContent = c;
            cw.appendChild(ci); ww.appendChild(cw); out.push(ci);
          });
          frag.appendChild(ww);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  return out;
}

export default function BnMotion({ children }: { children: ReactNode }) {
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
    const orig = new Map<HTMLElement, string>();
    const sp = (e: HTMLElement) => { if (!orig.has(e)) orig.set(e, e.innerHTML); return split(e); };

    // ---- hover-reveal preview (works without scroll animation)
    const rows = q(".bn-row");
    const pv = el.querySelector<HTMLElement>(".bn-pv");
    const pvi = q(".bn-pvi");
    if (pv && fine && rows.length) {
      const xs = gsap.quickTo(pv, "x", { duration: 0.5, ease: "power3" });
      const ys = gsap.quickTo(pv, "y", { duration: 0.5, ease: "power3" });
      gsap.set(pv, { autoAlpha: 0, scale: 0.8 });
      rows.forEach((r, i) => {
        on(r, "mouseenter", () => {
          pvi.forEach((p, k) => p.classList.toggle("on", k === i));
          gsap.to(pv, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "expo.out", overwrite: "auto" });
        });
        on(r, "mouseleave", () => gsap.to(pv, { autoAlpha: 0, scale: 0.8, duration: 0.3, overwrite: "auto" }));
        on(r, "mousemove", (e) => { const ev = e as MouseEvent; xs(ev.clientX + 30); ys(ev.clientY - 140); });
      });
    }
    // builder steps stay readable without animation
    const steps = q(".bn-st");

    if (reduce) return () => offs.forEach((f) => f());

    // ---- smooth scroll + kinetic marquee skew
    html.style.scrollBehavior = "auto";
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const mq = el.querySelector<HTMLElement>(".bn-mq");
    if (mq) {
      const sk = gsap.quickTo(mq, "skewX", { duration: 0.4, ease: "power3" });
      lenis.on("scroll", (l: Lenis) => sk(gsap.utils.clamp(-2, 2, -l.velocity * 0.2)));
    }
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

    // ---- HERO
    const hc = q(".bn-l").flatMap((l) => sp(l));
    gsap.set(hc, { yPercent: 115, rotate: 6 });
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.3 });
    tl.to(hc, { yPercent: 0, rotate: 0, duration: 1.8, stagger: 0.05 })
      .from(".bn-hero .bn-kick, .bn-hero .bn-sub, .bn-hero .bn-cta", { y: 24, opacity: 0, duration: 1.3, stagger: 0.25 }, 1.1);
    const dirs: Record<string, { x: number; y: number }> = { left: { x: -420, y: 0 }, right: { x: 420, y: 0 }, top: { x: 0, y: -360 }, bottom: { x: 0, y: 360 } };
    q(".bn-fi").forEach((a, i) => {
      const d = dirs[a.dataset.from || "left"];
      tl.fromTo(a, { x: d.x, y: d.y, rotate: parseFloat(a.dataset.r || "0"), opacity: 0, scale: 0.6 }, { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, duration: 2.2, ease: "power3.out" }, 1.0 + i * 0.3);
    });
    tl.from(".bn-stk", { scale: 0, rotate: -90, duration: 1, ease: "back.out(1.8)" }, 1.1);
    gsap.to(".bn-fls", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".bn-hero", start: "top top", end: "bottom top", scrub: true } });

    const hero = el.querySelector<HTMLElement>(".bn-hero");
    if (hero && fine) {
      const ls = q(".bn-fl").map((l) => ({ x: gsap.quickTo(l, "x", { duration: 0.9, ease: "power3" }), y: gsap.quickTo(l, "y", { duration: 0.9, ease: "power3" }), d: parseFloat(l.dataset.depth || "0") }));
      on(hero, "mousemove", (e) => {
        const ev = e as MouseEvent;
        const r = hero.getBoundingClientRect();
        const nx = (ev.clientX - r.left) / r.width - 0.5;
        const ny = (ev.clientY - r.top) / r.height - 0.5;
        ls.forEach((l) => { l.x(-nx * l.d * 60); l.y(-ny * l.d * 60); });
      });
    }

    // ---- generic reveals
    q("[data-split]").forEach((h) => {
      const c = sp(h);
      gsap.set(c, { yPercent: 115 });
      ScrollTrigger.create({ trigger: h, start: "top 88%", once: true, onEnter: () => gsap.to(c, { yPercent: 0, duration: 1.1, stagger: 0.025, ease: "expo.out" }) });
    });
    q("[data-stagger]").forEach((g) => {
      gsap.from(Array.from(g.children), { y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: g, start: "top 85%", once: true } });
    });
    const pills = el.querySelector<HTMLElement>(".bn-pills");
    if (pills) gsap.from(Array.from(pills.children), { y: -50, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: pills, start: "top 80%", once: true } });

    const st = el.querySelector<HTMLElement>(".bn-stmt");
    if (st) {
      const c = sp(st);
      gsap.set(c, { opacity: 0.15 });
      gsap.to(c, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 45%", scrub: true } });
    }
    gsap.fromTo(".bn-cta-bg", { clipPath: "circle(0% at 50% 100%)" }, { clipPath: "circle(150% at 50% 100%)", ease: "none", scrollTrigger: { trigger: ".bn-end", start: "top 85%", end: "top 15%", scrub: true } });

    if (fine) {
      q("[data-mag]").forEach((b) => {
        const xt = gsap.quickTo(b, "x", { duration: 0.6, ease: "power3" });
        const yt = gsap.quickTo(b, "y", { duration: 0.6, ease: "power3" });
        on(b, "pointermove", (e) => { const ev = e as PointerEvent; const r = b.getBoundingClientRect(); xt((ev.clientX - r.left - r.width / 2) * 0.3); yt((ev.clientY - r.top - r.height / 2) * 0.3); });
        on(b, "pointerleave", () => { xt(0); yt(0); });
      });
      q("[data-tilt]").forEach((t) => {
        on(t, "pointermove", (e) => {
          const ev = e as PointerEvent; const r = t.getBoundingClientRect();
          gsap.to(t, { rotationY: ((ev.clientX - r.left) / r.width - 0.5) * 14, rotationX: -((ev.clientY - r.top) / r.height - 0.5) * 14, transformPerspective: 900, duration: 0.5, ease: "power3" });
        });
        on(t, "pointerleave", () => gsap.to(t, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "elastic.out(1,.5)" }));
      });
    }

    // ---- builder headline chars (visible by default; animated on desktop only)
    const bh = el.querySelector<HTMLElement>(".bld .bn-ad-t b");
    const bc = bh ? sp(bh) : [];

    // ---- pinned sections (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const pin = el.querySelector<HTMLElement>(".bn-hz-pin");
      const tr = el.querySelector<HTMLElement>(".bn-track");
      const pns = q(".bn-pn");
      if (pin && tr) {
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
        let cur = -1;
        gsap.to(tr, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (s) => {
          gsap.set(".bn-hz-bar i", { scaleX: s.progress });
          const i = Math.min(pns.length - 1, Math.round(s.progress * (pns.length - 1)));
          if (i !== cur) { cur = i; gsap.to(pin, { backgroundColor: pns[i].dataset.bg || "#120b2e", duration: 0.7, ease: "power2.out", overwrite: "auto" }); }
        } } });
      }
      const bb = el.querySelector<HTMLElement>(".bn-bpin");
      if (bb) {
        const b = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: bb, start: "top top", end: () => "+=" + window.innerHeight * 2.2, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (s) => {
          const i = Math.min(steps.length - 1, Math.floor(s.progress * steps.length));
          steps.forEach((x, k) => x.classList.toggle("on", k === i));
        } } });
        b.fromTo(".bld", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" })
          .fromTo(".bld .bn-ad-blob", { scale: 0 }, { scale: 1, duration: 1 }, "<0.3")
          .fromTo(bc, { yPercent: 120 }, { yPercent: 0, stagger: 0.04, duration: 1.2 })
          .fromTo(".bld .bn-ad-ph", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, "<")
          .fromTo(".bld .bn-ad-cta", { scale: 0, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)" })
          .fromTo(".bn-sz", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.25, duration: 0.7, ease: "back.out(2)" });
      }
      return () => { if (pin) gsap.set(pin, { clearProps: "backgroundColor" }); };
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

  return <div ref={root} className="bn-page">{children}</div>;
}