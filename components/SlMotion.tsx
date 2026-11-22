"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SlMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(".sl-page");
    if (!root) return;
    const all = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const one = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: Array<() => void> = [];
    const on = (t: EventTarget, ev: string, fn: EventListener) => {
      t.addEventListener(ev, fn);
      offs.push(() => t.removeEventListener(ev, fn));
    };
    const pe = (e: Event) => e as PointerEvent;
    const dur = (n: number) => (reduced ? 0 : n);
    const enter = (el: Element, start: string, fn: () => void) =>
      ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });

    /* ===== always on: FAQ, concept tabs, local areas, compare toggle ===== */
    const fqs = all<HTMLButtonElement>(".sl-fq");
    const fa = (b: HTMLElement) => b.nextElementSibling as HTMLElement;
    const setOpen = (b: HTMLElement, open: boolean) => {
      b.setAttribute("aria-expanded", String(open));
      gsap.to(fa(b), { height: open ? "auto" : 0, duration: dur(open ? 0.7 : 0.45), ease: "power3.out", overwrite: "auto" });
    };
    fqs.forEach((b, i) => {
      b.setAttribute("aria-expanded", String(i === 0));
      gsap.set(fa(b), { height: i === 0 ? "auto" : 0 });
      on(b, "click", () => {
        const open = b.getAttribute("aria-expanded") === "true";
        fqs.forEach((o) => { if (o !== b && o.getAttribute("aria-expanded") === "true") setOpen(o, false); });
        setOpen(b, !open);
      });
    });

    const tabs = all<HTMLButtonElement>(".sl-tab");
    const panes = all(".sl-pane");
    const big = one(".sl-big");
    let tcur = 0;
    panes.forEach((p, k) => gsap.set(p, { display: k === 0 ? "block" : "none" }));
    tabs.forEach((t, i) => on(t, "click", () => {
      if (i === tcur) return;
      const out = panes[tcur], inn = panes[i];
      tabs.forEach((x, k) => { x.classList.toggle("on", k === i); x.setAttribute("aria-selected", String(k === i)); });
      if (big) {
        gsap.fromTo(big, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: dur(0.7), ease: "expo.out" });
        big.textContent = t.dataset.big || "";
      }
      gsap.killTweensOf([out, inn]);
      gsap.to(out, { autoAlpha: 0, y: -14, duration: dur(0.25), ease: "power2.in", onComplete: () => {
        gsap.set(out, { display: "none" });
        gsap.set(inn, { display: "block" });
        gsap.fromTo(inn, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: dur(0.6), ease: "expo.out" });
      } });
      tcur = i;
    }));

    const chs = all<HTMLButtonElement>(".sl-ch");
    const dots = all<SVGGElement>(".sl-dot");
    const info = one(".sl-loc-info");
    const pick = (i: number) => {
      chs.forEach((c, k) => c.classList.toggle("on", k === i));
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
      const h = info && info.querySelector("h3");
      if (h && chs[i]) h.textContent = chs[i].dataset.n || "";
      if (info) gsap.fromTo(info, { autoAlpha: 0.2, y: 10 }, { autoAlpha: 1, y: 0, duration: dur(0.5), ease: "expo.out" });
    };
    dots[5] && dots[5].classList.add("on");
    chs.forEach((c, i) => {
      on(c, "click", () => pick(i));
      on(c, "focus", () => pick(i));
      if (fine) on(c, "pointerenter", () => pick(i));
    });

    const table = one(".sl-table");
    all<HTMLButtonElement>(".sl-ct").forEach((b) => on(b, "click", () => {
      all(".sl-ct").forEach((x) => x.classList.toggle("on", x === b));
      if (table) table.setAttribute("data-col", b.dataset.c || "3");
    }));

    /* ===== testimonials progress (no animation needed) ===== */
    const tq = one(".sl-tq"), prog = one(".sl-tq-prog i");
    if (tq && prog) {
      const upd = () => {
        const mx = tq.scrollWidth - tq.clientWidth;
        (prog as HTMLElement).style.transform = `scaleX(${0.12 + 0.88 * (mx > 0 ? tq.scrollLeft / mx : 0)})`;
      };
      on(tq, "scroll", upd);
      upd();
    }

    if (reduced) {
      all<SVGSVGElement>("svg").forEach((s) => s.pauseAnimations && s.pauseAnimations());
      return () => offs.forEach((f) => f());
    }

    /* ===== smooth scroll ===== */
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains("menu-is-open")) lenis.stop(); else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    /* ===== pointer helpers (mouse only; touch gets the plain layout) ===== */
    if (fine) {
      all("[data-spot]").forEach((el) => on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${pe(e).clientX - r.left}px`);
        el.style.setProperty("--my", `${pe(e).clientY - r.top}px`);
      }));
      all("[data-tilt]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          rx(-((pe(e).clientY - r.top) / r.height - 0.5) * 9);
          ry(((pe(e).clientX - r.left) / r.width - 0.5) * 11);
        });
        on(el, "pointerleave", () => { rx(0); ry(0); });
      });
      all("[data-mag]").forEach((el) => {
        const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,.5)" });
        const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          qx((pe(e).clientX - r.left - r.width / 2) * 0.28);
          qy((pe(e).clientY - r.top - r.height / 2) * 0.34);
        });
        on(el, "pointerleave", () => { qx(0); qy(0); });
      });
    }

    /* ===== HERO: query types, a result climbs to #1, AI answer cites it ===== */
    const h1 = one(".sl-h1");
    const words = all(".sl-h1 .sl-w");
    const copyIn = all(".sl-hero-copy [data-in]").filter((e) => e !== h1);
    const serp = one(".sl-serp"), ai = one(".sl-ai"), chartc = one(".sl-chartc");
    const chips = all(".sl-chip");
    const typed = one(".sl-typed");
    const QUERY = typed ? typed.textContent || "" : "";
    const rows = all(".sl-row");
    const me = one(".sl-row.me"), rk = one(".sl-rk");
    const line = one<SVGPathElement>(".sl-line"), area = one(".sl-area"), dotp = one(".sl-dotp");
    const aiLines = all(".sl-ai-l"), aiSrc = one(".sl-ai-src");
    let ready = false;

    if (typed) typed.textContent = "";
    if (line) gsap.set(line, { strokeDashoffset: 1 });
    if (area) gsap.set(area, { autoAlpha: 0 });
    if (dotp) gsap.set(dotp, { autoAlpha: 0 });
    gsap.set(aiLines, { scaleX: 0, transformOrigin: "0% 50%" });
    if (aiSrc) gsap.set(aiSrc, { autoAlpha: 0, y: 8 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (h1) tl.set(h1, { autoAlpha: 1 }, 0);
    if (words.length) tl.fromTo(words, { yPercent: 120, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.05, transformOrigin: "0% 100%" }, 0.1);
    if (copyIn.length) tl.fromTo(copyIn, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 0.5);
    if (serp) tl.fromTo(serp, { y: 60, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 1.2 }, 0.5);
    if (typed) {
      const o = { n: 0 };
      tl.to(o, { n: QUERY.length, duration: 1.2, ease: "none", onUpdate: () => { typed.textContent = QUERY.slice(0, Math.round(o.n)); } }, 1.1);
    }
    if (ai) tl.fromTo(ai, { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.1 }, 1.4);
    if (chartc) tl.fromTo(chartc, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 1.7);
    if (line) tl.to(line, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 2);
    if (area) tl.to(area, { autoAlpha: 1, duration: 1.2 }, 2.4);
    if (dotp) tl.fromTo(dotp, { scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(3)", transformOrigin: "50% 50%" }, 3.6);
    if (chips.length) tl.fromTo(chips, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "back.out(2.2)" }, 1.6);
    tl.call(() => {
      ready = true;
      chips.forEach((c, i) => gsap.to(c, { y: i % 2 ? 9 : -9, duration: gsap.utils.random(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1 }));
      if (rows.length === 5 && me && rk) {
        const rh = rows[1].offsetTop - rows[0].offsetTop;
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
        loop.call(() => { rk.textContent = "5"; me.classList.remove("top"); }, [], 0).set(rows, { y: 0 }, 0);
        [3, 2, 1, 0].forEach((ri, s) => {
          const at = 0.4 + s * 0.6;
          loop.to(rows[ri], { y: rh, duration: 0.7, ease: "expo.inOut" }, at)
            .to(me, { y: -(s + 1) * rh, duration: 0.7, ease: "expo.inOut" }, at)
            .call(() => { rk.textContent = String(4 - s); }, [], at + 0.4);
        });
        loop.call(() => me.classList.add("top"), [], 3.1);
        loop.call(() => {
          gsap.to(aiLines, { scaleX: 1, duration: 0.8, stagger: 0.18, ease: "power3.out", overwrite: true });
          if (aiSrc) gsap.to(aiSrc, { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(2)", overwrite: true });
        }, [], 3.2);
        loop.call(() => {
          gsap.to(aiLines, { scaleX: 0, duration: 0.4, overwrite: true });
          if (aiSrc) gsap.to(aiSrc, { autoAlpha: 0, y: 8, duration: 0.3, overwrite: true });
        }, [], 5.3);
        loop.to({}, { duration: 0.1 }, 5.5);
      }
    }, [], 3.2);

    const hero = one(".sl-hero");
    const spot = one(".sl-spot");
    if (fine && hero) {
      const layers = ([[serp, 14], [ai, 26], [chartc, -10]] as Array<[HTMLElement | null, number]>).filter((l) => l[0]) as Array<[HTMLElement, number]>;
      const qt = layers.map(([el]) => ({ x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }) }));
      const sx = spot ? gsap.quickTo(spot, "x", { duration: 0.8, ease: "power3.out" }) : null;
      const sy = spot ? gsap.quickTo(spot, "y", { duration: 0.8, ease: "power3.out" }) : null;
      on(hero, "pointermove", (e) => {
        const m = pe(e);
        if (sx && sy) { sx(m.clientX); sy(m.clientY); }
        if (!ready) return;
        const px = m.clientX / innerWidth - 0.5, py = m.clientY / innerHeight - 0.5;
        layers.forEach(([, d], i) => { qt[i].x(px * d); qt[i].y(py * d); });
      });
    }
    if (hero) gsap.to(all(".sl-glow"), { yPercent: 18, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

    /* ===== generic small reveals (paragraphs, eyebrows) ===== */
    all(".sl-h2").forEach((h) => {
      const ws = Array.from(h.querySelectorAll<HTMLElement>(".sl-w"));
      gsap.set(ws, { yPercent: 118 });
      enter(h, "top 88%", () => gsap.to(ws, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.05 }));
    });
    all("[data-fade]").forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 28 });
      enter(el, "top 92%", () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out" }));
    });
    all("[data-par]").forEach((img) => {
      gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    all("[data-clip]").forEach((f) => {
      gsap.set(f, { clipPath: "inset(100% 0% 0% 0% round 28px)" });
      enter(f, "top 86%", () => gsap.to(f, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "expo.inOut" }));
    });

    /* ===== PROOF: tiles open from the centre, counters, chart draws ===== */
    const kp = all("[data-kpi]");
    if (kp.length) {
      gsap.set(kp, { clipPath: "inset(0% 50% 0% 50% round 18px)", autoAlpha: 0 });
      enter(kp[0], "top 88%", () => gsap.to(kp, { clipPath: "inset(0% 0% 0% 0% round 18px)", autoAlpha: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 }));
    }
    all<HTMLElement>(".sl-count").forEach((c) => {
      const to = Number(c.dataset.to || 0), dec = Number(c.dataset.dec || 0), o = { n: 0 };
      c.textContent = "0";
      enter(c, "top 90%", () => gsap.to(o, { n: to, duration: 1.8, ease: "power3.out", onUpdate: () => { c.textContent = o.n.toFixed(dec); } }));
    });
    const l2 = one(".sl-line2"), a2 = one(".sl-area2");
    if (l2) {
      gsap.set(l2, { strokeDashoffset: 1 });
      if (a2) gsap.set(a2, { autoAlpha: 0 });
      enter(l2, "top 85%", () => { gsap.to(l2, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }); if (a2) gsap.to(a2, { autoAlpha: 1, duration: 1.4, delay: 1 }); });
    }

    /* ===== ABOUT: words light up with scroll, circle mask opens ===== */
    const sw = all(".sl-sw");
    if (sw.length) gsap.fromTo(sw, { opacity: 0.16 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ".sl-scrub", start: "top 78%", end: "bottom 52%", scrub: true } });
    const am = one(".sl-about-main");
    if (am) {
      gsap.set(am, { clipPath: "circle(0% at 50% 50%)" });
      enter(am, "top 80%", () => gsap.to(am, { clipPath: "circle(75% at 50% 50%)", duration: 1.8, ease: "expo.inOut" }));
    }
    all("[data-pop]").forEach((p, i) => {
      gsap.set(p, { scale: 0.4, autoAlpha: 0 });
      enter(p, "top 85%", () => gsap.to(p, { scale: 1, autoAlpha: 1, duration: 1, delay: 0.5 + i * 0.15, ease: "back.out(1.8)" }));
    });
    all(".sl-prin li").forEach((li, i) => {
      gsap.set(li, { xPercent: i % 2 ? 6 : -6, autoAlpha: 0 });
      enter(li, "top 90%", () => gsap.to(li, { xPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }));
    });

    /* ===== PANELS: cards fan out of a stack as you scroll ===== */
    const fan = one(".sl-fan"), pc = all(".sl-pcard");
    if (fan && pc.length) {
      gsap.fromTo(pc, { xPercent: (i: number) => (1 - i) * 105, rotate: (i: number) => (i - 1) * -9, y: 70, scale: 0.92 }, { xPercent: 0, rotate: 0, y: 0, scale: 1, ease: "none", stagger: 0, scrollTrigger: { trigger: fan, start: "top 85%", end: "top 35%", scrub: 0.6 } });
      pc.forEach((c, i) => {
        const im = c.querySelector("img");
        if (im) gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true } });
        void i;
      });
    }

    /* ===== CHOOSE: sticky cards stack and recede ===== */
    const crit = all(".sl-crit");
    crit.forEach((c, i) => {
      if (i === crit.length - 1) return;
      gsap.to(c, { scale: 0.94, opacity: 0.55, ease: "none", scrollTrigger: { trigger: crit[i + 1], start: "top 72%", end: "top 24%", scrub: true } });
    });

    /* ===== LOCAL: route draws, dots ping, skyline rises ===== */
    const route = one(".sl-route"), coast = one(".sl-coast");
    if (route && coast) {
      gsap.set([route, coast], { strokeDashoffset: 1 });
      gsap.set(dots, { autoAlpha: 0, scale: 0 });
      enter(route, "top 82%", () => {
        gsap.to(coast, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" });
        gsap.to(route, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", delay: 0.3 });
        gsap.to(dots, { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.18, delay: 0.4, ease: "back.out(2.6)", transformOrigin: "50% 50%" });
      });
    }
    all<SVGGElement>(".sl-sky").forEach((sky) => {
      const b = Array.from(sky.querySelectorAll(".sl-bld"));
      gsap.set(b, { scaleY: 0, transformOrigin: "50% 100%", transformBox: "fill-box" });
      enter(sky, "top 95%", () => gsap.to(b, { scaleY: 1, duration: 1.4, ease: "expo.out", stagger: { each: 0.04, from: "center" } }));
      sky.querySelectorAll(".sl-win.f").forEach((w) => gsap.to(w, { opacity: 0.15, duration: gsap.utils.random(0.6, 1.6), repeat: -1, yoyo: true, ease: "steps(1)", delay: gsap.utils.random(0, 2) }));
    });

    /* ===== SERVICES: cards land in random order ===== */
    const sv = all(".sl-svc");
    if (sv.length) {
      gsap.set(sv, { y: 60, autoAlpha: 0, rotate: (i: number) => (i % 2 ? 2.5 : -2.5) });
      enter(sv[0], "top 88%", () => gsap.to(sv, { y: 0, autoAlpha: 1, rotate: 0, duration: 1.1, ease: "expo.out", stagger: { each: 0.08, from: "random" } }));
    }

    /* ===== TOOLS: two marquees in opposite directions, faster with scroll ===== */
    all(".sl-mq").forEach((mq) => {
      const t = mq.querySelector(".sl-mq-t");
      if (!t) return;
      const dir = Number(mq.getAttribute("data-dir") || -1);
      const loop = gsap.fromTo(t, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 42, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: mq, start: "top bottom", end: "bottom top",
        onUpdate: (self) => {
          if (Math.abs(self.getVelocity()) < 140) return;
          const k = 1 + Math.min(4, Math.abs(self.getVelocity()) / 500);
          gsap.killTweensOf(loop, "timeScale");
          gsap.to(loop, { timeScale: k, duration: 0.3, ease: "power2.out", onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.4, ease: "power2.out" }); } });
        },
      });
    });

    /* ===== AUDIENCE: cards flip down in 3D ===== */
    const ac = all(".sl-aud-c");
    if (ac.length) {
      gsap.set(ac, { rotationX: -75, transformOrigin: "50% 0%", transformPerspective: 900, autoAlpha: 0 });
      enter(ac[0], "top 88%", () => gsap.to(ac, { rotationX: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 }));
    }

    /* ===== PROCESS: big number rolls, ring fills ===== */
    const steps = all(".sl-pstep"), nums = one(".sl-pnum-in"), ring = one(".sl-ring-fg");
    if (steps.length && nums && ring) {
      gsap.set(ring, { strokeDashoffset: 1 - 1 / steps.length });
      steps.forEach((s, i) => ScrollTrigger.create({
        trigger: s, start: "top 58%", end: "bottom 58%",
        onToggle: (self) => {
          if (!self.isActive) return;
          steps.forEach((o) => o.classList.toggle("on", o === s));
          gsap.to(nums, { yPercent: -i * (100 / steps.length), duration: 0.9, ease: "expo.out", overwrite: "auto" });
          gsap.to(ring, { strokeDashoffset: 1 - (i + 1) / steps.length, duration: 0.9, ease: "expo.out", overwrite: "auto" });
        },
      }));
    }

    /* ===== DATA: bars grow, donut fills ===== */
    const bars = all(".sl-bars i"), dn = one(".sl-dn-fg");
    if (bars.length) {
      gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      enter(bars[0], "top 90%", () => gsap.to(bars, { scaleY: 1, duration: 1.2, ease: "expo.out", stagger: 0.06 }));
    }
    if (dn) {
      gsap.set(dn, { strokeDashoffset: 1 });
      enter(dn, "top 92%", () => gsap.to(dn, { strokeDashoffset: 0.22, duration: 2, ease: "power3.out" }));
    }

    /* ===== COMPARE: rows draw in from the left ===== */
    all(".sl-trow").forEach((r, i) => {
      gsap.set(r, { clipPath: "inset(0% 100% 0% 0%)" });
      enter(r, "top 92%", () => gsap.to(r, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, delay: i * 0.04, ease: "expo.out" }));
    });

    /* ===== PROJECTS + PRICING: card entrances ===== */
    const pj = all(".sl-pj");
    if (pj.length) {
      gsap.set(pj, { clipPath: "inset(0% 0% 100% 0% round 24px)" });
      enter(pj[0], "top 88%", () => gsap.to(pj, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.3, ease: "expo.inOut", stagger: 0.12 }));
    }
    const pl = all(".sl-plan");
    if (pl.length) {
      gsap.set(pl, { y: 90, autoAlpha: 0, scale: 0.94 });
      enter(pl[0], "top 88%", () => gsap.to(pl, { y: 0, autoAlpha: 1, scale: 1, duration: 1.2, ease: "expo.out", stagger: 0.14 }));
    }
    all(".sl-tq-c").forEach((c, i) => {
      gsap.set(c, { x: 60, autoAlpha: 0 });
      enter(c, "top 95%", () => gsap.to(c, { x: 0, autoAlpha: 1, duration: 1, delay: Math.min(i, 3) * 0.08, ease: "expo.out" }));
    });

    /* ===== CONTACT + FINAL ===== */
    const fc = one(".sl-form-card");
    if (fc) {
      gsap.set(fc, { clipPath: "inset(100% 0% 0% 0% round 28px)" });
      enter(fc, "top 85%", () => gsap.to(fc, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "expo.inOut" }));
    }
    const sun = one(".sl-sun");
    if (sun) gsap.fromTo(sun, { scale: 0.6, yPercent: 30 }, { scale: 1.15, yPercent: -10, ease: "none", scrollTrigger: { trigger: ".sl-final", start: "top bottom", end: "bottom bottom", scrub: true } });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      offs.forEach((f) => f());
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}