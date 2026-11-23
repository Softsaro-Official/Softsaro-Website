"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { EASE } from "./Fx";
import s from "./sajha.module.css";

const LINKS: [string, string][] = [
  ["overview", "Overview"], ["challenge", "Challenge"], ["solution", "Solution"], ["features", "Features"],
  ["mobile", "Mobile"], ["process", "Process"], ["gallery", "Gallery"], ["results", "Results"],
];

/** Scroll progress bar + floating section dock. */
export default function SajhaNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");
  useMotionValueEvent(scrollY, "change", (v) => { const max = document.documentElement.scrollHeight - window.innerHeight; setShow(v > 520 && v < max - 1000); });

  useEffect(() => {
    const els = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div className={s.topbar} style={{ scaleX: progress }} aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.nav className={s.dock} aria-label="Case study sections" initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            {LINKS.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`${s.dl}${active === id ? ` ${s.dlOn}` : ""}`}>
                {active === id && <motion.span layoutId="sj-dock-pill" className={s.dockPill} transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span>{label}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}