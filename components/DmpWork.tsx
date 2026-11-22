"use client";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

type Cat = "web" | "seo" | "ads" | "social" | "content";
type Item = { id: string; cat: Cat; title: string; label: string; desc: string; tags: string[]; img?: string; href?: string; viz?: string };

const FILTERS: [string, string][] = [
  ["all", "All Work"], ["seo", "SEO"],
  ["ads", "Digital Marketing"], ["social", "Social Media"], ["content", "Content Marketing"],
];
const CATNAME: Record<Cat, string> = { web: "Web Development", seo: "SEO", ads: "Digital Marketing", social: "Social Media", content: "Content Marketing" };

const CONCEPTS: Item[] = [
  { id: "c-audit", cat: "seo", viz: "audit", img: "/assets/dmp/work/audit.jpg", title: "SEO audit and technical review", label: "SEO & Organic Growth", desc: "How we present crawl, speed and indexing findings with clear next steps.", tags: ["Site audit", "Technical SEO"] },
  { id: "c-kw", cat: "seo", viz: "kw", img: "/assets/dmp/work/kw.jpg", title: "Keyword research and on-page plan", label: "SEO & Organic Growth", desc: "Search terms grouped by intent and mapped to the pages that should rank for them.", tags: ["Keyword research", "On-page SEO"] },
  { id: "c-growth", cat: "seo", viz: "growth", img: "/assets/dmp/work/growth.jpg", title: "Organic search reporting", label: "SEO & Organic Growth", desc: "A plain-language view of visibility, clicks and the fixes we plan next.", tags: ["Search Console", "Reporting"] },
  { id: "c-gads", cat: "ads", viz: "gads", img: "/assets/dmp/work/gads.jpg", title: "Google Ads campaign dashboard", label: "Paid Advertising", desc: "Campaign structure, conversion tracking and optimization in one view.", tags: ["Google Ads", "Conversion tracking"] },
  { id: "c-meta", cat: "ads", viz: "meta", img: "/assets/dmp/work/meta.jpg", title: "Meta Ads creative and audiences", label: "Paid Advertising", desc: "Ad creative variants tested against audiences on Facebook and Instagram.", tags: ["Meta Ads", "Creative testing"] },
  { id: "c-grid", cat: "social", viz: "grid", img: "/assets/dmp/work/grid.jpg", title: "Instagram content grid", label: "Social Media Marketing", desc: "A planned feed that keeps a brand consistent and recognizable.", tags: ["Content design", "Community"] },
  { id: "c-cal", cat: "content", viz: "cal", img: "/assets/dmp/work/cal.jpg", title: "Content calendar and editorial plan", label: "Content Strategy", desc: "Search-focused topics scheduled across blog, social and email.", tags: ["Content strategy", "Blog optimization"] },
];

