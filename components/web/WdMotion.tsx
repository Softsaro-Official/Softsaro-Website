"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Motion for /web-development. The global GsapCursor and the Navbar run on their own; this only drives the page. */
export default function WdMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const safe = contextSafe!;
      const scope = root.current as HTMLDivElement;
      const q = (s: string) => Array.from(scope.querySelectorAll<HTMLElement>(s));
      const offs: (() => void)[] = [];
      const on = (t: EventTarget, e: string, f: EventListener) => {
        t.addEventListener(e, f);
        offs.push(() => t.removeEventListener(e, f));
      };
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();
      offs.push(() => mm.revert());

      if (reduce) {
        q(".wd-step").forEach((s) => s.classList.add("on"));
        return () => offs.forEach((f) => f());
      }

      // smooth scroll (same library as the other pages)
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

      const play = { start: "top 86%", toggleActions: "play none none reverse" };

      // HERO intro
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".wd-hero h1 .wd-i", { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.05 }, 0.15)
        .fromTo(".wd-hero [data-in]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.5)
        .fromTo(".wd-blob", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 }, 0.2)
        .fromTo(".wd-main .wd-win", { clipPath: "inset(100% 0% 0% 0% round 18px)" }, { clipPath: "inset(0% 0% 0% 0% round 18px)", duration: 1.6, ease: "expo.inOut", clearProps: "clipPath" }, 0.3)
        .fromTo(".wd-phone, .wd-code, .wd-chip", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, stagger: 0.14 }, 1);

      q("[data-float]").forEach((el) => {
        const [y, r, d] = (el.dataset.float || "10,1,5").split(",").map(Number);
        gsap.to(el, { y, rotation: r, duration: d, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
      });
      gsap.to(".wd-collage", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".wd-hero", start: "top top", end: "bottom top", scrub: true } });

      if (fine) {
        const hero = scope.querySelector<HTMLElement>(".wd-hero")!;
        const layers = q(".wd-l, .wd-blob").map((el) => ({
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

      // headings: masked word reveal
      q("[data-split]").forEach((el) =>
        gsap.fromTo(el.querySelectorAll(".wd-i"), { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.04, ease: "expo.out", scrollTrigger: { trigger: el, ...play } }),
      );
      q(".wd-band p .wd-i").length && gsap.fromTo(".wd-band p .wd-i", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: ".wd-band", start: "top 60%" } });

      // staggered groups (clearProps so CSS hover transforms keep working)
      q("[data-stagger]").forEach((c) =>
        gsap.from(Array.from(c.children), { y: 50, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: c, ...play } }),
      );

      // arch photo reveal
      q("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0% round 200px 200px 28px 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 200px 200px 28px 28px)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, ...play } });
      });

      // photo parallax inside frames
      q(".wd-px").forEach((p) => {
        const img = p.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // band opens from a rounded inset to full width
      const band = scope.querySelector<HTMLElement>("[data-band]");
      if (band) gsap.fromTo(band, { clipPath: "inset(10% 6% 10% 6% round 48px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: band, start: "top 95%", end: "top 20%", scrub: true } });

      // SHOWCASE: layered mockups wipe in, then drift at different speeds (desktop)
      mm.add("(min-width: 701px)", () => {
        q(".wd-s").forEach((s) => {
          gsap.set(s, { rotation: Number(s.dataset.rot || 0) });
          gsap.fromTo(s, { clipPath: "inset(100% 0% 0% 0% round 20px)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0% round 20px)", scale: 1, duration: 1.5, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: ".wd-stage", start: "top 80%", toggleActions: "play none none reverse" } });
          gsap.to(s, { y: -Number(s.dataset.speed || 0) * 700, ease: "none", scrollTrigger: { trigger: ".wd-stage", start: "top bottom", end: "bottom top", scrub: true } });
        });
      });

      // PROCESS: line fills and lights each step
      const fill = scope.querySelector<HTMLElement>(".wd-line i");
      const stepEls = q(".wd-step");
      if (fill) {
        const run = (axis: "scaleX" | "scaleY", start: string) => {
          gsap.set(fill, { scaleX: axis === "scaleX" ? 0 : 1, scaleY: axis === "scaleY" ? 0 : 1 });
          stepEls.forEach((s) => s.classList.remove("on"));
          gsap.to(fill, {
            [axis]: 1, ease: "none",
            scrollTrigger: {
              trigger: ".wd-steps", start, end: "bottom 60%", scrub: true,
              onUpdate: (st) => stepEls.forEach((s, i) => s.classList.toggle("on", st.progress >= i / (stepEls.length - 1) - 0.001)),
            },
          });
        };
        mm.add("(min-width: 1001px)", () => run("scaleX", "top 75%"));
        mm.add("(max-width: 1000px)", () => run("scaleY", "top 70%"));
      }

      // magnetic buttons (mouse only)
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

      // FAQ answer fade
      q("details").forEach((d) =>
        on(d, "toggle", safe(() => {
          const p = d.querySelector("p");
          if ((d as HTMLDetailsElement).open && p) gsap.fromTo(p, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        })),
      );

      return () => offs.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root} className="wd-page">{children}</div>;
}