import fs from "node:fs";
import path from "node:path";
import { D } from "@/lib/data";
import { Ic, type IconName } from "./Icons";
import DmdMotion from "./DmdMotion";
import DmdFaq from "./DmdFaq";
import DmdForm from "./DmdForm";

/* ---------- images: your own digital-marketing photos (public/assets/dm) + optional public/assets/dmd ---------- */
function list(dir: string): string[] {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public", dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort().map((f) => `/${dir}/${f}`);
  } catch { return []; }
}
const imgs = [...list("assets/dmd"), ...list("assets/dm")];
const named = (n: string) => imgs.find((x) => x.endsWith("/" + n));
const at = (i: number) => (imgs.length ? imgs[i % imgs.length] : undefined);
const P = { hero: at(0), why: at(1), inset: at(2), results: named("analytics.jpg") ?? at(3) };

function Photo({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  return src
    ? <img className={`dmd-ph ${className}`} src={src} alt={alt} loading="lazy" decoding="async" />
    : <div className={`dmd-ph dmd-ph--empty ${className}`} role="img" aria-label={alt} />;
}

const CONTACT = { email: "info@softsaro.com", phone: "+977 9818439664", tel: "+9779818439664", address: "Trade Tower, 5th Floor, Thapathali, Kathmandu" };
const SITE = "https://softsaro.com.np";

const why: [IconName, string, string][] = [
  ["compass", "Strategic approach", "Every plan starts with your goals, audience and market, not a template."],
  ["chart", "Data-driven decisions", "Budget and creative move toward what the numbers show is working."],
  ["spark", "Creative campaigns", "Content and ads designed to earn attention and be remembered."],
  ["eye", "Transparent reporting", "Clear reports on spend, reach, leads and results, in plain language."],
  ["briefcase", "Business-focused solutions", "Campaigns tied to enquiries, sales and growth, not vanity metrics."],
  ["users", "Experienced digital team", "Marketers, designers and developers working together."],
];
const services: [IconName, string, string][] = [
  ["share", "Social media marketing", "Content calendars, community management and paid social that build an audience and keep it engaged."],
  ["click", "Google Ads and PPC", "Search, display and shopping campaigns structured around intent and measured on enquiries."],
  ["target", "Facebook and Instagram ads", "Targeted Meta campaigns with tested creative, built for reach, leads or sales."],
  ["pen", "Content marketing", "Articles, video and graphics planned around what your customers want to know."],
  ["mail", "Email marketing", "Welcome flows, newsletters and campaigns that nurture leads and bring customers back."],
  ["compass", "Digital marketing strategy", "One plan across search, social, email and paid, with priorities, budget and measures agreed up front."],
  ["funnel", "Lead generation and conversion", "Landing pages, forms and funnels improved step by step to turn visitors into enquiries."],
  ["chart", "Performance marketing and analytics", "Tracking, dashboards and reporting so every campaign is judged on results."],
];
const steps = [
  ["Research and discovery", "Your business, audience, competitors and current marketing."],
  ["Strategy and planning", "Goals, channels, budget and a clear plan of action."],
  ["Campaign creation", "Creative, copy, landing pages and tracking set-up."],
  ["Launch and execution", "Campaigns go live with careful monitoring."],
  ["Optimization", "Audiences, creative and budgets refined from real data."],
  ["Analytics and reporting", "Regular reports on what changed and what comes next."],
] as const;
const tools = [["Ads", "Google Ads"], ["M", "Meta Ads"], ["Ig", "Instagram"], ["f", "Facebook"], ["GA", "Google Analytics"], ["GTM", "Google Tag Manager"], ["@", "Email marketing platforms"], ["Au", "Marketing automation tools"]] as const;
const who: [IconName, string, string][] = [
  ["rocket", "Startups and small businesses", "Focused plans that make a modest budget work harder."],
  ["store", "E-commerce businesses", "Campaigns that bring shoppers in and bring them back."],
  ["building", "Real estate companies", "Lead generation for listings, projects and agents."],
  ["bed", "Hospitality and tourism", "Seasonal campaigns that drive direct bookings."],
  ["heart", "Healthcare and professional services", "Trust-building content and enquiry-focused campaigns."],
  ["layers", "Established companies", "Multi-channel programmes with clear reporting."],
];
const metrics: [IconName, string, string, number[]][] = [
  ["target", "Campaign performance", "Reach, clicks and cost across every active campaign.", [30, 42, 38, 55, 50, 68, 74]],
  ["users", "Audience engagement", "How people respond to your content and ads.", [40, 36, 52, 48, 60, 58, 72]],
  ["globe", "Website traffic", "Where visitors come from and what they do next.", [25, 34, 40, 38, 52, 64, 70]],
  ["funnel", "Leads and conversions", "Enquiries, sign-ups and sales traced to campaigns.", [20, 28, 35, 44, 42, 58, 66]],
  ["click", "Advertising performance", "Cost per result by channel and creative.", [64, 58, 60, 50, 46, 40, 36]],
  ["coin", "Return on ad spend", "Revenue compared with what you spend on advertising.", [28, 36, 34, 48, 56, 62, 76]],
];
const packages = [
  { name: "Starter Marketing", tag: "For businesses starting or restarting their marketing", items: ["Marketing audit and goal setting", "Social media set-up and content plan", "One paid channel (Google or Meta)", "Basic tracking and monthly summary"] },
  { name: "Growth Marketing", tag: "For businesses ready to run several channels", featured: true, items: ["Everything in Starter", "Multi-channel paid campaigns", "Content and email marketing", "Conversion tracking and landing-page improvements", "Monthly performance report and review"] },
  { name: "Complete Digital Marketing", tag: "For a full, joined-up marketing programme", items: ["Full strategy across all channels", "Social, search, display and email", "Lead generation funnels and automation", "Conversion rate optimization", "Analytics dashboards and strategy calls"] },
] as const;
const faqs = [
  ["What does digital marketing include?", "It covers the channels that reach customers online: social media, paid advertising such as Google Ads and Meta Ads, content, email, search visibility and the analytics that show what works. We recommend the mix that fits your business."],
  ["Why does my business need digital marketing in Dubai?", "Dubai is a busy, competitive market and customers research online before they decide. Digital marketing helps the right people find you, trust you and get in touch, and it lets you measure what each channel delivers."],
  ["Which digital marketing services are suitable for my business?", "It depends on your goals, audience and budget. A new business may start with social media and one ad channel, while an established company may need multi-channel campaigns and reporting. We will suggest a starting point in your consultation."],
  ["How long does it take to see campaign results?", "Paid campaigns can start producing traffic soon after launch. Content, email and brand growth build over a longer period. We set expectations for each channel up front and report on progress regularly."],
  ["Do you manage Google Ads and social media campaigns?", "Yes. We plan, launch, manage and optimize Google Ads, Facebook and Instagram advertising and organic social media."],
  ["Can you create a customized marketing strategy?", "Yes. Every strategy starts with your goals, audience and competitors, then sets channels, priorities and measures that suit your business."],
  ["How do you measure campaign performance?", "With tracking set up before launch, using tools such as Google Analytics and Google Tag Manager, plus the reporting inside each ad platform. Reports focus on enquiries, leads and sales, not just clicks."],
  ["How can I get started?", "Book a free consultation using the form below or call us. We will learn about your business and suggest a clear next step and quote."],
] as const;

/* real Softsaro data from lib/data.ts */
const projects: any[] = (D?.pj ?? []).map((x: any) => (Array.isArray(x) ? { name: x[0], tag: x[1], desc: x[2], img: x[3], slug: x[4] } : x));
const reviews: any[] = (D?.tq ?? []).map((x: any) => (Array.isArray(x) ? { name: x[0], role: x[1], text: x[2] } : x));

function Spark({ pts, w = 120, h = 36 }: { pts: number[]; w?: number; h?: number }) {
  const step = w / (pts.length - 1);
  const d = pts.map((v, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${(h - (v / 100) * h).toFixed(1)}`).join("");
  return <svg viewBox={`0 0 ${w} ${h}`} className="dmd-spark" preserveAspectRatio="none" aria-hidden="true"><path d={d} pathLength={1} /></svg>;
}

export default function DmdPage() {
  return (
    <main className="dmd">
      <DmdMotion />

      {/* 1. HERO */}
      <header className="dmd-hero">
        <div className="dmd-wrap dmd-hero-in">
          <div className="dmd-hero-copy">
            <p className="dmd-eyebrow">Digital marketing agency &middot; Dubai &amp; UAE</p>
            <h1><span className="dmd-k">Digital Marketing in Dubai</span>Grow your business with smarter digital marketing.</h1>
            <p className="dmd-lead">Softsaro is a Kathmandu-based digital partner. We plan, launch and measure marketing for businesses in Dubai and the UAE: social media, paid ads, content, email and analytics, built around your goals.</p>
            <div className="dmd-cta">
              <a className="dmd-btn" href="#contact" data-cur="open" data-label="Open">Book a free consultation <Ic n="arrow" /></a>
              <a className="dmd-btn dmd-btn--ghost" href="#services" data-cur="open" data-label="Open">Our services</a>
            </div>
            <ul className="dmd-trust"><li><Ic n="check" />8+ years as an IT company</li><li><Ic n="check" />Offices in Nepal &amp; USA</li><li><Ic n="check" />Dubai is 1h 45m behind Kathmandu</li></ul>
          </div>
          <div className="dmd-hero-vis">
            <div className="dmd-hero-photo"><Photo src={P.hero} alt="Digital marketing team reviewing campaign performance together" /></div>
            <div className="dmd-card dmd-dash" aria-label="Illustrative campaign overview">
              <div className="dmd-dash-h"><b>Campaign overview</b><em>Illustrative</em></div>
              <div className="dmd-dash-k"><span><small>Reach</small><i /></span><span><small>Clicks</small><i /></span><span><small>Leads</small><i /></span></div>
              <svg viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true"><path className="a" d="M0 66 C30 62 40 50 70 52 S110 30 140 34 S190 16 240 8 V80 H0z" /><path className="l" pathLength={1} d="M0 66 C30 62 40 50 70 52 S110 30 140 34 S190 16 240 8" /></svg>
            </div>
            <div className="dmd-chips" aria-hidden="true"><span>Social</span><span>Search ads</span><span>Email</span></div>
          </div>
        </div>
      </header>

      {/* 2. WHY SOFTSARO */}
      <section className="dmd-sec dmd-cream">
        <div className="dmd-wrap dmd-split">
          <div className="dmd-media" data-r>
            <Photo src={P.why} alt="Marketing team planning a campaign strategy around a table" className="main" />
            <Photo src={P.inset} alt="Analyst reviewing marketing analytics on a laptop" className="inset" />
            <div className="dmd-badge"><b>8+</b><span>years in IT</span></div>
          </div>
          <div data-r>
            <p className="dmd-eyebrow dmd-eyebrow--dark">Why Softsaro</p>
            <h2>Why businesses in Dubai choose Softsaro for digital marketing</h2>
            <p className="dmd-sub">Digital marketing works best when strategy, creative and data pull in the same direction. We keep them under one roof and explain every decision in plain language.</p>
            <ul className="dmd-feats">{why.map(([ic, t, d]) => <li key={t}><i><Ic n={ic} /></i><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="dmd-sec dmd-navy" id="services">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow">Our services</p><h2>Digital marketing services in Dubai</h2><p className="dmd-sub">Everything you need to attract, convert and keep customers, from brand awareness to measurable growth.</p></div>
          <div className="dmd-grid4">
            {services.map(([ic, t, d], i) => <article className="dmd-card dmd-svc" key={t} data-r style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}><i><Ic n={ic} /></i><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="dmd-sec dmd-cream">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow dmd-eyebrow--dark">Our process</p><h2>A clear process, from research to reporting</h2></div>
          <ol className="dmd-steps">
            {steps.map(([t, d], i) => <li key={t} data-r style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
        </div>
      </section>

      {/* 5. TOOLS */}
      <section className="dmd-sec dmd-navy">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow">Tools and platforms</p><h2>The platforms we work with</h2><p className="dmd-sub">We choose tools to fit your goals and budget.</p></div>
          <ul className="dmd-tools" data-r>{tools.map(([m, n]) => <li key={n}><b>{m}</b>{n}</li>)}</ul>
        </div>
      </section>

      {/* 6. WHO WE WORK WITH */}
      <section className="dmd-sec dmd-cream">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow dmd-eyebrow--dark">Who we work with</p><h2>Marketing for every stage of a business</h2></div>
          <div className="dmd-grid3">
            {who.map(([ic, t, d], i) => <article className="dmd-card dmd-who" key={t} data-r style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}><i><Ic n={ic} /></i><div><h3>{t}</h3><p>{d}</p></div></article>)}
          </div>
        </div>
      </section>

      {/* 7. RESULTS & ANALYTICS */}
      <section className="dmd-sec dmd-navy">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow">Results and analytics</p><h2>Marketing you can measure</h2><p className="dmd-sub">We track the numbers that matter to your business and report on them clearly. The layouts below are illustrative, not client data.</p></div>
          <div className="dmd-res">
            <div className="dmd-card dmd-res-main" data-r>
              <div className="dmd-dash-h"><b>Performance report</b><em>Illustrative layout, not client data</em></div>
              <svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
                <g className="g"><path d="M0 30H400M0 75H400M0 120H400" /></g>
                <path className="a" d="M0 120 C50 112 70 96 110 100 S170 70 210 74 S290 44 330 36 S380 22 400 14 V150 H0z" />
                <path className="l" pathLength={1} d="M0 120 C50 112 70 96 110 100 S170 70 210 74 S290 44 330 36 S380 22 400 14" />
              </svg>
              <Photo src={P.results} alt="Marketing analytics dashboard shown on a laptop screen" className="dmd-res-photo" />
            </div>
            <div className="dmd-metrics">
              {metrics.map(([ic, t, d, pts], i) => (
                <article className="dmd-card dmd-metric" key={t} data-r style={{ ["--d" as string]: `${(i % 2) * 70}ms` }}>
                  <div><i><Ic n={ic} /></i><h3>{t}</h3></div><p>{d}</p><Spark pts={pts} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SELECTED WORK */}
      <section className="dmd-sec dmd-cream">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow dmd-eyebrow--dark">Selected work</p><h2>A few things we have built</h2><p className="dmd-sub">Real Softsaro web and app projects. Marketing works best on a strong website, and we can build and market under one roof.</p></div>
          <div className="dmd-grid4">
            {projects.map((p, i) => (
              <a className="dmd-card dmd-proj" key={p.name} href={`/portfolio/${p.slug}`} data-r data-cur="open" data-label="Open" style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
                <div className="dmd-proj-img"><img src={p.img} alt={`${p.name} project screenshot`} loading="lazy" decoding="async" /></div>
                <div className="dmd-proj-t"><small>{p.tag}</small><h3>{p.name}</h3><p>{p.desc}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PACKAGES */}
      <section className="dmd-sec dmd-navy">
        <div className="dmd-wrap">
          <div className="dmd-head" data-r><p className="dmd-eyebrow">Packages</p><h2>Marketing packages built around your goals</h2><p className="dmd-sub">Every business is different, so pricing is by consultation. Book a free call and we will recommend the right scope and a clear quote.</p></div>
          <div className="dmd-grid3">
            {packages.map((p, i) => (
              <article className={`dmd-card dmd-pkg${"featured" in p && p.featured ? " dmd-pkg--f" : ""}`} key={p.name} data-r style={{ ["--d" as string]: `${i * 80}ms` }}>
                <h3>{p.name}</h3><p className="dmd-pkg-tag">{p.tag}</p>
                <p className="dmd-price">Custom quote</p>
                <ul>{p.items.map((it) => <li key={it}><Ic n="check" />{it}</li>)}</ul>
                <a className="dmd-btn" href="#contact" data-cur="open" data-label="Open">Request a quote <Ic n="arrow" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="dmd-sec dmd-cream">
        <div className="dmd-wrap dmd-faq-in">
          <div className="dmd-head" data-r><p className="dmd-eyebrow dmd-eyebrow--dark">FAQ</p><h2>Digital marketing questions, answered</h2><p className="dmd-sub">Clear answers to help you decide before you get in touch.</p></div>
          <div data-r><DmdFaq items={faqs} /></div>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      {reviews.length > 0 && (
        <section className="dmd-sec dmd-navy">
          <div className="dmd-wrap">
            <div className="dmd-head" data-r><p className="dmd-eyebrow">Client feedback</p><h2>What clients say about Softsaro</h2></div>
            <div className="dmd-rev" data-r tabIndex={0} aria-label="Client reviews">
              {reviews.map((r) => <figure className="dmd-card" key={r.name}><blockquote>{r.text}</blockquote><figcaption><b>{r.name}</b><span>{r.role}</span></figcaption></figure>)}
            </div>
          </div>
        </section>
      )}

      {/* 12. CONTACT / FINAL CTA */}
      <section className="dmd-sec dmd-cream" id="contact">
        <div className="dmd-wrap dmd-contact">
          <div data-r>
            <p className="dmd-eyebrow dmd-eyebrow--dark">Contact</p>
            <h2>Ready to grow your business in Dubai?</h2>
            <p className="dmd-sub">Book a free consultation and we will reply with an honest view of what is realistic for your business.</p>
            <a className="dmd-btn" href="#dmd-form" data-cur="open" data-label="Open">Book a consultation <Ic n="arrow" /></a>
            <ul className="dmd-info">
              <li><i><Ic n="phone" /></i><div><small>Call us</small><a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></div></li>
              <li><i><Ic n="mail" /></i><div><small>Email us</small><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div></li>
              <li><i><Ic n="pin" /></i><div><small>Visit us</small><span>{CONTACT.address}</span></div></li>
            </ul>
          </div>
          <div className="dmd-formwrap" data-r><DmdForm email={CONTACT.email} phone={CONTACT.phone} tel={CONTACT.tel} /></div>
        </div>
      </section>
    </main>
  );
}