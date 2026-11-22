"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DmxMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".dmx-page");
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
    const pe = (e: Event) => e as PointerEvent;
    const dur = (n: number) => (reduced ? 0 : n);
    const enter = (el: Element, start: string, fn: () => void) => ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });

    /* ===== always on: FAQ accordion + testimonial drag/progress ===== */
    const fqs = all<HTMLButtonElement>(".dmx-fq");
    const fa = (b: HTMLElement) => b.nextElementSibling as HTMLElement;
    const setOpen = (b: HTMLElement, open: boolean) => {
      b.setAttribute("aria-expanded", String(open));
      b.parentElement && b.parentElement.classList.toggle("open", open);
      gsap.to(fa(b), { height: open ? "auto" : 0, duration: dur(open ? 0.7 : 0.45), ease: "power3.out", overwrite: "auto" });
    };
    fqs.forEach((b, i) => {
      b.setAttribute("aria-expanded", String(i === 0));
      b.parentElement && b.parentElement.classList.toggle("open", i === 0);
      gsap.set(fa(b), { height: i === 0 ? "auto" : 0 });
      on(b, "click", () => {
        const open = b.getAttribute("aria-expanded") === "true";
        fqs.forEach((o) => { if (o !== b && o.getAttribute("aria-expanded") === "true") setOpen(o, false); });
        setOpen(b, !open);
      });
    });

    const tq = one(".dmx-tq"), bar = one(".dmx-tq-prog i");
    if (tq) {
      const upd = () => {
        if (!bar) return;
        const mx = tq.scrollWidth - tq.clientWidth;
        bar.style.transform = `scaleX(${0.12 + 0.88 * (mx > 0 ? tq.scrollLeft / mx : 0)})`;
      };
      on(tq, "scroll", upd);
      upd();
      if (fine) {
        let down = false, sx = 0, sl = 0;
        on(tq, "pointerdown", (e) => { down = true; sx = pe(e).clientX; sl = tq.scrollLeft; tq.style.scrollSnapType = "none"; tq.classList.add("drag"); });
        on(window, "pointermove", (e) => { if (down) tq.scrollLeft = sl - (pe(e).clientX - sx); });
        on(window, "pointerup", () => { if (down) { down = false; tq.style.scrollSnapType = ""; tq.classList.remove("drag"); } });
      }
    }

    if (reduced) {
      all<SVGSVGElement>("svg").forEach((s) => s.pauseAnimations && s.pauseAnimations());
      return () => offs.forEach((f) => f());
    }

    /* ===== smooth scroll ===== */
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains("menu-is-open")) lenis.stop(); else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    /* ===== pointer effects (mouse only; touch devices keep the plain layout) ===== */
    if (fine) {
      all("[data-spot]").forEach((el) => on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${pe(e).clientX - r.left}px`);
        el.style.setProperty("--my", `${pe(e).clientY - r.top}px`);
      }));
      all("[data-tilt]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          rx(-((pe(e).clientY - r.top) / r.height - 0.5) * 9);
          ry(((pe(e).clientX - r.left) / r.width - 0.5) * 11);
        });
        on(el, "pointerleave", () => { rx(0); ry(0); });
      });
      all("[data-mag]").forEach((el) => {
        const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,.5)" });
        const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          qx((pe(e).clientX - r.left - r.width / 2) * 0.28);
          qy((pe(e).clientY - r.top - r.height / 2) * 0.34);
        });
        on(el, "pointerleave", () => { qx(0); qy(0); });
      });
    }

    /* ===== HERO: cinematic entrance, split text, parallax, spotlight ===== */
    const hero = one(".dmx-hero"), photo = one(".dmx-hero-photo"), spot = one(".dmx-spot");
    const h1 = one(".dmx-h1");
    const chars = all(".dmx-h1 .dmx-c");
    const smalls = all(".dmx-hero-copy [data-h]").filter((e) => e !== h1);
    const stackEls = all(".dmx-stack [data-h]");
    const stats = one(".dmx-stats");
    let ready = false;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (photo) tl.fromTo(photo, { scale: 1.3 }, { scale: 1.06, duration: 2.6 }, 0);
    if (h1) tl.set(h1, { autoAlpha: 1 }, 0);
    if (chars.length) tl.fromTo(chars, { yPercent: 115, rotateX: -70, transformOrigin: "50% 100%" }, { yPercent: 0, rotateX: 0, duration: 1.3, stagger: 0.016 }, 0.3);
    if (smalls.length) tl.fromTo(smalls, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12 }, 0.2);
    if (stackEls.length) tl.fromTo(stackEls, { y: 60, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 1.3, stagger: 0.12 }, 0.7);
    if (stats) tl.fromTo(stats, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 1.2);
    tl.call(() => {
      ready = true;
      all(".dmx-chip").forEach((c, i) => gsap.to(c, { y: i % 2 ? 9 : -9, duration: gsap.utils.random(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1 }));
    }, [], 2);

    if (hero && photo) gsap.to(photo, { yPercent: 14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    if (fine && hero) {
      const layers = ([[one(".dmx-st-main"), -12], [one(".dmx-st-sub"), 22], [one(".dmx-st-card"), 30]] as Array<[HTMLElement | null, number]>).filter((l) => l[0]) as Array<[HTMLElement, number]>;
      const qt = layers.map(([el]) => ({ x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }) }));
      const sx = spot ? gsap.quickTo(spot, "x", { duration: 0.8, ease: "power3.out" }) : null;
      const sy = spot ? gsap.quickTo(spot, "y", { duration: 0.8, ease: "power3.out" }) : null;
      on(hero, "pointermove", (e) => {
        const m = pe(e);
        if (sx && sy) { sx(m.clientX); sy(m.clientY); }
        if (!ready) return;
        const px = m.clientX / innerWidth - 0.5, py = m.clientY / innerHeight - 0.5;
        layers.forEach(([, d], i) => { qt[i].x(px * d); qt[i].y(py * d); });
      });
    }

    /* ===== counters (real facts only) ===== */
    all<HTMLElement>(".dmx-count").forEach((c) => {
      const to = Number(c.dataset.to || 0), o = { n: 0 };
      c.textContent = "0";
      enter(c, "top 95%", () => gsap.to(o, { n: to, duration: 1.8, ease: "power3.out", delay: 0.6, onUpdate: () => { c.textContent = String(Math.round(o.n)); } }));
    });

    /* ===== headings: words rise from masks ===== */
    all(".dmx-h2").forEach((h) => {
      const ws = Array.from(h.querySelectorAll<HTMLElement>(".dmx-w"));
      gsap.set(ws, { yPercent: 118 });
      enter(h, "top 88%", () => gsap.to(ws, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.05 }));
    });
    all("[data-up]").forEach((el) => {
      const d = (Number(getComputedStyle(el).getPropertyValue("--i")) || 0) * 0.08;
      gsap.set(el, { autoAlpha: 0, y: 32 });
      enter(el, "top 92%", () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, delay: d, ease: "expo.out" }));
    });

    /* ===== images: clip reveal, scale, parallax ===== */
    all("[data-clip]").forEach((f) => {
      const img = f.querySelector("img");
      gsap.set(f, { clipPath: "inset(100% 0% 0% 0% round 26px)" });
      enter(f, "top 86%", () => {
        gsap.to(f, { clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.5, ease: "expo.inOut" });
        if (img) gsap.fromTo(img, { scale: 1.28 }, { scale: 1.06, duration: 2, ease: "expo.out" });
      });
    });
    all("[data-par]").forEach((img) => {
      gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ===== glance + why: paragraph lights up with scroll, takeaways pop ===== */
    const sw = all(".dmx-sw");
    if (sw.length) gsap.fromTo(sw, { opacity: 0.2 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ".dmx-scrub", start: "top 80%", end: "bottom 55%", scrub: true } });
    const tk = all(".dmx-take li");
    if (tk.length) {
      gsap.set(tk, { xPercent: 8, autoAlpha: 0 });
      enter(tk[0], "top 92%", () => gsap.to(tk, { xPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "expo.out" }));
    }
    const chk = all(".dmx-checks li");
    if (chk.length) {
      gsap.set(chk, { scale: 0.85, autoAlpha: 0 });
      enter(chk[0], "top 92%", () => gsap.to(chk, { scale: 1, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "back.out(1.6)" }));
    }

    /* ===== services: cards flip up in 3D ===== */
    const sv = all(".dmx-svc");
    if (sv.length) {
      gsap.set(sv, { y: 80, autoAlpha: 0, rotationX: -28, transformPerspective: 900, transformOrigin: "50% 100%" });
      enter(sv[0], "top 88%", () => gsap.to(sv, { y: 0, autoAlpha: 1, rotationX: 0, duration: 1.3, ease: "expo.out", stagger: { each: 0.08, from: "start" } }));
    }

    /* ===== process: rail fills with scroll, steps light up ===== */
    const tlEl = one(".dmx-tl"), fill = one(".dmx-tl-fill"), steps = all(".dmx-tl-step");
    if (tlEl && fill && steps.length) {
      gsap.set(fill, { scaleX: 0, scaleY: 0, transformOrigin: "0% 0%" });
      ScrollTrigger.create({
        trigger: tlEl, start: "top 72%", end: "bottom 62%",
        onUpdate: (self) => {
          const p = self.progress;
          if (matchMedia("(max-width: 900px)").matches) gsap.set(fill, { scaleX: 1, scaleY: p });
          else gsap.set(fill, { scaleX: p, scaleY: 1 });
          steps.forEach((el, i) => el.classList.toggle("on", p >= (i + 0.35) / steps.length));
        },
      });
    }

    /* ===== platforms: orbit fades and scales in ===== */
    const orbit = one(".dmx-orbit");
    if (orbit) {
      gsap.set(orbit, { scale: 0.7, autoAlpha: 0 });
      enter(orbit, "top 85%", () => gsap.to(orbit, { scale: 1, autoAlpha: 1, duration: 1.6, ease: "expo.out" }));
    }

    /* ===== who: cards open like curtains ===== */
    const cu = all("[data-curtain]");
    if (cu.length) {
      gsap.set(cu, { clipPath: "inset(0% 100% 0% 0% round 16px)" });
      enter(cu[0], "top 90%", () => gsap.to(cu, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.2, ease: "expo.out", stagger: 0.1 }));
    }

    /* ===== results: chart draws, bars grow, donut fills ===== */
    const dash = one(".dmx-dash"), line = one(".dmx-line"), area = one(".dmx-area"), bars = all(".dmx-bars i"), dn = one(".dmx-dn-fg");
    if (dash && line) {
      gsap.set(line, { strokeDashoffset: 1 });
      if (area) gsap.set(area, { autoAlpha: 0 });
      gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      if (dn) gsap.set(dn, { strokeDashoffset: 1 });
      enter(dash, "top 80%", () => {
        gsap.to(line, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" });
        if (area) gsap.to(area, { autoAlpha: 1, duration: 1.4, delay: 1.2 });
        gsap.to(bars, { scaleY: 1, duration: 1.2, ease: "expo.out", stagger: 0.07, delay: 0.5 });
        if (dn) gsap.to(dn, { strokeDashoffset: 0.3, duration: 2, ease: "power3.out", delay: 0.7 });
      });
    }

    /* ===== work + packages + testimonials ===== */
    const pj = all(".dmx-pj");
    if (pj.length) {
      gsap.set(pj, { clipPath: "inset(0% 0% 100% 0% round 20px)" });
      enter(pj[0], "top 88%", () => gsap.to(pj, { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.3, ease: "expo.inOut", stagger: 0.12 }));
    }
    const pl = all(".dmx-plan");
    if (pl.length) {
      gsap.set(pl, { y: 90, autoAlpha: 0, rotationY: 24, transformPerspective: 1000 });
      enter(pl[0], "top 88%", () => gsap.to(pl, { y: 0, autoAlpha: 1, rotationY: 0, duration: 1.3, ease: "expo.out", stagger: 0.14 }));
    }
    all(".dmx-tq-c").forEach((c, i) => {
      gsap.set(c, { x: 60, autoAlpha: 0 });
      enter(c, "top 96%", () => gsap.to(c, { x: 0, autoAlpha: 1, duration: 1, delay: Math.min(i, 3) * 0.08, ease: "expo.out" }));
    });

    /* ===== CTA ===== */
    const cp = one(".dmx-cta-photo");
    if (cp) gsap.fromTo(cp, { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".dmx-cta-card", start: "top bottom", end: "bottom top", scrub: true } });

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