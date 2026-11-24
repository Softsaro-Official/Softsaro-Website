"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Masked word split (same technique as the other pages). Restores original markup on cleanup. */
function splitWords(el: HTMLElement) {
  const orig = el.innerHTML;
  const frag = document.createDocumentFragment();
  const wrap = (node: Node) => {
    const w = document.createElement("span");
    w.className = "wx-w";
    const i = document.createElement("span");
    i.className = "wx-i";
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
  return { words: Array.from(el.querySelectorAll<HTMLElement>(".wx-i")), restore: () => { el.innerHTML = orig; } };
}

/** Motion for /web-development. GsapCursor and Navbar run on their own. */
export default function WebDevelopmentMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const safe = contextSafe!;
      const scope = root.current as HTMLDivElement;
      const q = (s: string) => Array.from(scope.querySelectorAll<HTMLElement>(s));
      const one = (s: string) => scope.querySelector<HTMLElement>(s);
      const offs: (() => void)[] = [];
      const on = (t: EventTarget, e: string, f: EventListener) => {
        t.addEventListener(e, f);
        offs.push(() => t.removeEventListener(e, f));
      };
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();
      offs.push(() => mm.revert());

      // expertise switcher works with click even without animation
      const pics = q(".wx-exp-pic");
      const items = q(".wx-exp-item");
      let cur = 0;
      let etl: gsap.core.Timeline | null = null;
      const setActive = (i: number) => {
        if (i === cur || !pics[i]) return;
        const prev = cur;
        cur = i;
        items.forEach((b, k) => b.classList.toggle("on", k === i));
        if (etl) etl.progress(1).kill();
        pics.forEach((p, k) => { if (k !== prev && k !== i) gsap.set(p, { zIndex: 0, clipPath: "inset(100% 0% 0% 0%)" }); });
        gsap.set(pics[prev], { zIndex: 1 });
        gsap.set(pics[i], { zIndex: 2, clipPath: "inset(100% 0% 0% 0%)" });
        const im = pics[i].querySelector("img");
        etl = gsap.timeline().to(pics[i], { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0 : 1, ease: "expo.inOut" }, 0);
        if (im && !reduce) etl.fromTo(im, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
      };
      items.forEach((b, i) => on(b, "click", () => setActive(i)));
      offs.push(() => { if (etl) etl.kill(); });

      // FAQ answer fade
      q("details").forEach((d) =>
        on(d, "toggle", safe(() => {
          const p = d.querySelector("p");
          if ((d as HTMLDetailsElement).open && p && !reduce) gsap.fromTo(p, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        })),
      );

      if (reduce) return () => offs.forEach((f) => f());

      scope.classList.add("wx-js");
      offs.push(() => scope.classList.remove("wx-js"));

      // smooth scroll, same library as the other pages
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

      // ---------- HERO: cinematic entrance ----------
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      const h1 = one(".wx-h1");
      if (h1) {
        const s = splitWords(h1);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115, rotate: 3 });
        tl.to(s.words, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.06 }, 0.1);
      }
      tl.from(".wx-hero [data-in]", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.5)
        .from(".wx-blob", { scale: 0.5, opacity: 0, duration: 1.8 }, 0.2)
        .from(".wx-win-main", { clipPath: "inset(100% 0% 0% 0% round 22px)", duration: 1.7, ease: "expo.inOut" }, 0.35)
        .from(".wx-pop", { opacity: 0, y: 80, scale: 0.88, rotationY: -28, transformPerspective: 900, duration: 1.4, stagger: 0.12 }, 1);
      q(".wx-win-main img").forEach((im) => gsap.from(im, { scale: 1.35, duration: 2.2, ease: "expo.out", delay: 0.5 }));

      q("[data-float]").forEach((el) => {
        const [y, r, d] = (el.dataset.float || "10,1,5").split(",").map(Number);
        gsap.to(el, { y, rotation: r, duration: d, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      gsap.to(".wx-stage", { yPercent: -7, ease: "none", scrollTrigger: { trigger: ".wx-hero", start: "top top", end: "bottom top", scrub: true } });

      if (fine) {
        const hero = one(".wx-hero")!;
        const layers = q(".wx-l, .wx-blob").map((el) => ({
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

      // ---------- headings: masked word reveal ----------
      q("[data-split]").forEach((el) => {
        const s = splitWords(el);
        splits.push(s);
        gsap.set(s.words, { yPercent: 115 });
        gsap.to(s.words, { yPercent: 0, duration: 1.1, stagger: 0.04, ease: "expo.out", scrollTrigger: { trigger: el, ...play } });
      });

      // ---------- staggered groups ----------
      q("[data-stagger]").forEach((c) =>
        gsap.from(Array.from(c.children), { y: 50, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: c, ...play } }),
      );

      // ---------- WHAT WE BUILD: pinned horizontal storytelling (desktop) ----------
      mm.add("(min-width: 901px)", () => {
        const sec = one(".wx-hs");
        const track = one(".wx-hs-track");
        const bar = one(".wx-hs-bar i");
        if (!sec || !track) return;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
        gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: sec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (st) => { if (bar) bar.style.transform = "scaleX(" + st.progress + ")"; },
          },
        });
      });

      // ---------- EXPERTISE: pinned, photo wipes as you scroll the list ----------
      mm.add("(min-width: 901px)", () => {
        const n = items.length;
        if (!n) return;
        ScrollTrigger.create({
          trigger: ".wx-exp", start: "top top", end: () => "+=" + n * window.innerHeight * 0.45, pin: true, anticipatePin: 1,
          onUpdate: (st) => setActive(Math.min(n - 1, Math.floor(st.progress * n))),
        });
      });

      // ---------- BENTO: clip reveal + layered parallax ----------
      q(".wx-b").forEach((b) => {
        gsap.fromTo(b, { clipPath: "inset(100% 0% 0% 0% round 26px)" }, { clipPath: "inset(0% 0% 0% 0% round 26px)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: b, start: "top 88%", toggleActions: "play none none reverse" } });
        const im = b.querySelector("img");
        if (im) gsap.fromTo(im, { yPercent: -9, scale: 1.15 }, { yPercent: 9, scale: 1.15, ease: "none", scrollTrigger: { trigger: b, start: "top bottom", end: "bottom top", scrub: true } });
      });
      mm.add("(min-width: 901px)", () => {
        q(".wx-b").forEach((b) => {
          const s = Number(b.dataset.speed || 0);
          if (s) gsap.fromTo(b, { y: s * 90 }, { y: -s * 90, ease: "none", scrollTrigger: { trigger: ".wx-bento", start: "top bottom", end: "bottom top", scrub: true } });
        });
      });

      // ---------- PROCESS: rows draw their lines ----------
      q(".wx-row").forEach((r) => {
        const ln = r.querySelector(".wx-rline");
        if (ln) gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: r, ...play } });
        gsap.from(r.querySelectorAll(".wx-rn, h3, p"), { y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: r, ...play } });
        ScrollTrigger.create({ trigger: r, start: "top 70%", end: "bottom 30%", toggleClass: { targets: r, className: "on" } });
      });

      // ---------- WHY: band opens from a rounded inset, counter ----------
      const why = one(".wx-why");
      if (why) gsap.fromTo(why, { clipPath: "inset(7% 4% 7% 4% round 52px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: why, start: "top 95%", end: "top 15%", scrub: true } });
      const cnt = one(".wx-count");
      if (cnt) {
        const o = { v: 0 };
        gsap.to(o, { v: 8, duration: 1.8, ease: "power3.out", onUpdate: () => { cnt.textContent = Math.round(o.v) + "+"; }, scrollTrigger: { trigger: cnt, start: "top 85%", toggleActions: "play none none reverse" } });
      }
      q("[data-tilt]").forEach((el) =>
        gsap.fromTo(el, { rotation: -6, yPercent: 8 }, { rotation: 3, yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }),
      );

      // ---------- magnetic buttons (mouse only) ----------
      if (fine) {
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

  return <div ref={root} className="wx-page">{children}</div>;
}