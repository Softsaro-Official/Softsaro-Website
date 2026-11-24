"use client";
import { useEffect } from "react";

export default function PvGuard() {
  useEffect(() => {
    const root = document.documentElement;
    let x = -1, y = -1;
    const check = () => {
      const el = x < 0 ? null : document.elementFromPoint(x, y);
      root.classList.toggle("pv-off", !(el && el.closest(".work-showcase")));
    };
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; check(); };
    const leave = () => { x = -1; check(); };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    document.addEventListener("mouseleave", leave);
    check();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", check);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);
  return null;
}