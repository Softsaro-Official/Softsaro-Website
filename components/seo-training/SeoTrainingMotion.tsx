"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Splits an element's text into masked words (same technique as the homepage). Returns words + a restore fn. */
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

export default function SeoTrainingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const safe = contextSafe!;
      const scope = root.current as HTMLDivElement;
      const offs: (() => void)[] = [];
      const on = (t: EventTarget, e: string, f: EventListener, o?: AddEventListenerOptions) => {
        t.addEventListener(e, f, o);
        offs.push(() => t.removeEventListener(e, f));
      };
      const q = (s: string) => Array.from(scope.querySelectorAll<HTMLElement>(s));
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // a photo that fails to load is removed instead of showing a broken icon
      q(".ss-px img").forEach((img) => {
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

      if (reduce) return () => offs.forEach((f) => f());
      scope.classList.add("seo-js");

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
      const h1 = scope.querySelector<HTMLElement>(".ss-hero h1");
      if (h1) {
        const s = splitWords(h1);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115, rotate: 4 });
        tl.to(s.words, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.05 }, 0.15);
      }
      tl.from(".ss-hero [data-in]", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.5)
        .from(".ss-blob", { scale: 0.6, opacity: 0, duration: 1.6 }, 0.2)
        .fromTo(".ss-main", { clipPath: "inset(100% 0% 0% 0% round 36px)" }, { clipPath: "inset(0% 0% 0% 0% round 36px)", duration: 1.6, ease: "expo.inOut" }, 0.25)
        .from(".ss-main img", { scale: 1.35, duration: 2 }, 0.25)
        .fromTo(".ss-round", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(72% at 50% 50%)", duration: 1.4, ease: "expo.inOut" }, 0.9)
        .from(".ss-pos-serp > div, .ss-pos-chip > div, .ss-pos-chip2 > div", { opacity: 0, y: 60, rotationY: -35, transformPerspective: 900, duration: 1.3, stagger: 0.14 }, 1);

      // search bar types its query
      const typed = scope.querySelector<HTMLElement>("[data-type]");
      if (typed) {
        const full = typed.dataset.type || "";
        const o = { n: 0 };
        typed.textContent = "";
        gsap.to(o, { n: full.length, duration: 1.6, ease: "none", delay: 1.7, onUpdate: () => { typed.textContent = full.slice(0, Math.round(o.n)); } });
        offs.push(() => { typed.textContent = full; });
      }

      q("[data-float]").forEach((el) => {
        const [y, r, d] = (el.dataset.float || "10,1,5").split(",").map(Number);
        gsap.to(el, { y, rotation: r, duration: d, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
      });
      gsap.to(".ss-collage", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".ss-hero", start: "top top", end: "bottom top", scrub: true } });

      if (fine) {
        const hero = scope.querySelector(".ss-hero") as HTMLElement;
        const layers = q(".ss-l, .ss-blob").map((el) => ({
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

      // PHOTO PARALLAX inside every frame
      q(".ss-px").forEach((p) => {
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

      // MASK REVEALS: wipe up / circle / arch, inner photo scales down
      q("[data-reveal]").forEach((el, i) => {
        const inner = el.firstElementChild as HTMLElement;
        const kind = el.dataset.reveal;
        const round = i % 2 ? "round 28px" : "round 90px 28px 90px 28px";
        const from = kind === "arch" ? "inset(100% 0% 0% 0% round 200px 200px 28px 28px)" : `inset(100% 0% 0% 0% ${round})`;
        const to = kind === "arch" ? "inset(0% 0% 0% 0% round 200px 200px 28px 28px)" : `inset(0% 0% 0% 0% ${round})`;
        gsap.fromTo(el, { clipPath: from }, { clipPath: to, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, ...play } });
        if (inner) gsap.fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.7, ease: "expo.out", scrollTrigger: { trigger: el, ...play } });
      });

      // SECTION TRANSITION: photo band opens from a rounded inset frame to full width
      const band = scope.querySelector<HTMLElement>("[data-band]");
      if (band) gsap.fromTo(band, { clipPath: "inset(12% 7% 12% 7% round 56px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: band, start: "top 95%", end: "top 15%", scrub: true } });

      // WHY: photo banner gently drifts; CTA photo tilts
      gsap.fromTo(".ss-cta-ph", { rotation: -5 }, { rotation: 3, ease: "none", scrollTrigger: { trigger: ".ss-final", start: "top bottom", end: "bottom bottom", scrub: true } });

      // PROCESS LINE
      const fill = scope.querySelector<HTMLElement>(".seo-line i");
      const stepEls = q(".seo-step");
      if (fill) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1001px)", () => {
          gsap.set(fill, { scaleX: 0 });
          stepEls.forEach((s) => s.classList.remove("on"));
          gsap.to(fill, {
            scaleX: 1, ease: "none",
            scrollTrigger: {
              trigger: ".seo-steps", start: "top 75%", end: "bottom 60%", scrub: true,
              onUpdate: (st) => stepEls.forEach((s, i) => s.classList.toggle("on", st.progress >= i / (stepEls.length - 1) - 0.001)),
            },
          });
        });
        offs.push(() => mm.revert());
      }

      // HOVER: topic rows show a cursor-following photo preview; tool tiles lift; magnetic buttons
      if (fine) {
        const pv = scope.querySelector<HTMLElement>(".ss-pv");
        const list = scope.querySelector<HTMLElement>(".ss-topics");
        if (pv && list) {
          const imgs = Array.from(pv.querySelectorAll<HTMLElement>("img"));
          const rows = Array.from(list.children) as HTMLElement[];
          gsap.set(pv, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
          gsap.set(imgs, { autoAlpha: 0 });
          const qx = gsap.quickTo(pv, "x", { duration: 0.6, ease: "power3.out" });
          const qy = gsap.quickTo(pv, "y", { duration: 0.6, ease: "power3.out" });
          on(list, "pointermove", (e) => { const ev = e as PointerEvent; qx(ev.clientX - 240); qy(ev.clientY); });
          rows.forEach((r, i) => {
            on(r, "mouseenter", safe(() => {
              imgs.forEach((im, k) => gsap.to(im, { autoAlpha: k === i % imgs.length ? 1 : 0, duration: 0.35, overwrite: "auto" }));
              gsap.to(pv, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
              gsap.to(rows.filter((o) => o !== r), { opacity: 0.35, duration: 0.35, overwrite: "auto" });
              gsap.to(r, { opacity: 1, duration: 0.35, overwrite: "auto" });
            }));
          });
          on(list, "mouseleave", safe(() => {
            gsap.to(pv, { autoAlpha: 0, scale: 0.6, duration: 0.4, overwrite: "auto" });
            gsap.to(rows, { opacity: 1, duration: 0.35, overwrite: "auto" });
          }));
        }
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

      // FAQ: animate the answer in
      q("details").forEach((d) => {
        on(d, "toggle", safe(() => {
          const p = d.querySelector("p");
          if ((d as HTMLDetailsElement).open && p) gsap.fromTo(p, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        }));
      });

      return () => offs.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}