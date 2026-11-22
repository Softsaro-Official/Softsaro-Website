"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingSeoExtras() {
  const [t, setT] = useState<{ hero: Element | null; cta: Element | null }>({ hero: null, cta: null });

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    main?.classList.add("ps");
    setT({ hero: document.querySelector(".price-hero"), cta: document.querySelector(".price-cta") });
    return () => { main?.classList.remove("ps"); };
  }, []);

  useGSAP(() => {
    if (!t.hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: Array<() => void> = [];
    const hv = document.querySelector<HTMLElement>(".ps-hv");
    if (hv) {
      const line = gsap.utils.toArray<SVGElement>(".ps-hv .ps-line");
      gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.timeline({ delay: 0.9, defaults: { ease: "expo.out" } })
        .from(".ps-hv .ps-search", { y: -30, autoAlpha: 0, duration: 1 })
        .from(".ps-hv .ps-row", { x: 70, autoAlpha: 0, duration: 1.2, stagger: 0.14 }, 0.25)
        .to(line, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 0.7)
        .from(".ps-hv .ps-dot", { scale: 0, duration: 0.8, ease: "back.out(2.4)" }, 2.2);
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
    if (t.cta && document.querySelector(".ps-ob")) {
      const arrow = gsap.utils.toArray<SVGElement>(".ps-ob .ps-arr");
      gsap.set(arrow, { strokeDasharray: 1, strokeDashoffset: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: t.cta, start: "top 75%", once: true } });
      tl.from(".ps-ob", { scale: 0.6, autoAlpha: 0, duration: 1.8, ease: "expo.out" })
        .to(arrow, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.2 }, 0.7);
    }
    return () => { offs.forEach((f) => f()); };
  }, { dependencies: [t.hero, t.cta] });

  return (
    <>
      {t.hero && createPortal(
        <svg className="ps-hv" viewBox="0 0 420 380" aria-hidden="true">
          <g className="ps-search">
            <rect x="20" y="16" width="330" height="48" rx="24" />
            <circle cx="48" cy="40" r="8" className="ps-mg" />
            <path d="M54 46 L62 54" className="ps-mg" />
            <text x="76" y="45">best seo price in nepal</text>
          </g>
          <g className="ps-row ps-top"><rect x="20" y="88" width="380" height="46" rx="12" /><circle cx="46" cy="111" r="11" /><text x="46" y="115" textAnchor="middle" className="ps-rk">1</text><path d="M72 104 H250" /><path d="M72 118 H190" /></g>
          <g className="ps-row"><rect x="20" y="146" width="380" height="46" rx="12" /><circle cx="46" cy="169" r="11" /><text x="46" y="173" textAnchor="middle" className="ps-rk">2</text><path d="M72 162 H230" /><path d="M72 176 H170" /></g>
          <g className="ps-row"><rect x="20" y="204" width="380" height="46" rx="12" /><circle cx="46" cy="227" r="11" /><text x="46" y="231" textAnchor="middle" className="ps-rk">3</text><path d="M72 220 H210" /><path d="M72 234 H160" /></g>
          <path className="ps-line" pathLength={1} d="M20 350 C90 342 130 322 180 304 S300 282 394 262" />
          <circle className="ps-dot" cx="394" cy="262" r="6" />
        </svg>,
        t.hero
      )}
      {t.cta && createPortal(
        <div className="ps-ob" aria-hidden="true">
          <span className="ps-ring r1"><i /></span>
          <span className="ps-ring r2"><i /></span>
          <svg className="ps-ar" viewBox="0 0 120 120"><path className="ps-arr" pathLength={1} d="M24 86 L52 56 L68 70 L98 34" /><path className="ps-arr" pathLength={1} d="M80 34 H98 V52" /></svg>
        </div>,
        t.cta
      )}
    </>
  );
}