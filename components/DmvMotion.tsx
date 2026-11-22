"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function split(el: HTMLElement) {
  const orig = el.innerHTML;
  const frag = document.createDocumentFragment();
  el.setAttribute("aria-label", (el.textContent || "").trim());
  const wrap = (n: Node) => {
    const w = document.createElement("span"); w.className = "dmv-w";
    const i = document.createElement("span"); i.className = "dmv-wi";
    i.appendChild(n); w.appendChild(i); return w;
  };
  const words = (txt: string, mk: (t: string) => Node) =>
    txt.split(/(\s+)/).forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(" "));
      else frag.appendChild(wrap(mk(p)));
    });
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === 3) words(n.textContent || "", (t) => document.createTextNode(t));
    else if ((n as HTMLElement).tagName === "BR") frag.appendChild(n.cloneNode());
    else words(n.textContent || "", (t) => { const c = (n as HTMLElement).cloneNode(false) as HTMLElement; c.textContent = t; return c; });
  });
  el.textContent = "";
  el.appendChild(frag);
  return { words: Array.from(el.querySelectorAll<HTMLElement>(".dmv-wi")), restore: () => { el.innerHTML = orig; } };
}

export default function DmvMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".dmv-page");
    if (!root) return;
    const all = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const one = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: Array<() => void> = [];
    const on = (t: EventTarget, e: string, f: (ev: any) => void) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
    const enter = (el: Element, start: string, fn: () => void) => ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });
    const dur = (n: number) => (reduced ? 0 : n);

    /* ===== always on: FAQ accordion + service tabs ===== */
    const fqs = all<HTMLButtonElement>(".dmv-fq");
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

    const tabs = all<HTMLButtonElement>(".dmv-tab"), panels = all(".dmv-tp");
    const pick = (i: number) => {
      tabs.forEach((t, k) => { t.classList.toggle("on", k === i); t.setAttribute("aria-selected", String(k === i)); });
      panels.forEach((p, k) => p.classList.toggle("on", k === i));
      if (reduced) return;
      const p = panels[i];
      gsap.fromTo(p.querySelectorAll("[data-tp]"), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "expo.out", overwrite: true });
      const im = p.querySelector("img");
      if (im) gsap.fromTo(im, { scale: 1.2 }, { scale: 1.05, duration: 1.4, ease: "expo.out" });
    };
    tabs.forEach((t, i) => on(t, "click", () => pick(i)));

    if (reduced) return () => offs.forEach((f) => f());

    /* ===== smooth scroll ===== */
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const mo = new MutationObserver(() => { if (document.body.classList.contains("menu-is-open")) lenis.stop(); else lenis.start(); });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    const splits: Array<{ restore: () => void }> = [];
    let heroWords: HTMLElement[] = [];

    /* ===== split headings ===== */
    all("[data-split]").forEach((h) => {
      const s = split(h);
      splits.push(s);
      gsap.set(s.words, { yPercent: 118, rotate: 3 });
      if (h.closest(".dmv-hero")) heroWords = s.words;
      else enter(h, "top 88%", () => gsap.to(s.words, { yPercent: 0, rotate: 0, duration: 1.2, ease: "expo.out", stagger: 0.05 }));
    });

    /* ===== progress bar ===== */
    const prog = one(".dmv-prog");
    if (prog) gsap.to(prog, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 } });

    /* ===== HERO ===== */
    const hero = one(".dmv-hero");
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".dmv-sky", { yPercent: 30, autoAlpha: 0, duration: 2 }, 0)
      .to(heroWords, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.06 }, 0.2)
      .from(".dmv-hero [data-h]", { y: 24, autoAlpha: 0, stagger: 0.1, duration: 1 }, 0.6)
      .fromTo(".dmv-hm", { clipPath: "inset(100% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.inOut" }, 0.3)
      .from(".dmv-hm img", { scale: 1.35, duration: 2 }, 0.3)
      .from(".dmv-hs", { x: -60, autoAlpha: 0, duration: 1.3 }, 0.9)
      .from(".dmv-hc", { y: 50, autoAlpha: 0, duration: 1.2 }, 1.1)
      .from(".dmv-hcb i", { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.05, duration: 0.9 }, 1.4)
      .from(".dmv-chip", { scale: 0.6, autoAlpha: 0, stagger: 0.1, duration: 0.9, ease: "back.out(1.7)" }, 1.5)
      .call(() => { all(".dmv-chip").forEach((c, i) => gsap.to(c, { y: i % 2 ? 9 : -9, duration: gsap.utils.random(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1 })); }, [], 2.2);
    if (hero) {
      gsap.to(".dmv-hv", { yPercent: -8, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".dmv-sky", { yPercent: 14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    }
    if (fine && hero) {
      const L = ([[one(".dmv-hm"), -12], [one(".dmv-hs"), 24], [one(".dmv-hc"), 32]] as Array<[HTMLElement | null, number]>).filter((l) => l[0]) as Array<[HTMLElement, number]>;
      const qt = L.map(([el]) => ({ x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }) }));
      on(hero, "pointermove", (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--my", `${e.clientY - r.top}px`);
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        L.forEach(([, d], i) => { qt[i].x(px * d); qt[i].y(py * d); });
      });
    }

    /* ===== reveals ===== */
    all("[data-up]").forEach((el) => {
      const d = (Number(getComputedStyle(el).getPropertyValue("--i")) || 0) * 0.08;
      gsap.set(el, { autoAlpha: 0, y: 36 });
      enter(el, "top 92%", () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, delay: d, ease: "expo.out" }));
    });
    all("[data-clip]").forEach((f) => {
      gsap.set(f, { clipPath: "inset(100% 0% 0% 0% round 26px)" });
      enter(f, "top 86%", () => gsap.to(f, { clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.5, ease: "expo.inOut" }));
    });
    const cph = one(".dmv-cta-ph");
    if (cph) gsap.fromTo(cph, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".dmv-cta-card", start: "top bottom", end: "bottom top", scrub: true } });

    /* ===== counters (real facts only) ===== */
    all(".dmv-count").forEach((c) => {
      const to = Number(c.dataset.to || 0), o = { n: 0 };
      c.textContent = "0";
      enter(c, "top 95%", () => gsap.to(o, { n: to, duration: 1.8, ease: "power3.out", delay: 0.4, onUpdate: () => { c.textContent = String(Math.round(o.n)); } }));
    });

    /* ===== marquees: speed reacts to scroll ===== */
    all(".dmv-mq").forEach((m) => {
      const tr = m.querySelector<HTMLElement>(".dmv-mq-t");
      if (!tr) return;
      const right = m.dataset.dir === "r";
      gsap.set(tr, { xPercent: right ? -50 : 0 });
      const tw = gsap.to(tr, { xPercent: right ? 0 : -50, duration: Number(m.dataset.s || 40), ease: "none", repeat: -1 });
      ScrollTrigger.create({ trigger: m, start: "top bottom", end: "bottom top", onUpdate: (self) => {
        const v = Math.min(4, Math.abs(self.getVelocity()) / 600);
        gsap.to(tw, { timeScale: 1 + v, duration: 0.2, overwrite: true });
        gsap.to(tw, { timeScale: 1, duration: 1, delay: 0.2 });
      } });
    });

    /* ===== why: statements drive the image ===== */
    const sm = all(".dmv-stmt"), wi = all(".dmv-wimg");
    sm.forEach((s, i) => ScrollTrigger.create({ trigger: s, start: "top 60%", end: "bottom 60%", onToggle: (self) => {
      if (!self.isActive) return;
      sm.forEach((o, k) => o.classList.toggle("on", k === i));
      wi.forEach((m, k) => m.classList.toggle("on", k === i));
    } }));
    all(".dmv-wfig img").forEach((img) => gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".dmv-wfig", start: "top bottom", end: "bottom top", scrub: true } }));

    /* ===== process: pinned horizontal scroll on desktop ===== */
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const sec = one(".dmv-proc"), view = one(".dmv-pview"), track = one(".dmv-ptrack"), fill = one(".dmv-pbar i");
      if (!sec || !view || !track) return;
      const cards = all(".dmv-pc");
      const dist = () => Math.max(0, track.scrollWidth - view.clientWidth);
      gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: {
        trigger: sec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (fill) gsap.set(fill, { scaleX: self.progress });
          cards.forEach((c, i) => c.classList.toggle("on", self.progress >= i / cards.length - 0.02));
        },
      } });
    });

    /* ===== dashboard ===== */
    const dash = one(".dmv-dash"), line = one(".dmv-line"), area = one(".dmv-area"), bars = all(".dmv-bars i"), dn = one(".dmv-dnf"), goals = all(".dmv-goals b");
    if (dash && line) {
      gsap.set(line, { strokeDashoffset: 1 });
      if (area) gsap.set(area, { autoAlpha: 0 });
      gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(goals, { scaleX: 0, transformOrigin: "0 50%" });
      if (dn) gsap.set(dn, { strokeDashoffset: 1 });
      enter(dash, "top 80%", () => {
        gsap.to(line, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" });
        if (area) gsap.to(area, { autoAlpha: 1, duration: 1.4, delay: 1.2 });
        gsap.to(bars, { scaleY: 1, duration: 1.2, ease: "expo.out", stagger: 0.07, delay: 0.5 });
        if (dn) gsap.to(dn, { strokeDashoffset: 0.3, duration: 2, ease: "power3.out", delay: 0.7 });
        gsap.to(goals, { scaleX: 1, duration: 1.6, ease: "expo.out", stagger: 0.15, delay: 0.9 });
      });
    }

    /* ===== projects clip in ===== */
    const pj = all(".dmv-pj");
    if (pj.length) {
      gsap.set(pj, { clipPath: "inset(0% 0% 100% 0% round 20px)" });
      enter(pj[0], "top 88%", () => gsap.to(pj, { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.3, ease: "expo.inOut", stagger: 0.12 }));
    }

    /* ===== pointer effects (mouse only) ===== */
    if (fine) {
      all("[data-spot]").forEach((el) => on(el, "pointermove", (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }));
      all("[data-tilt]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        on(el, "pointermove", (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        });
        on(el, "pointerleave", () => { rx(0); ry(0); });
      });
      all("[data-mag]").forEach((el) => {
        const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,.5)" });
        const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
        on(el, "pointermove", (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          qx((e.clientX - r.left - r.width / 2) * 0.28);
          qy((e.clientY - r.top - r.height / 2) * 0.34);
        });
        on(el, "pointerleave", () => { qx(0); qy(0); });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      offs.forEach((f) => f());
      mm.revert();
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      splits.forEach((s) => s.restore());
    };
  }, []);

  return null;
}