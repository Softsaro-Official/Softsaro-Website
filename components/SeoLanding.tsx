import SlMotion from "@/components/SlMotion";
import SlForm from "@/components/SlForm";
import { D } from "@/lib/data";
import { photos, tools } from "@/lib/seo-data";
import { CONTACT, RESULTS, PRICING } from "@/lib/seo-landing-data";

const S = "https://softsaro.com.np";

const IC: Record<string, string> = {
  search: "M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z",
  trend: "M3 17l6-6 4 4 8-8M15 7h6v6",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  spark: "M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1",
  file: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  check: "M5 12l4 4 10-10",
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14M13 6l6 6-6 6",
  up: "M7 17L17 7M8 7h9v9",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  store: "M4 9l1-5h14l1 5M4 9v11h16V9M9 20v-6h6v6",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3",
  cart: "M3 4h2l2 11h10l2-8H7M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z",
  rocket: "M5 15c-1 1-2 4-2 6 2 0 5-1 6-2M14 4c4 0 6 2 6 6-2 4-5 7-9 8l-5-5c1-4 4-7 8-9z",
  users: "M16 11a4 4 0 100-8 4 4 0 000 8zM3 21c0-4 3-7 7-7s7 3 7 7M17 14c3 0 5 2 5 6",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  gauge: "M4 17a8 8 0 1116 0M12 17l4-5",
  edu: "M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
};
const Ic = ({ k }: { k: string }) => (
  <svg className="sl-ic" viewBox="0 0 24 24" aria-hidden="true"><path d={IC[k]} /></svg>
);
const Words = ({ t, cls = "" }: { t: string; cls?: string }) => (
  <>
    {t.split(" ").map((w, i) => (
      <span className="sl-m" key={i} aria-hidden="true"><span className={`sl-w ${cls}`.trim()}>{w}</span></span>
    ))}
  </>
);
const H2 = ({ t, em, id }: { t: string; em?: string; id?: string }) => (
  <h2 className="sl-h2" id={id} aria-label={em ? `${t} ${em}` : t}>
    <Words t={t} />
    {em ? <Words t={em} cls="sl-em" /> : null}
  </h2>
);
const SW = ({ t }: { t: string }) => (
  <>{t.split(" ").map((w, i) => (<span className="sl-sw" key={i}>{w} </span>))}</>
);

/* ---------- data ---------- */
const CHIPS = ["Google", "AI Overviews", "ChatGPT", "Gemini", "Local SEO", "Technical SEO"];

const PRINCIPLES = [
  { k: "target", t: "SEO strategy", d: "Priorities set by impact, not by a checklist." },
  { k: "code", t: "Technical SEO", d: "Speed, crawlability and structure that search engines can trust." },
  { k: "file", t: "Content strategy", d: "Pages built around what your customers really search for." },
  { k: "chart", t: "Transparent reporting", d: "Audits and reports from Search Console and Analytics." },
  { k: "shield", t: "Ethical SEO", d: "No guaranteed rankings and no shortcuts." },
  { k: "layers", t: "One team", d: "Design, development, SEO and hosting under one roof." },
];

const PANELS = [
  { img: photos.hero, t: "Audit & analysis", d: "Where you stand today, technically and against competitors." },
  { img: photos.keyword, t: "Keywords & content", d: "A roadmap built around real search intent, not guesswork." },
  { img: photos.audit, t: "Working together", d: "Planning sessions with your team, in person or online." },
];

const CRITERIA = [
  { t: "Verifiable experience", d: "Ask how long the provider has done SEO, in which industries, and for examples you can check.", k: "target" },
  { t: "Access to your data", d: "You should own your data. A good provider shows real numbers from your own Search Console and Analytics.", k: "chart" },
  { t: "Honest timelines", d: "Be wary of a guaranteed number-one ranking. Real SEO takes months and depends on competition.", k: "clock" },
  { t: "Guideline-friendly methods", d: "No paid link schemes, hidden text or fake reviews. Ask which tactics are used.", k: "shield" },
  { t: "Clear scope and pricing", d: "A transparent provider tells you what is included, what it costs and how to stop.", k: "file" },
  { t: "Understanding of AI search", d: "Customers now ask ChatGPT, Gemini and Google AI Overviews. Ask how AEO and GEO are handled.", k: "spark" },
];

