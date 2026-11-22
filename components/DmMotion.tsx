"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Masked word split (same technique as the homepage / SEO page). */
function splitWords(el: HTMLElement) {
  const orig = el.innerHTML;
  const frag = document.createDocumentFragment();
  const wrap = (node: Node) => {
    const w = document.createElement("span");
    w.className = "sx-w";
    const i = document.createElement("span");
    i.className = "sx-i";
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
    } else if ((n as HTMLElement).tagName === "BR") frag.appendChild(n.cloneNode());
    else frag.appendChild(wrap(n.cloneNode(true)));
  });
  el.textContent = "";
  el.appendChild(frag);
  return { words: Array.from(el.querySelectorAll<HTMLElement>(".sx-i")), restore: () => { el.innerHTML = orig; } };
}

export default function DmMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const safe = contextSafe!;
      const scope = root.current as HTMLDivElement;
      const offs: (() => void)[] = [];
      const on = (t: EventTarget, e: string, f: EventListener, o?: AddEventListenerOptions) => {
        t.addEventListener(e, f, o);
        offs.push(() => t.removeEventListener(e, f, o));
      };
      const q = (s: string) => Array.from(scope.querySelectorAll<HTMLElement>(s));
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // images that fail to load are removed so the CSS fallback shows
      q(".dm-ph img").forEach((img) => {
        const bad = () => img.remove();
        if ((img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth === 0) bad();
        else on(img, "error", bad);
      });

      // navbar behaviour (homepage motion is not loaded on this route)
      const nav = document.getElementById("nav");
      if (nav) {
        let ly = 0;
        on(window, "scroll", () => {
          const y = window.scrollY;
          ly = y;
        }, { passive: true });
        on(nav, "click", (e) => {
          const t = e.target as HTMLElement;
          if (t.closest(".burger")) nav.classList.toggle("open");
          else if (t.closest(".menu a, .ddm a")) nav.classList.remove("open");
        });
      }

      // FAQ answer animation works with or without reduced motion
      q("details").forEach((d) => {
        on(d, "toggle", safe(() => {
          const p = d.querySelector("p");
          if (!reduce && (d as HTMLDetailsElement).open && p) gsap.fromTo(p, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        }));
      });

      if (reduce) return () => offs.forEach((f) => f());

      // smooth scroll, same library as the homepage
      const html = document.documentElement;
      const sb = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const lenis = new Lenis({ anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const splits: { restore: () => void }[] = [];
      offs.push(() => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        html.style.scrollBehavior = sb;
      });
      offs.push(() => splits.forEach((s) => s.restore()));

      const play = { start: "top 86%", toggleActions: "play none none reverse" };

      // HERO
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      const h1 = scope.querySelector<HTMLElement>(".dm-hero h1");
      if (h1) {
        const s = splitWords(h1);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115, rotate: 4 });
        tl.to(s.words, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.05 }, 0.15);
      }
      tl.from(".dm-hero [data-in]", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.5)
        .from(".dm-blob", { scale: 0.6, opacity: 0, duration: 1.6 }, 0.2)
        .fromTo(".dm-arch", { clipPath: "inset(100% 0% 0% 0% round 240px 240px 28px 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 240px 240px 28px 28px)", duration: 1.6, ease: "expo.inOut" }, 0.25)
        .from(".dm-arch img", { scale: 1.35, duration: 2 }, 0.25)
        .fromTo(".dm-round", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(72% at 50% 50%)", duration: 1.4, ease: "expo.inOut" }, 0.9)
        .from(".dm-pos-post > div, .dm-pos-ad > div, .dm-pos-chip > div", { opacity: 0, y: 60, rotationY: -35, transformPerspective: 900, duration: 1.3, stagger: 0.14 }, 1)
        .from(".dm-words", { y: 40, opacity: 0, duration: 1.2 }, 1.2);
      q("[data-float]").forEach((el) => {
        const [y, r, d] = (el.dataset.float || "10,1,5").split(",").map(Number);
        gsap.to(el, { y, rotation: r, duration: d, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
      });
      gsap.to(".dm-spark", { rotation: 360, duration: 26, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".dm-collage", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".dm-hero", start: "top top", end: "bottom top", scrub: true } });

      if (fine) {
        const hero = scope.querySelector(".dm-hero") as HTMLElement;
        const layers = q(".dm-l, .dm-blob").map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          d: Number(el.dataset.depth || 0),
        }));
        on(hero, "pointermove", (e) => {
          const ev = e as PointerEvent;
          const r = hero.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width - 0.5;
          const py = (ev.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { l.x(px * l.d); l.y(py * l.d); });
        });
        on(hero, "pointerleave", () => layers.forEach((l) => { l.x(0); l.y(0); }));
      }

      // PHOTO PARALLAX: every photo drifts inside its frame while scrolling
      q(".dm-px").forEach((p) => {
        const img = p.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // HEADINGS: masked word reveal
      q("[data-split]").forEach((el) => {
        const s = splitWords(el);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115 });
        gsap.to(s.words, { yPercent: 0, duration: 1.1, stagger: 0.04, ease: "expo.out", scrollTrigger: { trigger: el, ...play } });
      });

      // STAGGERED GROUPS
      q("[data-stagger]").forEach((c) =>
        gsap.from(c.children, { y: 50, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: c, ...play } }),
      );

      // MASK REVEALS (wipe up, circle, or rounded variants) with inner scale-down
      q("[data-reveal]").forEach((el, i) => {
        const inner = el.firstElementChild as HTMLElement;
        const circle = el.dataset.reveal === "circle";
        const round = i % 2 ? "round 28px" : "round 110px 28px 110px 28px";
        const from = circle ? "circle(0% at 50% 50%)" : `inset(100% 0% 0% 0% ${round})`;
        const to = circle ? "circle(72% at 50% 50%)" : `inset(0% 0% 0% 0% ${round})`;
        gsap.fromTo(el, { clipPath: from }, { clipPath: to, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, ...play } });
        if (inner) gsap.fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.7, ease: "expo.out", scrollTrigger: { trigger: el, ...play } });
      });

      // SECTION TRANSITION: full-bleed photo band opens from an inset rounded frame to full width
      const band = scope.querySelector<HTMLElement>("[data-band]");
      if (band) {
        gsap.fromTo(band, { clipPath: "inset(12% 7% 12% 7% round 56px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: band, start: "top 95%", end: "top 15%", scrub: true } });
      }

      // CTA decoration
      gsap.fromTo(".dm-cta-ph", { rotation: -6 }, { rotation: 4, ease: "none", scrollTrigger: { trigger: ".dm-final", start: "top bottom", end: "bottom bottom", scrub: true } });

      // MARQUEES (hero words + tools rows): endless drift that speeds up with scroll velocity
      const mqs = q("[data-mq]").map((el) => {
        const dir = Number(el.dataset.mq) || 1;
        const tw = gsap.fromTo(el, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 42, ease: "none", repeat: -1 });
        return { el, tw, hover: 1 };
      });
      let boost = 1;
      const spin = () => { boost += (1 - boost) * 0.06; mqs.forEach((m) => m.tw.timeScale(boost * m.hover)); };
      gsap.ticker.add(spin);
      offs.push(() => gsap.ticker.remove(spin));
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: (st) => { boost = Math.max(boost, 1 + Math.min(Math.abs(st.getVelocity()) / 450, 5)); } });
      mqs.forEach((m) => {
        if (!fine) return;
        on(m.el.parentElement as HTMLElement, "pointerenter", () => { m.hover = 0.15; });
        on(m.el.parentElement as HTMLElement, "pointerleave", () => { m.hover = 1; });
      });

      // HOVER: dim sibling topic tiles; magnetic buttons
      if (fine) {
        const tiles = q(".dm-t");
        tiles.forEach((t) => {
          on(t, "mouseenter", safe(() => gsap.to(tiles.filter((o) => o !== t), { opacity: 0.5, duration: 0.4, overwrite: "auto" })));
          on(t, "mouseleave", safe(() => gsap.to(tiles, { opacity: 1, duration: 0.4, overwrite: "auto" })));
        });
        q(".btn").forEach((b) => {
          const xt = gsap.quickTo(b, "x", { duration: 0.7, ease: "elastic.out(1,.5)" });
          const yt = gsap.quickTo(b, "y", { duration: 0.7, ease: "elastic.out(1,.5)" });
          on(b, "pointermove", (e) => {
            const ev = e as PointerEvent;
            const r = b.getBoundingClientRect();
            xt((ev.clientX - r.left - r.width / 2) * 0.25);
            yt((ev.clientY - r.top - r.height / 2) * 0.35);
          });
          on(b, "pointerleave", () => { xt(0); yt(0); });
        });
      }

      return () => offs.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}