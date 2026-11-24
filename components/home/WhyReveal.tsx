"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function WhyReveal() {
  useEffect(() => {
    const board = document.getElementById("wboard");
    if (!board) { console.warn("[WhyReveal] #wboard not found"); return; }
    const dmq = matchMedia("(min-width: 980px)");
    const rmq = matchMedia("(prefers-reduced-motion: reduce)");
    let kill: (() => void) | null = null;

    const setup = (): (() => void) | null => {
      const root = document.documentElement;
      const track = board.querySelector<SVGPathElement>(".wp-track");
      const items = Array.from(board.querySelectorAll<HTMLElement>(".wp-it"));
      const lns = Array.from(board.querySelectorAll(".wp-ln"));
      const joins = Array.from(board.querySelectorAll(".wp-join"));
      if (!track || !items.length) { console.warn("[WhyReveal] missing track or items"); return null; }

      const nodes = items.map((it) => it.querySelector<HTMLElement>(".wp-node")!);
      const txts = items.map((it) => it.querySelector<HTMLElement>(".wp-txt")!);

      root.classList.add("wp-js");
      gsap.set(track, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(nodes, { xPercent: -50, yPercent: -50, scale: 0.7, autoAlpha: 0, force3D: true });
      gsap.set(txts, { xPercent: -50, y: 18, autoAlpha: 0, force3D: true });
      gsap.set([...lns, ...joins], { autoAlpha: 0 });

      const D = 2.6;
      const step = D / items.length;
      const tl = gsap.timeline({ paused: true });
      tl.to(track, { strokeDashoffset: 0, duration: D, ease: "power1.inOut" }, 0);
      items.forEach((_, i) => {
        const t = i * step + step * 0.2;
        tl.to(nodes[i], { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.5)" }, t);
        if (lns[i]) tl.to(lns[i], { autoAlpha: 1, duration: 0.4 }, t + 0.25);
        if (i > 0 && joins[i - 1]) tl.to(joins[i - 1], { autoAlpha: 1, duration: 0.3 }, t - 0.1);
        tl.to(txts[i], { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, t + 0.3);
      });

      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { tl.play(); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(board);

      return () => {
        io.disconnect();
        tl.kill();
        gsap.set([track, ...nodes, ...txts, ...lns, ...joins], { clearProps: "all" });
        root.classList.remove("wp-js");
      };
    };

    const sync = () => {
      const ok = dmq.matches && !rmq.matches;
      console.info("[WhyReveal]", ok ? "active" : "skipped", { desktop: dmq.matches, reduced: rmq.matches });
      if (ok && !kill) kill = setup();
      else if (!ok && kill) { kill(); kill = null; }
    };
    sync();
    dmq.addEventListener("change", sync);
    rmq.addEventListener("change", sync);

    return () => {
      dmq.removeEventListener("change", sync);
      rmq.removeEventListener("change", sync);
      if (kill) { kill(); kill = null; }
    };
  }, []);
  return null;
}