const AREAS = [
  { n: "Dubai Marina", x: 14, y: 44 }, { n: "JLT", x: 22, y: 40 }, { n: "Al Barsha", x: 28, y: 48 },
  { n: "Jumeirah", x: 36, y: 35 }, { n: "Business Bay", x: 47, y: 38 }, { n: "Downtown Dubai", x: 53, y: 32 },
  { n: "DIFC", x: 59, y: 29 }, { n: "Deira", x: 71, y: 21 }, { n: "Sharjah", x: 87, y: 11 }, { n: "Abu Dhabi", x: 5, y: 55 },
];

const SERVICES = [
  { k: "tech", t: "Technical SEO", d: "Site speed, crawlability, indexation, structured data and mobile performance." },
  { k: "onpage", t: "On-page SEO", d: "Titles, headings, internal links, images and content structure." },
  { k: "offpage", t: "Off-page SEO", d: "Earning real links and brand mentions, without link schemes." },
  { k: "local", t: "Local SEO", d: "Google Business Profile, location pages and local citations." },
  { k: "keyword", t: "Keyword research", d: "What your customers search for, and the intent behind it." },
  { k: "content", t: "Content SEO", d: "Pages and articles optimized to be found and to convert." },
  { k: "data", t: "Audits & reporting", d: "Search Console and Analytics analysis, with plain-language reports." },
  { k: "ai", t: "AEO & GEO", d: "Clear answers, FAQ content and entity signals for AI search." },
];

const AUDIENCE = [
  { k: "rocket", t: "Startups & small businesses", d: "Practical SEO to get found without a large budget." },
  { k: "building", t: "Established companies", d: "A dedicated team for SEO and AI search visibility." },
  { k: "pin", t: "Real estate & property", d: "Listings, location pages and high-intent searches." },
  { k: "store", t: "Hospitality, retail & services", d: "Local visibility where customers search nearby." },
  { k: "cart", t: "E-commerce stores", d: "Category, product and technical SEO for online shops." },
  { k: "users", t: "Teams comparing options", d: "Agency, freelancer or in-house hire? We help you weigh it." },
];

const PROCESS = [
  { t: "Audit & analysis", d: "A full technical and competitive review of where you stand today." },
  { t: "Strategy & planning", d: "A keyword and content roadmap built around real search intent." },
  { t: "Implementation", d: "On-page, technical and content work, done and tracked." },
  { t: "Optimization", d: "Refinements based on what the data shows is working." },
  { t: "Monitoring & reporting", d: "Regular reports from Search Console and Analytics." },
  { t: "Continuous growth", d: "Ongoing improvement as rankings climb and the market shifts." },
];

const EDU = [
  { id: "SEO", t: "SEO", d: "Search Engine Optimization is the work of making your website easy to find, understand and trust in search results." },
  { id: "AEO", t: "AEO", d: "Answer Engine Optimization structures content so assistants and AI Overviews can pull a direct, quotable answer: clear headings, FAQ content and concise answers." },
  { id: "GEO", t: "GEO", d: "Generative Engine Optimization is about how AI models understand and cite your brand: topical authority and clear entity signals." },
  { id: "AI", t: "AI search", d: "People now ask Google AI Overviews, ChatGPT and Gemini and get answers before they click. Your content needs to work for both." },
  { id: "TECH", t: "Technical SEO", d: "Site speed, crawlability, indexation, structured data and mobile performance. The foundation under everything else." },
  { id: "INTENT", t: "Search intent", d: "Why someone searches: to learn, compare, buy or find a place. Pages should match that intent." },
  { id: "ORG", t: "Organic growth", d: "Compounding visits from unpaid search. It builds over months and depends on competition and consistency." },
];

const COMPARE_COLS = ["Freelancer", "In-house hire", "SEO agency"];
const COMPARE = [
  ["Who does the work", "One specialist plans and executes.", "A dedicated employee inside your company.", "A team of specialists across strategy, technical and content."],
  ["Speed of decisions", "Fast: one person decides.", "Fast on priorities, limited by one person's skills.", "Depends on process and team capacity."],
  ["Cost", "Usually lower than an agency.", "Salary, hiring costs and tools.", "Typically higher, as it covers a team."],
  ["Scale and channels", "Best for focused work; capacity is limited.", "Tied to one person's skill set.", "Better for multi-channel or multi-market programmes."],
  ["Continuity", "Depends on one person's availability.", "Stays inside your business.", "Work continues if one person is away."],
];

