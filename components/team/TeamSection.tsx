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

/* GSAP owns: heading words, divider lines, group titles, photo clip-path reveal (.ot-media).
   Framer owns: card entrance (li), social-icon rail stagger.
   Hover photo swap, zoom, spotlight, sheen and plate movement are pure CSS. */

const rail: Variants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const railItem: Variants = {
  rest: { opacity: 0, x: 14, scale: 0.9 },
  hover: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
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

function CopyWords({ text }: { text: string }) {
  return <>{text.split(/(\s+)/).map((part, i) =>
    /^\s+$/.test(part) ? part : <span className="ot-intro-word" key={`${part}-${i}`}>{part}</span>
  )}</>;
}

function TeamCard({
  m,
  variant,
  index,
}: {
  m: TeamMember;
  variant: "m" | "t";
  index: number;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const sizes =
    variant === "m"
      ? "(max-width:640px) 90vw, (max-width:1024px) 45vw, 25vw"
      : "(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw";

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const media = e.currentTarget.querySelector<HTMLElement>(".ot-media");
    if (!media) return;
    const r = media.getBoundingClientRect();
    media.style.setProperty("--mx", `${e.clientX - r.left}px`);
    media.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      className={`ot-item ot-item--${variant}`}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className={`ot-card ot-card--${variant}`}
        data-open={open}
        tabIndex={0}
        variants={rail}
        initial="rest"
        animate={open ? "hover" : "rest"}
        whileHover="hover"
        onPointerMove={onMove}
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType === "touch") setOpen((v) => !v);
        }}
      >
        <div className="ot-plate" aria-hidden />
        <div className="ot-media">
          <Image
            src={m.photo}
            alt={m.name}
            fill
            priority={variant === "m" && index < 4}
            sizes={sizes}
            className="ot-img"
          />
          <Image src={m.hover} alt="" aria-hidden fill sizes={sizes} className="ot-img ot-img--hover" />
          <div className="ot-shade" />
          {(m.website || m.linkedin) && (
            <motion.div className="ot-rail" variants={rail}>
              {m.website && (
                <motion.span variants={railItem}>
                  <a href={m.website} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} website`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                    </svg>
                  </a>
                </motion.span>
              )}
              {m.linkedin && (
                <motion.span variants={railItem}>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} LinkedIn`}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </motion.span>
              )}
            </motion.div>
          )}
        </div>
        <div className="ot-meta">
          <h4>{m.name}</h4>
          <p>{m.role}</p>
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
        gsap.fromTo(
          ".ot-wi",
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.15 }
        );
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

        // The paragraph words have their own inner wrappers; Framer Motion
        // handles the paragraph entrance while GSAP staggers only these words.
        gsap.fromTo(
          ".ot-intro-word",
          { yPercent: 35, autoAlpha: 0, filter: "blur(4px)" },
          { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", stagger: 0.018, delay: 0.7 }
        );

        // group titles: one trigger each
        gsap.utils.toArray<HTMLElement>(".ot-gi").forEach((el) => {
          const lines = el.querySelectorAll("i");
          const h = el.querySelector("h3");
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: "top 92%", once: true } })
            .set(el, { autoAlpha: 1 })
            .fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, 0)
            .fromTo(h, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }, 0);
        });

        // photos: one trigger per card (clip-path wipe + settle zoom)
        gsap.utils.toArray<HTMLElement>(".ot-media").forEach((el, i) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, clipPath: "inset(100% 0% 0% 0% round 24px)", scale: 1.12 },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              scale: 1,
              duration: 1.15,
              ease: "expo.out",
              delay: (i % 4) * 0.07,
              clearProps: "clipPath,scale",
              scrollTrigger: { trigger: el.parentElement as Element, start: "top 94%", once: true },
            }
          );
        });

        const refresh = () => ScrollTrigger.refresh();
        const t1 = window.setTimeout(refresh, 600);
        const t2 = window.setTimeout(refresh, 2000);
        window.addEventListener("load", refresh);
        return () => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
          window.removeEventListener("load", refresh);
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="team" className="ot-sec" aria-labelledby="team-heading">
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
            className="ot-intro-copy"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <a href="https://www.softsaro.com.np/"><CopyWords text="Softsaro Nepal" /></a>{" "}
            <CopyWords text="has a team of experienced and dedicated professionals ready to deliver high-quality digital solutions. Our team includes the" />{" "}
            <a href="https://www.softsaro.com.np/teams/it-experts-in-nepal"><CopyWords text="best IT specialist from Nepal" /></a>{" "}
            <CopyWords text="with strong skills in web development, mobile apps, SEO and digital marketing. We focus on quality work, trusted service, and real results for your business. Choose Softsaro Nepal and work with the" />{" "}
            <a href="https://www.softsaro.com.np/teams/it-experts-in-nepal"><CopyWords text="best IT expert in Nepal" /></a>{" "}<CopyWords text="to grow your business successfully." />
          </motion.p>
        </div>
      </div>

      {teamGroups.map((g) =>
        g.compact ? (
          <div key={g.title} className="ot-mgmt-wrap">
            <div className="ot-mgmt">
              <div className="ot-group__title ot-group__title--light ot-gi">
                <i />
                <h3>{g.title}</h3>
                <i />
              </div>
              <ul className="ot-mgmt-grid">
                {g.members.map((m, i) => (
                  <TeamCard key={m.name} m={m} variant="m" index={i} />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div key={g.title} className="ot-team">
            <div className="ot-group__title ot-gi">
              <i />
              <h3>{g.title}</h3>
              <i />
            </div>
            <ul className="ot-grid">
              {g.members.map((m, i) => (
                <TeamCard key={m.name} m={m} variant="t" index={i} />
              ))}
            </ul>
          </div>
        )
      )}
    </section>
  );
}
