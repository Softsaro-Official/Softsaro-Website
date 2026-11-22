"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const S = "https://softsaro.com.np";
const HEAD = ["Have", "a", "project", "in", "mind?"];
const WORD = "SOFTSARO".split("");
const MAPS = "https://www.google.com/maps/search/?api=1&query=Trade+Tower%2C+5th+Floor+-+Thapathali";

type L = { t: string; href: string; ext?: boolean; next?: boolean };
const COLS: [string, L[]][] = [
  ["Company", [
    { t: "About Us", href: "/about-us", next: true }, { t: "Portfolio", href: `${S}/portfolio` },
    { t: "Our Team", href: "/our-team", next: true }, { t: "Careers", href: "/career#apply", next: true },
    { t: "Contact", href: `${S}/contact` },
  ]],
  ["Services", [
    { t: "Web Development", href: `${S}/services/web-development-in-nepal` },
    { t: "App Development", href: "/mobile-app-development", next: true },
    { t: "UI/UX Design", href: `${S}/services/ui-ux-design-in-nepal` },
    { t: "Advanced SEO", href: `${S}/services/best-seo-agency-in-nepal` },
    { t: "Dubai Marketing", href: "/services/digital-marketing-dubai", next: true },
    { t: "Domain & Hosting", href: `${S}/services/domain-and-hosting-in-nepal` },
  ]],
  ["Resources", [
    { t: "Insights", href: "/blog", next: true },
    { t: "SEO Training", href: "/seo-training", next: true },
    { t: "Digital Marketing", href: "/digital-marketing-training", next: true },
  ]],
  ["Contact", [
    { t: "9818439664", href: "tel:9818439664" },
    { t: "Trade Tower, 5th Floor \u2013 Thapathali", href: MAPS, ext: true },
  ]],
];

