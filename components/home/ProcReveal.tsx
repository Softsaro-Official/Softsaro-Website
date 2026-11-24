"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.getElementById("psteps");
    if (!root) { console.warn("[ProcReveal] #psteps not found"); return; }
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const vertical = matchMedia("(max-width: 1000px)").matches;
      const rail = root.querySelector<HTMLElement>(".ps-rail i")!;
      const sts = Array.from(root.querySelectorAll<HTMLElement>(".ps-st"));
      const q = (el: HTMLElement, s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
      const nodes = sts.map((s) => s.querySelector<HTMLElement>(".ps-n")!);
      const cards = sts.map((s) => s.querySelector<HTMLElement>(".ps-cd")!);

      gsap.set(rail, vertical ? { scaleY: 0, transformOrigin: "top" } : { scaleX: 0, transformOrigin: "left" });
      gsap.set(sts, { y: 34, force3D: true });
      gsap.set(nodes, { scale: 0.5, autoAlpha: 0 });
      gsap.set(cards, { autoAlpha: 0 });
      sts.forEach((s) => {
        gsap.set(q(s, ".ps-ico"), { scale: 0.6, rotate: -25, opacity: 0, transformOrigin: "50% 50%" });
        gsap.set(q(s, ".ps-ok"), { scale: 0, opacity: 0 });
        gsap.set(q(s, "h3, p, .ps-tags span"), { y: 14, autoAlpha: 0 });
      });

      const N = sts.length;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: vertical ? "top 80%" : "top 88%",
          end: vertical ? "bottom 55%" : "top 30%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      tl.to(rail, vertical ? { scaleY: 1, duration: N } : { scaleX: 1, duration: N }, 0);
      sts.forEach((s, i) => {
        const t = i * 0.85;
        tl.to(s, { y: 0, duration: 0.7, ease: "power2.out" }, t);
        tl.to(nodes[i], { scale: 1, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, t);
        tl.to(cards[i], { autoAlpha: 1, duration: 0.5 }, t + 0.1);
        tl.to(q(s, ".ps-ico"), { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, t + 0.2);
        tl.to(q(s, "h3, p"), { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }, t + 0.25);
        tl.to(q(s, ".ps-tags span"), { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }, t + 0.4);
        tl.to(q(s, ".ps-ok"), { scale: 1, opacity: 0.55, duration: 0.4, ease: "power2.out" }, t + 0.55);
      });
      tl.totalDuration(N);

      const r = () => ScrollTrigger.refresh();
      window.addEventListener("load", r);
      const tm = setTimeout(r, 600);
      return () => { window.removeEventListener("load", r); clearTimeout(tm); };
    });

    return () => mm.revert();
  }, []);
  return null;
}
