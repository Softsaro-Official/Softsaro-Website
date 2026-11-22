"use client";
import { useGSAP } from "@gsap/react";
import { initMotion } from "@/lib/motion";

export default function Motion() {
  useGSAP(() => initMotion(), []);
  return null;
}
