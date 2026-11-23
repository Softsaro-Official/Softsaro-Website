import DmxMotion from "@/components/DmxMotion";
import DmxForm from "@/components/DmxForm";
import { D } from "@/lib/data";
import { CONTACT, PACKAGES } from "@/lib/dmd-data";

const S = "https://softsaro.com.np";
const P = (d: string, n: string) => `/assets/${d}/${n}.jpg`;

const IC: Record<string, string> = {
  share: "M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z",
  megaphone: "M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a4 4 0 010 6M18 6.5a8 8 0 010 11",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  compass: "M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5z",
  funnel: "M3 4h18l-7 8v7l-4-2v-5z",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 100-8 4 4 0 000 8z",
  fb: "M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z",
  tag: "M3 12V4h8l10 10-8 8zM7.5 8.5h.01",
  zap: "M13 2L4 14h7l-1 8 9-12h-7z",
  users: "M16 11a4 4 0 100-8 4 4 0 000 8zM3 21c0-4 3-7 7-7s7 3 7 7M17 14c3 0 5 2 5 6",
  spark: "M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  trend: "M3 17l6-6 4 4 8-8M15 7h6v6",
  click: "M5 3l14 7-6 2-2 6z",
  dollar: "M12 3v18M16 7.5C15 6 13.5 5.5 12 5.5c-2 0-3.5 1-3.5 2.5s1.5 2.2 3.5 2.7 3.5 1.2 3.5 2.8S14 16.5 12 16.5c-1.5 0-3-.5-4-2",
  rocket: "M5 15c-1 1-2 4-2 6 2 0 5-1 6-2M14 4c4 0 6 2 6 6-2 4-5 7-9 8l-5-5c1-4 4-7 8-9z",
  cart: "M3 4h2l2 11h10l2-8H7M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  heart: "M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z",
  briefcase: "M3 8h18v12H3zM9 8V5h6v3M3 13h18",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  check: "M5 12l4 4 10-10",
  arrow: "M5 12h14M13 6l6 6-6 6",
  up: "M7 17L17 7M8 7h9v9",
  down: "M12 5v14M5 12l7 7 7-7",
};
const Ic = ({ k }: { k: string }) => (
  <svg className="dmx-ic" viewBox="0 0 24 24" aria-hidden="true"><path d={IC[k]} /></svg>
);
const Chars = ({ t, em = [] }: { t: string; em?: string[] }) => (
  <>
    {t.split(" ").map((w, i) => (
      <span className="dmx-wd" key={i} aria-hidden="true">
        {Array.from(w).map((c, j) => (
          <span className="dmx-m" key={j}><span className={`dmx-c${em.includes(w) ? " em" : ""}`}>{c}</span></span>
        ))}
      </span>
    ))}
  </>
);
const Words = ({ t, cls = "" }: { t: string; cls?: string }) => (
  <>
    {t.split(" ").map((w, i) => (
      <span className="dmx-m dmx-wm" key={i} aria-hidden="true"><span className={`dmx-w ${cls}`.trim()}>{w}</span></span>
    ))}
  </>
);
const H2 = ({ t, em }: { t: string; em?: string }) => (
  <h2 className="dmx-h2" aria-label={em ? `${t} ${em}` : t}>
    <Words t={t} />
    {em ? <Words t={em} cls="dmx-em" /> : null}
  </h2>
);
const SW = ({ t }: { t: string }) => (
  <>{t.split(" ").map((w, i) => (<span className="dmx-sw" key={i}>{w} </span>))}</>
);
const st = (i: number) => ({ "--i": i } as React.CSSProperties);

const STATS = [
  { n: 8, s: "+", l: "Years as an IT company" },
  { n: 2, s: "", l: "Offices: Nepal & USA" },
  { n: 8, s: "", l: "Digital marketing services" },
  { n: 6, s: "", l: "Steps from research to reporting" },
];

const TAKEAWAYS = [
  "Start with goals. Leads, sales or awareness decide the channel mix.",
  "Use a few channels well instead of every channel badly.",
  "Track conversions, not only clicks and likes.",
  "Expect testing and optimization: results build over weeks and months.",
];

