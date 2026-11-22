"use client";
import { useEffect } from "react";

const SEL = "#dmp-work .dmp-wk-grid";
const SPEED = 40; // px per second

export default function DmpMarquee() {
  useEffect(() => {
    const g = document.querySelector<HTMLElement>(SEL);
    if (!g) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let loop = false, period = 0, pos = 0, lastSet = 0, raf = 0, prev = performance.now();
    let hover = false, touch = false, focus = false, hold = 0, visible = true, tm = 0;
    const paused = () => hover || touch || focus || !visible || document.hidden || performance.now() < hold;
    const holdFor = (ms: number) => { hold = performance.now() + ms; };

    const evaluate = () => {
      const cards = Array.from(g.querySelectorAll<HTMLElement>(".dmp-wk-c:not(.dmp-wk-dup)"));
      let want = false;
      if (!mq.matches && cards.length > 1) {
        const first = cards[0], last = cards[cards.length - 1];
        want = last.offsetLeft + last.offsetWidth - first.offsetLeft > g.clientWidth + 8;
      }
      if (want) {
        g.classList.add("is-loop");
        const d = g.querySelector<HTMLElement>(".dmp-wk-dup");
        period = d ? d.offsetLeft - cards[0].offsetLeft : 0;
        if (period <= 0) { want = false; g.classList.remove("is-loop"); }
      } else {
        g.classList.remove("is-loop");
      }
      if (want && !loop) { pos = g.scrollLeft; lastSet = pos; }
      if (!want && loop) g.scrollLeft = 0;
      loop = want;
    };
    const schedule = (ms = 600) => { window.clearTimeout(tm); tm = window.setTimeout(evaluate, ms); };

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - prev) / 1000); prev = t;
      if (loop && period > 0) {
        if (Math.abs(g.scrollLeft - lastSet) > 1.5) pos = g.scrollLeft;
        if (!paused()) { pos += SPEED * dt; g.scrollLeft = pos; }
        const sl = g.scrollLeft;
        if (sl >= period) { g.scrollLeft = sl - period; pos = g.scrollLeft; }
        else if (sl <= 0.5 && paused()) { g.scrollLeft = sl + period; pos = g.scrollLeft; }
        lastSet = g.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };

    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") hover = true; };
    const leave = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = false; holdFor(800); } };
    const tStart = () => { touch = true; };
    const tEnd = () => { touch = false; holdFor(1800); };
    const wheel = () => holdFor(1800);
    const fIn = () => { focus = true; };
    const fOut = () => { focus = false; holdFor(800); };
    g.addEventListener("pointerenter", enter);
    g.addEventListener("pointerleave", leave);
    g.addEventListener("touchstart", tStart, { passive: true });
    g.addEventListener("touchend", tEnd, { passive: true });
    g.addEventListener("touchcancel", tEnd, { passive: true });
    g.addEventListener("wheel", wheel, { passive: true });
    g.addEventListener("focusin", fIn);
    g.addEventListener("focusout", fOut);

    const mo = new MutationObserver(() => schedule());
    mo.observe(g, { childList: true });
    const ro = new ResizeObserver(() => schedule(200));
    ro.observe(g);
    const io = new IntersectionObserver((en) => { visible = en[0]?.isIntersecting ?? true; }, { threshold: 0 });
    io.observe(g);
    const onMq = () => schedule(0);
    mq.addEventListener("change", onMq);

    schedule(150);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); window.clearTimeout(tm);
      g.classList.remove("is-loop");
      g.removeEventListener("pointerenter", enter);
      g.removeEventListener("pointerleave", leave);
      g.removeEventListener("touchstart", tStart);
      g.removeEventListener("touchend", tEnd);
      g.removeEventListener("touchcancel", tEnd);
      g.removeEventListener("wheel", wheel);
      g.removeEventListener("focusin", fIn);
      g.removeEventListener("focusout", fOut);
      mo.disconnect(); ro.disconnect(); io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);
  return null;
}