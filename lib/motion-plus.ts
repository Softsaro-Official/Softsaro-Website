// @ts-nocheck — additive motion layer (called from initMotion; reduced-motion handled by caller)
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];

function splitWords(el) {
  const out = [];
  const txt = el.textContent;
  el.textContent = "";
  txt.split(/(\s+)/).forEach((w) => {
    if (!w.trim()) return el.append(w);
    const sw = document.createElement("span");
    sw.className = "sw";
    const si = document.createElement("span");
    si.className = "si";
    si.textContent = w;
    sw.append(si);
    el.append(sw);
    out.push(si);
  });
  return out;
}

export function initMotionPlus({ fine, mob }) {
  const off = [];
  const on = (t, e, f, o) => {
    t.addEventListener(e, f, o);
    off.push(() => t.removeEventListener(e, f, o));
  };
  const st = (t, s = "top bottom", e = "bottom top") => ({ trigger: t, start: s, end: e, scrub: true });

  /* ---------- HERO: cinematic layers ---------- */
  const sub = $(".sub");
  if (sub) gsap.from(splitWords(sub), { yPercent: 115, rotate: 4, duration: 1.2, stagger: 0.035, ease: "expo.out", delay: 1.5 });
  gsap.from(".ribbon", { clipPath: "inset(-30% 100% -30% -30%)", duration: 2, ease: "expo.inOut", delay: 0.5 });
  gsap.from(".glass", { rotationY: -40, rotationX: 14, transformPerspective: 900, transformOrigin: "0% 50%", duration: 2, ease: "expo.out", delay: 0.7 });
  gsap.from(".tile svg", { rotation: -120, scale: 0.3, duration: 1.6, ease: "back.out(1.6)", stagger: 0.12, delay: 1.1 });
  gsap.to(".ribbon", { rotation: 6, scale: 1.05, ease: "none", scrollTrigger: st(".hero", "top top") });

  if (fine) {
    const hc = $(".hero-copy");
    const hx = hc && gsap.quickTo(hc, "x", { duration: 1.2, ease: "power3" });
    const tiles = $$(".tile svg").map((e, i) => {
      gsap.set(e, { transformPerspective: 400 });
      return { r: gsap.quickTo(e, "rotationY", { duration: 1.2, ease: "power3" }), k: [40, -32, 48][i] || 30 };
    });
    on(window, "mousemove", (e) => {
      const px = e.clientX / innerWidth - 0.5;
      if (hx) hx(px * -14);
      tiles.forEach((o) => o.r(px * o.k));
    }, { passive: true });
  }

  /* ---------- ABOUT: growth journey ---------- */
  const stats = $(".stats");
  if (stats) {
    const line = document.createElement("div");
    line.className = "jline";
    line.innerHTML = "<i></i>";
    stats.prepend(line);
    const tl = gsap.timeline({ scrollTrigger: st(stats, "top 80%", "bottom 55%") });
    tl.to($("i", line), { scaleX: 1, duration: 4, ease: "none" }, 0);
    $$("div", stats).forEach((d, i) => {
      if (d.classList.contains("jline")) return;
      tl.fromTo($("b", d), { opacity: 0.15 }, { opacity: 1, duration: 1, ease: "none" }, i)
        .fromTo($("small", d), { opacity: 0.2 }, { opacity: 1, duration: 1, ease: "none" }, i + 0.3);
    });
  }

  /* ---------- SERVICES: entrance + cursor-following preview ---------- */
  const rows = $$(".rows a");
  if (rows.length) {
    const trg = { trigger: ".rows", start: "top 85%" };
    gsap.from(".rows small", { x: -24, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: trg });
    gsap.from(".rows svg", { x: -30, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", clearProps: "transform", scrollTrigger: trg });
    if (fine) {
      const pv = document.createElement("div");
      pv.className = "svp";
      pv.setAttribute("aria-hidden", "true");
      pv.innerHTML = "<b></b><span></span>";
      document.body.appendChild(pv);
      off.push(() => pv.remove());
      gsap.set(pv, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
      const qx = gsap.quickTo(pv, "x", { duration: 0.6, ease: "power3" }),
        qy = gsap.quickTo(pv, "y", { duration: 0.6, ease: "power3" }),
        qr = gsap.quickTo(pv, "rotation", { duration: 0.5, ease: "power3" });
      let lx = 0;
      on(window, "mousemove", (e) => {
        qx(e.clientX + 130);
        qy(e.clientY);
        qr(gsap.utils.clamp(-14, 14, (e.clientX - lx) * 0.5));
        lx = e.clientX;
      }, { passive: true });
      rows.forEach((a, i) => {
        on(a, "mouseenter", (e) => {
          $("b", pv).textContent = "0" + (i + 1);
          $("span", pv).textContent = $("span", a).textContent;
          gsap.set(pv, { x: e.clientX + 130, y: e.clientY });
          gsap.to(pv, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", overwrite: "auto" });
        });
        on(a, "mouseleave", () => gsap.to(pv, { scale: 0, opacity: 0, duration: 0.35, ease: "power3.in", overwrite: "auto" }));
      });
    }
  }

  /* ---------- PORTFOLIO: scroll-linked imagery + focus ---------- */
  const pcs = $$(".pc");
  pcs.forEach((p) => {
    const g = $("img", p), im = $(".pimg", p);
    if (g) gsap.fromTo(g, { objectPosition: "50% 0%" }, { objectPosition: "50% 70%", ease: "none", scrollTrigger: st(p) });
    gsap.fromTo(im, { scale: 0.94 }, { scale: 1, ease: "none", scrollTrigger: { trigger: p, start: "top 100%", end: "top 55%", scrub: true } });
    if (fine) {
      on(p, "mouseenter", () => gsap.to(pcs.filter((x) => x !== p), { opacity: 0.4, duration: 0.5, overwrite: "auto" }));
      on(p, "mouseleave", () => gsap.to(pcs, { opacity: 1, duration: 0.6, overwrite: "auto" }));
    }
  });

  /* ---------- TESTIMONIALS: focus + feedback ---------- */
  const tr = $("#tr"), cards = $$(".tq", tr || document);
  if (tr && cards.length) {
    const act = () => {
      const c = tr.getBoundingClientRect();
      let best = 0, bd = 1e9;
      cards.forEach((k, i) => {
        const d = Math.abs(k.getBoundingClientRect().left - c.left);
        if (d < bd) { bd = d; best = i; }
      });
      gsap.to(cards, { opacity: (i) => (i === best ? 1 : 0.6), duration: 0.5, overwrite: "auto" });
    };
    on(tr, "scroll", act, { passive: true });
    const t0 = gsap.delayedCall(2.6, act);
    off.push(() => t0.kill());
    if (fine) cards.forEach((k) => on(k, "mouseenter", () => gsap.fromTo($(".tw i", k), { rotation: 0 }, { rotation: 360, duration: 0.9, ease: "back.out(1.6)" })));
    [["#tp", -1], ["#tn", 1]].forEach(([id, dir]) => {
      const b = $(id);
      if (!b) return;
      on(b, "click", () => {
        gsap.fromTo(b, { scale: 0.82 }, { scale: 1, duration: 0.8, ease: "elastic.out(1,.4)" });
        gsap.fromTo($("svg", b), { x: dir * -10 }, { x: 0, duration: 0.8, ease: "elastic.out(1,.4)" });
      });
    });
  }

  /* ---------- CTA / FOOTER: ambient motion ---------- */
  gsap.to(".final .shp i", { rotation: 360, duration: 60, ease: "none", repeat: -1 });
  gsap.to(".final .spark", { rotation: 180, scale: 1.25, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.6 });
  const gi = $(".giant");
  if (fine && gi) {
    const chars = $$(".si", gi);
    on(gi, "mousemove", (e) =>
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        gsap.to(c, { opacity: gsap.utils.clamp(0.45, 1, 1.2 - d / 420), duration: 0.4, overwrite: "auto" });
      }),
    );
    on(gi, "mouseleave", () => gsap.to(chars, { opacity: 1, duration: 0.6, overwrite: "auto" }));
  }

  return () => off.forEach((f) => f());
}
