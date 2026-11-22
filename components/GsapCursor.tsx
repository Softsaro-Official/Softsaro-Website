"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TRAIL = 5;
const NATIVE =
  'input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=range]), textarea, select, [contenteditable="true"]';
const IMAGE = 'img, picture, video, [role="img"], [data-cursor="image"]';
const LINK = 'a[href], button, [role="button"], summary, label, [data-cursor="link"]';

type State = "idle" | "link" | "image" | "native";
const CFG: Record<State, { scale: number; bg: string; br: string; dot: number; spin: number; op: number }> = {
  idle: { scale: 1, bg: "rgba(106,103,174,0)", br: "50%", dot: 1, spin: 1, op: 1 },
  link: { scale: 1.75, bg: "rgba(106,103,174,.14)", br: "50%", dot: 0.45, spin: 2.6, op: 1 },
  image: { scale: 2.5, bg: "rgba(106,103,174,.2)", br: "22%", dot: 0, spin: 0.35, op: 1 },
  native: { scale: 1, bg: "rgba(106,103,174,0)", br: "50%", dot: 0, spin: 1, op: 0 },
};

/**
 * Reusable GSAP cursor: precise dot + lagging ring (quickTo), orbiting marker, motion trail,
 * and link / image / native-input states. Mounted once in the root layout.
 * The homepage ("/") keeps its own approved cursor, so this stays off there.
 */
export default function GsapCursor() {
  const pathname = usePathname();
  const [capable, setCapable] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCapable(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  const enabled = capable && pathname !== "/";

  useGSAP(
    (_ctx, contextSafe) => {
      const el = root.current;
      if (!enabled || !el || !contextSafe) return;
      const safe = contextSafe;
      const $ = <T extends Element>(s: string) => el.querySelector(s) as T;
      const ring = $<HTMLElement>(".gc-ring"), ringIn = $<HTMLElement>(".gc-ring-in");
      const dot = $<HTMLElement>(".gc-dot"), dotIn = $<HTMLElement>(".gc-dot-in");
      const orbit = $<HTMLElement>(".gc-orbit"), label = $<HTMLElement>(".gc-label");
      const trails = Array.from(el.querySelectorAll<HTMLElement>(".gc-t"));
      const all = [ring, dot, ...trails];
      const html = document.documentElement;
      const offs: (() => void)[] = [];
      const on = (t: EventTarget, e: string, f: EventListener, o?: AddEventListenerOptions) => {
        t.addEventListener(e, f, o);
        offs.push(() => t.removeEventListener(e, f, o));
      };

      html.classList.add("gc-on");
      gsap.set(all, { xPercent: -50, yPercent: -50, opacity: 0 });
      gsap.set(trails, { scale: (i: number) => 1 - i * 0.14 });

      const rx = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3" });
      const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2" });
      const tq = trails.map((t, i) => ({
        x: gsap.quickTo(t, "x", { duration: 0.2 + i * 0.1, ease: "power2.out" }),
        y: gsap.quickTo(t, "y", { duration: 0.2 + i * 0.1, ease: "power2.out" }),
      }));
      const spin = gsap.to(orbit, { rotation: 360, duration: 3.2, ease: "none", repeat: -1 });

      let shown = false, trailOn = false, state: State = "idle", base = 1, down = false;
      const idle = gsap.delayedCall(0.14, () => {
        trailOn = false;
        gsap.to(trails, { opacity: 0, duration: 0.5, overwrite: "auto" });
      });
      idle.pause();

      const setState = safe((s: State, lab = "") => {
        if (s === state && label.textContent === lab) return;
        state = s;
        const c = CFG[s];
        base = c.scale;
        gsap.to(ringIn, {
          scale: down ? base * 0.8 : base, backgroundColor: c.bg, borderRadius: c.br, opacity: c.op,
          borderWidth: 1.5 / c.scale, duration: 0.55, ease: s === "link" ? "back.out(1.7)" : "power3.out", overwrite: "auto",
        });
        gsap.to(dotIn, { scale: c.dot, opacity: s === "native" ? 0 : 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(spin, { timeScale: c.spin, duration: 0.6, overwrite: true });
        label.textContent = lab;
        gsap.to(label, { opacity: lab ? 1 : 0, scale: 1 / c.scale, duration: 0.4, overwrite: "auto" });
      });

      const onMove = safe((e: PointerEvent) => {
        if (e.pointerType && e.pointerType !== "mouse") return;
        if (!shown) {
          shown = true;
          gsap.set(all, { x: e.clientX, y: e.clientY });
          gsap.to([ring, dot], { opacity: 1, duration: 0.35, overwrite: "auto" });
        }
        rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
        tq.forEach((q) => { q.x(e.clientX); q.y(e.clientY); });
        if (!trailOn) {
          trailOn = true;
          gsap.to(trails, { opacity: (i: number) => 0.42 - i * 0.07, duration: 0.15, overwrite: "auto" });
        }
        idle.restart(true);
      });

      const onOver = safe((e: MouseEvent) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest(NATIVE)) return setState("native");
        if (t.closest(IMAGE)) {
          const l = (t.closest("[data-cursor-label]") as HTMLElement | null)?.dataset.cursorLabel || "";
          return setState("image", l);
        }
        setState(t.closest(LINK) ? "link" : "idle");
      });

      const press = safe((v: boolean) => {
        down = v;
        gsap.to(ringIn, { scale: v ? base * 0.8 : base, duration: v ? 0.2 : 0.5, ease: v ? "power2.out" : "back.out(2)", overwrite: "auto" });
      });
      const leave = safe(() => {
        shown = false;
        gsap.to(all, { opacity: 0, duration: 0.3, overwrite: "auto" });
      });

      on(window, "pointermove", onMove as EventListener, { passive: true });
      on(document, "mouseover", onOver as EventListener, { passive: true });
      on(window, "mousedown", (() => press(true)) as EventListener);
      on(window, "mouseup", (() => press(false)) as EventListener);
      on(html, "mouseleave", leave as EventListener);

      return () => {
        offs.forEach((f) => f());
        idle.kill();
        spin.kill();
        html.classList.remove("gc-on");
      };
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  if (!enabled) return null;
  return (
    <div ref={root} className="gc-root" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => <i key={i} className="gc-t" />)}
      <div className="gc-ring">
        <div className="gc-ring-in">
          <span className="gc-orbit"><b /></span>
          <span className="gc-label" />
        </div>
      </div>
      <div className="gc-dot"><div className="gc-dot-in" /></div>
    </div>
  );
}
