import DmvMotion from "@/components/DmvMotion";
import DmvForm from "@/components/DmvForm";
import { D } from "@/lib/data";
import { CONTACT, PACKAGES } from "@/lib/dmd-data";

const S = "https://softsaro.com.np";
const A = (p: string) => `/assets/${p}.jpg`;

const IC: Record<string, string> = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  up: "M7 17L17 7M8 7h9v9",
  down: "M12 5v14M5 12l7 7 7-7",
  check: "M5 12l4 4 10-10",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z",
  share: "M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
};
const Ic = ({ k }: { k: string }) => (<svg className="dmv-ic" viewBox="0 0 24 24" aria-hidden="true"><path d={IC[k]} /></svg>);
const st = (i: number) => ({ "--i": i } as React.CSSProperties);

const BLD = Array.from({ length: 40 }, (_, i) => ({ x: i * 30, h: 40 + ((i * 37) % 9) * 14 }));
const Sky = () => (
  <svg className="dmv-sky" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g className="dmv-bl">{BLD.map((b) => (<rect key={b.x} x={b.x} y={240 - b.h} width={26} height={b.h} />))}</g>
    <path className="dmv-tw" d="M592 240V132l5-36 3-86 3 86 5 36v108z" />
    <g className="dmv-win">{BLD.filter((_, i) => i % 2 === 0).map((b, i) => (<rect key={b.x} x={b.x + 8} y={240 - b.h + 12} width={4} height={5} style={{ animationDelay: `${(i * 0.37) % 4}s` }} />))}</g>
  </svg>
);

const BARS = [38, 52, 44, 66, 58, 78, 70, 90];
const CURVE = "M0 92C30 88 50 80 80 70S130 62 160 46 220 30 300 14";
const MQ1 = ["Search", "Paid media", "Social", "Content", "Email", "Analytics"];

const STMT = [
  { t: "Strategy before spend", d: "We start with what you want to achieve, then choose the channels. Budget follows the plan, not the other way round." },
  { t: "Creative that earns attention", d: "Ads, posts and pages that look and sound like your brand, made for how people in Dubai actually scroll and search." },
  { t: "Numbers you can read", d: "Plain-language reports tied to leads and enquiries, so you can see what is working and what is not." },
  { t: "One team, many skills", d: "Design, development, content and marketing sit together, so your campaigns and your website pull in the same direction." },
];
const WIMG = ["dm/team", "dm/huddle", "dm/brainstorm", "dm/strategy"];

const SVC = [
  { id: "search", k: "search", t: "Search", img: "dm/analytics", h: "Be the answer when Dubai searches.", d: "Search visibility brings people who already want what you offer. We improve how your site is found, understood and trusted, locally and beyond.", b: ["Site and content audit", "Keyword and intent research", "Local listings and Google Business Profile", "Ongoing reporting and fixes"] },
  { id: "ads", k: "target", t: "Google Ads", img: "dm/devices", h: "Pay for attention that converts.", d: "Search, display and remarketing campaigns built around a clear goal, with conversion tracking so spend can be judged honestly.", b: ["Campaign structure and ad copy", "Landing page recommendations", "Conversion tracking", "Weekly checks and optimisation"] },
  { id: "social", k: "share", t: "Social media", img: "dm/celebrate", h: "A feed people follow on purpose.", d: "Organic content and paid campaigns on Facebook and Instagram, planned together so your brand shows up consistently.", b: ["Content planning and creative", "Community management", "Targeted paid campaigns", "Audience and creative testing"] },
  { id: "content", k: "doc", t: "Content", img: "dm/brainstorm", h: "Stories that do the selling.", d: "Articles, page copy, video scripts and visuals that explain what you offer and help people decide, at every stage of their journey.", b: ["Content strategy and calendar", "Articles and landing page copy", "Video and visual direction", "Repurposing across channels"] },
  { id: "email", k: "mail", t: "Email", img: "dm/review", h: "Stay in the inbox, earn the reply.", d: "Newsletters and automated flows that welcome new contacts, nurture interest and keep customers coming back.", b: ["List and segment setup", "Welcome and follow-up flows", "Campaign design and copy", "Performance review"] },
  { id: "analytics", k: "chart", t: "Analytics", img: "dm/band", h: "See what works, cut what does not.", d: "Tracking, dashboards and regular reviews that connect your marketing to enquiries, sign-ups and sales.", b: ["Analytics and tag setup", "Conversion and event tracking", "Custom dashboards", "Monthly review and next steps"] },
];