const CHECKS = [
  "Ask which channels they recommend and why",
  "Ask how results are measured and reported",
  "Check that you own your ad accounts and data",
  "Be wary of guaranteed results",
  "Ask what is included and how to stop",
  "Ask for examples of work you can verify",
];

const WHY = [
  { k: "compass", t: "Strategic marketing approach", d: "Every channel has a purpose tied to your business goals." },
  { k: "chart", t: "Data-driven decisions", d: "Budgets and creative are adjusted based on what performance data shows." },
  { k: "spark", t: "Creative campaigns", d: "Visuals and messaging that reflect your brand and speak to your audience." },
  { k: "eye", t: "Transparent reporting", d: "Plain-language reports, so you always know what is working." },
  { k: "target", t: "Business-focused solutions", d: "We aim for enquiries, leads and sales, not just likes and clicks." },
  { k: "users", t: "Experienced digital team", d: "Strategy, design, development and analytics in one team, with 8+ years in IT." },
];

const SERVICES = [
  { k: "share", t: "Social Media Marketing", d: "Content planning, community management and platform strategy that build an engaged audience and brand awareness." },
  { k: "target", t: "Google Ads & PPC", d: "Search, display and remarketing campaigns built around clear goals and tracked conversions." },
  { k: "megaphone", t: "Facebook & Instagram Advertising", d: "Targeted Meta campaigns, creative testing and audience building to reach the right people." },
  { k: "doc", t: "Content Marketing", d: "Articles, videos and visuals that explain your value and support every stage of the customer journey." },
  { k: "mail", t: "Email Marketing", d: "Newsletters, campaigns and automated flows that nurture leads and keep customers engaged." },
  { k: "compass", t: "Digital Marketing Strategy", d: "A channel plan, budget approach and measurement framework tied to your goals, including SEO where it fits." },
  { k: "funnel", t: "Lead Generation", d: "Landing pages, forms and conversion rate optimization designed to bring in qualified enquiries." },
  { k: "chart", t: "Performance Marketing & Analytics", d: "Conversion tracking, reporting and ongoing optimization so spend goes where it works." },
];

const STEPS = [
  { t: "Research & Discovery", d: "We learn your business, audience, competitors and goals." },
  { t: "Strategy & Planning", d: "A channel mix, budget approach and measurement plan." },
  { t: "Campaign Creation", d: "Ad creative, content, landing pages and tracking setup." },
  { t: "Launch & Execution", d: "Campaigns go live across the agreed channels." },
  { t: "Optimization", d: "Targeting, creative and budgets refined from real results." },
  { t: "Analytics & Reporting", d: "Clear reports on performance and recommended next steps." },
];

const TOOLS = [
  { k: "target", t: "Google Ads", s: "Google Ads", d: "Search and display advertising" },
  { k: "megaphone", t: "Meta Ads", s: "Meta Ads", d: "Facebook and Instagram campaigns" },
  { k: "camera", t: "Instagram", s: "Instagram", d: "Organic content and community" },
  { k: "fb", t: "Facebook", s: "Facebook", d: "Pages, groups and audiences" },
  { k: "chart", t: "Google Analytics", s: "Analytics", d: "Traffic and conversion insights" },
  { k: "tag", t: "Google Tag Manager", s: "Tag Manager", d: "Tracking and event setup" },
  { k: "mail", t: "Email marketing platforms", s: "Email platforms", d: "Campaigns and automated flows" },
  { k: "zap", t: "Marketing automation tools", s: "Automation", d: "Lead nurturing workflows" },
];

const AUDIENCE = [
  { k: "rocket", t: "Startups & small businesses", d: "Practical campaigns that build awareness and first customers without wasted spend." },
  { k: "cart", t: "E-commerce businesses", d: "Product promotion, retargeting and email flows that turn visitors into buyers." },
  { k: "building", t: "Real estate companies", d: "Lead generation and property promotion across search and social." },
  { k: "globe", t: "Hospitality & tourism", d: "Seasonal campaigns and a social presence that attract guests and bookings." },
  { k: "heart", t: "Healthcare & professional services", d: "Trust-building content and local visibility for clinics and firms." },
  { k: "briefcase", t: "Established companies", d: "Structured, multi-channel programmes with clear reporting." },
];

