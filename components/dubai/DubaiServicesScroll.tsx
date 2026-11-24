"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TOP = 150;

export default function DubaiServicesScroll() {
  useGSAP(() => {
    const svc = document.querySelector<HTMLElement>(".dmp-svc");
    if (!svc) return;
    const tabs = Array.from(svc.querySelectorAll<HTMLButtonElement>(".dmp-tab"));
    const panes = Array.from(svc.querySelectorAll<HTMLElement>(".dmp-pane"));
    const panesEl = svc.querySelector<HTMLElement>(".dmp-panes");
    const ind = svc.querySelector<HTMLElement>(".dmp-svc-ind");
    const prog = svc.querySelector<HTMLElement>(".dmp-svc-prog i");
    const n = tabs.length;
    if (!n || panes.length !== n) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = (v: number) => (reduced ? 0 : v);
    let cur = -1;
    let jumping = false;
    let jt = 0;
    let st: ScrollTrigger | null = null;

    const parts = (p: HTMLElement) =>
      Array.from(p.querySelectorAll<HTMLElement>(".dmp-pane-h h3, .dmp-pane-h p, .dmp-pills2 li, .dmp-pane-b h4, .dmp-inc li, .dmp-bf li, .dmp-rep li"));

    const placeInd = (i: number, animate: boolean) => {
      if (!ind || i < 0) return;
      if (getComputedStyle(ind).display === "none") return;
      const t = tabs[i];
      gsap.to(ind, { y: t.offsetTop, height: t.offsetHeight, duration: animate ? dur(0.55) : 0, ease: "expo.out", overwrite: "auto" });
    };

    const show = (i: number, first = false) => {
      if (i === cur) return;
      const prev = cur;
      const dir = i > prev ? 1 : -1;
      cur = i;
      tabs.forEach((t, k) => {
        t.classList.toggle("on", k === i);
        t.setAttribute("aria-selected", String(k === i));
        t.tabIndex = k === i ? 0 : -1;
      });
      placeInd(i, !first);
      if (prog) gsap.to(prog, { scaleX: (i + 1) / n, duration: dur(0.6), ease: "expo.out", overwrite: "auto" });
      if (panesEl) gsap.to(panesEl, { "--gx": `${15 + (i / Math.max(1, n - 1)) * 70}%`, duration: dur(1), ease: "power2.out", overwrite: "auto" });

      const inn = panes[i];
      if (first) { gsap.set(panes, { autoAlpha: 0 }); gsap.set(inn, { autoAlpha: 1 }); return; }
      if (prev >= 0) gsap.to(panes[prev], { autoAlpha: 0, y: -18 * dir, scale: 0.985, duration: dur(0.28), ease: "power2.in", overwrite: true });
      gsap.fromTo(inn, { autoAlpha: 0, y: 30 * dir, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: dur(0.65), ease: "expo.out", delay: dur(0.12), overwrite: true });
      const kids = parts(inn);
      gsap.fromTo(kids, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: dur(0.6), stagger: dur(0.04), ease: "power3.out", delay: dur(0.2), overwrite: "auto" });
      const ic = inn.querySelector<HTMLElement>(".dmp-ti.lg");
      if (ic) gsap.fromTo(ic, { scale: 0.6, rotate: -14 }, { scale: 1, rotate: 0, duration: dur(0.7), ease: "back.out(2.2)", delay: dur(0.15), overwrite: "auto" });
    };

    const centerTab = (i: number) => {
      const box = tabs[i].parentElement as HTMLElement | null;
      if (box && box.scrollWidth > box.clientWidth + 2) box.scrollTo({ left: tabs[i].offsetLeft - box.clientWidth / 2 + tabs[i].offsetWidth / 2, behavior: reduced ? "auto" : "smooth" });
    };

    const canPin = () => !reduced && innerWidth >= 1024 && innerHeight >= svc.offsetHeight + TOP;

    const build = () => {
      if (!canPin()) return;
      st = ScrollTrigger.create({
        trigger: svc,
        start: `top ${TOP}px`,
        end: () => `+=${Math.round(n * innerHeight * 0.5)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          if (jumping) return;
          show(Math.min(n - 1, Math.floor(self.progress * n)));
        },
      });
    };

    /* initial state */
    show(0, true);
    build();

    const offs: Array<() => void> = [];
    const on = (t: EventTarget, ev: string, fn: EventListener) => { t.addEventListener(ev, fn); offs.push(() => t.removeEventListener(ev, fn)); };

    const select = (i: number) => {
      if (st) {
        jumping = true;
        show(i);
        const y = st.start + ((i + 0.5) / n) * (st.end - st.start);
        window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
        window.clearTimeout(jt);
        jt = window.setTimeout(() => { jumping = false; }, 1100);
      } else {
        show(i);
        centerTab(i);
      }
    };

    tabs.forEach((t, i) => {
      on(t, "click", () => select(i));
      on(t, "keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        let nx = -1;
        if (k === "ArrowDown" || k === "ArrowRight") nx = (i + 1) % n;
        if (k === "ArrowUp" || k === "ArrowLeft") nx = (i - 1 + n) % n;
        if (nx >= 0) { e.preventDefault(); tabs[nx].focus(); select(nx); }
      });
    });

    const onRefresh = () => placeInd(cur, false);
    ScrollTrigger.addEventListener("refresh", onRefresh);

    let rt = 0;
    on(window, "resize", () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        const want = canPin();
        if (want !== !!st) {
          if (st) { st.kill(true); st = null; }
          build();
          ScrollTrigger.refresh();
        }
        placeInd(cur, false);
      }, 250);
    });

    if (document.fonts) document.fonts.ready.then(() => { ScrollTrigger.refresh(); placeInd(cur, false); });
    window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(jt); window.clearTimeout(rt);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      offs.forEach((f) => f());
      if (st) st.kill(true);
    };
  }, []);

  return null;
}