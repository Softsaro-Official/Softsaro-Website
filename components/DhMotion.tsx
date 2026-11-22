"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORD = "yourbrand";

export default function DhMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".dh");
    if (!root) return;
    const all = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const one = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: Array<() => void> = [];
    const on = (t: EventTarget, ev: string, fn: EventListener) => {
      t.addEventListener(ev, fn);
      offs.push(() => t.removeEventListener(ev, fn));
    };
    const dur = (n: number) => (reduced ? 0 : n);

    /* ---------- FAQ accordion (works with and without motion) ---------- */
    const qs = all<HTMLButtonElement>(".dh-q");
    const ans = (b: HTMLElement) => b.nextElementSibling as HTMLElement;
    const setOpen = (b: HTMLElement, open: boolean) => {
      b.setAttribute("aria-expanded", String(open));
      gsap.to(ans(b), { height: open ? "auto" : 0, duration: dur(open ? 0.7 : 0.45), ease: "power3.out", overwrite: "auto" });
    };
    qs.forEach((b, i) => {
      b.setAttribute("aria-expanded", String(i === 0));
      gsap.set(ans(b), { height: i === 0 ? "auto" : 0 });
      on(b, "click", () => {
        const open = b.getAttribute("aria-expanded") === "true";
        qs.forEach((o) => { if (o !== b && o.getAttribute("aria-expanded") === "true") setOpen(o, false); });
        setOpen(b, !open);
      });
    });

    /* ---------- expanding service panels ---------- */
    const panels = all<HTMLElement>(".dh-panel");
    let cur = 0;
    const activate = (i: number) => {
      if (i === cur) return;
      cur = i;
      panels.forEach((p, k) => {
        const isOn = k === i;
        p.classList.toggle("is-on", isOn);
        p.setAttribute("aria-expanded", String(isOn));
        gsap.to(p, { flexGrow: isOn ? 4.2 : 1, duration: dur(0.9), ease: "expo.out", overwrite: "auto" });
      });
    };
    panels.forEach((p, k) => {
      gsap.set(p, { flexGrow: k === 0 ? 4.2 : 1 });
      p.setAttribute("aria-expanded", String(k === 0));
      if (fine) on(p, "pointerenter", () => activate(k));
      on(p, "click", () => activate(k));
      on(p, "focus", () => activate(k));
      on(p, "keydown", (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "Enter" || ke.key === " ") { ke.preventDefault(); activate(k); }
      });
    });

    /* ---------- sector network: caption + highlighted line ---------- */
    const nodes = all<HTMLElement>(".dh-node");
    const lines = all<SVGLineElement>(".dh-net-lines line");
    const cap = one(".dh-net-cap");
    const capDefault = cap ? cap.textContent || "" : "";
    const swapCap = (txt: string) => {
      if (!cap) return;
      cap.textContent = txt;
      gsap.fromTo(cap, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: dur(0.45), ease: "power3.out" });
    };
    nodes.forEach((n, i) => {
      const show = () => { lines.forEach((l, k) => l.classList.toggle("on", k === i)); nodes.forEach((o) => o.classList.toggle("on", o === n)); swapCap(n.dataset.d || ""); };
      const hide = () => { lines.forEach((l) => l.classList.remove("on")); n.classList.remove("on"); swapCap(capDefault); };
      on(n, "pointerenter", show); on(n, "focus", show); on(n, "pointerleave", hide); on(n, "blur", hide);
    });

    if (reduced) {
      all<SVGSVGElement>("svg").forEach((s) => s.pauseAnimations && s.pauseAnimations());
      return () => offs.forEach((f) => f());
    }

    /* ---------- smooth scroll (same approach as the other service pages) ---------- */
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains("menu-is-open")) lenis.stop(); else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    /* ---------- HERO sequence ---------- */
    const h1 = one(".dh-h1");
    const words = all(".dh-h1 .dh-w");
    const copyIn = all(".dh-hero-copy [data-in]").filter((e) => e !== h1);
    const photo = one(".dh-photo"), photoImg = one(".dh-photo img");
    const browser = one(".dh-browser"), rack = one(".dh-rack");
    const chips = all(".dh-chip");
    const typed = one(".dh-typed"), ext = one(".dh-ext"), extIn = one(".dh-ext-in");
    const loadBar = one(".dh-load i"), live = one(".dh-live"), path = one(".dh-path");
    const units = all(".dh-unit"), leds = all(".dh-led");
    let ready = false;

    if (typed) typed.textContent = "";
    if (ext) gsap.set(ext, { autoAlpha: 0 });
    gsap.set([live, path, ...units].filter(Boolean) as Element[], { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (h1) tl.set(h1, { autoAlpha: 1 }, 0);
    if (photo) tl.set(photo, { autoAlpha: 1 }, 0);
    if (words.length) tl.fromTo(words, { yPercent: 120, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.06, transformOrigin: "0% 100%" }, 0.1);
    if (copyIn.length) tl.fromTo(copyIn, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 0.5);
    if (photo) tl.fromTo(photo, { clipPath: "inset(100% 0% 0% 0% round 36px)" }, { clipPath: "inset(0% 0% 0% 0% round 36px)", duration: 1.5, ease: "expo.inOut" }, 0.2);
    if (photoImg) tl.fromTo(photoImg, { scale: 1.35 }, { scale: 1.05, duration: 2.2 }, 0.2);
    if (browser) tl.fromTo(browser, { y: 50, scale: 0.92, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1.1, ease: "back.out(1.4)" }, 0.9);
    if (rack) tl.fromTo(rack, { x: 70, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.1 }, 1.05);
    if (units.length) tl.fromTo(units, { autoAlpha: 0, scaleX: 0, transformOrigin: "0% 50%" }, { autoAlpha: 1, scaleX: 1, duration: 0.7, stagger: 0.09 }, 1.2);
    if (typed) {
      const o = { n: 0 };
      tl.to(o, { n: WORD.length, duration: 0.9, ease: "none", onUpdate: () => { typed.textContent = WORD.slice(0, Math.round(o.n)); } }, 1.35);
    }
    if (ext) tl.to(ext, { autoAlpha: 1, duration: 0.5 }, 2.2);
    if (loadBar) tl.fromTo(loadBar, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 1.8);
    if (path) tl.to(path, { autoAlpha: 1, duration: 0.8 }, 1.6);
    if (live) tl.fromTo(live, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(2.4)" }, 3.1);
    if (chips.length) tl.fromTo(chips, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: "back.out(2.2)" }, 1.9);
    tl.call(() => {
      ready = true;
      chips.forEach((c, i) => gsap.to(c, { y: i % 2 ? 10 : -10, duration: gsap.utils.random(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1 }));
      leds.forEach((l) => gsap.to(l, { opacity: 0.2, duration: gsap.utils.random(0.35, 0.9), ease: "steps(1)", yoyo: true, repeat: -1, repeatDelay: gsap.utils.random(0.2, 1.2) }));
      if (extIn) {
        const r = gsap.timeline({ repeat: -1 });
        for (let i = 1; i <= 4; i++) r.to(extIn, { yPercent: -20 * i, duration: 0.7, ease: "expo.inOut" }, i === 1 ? "+=1.4" : "+=1.6");
        r.set(extIn, { yPercent: 0 }, "+=1.6");
      }
    }, [], 2.6);

    /* hero pointer parallax (mouse only, after the entrance) */
    const hero = one(".dh-hero");
    if (fine && hero) {
      const layers = ([[photo, -14], [browser, 18], [rack, 26]] as Array<[HTMLElement | null, number]>).filter((l) => l[0]) as Array<[HTMLElement, number]>;
      const qt = layers.map(([el]) => ({ x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }) }));
      on(hero, "pointermove", (e) => {
        if (!ready) return;
        const me = e as PointerEvent;
        const px = me.clientX / innerWidth - 0.5, py = me.clientY / innerHeight - 0.5;
        layers.forEach(([, depth], i) => { qt[i].x(px * depth); qt[i].y(py * depth); });
      });
    }

    /* ---------- scroll: headings, fades, image reveals, parallax ---------- */
    all(".dh-h2").forEach((h) => {
      const ws = Array.from(h.querySelectorAll<HTMLElement>(".dh-w"));
      gsap.set(ws, { yPercent: 118 });
      ScrollTrigger.create({ trigger: h, start: "top 88%", once: true, onEnter: () => gsap.to(ws, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.05 }) });
    });
    all("[data-fade]").forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 32 });
      const delay = (Number((el as HTMLElement).dataset.i) || 0) * 0.1;
      ScrollTrigger.create({ trigger: el, start: "top 91%", once: true, onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, delay, ease: "expo.out" }) });
    });
    all("[data-clip]").forEach((f) => {
      const img = f.querySelector("img");
      gsap.set(f, { clipPath: "inset(100% 0% 0% 0% round 28px)" });
      ScrollTrigger.create({
        trigger: f, start: "top 86%", once: true,
        onEnter: () => {
          gsap.to(f, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "expo.inOut" });
          if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1.08, duration: 2, ease: "expo.out" });
        },
      });
    });
    all("[data-par]").forEach((img) => {
      gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ---------- marquee (speeds up with scroll velocity) ---------- */
    const mt = one(".dh-marq-t");
    if (mt) {
      const loop = gsap.to(mt, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: ".dh-marq", start: "top bottom", end: "bottom top",
        onUpdate: (self) => {
          if (Math.abs(self.getVelocity()) < 120) return;
          const k = 1 + Math.min(5, Math.abs(self.getVelocity()) / 400);
          gsap.killTweensOf(loop, "timeScale");
          gsap.to(loop, { timeScale: k * (self.direction > 0 ? 1 : -1), duration: 0.3, ease: "power2.out", onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.4, ease: "power2.out" }); } });
        },
      });
    }

    /* ---------- pillars: icon draws, line draws ---------- */
    all(".dh-pillar").forEach((p) => {
      const strokes = Array.from(p.querySelectorAll<SVGGeometryElement>(".dh-pi path, .dh-pi circle"));
      const line = p.querySelector<HTMLElement>(".dh-pline");
      gsap.set(strokes, { strokeDashoffset: 1 });
      if (line) gsap.set(line, { scaleX: 0 });
      gsap.set(p, { autoAlpha: 0, y: 30 });
      ScrollTrigger.create({
        trigger: p, start: "top 90%", once: true,
        onEnter: () => {
          const t = gsap.timeline({ defaults: { ease: "expo.out" } });
          t.to(p, { autoAlpha: 1, y: 0, duration: 1 }, 0).to(strokes, { strokeDashoffset: 0, duration: 1.4, stagger: 0.12 }, 0.2);
          if (line) t.to(line, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0);
        },
      });
    });

    /* ---------- service panels entrance ---------- */
    const pw = one(".dh-panels");
    if (pw) {
      gsap.set(panels, { autoAlpha: 0, yPercent: 8 });
      ScrollTrigger.create({ trigger: pw, start: "top 85%", once: true, onEnter: () => gsap.to(panels, { autoAlpha: 1, yPercent: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" }) });
    }

    /* ---------- VPS diagram, scrubbed by scroll ---------- */
    const vps = one(".dh-vps-fig");
    if (vps) {
      const sh = all(".dh-sh"), sl = all(".dh-slice"), arrow = one(".dh-arrow"), labels = all(".dh-vl, .dh-vc");
      const t = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: vps, start: "top 78%", end: "bottom 42%", scrub: 0.6 } });
      t.from(labels, { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.6 })
        .from(sh, { autoAlpha: 0, scale: 0.4, stagger: 0.08, duration: 0.9 }, 0.2);
      if (arrow) t.fromTo(arrow, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, ">-0.1");
      t.from(sl, { autoAlpha: 0, scaleY: 0, stagger: 0.25, duration: 0.9 }, ">-0.2");
    }

    /* ---------- sector network: lines draw, nodes pop ---------- */
    const net = one(".dh-net");
    if (net) {
      const core = one(".dh-core");
      gsap.set(lines, { strokeDashoffset: 1 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.7 });
      if (core) gsap.set(core, { autoAlpha: 0, scale: 0.6 });
      ScrollTrigger.create({
        trigger: net, start: "top 78%", once: true,
        onEnter: () => {
          const t = gsap.timeline({ defaults: { ease: "expo.out" } });
          if (core) t.to(core, { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.6)" }, 0);
          t.to(lines, { strokeDashoffset: 0, duration: 1.4, stagger: 0.08 }, 0.2).to(nodes, { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: "back.out(1.8)" }, 0.5);
        },
      });
    }

    /* ---------- journey: rail fills, packet travels, steps light up ---------- */
    const track = one(".dh-track");
    if (track) {
      const fill = one(".dh-rail-fill"), packet = one(".dh-packet"), liveB = one(".dh-live-b");
      const steps = all(".dh-step");
      let H = 1;
      let ys: number[] = [];
      const measure = () => {
        const tr = track.getBoundingClientRect();
        H = tr.height;
        ys = steps.map((s) => { const d = (s.querySelector(".dh-dot") as HTMLElement).getBoundingClientRect(); return d.top + d.height / 2 - tr.top; });
      };
      measure();
      if (fill) gsap.set(fill, { scaleY: 0 });
      if (packet) gsap.set(packet, { y: 0 });
      ScrollTrigger.create({
        trigger: track, start: "top 62%", end: "bottom 62%",
        onRefresh: measure,
        onUpdate: (self) => {
          const y = self.progress * H;
          if (fill) gsap.set(fill, { scaleY: self.progress });
          if (packet) gsap.set(packet, { y });
          steps.forEach((s, i) => s.classList.toggle("on", y >= ys[i] - 6));
          if (liveB) liveB.classList.toggle("on", self.progress > 0.97);
        },
      });
    }

    /* ---------- count-up ---------- */
    const cnt = one(".dh-count");
    if (cnt) {
      const to = Number(cnt.dataset.to || 0);
      const o = { n: 0 };
      cnt.textContent = "0";
      ScrollTrigger.create({ trigger: cnt, start: "top 88%", once: true, onEnter: () => gsap.to(o, { n: to, duration: 1.6, ease: "power3.out", onUpdate: () => { cnt.textContent = String(Math.round(o.n)); } }) });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      offs.forEach((f) => f());
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}