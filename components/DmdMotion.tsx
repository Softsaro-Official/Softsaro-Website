"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Masked word split (scoped copy of the technique used on the other pages). */
function splitWords(el: HTMLElement) {
  const orig = el.innerHTML;
  const frag = document.createDocumentFragment();
  const wrap = (node: Node) => {
    const w = document.createElement("span");
    w.className = "dmd-w";
    const i = document.createElement("span");
    i.className = "dmd-wi";
    i.appendChild(node);
    w.appendChild(i);
    return w;
  };
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      (n.textContent || "").split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(" "));
        else frag.appendChild(wrap(document.createTextNode(p)));
      });
    } else frag.appendChild(wrap(n.cloneNode(true)));
  });
  el.textContent = "";
  el.appendChild(frag);
  return { words: Array.from(el.querySelectorAll<HTMLElement>(".dmd-wi")), restore: () => { el.innerHTML = orig; } };
}

export default function DmdMotion() {
  useGSAP(
    () => {
      const root = document.querySelector<HTMLElement>(".dmd-page");
      if (!root) return () => {};
      const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
      const offs: (() => void)[] = [];

      // testimonial progress bar (always on)
      const tq = root.querySelector<HTMLElement>(".dmd-tq");
      const bar = root.querySelector<HTMLElement>(".dmd-tq-prog i");
      const upd = () => {
        if (!tq || !bar) return;
        const mx = tq.scrollWidth - tq.clientWidth;
        bar.style.transform = `scaleX(${0.12 + 0.88 * (mx > 0 ? tq.scrollLeft / mx : 0)})`;
      };
      tq?.addEventListener("scroll", upd, { passive: true });
      upd();
      offs.push(() => tq?.removeEventListener("scroll", upd));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => offs.forEach((f) => f());

      root.classList.add("dmd-js", "dmd-gs");
      offs.push(() => root.classList.remove("dmd-js", "dmd-gs"));

      // smooth scroll (same setup as the other pages)
      const html = document.documentElement;
      const sb = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const lenis = new Lenis({ anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      offs.push(() => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        html.style.scrollBehavior = sb;
      });

      const splits: { restore: () => void }[] = [];
      offs.push(() => splits.forEach((s) => s.restore()));

      // ---------- HERO ----------
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      const h1 = root.querySelector<HTMLElement>(".dmd-h1");
      if (h1) {
        const s = splitWords(h1);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115, rotate: 3 });
        tl.to(s.words, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.05 }, 0.1);
      }
      tl.fromTo(".dmd-hero-img", { clipPath: "inset(100% 0% 0% 0% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.5, ease: "expo.inOut", clearProps: "clipPath" }, 0.2)
        .from(".dmd-hero-img img", { scale: 1.3, duration: 1.8 }, 0.2)
        .from(".dmd-hero-card", { y: 40, opacity: 0, duration: 1.1 }, 1)
        .from(".dmd-hc-bars i", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.9, stagger: 0.06 }, 1.2);
      gsap.to(".dmd-hero-card", { y: -8, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.6 });
      const heroTrig = { trigger: ".dmd-hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".dmd-hero-copy", { y: -28, ease: "none", scrollTrigger: heroTrig });
      gsap.to(".dmd-hero-vis", { y: -44, ease: "none", scrollTrigger: heroTrig });

      // ---------- HEADINGS (H2 masked word reveal) ----------
      q(".dmd-h2").forEach((h) => {
        const s = splitWords(h);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115, rotate: 3 });
        ScrollTrigger.create({
          trigger: h,
          start: "top 88%",
          once: true,
          onEnter: () => gsap.to(s.words, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.05, ease: "expo.out" }),
        });
      });

      // ---------- GENERIC STAGGERED REVEALS ----------
      const rev = q("[data-r]").filter((el) => !el.matches(".dmd-photo,.dmd-h2,.dmd-dash,.dmd-steps"));
      gsap.set(rev, { opacity: 0, y: 28 });
      ScrollTrigger.batch(rev, {
        start: "top 88%",
        once: true,
        onEnter: (b) =>
          gsap.to(b, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
            clearProps: "transform,opacity",
            onComplete: () => b.forEach((e) => e.classList.add("dmd-ready")),
          }),
      });

      // ---------- PHOTOS: clip reveal + parallax ----------
      q(".dmd-photo").forEach((f) => {
        gsap.fromTo(
          f,
          { clipPath: "inset(0% 0% 100% 0% round 22px)" },
          { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.3, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: f, start: "top 88%", once: true } },
        );
        const img = f.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -7, scale: 1.14 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // ---------- COUNTER (8+ years is real company data) ----------
      const bd = root.querySelector<HTMLElement>(".dmd-badge b");
      if (bd) {
        const o = { v: 0 };
        bd.textContent = "0+";
        gsap.to(o, { v: 8, duration: 1.6, ease: "power2.out", onUpdate: () => { bd.textContent = `${Math.round(o.v)}+`; }, scrollTrigger: { trigger: bd, start: "top 92%", once: true } });
      }

      // ---------- DASHBOARD CHARTS (CSS draws them once .in is set) ----------
      const dash = root.querySelector<HTMLElement>(".dmd-dash");
      if (dash) {
        ScrollTrigger.create({ trigger: dash, start: "top 80%", once: true, onEnter: () => dash.classList.add("in") });
        offs.push(() => dash.classList.remove("in"));
      }

      // ---------- PROCESS TIMELINE: scroll progress + active step ----------
      const steps = root.querySelector<HTMLElement>(".dmd-steps");
      if (steps) {
        const items = q(".dmd-step");
        gsap.from(items, { y: 26, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: steps, start: "top 85%", once: true } });
        ScrollTrigger.create({
          trigger: steps,
          start: "top 80%",
          end: "bottom 50%",
          onUpdate: (s) => {
            steps.style.setProperty("--dmdp", String(s.progress));
            items.forEach((it, i) => it.classList.toggle("on", s.progress >= i / (items.length - 1) - 0.02));
          },
        });
      }

      // ---------- keep trigger positions right after fonts and lazy images ----------
      let rt: ReturnType<typeof setTimeout>;
      const rf = () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 150); };
      window.addEventListener("load", rf);
      document.fonts?.ready.then(rf);
      q("img").forEach((img) => { if (!(img as HTMLImageElement).complete) img.addEventListener("load", rf, { once: true }); });
      offs.push(() => { clearTimeout(rt); window.removeEventListener("load", rf); });

      return () => offs.forEach((f) => f());
    },
    { dependencies: [] },
  );

  return null;
}