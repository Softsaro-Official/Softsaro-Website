"use client";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function split(el: HTMLElement, mode: "chars" | "words"): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walk = (n: Node) => {
    Array.from(n.childNodes).forEach((c) => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        (c.textContent ?? "").split(/(\s+)/).forEach((w) => {
          if (!w.trim()) { f.append(w); return; }
          const sw = document.createElement("span");
          sw.className = "ap-sw";
          const mk = (t: string) => { const s = document.createElement("span"); s.className = "ap-si"; s.textContent = t; sw.append(s); out.push(s); };
          if (mode === "chars") Array.from(w).forEach(mk); else mk(w);
          f.append(sw);
        });
        c.replaceWith(f);
      } else if (c.nodeType === 1 && (c as HTMLElement).tagName !== "BR" && !(c as HTMLElement).classList.contains("ap-sw")) walk(c);
    });
  };
  walk(el);
  return out;
}

export default function MobileAppMotion() {
  /* interactions that must work even with reduced motion: platform toggle, FAQ, accordion */
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ap");
    if (!root) return;
    const hero = root.querySelector<HTMLElement>(".ap-hero");
    const offs: Array<() => void> = [];
    const on = (t: EventTarget, e: string, f: (ev: any) => void) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
    root.querySelectorAll<HTMLButtonElement>(".ap-os button").forEach((b) => on(b, "click", () => {
      hero?.setAttribute("data-os", b.dataset.os || "android");
      root.querySelectorAll(".ap-os button").forEach((x) => x.classList.toggle("on", x === b));
    }));
    root.querySelectorAll<HTMLElement>(".ap-q").forEach((q) => on(q.querySelector("button")!, "click", () => {
      const open = q.classList.toggle("open");
      q.querySelector("button")?.setAttribute("aria-expanded", String(open));
    }));
    const acs = Array.from(root.querySelectorAll<HTMLElement>(".ap-ac"));
    const act = (a: HTMLElement) => acs.forEach((x) => x.classList.toggle("on", x === a));
    acs.forEach((a) => { on(a, "click", () => act(a)); on(a, "focusin", () => act(a)); if (window.matchMedia("(hover:hover)").matches) on(a, "pointerenter", () => act(a)); });
    return () => offs.forEach((f) => f());
  }, []);

  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".ap");
    if (!root) return;
    const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, root);
    const one = (s: string) => root.querySelector<HTMLElement>(s);
    const mm = gsap.matchMedia();

    mm.add({ ok: "(prefers-reduced-motion: no-preference)", desk: "(min-width: 901px)", fine: "(hover:hover) and (pointer:fine)" }, (ctx) => {
      const c = ctx.conditions as unknown as { ok: boolean; desk: boolean; fine: boolean };
      if (!c.ok) return;
      const offs: Array<() => void> = [];
      const on = (t: EventTarget, e: string, f: (ev: any) => void) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
      const lenis = new Lenis({ duration: 1.15, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (c.desk) root.classList.add("ap-h");

      /* ---------- page loader: a phone fills up, then the purple curtain lifts to reveal the hero ---------- */
      const ld = one(".ap-load");
      if (ld) {
        gsap.timeline({ onComplete: () => { ld.style.display = "none"; } })
          .to(ld.querySelector(".ap-ld-ph i"), { height: "100%", duration: 0.9, ease: "power2.inOut" })
          .to(ld, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=.1");
      }

      /* ---------- 1. HERO: char rise, phones assemble, app screens wipe inside the device ---------- */
      const chars = q(".ap-h1 .ap-lt").flatMap((l) => split(l, "chars"));
      gsap.timeline({ defaults: { ease: "expo.out" }, delay: ld ? 1.55 : 0 })
        .from(one(".ap-eyebrow"), { x: -24, opacity: 0, duration: 0.8 })
        .from(chars, { yPercent: 120, rotate: 6, transformOrigin: "0% 100%", duration: 1.3, stagger: 0.022 }, "-=.5")
        .from(q(".ap-lead, .ap-os, .ap-cta > *"), { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, "-=1")
        .from(one(".ap-p.main"), { y: 160, rotate: -6, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.2)
        .from(one(".ap-p.l"), { x: 120, y: 80, rotate: -20, opacity: 0, duration: 1.5 }, 0.5)
        .from(one(".ap-p.r"), { x: -120, y: 80, rotate: 20, opacity: 0, duration: 1.5 }, 0.6)
        .from(one(".ap-p.fl"), { x: 140, y: 60, rotate: -30, opacity: 0, duration: 1.5 }, 0.8)
        .from(one(".ap-p.fr"), { x: -140, y: 60, rotate: 30, opacity: 0, duration: 1.5 }, 0.9)
        .from(q(".ap-stage .ap-toast, .ap-stage .ap-mini"), { scale: 0, y: 24, stagger: 0.3, duration: 0.8, ease: "back.out(2)" }, 1.4)
        .from(one(".ap-tag"), { opacity: 0, y: 10, duration: 0.8 }, 1.8);
      // idle float starts after the entrance has finished so the two never fight over `y`
      [[".ap-p.main", -12, 5.5], [".ap-p.l", 14, 6.5], [".ap-p.r", -16, 6], [".ap-p.fl", 10, 7], [".ap-p.fr", -12, 6.5], [".ap-stage .ap-toast, .ap-stage .ap-mini", 8, 4]].forEach(([s, y, d]) => {
        q(s as string).forEach((e, i) => gsap.to(e, { y: `+=${y}`, duration: d as number, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.6 + i * 0.4 }));
      });
      const slides = q(".ap-slides > *"), dots = q(".ap-dots i");
      let idx = 0, call: gsap.core.Tween | null = null;
      gsap.set(slides, { clipPath: (i: number) => (i === 0 ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)"), zIndex: (i: number) => (i === 0 ? 2 : 1) });
      dots.forEach((d, i) => d.classList.toggle("on", i === 0));
      const next = () => {
        const n = (idx + 1) % slides.length;
        gsap.set(slides[n], { zIndex: 5, clipPath: "inset(0 0 0 100%)" });
        gsap.to(slides[n], { clipPath: "inset(0 0 0 0%)", duration: 0.9, ease: "expo.inOut", onComplete: () => {
          slides.forEach((s, i) => gsap.set(s, { zIndex: i === n ? 2 : 1 }));
          idx = n; dots.forEach((d, i) => d.classList.toggle("on", i === n));
        } });
        call = gsap.delayedCall(3.4, next);
      };
      call = gsap.delayedCall(3, next);
      gsap.to(one(".ap-hero-copy"), { y: -60, ease: "none", scrollTrigger: { trigger: one(".ap-hero"), start: "top top", end: "bottom top", scrub: true } });
      gsap.to(one(".ap-stage"), { yPercent: -8, ease: "none", scrollTrigger: { trigger: one(".ap-hero"), start: "top top", end: "bottom top", scrub: true } });
      if (c.fine) {
        const L = q(".ap-stage .ap-layer").map((l) => ({ x: gsap.quickTo(l, "x", { duration: 1, ease: "power3" }), y: gsap.quickTo(l, "y", { duration: 1, ease: "power3" }), d: parseFloat(l.dataset.d || "0") }));
        const st = one(".ap-stage")!;
        gsap.set(st, { transformPerspective: 1100 });
        const ry = gsap.quickTo(st, "rotationY", { duration: 1.2, ease: "power3" }), rx = gsap.quickTo(st, "rotationX", { duration: 1.2, ease: "power3" });
        on(window, "pointermove", (e: PointerEvent) => {
          const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
          L.forEach((o) => { o.x(-px * o.d * 2); o.y(-py * o.d * 2); }); ry(px * 14); rx(-py * 10);
        });
      }

      /* headings */
      q(".ap-h2").forEach((h) => gsap.from(split(h, "words"), { yPercent: 115, rotate: 5, duration: 1.2, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%" } }));
      q(".ap-lab").forEach((l) => gsap.from(l, { x: -30, opacity: 0, duration: 1, scrollTrigger: { trigger: l, start: "top 92%" } }));

      /* photos: wipe-up reveal + slow background drift (every .ap-photo frame except the always-visible hero ones) */
      q(".ap-eb-img, .ap-why-img").forEach((p) => {
        gsap.fromTo(p, { clipPath: "inset(100% 0 0 0 round 26px)" }, { clipPath: "inset(0% 0 0 0 round 26px)", duration: 1.3, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: p, start: "top 88%" } });
        gsap.fromTo(p, { backgroundPositionY: "20%" }, { backgroundPositionY: "80%", ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
      });

      /* ---------- 2. WHAT WE BUILD: expanding device lanes ---------- */
      const acs = q(".ap-ac");
      acs.forEach((a) => {
        const ph = a.querySelector(".ap-ac-ph");
        const mo = new MutationObserver(() => { if (a.classList.contains("on")) gsap.fromTo(ph, { y: 90, rotate: 6 }, { y: 0, rotate: 0, duration: 1, ease: "expo.out" }); });
        mo.observe(a, { attributes: true, attributeFilter: ["class"] });
        offs.push(() => mo.disconnect());
      });
      if (c.fine) acs.forEach((a) => {
        const ph = a.querySelector<HTMLElement>(".ap-ac-ph");
        if (!ph) return;
        gsap.set(ph, { transformPerspective: 900 });
        const ry = gsap.quickTo(ph, "rotationY", { duration: 0.8, ease: "power3" }), rx = gsap.quickTo(ph, "rotationX", { duration: 0.8, ease: "power3" });
        on(a, "pointermove", (e: PointerEvent) => { const r = a.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 22); rx(-((e.clientY - r.top) / r.height - 0.5) * 14); });
        on(a, "pointerleave", () => { ry(0); rx(0); });
      });
      gsap.from(acs, { y: 90, opacity: 0, stagger: 0.12, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: one(".ap-acc"), start: "top 82%" } });

      /* ---------- 3. EXPERTISE: pinned phone changes screen as you read ---------- */
      gsap.set(one(".ap-ex-phone"), { transformPerspective: 900 });
      const eb = q(".ap-eb"), scr = q(".ap-ex-screens > *"), pg = q(".ap-ex-prog i");
      const setI = (i: number) => { scr.forEach((s, j) => s.classList.toggle("on", j <= i)); pg.forEach((p, j) => p.classList.toggle("on", j === i)); eb.forEach((b, j) => b.classList.toggle("on", j === i)); };
      setI(0);
      eb.forEach((b, i) => ScrollTrigger.create({ trigger: b, start: "top 60%", end: "bottom 60%", onToggle: (s) => { if (s.isActive) setI(i); } }));
      gsap.fromTo(one(".ap-ex-phone"), { rotationY: -14, rotationZ: -3 }, { rotationY: 14, rotationZ: 3, ease: "none", scrollTrigger: { trigger: one(".ap-ex-r"), start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(one(".ap-ex-photo"), { clipPath: "circle(0% at 50% 50%)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: one(".ap-ex-photo"), start: "top 85%" } });

      /* ---------- 4. SHOWCASE: pinned 3D phone ring ---------- */
      const show = one(".ap-show");
      if (show) gsap.fromTo(show, { clipPath: "inset(0% 5% 0% 5% round 56px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: show, start: "top 95%", end: "top 30%", scrub: true } });
      const pin = one(".ap-show-pin"), ring = one(".ap-ring");
      if (pin && ring && c.desk) {
        gsap.set(one(".ap-ringw"), { transformPerspective: 1800 });
        gsap.to(ring, { rotationY: -300, ease: "none", scrollTrigger: { trigger: pin, start: "top top", end: "+=2800", scrub: 0.8, pin: true, anticipatePin: 1 } });
        gsap.from(q(".ap-rp"), { scale: 0.6, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: pin, start: "top 70%" } });
        gsap.from(q(".ap-show-photo"), { y: 80, opacity: 0, stagger: 0.15, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: pin, start: "top 60%" } });
        if (c.fine) {
          const w = one(".ap-ringw")!;
          const rx = gsap.quickTo(w, "rotationX", { duration: 1, ease: "power3" }), ry = gsap.quickTo(w, "rotationY", { duration: 1, ease: "power3" });
          on(pin, "pointermove", (e: PointerEvent) => { ry((e.clientX / innerWidth - 0.5) * 12); rx(-(e.clientY / innerHeight - 0.5) * 8); });
        }
      } else {
        gsap.from(q(".ap-rp"), { x: 80, opacity: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: one(".ap-ring"), start: "top 85%" } });
        gsap.from(one(".ap-show-photo.a"), { y: 50, opacity: 0, duration: 1.1, scrollTrigger: { trigger: one(".ap-show-photo.a"), start: "top 88%" } });
      }

      /* ---------- 5. PROCESS: a path draws itself and a phone travels along it ---------- */
      const steps = q(".ap-pstep"), pv = root.querySelector<SVGPathElement>(".ap-pv path"), trav = one(".ap-trav"), pbox = one(".ap-pbox");
      if (pv && trav && pbox && c.desk) {
        const len = pv.getTotalLength(), W = 1200, H = 520;
        gsap.set(pv, { strokeDasharray: len, strokeDashoffset: len });
        steps.forEach((s, i) => { const pt = pv.getPointAtLength(len * (i / (steps.length - 1))); s.style.left = (pt.x / W) * 100 + "%"; s.style.top = (pt.y / H) * 100 + "%"; });
        const place = (p: number) => { const pt = pv.getPointAtLength(len * p); trav.style.left = (pt.x / W) * 100 + "%"; trav.style.top = (pt.y / H) * 100 + "%"; };
        place(0);
        ScrollTrigger.create({ trigger: pbox, start: "top 72%", end: "bottom 50%", scrub: true, onUpdate: (s) => {
          const p = s.progress; pv.style.strokeDashoffset = String(len * (1 - p)); place(p);
          steps.forEach((st, i) => st.classList.toggle("on", p >= i / (steps.length - 1) - 0.001));
        } });
      } else {
        steps.forEach((s) => gsap.from(s, { x: -40, opacity: 0, duration: 1, scrollTrigger: { trigger: s, start: "top 85%" } }));
      }

      /* ---------- 6. TECH: chips float and move away from the cursor ---------- */
      const chips = q(".ap-chip"), field = one(".ap-field");
      chips.forEach((ch, i) => gsap.to(ch.querySelector(".ap-ci"), { y: gsap.utils.random(-8, 8), rotation: gsap.utils.random(-2, 2), duration: gsap.utils.random(2.4, 4.2), ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.15 }));
      gsap.from(chips, { scale: 0, opacity: 0, stagger: 0.07, duration: 0.9, ease: "back.out(2)", scrollTrigger: { trigger: field, start: "top 80%" } });
      gsap.to(one(".ap-tech-bg"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: one(".ap-tech"), start: "top bottom", end: "bottom top", scrub: true } });
      if (c.fine) q(".ap-ci").forEach((ci) => on(ci, "pointermove", (e: PointerEvent) => { const r = ci.getBoundingClientRect(); ci.style.setProperty("--mx", e.clientX - r.left + "px"); ci.style.setProperty("--my", e.clientY - r.top + "px"); }));
      if (field && c.desk && c.fine) {
        const F = chips.map((ch) => ({ el: ch, x: gsap.quickTo(ch, "x", { duration: 0.9, ease: "power3" }), y: gsap.quickTo(ch, "y", { duration: 0.9, ease: "power3" }) }));
        on(field, "pointermove", (e: PointerEvent) => F.forEach((o) => {
          const b = o.el.getBoundingClientRect(), dx = b.left + b.width / 2 - e.clientX, dy = b.top + b.height / 2 - e.clientY, d = Math.hypot(dx, dy) || 1, R = 190;
          const push = d < R ? (1 - d / R) * 70 : 0; o.x((dx / d) * push); o.y((dy / d) * push);
        }));
        on(field, "pointerleave", () => F.forEach((o) => { o.x(0); o.y(0); }));
      }

      /* ---------- 7. WHY ---------- */
      q(".ap-count").forEach((n) => {
        const to = parseFloat(n.dataset.to || "0"), o = { v: 0 };
        n.textContent = "0";
        gsap.to(o, { v: to, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: n, start: "top 90%" }, onUpdate: () => { n.textContent = String(Math.round(o.v)); } });
        offs.push(() => { n.textContent = String(to); });
      });
      q(".ap-wy").forEach((r) => {
        gsap.from(r, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: r, start: "top 90%" } });
        gsap.fromTo(r.querySelector(".ap-wl"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: r, start: "top 90%" } });
      });
      gsap.from(q(".ap-q"), { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: one(".ap-faq-l"), start: "top 85%" } });

      /* ---------- 8. CTA ---------- */
      const cta = one(".ap-cta-sec");
      if (cta) gsap.fromTo(cta, { clipPath: "inset(0% 5% 0% 5% round 56px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: cta, start: "top 95%", end: "top 35%", scrub: true } });
      gsap.fromTo(one(".ap-cta-ph"), { yPercent: 28, rotate: 8 }, { yPercent: -6, rotate: -4, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q(".ap-cta-sec .ap-sub, .ap-cta-sec .ap-cta2 > *"), { y: 30, opacity: 0, stagger: 0.12, duration: 1, scrollTrigger: { trigger: cta, start: "top 55%" } });
      gsap.from(q(".ap-cta-sec > .ap-toast"), { scale: 0, stagger: 0.25, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: cta, start: "top 40%" } });
      if (c.fine) {
        q(".ap-btn").forEach((b) => {
          const x = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1,.5)" }), y = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
          on(b, "pointermove", (e: PointerEvent) => { const r = b.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.3); y((e.clientY - (r.top + r.height / 2)) * 0.35); });
          on(b, "pointerleave", () => { x(0); y(0); });
        });
      }
      ScrollTrigger.refresh();

      return () => {
        offs.forEach((f) => f());
        call?.kill();
        gsap.ticker.remove(tick);
        lenis.destroy();
        root.classList.remove("ap-h");
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}