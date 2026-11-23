"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;
const LEAF = "140px 28px 140px 28px";
const LEAF2 = "28px 120px 28px 28px";
const POINTS = [
  "Kathmandu-based team",
  "Working with international businesses",
  "Digital strategy and execution",
  "Transparent communication",
  "Business-focused solutions",
];

export default function DmpAbout({ a, b, c }: { a: string; b: string; c: string }) {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [-20, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [40, -20]);
  const up = (d: number) => ({
    initial: rm ? false as const : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: rm ? 0 : 0.8, delay: rm ? 0 : d, ease: E },
  });
  const pic = (d: number, r: string) => ({
    initial: rm ? false as const : { opacity: 0, scale: 0.94, clipPath: `inset(10% 10% 10% 10% round ${r})` },
    whileInView: { opacity: 1, scale: 1, clipPath: `inset(0% 0% 0% 0% round ${r})` },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: rm ? 0 : 1.1, delay: rm ? 0 : d, ease: E },
  });
  return (
    <section className="dmp-ab" id="dmp-about">
      <div className="dmp-in dmp-ab-g">
        <div className="dmp-ab-t">
          <motion.span className="dmp-ab-eye" {...up(0)}>About Softsaro</motion.span>
          <motion.h2 {...up(0.08)}>Your Digital Growth Partner, <em>Beyond Borders.</em></motion.h2>
          <motion.p {...up(0.16)}>Softsaro is a technology and digital solutions company helping businesses build stronger digital experiences and grow online. From website development and SEO to digital marketing and creative strategies, we bring technology, creativity, and strategy together to deliver meaningful business results.</motion.p>
          <ul className="dmp-ab-l">
            {POINTS.map((p, i) => (
              <motion.li key={p} {...up(0.22 + i * 0.07)}><i aria-hidden="true" />{p}</motion.li>
            ))}
          </ul>
          <motion.div {...up(0.62)}>
            <a className="dmp-ab-btn" href="/about-us"><span>Learn more about us</span><b aria-hidden="true">&rarr;</b></a>
          </motion.div>
        </div>
        <div className="dmp-ab-v" ref={ref}>
          <span className="dmp-ab-glow" aria-hidden="true" />
          <span className="dmp-ab-fr" aria-hidden="true" />
          <span className="dmp-ab-dots" aria-hidden="true" />
          <motion.div className="dmp-ab-p p1" style={{ y: y1 }}><motion.div className="dmp-ab-f" {...pic(0.05, LEAF)}><img src={a} alt="Softsaro team collaborating around a table" loading="lazy" decoding="async" /></motion.div></motion.div>
          <motion.div className="dmp-ab-p p2" style={{ y: y2 }}><motion.div className="dmp-ab-f" {...pic(0.2, "50%")}><img src={b} alt="Team planning on a whiteboard" loading="lazy" decoding="async" /></motion.div></motion.div>
          <motion.div className="dmp-ab-p p3" style={{ y: y3 }}><motion.div className="dmp-ab-f" {...pic(0.35, LEAF2)}><img src={c} alt="Analytics charts on a desk" loading="lazy" decoding="async" /></motion.div></motion.div>
          <motion.div className="dmp-ab-bd" {...up(0.55)}><b>8+</b><span>years as an<br />IT company</span></motion.div>
        </div>
      </div>
    </section>
  );
}