const FAQ = [
  { q: "What does SEO include?", a: "Technical fixes, on-page optimization, content, local SEO and reporting. We also cover AEO and GEO so AI tools can understand and cite your business." },
  { q: "Can you guarantee rankings?", a: "No. No one honestly can. We work on proven methods and report on what changes, so you can measure progress." },
  { q: "How long does SEO take?", a: "Real SEO takes months and depends on your competition and starting point. Early technical fixes can show sooner, but growth compounds over time." },
  { q: "Do you work with businesses in Dubai and the UAE?", a: "We work with clients online across countries. Dubai is only 1 hour 45 minutes behind Kathmandu, so calls fit comfortably within business hours." },
  { q: "What are AEO and GEO, and do I need them?", a: "AEO and GEO help AI tools such as Google AI Overviews, ChatGPT and Gemini understand and cite your business. They build on strong SEO, so they work best together." },
  { q: "How will I know it is working?", a: "We report on rankings, clicks and enquiries using tools like Google Search Console and Google Analytics, in plain language." },
  { q: "How much does SEO cost?", a: "It depends on your scope, market and competition. Book a free consultation and we will suggest the right approach and a quote." },
];

const SKY = Array.from({ length: 18 }, (_, i) => ({ x: i * 22 + 4, h: 34 + ((i * 37) % 64) + (i === 9 ? 56 : 0), w: 14 + ((i * 11) % 10) }));
const Skyline = ({ cls = "" }: { cls?: string }) => (
  <svg className={`sl-sky ${cls}`.trim()} viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    {SKY.map((b, i) => (
      <g key={i}>
        <rect className="sl-bld" x={b.x} y={160 - b.h} width={b.w} height={b.h} />
        {i === 9 ? <path className="sl-bld" d={`M${b.x + 2} ${160 - b.h}L${b.x + b.w / 2} ${160 - b.h - 30}L${b.x + b.w - 2} ${160 - b.h}Z`} /> : null}
        {[0, 1, 2, 3].map((j) => (
          <rect key={j} className={`sl-win${(i + j) % 3 === 0 ? " f" : ""}`} x={b.x + 3 + (j % 2) * (b.w / 2 - 1)} y={160 - b.h + 8 + Math.floor(j / 2) * 14} width="3" height="4" />
        ))}
      </g>
    ))}
  </svg>
);

const Art = ({ k }: { k: string }) => {
  switch (k) {
    case "tech":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><path className="sl-dash" d="M4 14h40l8 8h30M4 30h28l10 10h50M4 46h60l8-8h36" /><circle className="sl-pulse" cx="112" cy="22" r="3" /><circle className="sl-pulse d2" cx="112" cy="38" r="3" /></svg>);
    case "onpage":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><rect className="sl-hl" x="6" y="10" width="74" height="9" rx="4" /><rect className="sl-bar2" x="6" y="28" width="100" height="5" rx="2.5" /><rect className="sl-bar2 d2" x="6" y="40" width="70" height="5" rx="2.5" /></svg>);
    case "offpage":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><path className="sl-dash" d="M20 40L60 16l40 24M20 40h80" /><circle className="sl-pulse" cx="20" cy="40" r="5" /><circle className="sl-pulse d2" cx="60" cy="16" r="5" /><circle className="sl-pulse d3" cx="100" cy="40" r="5" /></svg>);
    case "local":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><ellipse className="sl-ripple" cx="60" cy="48" rx="14" ry="4" /><ellipse className="sl-ripple d2" cx="60" cy="48" rx="14" ry="4" /><path className="sl-bob" d="M60 44s12-10 12-20a12 12 0 10-24 0c0 10 12 20 12 20zM60 28a4 4 0 100-8 4 4 0 000 8z" /></svg>);
    case "keyword":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><rect x="6" y="14" width="108" height="20" rx="10" className="sl-field" /><circle cx="20" cy="24" r="4" className="sl-fieldic" /><rect className="sl-caret2" x="32" y="19" width="2" height="10" /><rect className="sl-bar2" x="32" y="42" width="60" height="5" rx="2.5" /></svg>);
    case "content":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><rect className="sl-write" x="6" y="8" width="100" height="6" rx="3" /><rect className="sl-write d2" x="6" y="22" width="84" height="6" rx="3" /><rect className="sl-write d3" x="6" y="36" width="94" height="6" rx="3" /><rect className="sl-write d4" x="6" y="50" width="50" height="6" rx="3" /></svg>);
    case "data":
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><rect className="sl-grow" x="12" y="20" width="14" height="38" rx="3" /><rect className="sl-grow d2" x="36" y="8" width="14" height="50" rx="3" /><rect className="sl-grow d3" x="60" y="28" width="14" height="30" rx="3" /><rect className="sl-grow d4" x="84" y="14" width="14" height="44" rx="3" /></svg>);
    default:
      return (<svg className="sl-art" viewBox="0 0 120 60" aria-hidden="true"><path className="sl-spin" d="M60 8l5 15 15 5-15 5-5 15-5-15-15-5 15-5z" /><path className="sl-spin d2" d="M96 34l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5z" /></svg>);
  }
};

