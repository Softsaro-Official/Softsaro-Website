"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
type Props = { children: ReactNode; className?: string; delay?: number; href?: string; tilt?: boolean };

/** Card / link: rises in on scroll, lifts on hover and follows the mouse with a soft 3D tilt (Framer Motion owns all transforms here; GSAP never touches these). */
export function FxCard({ children, className, delay = 0, href, tilt = true }: Props) {
  const rm = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(mx, { stiffness: 160, damping: 18 });
  const canTilt = tilt && !rm;

  const move = (e: PointerEvent<HTMLElement>) => {
    if (!canTilt || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const leave = () => { mx.set(0); my.set(0); };

  const common = {
    className,
    initial: rm ? false : { opacity: 0, y: 44 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    whileHover: rm ? undefined : { y: -8, transition: { type: "spring" as const, stiffness: 280, damping: 22 } },
    transition: { duration: rm ? 0 : 0.9, ease: EASE, delay },
    style: canTilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined,
    onPointerMove: move,
    onPointerLeave: leave,
  };
  return href ? <motion.a href={href} {...common}>{children}</motion.a> : <motion.div {...common}>{children}</motion.div>;
}