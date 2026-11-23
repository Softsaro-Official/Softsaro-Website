"use client";

import { Fragment, type ReactNode, type ElementType } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { SajhaImg } from "@/lib/sajha-data";
import s from "./sajha.module.css";

export const EASE = [0.16, 1, 0.3, 1] as const;
const VIEW = { once: true, margin: "-8% 0px" } as const;

type WordsProps = { text: string; as?: ElementType; className?: string; id?: string; inView?: boolean; delay?: number; stagger?: number };

/** Word-by-word masked heading reveal. */
export function Words({ text, as: Tag = "h2", className, id, inView = true, delay = 0, stagger = 0.06 }: WordsProps) {
  const rm = useReducedMotion();
  const words = text.split(" ");
  const trigger = inView ? { whileInView: { y: 0, rotate: 0 }, viewport: VIEW } : { animate: { y: 0, rotate: 0 } };
  return (
    <Tag className={className} id={id} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={s.mask} aria-hidden="true">
            <motion.span className={s.maskIn} initial={rm ? false : { y: "112%", rotate: 4 }} {...trigger} transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}>{w}</motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

export function Rise({ children, className, delay = 0, y = 34 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const rm = useReducedMotion();
  return (
    <motion.div className={className} initial={rm ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 1, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

const container = (gap: number, delay: number) => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

type StaggerProps = { children: ReactNode; className?: string; gap?: number; delay?: number };

export function Stagger({ children, className, gap = 0.1, delay = 0 }: StaggerProps) {
  const rm = useReducedMotion();
  return <motion.div className={className} variants={container(gap, delay)} initial={rm ? "show" : "hidden"} whileInView="show" viewport={VIEW}>{children}</motion.div>;
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={item}>{children}</motion.div>;
}
export function StaggerUl({ children, className, gap = 0.09, delay = 0 }: StaggerProps) {
  const rm = useReducedMotion();
  return <motion.ul className={className} variants={container(gap, delay)} initial={rm ? "show" : "hidden"} whileInView="show" viewport={VIEW}>{children}</motion.ul>;
}
export function StaggerLi({ children, className, node }: { children: ReactNode; className?: string; node?: boolean }) {
  return <motion.li className={className} variants={item} {...(node ? { "data-node": "" } : {})}>{children}</motion.li>;
}

type ClipProps = { img: SajhaImg; alt: string; sizes: string; priority?: boolean; caption?: ReactNode; className?: string; ratio?: string };

/** Clip-path reveal + inner scale + (GSAP) parallax. */
export function ClipImage({ img, alt, sizes, priority, caption, className = "", ratio }: ClipProps) {
  const rm = useReducedMotion();
  return (
    <figure className={`${s.fig} ${className}`}>
      <motion.div className={s.frame} data-frame style={{ aspectRatio: ratio ?? `${img.w} / ${img.h}` }}
        initial={rm ? false : { clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={VIEW} transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}>
        <motion.div className={s.scaler} initial={rm ? false : { scale: 1.25 }} whileInView={{ scale: 1 }} viewport={VIEW} transition={{ duration: 1.8, ease: EASE }}>
          <div className={s.par} data-par>
            <Image src={img.src} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" blurDataURL={img.blur} className={s.img} />
          </div>
        </motion.div>
      </motion.div>
      {caption ? <figcaption className={s.cap}>{caption}</figcaption> : null}
    </figure>
  );
}