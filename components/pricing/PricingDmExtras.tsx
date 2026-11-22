"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingDmExtras() {
  const [t, setT] = useState<{ hero: Element | null; cta: Element | null }>({ hero: null, cta: null });

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    main?.classList.add("pd");
    setT({ hero: document.querySelector(".price-hero"), cta: document.querySelector(".price-cta") });
    return () => { main?.classList.remove("pd"); };
  }, []);

  useGSAP(() => {
    if (!t.hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: Array<() => void> = [];
    const hv = document.querySelector<HTMLElement>(".pd-hv");
    if (hv) {
      const line = gsap.utils.toArray<SVGElement>(".pd-hv .pd-line");
      gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".pd-hv .pd-bar", { scaleY: 0, transformBox: "fill-box", transformOrigin: "50% 100%" });
      gsap.timeline({ delay: 0.9, defaults: { ease: "expo.out" } })
        .from(".pd-hv .pd-card", { y: 50, autoAlpha: 0, duration: 1.2 })
        .to(".pd-hv .pd-bar", { scaleY: 1, duration: 1.3, stagger: 0.1 }, 0.4)
        .to(line, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 1.0)
        .from(".pd-hv .pd-post", { x: 60, autoAlpha: 0, duration: 1.1 }, 0.7)
        .from(".pd-hv .pd-heart", { scale: 0, duration: 0.8, ease: "back.out(3)", transformOrigin: "center", transformBox: "fill-box" }, 1.9)
        .from(".pd-hv .pd-chip", { scale: 0.5, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: "back.out(2)", transformOrigin: "center", transformBox: "fill-box" }, 1.4);
      gsap.to(".pd-hv .pd-chip", { y: "+=8", duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.5, delay: 3 });
      gsap.to(hv, { yPercent: -12, ease: "none", scrollTrigger: { trigger: t.hero, start: "top top", end: "bottom top", scrub: true } });
      if (fine) {
        const qx = gsap.quickTo(hv, "x", { duration: 1, ease: "power3" });
        const qy = gsap.quickTo(hv, "y", { duration: 1, ease: "power3" });
        const mv = (e: Event) => {
          const ev = e as PointerEvent;
          const r = (t.hero as Element).getBoundingClientRect();
          qx(-((ev.clientX - r.left) / r.width - 0.5) * 30);
          qy(-((ev.clientY - r.top) / r.height - 0.5) * 20);
        };
        t.hero.addEventListener("pointermove", mv);
        offs.push(() => t.hero && t.hero.removeEventListener("pointermove", mv));
      }
    }
    if (t.cta && document.querySelector(".pd-ob")) {
      gsap.set(".pd-ob .pd-cb", { scaleY: 0, transformBox: "fill-box", transformOrigin: "50% 100%" });
      gsap.timeline({ scrollTrigger: { trigger: t.cta, start: "top 75%", once: true } })
        .from(".pd-ob", { scale: 0.6, autoAlpha: 0, duration: 1.8, ease: "expo.out" })
        .to(".pd-ob .pd-cb", { scaleY: 1, duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.7);
    }
    return () => { offs.forEach((f) => f()); };
  }, { dependencies: [t.hero, t.cta] });

  return (
    <>
      {t.hero && createPortal(
        <svg className="pd-hv" viewBox="0 0 440 380" aria-hidden="true">
          <g className="pd-card">
            <rect x="10" y="40" width="250" height="230" rx="20" />
            <rect className="pd-bar" x="38" y="170" width="28" height="70" rx="6" />
            <rect className="pd-bar" x="82" y="140" width="28" height="100" rx="6" />
            <rect className="pd-bar" x="126" y="152" width="28" height="88" rx="6" />
            <rect className="pd-bar pd-hi" x="170" y="104" width="28" height="136" rx="6" />
            <rect className="pd-bar" x="214" y="82" width="28" height="158" rx="6" />
            <path className="pd-line" pathLength={1} d="M30 200 C80 180 110 196 150 150 S210 96 250 66" />
          </g>
          <g className="pd-post">
            <rect x="250" y="150" width="170" height="190" rx="18" />
            <circle cx="278" cy="180" r="12" />
            <path d="M300 176H390M300 190H356" />
            <rect className="pd-img" x="268" y="210" width="134" height="80" rx="10" />
            <path className="pd-heart" d="M290 322c-8-6-14-11-14-17 0-5 4-8 8-8 3 0 5 2 6 4 1-2 3-4 6-4 4 0 8 3 8 8 0 6-6 11-14 17z" />
          </g>
          <g className="pd-chip"><rect x="40" y="6" width="104" height="30" rx="15" /><circle cx="58" cy="21" r="5" /><text x="70" y="25">Reach</text></g>
          <g className="pd-chip"><rect x="170" y="296" width="104" height="30" rx="15" /><circle cx="188" cy="311" r="5" /><text x="200" y="315">Growth</text></g>
        </svg>,
        t.hero
      )}
      {t.cta && createPortal(
        <div className="pd-ob" aria-hidden="true">
          <span className="pd-ring r1"><i /></span>
          <span className="pd-ring r2"><i /></span>
          <svg className="pd-cbars" viewBox="0 0 120 120">
            <rect className="pd-cb" x="14" y="70" width="18" height="36" rx="4" />
            <rect className="pd-cb" x="40" y="54" width="18" height="52" rx="4" />
            <rect className="pd-cb" x="66" y="38" width="18" height="68" rx="4" />
            <rect className="pd-cb" x="92" y="18" width="18" height="88" rx="4" />
          </svg>
        </div>,
        t.cta
      )}
    </>
  );
}