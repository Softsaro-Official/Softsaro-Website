"use client";
import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { DaleyImg } from "@/lib/daley-data";
import s from "./daley.module.css";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Progress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return <motion.div className={s.progress} style={{ scaleX: x }} aria-hidden="true" />;
}

export function Words({ text, className, inView = true, delay = 0 }: { text: string; className?: string; inView?: boolean; delay?: number }) {
  const rm = useReducedMotion();
  return (
    <span className={className} aria-hidden="true">
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className={s.wMask}>
            <motion.span
              className={s.wIn}
              initial={rm ? false : { y: "112%" }}
              animate={inView ? undefined : { y: 0 }}
              whileInView={inView ? { y: 0 } : undefined}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: delay + i * 0.05 }}
            >
              {w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}

export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={rm ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={rm ? false : "hide"}
      whileInView="show"
      viewport={{ once: true, margin: "-6% 0px" }}
      variants={{ hide: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, tilt }: { children: ReactNode; className?: string; tilt?: boolean }) {
  return (
    <motion.div
      className={className}
      data-tilt={tilt ? "" : undefined}
      variants={{ hide: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}

const HIDE = { top: "inset(0% 0% 100% 0%)", bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" } as const;

export function ClipImage({ img, alt, className, priority, sizes, caption, from = "top" }: { img: DaleyImg; alt: string; className?: string; priority?: boolean; sizes?: string; caption?: ReactNode; from?: "top" | "bottom" | "left" | "right" }) {
  const rm = useReducedMotion();
  return (
    <figure className={`${s.fig} ${className || ""}`}>
      <motion.span
        className={s.clipBox}
        style={{ aspectRatio: `${img.w} / ${img.h}` }}
        initial={rm ? false : { clipPath: HIDE[from], opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className={s.par} data-par>
          <Image src={img.src} alt={alt} fill priority={priority} sizes={sizes || "(min-width:1024px) 600px, 100vw"} placeholder="blur" blurDataURL={img.blur} className={s.img} />
        </span>
      </motion.span>
      {caption ? <figcaption className={s.cap}>{caption}</figcaption> : null}
    </figure>
  );
}