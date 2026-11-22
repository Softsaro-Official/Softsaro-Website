// @ts-nocheck
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/** Masked word split that keeps inline wrappers (em, svg) intact. */
function splitWords(el) {
  const orig = el.innerHTML;
  const words = [];
  const mk = (node) => {
    const w = document.createElement("span");
    w.className = "tx-w";
    const i = document.createElement("span");
    i.className = "tx-i";
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
      else if (n.tagName && n.tagName.toLowerCase() === "svg") out.appendChild(n.cloneNode(true));
      else { const c = n.cloneNode(false); walk(n, c); out.appendChild(c); }
    });
  };
  const frag = document.createDocumentFragment();
  walk(el, frag);
  el.textContent = "";
  el.appendChild(frag);
  return { words, restore: () => { el.innerHTML = orig; } };
}

export default function TxMotion({ children }) {
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
      const revealH = (el, start) => { const w = words(el); gsap.to(w, { yPercent: 0, duration: 1.25, stagger: 0.05, ease: "expo.out", scrollTrigger: once(el, start) }); };

      /* scroll progress, appended to body so page transforms cannot break position:fixed */
      const bar = document.createElement("div");
      bar.className = "tx-progress";
      document.body.appendChild(bar);
      offs.push(() => bar.remove());
      gsap.set(bar, { scaleX: 0, transformOrigin: "0 50%" });
      gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      /* marquees + badge: speed up with scroll velocity */
      const mqs = q("[data-mq]").map((el) => {
        const dir = Number(el.dataset.mq) || 1;
        return gsap.fromTo(el, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 45, ease: "none", repeat: -1 });
      });
      const badgeSvg = one(".tx-badge svg");
      const spinTw = badgeSvg ? gsap.to(badgeSvg, { rotation: 360, duration: 26, ease: "none", repeat: -1 }) : null;
      let boost = 1;
      const spin = () => { boost += (1 - boost) * 0.06; mqs.forEach((m) => m.timeScale(boost)); if (spinTw) spinTw.timeScale(boost); };
      gsap.ticker.add(spin);
      offs.push(() => gsap.ticker.remove(spin));
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: (st) => { boost = Math.max(boost, 1 + Math.min(Math.abs(st.getVelocity()) / 450, 5)); } });

      /* ===== HERO ===== */
      const hero = one(".tx-hero");
      q(".tx-h1 .tx-l").forEach((l) => splits.push(splitWords(l)));
      const hw = q(".tx-h1 .tx-i");
      gsap.set(hw, { yPercent: 115, rotate: 4 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.5 });
      tl.to(hw, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.09 }, 0)
        .from(".tx-hero .lab", { x: -30, opacity: 0, duration: 1.1 }, 0.1)
        .fromTo(".tx-und path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 1.5)
        .from(".tx-hero-p", { y: 28, opacity: 0, duration: 1.2 }, 1.2)
        .from(".tx-c", { scale: 0.55, opacity: 0, y: 90, rotate: (i) => (i % 2 ? 8 : -8), duration: 1.7, stagger: 0.13 }, 0.4)
        .from(".tx-badge", { scale: 0, opacity: 0, duration: 1.4 }, 1.5)
        .from(".tx-ribbon", { y: 70, opacity: 0, duration: 1.4 }, 1.2);
      q(".tx-c .tx-pt").forEach((pt, i) => gsap.to(pt, { yPercent: i % 2 ? 4 : -4, duration: 4 + i * 0.7, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 }));
      gsap.to(".tx-collage", { yPercent: -8, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".tx-hero-bg", { yPercent: 18, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      if (fine) {
        let live = false;
        tl.call(() => { live = true; }, null, 2.4);
        const layers = q(".tx-c, .tx-badge").map((el) => ({ x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }), d: Number(el.dataset.depth || 0) }));
        on(hero, "pointermove", (e) => {
          if (!live) return;
          const r = hero.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { l.x(px * l.d); l.y(py * l.d); });
        });
        on(hero, "pointerleave", () => layers.forEach((l) => { l.x(0); l.y(0); }));
      }

      /* ===== LEADERSHIP ===== */
      q(".tx-lead .tx-h2").forEach((h) => revealH(h));
      gsap.from(".tx-lead .lab", { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(".tx-lead", "top 70%") });
      gsap.from(".tx-lead-p", { y: 26, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: once(".tx-lead-p", "top 90%") });
      q(".tx-li").forEach((li) => {
        const lp = li.querySelector(".tx-lp");
        const fig = lp.querySelector(".tx-fig");
        const ini = lp.querySelector(".tx-ini");
        const orb = lp.querySelector(".tx-orb");
        const meta = Array.from(li.querySelectorAll(".tx-lmeta > *"));
        gsap.set(lp, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.timeline({ scrollTrigger: once(li, "top 82%") })
          .to(lp, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", onComplete: () => gsap.set(lp, { clearProps: "clipPath" }) }, 0)
          .from(fig, { yPercent: 35, duration: 1.7, ease: "expo.out" }, 0.3)
          .from(ini, { opacity: 0, scale: 0.9, duration: 1.4, ease: "expo.out" }, 0.4)
          .from(orb, { scale: 0, duration: 1.2, ease: "back.out(1.6)" }, 0.8)
          .from(meta, { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity" }, 0.7);
        if (ini) gsap.fromTo(ini, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: li, start: "top bottom", end: "bottom top", scrub: true } });
        if (fine) {
          const fx = gsap.quickTo(fig, "x", { duration: 0.9, ease: "power3.out" });
          const fy = gsap.quickTo(fig, "y", { duration: 0.9, ease: "power3.out" });
          const ix = gsap.quickTo(ini, "x", { duration: 1.1, ease: "power3.out" });
          on(lp, "pointermove", (e) => { const r = lp.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; fx(px * 24); fy(py * 14); ix(-px * 30); });
          on(lp, "pointerleave", () => { fx(0); fy(0); ix(0); });
        }
      });
      mm.add("(min-width: 1001px)", () => {
        gsap.to(".tx-lcol.c2", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".tx-lgrid", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.to(".tx-lcol.c1", { yPercent: 3, ease: "none", scrollTrigger: { trigger: ".tx-lgrid", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.to(".tx-lead-in", { scale: 0.95, opacity: 0.55, ease: "none", scrollTrigger: { trigger: ".tx-wide", start: "top bottom", end: "top 25%", scrub: true } });
      });

      /* ===== WIDER TEAM ===== */
      revealH(one(".tx-wide .tx-h2"));
      gsap.from(".tx-wide .lab, .tx-wide-p", { y: 24, opacity: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", scrollTrigger: once(".tx-wide", "top 70%") });
      q("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count), o = { v: 0 };
        el.textContent = "0";
        offs.push(() => { el.textContent = String(end); });
        gsap.to(o, { v: end, duration: 2, ease: "power2.out", scrollTrigger: once(el, "top 88%"), onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
      });
      const rows = q(".tx-roster li");
      gsap.set(rows, { opacity: 0, y: 40 });
      ScrollTrigger.batch(rows, { start: "top 93%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: "expo.out", clearProps: "transform,opacity" }) });
      mm.add("(min-width: 901px) and (hover: hover)", () => {
        const pv = one(".tx-pv"), list = one(".tx-roster");
        if (!pv || !list) return;
        const items = q(".tx-pvi");
        gsap.set(pv, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
        gsap.set(items, { autoAlpha: 0 });
        const qx = gsap.quickTo(pv, "x", { duration: 0.6, ease: "power3.out" });
        const qy = gsap.quickTo(pv, "y", { duration: 0.6, ease: "power3.out" });
        on(list, "pointermove", (e) => { qx(e.clientX - 250); qy(e.clientY); });
        rows.forEach((r, i) => on(r, "mouseenter", safe(() => {
          items.forEach((it, k) => gsap.to(it, { autoAlpha: k === i ? 1 : 0, duration: 0.35, overwrite: "auto" }));
          gsap.to(pv, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
          gsap.to(rows.filter((o) => o !== r), { opacity: 0.35, duration: 0.35, overwrite: "auto" });
          gsap.to(r, { opacity: 1, duration: 0.35, overwrite: "auto" });
        })));
        on(list, "mouseleave", safe(() => { gsap.to(pv, { autoAlpha: 0, scale: 0.6, duration: 0.4, overwrite: "auto" }); gsap.to(rows, { opacity: 1, duration: 0.35, overwrite: "auto" }); }));
      });

      /* ===== CTA ===== */
      const cta = one(".tx-cta");
      if (cta) {
        const d1 = gsap.to(".tx-aur.a1", { x: "10vw", y: "5vw", duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1 });
        const d2 = gsap.to(".tx-aur.a2", { x: "-9vw", y: "-4vw", duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
        ScrollTrigger.create({ trigger: cta, start: "top bottom", end: "bottom top", onToggle: (s) => { s.isActive ? (d1.play(), d2.play()) : (d1.pause(), d2.pause()); } });
        gsap.fromTo(cta, { clipPath: "inset(0% 4% 0% 4% round 56px 56px 0px 0px)" }, { clipPath: "inset(0% 0% 0% 0% round 56px 56px 0px 0px)", ease: "none", scrollTrigger: { trigger: cta, start: "top 98%", end: "top 50%", scrub: true } });
        gsap.from(".tx-cta .lab", { x: -30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: once(cta, "top 75%") });
        revealH(one(".tx-cta-h"), "top 85%");
        const btn = one(".tx-orb-btn");
        if (btn) {
          gsap.from(btn, { scale: 0.5, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.3, scrollTrigger: once(cta, "top 60%"), clearProps: "transform,opacity" });
          if (fine) {
            const xt = gsap.quickTo(btn, "x", { duration: 0.7, ease: "elastic.out(1,.5)" });
            const yt = gsap.quickTo(btn, "y", { duration: 0.7, ease: "elastic.out(1,.5)" });
            const ar = btn.querySelector("svg");
            on(btn, "pointermove", (e) => { const r = btn.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.35); yt((e.clientY - r.top - r.height / 2) * 0.35); });
            on(btn, "pointerenter", safe(() => ar && gsap.to(ar, { rotate: 45, duration: 0.5, ease: "power3.out" })));
            on(btn, "pointerleave", safe(() => { xt(0); yt(0); if (ar) gsap.to(ar, { rotate: 0, duration: 0.6, ease: "power3.out" }); }));
          }
        }
        if (fine) on(cta, "pointermove", (e) => { const r = cta.getBoundingClientRect(); cta.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%"); cta.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%"); });
      }

      /* ===== FOOTER ===== */
      const giant = one(".tx-giant");
      if (giant) {
        gsap.fromTo(".tx-g-f", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: giant, start: "top 98%", end: "bottom 62%", scrub: true } });
        gsap.fromTo(".tx-giant > span", { xPercent: -4 }, { xPercent: 4, ease: "none", scrollTrigger: { trigger: giant, start: "top bottom", end: "bottom top", scrub: true } });
      }
      gsap.from(".tx-fcol", { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: once(".tx-foot-top", "top 88%") });
      const top = one(".tx-top");
      if (top) {
        on(top, "click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
        if (fine) {
          const xt = gsap.quickTo(top, "x", { duration: 0.7, ease: "elastic.out(1,.5)" });
          const yt = gsap.quickTo(top, "y", { duration: 0.7, ease: "elastic.out(1,.5)" });
          on(top, "pointermove", (e) => { const r = top.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.4); yt((e.clientY - r.top - r.height / 2) * 0.4); });
          on(top, "pointerleave", () => { xt(0); yt(0); });
        }
      }

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => offs.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}