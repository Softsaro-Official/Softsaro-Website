"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CardsMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const deck = document.querySelector<HTMLElement>(".project-deck");
    if (!deck) return;

    const mm = gsap.matchMedia();

    // SIDE FADE: 02 + 01 from the left, 03 + 04 from the right, in and out
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(deck.querySelectorAll(".deck-card:not(.deck-more)"));
      // visual order left to right: card-2, card-1, card-3, card-4
      const order = ["card-2", "card-1", "card-3", "card-4"];
      const info = cards.map((card) => {
        const idx = Math.max(0, order.findIndex((c) => card.classList.contains(c)));
        return { card, idx, dir: idx < 2 ? -1 : 1 };
      });
      const dist = () => window.innerWidth;
      info.forEach(({ card, dir }) => gsap.set(card, { opacity: 0, x: dir * dist() }));

      const show = () => info.forEach(({ card, idx }) =>
        gsap.to(card, { opacity: 1, x: 0, duration: 1.7, delay: idx * 0.12, ease: "power3.out", overwrite: "auto" }));
      const hide = () => info.forEach(({ card, dir }) =>
        gsap.to(card, { opacity: 0, x: dir * dist(), duration: 1.1, delay: 0, ease: "power2.inOut", overwrite: "auto" }));

      ScrollTrigger.create({
        trigger: deck,
        start: "top 80%",
        end: "bottom top",
        onEnter: show,
        onEnterBack: show,
        onLeave: hide,
        onLeaveBack: hide,
      });
    });

    // HOVER: tilt on 02-04 only
    mm.add("(min-width: 1025px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = [];
      const cards = gsap.utils.toArray<HTMLElement>(deck.querySelectorAll(".deck-card:not(.deck-more)"));
      cards.forEach((card) => {
        if (card.classList.contains("is-featured")) return;
        let rect: DOMRect | null = null;
        const move = (e: MouseEvent) => {
          const r = rect || (rect = card.getBoundingClientRect());
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotationY: px * 8, rotationX: -py * 6, transformPerspective: 900, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        };
        const leave = () => {
          rect = null;
          gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        };
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); });
      });
      return () => cleanups.forEach((fn) => fn());
    });

    // FOCUS HOVER: hovered card maximizes, the others shrink and dim
    mm.add("(min-width: 1025px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(deck.querySelectorAll(".deck-card:not(.deck-more)"));
      const inner = (c: HTMLElement) => c.querySelectorAll<HTMLElement>(".pm");
      const focus = (active: HTMLElement) => {
        cards.forEach((c) => {
          const on = c === active;
          gsap.to(c, { scale: on ? (c.classList.contains("is-featured") ? 1.04 : 1.1) : 0.94, zIndex: on ? 5 : 1, duration: 0.7, ease: "power3.out", overwrite: "auto" });
          gsap.to(inner(c), { opacity: on ? 1 : 0.55, duration: 0.7, ease: "power3.out", overwrite: "auto" });
        });
      };
      const reset = () => {
        cards.forEach((c) => {
          gsap.to(c, { scale: 1, zIndex: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
          gsap.to(inner(c), { opacity: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
        });
      };
      const offs: Array<() => void> = [];
      cards.forEach((c) => {
        const h = () => focus(c);
        c.addEventListener("mouseenter", h);
        c.addEventListener("mouseleave", reset);
        offs.push(() => { c.removeEventListener("mouseenter", h); c.removeEventListener("mouseleave", reset); });
      });
      deck.addEventListener("mouseleave", reset);
      return () => {
        offs.forEach((fn) => fn());
        deck.removeEventListener("mouseleave", reset);
        reset();
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}