// per-letter entrance paths (alternating up/down, different tilt and skew)
const LP = {
  y: [115, -115, 120, -120, 115, -115, 120, -120],
  rx: [-80, 70, -60, 80, -70, 60, -80, 70],
  rz: [-12, 9, -7, 11, -9, 8, -11, 7],
  sk: [8, -8, 6, -6, 8, -8, 6, -6],
};

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  const toTop = () => {
    const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { jump(0); return; }
    const o = { y: window.scrollY };
    const stop = () => tw.kill();
    const tw = gsap.to(o, { y: 0, duration: 1.4, ease: "power3.inOut", onUpdate: () => jump(o.y) });
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
  };

  useGSAP(() => {
    const r = root.current!;
    const el = (s: string) => r.querySelector<HTMLElement>(s)!;
    const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, r);
    el("[data-year]").textContent = String(new Date().getFullYear());

    // fit the wordmark to the footer width
    const wm = el(".sf-wm"), inner = el(".sf-wm-in");
    const fit = () => {
      const cs = getComputedStyle(wm);
      const avail = wm.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      inner.style.fontSize = "100px";
      const w = inner.offsetWidth;
      if (w > 0 && avail > 0) inner.style.fontSize = (100 * avail) / w + "px";
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(wm);

    const mm = gsap.matchMedia(r);
    mm.add({ ok: "(prefers-reduced-motion: no-preference)", fine: "(hover:hover) and (pointer:fine)" }, (ctx) => {
      const { ok, fine } = ctx.conditions as { ok: boolean; fine: boolean };
      if (!ok) return;
      const offs: Array<() => void> = [];
      const on = (t: EventTarget, e: string, f: (e: any) => void) => { t.addEventListener(e, f); offs.push(() => t.removeEventListener(e, f)); };
      const clamp = gsap.utils.clamp;

      /* 1. border lines draw with the scroll, then a light glint travels along them */
      q(".sf-line").forEach((l) => {
        gsap.fromTo(l, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: l, start: "top 96%", end: "top 62%", scrub: 0.6 } });
        const g = l.querySelector<HTMLElement>("i");
        if (g) gsap.fromTo(g, { left: "-15%" }, { left: "110%", duration: 2.6, ease: "power2.inOut", repeat: -1, repeatDelay: 2.6, scrollTrigger: { trigger: l, start: "top 92%", toggleActions: "play pause resume pause" } });
      });

      /* 2. CTA: eyebrow slides, headline words swing up from their baseline, then the rest */
      const words = q(".sf-hw");
      gsap.timeline({ scrollTrigger: { trigger: el(".sf-cta"), start: "top 80%" } })
        .from(el(".sf-eyebrow"), { x: -24, opacity: 0, duration: 0.8, ease: "expo.out" })
        .from(words, { yPercent: 120, rotate: 7, transformOrigin: "0% 100%", duration: 1.3, stagger: 0.09, ease: "expo.out" }, "-=.5")
        .from(q("[data-sf=up]"), { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: "expo.out" }, "-=.9");
      gsap.to(el(".sf-h"), { y: -26, ease: "none", scrollTrigger: { trigger: r, start: "top bottom", end: "top 20%", scrub: true } });

      /* 3. columns: each reveals with its own timing (clip-path wipe), and drifts at its own depth */
      const cols = q(".sf-col"), wrap = el(".sf-cols");
      const T: [number, number][] = [[0, 1.1], [0.12, 1.25], [0.24, 1.0], [0.36, 1.3], [0.5, 1.15]];
      const depth = [30, 64, 22, 72, 44];
      const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top 84%" } });
      cols.forEach((c, i) => {
        const items = i === 0 ? Array.from(c.children) as HTMLElement[] : [c.querySelector<HTMLElement>("h4")!, ...Array.from(c.querySelectorAll<HTMLElement>(".sf-links a"))];
        tl.fromTo(items, { clipPath: "inset(0 0 100% 0)", y: 18 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: T[i][1], stagger: 0.06 + i * 0.012, ease: "expo.out", clearProps: "clipPath,transform" }, T[i][0]);
        gsap.fromTo(c, { y: depth[i] }, { y: 0, ease: "none", scrollTrigger: { trigger: wrap, start: "top 100%", end: "top 45%", scrub: 0.8 } });
      });
      gsap.fromTo(el(".sf-glow"), { yPercent: 8 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: r, start: "top bottom", end: "bottom bottom", scrub: true } });

      /* 4. transition into the wordmark: purple light blooms, the word tilts up out of depth */
      gsap.fromTo(el(".sf-bloom"), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: wm, start: "top 100%", end: "top 40%", scrub: 0.8 } });
      gsap.set(inner, { transformPerspective: 900, transformOrigin: "50% 100%" });
      gsap.fromTo(inner, { rotationX: 28, scale: 0.92, yPercent: 6 }, { rotationX: 0, scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: wm, start: "top 100%", end: "top 45%", scrub: 0.8 } });

      /* 5. wordmark entrance: every letter takes its own 3D path, blooming out from the centre */
      const letters = q(".sf-l");
      let active = false;
      gsap.set(letters, { transformPerspective: 700 });
      gsap.timeline({ scrollTrigger: { trigger: wm, start: "top 92%" }, onComplete: () => { active = true; } })
        .from(letters, {
          yPercent: (i) => LP.y[i % 8], rotationX: (i) => LP.rx[i % 8], rotationZ: (i) => LP.rz[i % 8], skewY: (i) => LP.sk[i % 8],
          scaleY: 1.35, opacity: 0, transformOrigin: "50% 100%", duration: 1.5, ease: "expo.out", stagger: { each: 0.075, from: "center" },
        })
        .to(letters, { color: "#bcb9e0", duration: 0.28, stagger: { each: 0.07, from: "start" }, yoyo: true, repeat: 1, ease: "sine.inOut" }, "-=.5");
      gsap.from(q(".sf-bar > *"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: el(".sf-bar"), start: "top 98%" } });

      /* 6. hover: button fill grows from the pointer entry point (works for touch too) */
      q(".sf-btn").forEach((b) => {
        const f = b.querySelector<HTMLElement>(".sf-fill")!;
        gsap.set(f, { xPercent: -50, yPercent: -50, scale: 0 });
        const place = (e: PointerEvent) => { const bb = b.getBoundingClientRect(); f.style.left = e.clientX - bb.left + "px"; f.style.top = e.clientY - bb.top + "px"; };
        on(b, "pointerenter", (e) => { place(e); gsap.to(f, { scale: 1, duration: 0.8, ease: "expo.out", overwrite: true }); });
        on(b, "pointerleave", (e) => { place(e); gsap.to(f, { scale: 0, duration: 0.6, ease: "expo.inOut", overwrite: true }); });
      });
      q(".sf-s").forEach((s) => {
        const ic = s.querySelector("svg")!;
        on(s, "pointerenter", () => { gsap.fromTo(ic, { rotate: -25, scale: 0.7 }, { rotate: 0, scale: 1, duration: 0.7, ease: "back.out(3)", overwrite: true }); });
      });
      const top = el(".sf-top"), arrow = top.querySelector("svg")!;
      on(top, "pointerenter", () => { gsap.timeline().to(arrow, { yPercent: -160, duration: 0.25, ease: "power2.in" }).fromTo(arrow, { yPercent: 160 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }); });

      if (fine) {
        /* 7. magnetic pull on buttons, icons, back-to-top; subtle pull on links */
        const magnet = (t: HTMLElement, str: number, inn?: Element | null, istr = 0.5) => {
          const x = gsap.quickTo(t, "x", { duration: 0.9, ease: "elastic.out(1,.45)" }), y = gsap.quickTo(t, "y", { duration: 0.9, ease: "elastic.out(1,.45)" });
          const ix = inn ? gsap.quickTo(inn, "x", { duration: 0.7, ease: "power3" }) : null, iy = inn ? gsap.quickTo(inn, "y", { duration: 0.7, ease: "power3" }) : null;
          on(t, "pointermove", (e: PointerEvent) => {
            const b = t.getBoundingClientRect(), dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
            x(dx * str); y(dy * str); ix?.(dx * istr * str); iy?.(dy * istr * str);
          });
          on(t, "pointerleave", () => { x(0); y(0); ix?.(0); iy?.(0); });
        };
        q(".sf-btn").forEach((b) => magnet(b, 0.3, b.querySelector(".sf-bt"), 0.6));
        q(".sf-s").forEach((s) => magnet(s, 0.4, s.querySelector("svg"), 0.5));
        magnet(top, 0.28, top.querySelector("i"), 0.4);
        q(".sf-links a").forEach((a) => {
          const x = gsap.quickTo(a, "x", { duration: 0.6, ease: "power3" });
          on(a, "pointermove", (e: PointerEvent) => { const b = a.getBoundingClientRect(); x(clamp(-4, 4, (e.clientX - (b.left + b.width / 2)) * 0.06)); });
          on(a, "pointerleave", () => x(0));
        });

        /* 8. cursor light + wordmark letters turn toward the pointer and lift */
        const spot = el(".sf-spot");
        const sx = gsap.quickTo(spot, "x", { duration: 0.8, ease: "power3" }), sy = gsap.quickTo(spot, "y", { duration: 0.8, ease: "power3" });
        const set = letters.map((l) => ({
          y: gsap.quickTo(l, "y", { duration: 0.7, ease: "power3" }), x: gsap.quickTo(l, "x", { duration: 0.7, ease: "power3" }),
          ry: gsap.quickTo(l, "rotationY", { duration: 0.8, ease: "power3" }), s: gsap.quickTo(l, "scale", { duration: 0.7, ease: "power3" }),
        }));
        const rest = () => set.forEach((o) => { o.y(0); o.x(0); o.ry(0); o.s(1); });
        on(r, "pointerenter", () => { gsap.to(spot, { opacity: 1, duration: 0.6 }); });
        on(r, "pointerleave", () => { gsap.to(spot, { opacity: 0, duration: 0.8 }); rest(); });
        on(r, "pointermove", (e: PointerEvent) => {
          const rb = r.getBoundingClientRect();
          sx(e.clientX - rb.left); sy(e.clientY - rb.top);
          if (!active) return;
          const fs = parseFloat(inner.style.fontSize) || 100;
          letters.forEach((l, i) => {
            const b = l.getBoundingClientRect();
            const dx = (e.clientX - (b.left + b.width / 2)) / b.width, dy = (e.clientY - (b.top + b.height / 2)) / b.height;
            const f = Math.exp(-(dx * dx) / 1.1 - (dy * dy) / 3), k = clamp(-1.5, 1.5, dx);
            set[i].y(-f * fs * 0.06); set[i].x(k * f * fs * 0.015); set[i].ry(k * f * 34); set[i].s(1 + f * 0.07);
          });
        });
      }
      return () => offs.forEach((f) => f());
    });

    return () => { mm.revert(); ro.disconnect(); };
  }, { scope: root });

  const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>;

  return (
    <footer className="sf" ref={root}>
      <div className="sf-glow" aria-hidden="true" />
      <div className="sf-spot" aria-hidden="true" />
      <div className="sf-bloom" aria-hidden="true" />
      <div className="sf-in">
        <div className="sf-cta">
          <div>
            <p className="sf-eyebrow">Let&rsquo;s talk</p>
            <h2 className="sf-h" aria-label="Have a project in mind?">
              {HEAD.map((w) => <span className="sf-hm" key={w} aria-hidden="true"><span className="sf-hw">{w}</span></span>)}
            </h2>
          </div>
          <div className="sf-cta-r">
            <p data-sf="up">Tell us about your web, app, design or SEO project and talk directly with the people who will build it.</p>
            <div className="sf-btns" data-sf="up">
              <a className="sf-btn" href={`${S}/contact`}><span className="sf-fill" /><span className="sf-bt">Start a project</span><Arrow /></a>
              <a className="sf-call" href="tel:9818439664">Call 9818439664</a>
            </div>
          </div>
        </div>
        <span className="sf-line"><i /></span>
        <div className="sf-cols">
          <div className="sf-col sf-brand">
            <a href="/" className="logo inv" aria-label="Softsaro">
              SOFTSARO
            </a>
            <p>Global IT company with offices in Nepal &amp; USA. 8+ years delivering web development, mobile apps, SEO and digital marketing.</p>
            <div className="sf-soc">
              <a className="sf-s" href="https://www.facebook.com/softsaronepal" target="_blank" rel="noopener noreferrer" aria-label="Softsaro on Facebook"><svg viewBox="0 0 24 24"><path d="M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.200H8v3h2.500V21z" /></svg></a>
              <a className="sf-s" href="https://www.linkedin.com/company/softsaro/" target="_blank" rel="noopener noreferrer" aria-label="Softsaro on LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.980 3.500a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.500h4V21H3zM9.5 9.500h3.800v1.600h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.800s-2 1.3-2 2.700V21h-4z" /></svg></a>
            </div>
          </div>
          {COLS.map(([title, items]) => (
            <div className="sf-col" key={title}>
              <h4>{title}</h4>
              <div className="sf-links">
                {items.map((l) => l.next
                  ? <Link key={l.t} href={l.href}>{l.t}</Link>
                  : <a key={l.t} href={l.href} {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{l.t}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sf-wm" aria-hidden="true">
        <div className="sf-wm-in">{WORD.map((c, i) => <span className="sf-wm-m" key={i}><span className="sf-l">{c}</span></span>)}</div>
      </div>
      <div className="sf-in">
        <span className="sf-line"><i /></span>
        <div className="sf-bar">
          <span>&copy; <span data-year suppressHydrationWarning>2026</span> Softsaro. All Rights Reserved.</span>
          <a href={`${S}/privacypolicy`}>Privacy Policy</a>
          <button type="button" className="sf-top" onClick={toTop} aria-label="Back to top"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg></i></button>
        </div>
      </div>
      {/* hidden stand-ins so older homepage footer motion code finds its targets */}
      <div className="fgrid" style={{ display: "none" }} aria-hidden="true"><div><a href="#top">.</a></div></div>
      <div className="giant" style={{ display: "none" }} aria-hidden="true">SOFTSARO</div>
    </footer>
  );
}
