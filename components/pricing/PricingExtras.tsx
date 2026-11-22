"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingExtras() {
  const [t, setT] = useState<{ hero: Element | null; cta: Element | null }>({ hero: null, cta: null });

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    main?.classList.add("pz");
    setT({ hero: document.querySelector(".price-hero"), cta: document.querySelector(".price-cta") });
    return () => { main?.classList.remove("pz"); };
  }, []);

  useGSAP(() => {
    if (!t.hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: Array<() => void> = [];
    const hv = document.querySelector<HTMLElement>(".pz-hv");
    if (hv) {
      const lines = gsap.utils.toArray<SVGElement>(".pz-hv .pz-dash");
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.timeline({ delay: 0.9, defaults: { ease: "expo.out" } })
        .from(".pz-hv .pz-unit", { x: 60, autoAlpha: 0, duration: 1.2, stagger: 0.12 })
        .to(lines, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.15 }, 0.4)
        .from(".pz-hv .pz-node", { scale: 0, duration: 0.8, stagger: 0.1, ease: "back.out(2)" }, 0.8);
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
    if (t.cta && document.querySelector(".pz-ob")) {
      gsap.from(".pz-ob", { scale: 0.6, autoAlpha: 0, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: t.cta, start: "top 75%", once: true } });
    }
    return () => { offs.forEach((f) => f()); };
  }, { dependencies: [t.hero, t.cta] });

  return (
    <>
      {t.hero && createPortal(
        <svg className="pz-hv" viewBox="0 0 420 440" aria-hidden="true">
          <path id="pz-r1" className="pz-dash" pathLength={1} d="M115 84 C115 150 170 190 230 197" />
          <path id="pz-r2" className="pz-dash" pathLength={1} d="M115 84 C115 200 170 250 230 263" />
          <path id="pz-r3" className="pz-dash" pathLength={1} d="M115 84 C115 250 170 310 230 329" />
          <g className="pz-unit"><rect x="20" y="40" width="190" height="44" rx="22" /><text x="44" y="67">yourbrand.com</text></g>
          <g className="pz-unit"><rect x="230" y="170" width="170" height="54" rx="12" /><circle className="pz-led" cx="252" cy="197" r="4" /><path d="M276 197H380" /></g>
          <g className="pz-unit"><rect x="230" y="236" width="170" height="54" rx="12" /><circle className="pz-led" cx="252" cy="263" r="4" /><path d="M276 263H360" /></g>
          <g className="pz-unit"><rect x="230" y="302" width="170" height="54" rx="12" /><circle className="pz-led" cx="252" cy="329" r="4" /><path d="M276 329H370" /></g>
          <circle className="pz-node" cx="115" cy="84" r="6" />
          <circle className="pz-node" cx="230" cy="197" r="5" />
          <circle className="pz-node" cx="230" cy="263" r="5" />
          <circle className="pz-node" cx="230" cy="329" r="5" />
          <circle className="pz-pk" r="4"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#pz-r1" /></animateMotion></circle>
          <circle className="pz-pk" r="4"><animateMotion dur="3.8s" begin="1s" repeatCount="indefinite"><mpath href="#pz-r2" /></animateMotion></circle>
          <circle className="pz-pk" r="4"><animateMotion dur="4.4s" begin="2s" repeatCount="indefinite"><mpath href="#pz-r3" /></animateMotion></circle>
        </svg>,
        t.hero
      )}
      {t.cta && createPortal(
        <div className="pz-ob" aria-hidden="true">
          <span className="pz-ring pr1"><i /></span>
          <span className="pz-ring pr2"><i /></span>
          <span className="pz-ring pr3" />
        </div>,
        t.cta
      )}
    </>
  );
}