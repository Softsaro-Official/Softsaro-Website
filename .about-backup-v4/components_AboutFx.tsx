"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
type Props = { children: ReactNode; className?: string; delay?: number; href?: string };

/** Card / link that rises in when scrolled to and lifts on hover (Framer Motion; GSAP does not touch these). */
export function FxCard({ children, className, delay = 0, href }: Props) {
  const rm = useReducedMotion();
  const common = {
    className,
    initial: rm ? false : { opacity: 0, y: 44 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    whileHover: rm ? undefined : { y: -8, transition: { type: "spring" as const, stiffness: 280, damping: 22 } },
    transition: { duration: rm ? 0 : 0.9, ease: EASE, delay },
  };
  return href ? <motion.a href={href} {...common}>{children}</motion.a> : <motion.div {...common}>{children}</motion.div>;
}