const STEPS = [
  { t: "Listen", d: "We start with your goals, customers, competitors and what you have already tried." },
  { t: "Map", d: "We pick the channels, set the budget approach and agree what success looks like." },
  { t: "Build", d: "Creative, copy, landing pages and tracking are made and checked before launch." },
  { t: "Launch", d: "Campaigns go live in stages, so we can watch real behaviour early." },
  { t: "Learn", d: "Reports show what worked, and budget and creative move toward it." },
];

const TOOLS1 = ["Google Ads", "Google Analytics", "Tag Manager", "Search Console", "Looker Studio", "Email platforms"];
const TOOLS2 = ["Meta Ads Manager", "Instagram", "Facebook", "Marketing automation", "Landing pages", "Reporting dashboards"];

const IND = [
  { t: "Real estate", d: "Listings, lead forms and local search that bring serious buyers and renters to the phone.", big: true },
  { t: "Hospitality and tourism", d: "Seasonal campaigns and a social presence that fill tables and rooms." },
  { t: "E-commerce", d: "Product promotion, retargeting and email flows for repeat buyers." },
  { t: "Healthcare and clinics", d: "Trust-building content and local visibility for clinics and practices." },
  { t: "Startups", d: "Practical campaigns that build awareness without wasting budget." },
  { t: "Professional services", d: "Lead generation and content that shows what your firm knows." },
];

const METRICS = ["Campaign progress", "Audience engagement", "Website traffic", "Leads and enquiries", "Advertising performance", "Return on ad spend"];

const FAQ = [
  { q: "What is digital marketing, in plain words?", a: "It is everything you do online to get found, trusted and chosen: search, ads, social media, content and email. The skill is picking the mix that fits your business and measuring what it brings in." },
  { q: "Where should a Dubai business start?", a: "Start with the goal. If you want enquiries quickly, paid search and a good landing page usually come first. If you want steady visibility over time, search and content do more. We recommend a starting mix in your free consultation." },
  { q: "Do you work with businesses in Dubai from Nepal?", a: "Yes. Our team works with you remotely from Kathmandu, and Dubai is 1 hour 45 minutes behind, so calls fit comfortably into the working day." },
  { q: "How soon will I see results?", a: "Paid campaigns can produce data within days, but good results usually take a few weeks of testing and refining. Search and content build over months. We never guarantee specific results." },
  { q: "Will I know where my money goes?", a: "Yes. You get plain-language reports tied to your goals, and we recommend that ad accounts and analytics stay in your name." },
  { q: "Can you handle design and the website too?", a: "Yes. Softsaro also builds websites, apps and designs, so landing pages and campaigns can be planned together." },
  { q: "How do I get started?", a: "Book a free consultation with the form below or call +977 9818439664. We will talk through your business and suggest a practical next step." },
];

