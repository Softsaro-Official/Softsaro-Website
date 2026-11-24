"use client";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Rise({ className, i, children }: { className?: string; i: number; children: React.ReactNode }) {
  const rm = useReducedMotion();
  return (
    <motion.article
      className={className}
      initial={rm ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: rm ? 0 : 0.8, delay: rm ? 0 : (i % 3) * 0.1, ease }}
    >
      {children}
    </motion.article>
  );
}