const FAKE = [14, 22, 18, 30, 26, 38, 34, 46, 44, 58, 54, 70];
const CURVE = "M0 100C40 96 60 88 90 80S140 70 170 52 230 30 300 12";

function realPath(series: number[]) {
  const max = Math.max(...series, 1);
  const pts = series.map((v, i) => `${(i / Math.max(series.length - 1, 1)) * 300},${110 - (v / max) * 100}`);
  return "M" + pts.join("L");
}

export default function SeoLanding() {
  const real = RESULTS.metrics.some((m) => m.value !== null);
  const line = RESULTS.series && RESULTS.series.length > 1 ? realPath(RESULTS.series) : CURVE;
  return (
    <main className="sl-page">
      {/* ===== HERO ===== */}
      <section className="sl-hero sl-dark" id="sl-top">
        <div className="sl-hero-bg" aria-hidden="true"><span className="sl-grid" /><span className="sl-glow a" /><span className="sl-glow b" /><span className="sl-spot" /></div>
        <div className="sl-in sl-hero-in">
          <div className="sl-hero-copy">
            <p className="sl-pill" data-in><i />SEO &middot; AEO &middot; GEO &middot; Local</p>
            <h1 className="sl-h1" data-in aria-label="Be found in Dubai, on Google and in AI answers.">
              <Words t="Be found in Dubai, on Google and in" /><Words t="AI answers." cls="sl-em" />
            </h1>
            <p className="sl-lead" data-in>
              Softsaro is a Kathmandu-based digital partner. We help businesses in Dubai and the UAE get found on Google and cited in AI answers, and we report on what actually changed.
            </p>
            <div className="sl-cta-row" data-in>
              <a className="sl-btn p" data-mag href="#sl-contact"><span>Book a free consultation</span><Ic k="arrow" /></a>
              <a className="sl-btn g" data-mag href="#sl-process"><span>See how we work</span></a>
            </div>
            <ul className="sl-facts" data-in><li>8+ years as an IT company</li><li>Offices in Nepal &amp; USA</li><li>Dubai is 1h 45m behind Kathmandu</li></ul>
          </div>

          <div className="sl-stage" aria-hidden="true">
            <div className="sl-serp" data-in data-depth="14">
              <div className="sl-serp-bar"><Ic k="search" /><span className="sl-typed">best seo agency in dubai</span><i className="sl-caret" /></div>
              <div className="sl-serp-list">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div className={`sl-row${i === 4 ? " me" : ""}`} key={i}>
                    <i className="sl-fav" />
                    <div className="sl-row-t">{i === 4 ? <b>yourbrand.ae</b> : <span className="sl-l0" />}<span className="sl-l1" /><span className="sl-l2" /></div>
                    {i === 4 ? <em className="sl-rk">5</em> : null}
                  </div>
                ))}
              </div>
              <small className="sl-ill">Illustrative</small>
            </div>
            <div className="sl-ai" data-in data-depth="26">
              <div className="sl-ai-h"><Ic k="spark" />AI answer<em>Illustrative</em></div>
              <span className="sl-ai-l a" /><span className="sl-ai-l b" /><span className="sl-ai-l c" />
              <div className="sl-ai-src"><i />yourbrand.ae</div>
            </div>
            <div className="sl-chartc" data-in data-depth="-10">
              <div className="sl-chart-h">Organic growth<em>Illustrative</em></div>
              <svg viewBox="0 0 300 120" fill="none">
                <defs><linearGradient id="slg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b88c8" stopOpacity=".55" /><stop offset="1" stopColor="#8b88c8" stopOpacity="0" /></linearGradient></defs>
                <path className="sl-area" d={`${CURVE}V120H0Z`} fill="url(#slg)" />
                <path className="sl-line" pathLength={1} d={CURVE} />
                <circle className="sl-dotp" cx="300" cy="12" r="5" />
              </svg>
            </div>
            {CHIPS.map((c, i) => (<span className={`sl-chip c${i + 1}`} key={c} data-in>{c}</span>))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS / PROOF ===== */}
      <section className="sl-proof sl-dark" id="sl-results">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Proof, not promises</p>
            <H2 t="SEO you can" em="measure." />
            <p className="sl-lede" data-fade>We report on rankings, clicks and enquiries from your own Search Console and Analytics.</p>
          </div>
          <div className="sl-facts-strip">
            <div className="sl-fact" data-kpi><b><span className="sl-count" data-to="8">8</span>+</b><span>Years as an IT company</span></div>
            <div className="sl-fact" data-kpi><b><span className="sl-count" data-to="2">2</span></b><span>Offices: Nepal &amp; USA</span></div>
            <div className="sl-fact" data-kpi><b className="t">SEO &middot; AEO &middot; GEO</b><span>Search and AI search covered</span></div>
          </div>
          <div className="sl-dash-card" data-spot>
            <div className="sl-dash-h">
              <span>Performance report</span>
              {real ? <em className="real">{RESULTS.source}{RESULTS.period ? ` · ${RESULTS.period}` : ""}</em> : <em>Illustrative layout, not client data</em>}
            </div>
            <div className="sl-kpis">
              {RESULTS.metrics.map((m) => (
                <div className="sl-kpi" key={m.label} data-kpi>
                  <small>{m.label}</small>
                  {m.value !== null ? (<b><span className="sl-count" data-to={m.value} data-dec={m.value % 1 ? 1 : 0}>{m.value}</span>{m.suffix || ""}</b>) : (<b className="ph"><i /><i /></b>)}
                </div>
              ))}
            </div>
            <div className="sl-dash-chart">
              <svg viewBox="0 0 300 120" preserveAspectRatio="none" fill="none">
                <defs><linearGradient id="slg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a67ae" stopOpacity=".5" /><stop offset="1" stopColor="#6a67ae" stopOpacity="0" /></linearGradient></defs>
                {[20, 50, 80, 110].map((y) => (<line key={y} className="sl-gl" x1="0" x2="300" y1={y} y2={y} />))}
                <path className="sl-area2" d={`${line}V120H0Z`} fill="url(#slg2)" />
                <path className="sl-line2" pathLength={1} d={line} vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / WHY ===== */}
      <section className="sl-sec sl-about" id="sl-about">
        <div className="sl-in sl-about-in">
          <div className="sl-about-vis">
            <figure className="sl-about-main" data-circle>
              <img src={photos.why.src} alt={photos.why.alt} width={photos.why.w} height={photos.why.h} loading="lazy" decoding="async" data-par />
            </figure>
            <figure className="sl-about-round" data-pop>
              <img src={photos.round.src} alt={photos.round.alt} width={photos.round.w} height={photos.round.h} loading="lazy" decoding="async" />
            </figure>
            <div className="sl-badge" data-pop><b>8+</b><span>years in IT</span></div>
          </div>
          <div className="sl-about-copy">
            <p className="sl-eyebrow" data-fade><i />Why Softsaro</p>
            <H2 t="Why businesses choose Softsaro for" em="SEO." />
            <p className="sl-scrub">
              <SW t="Search results are crowded, so choosing an SEO partner deserves care. Our approach is deliberately simple: fix the technical foundation, build content around what your customers really search for, make your business easy for Google and AI tools to understand, and measure success in enquiries, not just rankings." />
            </p>
            <ul className="sl-prin">
              {PRINCIPLES.map((p) => (
                <li key={p.t}><span className="sl-pi"><Ic k={p.k} /></span><div><h3>{p.t}</h3><p>{p.d}</p></div></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== VISUAL PROOF PANELS ===== */}
      <section className="sl-sec sl-dark sl-panels-s" id="sl-practice">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />SEO in practice</p>
            <H2 t="How the work" em="looks." />
            <p className="sl-lede" data-fade>Analytics, strategy and teamwork behind every SEO engagement.</p>
          </div>
          <div className="sl-fan">
            {PANELS.map((p, i) => (
              <article className="sl-pcard" key={p.t} data-tilt data-spot data-i={i}>
                <img src={p.img.src} alt={p.img.alt} width={p.img.w} height={p.img.h} loading="lazy" decoding="async" />
                <span className="sl-pshade" />
                <div className="sl-pcap"><span>0{i + 1}</span><h3>{p.t}</h3><p>{p.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO CHOOSE ===== */}
      <section className="sl-sec sl-choose" id="sl-choose">
        <div className="sl-in sl-choose-in">
          <div className="sl-choose-head">
            <p className="sl-eyebrow" data-fade><i />Choosing an SEO provider</p>
            <H2 t="How to choose the right SEO" em="partner." />
            <p className="sl-lede" data-fade>No one can be objectively named the best, so judge by evidence. Use these six checks when you compare providers, including us.</p>
          </div>
          <div className="sl-stack">
            {CRITERIA.map((c, i) => (
              <article className="sl-crit" key={c.t} style={{ top: `calc(104px + ${i * 22}px)` }}>
                <span className="sl-crit-ic"><Ic k={c.k} /></span>
                <div><h3>{c.t}</h3><p>{c.d}</p></div>
                <b className="sl-crit-n">0{i + 1}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCAL SEO ===== */}
      <section className="sl-sec sl-dark sl-local" id="sl-local">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Local coverage</p>
            <H2 t="Local SEO across Dubai and the" em="UAE." />
            <p className="sl-lede" data-fade>Local search behaves differently by area. We build local visibility around where your customers actually search, using Google Business Profile, location pages and local citations where they make sense.</p>
          </div>
          <div className="sl-loc">
            <div className="sl-map" aria-hidden="true">
              <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice">
                <path className="sl-sea" d="M100 2C86 6 70 16 56 24S26 38 12 48 4 54 0 58V0H100Z" />
                <path className="sl-coast" pathLength={1} d="M100 2C86 6 70 16 56 24S26 38 12 48 4 54 0 58" />
                <path className="sl-route" pathLength={1} d="M5 55L14 44L22 40L28 48L36 35L47 38L53 32L59 29L71 21L87 11" />
                {AREAS.map((a, i) => (
                  <g key={a.n} className="sl-dot" data-i={i}><circle className="sl-ping" cx={a.x} cy={a.y} r="2" /><circle className="sl-pt" cx={a.x} cy={a.y} r="1.5" /></g>
                ))}
              </svg>
              <small>Illustrative map, not to scale</small>
            </div>
            <div className="sl-loc-side">
              <div className="sl-chips">
                {AREAS.map((a, i) => (<button type="button" className={`sl-ch${i === 5 ? " on" : ""}`} key={a.n} data-i={i} data-n={a.n}>{a.n}</button>))}
              </div>
              <div className="sl-loc-info" aria-live="polite"><h3>Downtown Dubai</h3><p>Location-specific pages, Google Business Profile and local citations, built around how customers search in this area.</p></div>
              <a className="sl-btn g" data-mag href="#sl-contact"><span>Ask about your area</span><Ic k="arrow" /></a>
            </div>
          </div>
        </div>
        <Skyline cls="local" />
      </section>

      {/* ===== SERVICES ===== */}
      <section className="sl-sec sl-services" id="sl-services">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />What we do</p>
            <H2 t="SEO, AEO and GEO" em="services." />
            <p className="sl-lede" data-fade>Every engagement starts with the same foundation: a technical and competitive review, then the content and AI-search work that follows from it.</p>
          </div>
          <div className="sl-svc-grid">
            {SERVICES.map((s) => (
              <article className="sl-svc" key={s.t} data-tilt data-spot>
                <Art k={s.k} />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOLS ===== */}
      <section className="sl-tools sl-dark" id="sl-tools" aria-label="SEO tools we use">
        <div className="sl-in"><p className="sl-eyebrow center" data-fade><i />Stack &amp; tools</p><h2 className="sl-h2 sl-tools-h" data-fade>Tools for audits, tracking and reporting.</h2></div>
        {[0, 1].map((r) => (
          <div className="sl-mq" data-dir={r ? "1" : "-1"} key={r} aria-hidden={r ? "true" : undefined}>
            <div className="sl-mq-t">
              {[0, 1].map((n) => (
                <div className="sl-mq-set" key={n}>
                  {(r ? [...tools].reverse() : tools).map((t: string) => (<span key={t}><i />{t}</span>))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ===== AUDIENCE ===== */}
      <section className="sl-sec sl-aud" id="sl-who">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Who we work with</p>
            <H2 t="Built for every stage of a" em="business." />
          </div>
          <div className="sl-aud-grid">
            {AUDIENCE.map((a) => (
              <article className="sl-aud-c" key={a.t}>
                <span className="sl-aud-ic"><Ic k={a.k} /></span>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="sl-sec sl-dark sl-proc" id="sl-process">
        <div className="sl-in sl-proc-in">
          <div className="sl-proc-side">
            <div className="sl-proc-stick">
              <p className="sl-eyebrow" data-fade><i />How we get you ranking</p>
              <H2 t="One process," em="every time." />
              <div className="sl-pnum" aria-hidden="true">
                <div className="sl-pnum-in">{PROCESS.map((_, i) => (<span key={i}>0{i + 1}</span>))}</div>
              </div>
              <svg className="sl-ring" viewBox="0 0 60 60" aria-hidden="true"><circle className="sl-ring-bg" cx="30" cy="30" r="26" /><circle className="sl-ring-fg" cx="30" cy="30" r="26" pathLength={1} /></svg>
            </div>
          </div>
          <ol className="sl-psteps">
            {PROCESS.map((s, i) => (
              <li className={`sl-pstep${i === 0 ? " on" : ""}`} key={s.t}>
                <span className="sl-pstep-n">0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== DATA-DRIVEN ===== */}
      <section className="sl-sec sl-data" id="sl-data">
        <div className="sl-in sl-data-in">
          <div className="sl-data-copy">
            <p className="sl-eyebrow" data-fade><i />Data-driven SEO</p>
            <H2 t="Decisions backed by" em="data." />
            <p className="sl-lede" data-fade>Every SEO decision is tied to measurable data: rankings, technical audits and how your brand appears in AI answers. Core tools include Google Search Console, Google Analytics and Screaming Frog.</p>
            <p className="sl-lede" data-fade>AI tools can help with research and first drafts, but every page should be reviewed for accuracy and usefulness before it goes live.</p>
          </div>
          <div className="sl-data-vis">
            <figure className="sl-data-photo" data-clip>
              <img src="/assets/dm/analytics.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" data-par />
            </figure>
            <div className="sl-widgets" data-spot>
              <div className="sl-w1"><small>Illustrative</small>
                <div className="sl-bars">{FAKE.map((h, i) => (<i key={i} style={{ height: `${h + 20}%` }} />))}</div>
              </div>
              <div className="sl-w2">
                <svg viewBox="0 0 80 80" aria-hidden="true"><circle className="sl-dn-bg" cx="40" cy="40" r="30" /><circle className="sl-dn-fg" cx="40" cy="40" r="30" pathLength={1} /></svg>
                <span>Technical health<em>Illustrative</em></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="sl-sec sl-dark sl-edu" id="sl-learn">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Every layer of SEO</p>
            <H2 t="Search itself has" em="changed." />
            <p className="sl-lede" data-fade>Search no longer ends at ten blue links. People ask AI tools questions and get answers before they click, so modern SEO covers both.</p>
          </div>
          <div className="sl-edu-body">
            <div className="sl-tabs" role="tablist" aria-label="SEO concepts">
              {EDU.map((e, i) => (<button type="button" role="tab" className={`sl-tab${i === 0 ? " on" : ""}`} key={e.id} aria-selected={i === 0} data-big={e.id}>{e.t}</button>))}
            </div>
            <div className="sl-edu-panel" data-spot>
              <div className="sl-big" aria-hidden="true">SEO</div>
              <div className="sl-panes">
                {EDU.map((e) => (<div className="sl-pane" role="tabpanel" key={e.id}><h3>{e.t}</h3><p>{e.d}</p></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section className="sl-sec sl-compare" id="sl-compare">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Freelancer, in-house or agency?</p>
            <H2 t="Which SEO option fits your" em="business?" />
            <p className="sl-lede" data-fade>The right choice comes down to scope, budget and how much direct access you want. Pick a column to compare.</p>
          </div>
          <div className="sl-ctoggle" role="group" aria-label="Highlight a column">
            {COMPARE_COLS.map((c, i) => (<button type="button" key={c} className={`sl-ct${i === 2 ? " on" : ""}`} data-c={i + 1}>{c}</button>))}
          </div>
          <div className="sl-table" data-col="3" role="table">
            <div className="sl-trow head" role="row"><span role="columnheader" /> {COMPARE_COLS.map((c, i) => (<span role="columnheader" className="sl-cell" data-c={i + 1} key={c}>{c}</span>))}</div>
            {COMPARE.map((r) => (
              <div className="sl-trow" role="row" key={r[0]}>
                <span className="sl-rl" role="rowheader">{r[0]}</span>
                {[1, 2, 3].map((n) => (<span className="sl-cell" role="cell" data-c={n} key={n}>{r[n]}</span>))}
              </div>
            ))}
          </div>
          <p className="sl-note">Where Softsaro fits: SEO alongside design, development and hosting, in one team.</p>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="sl-sec sl-dark sl-proj" id="sl-work">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Selected work</p>
            <H2 t="Websites we have" em="built." />
            <p className="sl-lede" data-fade>A few Softsaro projects. Each website is built to be fast, structured and ready for search.</p>
          </div>
          <div className="sl-proj-grid">
            {(D.pj as string[][]).map((p) => (
              <a className="sl-pj" key={p[4]} href={`/portfolio/${p[4]}`} data-tilt data-spot>
                <span className="sl-pj-img"><img src={p[3]} alt={`${p[0]} website`} loading="lazy" decoding="async" /></span>
                <span className="sl-pj-b"><small>{p[1]}</small><h3>{p[0]}</h3><p>{p[2]}</p><i><Ic k="up" /></i></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="sl-sec sl-price" id="sl-pricing">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Pricing</p>
            <H2 t="SEO built around your" em="goals." />
            <p className="sl-lede" data-fade>Pricing depends on your scope, market and competition. Book a free consultation and we will suggest the right approach and a clear quote.</p>
          </div>
          <div className="sl-price-grid">
            {PRICING.map((p, i) => (
              <article className={`sl-plan${i === 1 ? " mid" : ""}`} key={p.name} data-tilt data-spot>
                <h3>{p.name}</h3>
                <p className="sl-plan-b">{p.blurb}</p>
                <div className="sl-plan-p">{p.price ? (<><b>{p.price}</b><small>{p.unit}</small></>) : (<b className="q">Custom quote</b>)}</div>
                <ul>{p.points.map((pt) => (<li key={pt}><Ic k="check" />{pt}</li>))}</ul>
                <a className="sl-btn p" data-mag href="#sl-contact"><span>Request a quote</span><Ic k="arrow" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="sl-sec sl-faq" id="sl-faq">
        <div className="sl-in sl-faq-in">
          <div className="sl-faq-head">
            <p className="sl-eyebrow" data-fade><i />FAQ</p>
            <H2 t="Questions," em="answered." />
            <p className="sl-lede" data-fade>Clear answers to help you decide before you get in touch.</p>
          </div>
          <ul className="sl-fqs">
            {FAQ.map((f, i) => (
              <li className="sl-fqi" key={f.q}>
                <button className="sl-fq" type="button" aria-expanded="false">
                  <span className="sl-fqn">0{i + 1}</span><span className="sl-fqt">{f.q}</span><i className="sl-plus" aria-hidden="true" />
                </button>
                <div className="sl-fa"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="sl-sec sl-dark sl-testi" id="sl-reviews">
        <div className="sl-in">
          <div className="sl-head-c">
            <p className="sl-eyebrow" data-fade><i />Client feedback</p>
            <H2 t="What clients say about" em="Softsaro." />
          </div>
        </div>
        <div className="sl-tq" tabIndex={0} aria-label="Client testimonials">
          {(D.tq as string[][]).map((t) => (
            <figure className="sl-tq-c" key={t[0]}><blockquote>{t[2]}</blockquote><figcaption><b>{t[0]}</b><span>{t[1]}</span></figcaption></figure>
          ))}
        </div>
        <div className="sl-in"><div className="sl-tq-prog" aria-hidden="true"><i /></div></div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="sl-sec sl-contact" id="sl-contact">
        <div className="sl-in sl-contact-in">
          <div className="sl-contact-copy">
            <p className="sl-eyebrow" data-fade><i />Contact</p>
            <H2 t="Let's get your business" em="ranking." />
            <p className="sl-lede" data-fade>Tell us about your business and we will reply with an honest view of what is realistic.</p>
            <ul className="sl-ctiles">
              <li><a href={CONTACT.tel}><i><Ic k="phone" /></i><span><small>Call us</small>{CONTACT.phone}</span></a></li>
              <li><a href={`mailto:${CONTACT.email}`}><i><Ic k="mail" /></i><span><small>Email us</small>{CONTACT.email}</span></a></li>
              <li><div><i><Ic k="pin" /></i><span><small>Visit us</small>{CONTACT.address}</span></div></li>
            </ul>
          </div>
          <div className="sl-form-card" data-spot><SlForm email={CONTACT.email} phone={CONTACT.phone} tel={CONTACT.tel} /></div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="sl-final sl-dark" id="sl-final">
        <span className="sl-sun" aria-hidden="true" />
        <div className="sl-in sl-final-in">
          <H2 t="Ready to be found in" em="Dubai?" />
          <p className="sl-lede" data-fade>Book a free consultation and get an honest view of what is realistic for your business.</p>
          <div className="sl-cta-row center" data-fade>
            <a className="sl-btn w" data-mag href="#sl-contact"><span>Book a free consultation</span><Ic k="arrow" /></a>
            <a className="sl-btn g2" data-mag href={CONTACT.tel}><span>Call {CONTACT.phone}</span></a>
          </div>
        </div>
        <Skyline cls="final" />
      </section>

      <SlMotion />
    </main>
  );
}