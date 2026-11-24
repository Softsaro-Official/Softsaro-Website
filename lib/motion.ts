// @ts-nocheck — direct port of the approved prototype's motion logic
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { D } from "@/lib/data";
import { initMotionPlus } from "@/lib/motion-plus";

gsap.registerPlugin(ScrollTrigger);
const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];

export function initMotion() {
  // images that fail to load are removed (as in prototype)
  $$(".pimg img").forEach((im) => {
    if (im.complete && !im.naturalWidth) im.remove();
    else im.addEventListener("error", () => im.remove());
  });
// testimonials
$$(".rows a").forEach((a) => {
  a.dataset.cur = "open";
  a.dataset.label = "Open";
});
$$(".pc").forEach((a) => (a.dataset.cur = "view"));
$("#tr").dataset.cur = "drag";
$("#tr").dataset.label = "Drag";
const tr = $("#tr"),
  cards = $$(".tq", tr),
  prog = $(".tprog");
const upd = () => {
  const mx = tr.scrollWidth - tr.clientWidth,
    c = tr.getBoundingClientRect();
  $("i", prog).style.transform =
    `scaleX(${0.12 + 0.88 * (mx > 0 ? tr.scrollLeft / mx : 0)})`;
  cards.forEach((k) => {
    const r = k.getBoundingClientRect();
    k.style.setProperty(
      "--px",
      ((r.left + r.width / 2 - (c.left + c.width / 2)) / c.width).toFixed(3),
    );
  });
};
tr.addEventListener("scroll", upd, { passive: true });
upd();
const go = (d) => {
  const w = cards[0].offsetWidth + 22,
    l = Math.max(0, (Math.round(tr.scrollLeft / w) + d) * w);
  
  tr.style.scrollSnapType = "none";
  gsap.to(tr, {
    scrollLeft: l,
    duration: 0.9,
    ease: "power3.inOut",
    onComplete: () => (tr.style.scrollSnapType = ""),
  });
};
$("#tn").onclick = () => go(1);
$("#tp").onclick = () => go(-1);
let dn = 0,
  sx = 0,
  sl = 0;
tr.onmousedown = (e) => {
  dn = 1;
  sx = e.pageX;
  sl = tr.scrollLeft;
  tr.style.scrollSnapType = "none";
};
addEventListener("mouseup", () => {
  if (dn) {
    dn = 0;
    tr.style.scrollSnapType = "";
  }
});
addEventListener("mousemove", (e) => {
  if (dn) tr.scrollLeft = sl - (e.pageX - sx);
});
// ===== motion =====
const mm = matchMedia("(prefers-reduced-motion: reduce)").matches,
  fine = matchMedia("(hover:hover) and (pointer:fine)").matches,
  mob = innerWidth <= 1000;
function split(el, mode) {
  const out = [];
  (function walk(n) {
    [...n.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((w) => {
          if (!w.trim()) {
            f.append(w);
            return;
          }
          const sw = document.createElement("span");
          sw.className = "sw";
          const mk = (t) => {
            const s = document.createElement("span");
            s.className = "si";
            s.textContent = t;
            sw.append(s);
            out.push(s);
          };
          mode === "chars" ? [...w].forEach(mk) : mk(w);
          f.append(sw);
        });
        c.replaceWith(f);
      } else if (
        c.nodeType === 1 &&
        c.tagName !== "BR" &&
        !c.classList.contains("sw")
      )
        walk(c);
    });
  })(el);
  return out;
}
if (mm) {
  $$(".count").forEach((c) => (c.textContent = c.dataset.to));
} else {
  // smooth scroll (Lenis) + anchors
  let lenis: any = null;
  {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href"),
        t = id.length > 1 && $(id);
      if (!t) return;
      e.preventDefault();
      lenis
        ? lenis.scrollTo(t, { offset: -60, duration: 1.6 })
        : t.scrollIntoView({ behavior: "smooth" });
    }),
  );
  // text splitting
  const hc = $$(".ln em")
    .map((e) => split(e, "chars"))
    .flat();
  $$("h2[data-r]").forEach((h) =>
    gsap.from(split(h, "words"), {
      yPercent: 115,
      rotate: 5,
      duration: 1.2,
      stagger: 0.06,
      ease: "expo.out",
      scrollTrigger: { trigger: h, start: "top 88%" },
    }),
  );
  gsap.fromTo(
    split($(".big"), "words"),
    { opacity: 0.16 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".big",
        start: "top 80%",
        end: "bottom 45%",
        scrub: true,
      },
    },
  );
  // hero choreography
  gsap
    .timeline({ id: "hero", paused: document.documentElement.classList.contains("intro-pending"), defaults: { ease: "expo.out" } })
    .fromTo(".nav", { yPercent: -100 }, { yPercent: 0, duration: 1 })
    .from(".eyebrow", { y: 20, opacity: 0, duration: 0.9 }, "-=.7")
    .from(
      hc,
      {
        yPercent: 120,
        rotate: 8,
        transformOrigin: "0% 100%",
        duration: 1.3,
        stagger: 0.02,
      },
      "-=.8",
    )
    .from(".cta-row[data-h]", { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, "-=.9")
    .from(
      ".layer .fl",
      {
        scale: 0.85,
        opacity: 0,
        duration: 1.6,
        stagger: 0.1,
        ease: "power4.out",
      },
      "-=1.2",
    )
    .from(
      ".pills li",
      { x: 30, opacity: 0, stagger: 0.1, duration: 0.9 },
      "-=1",
    )
    .from(
      ".shp",
      { scale: 0, opacity: 0, stagger: 0.08, duration: 1, ease: "back.out(2)" },
      "-=1",
    )
    .from(".sind", { opacity: 0, y: 20, duration: 1 }, "-=.6")
    .from(".clients", { y: 30, opacity: 0, duration: 1 }, "-=1");
  [
    [".f1", 16, 3, 6],
    [".f2", -20, -1.5, 5],
    [".f3", 14, 5, 4.4],
    [".f4", -16, -4, 5.2],
    [".f5", 12, 6, 4.8],
  ].forEach(([s, y, r, d]) =>
    gsap.to(s, {
      y,
      rotation: r,
      duration: d,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    }),
  );
  // scroll parallax (different speeds)
  const st = (t, s = "top bottom", e = "bottom top") => ({
    trigger: t,
    start: s,
    end: e,
    scrub: true,
  });
  gsap.to(".hero-vis", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: st(".hero", "top top"),
  });
  gsap.to(".hero-copy", {
    y: -70,
    ease: "none",
    scrollTrigger: st(".hero", "top top"),
  });
  gsap.to(".arc", {
    yPercent: 40,
    ease: "none",
    scrollTrigger: st(document.body, "top top", "bottom bottom"),
  });
  gsap.to(".blob.b1", {
    y: 300,
    ease: "none",
    scrollTrigger: st(document.body, "top top", "bottom bottom"),
  });
  gsap.to(".work .spark", {
    rotation: 180,
    ease: "none",
    scrollTrigger: st(".work"),
  });
  $$("[data-speed]").forEach((e) => {
    const s = e.closest("section");
    gsap.to(e, {
      y: -parseFloat(e.dataset.speed) * 400,
      ease: "none",
      scrollTrigger: st(
        s,
        s.classList.contains("hero") ? "top top" : "top bottom",
      ),
    });
  });
  // section transitions (clip-path, no layout shift)
  [".work", ".why", ".final"].forEach((s) =>
    gsap.fromTo(
      s,
      { clipPath: "inset(0% 5% 0% 5% round 56px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: st(s, "top 95%", "top 35%"),
      },
    ),
  );
  // services
  gsap.from(".rows li", {
    y: 70,
    opacity: 0,
    stagger: 0.1,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: { trigger: ".rows", start: "top 85%" },
  });
  gsap.from(".what .lab", {
    x: -30,
    opacity: 0,
    duration: 1,
    scrollTrigger: { trigger: ".what", start: "top 80%" },
  });
  // about
  $$(".count").forEach((c, i) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: +c.dataset.to,
      delay: i * 0.5 + 0.5,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: c, start: "top 92%" },
      onUpdate: () => (c.textContent = Math.round(o.v)),
    });
  });
  {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".stats > div"));
    gsap.set(cards, { autoAlpha: 0 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ".stats", start: "top 88%", toggleActions: "play none none reverse" },
    });
    cards.forEach((card, i) => {
      tl.set(card, { autoAlpha: 1 }, i * 0.5).fromTo(
        card,
        { y: () => -window.innerHeight },
        { y: 0, duration: 0.9, ease: "bounce.out", clearProps: "transform" },
        i * 0.5
      );
    });
  }
  gsap.from(".stats div b, .stats div small", {
    y: 28,
    opacity: 0,
    stagger: 0.04,
    delay: 0.1,
    duration: 0.6,
    ease: "power3.out",
    clearProps: "opacity,transform",
    scrollTrigger: { trigger: ".stats", start: "top 88%", toggleActions: "play none none reverse" },
  });
  $$(".stats div").forEach((d) =>
    d.addEventListener("pointermove", (e: PointerEvent) => {
      const r = d.getBoundingClientRect();
      d.style.setProperty("--mx", e.clientX - r.left + "px");
      d.style.setProperty("--my", e.clientY - r.top + "px");
    }),
  );
  // portfolio
  const pv = $(".pv"),
    pvin = $(".pv-in", pv);
  gsap.set(pvin, { scale: 0, opacity: 0 });
  $$(".pc").forEach((p, i) => {
    const im = $(".pimg", p),
      g = $("img", p),
      t = { trigger: p, start: "top 88%" };
    gsap.from(im, {
      clipPath: "inset(100% 0 0 0)",
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: t,
    });
    if (g)
      gsap.from(g, {
        scale: 1.35,
        duration: 1.9,
        ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: t,
      });
    gsap.from(split($(".pm h3", p), "words"), {
      yPercent: 115,
      duration: 1.1,
      stagger: 0.05,
      ease: "expo.out",
      delay: 0.35,
      scrollTrigger: t,
    });
    gsap.from($(".pm small", p), {
      x: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      scrollTrigger: t,
    });
    gsap.from($("p", p), {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      scrollTrigger: t,
    });
    if (!mob)
      gsap.to(p, { y: i % 2 ? -50 : 0, ease: "none", scrollTrigger: st(p) });
    if (fine) {
      gsap.set(im, { transformPerspective: 900 });
      const rx = gsap.quickTo(im, "rotationX", {
          duration: 0.6,
          ease: "power3",
        }),
        ry = gsap.quickTo(im, "rotationY", { duration: 0.6, ease: "power3" });
      im.addEventListener("mousemove", (e) => {
        const r = im.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
      });
      im.addEventListener("mouseleave", () =>
        gsap.to(im, {
          rotationX: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "elastic.out(1,.5)",
          overwrite: "auto",
        }),
      );
      p.addEventListener("mouseenter", () => {
        $("i", pv).style.backgroundImage = `url("${(p.querySelector(".pimg img") as HTMLImageElement | null)?.src || D.pj[i][3]}")`;
        gsap.to(pvin, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      });
      p.addEventListener("mouseleave", () =>
        gsap.to(pvin, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        }),
      );
    }
  });
  // why: cursor glow
  // technologies
  // testimonials + CTA + footer
  gsap.from(".tq", {
    x: 90,
    opacity: 0,
    stagger: 0.1,
    duration: 1.1,
    ease: "expo.out",
    clearProps: "transform",
    scrollTrigger: { trigger: "#tr", start: "top 88%" },
  });
  gsap.from(".fsub,.final .cta-row", {
    y: 30,
    opacity: 0,
    stagger: 0.12,
    duration: 1,
    scrollTrigger: { trigger: ".final", start: "top 55%" },
  });
  const ft = { trigger: ".foot", start: "top 80%" };
  gsap.from(".fgrid>div", {
    y: 50,
    opacity: 0,
    stagger: 0.12,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: ft,
  });
  gsap.from(".fgrid a:not(.logo)", {
    y: 16,
    opacity: 0,
    stagger: 0.04,
    duration: 0.8,
    delay: 0.3,
    clearProps: "transform",
    scrollTrigger: ft,
  });
  gsap.from(".copy", {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    scrollTrigger: ft,
  });
  gsap.from(split($(".giant"), "chars"), {
    yPercent: 100,
    stagger: 0.05,
    duration: 1.4,
    ease: "expo.out",
    scrollTrigger: { trigger: ".giant", start: "top 98%" },
  });
  gsap.to(".giant", {
    yPercent: -12,
    ease: "none",
    scrollTrigger: st(".foot", "top bottom", "bottom bottom"),
  });
  // marquee
  const tk = $(".tk"),
    mq = gsap.to(tk, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
  $(".mq").addEventListener("mouseenter", () =>
    gsap.to(mq, { timeScale: 0.15, duration: 0.6 }),
  );
  $(".mq").addEventListener("mouseleave", () =>
    gsap.to(mq, { timeScale: 1, duration: 0.8 }),
  );
  // mouse experience (fine pointers only)
  if (fine) {
    const L = $$(".layer").map((l) => ({
        x: gsap.quickTo(l, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(l, "y", { duration: 1, ease: "power3" }),
        d: +l.dataset.d,
      })),
      gl = $('.layer[data-d="26"]');
    gsap.set(gl, { transformPerspective: 900 });
    const ry = gsap.quickTo(gl, "rotationY", { duration: 1.2, ease: "power3" }),
      rx = gsap.quickTo(gl, "rotationX", { duration: 1.2, ease: "power3" }),
      rr = gsap.quickTo($('.layer[data-d="12"]'), "rotation", {
        duration: 1.6,
        ease: "power3",
      });
    const M = $$("[data-m]").map((e) => ({
      x: gsap.quickTo(e, "x", { duration: 1.2, ease: "power3" }),
      y: gsap.quickTo(e, "y", { duration: 1.2, ease: "power3" }),
      m: +e.dataset.m,
    }));
    const cur = $(".cur"),
      dot = $(".cur-dot"),
      lab = $("span", cur),
      H = document.documentElement;
    H.classList.add("has-cursor");
    const cx = gsap.quickTo(cur, "x", { duration: 0.5, ease: "power3" }),
      cy = gsap.quickTo(cur, "y", { duration: 0.5, ease: "power3" }),
      dx = gsap.quickTo(dot, "x", { duration: 0.08 }),
      dy = gsap.quickTo(dot, "y", { duration: 0.08 }),
      px_ = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3" }),
      py_ = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3" });
    let shown = 0;
    addEventListener(
      "mousemove",
      (e) => {
        const px = e.clientX / innerWidth - 0.5,
          py = e.clientY / innerHeight - 0.5;
        if (!shown) {
          shown = 1;
          gsap.set([cur, dot, pv], { x: e.clientX, y: e.clientY });
          gsap.to([cur, dot], { opacity: 1, duration: 0.3 });
        }
        cx(e.clientX);
        cy(e.clientY);
        dx(e.clientX);
        dy(e.clientY);
        px_(e.clientX);
        py_(e.clientY);
        const inv = !!e.target.closest(".work,.final,.why,.foot");
        cur.classList.toggle("inv", inv);
        dot.classList.toggle("inv", inv);
        L.forEach((o) => {
          o.x(-px * o.d * 2);
          o.y(-py * o.d * 2);
        });
        ry(px * 16);
        rx(-py * 12);
        rr(px * 5);
        M.forEach((o) => {
          o.x(px * o.m);
          o.y(py * o.m);
        });
      },
      { passive: true },
    );
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("[data-cur],a,button"),
        s = t ? t.dataset.cur || "link" : "";
      cur.dataset.s = s;
      dot.dataset.s = s;
      lab.textContent = (t && t.dataset.label) || "";
    });
    addEventListener("mousedown", () => cur.classList.add("down"));
    addEventListener("mouseup", () => cur.classList.remove("down"));
    H.addEventListener("mouseleave", () => {
      shown = 0;
      gsap.to([cur, dot], { opacity: 0, duration: 0.3 });
    });
    // magnetic
    $$(".btn,.tlink,.tnav button,.logo").forEach((b) => {
      const k = b.classList.contains("btn") ? 1 : 0.7,
        x = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1,.5)" }),
        y = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.28 * k);
        y((e.clientY - r.top - r.height / 2) * 0.35 * k);
      });
      b.addEventListener("mouseleave", () => {
        x(0);
        y(0);
      });
    });
  }
  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
}

  const plusOff = mm ? () => {} : initMotionPlus({ fine, mob });
  return () => {
    plusOff();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    document.documentElement.classList.remove("has-cursor");
  };
}
