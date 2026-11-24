"use client";

import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { teamGroups, type TeamMember } from "@/lib/team-data";
import "./team-section.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* GSAP owns: heading words, divider lines, group titles, photo clip-path reveal.
   Framer owns: card entrance/lift, info-panel text stagger, icon hover, intro paragraph.
   No property is animated by both on the same element. */

const panel: Variants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};
const item: Variants = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="ot-w">
            <span className="ot-wi">{w}</span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

function TeamCard({
  m,
  compact,
  index,
}: {
  m: TeamMember;
  compact?: boolean;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.li
      className={`ot-item${compact ? " ot-item--compact" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className={`ot-card${compact ? " ot-card--compact" : ""}`}
        data-open={open}
        tabIndex={0}
        variants={panel}
        initial="rest"
        animate={open ? "hover" : "rest"}
        whileHover="hover"
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType === "touch") setOpen((v) => !v);
        }}
      >
        <div className="ot-card__media">
          <Image
            src={m.photo}
            alt={m.name}
            fill
            priority={!!compact && index < 4}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="ot-card__img"
          />
          <Image
            src={m.hover}
            alt=""
            aria-hidden
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="ot-card__img ot-card__img--hover"
          />
        </div>
        <div className="ot-card__shade" />
        <div className="ot-card__info">
          <motion.h4 variants={item}>{m.name}</motion.h4>
          <motion.span variants={item}>{m.role}</motion.span>
          {(m.website || m.linkedin) && (
            <motion.div className="ot-card__links" variants={item}>
              {m.website && (
                <motion.a
                  href={m.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} website`}
                  whileHover={{ scale: 1.14, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                  </svg>
                </motion.a>
              )}
              {m.linkedin && (
                <motion.a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} LinkedIn`}
                  whileHover={{ scale: 1.14, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}

export default function TeamSection() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // heading: words rise out of a mask
        gsap.fromTo(
          ".ot-wi",
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.15 }
        );
        // pill divider lines draw outward from the pill
        gsap.fromTo(
          ".ot-pill-row i:first-child",
          { scaleX: 0, autoAlpha: 0, transformOrigin: "100% 50%" },
          { scaleX: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        );
        gsap.fromTo(
          ".ot-pill-row i:last-child",
          { scaleX: 0, autoAlpha: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        );
        // Management / Team titles
        ScrollTrigger.batch(".ot-group__title", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            els.forEach((el) => {
              const lines = el.querySelectorAll("i");
              const h = el.querySelector("h3");
              gsap.set(el, { autoAlpha: 1 });
              gsap.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" });
              gsap.fromTo(h, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" });
            }),
        });
        // photos: clip-path reveal + settle zoom, staggered per row
        ScrollTrigger.batch(".ot-card__media", {
          start: "top 90%",
          once: true,
          batchMax: 4,
          interval: 0.1,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { autoAlpha: 0, clipPath: "inset(100% 0% 0% 0% round 24px)", scale: 1.18 },
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                scale: 1,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.1,
                clearProps: "clipPath,scale",
              }
            ),
        });
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        return () => window.removeEventListener("load", refresh);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="team" className="ot-sec" aria-labelledby="team-heading">
      <div className="ot-outer">
        <div className="ot-frame">
          <div className="ot-head">
            <div className="ot-pill-row">
              <i />
              <motion.div
                className="ot-pill"
                initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span>Our Team</span>
              </motion.div>
              <i />
            </div>
            <div className="ot-head__text">
              <h2 id="team-heading">
                <Words text="Best IT Experts In Nepal – Skilled Team At Softsaro Nepal" />
              </h2>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <a href="https://www.softsaro.com.np/">Softsaro Nepal</a> has a team of
                experienced and dedicated professionals ready to deliver high-quality
                digital solutions. Our team includes the{" "}
                <a href="https://www.softsaro.com.np/teams/it-experts-in-nepal">
                  best IT specialist from Nepal
                </a>{" "}
                with strong skills in web development, mobile apps, SEO and digital
                marketing. We focus on quality work, trusted service, and real results
                for your business. Choose Softsaro Nepal and work with the{" "}
                <a href="https://www.softsaro.com.np/teams/it-experts-in-nepal">
                  best IT expert in Nepal
                </a>{" "}
                to grow your business successfully.
              </motion.p>
            </div>
          </div>

          <div className="ot-body">
            <div className="ot-wrap">
              {teamGroups.map((g) => (
                <div key={g.title}>
                  <div className="ot-group__title ot-gi">
                    <i />
                    <h3>{g.title}</h3>
                    <i />
                  </div>
                  <ul className="ot-grid">
                    {g.members.map((m, i) => (
                      <TeamCard key={m.name} m={m} compact={g.compact} index={i} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}