const METRICS = [
  { k: "trend", t: "Campaign performance", d: "Progress against the goals agreed at the start." },
  { k: "users", t: "Audience engagement", d: "How people interact with your content and ads." },
  { k: "eye", t: "Website traffic", d: "Where visitors come from and what they do next." },
  { k: "funnel", t: "Leads and conversions", d: "Enquiries, sign-ups and sales from each channel." },
  { k: "click", t: "Advertising performance", d: "Reach, clicks and cost across paid campaigns." },
  { k: "dollar", t: "Return on ad spend", d: "Revenue compared with ad spend, so budget follows what works." },
];

const FAQ = [
  { q: "What does digital marketing include?", a: "Digital marketing covers the online channels used to reach and convert customers: social media, paid advertising such as Google Ads and Meta Ads, content, email, lead generation and analytics. We combine the ones that fit your goals into one plan, and SEO can be part of it where it makes sense." },
  { q: "Why does my business need digital marketing in Dubai?", a: "Dubai is a competitive market where customers research and compare online before they choose. Digital marketing helps the right people find your business, understand what you offer and contact you, and it lets you measure what each channel brings in." },
  { q: "Which digital marketing services are suitable for my business?", a: "It depends on your goals, audience and budget. Local businesses often start with Google Ads and social media, e-commerce stores with Meta ads and email, and service companies with lead generation. We recommend a starting mix in your consultation." },
  { q: "How long does it take to see campaign results?", a: "Paid campaigns can start producing data within days, but meaningful results usually need a few weeks of testing and optimization. Content and organic channels build over months. We set realistic expectations before we start and never guarantee specific results." },
  { q: "Do you manage Google Ads and social media campaigns?", a: "Yes. We plan, set up, run and optimize Google Ads, Facebook and Instagram campaigns and organic social media, and we report on them in plain language." },
  { q: "Can you create a customized marketing strategy?", a: "Yes. Every strategy starts with your business goals, audience and competitors, then a channel mix, budget approach and measurement plan built around them. We do not use one-size-fits-all packages." },
  { q: "How do you measure campaign performance?", a: "We track the metrics tied to your goals, such as reach, engagement, website traffic, leads, conversions and return on ad spend, using tools like Google Analytics and Google Tag Manager, and we share clear reports." },
  { q: "How can I get started?", a: "Book a free consultation using the form below or call +977 9818439664. We will talk through your business and goals and suggest a practical next step." },
];

const BARS = [38, 52, 44, 66, 58, 78, 70, 90];
const CURVE = "M0 92C30 88 50 80 80 70S130 62 160 46 220 30 300 14";

