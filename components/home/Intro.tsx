"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LOGO_W, LOGO_H, PIECES } from "@/components/home/intro-pieces";

const COLS = 5;

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const d = document.documentElement;
      const el = root.current;
      if (!el || !d.classList.contains("intro-pending")) return;
      const vis = document.querySelector(".hero-vis");
      const release = () => {
        d.classList.remove("intro-pending");
        gsap.getById("hero")?.play();
      };
      const fail = gsap.delayedCall(5, release);
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          fail.kill();
          gsap.set(el, { display: "none" });
          release();
        },
      });

      tl.to(".intro-blob.a", { xPercent: 14, yPercent: 10, duration: 3, ease: "sine.inOut" }, 0)
        .to(".intro-blob.b", { xPercent: -14, yPercent: -10, duration: 3, ease: "sine.inOut" }, 0)
        .to(".intro-inner", { scale: 1.06, duration: 2, ease: "power2.inOut" }, 0.1);

      // build the wordmark piece by piece: a purple block rises over the slot, then peels away upward
      // and uncovers that letter, which settles into place
      const pieces = Array.from(el.querySelectorAll<HTMLElement>(".intro-piece"));
      pieces.forEach((p, i) => {
        const wipe = p.querySelector(".ip-wipe");
        const img = p.querySelector("img");
        const t0 = 0.15 + i * 0.08;
        tl.set(wipe, { scaleY: 0, transformOrigin: "50% 100%" }, 0)
          .to(wipe, { scaleY: 1, duration: 0.3, ease: "power3.inOut" }, t0)
          .set(wipe, { transformOrigin: "50% 0%" }, t0 + 0.3)
          .set(img, { opacity: 1, yPercent: 16 }, t0 + 0.3)
          .to(wipe, { scaleY: 0, duration: 0.3, ease: "power3.inOut" }, t0 + 0.3)
          .to(img, { yPercent: 0, duration: 0.5, ease: "expo.out" }, t0 + 0.3);
      });

      tl.fromTo(".intro-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.inOut" }, 1.05)
        // complete logo holds briefly, then the double curtain lifts
        .to([".intro-inner", ".intro-blob"], { opacity: 0, duration: 0.3, ease: "power2.in" }, 1.85)
        .to(".ic-a", { yPercent: -100, duration: 0.8, ease: "expo.inOut", stagger: 0.06 }, 1.9)
        .to(".ic-b", { yPercent: -100, duration: 0.8, ease: "expo.inOut", stagger: 0.06 }, 2.0)
        .call(() => { gsap.getById("hero")?.play(); }, undefined, 2.15);

      if (vis) {
        tl.fromTo(
          vis,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out", clearProps: "clipPath" },
          2.2,
        );
      }

      return () => {
        fail.kill();
        release();
      };
    },
    { scope: root },
  );

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro-cols b">
        {Array.from({ length: COLS }, (_, i) => (<span key={i} className="ic ic-b" />))}
      </div>
      <div className="intro-cols a">
        {Array.from({ length: COLS }, (_, i) => (<span key={i} className="ic ic-a" />))}
      </div>
      <span className="intro-blob a" />
      <span className="intro-blob b" />
      <div className="intro-inner">
        <div className="intro-mark" style={{ aspectRatio: `${LOGO_W} / ${LOGO_H}` }}>
          {PIECES.map(([x0, x1], i) => {
            const pw = x1 - x0;
            return (
              <span
                key={i}
                className="intro-piece"
                style={{ left: `${(x0 / LOGO_W) * 100}%`, width: `${(pw / LOGO_W) * 100}%` }}
              >
                <img
                  src="/softsaro-logo.png"
                  width={LOGO_W}
                  height={LOGO_H}
                  alt=""
                  style={{ width: `${(LOGO_W / pw) * 100}%`, left: `${(-x0 / pw) * 100}%` }}
                />
                <span className="ip-wipe" />
              </span>
            );
          })}
        </div>
        <span className="intro-line" />
      </div>
    </div>
  );
}