export default function DmvPage() {
  return (
    <main className="dmv-page">
      <div className="dmv-prog" aria-hidden="true" />

      {/* 1. HERO */}
      <section className="dmv-sec dmv-d dmv-hero" id="dmv-top">
        <div className="dmv-hbg" aria-hidden="true"><span className="dmv-glow" /><Sky /></div>
        <div className="dmv-in dmv-hero-in">
          <div className="dmv-hcopy">
            <span className="dmv-pill" data-h>Digital marketing agency in Dubai</span>
            <h1 className="dmv-h1" data-split>Dubai moves <em>fast.</em><br />Your marketing should keep up.</h1>
            <p className="dmv-lead" data-h>Softsaro plans, launches and measures marketing for businesses in Dubai and the UAE: search, ads, social, content and email, all working toward the same goal.</p>
            <div className="dmv-cta" data-h>
              <a className="dmv-btn p" data-mag href="#dmv-contact"><span>Book a free consultation</span><Ic k="arrow" /></a>
              <a className="dmv-btn o" data-mag href="#dmv-services"><span>See what we do</span><Ic k="down" /></a>
            </div>
          </div>
          <div className="dmv-hv" aria-hidden="true">
            <figure className="dmv-hm"><img src={A("dmd/global")} alt="" decoding="async" fetchPriority="high" /></figure>
            <figure className="dmv-hs"><img src={A("dmd/brain")} alt="" decoding="async" /></figure>
            <div className="dmv-hc"><div className="dmv-hch"><b>Campaign overview</b><em>Illustrative</em></div><div className="dmv-hcb">{BARS.map((h, i) => (<i key={i} style={{ height: `${h}%` }} />))}</div></div>
            <span className="dmv-chip c1">Search</span><span className="dmv-chip c2">Social</span><span className="dmv-chip c3">Email</span>
          </div>
        </div>
      </section>

      {/* 2. GROWTH SNAPSHOT */}
      <section className="dmv-sec dmv-snap" id="dmv-snap">
        <div className="dmv-mq" data-dir="l" data-s="38" aria-hidden="true"><div className="dmv-mq-t">{[0, 1].map((n) => MQ1.map((w) => (<span key={`${n}${w}`}>{w}<i /></span>)))}</div></div>
        <div className="dmv-in dmv-snap-g">
          <div className="dmv-snap-t">
            <span className="dmv-eye">Growth snapshot</span>
            <h2 className="dmv-h2" data-split>Be found. Be chosen. Be <em>remembered.</em></h2>
          </div>
          <article className="dmv-tile" data-up data-tilt data-spot style={st(0)}><i className="dmv-spl" /><b>01</b><h3>Be found</h3><p>Search and maps put you in front of people already looking.</p></article>
          <article className="dmv-tile" data-up data-tilt data-spot style={st(1)}><i className="dmv-spl" /><b>02</b><h3>Be chosen</h3><p>Ads and social content give people a reason to pick you.</p></article>
          <article className="dmv-tile" data-up data-tilt data-spot style={st(2)}><i className="dmv-spl" /><b>03</b><h3>Be remembered</h3><p>Email and useful content bring customers back.</p></article>
          <div className="dmv-facts" data-up>
            <div><b><span className="dmv-count" data-to="8">8</span>+</b><span>years as an IT company</span></div>
            <div><b><span className="dmv-count" data-to="2">2</span></b><span>offices, in Nepal and the USA</span></div>
          </div>
        </div>
      </section>

      {/* 3. WHY */}
      <section className="dmv-sec dmv-d dmv-why" id="dmv-why">
        <div className="dmv-in">
          <div className="dmv-head"><span className="dmv-eye">Why Softsaro</span><h2 className="dmv-h2" data-split>Marketing that is planned, <em>made</em> and measured in one place.</h2></div>
          <div className="dmv-why-g">
            <div className="dmv-why-s">
              <figure className="dmv-wfig" data-clip>
                {WIMG.map((p, i) => (<img key={p} className={`dmv-wimg${i === 0 ? " on" : ""}`} src={A(p)} alt="" aria-hidden="true" loading="lazy" decoding="async" />))}
                <span className="dmv-wbadge"><b>8+</b> years in IT</span>
              </figure>
            </div>
            <div className="dmv-stmts">
              {STMT.map((s, i) => (<article key={s.t} className={`dmv-stmt${i === 0 ? " on" : ""}`}><span>0{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></article>))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="dmv-sec dmv-svc" id="dmv-services">
        <div className="dmv-in">
          <div className="dmv-head"><span className="dmv-eye">Services</span><h2 className="dmv-h2" data-split>Six ways we grow your business <em>online.</em></h2></div>
          <div className="dmv-svc-g" data-up>
            <div className="dmv-tabs" role="tablist" aria-label="Digital marketing services">
              {SVC.map((s, i) => (<button key={s.id} type="button" role="tab" aria-selected={i === 0} className={`dmv-tab${i === 0 ? " on" : ""}`}><span className="dmv-tn">0{i + 1}</span><span className="dmv-tl">{s.t}</span><Ic k="arrow" /></button>))}
            </div>
            <div className="dmv-tpanels">
              {SVC.map((s, i) => (
                <article key={s.id} role="tabpanel" className={`dmv-tp${i === 0 ? " on" : ""}`}>
                  <figure className="dmv-tpi"><img src={A(s.img)} alt="" aria-hidden="true" loading="lazy" decoding="async" /></figure>
                  <div className="dmv-tpb">
                    <span className="dmv-ico" data-tp><Ic k={s.k} /></span>
                    <h3 data-tp>{s.h}</h3>
                    <p data-tp>{s.d}</p>
                    <ul>{s.b.map((x) => (<li key={x} data-tp><Ic k="check" />{x}</li>))}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS (pinned horizontal) */}
      <section className="dmv-sec dmv-d dmv-proc" id="dmv-process">
        <div className="dmv-in dmv-proc-h"><span className="dmv-eye">Process</span><h2 className="dmv-h2" data-split>From first call to <em>steady growth.</em></h2></div>
        <div className="dmv-pview">
          <ol className="dmv-ptrack">
            {STEPS.map((s, i) => (<li key={s.t} className={`dmv-pc${i === 0 ? " on" : ""}`}><b>0{i + 1}</b><h3>{s.t}</h3><p>{s.d}</p></li>))}
          </ol>
        </div>
        <div className="dmv-in"><div className="dmv-pbar" aria-hidden="true"><i /></div></div>
      </section>

      {/* 6. PLATFORMS */}
      <section className="dmv-sec dmv-plat" id="dmv-tools">
        <div className="dmv-in dmv-head dmv-center"><span className="dmv-eye">Platforms and tools</span><h2 className="dmv-h2" data-split>The tools behind <em>the work.</em></h2></div>
        <div className="dmv-mq big" data-dir="l" data-s="45" aria-label="Tools we work with"><div className="dmv-mq-t">{[0, 1].map((n) => TOOLS1.map((w) => (<span key={`${n}${w}`}>{w}</span>)))}</div></div>
        <div className="dmv-mq big" data-dir="r" data-s="52" aria-hidden="true"><div className="dmv-mq-t">{[0, 1].map((n) => TOOLS2.map((w) => (<span key={`${n}${w}`}>{w}</span>)))}</div></div>
      </section>

      {/* 7. INDUSTRIES */}
      <section className="dmv-sec dmv-d dmv-ind" id="dmv-who">
        <div className="dmv-in">
          <div className="dmv-head"><span className="dmv-eye">Who we work with</span><h2 className="dmv-h2" data-split>Marketing for every kind of <em>Dubai business.</em></h2></div>
          <div className="dmv-ind-g">
            {IND.map((x, i) => (
              <article key={x.t} className={`dmv-ic2${x.big ? " big" : ""}`} data-up data-tilt data-spot style={st(i % 3)}>
                {x.big ? (<><img src={A("dmd/charts")} alt="" aria-hidden="true" loading="lazy" decoding="async" /><span className="dmv-shade" /></>) : null}
                <i className="dmv-spl" />
                <span className="dmv-ix">0{i + 1}</span>
                <h3>{x.t}</h3><p>{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PERFORMANCE */}
      <section className="dmv-sec dmv-perf" id="dmv-results">
        <div className="dmv-in dmv-perf-g">
          <div>
            <span className="dmv-eye">Performance and analytics</span>
            <h2 className="dmv-h2" data-split>If it cannot be measured, it cannot be <em>improved.</em></h2>
            <p className="dmv-lede" data-up>Every campaign is tracked against goals agreed up front. These are the areas we report on.</p>
            <ul className="dmv-mets">{METRICS.map((m, i) => (<li key={m} data-up style={st(i % 2)}><Ic k="check" />{m}</li>))}</ul>
          </div>
          <div className="dmv-dash" data-up data-tilt>
            <div className="dmv-dh"><b>Campaign performance</b><em>Illustrative sample, not client data</em></div>
            <div className="dmv-chart">
              <svg viewBox="0 0 300 110" preserveAspectRatio="none" fill="none" aria-hidden="true">
                {[22, 50, 78, 106].map((y) => (<line key={y} className="dmv-gl" x1="0" x2="300" y1={y} y2={y} />))}
                <path className="dmv-area" d={`${CURVE}V110H0Z`} />
                <path className="dmv-line" pathLength={1} d={CURVE} vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="dmv-drow">
              <div className="dmv-bars" aria-hidden="true">{BARS.map((h, i) => (<i key={i} style={{ height: `${h}%` }} />))}</div>
              <div className="dmv-donut" aria-hidden="true"><svg viewBox="0 0 80 80"><circle className="dmv-dnb" cx="40" cy="40" r="30" /><circle className="dmv-dnf" cx="40" cy="40" r="30" pathLength={1} /></svg><span>Leads by channel<em>Illustrative</em></span></div>
            </div>
            <div className="dmv-goals" aria-hidden="true">
              <div><span>Goal progress A</span><i><b style={{ width: "72%" }} /></i></div>
              <div><span>Goal progress B</span><i><b style={{ width: "48%" }} /></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROJECTS */}
      <section className="dmv-sec dmv-d dmv-work" id="dmv-work">
        <div className="dmv-in">
          <div className="dmv-head dmv-row">
            <div><span className="dmv-eye">Selected work</span><h2 className="dmv-h2" data-split>Websites and platforms we have <em>built.</em></h2></div>
            <a className="dmv-link" href={`${S}/portfolio`} data-up><span>View full portfolio</span><Ic k="up" /></a>
          </div>
          <div className="dmv-proj">
            {(D.pj as string[][]).map((p) => (
              <a className="dmv-pj" key={p[4]} href={`${S}/portfolio/${p[4]}`} data-tilt data-spot>
                <i className="dmv-spl" />
                <span className="dmv-pji"><img src={p[3]} alt={`${p[0]} website`} loading="lazy" decoding="async" /></span>
                <span className="dmv-pjb"><small>{p[1]}</small><h3>{p[0]}</h3><p>{p[2]}</p></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PACKAGES */}
      <section className="dmv-sec dmv-pack" id="dmv-packages">
        <div className="dmv-in">
          <div className="dmv-head dmv-center"><span className="dmv-eye">Packages</span><h2 className="dmv-h2" data-split>Three ways to <em>start.</em></h2><p className="dmv-lede" data-up>Every business is different, so packages are scoped to your goals and quoted after a free consultation.</p></div>
          <div className="dmv-pk">
            {PACKAGES.map((p, i) => (
              <article className={`dmv-plan${i === 1 ? " mid" : ""}`} key={p.name} data-up data-tilt data-spot style={st(i)}>
                <i className="dmv-spl" />
                <h3>{p.name}</h3>
                <p className="dmv-plan-b">{p.blurb}</p>
                <div className="dmv-plan-p">{p.price ? (<><b>{p.price}</b><small>{p.unit}</small></>) : (<b className="q">Custom quote</b>)}</div>
                <ul>{p.points.map((pt) => (<li key={pt}><Ic k="check" />{pt}</li>))}</ul>
                <a className="dmv-btn p" data-mag href="#dmv-contact"><span>Request a quote</span><Ic k="arrow" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="dmv-sec dmv-d dmv-faqs" id="dmv-faq">
        <div className="dmv-in dmv-faq-g">
          <div className="dmv-faq-h"><span className="dmv-eye">FAQ</span><h2 className="dmv-h2" data-split>Good questions, <em>straight answers.</em></h2></div>
          <ul className="dmv-faq">
            {FAQ.map((f, i) => (
              <li className="dmv-fqi" key={f.q} data-up style={st(i % 4)}>
                <button className="dmv-fq" type="button" id={`dmv-fq-${i}`} aria-expanded="false" aria-controls={`dmv-fa-${i}`}><span className="dmv-fqn">0{i + 1}</span><span className="dmv-fqt">{f.q}</span><i aria-hidden="true" /></button>
                <div className="dmv-fa" id={`dmv-fa-${i}`} role="region" aria-labelledby={`dmv-fq-${i}`}><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. CONTACT */}
      <section className="dmv-sec dmv-contact" id="dmv-contact">
        <div className="dmv-in">
          <div className="dmv-cta-card dmv-d" data-clip>
            <img className="dmv-cta-ph" src={A("dmd/top")} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <span className="dmv-cta-sh" />
            <div className="dmv-cta-in">
              <span className="dmv-eye">Get in touch</span>
              <h2 className="dmv-h2" data-split>Ready to grow your business in <em>Dubai?</em></h2>
              <p className="dmv-lede" data-up>Tell us about your business and goals. We will reply with an honest view of what is realistic and where to start.</p>
              <div className="dmv-cta" data-up>
                <a className="dmv-btn p" data-mag href="#dmv-form"><span>Book a free consultation</span><Ic k="arrow" /></a>
                <a className="dmv-btn o" data-mag href={CONTACT.tel}><span>Call {CONTACT.phone}</span></a>
              </div>
            </div>
          </div>
          <div className="dmv-cg">
            <ul className="dmv-ct">
              <li data-up><a href={CONTACT.tel}><span className="dmv-ico"><Ic k="phone" /></span><span><small>Call us</small>{CONTACT.phone}</span></a></li>
              <li data-up><a href={`mailto:${CONTACT.email}`}><span className="dmv-ico"><Ic k="mail" /></span><span><small>Email us</small>{CONTACT.email}</span></a></li>
              <li data-up><div><span className="dmv-ico"><Ic k="pin" /></span><span><small>Visit us</small>{CONTACT.address}</span></div></li>
            </ul>
            <div className="dmv-fc dmv-d" id="dmv-form" data-up><DmvForm email={CONTACT.email} phone={CONTACT.phone} tel={CONTACT.tel} /></div>
          </div>
        </div>
      </section>

      <DmvMotion />
    </main>
  );
}