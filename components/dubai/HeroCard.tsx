"use client";
import { motion, useReducedMotion } from "framer-motion";
import WhatsAppConsultForm from "@/components/dubai/WhatsAppConsultForm";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroCard() {
  const rm = useReducedMotion();
  return (
    <motion.aside
      className="dmh-card"
      initial={rm ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.9, delay: rm ? 0 : 0.35, ease }}
    >
      <div className="dmp-qcard-h"><span className="dmp-logo-s">softsaro</span><div><b>Book a free consultation</b><small>Tell us what you need, we reply on WhatsApp</small></div></div>
      <WhatsAppConsultForm />
    </motion.aside>
  );
}