"use client";
import { useEffect } from "react";

const SEL = "#dmp-work .dmp-wk-grid";

export default function DragScroll() {
  useEffect(() => {
    let el: HTMLElement | null = null;
    let down = false, moved = false, sx = 0, sl = 0;
    const grid = (t: EventTarget | null) => ((t as HTMLElement | null)?.closest?.(SEL) as HTMLElement | null);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const g = grid(e.target);
      if (!g) return;
      el = g; down = true; moved = false; sx = e.clientX; sl = g.scrollLeft;
      g.style.scrollBehavior = "auto";
      g.style.scrollSnapType = "none";
      g.classList.add("is-drag");
    };
    const onMove = (e: PointerEvent) => {
      if (!down || !el) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 5) moved = true;
      el.scrollLeft = sl - dx;
    };
    const onUp = () => {
      if (!el) return;
      el.style.scrollBehavior = "";
      el.style.scrollSnapType = "";
      el.classList.remove("is-drag");
      down = false; el = null;
    };
    const onClick = (e: MouseEvent) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    };
    const onWheel = (e: WheelEvent) => {
      const g = grid(e.target);
      if (!g) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad sideways: native
      const max = g.scrollWidth - g.clientWidth;
      if (max <= 0) return;
      if ((e.deltaY < 0 && g.scrollLeft <= 0) || (e.deltaY > 0 && g.scrollLeft >= max - 1)) return; // at an edge: let the page scroll
      e.preventDefault();
      g.style.scrollBehavior = "auto";
      g.scrollLeft += e.deltaY;
    };

    document.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.addEventListener("click", onClick, true);
    document.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("wheel", onWheel);
    };
  }, []);
  return null;
}