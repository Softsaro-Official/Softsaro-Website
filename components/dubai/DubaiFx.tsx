"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DubaiFx() {
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector<HTMLElement>(".dmp-page");
    if (!root) return;
    const all = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

    const tl = root.querySelector<HTMLElement>(".dmp-tl");
    const steps = root.querySelector<HTMLElement>(".dmp-steps");
    if (tl && steps) gsap.fromTo(tl, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: steps, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });

    all(".dmp-orb").forEach((o, i) => gsap.to(o, { yPercent: i ? -25 : 30, ease: "none", scrollTrigger: { trigger: ".dmp-hero", start: "top top", end: "bottom top", scrub: true } }));

    all(".dmp-dark").forEach((sec) => {
      gsap.fromTo(sec, { clipPath: "inset(3% 2.5% 0% 2.5% round 36px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: sec, start: "top 95%", end: "top 35%", scrub: true } });
    });

    all(".dmp-bento > img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  return null;
}