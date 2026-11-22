"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import TmPic, { type TmPerson } from "./TmPic";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TmPeople({ leaders, members }: { leaders: TmPerson[]; members: TmPerson[] }) {
  const [sel, setSel] = useState<TmPerson | null>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [desk, setDesk] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const m = window.matchMedia("(min-width: 901px) and (hover: hover)");
    const f = () => setDesk(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    if (!sel) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setSel(null); };
    document.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [sel]);

  const cur = members[active] || members[0];

  const overlay = (
    <AnimatePresence>
      {sel ? (
        <motion.div key="ov" className="tm-ov" role="dialog" aria-modal="true" aria-label={sel.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setSel(null)}>
          <motion.div className="tm-ovc" onClick={(e) => e.stopPropagation()} initial={{ y: 40, clipPath: "inset(8% 8% 8% 8% round 32px)" }} animate={{ y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="tm-ovp"><TmPic p={sel} sizes="(max-width: 900px) 100vw, 50vw" priority /></div>
            <div className="tm-ovt">
              <motion.span className="tm-eyebrow lt" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7, ease: EASE }}>Softsaro team</motion.span>
              <motion.h3 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.9, ease: EASE }}>{sel.name}</motion.h3>
              <motion.div className="tm-chips" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8, ease: EASE }}>
                {sel.role.split("|").map((r) => (<span key={r}>{r.trim()}</span>))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52, duration: 0.8, ease: EASE }}>
                <Link className="tm-ovlink" href="/#contact" onClick={() => setSel(null)}>Contact Softsaro</Link>
              </motion.div>
            </div>
            <button type="button" className="tm-x" aria-label="Close profile" onClick={() => setSel(null)} autoFocus>&times;</button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <section className="tm-lead" id="leadership">
        <div className="tm-in">
          <header className="tm-lh">
            <div>
              <span className="tm-eyebrow lt" data-rv>Leadership</span>
              <h2 className="tm-h2" data-rv>Guided by trust and clear direction.</h2>
            </div>
            <p data-rv>The people who keep the work focused, collaborative and moving forward.</p>
          </header>
          <div className="tm-lg">
            {leaders.map((p, i) => (
              <button type="button" key={p.slug} className={`tm-l l${i}`} onClick={() => setSel(p)} aria-label={`Open profile of ${p.name}`}>
                <span className={`tm-lf f${i}`} data-clip>
                  <TmPic p={p} sizes="(max-width: 900px) 90vw, 36vw" />
                </span>
                <span className="tm-gh" aria-hidden="true">{p.ini}</span>
                <span className="tm-lm"><b>{p.name}</b><small>{p.role}</small></span>
                <span className="tm-open" aria-hidden="true">View profile</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tm-wide" id="team">
        <div className="tm-in tm-wg">
          <div className="tm-wl">
            <span className="tm-eyebrow" data-rv>The wider team</span>
            <h2 className="tm-h2 dk" data-rv>Different strengths. One shared standard.</h2>
            <p className="tm-wp" data-rv>From first sketch to final release, every perspective makes the work stronger.</p>
            <div className="tm-pv" aria-hidden="true">
              <AnimatePresence>
                <motion.div key={cur.slug} className="tm-pvc" initial={{ opacity: 0, scale: 0.96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4, ease: EASE }}>
                  <TmPic p={cur} sizes="300px" />
                  <span className="tm-pvm"><b>{cur.name}</b><small>{cur.role}</small></span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <ul className="tm-rows">
            {members.map((p, i) => (
              <li key={p.slug} className="tm-li">
                <button
                  type="button"
                  className={`tm-row${desk && active === i ? " on" : ""}`}
                  aria-expanded={desk ? undefined : open === i}
                  onMouseEnter={desk ? () => setActive(i) : undefined}
                  onFocus={desk ? () => setActive(i) : undefined}
                  onClick={() => (desk ? setSel(p) : setOpen(open === i ? null : i))}
                >
                  <span className="tm-rn">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tm-th"><TmPic p={p} sizes="56px" /></span>
                  <span className="tm-rname">{p.name}</span>
                  <span className="tm-rrole">{p.role}</span>
                </button>
                <AnimatePresence initial={false}>
                  {!desk && open === i ? (
                    <motion.div key="x" className="tm-rx" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                      <div className="tm-rxi">
                        <span className="tm-rxp"><TmPic p={p} sizes="160px" /></span>
                        <div>
                          <b>{p.name}</b>
                          <p>{p.role}</p>
                          <button type="button" className="tm-rxb" onClick={() => setSel(p)}>View profile</button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}