export default function DmxPage() {
  return (
    <main className="dmx-page">
      {/* ===== 1. HERO ===== */}
      <section className="dmx-hero dmx-dark" id="dmx-top">
        <div className="dmx-hero-bg" aria-hidden="true">
          <img className="dmx-hero-photo" src={P("dmx", "dubai")} alt="" fetchPriority="high" decoding="async" />
          <span className="dmx-hero-shade" /><span className="dmx-glow" /><span className="dmx-spot" />
        </div>
        <div className="dmx-in dmx-hero-in">
          <div className="dmx-hero-copy">
            <span className="dmx-pill" data-h>Digital marketing agency in Dubai</span>
            <h1 className="dmx-h1" data-h aria-label="Grow your business with smarter digital marketing in Dubai.">
              <Chars t="Grow your business with smarter digital marketing in Dubai." em={["smarter"]} />
            </h1>
            <p className="dmx-lead" data-h>
              Softsaro plans, launches and measures campaigns across social media, paid ads, content and email for businesses in Dubai and the UAE. Our team works with you remotely from Kathmandu.
            </p>
            <div className="dmx-cta" data-h>
              <a className="dmx-btn p" data-mag href="#dmx-contact"><span>Book a free consultation</span><Ic k="arrow" /></a>
              <a className="dmx-btn o" data-mag href="#dmx-services"><span>Explore services</span><Ic k="down" /></a>
            </div>
            <p className="dmx-tz" data-h>Dubai is 1 hour 45 minutes behind Kathmandu, so calls fit comfortably within business hours.</p>
          </div>
          <div className="dmx-stack" aria-hidden="true">
            <figure className="dmx-st-main" data-h data-tilt><img src={P("dmd", "global")} alt="" decoding="async" /></figure>
            <figure className="dmx-st-sub" data-h><img src={P("dmd", "brain")} alt="" decoding="async" /></figure>
            <div className="dmx-st-card" data-h>
              <div className="dmx-hc-h"><b>Campaign overview</b><em>Illustrative</em></div>
              <div className="dmx-hc-bars">{BARS.map((h, i) => (<i key={i} style={{ height: `${h}%` }} />))}</div>
            </div>
            <span className="dmx-chip c1" data-h>Social</span>
            <span className="dmx-chip c2" data-h>Google Ads</span>
            <span className="dmx-chip c3" data-h>Email</span>
          </div>
        </div>
        <div className="dmx-in">
          <ul className="dmx-stats" data-h>
            {STATS.map((s) => (
              <li key={s.l}><b><span className="dmx-count" data-to={s.n}>{s.n}</span>{s.s}</b><span>{s.l}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 2. AT A GLANCE + WHY SOFTSARO ===== */}
      <section className="dmx-sec dmx-sheet dmx-why" id="dmx-why">
        <div className="dmx-in">
          <div className="dmx-glance">
            <article className="dmx-quick dmx-gb" data-up>
              <span className="dmx-eye"><Ic k="check" />Quick answer</span>
              <p>Digital marketing in Dubai means reaching and converting customers through online channels: social media, Google Ads, Meta ads, content and email. A good plan sets goals first, picks the channels that fit your business, builds campaigns around your brand, and measures results in leads and sales, not clicks alone.</p>
            </article>
            <article className="dmx-take" data-up>
              <span className="dmx-eye">Key takeaways</span>
              <ol>{TAKEAWAYS.map((t, i) => (<li key={t}><b>{i + 1}</b><span>{t}</span></li>))}</ol>
            </article>
          </div>

          <div className="dmx-split dmx-why-split">
            <figure className="dmx-pimg dmx-why-img" data-clip>
              <img src={P("dmx", "board")} alt="Team collaborating around a whiteboard during a marketing planning meeting" loading="lazy" decoding="async" data-par />
              <figcaption className="dmx-badge"><b>8+</b><span>years in IT</span></figcaption>
            </figure>
            <div>
              <span className="dmx-eye">Why choose Softsaro</span>
              <H2 t="Why businesses in Dubai choose" em="Softsaro" />
              <p className="dmx-lede dmx-scrub"><SW t="Dubai is a fast-moving, competitive market. We keep digital marketing practical: set clear goals, choose the channels that fit your business, create campaigns that look and sound like your brand, and report on what the numbers show." /></p>
              <ul className="dmx-feats">
                {WHY.map((w, i) => (
                  <li key={w.t} data-up style={st(i % 2)}><span className="dmx-ico"><Ic k={w.k} /></span><div><h3>{w.t}</h3><p>{w.d}</p></div></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dmx-checks" data-up>
            <h3>Before you choose a digital marketing partner</h3>
            <ul>{CHECKS.map((c, i) => (<li key={c} style={st(i)}><i><Ic k="check" /></i>{c}</li>))}</ul>
          </div>
        </div>
      </section>

      {/* ===== 3. SERVICES ===== */}
      <section className="dmx-sec dmx-sheet dmx-dark" id="dmx-services">
        <div className="dmx-in">
          <div className="dmx-head">
            <span className="dmx-eye">Our services</span>
            <H2 t="Digital marketing services in" em="Dubai" />
            <p className="dmx-lede" data-up>Everything your business needs to be seen, trusted and chosen online, planned as one connected strategy.</p>
          </div>
          <div className="dmx-svc-grid">
            {SERVICES.map((s, i) => (
              <article className="dmx-svc dmx-gb" key={s.t} data-tilt data-spot>
                <i className="dmx-spl" />
                <span className="dmx-svc-n">0{i + 1}</span>
                <span className="dmx-ico"><Ic k={s.k} /></span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <i className="dmx-go"><Ic k="up" /></i>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. PROCESS ===== */}
      <section className="dmx-sec dmx-sheet dmx-process" id="dmx-process">
        <div className="dmx-in">
          <div className="dmx-head dmx-head-img">
            <div>
              <span className="dmx-eye">How we work</span>
              <H2 t="Our digital marketing" em="process" />
              <p className="dmx-lede" data-up>A clear path from the first conversation to ongoing growth.</p>
            </div>
            <figure className="dmx-pimg dmx-strat" data-clip>
              <img src="/assets/dm/strategy.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" data-par />
            </figure>
          </div>
          <div className="dmx-tl">
            <span className="dmx-tl-rail"><i className="dmx-tl-fill" /></span>
            <ol className="dmx-tl-steps">
              {STEPS.map((s, i) => (
                <li className="dmx-tl-step" key={s.t}>
                  <span className="dmx-tl-dot"><b>0{i + 1}</b></span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== 5. PLATFORMS (orbit) ===== */}
      <section className="dmx-sec dmx-sheet dmx-dark dmx-plat" id="dmx-tools">
        <div className="dmx-in">
          <div className="dmx-head dmx-center">
            <span className="dmx-eye">Tools &amp; platforms</span>
            <H2 t="Platforms and tools we" em="work with" />
            <p className="dmx-lede" data-up>We work across the major advertising, analytics and automation platforms.</p>
          </div>
          <div className="dmx-orbit-w">
            <div className="dmx-orbit" aria-hidden="true">
              <div className="dmx-core"><i /><i /><span>Your growth</span></div>
              <div className="dmx-ring r1">
                {TOOLS.slice(0, 4).map((t, i) => (
                  <div className="dmx-slot" key={t.t} style={{ "--a": `${i * 90}deg` } as React.CSSProperties}>
                    <div className="dmx-bdg" style={{ "--a": `${i * 90}deg` } as React.CSSProperties}><Ic k={t.k} />{t.s}</div>
                  </div>
                ))}
              </div>
              <div className="dmx-ring r2">
                {TOOLS.slice(4).map((t, i) => (
                  <div className="dmx-slot" key={t.t} style={{ "--a": `${i * 90 + 45}deg` } as React.CSSProperties}>
                    <div className="dmx-bdg" style={{ "--a": `${i * 90 + 45}deg` } as React.CSSProperties}><Ic k={t.k} />{t.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ul className="dmx-tools">
            {TOOLS.map((t, i) => (
              <li key={t.t} data-up style={st(i % 4)}><span className="dmx-ico"><Ic k={t.k} /></span><div><h3>{t.t}</h3><p>{t.d}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 6. WHO WE WORK WITH ===== */}
      <section className="dmx-sec dmx-sheet dmx-who" id="dmx-who">
        <div className="dmx-in dmx-split rev">
          <div>
            <span className="dmx-eye">Who we work with</span>
            <H2 t="Marketing for every stage of" em="business" />
            <ul className="dmx-aud">
              {AUDIENCE.map((a, i) => (
                <li key={a.t} data-curtain style={st(i % 2)}><span className="dmx-ico"><Ic k={a.k} /></span><div><h3>{a.t}</h3><p>{a.d}</p></div></li>
              ))}
            </ul>
          </div>
          <figure className="dmx-pimg dmx-who-img" data-clip>
            <img src={P("dmx", "crew")} alt="A creative team meeting around a table with a whiteboard" loading="lazy" decoding="async" data-par />
          </figure>
        </div>
      </section>

      {/* ===== 7. RESULTS & ANALYTICS ===== */}
      <section className="dmx-sec dmx-sheet dmx-dark dmx-res" id="dmx-results">
        <img className="dmx-res-bg" src="/assets/dm/analytics.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="dmx-in dmx-split">
          <div>
            <span className="dmx-eye">Results &amp; analytics</span>
            <H2 t="How we measure" em="performance" />
            <p className="dmx-lede" data-up>Every campaign is tracked against goals agreed up front. These are the areas we report on.</p>
            <ul className="dmx-metrics">
              {METRICS.map((m, i) => (
                <li key={m.t} data-up style={st(i % 2)}><span className="dmx-ico"><Ic k={m.k} /></span><div><h3>{m.t}</h3><p>{m.d}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="dmx-dash dmx-gb" data-tilt data-spot>
            <i className="dmx-spl" />
            <div className="dmx-dash-h"><b>Campaign performance</b><em>Illustrative sample data</em></div>
            <div className="dmx-kpis">
              {["Reach", "Clicks", "Leads"].map((k) => (<div className="dmx-kpi" key={k}><small>{k}</small><span><i /><i /></span></div>))}
            </div>
            <div className="dmx-chart">
              <svg viewBox="0 0 300 110" preserveAspectRatio="none" fill="none" aria-hidden="true">
                {[22, 50, 78, 106].map((y) => (<line key={y} className="dmx-gl" x1="0" x2="300" y1={y} y2={y} />))}
                <path className="dmx-area" d={`${CURVE}V110H0Z`} />
                <path className="dmx-line" pathLength={1} d={CURVE} vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="dmx-sweep" />
            </div>
            <div className="dmx-dash-row">
              <div className="dmx-bars" aria-hidden="true">{BARS.map((h, i) => (<i key={i} style={{ height: `${h}%` }} />))}</div>
              <div className="dmx-donut" aria-hidden="true">
                <svg viewBox="0 0 80 80"><circle className="dmx-dn-bg" cx="40" cy="40" r="30" /><circle className="dmx-dn-fg" cx="40" cy="40" r="30" pathLength={1} /></svg>
                <span>Leads by channel<em>Illustrative</em></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. SELECTED WORK ===== */}
      <section className="dmx-sec dmx-sheet dmx-work" id="dmx-work">
        <div className="dmx-in">
          <div className="dmx-head dmx-head-row">
            <div>
              <span className="dmx-eye">Selected work</span>
              <H2 t="Websites and platforms we have" em="built" />
              <p className="dmx-lede" data-up>Fast, well-structured websites give your campaigns a strong place to send visitors. Here are a few Softsaro projects.</p>
            </div>
            <a className="dmx-link" href={`${S}/portfolio`} data-up><span>View full portfolio</span><Ic k="up" /></a>
          </div>
          <div className="dmx-proj">
            {(D.pj as string[][]).map((p) => (
              <a className="dmx-pj" key={p[4]} href={`/portfolio/${p[4]}`} data-tilt data-spot>
                <i className="dmx-spl" />
                <span className="dmx-pj-img"><img src={p[3]} alt={`${p[0]} website`} loading="lazy" decoding="async" /></span>
                <span className="dmx-pj-b"><small>{p[1]}</small><h3>{p[0]}</h3><p>{p[2]}</p><i className="dmx-go"><Ic k="up" /></i></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. PACKAGES ===== */}
      <section className="dmx-sec dmx-sheet dmx-dark" id="dmx-packages">
        <div className="dmx-in">
          <div className="dmx-head dmx-center">
            <span className="dmx-eye">Packages</span>
            <H2 t="Digital marketing" em="packages" />
            <p className="dmx-lede" data-up>Every business is different, so packages are scoped to your goals and quoted after a free consultation.</p>
          </div>
          <div className="dmx-pk">
            {PACKAGES.map((p, i) => (
              <article className={`dmx-plan dmx-gb${i === 1 ? " mid" : ""}`} key={p.name} data-tilt data-spot>
                <i className="dmx-spl" />
                <h3>{p.name}</h3>
                <p className="dmx-plan-b">{p.blurb}</p>
                <div className="dmx-plan-p">{p.price ? (<><b>{p.price}</b><small>{p.unit}</small></>) : (<b className="q">Custom quote</b>)}</div>
                <ul>{p.points.map((pt) => (<li key={pt}><Ic k="check" />{pt}</li>))}</ul>
                <a className="dmx-btn p" data-mag href="#dmx-contact"><span>Request a quote</span><Ic k="arrow" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. FAQ ===== */}
      <section className="dmx-sec dmx-sheet dmx-faqs" id="dmx-faq">
        <div className="dmx-in dmx-faq-in">
          <div className="dmx-faq-head">
            <span className="dmx-eye">FAQ</span>
            <H2 t="Digital marketing questions," em="answered" />
            <p className="dmx-lede" data-up>Clear answers to help you decide before you get in touch.</p>
          </div>
          <ul className="dmx-faq">
            {FAQ.map((f, i) => (
              <li className="dmx-fqi" key={f.q} data-up style={st(i % 4)}>
                <button className="dmx-fq" type="button" id={`dmx-fq-${i}`} aria-expanded="false" aria-controls={`dmx-fa-${i}`}>
                  <span className="dmx-fqn">0{i + 1}</span><span className="dmx-fqt">{f.q}</span><i aria-hidden="true" />
                </button>
                <div className="dmx-fa" id={`dmx-fa-${i}`} role="region" aria-labelledby={`dmx-fq-${i}`}><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 11. TESTIMONIALS ===== */}
      <section className="dmx-sec dmx-sheet dmx-dark" id="dmx-reviews">
        <div className="dmx-in">
          <div className="dmx-head">
            <span className="dmx-eye">Client feedback</span>
            <H2 t="What clients say about" em="Softsaro" />
          </div>
        </div>
        <div className="dmx-tq" tabIndex={0} aria-label="Client testimonials">
          {(D.tq as string[][]).map((t) => (
            <figure className="dmx-tq-c" key={t[0]}><blockquote>{t[2]}</blockquote><figcaption><b>{t[0]}</b><span>{t[1]}</span></figcaption></figure>
          ))}
        </div>
        <div className="dmx-in"><div className="dmx-tq-prog" aria-hidden="true"><i /></div></div>
      </section>

      {/* ===== 12. CONTACT + FINAL CTA ===== */}
      <section className="dmx-sec dmx-sheet dmx-contact" id="dmx-contact">
        <div className="dmx-in">
          <div className="dmx-cta-card" data-clip>
            <img className="dmx-cta-photo" src={P("dmx", "dubai")} alt="Business Bay, Dubai, at night" loading="lazy" decoding="async" data-par />
            <span className="dmx-cta-shade" />
            <div className="dmx-cta-in">
              <span className="dmx-eye">Get in touch</span>
              <H2 t="Ready to grow your business in" em="Dubai?" />
              <p className="dmx-lede" data-up>Tell us about your business and goals. We will reply with an honest view of what is realistic and the best place to start.</p>
              <div className="dmx-cta" data-up>
                <a className="dmx-btn p" data-mag href="#dmx-form"><span>Book a free consultation</span><Ic k="arrow" /></a>
                <a className="dmx-btn o" data-mag href={CONTACT.tel}><span>Call {CONTACT.phone}</span></a>
              </div>
            </div>
          </div>
          <div className="dmx-contact-grid">
            <ul className="dmx-ct">
              <li data-up><a href={CONTACT.tel}><span className="dmx-ico"><Ic k="phone" /></span><span><small>Call us</small>{CONTACT.phone}</span></a></li>
              <li data-up><a href={`mailto:${CONTACT.email}`}><span className="dmx-ico"><Ic k="mail" /></span><span><small>Email us</small>{CONTACT.email}</span></a></li>
              <li data-up><div><span className="dmx-ico"><Ic k="pin" /></span><span><small>Visit us</small>{CONTACT.address}</span></div></li>
            </ul>
            <div className="dmx-form-card" id="dmx-form" data-up>
              <DmxForm email={CONTACT.email} phone={CONTACT.phone} tel={CONTACT.tel} />
            </div>
          </div>
        </div>
      </section>

      <DmxMotion />
    </main>
  );
}