const V = "#6A67AE", L = "#AAA7D4", P = "#DCD9EF", D = "#171624", W = "#FFFFFF";
function Viz({ k }: { k: string }) {
  const s = { width: "100%", height: "100%", display: "block" } as const;
  const box = <rect x="14" y="14" width="292" height="192" rx="14" fill={W} />;
  const dots = <g><circle cx="30" cy="30" r="4" fill={P} /><circle cx="43" cy="30" r="4" fill={P} /><circle cx="56" cy="30" r="4" fill={P} /></g>;
  switch (k) {
    case "audit": return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true">{box}{dots}
      {[0, 1, 2, 3].map((i) => (<g key={i}><circle cx="38" cy={66 + i * 34} r="9" fill={i === 2 ? L : V} /><rect x="56" y={60 + i * 34} width={140 - i * 14} height="9" rx="4.5" fill={P} /><rect x="56" y={74 + i * 34} width={90 - i * 8} height="6" rx="3" fill="#EFEDF6" /></g>))}
      <circle cx="248" cy="110" r="38" fill="none" stroke={P} strokeWidth="12" /><path d="M248 72a38 38 0 0 1 36 26" fill="none" stroke={V} strokeWidth="12" strokeLinecap="round" /></svg>);
    case "kw": return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true">{box}{dots}
      {[0, 1, 2, 3, 4].map((i) => (<g key={i}><rect x="28" y={54 + i * 30} width="264" height="24" rx="8" fill={i === 1 ? P : "#F6F5F2"} /><rect x="38" y={62 + i * 30} width={100 + ((i * 37) % 70)} height="8" rx="4" fill={i === 1 ? V : L} /><rect x="232" y={61 + i * 30} width="48" height="10" rx="5" fill={i % 2 ? L : V} /></g>))}</svg>);
    case "growth": return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true">{box}{dots}
      {[0, 1, 2, 3].map((i) => (<line key={i} x1="30" x2="290" y1={70 + i * 38} y2={70 + i * 38} stroke="#EFEDF6" strokeWidth="2" />))}
      <path d="M30 178 C80 170 100 150 140 140 S210 104 290 66 L290 184 L30 184Z" fill={P} opacity=".7" />
      <path d="M30 178 C80 170 100 150 140 140 S210 104 290 66" fill="none" stroke={V} strokeWidth="5" strokeLinecap="round" /><circle cx="290" cy="66" r="7" fill={V} /></svg>);
    case "gads": return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true">{box}{dots}
      <rect x="28" y="50" width="160" height="62" rx="10" fill="#F6F5F2" /><rect x="38" y="60" width="26" height="9" rx="4.5" fill={V} /><rect x="38" y="76" width="120" height="9" rx="4.5" fill={D} opacity=".75" /><rect x="38" y="92" width="136" height="6" rx="3" fill={L} />
      {[0, 1, 2, 3, 4].map((i) => (<rect key={i} x={202 + i * 18} y={150 - (30 + ((i * 29) % 60))} width="12" height={30 + ((i * 29) % 60)} rx="4" fill={i === 3 ? V : L} />))}
      <rect x="28" y="128" width="160" height="56" rx="10" fill={P} /><rect x="38" y="140" width="90" height="8" rx="4" fill={V} /><rect x="38" y="156" width="120" height="6" rx="3" fill={L} /></svg>);
    case "meta": return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true"><rect x="14" y="14" width="292" height="192" rx="14" fill={P} />
      <g><rect x="30" y="30" width="124" height="160" rx="12" fill={V} /><circle cx="92" cy="94" r="28" fill={L} /><rect x="46" y="140" width="92" height="9" rx="4.5" fill={W} /><rect x="46" y="156" width="56" height="16" rx="8" fill={W} /></g>
      <g><rect x="166" y="30" width="124" height="160" rx="12" fill={D} /><path d="M166 120 L290 80 V190 H166Z" fill={V} opacity=".7" /><rect x="182" y="46" width="70" height="9" rx="4.5" fill={L} /><rect x="182" y="62" width="48" height="6" rx="3" fill={P} /><rect x="182" y="156" width="56" height="16" rx="8" fill={W} /></g></svg>);
    case "grid": return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true"><rect x="14" y="14" width="292" height="192" rx="14" fill={W} />
      {[0, 1, 2, 3, 4, 5].map((i) => { const x = 28 + (i % 3) * 90, y = 28 + Math.floor(i / 3) * 90; const f = [V, P, D, L, V, P][i];
        return (<g key={i}><rect x={x} y={y} width="84" height="84" rx="10" fill={f} />{i % 2 === 0 ? <circle cx={x + 42} cy={y + 42} r="16" fill={W} opacity=".55" /> : <rect x={x + 20} y={y + 36} width="44" height="10" rx="5" fill={i === 1 || i === 5 ? V : W} opacity=".8" />}</g>); })}</svg>);
    default: return (<svg viewBox="0 0 320 220" style={s} aria-hidden="true">{box}{dots}
      {Array.from({ length: 20 }).map((_, i) => { const x = 28 + (i % 5) * 54, y = 52 + Math.floor(i / 5) * 38; const on = [1, 4, 7, 8, 12, 15, 18].includes(i);
        return (<g key={i}><rect x={x} y={y} width="48" height="32" rx="8" fill={on ? P : "#F6F5F2"} />{on ? <rect x={x + 6} y={y + 12} width="36" height="8" rx="4" fill={i % 2 ? V : L} /> : null}</g>); })}</svg>);
  }
}

export default function DmpWork({ items, base }: { items: string[][]; base: string }) {
  const [f, setF] = useState("all");
  const rm = useReducedMotion();
  const all: Item[] = [...CONCEPTS];
  const shown = f === "all" ? all : all.filter((i) => i.cat === f);
  const tr = { duration: rm ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="dmp-wk">
      <LayoutGroup id="dmp-wk">
        <div className="dmp-wk-bar" role="group" aria-label="Filter portfolio by category">
          {FILTERS.map(([k, n]) => (
            <button key={k} type="button" className={`dmp-wk-f${f === k ? " on" : ""}`} aria-pressed={f === k} onClick={() => setF(k)}>
              {f === k ? <motion.span className="dmp-wk-pill" layoutId="pill" transition={{ duration: rm ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }} /> : null}
              <span>{n}</span>
            </button>
          ))}
        </div>
        <p className="dmp-wk-note">Cards marked <b>Concept example</b> are illustrative layouts of the work we do. They are not client results.</p>
        <motion.div layout className="dmp-wk-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((it) => (
              <motion.article layout key={it.id} className="dmp-wk-c" initial={rm ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={rm ? { opacity: 0 } : { opacity: 0, scale: 0.96 }} transition={tr}>
                <div className="dmp-wk-m">
                  {it.img ? <img src={it.img} alt={`${it.title} concept visual`} loading="lazy" decoding="async" /> : <Viz k={it.viz || ""} />}
                  <span className="dmp-wk-badge">Concept example</span>
                </div>
                <div className="dmp-wk-b">
                  <small className="dmp-wk-cat">{it.label}</small>
                  <b>{it.title}</b>
                  <p>{it.desc}</p>
                  <div className="dmp-wk-tags">{it.tags.map((t) => (<span key={t}>{t}</span>))}</div>
                  {it.href ? <a className="dmp-wk-link" href={it.href}>View project <span aria-hidden="true">&rarr;</span></a> : null}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}