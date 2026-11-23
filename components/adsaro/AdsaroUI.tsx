"use client";
import { Fragment, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import s from "./adsaro.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Progress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return <motion.div className={s.progress} style={{ scaleX: x }} aria-hidden="true" />;
}

export function Words({ text, className, delay = 0, now = false }: { text: string; className?: string; delay?: number; now?: boolean }) {
  const rm = useReducedMotion();
  return (
    <span className={className} aria-hidden="true">
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className={s.wm}>
            <motion.span
              className={s.wi}
              initial={rm ? false : { y: "112%" }}
              {...(now ? { animate: { y: 0 } } : { whileInView: { y: 0 } })}
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

export function Fade({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={rm ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Btn({ href, external, variant = "p", children }: { href: string; external?: boolean; variant?: "p" | "w" | "g"; children: ReactNode }) {
  const rm = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });
  const cls = `${s.btn} ${variant === "w" ? s.btnW : variant === "g" ? s.btnG : s.btnP}`;
  const inner = <>{children}<ArrowRight size={18} className={s.arr} /></>;
  function move(e: PointerEvent<HTMLSpanElement>) {
    if (rm || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.22);
    my.set((e.clientY - r.top - r.height / 2) * 0.3);
  }
  return (
    <motion.span className={s.mag} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }} whileTap={rm ? undefined : { scale: 0.96 }}>
      {external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>}
    </motion.span>
  );
}

export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const rm = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sy = useSpring(ry, { stiffness: 160, damping: 18 });
  function move(e: PointerEvent<HTMLDivElement>) {
    if (rm || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  }
  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", height: "100%" }}
        onPointerMove={move}
        onPointerLeave={() => { rx.set(0); ry.set(0); }}
        whileHover={rm ? undefined : { y: -6 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}