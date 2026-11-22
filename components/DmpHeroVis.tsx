"use client";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroVis({ a }: { a: string }) {
  const rm = useReducedMotion();
  return (
    <motion.figure
      className="dmh-vis"
      initial={rm ? false : { clipPath: "inset(0 0 100% 0 round 24px)", opacity: 0 }}
      animate={{ clipPath: "inset(0 0 0% 0 round 24px)", opacity: 1 }}
      transition={{ duration: rm ? 0 : 1.1, delay: rm ? 0 : 0.5, ease }}
    >
      <img src={a} alt="Softsaro team planning a digital marketing campaign" decoding="async" />
      <figcaption className="dmh-cap"><i />Search &middot; Ads &middot; Social &middot; Content</figcaption>
    </motion.figure>
  );
}