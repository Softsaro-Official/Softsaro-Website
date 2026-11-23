"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { DaleyImg } from "@/lib/daley-data";
import { EASE } from "./DaleyFx";
import s from "./daley.module.css";

type Item = { img: DaleyImg; caption: string };
const pad = (n: number) => String(n).padStart(2, "0");
const slide: Variants = {
  enter: (d: number) => ({ x: d * 90, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: -d * 90, opacity: 0, scale: 0.96 }),
};

export default function DaleyGallery({ items }: { items: Item[] }) {
  const rm = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const isOpen = open !== null;

  const go = useCallback((n: number) => {
    setDir(n > 0 ? 1 : -1);
    setOpen((i) => (i === null ? i : (i + n + items.length) % items.length));
  }, [items.length]);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [isOpen, go, close]);

  const t = { duration: rm ? 0 : 0.5, ease: EASE };
  return (
    <>
      <div className={s.gal}>
        {items.map((it, i) => (
          <motion.button
            type="button" key={it.img.src} className={s.shot} data-cur="view" data-label="View" aria-label={`Open screenshot ${i + 1}: ${it.caption}`}
            initial={rm ? false : { opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
            onClick={(e) => { opener.current = e.currentTarget; setDir(1); setOpen(i); }}
          >
            <span className={s.shotImg} data-shot>
              <Image src={it.img.src} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 33vw, 50vw" placeholder="blur" blurDataURL={it.img.blur} className={s.img} />
              <span className={s.shotIcon}><Expand size={16} /></span>
            </span>
            <span className={s.shotMeta}><em>{pad(i + 1)}</em><b>{it.caption}</b></span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className={s.lb} role="dialog" aria-modal="true" aria-label="Project screenshots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: rm ? 0 : 0.35 }} onClick={close}>
            <div className={s.lbTop} onClick={(e) => e.stopPropagation()}>
              <span>{pad(open + 1)} / {pad(items.length)}</span>
              <button type="button" ref={closeBtn} className={s.lbBtn} onClick={close} aria-label="Close gallery"><X size={20} /></button>
            </div>
            <div className={s.lbStage} onClick={(e) => e.stopPropagation()}>
              <button type="button" className={`${s.lbNav} ${s.lbPrev}`} onClick={() => go(-1)} aria-label="Previous screenshot"><ArrowLeft size={20} /></button>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={open} className={s.lbSlide} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={t}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
                  onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
                >
                  <Image src={items[open].img.src} alt={items[open].caption} width={items[open].img.w} height={items[open].img.h} sizes="90vw" className={s.lbImg} draggable={false} placeholder="blur" blurDataURL={items[open].img.blur} />
                </motion.div>
              </AnimatePresence>
              <button type="button" className={`${s.lbNav} ${s.lbNext}`} onClick={() => go(1)} aria-label="Next screenshot"><ArrowRight size={20} /></button>
            </div>
            <div className={s.lbBottom} onClick={(e) => e.stopPropagation()}>
              <p>{items[open].caption}</p>
              <div className={s.lbThumbs}>
                {items.map((it, i) => (
                  <button type="button" key={it.img.src} className={`${s.lbThumb}${i === open ? ` ${s.lbThumbOn}` : ""}`} aria-label={`Show screenshot ${i + 1}`} aria-current={i === open}
                    onClick={() => { setDir(i > open ? 1 : -1); setOpen(i); }}>
                    <Image src={it.img.src} alt="" fill sizes="80px" className={s.img} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}