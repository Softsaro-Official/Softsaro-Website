import DomainHostingMotion from "@/components/domain-hosting/DomainHostingMotion";

const S = "https://softsaro.com.np";
const TEL = "tel:+9779818439664";
const MAIL = "mailto:info@softsaro.com";
const P = (n: string) => `/assets/hosting/${n}.jpg`;

const Words = ({ t, cls = "" }: { t: string; cls?: string }) => (
  <>
    {t.split(" ").map((w, i) => (
      <span className="dh-m" key={i} aria-hidden="true">
        <span className={`dh-w ${cls}`.trim()}>{w}</span>
      </span>
    ))}
  </>
);
const H2 = ({ t, em, id }: { t: string; em?: string; id?: string }) => (
  <h2 className="dh-h2" id={id} aria-label={em ? `${t} ${em}` : t}>
    <Words t={t} />
    {em ? <Words t={em} cls="dh-em" /> : null}
  </h2>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
);
const Down = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
);

const PILLARS = [
  { k: "speed", t: "Speed", d: "Fast servers and tuned setups so pages open quickly." },
  { k: "uptime", t: "Uptime", d: "Monitoring so problems are caught early." },
  { k: "security", t: "Security", d: "SSL certificates, firewalls and regular backups." },
  { k: "domain", t: "Domain control", d: "Registration, renewals and DNS managed in one place, following the global rules set by ICANN." },
];
const Icon = ({ k }: { k: string }) => {
  if (k === "speed")
    return (<svg className="dh-pi" viewBox="0 0 24 24" aria-hidden="true"><path pathLength={1} d="M4 17a8 8 0 1116 0" /><path pathLength={1} d="M12 17l4-5" /></svg>);
  if (k === "uptime")
    return (<svg className="dh-pi" viewBox="0 0 24 24" aria-hidden="true"><path pathLength={1} d="M3 12h4l2-6 4 12 2-6h6" /></svg>);
  if (k === "security")
    return (<svg className="dh-pi" viewBox="0 0 24 24" aria-hidden="true"><path pathLength={1} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path pathLength={1} d="M9 12l2 2 4-4" /></svg>);
  return (<svg className="dh-pi" viewBox="0 0 24 24" aria-hidden="true"><circle pathLength={1} cx="12" cy="12" r="9" /><path pathLength={1} d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>);
};

const SERVICES = [
  { t: "Domain Registration, Transfer & Renewal", d: "We help you choose a clear, brandable name, register it in your company's name, transfer an existing domain safely and manage renewals so it never lapses by accident.", img: "dev" },
  { t: "VPS & Cloud Hosting", d: "VPS and cloud hosting for growing sites, online stores and web apps that need more power and room to scale.", img: "unit" },
  { t: "WordPress & Ecommerce Hosting", d: "Tuned for speed, caching and secure updates, and suited to WooCommerce stores and content-heavy sites.", img: "eng" },
  { t: "Business Email & SSL Security", d: "Professional email on your own domain, plus SSL certificates so visitors see the secure padlock and trust your brand.", img: "dark" },
  { t: "Website Migration", d: "Move your existing website from another host, with careful testing so you avoid broken pages and lost emails.", img: "fiber" },
  { t: "Backups, Monitoring & Support", d: "Regular backups and uptime monitoring, and a team to contact when something needs fixing.", img: "racks" },
];

const SECTORS = [
  { t: "SMEs & local businesses", d: "Reliable domain and hosting solutions to maintain a professional online presence." },
  { t: "E-commerce stores", d: "Hosting designed to support online stores, product pages, traffic and secure customer transactions." },
  { t: "Travel & tour companies", d: "Stable hosting for travel websites, tour listings, booking information and customer inquiries." },
  { t: "Education & training", d: "Dependable hosting for course information, admission details and educational resources." },
  { t: "Finance & cooperatives", d: "Secure and reliable hosting for businesses handling important financial and customer information." },
  { t: "Manufacturing & trading", d: "Hosting solutions that support product catalogs, business information and B2B communication." },
  { t: "Job portals", d: "Reliable hosting for job listings, user accounts, applications and growing website traffic." },
  { t: "International & export", d: "Stable hosting that helps overseas customers access your website reliably from different locations." },
];
const NET = SECTORS.map((s, i) => {
  const a = ((-157.5 + i * 45) * Math.PI) / 180;
  return { ...s, x: (50 + 39 * Math.cos(a)).toFixed(2), y: (50 + 34 * Math.sin(a)).toFixed(2), ex: (50 + 39 * Math.cos(a)).toFixed(2), ey: (50 + 34 * Math.sin(a)).toFixed(2) };
});

const STEPS = [
  { t: "Understanding your needs", d: "A quick call about your website, your traffic and your goals." },
  { t: "Search and register your domain", d: "Choose a clear, brandable name and register it in your company's name." },
  { t: "Choose the right plan", d: "Pick hosting that fits your site, from WordPress and ecommerce to VPS." },
  { t: "Configure the server", d: "We set up hosting, email and DNS so everything is ready." },
  { t: "Secure and connect", d: "SSL certificates, firewalls and regular backups, then your domain is connected." },
  { t: "Migrate and test", d: "Have an existing site? We move it and test carefully to avoid broken pages and lost emails." },
  { t: "Launch, monitor and support", d: "Your site goes live, with uptime monitoring and a team to contact." },
];

const WHY = [
  { t: "8+ years of IT experience", d: "Softsaro serves businesses across Nepal and international clients through our USA office." },
  { t: "A full IT company, not just a host", d: "We design, build and host websites, so one team owns your site from launch to renewal." },
  { t: "Transparent, with no inflated promises", d: "Clear terms and honest uptime reporting." },
  { t: "Based in Kathmandu, working internationally", d: "Our USA office gives overseas clients a contact in their own time zone." },
];

const FAQ = [
  { q: "What is domain and hosting?", a: "Your domain is your web address, and hosting is the server space where your website's files live. Together they decide whether customers can find you, how fast pages open and whether your site stays online." },
  { q: "Can I get domain and hosting from one company?", a: "Yes. Softsaro registers your domain, hosts your website and keeps it running, so one team looks after the whole stack." },
  { q: "How do I choose a web hosting company in Nepal?", a: "Look for clear terms, honest uptime reporting and a team you can actually reach. It also helps when the same company can build, host and support your site." },
  { q: "How is Softsaro different from other hosting companies?", a: "We are a full IT company, not just a host. We design, build and host websites, so one team owns your site from launch to renewal, with transparent terms and no inflated promises." },
  { q: "Can Softsaro move my existing website?", a: "Yes. We can move your website from another host, with careful testing so you avoid broken pages and lost emails." },
  { q: "What happens if my website goes down?", a: "We run uptime monitoring so problems are caught early, keep regular backups, and give you a team to contact when something needs fixing." },
  { q: "How much does hosting cost?", a: "It depends on the plan your website needs. Packages and prices are listed on our main service page, or ask us and we will suggest the right plan." },
];

const MARQ = ["Domain registration", "Web hosting", "VPS & cloud", "WordPress & ecommerce", "Business email", "SSL security", "Website migration", "Backups & monitoring"];

export default function DomainHostingPage() {
  return (
    <main className="dh">
      {/* ===== HERO ===== */}
      <section className="dh-hero" id="dh-top">
        <div className="dh-hero-bg" aria-hidden="true">
          <span className="dh-grid" /><span className="dh-orb a" /><span className="dh-orb b" />
        </div>
        <div className="dh-in dh-hero-in">
          <div className="dh-hero-copy">
            <p className="dh-eyebrow" data-in><i />Domain &amp; Hosting</p>
            <h1 className="dh-h1" data-in aria-label="Domain and hosting in Nepal, looked after.">
              <Words t="Domain and hosting in Nepal," />
              <Words t="looked after." cls="dh-em" />
            </h1>
            <p className="dh-lead" data-in>
              Softsaro registers your domain, hosts your website and keeps it running smoothly &mdash; one team for the whole stack.
            </p>
            <div className="dh-cta-row" data-in>
              <a className="dh-btn p" href={`${S}/contact`}><span>Book a free consultation</span><Arrow /></a>
              <a className="dh-btn g" href="#dh-services"><span>Explore services</span><Down /></a>
            </div>
            <ul className="dh-trust" data-in>
              <li>8+ years as an IT company</li>
              <li>Offices in Nepal &amp; USA</li>
            </ul>
          </div>

          <div className="dh-stage" aria-hidden="true">
            <div className="dh-photo" data-in>
              <img src={P("hero")} alt="" fetchPriority="high" decoding="async" />
              <span className="dh-photo-tint" />
            </div>

            <svg className="dh-link" viewBox="0 0 600 640" fill="none">
              <path id="dh-route" className="dh-path" d="M200 236C200 310 468 290 468 356" />
              <circle className="dh-pkt" r="5"><animateMotion dur="2.6s" begin="2.4s" repeatCount="indefinite"><mpath href="#dh-route" /></animateMotion></circle>
              <circle className="dh-pkt" r="5"><animateMotion dur="2.6s" begin="3.7s" repeatCount="indefinite"><mpath href="#dh-route" /></animateMotion></circle>
              <circle className="dh-pkt" r="5"><animateMotion dur="2.6s" begin="5s" repeatCount="indefinite"><mpath href="#dh-route" /></animateMotion></circle>
            </svg>

            <div className="dh-browser" data-in>
              <div className="dh-bar">
                <i /><i /><i />
                <div className="dh-url">
                  <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
                  <span><span className="dh-typed">yourbrand</span><span className="dh-ext"><span className="dh-ext-in"><span>.com</span><span>.com.np</span><span>.org</span><span>.net</span><span>.com</span></span></span></span>
                </div>
              </div>
              <div className="dh-page">
                <span className="dh-sk w1" /><span className="dh-sk w2" /><span className="dh-sk w3" />
                <span className="dh-load"><i /></span>
              </div>
              <span className="dh-live"><i />Live</span>
            </div>

            <div className="dh-rack" data-in>
              <svg viewBox="0 0 228 270">
                <rect className="dh-rack-body" x="2" y="2" width="224" height="266" rx="20" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i} transform={`translate(16 ${18 + i * 48})`}>
                    <g className="dh-unit">
                      <rect className="dh-unit-r" width="196" height="38" rx="8" />
                      <circle className="dh-led g" cx="20" cy="19" r="4" />
                      <circle className="dh-led p" cx="36" cy="19" r="4" />
                      <path className="dh-vent" d="M70 12h110M70 19h110M70 26h110" />
                    </g>
                  </g>
                ))}
              </svg>
            </div>

            <span className="dh-chip c1" data-in><i />Domain</span>
            <span className="dh-chip c2" data-in><i />SSL</span>
            <span className="dh-chip c3" data-in><i />Hosting</span>
            <span className="dh-chip c4" data-in><i />Backups</span>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="dh-marq" aria-hidden="true">
        <div className="dh-marq-t">
          {[0, 1].map((n) => (
            <div className="dh-marq-set" key={n}>
              {MARQ.map((m) => (<span key={m}>{m}<i /></span>))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== PERFORMANCE & SECURITY ===== */}
      <section className="dh-dark dh-sec" id="dh-stack">
        <div className="dh-in">
          <div className="dh-stack-head">
            <p className="dh-eyebrow" data-fade><i />Performance &amp; security</p>
            <H2 t="What domain and hosting actually do for a" em="business." />
            <p className="dh-lede" data-fade>
              Your domain is your web address, and hosting is the server space where your website&rsquo;s files live. Together they decide whether customers can find you, how fast pages open and whether your site stays online.
            </p>
          </div>
          <div className="dh-stack-body">
            <figure className="dh-fig dh-fig-a" data-clip>
              <img src={P("switch")} alt="Network cables connected to a switch in a data center" loading="lazy" decoding="async" data-par />
              <figcaption className="dh-fig-tags"><span>SSL</span><span>Firewalls</span><span>Backups</span></figcaption>
            </figure>
            <ol className="dh-pillars">
              {PILLARS.map((p, i) => (
                <li className="dh-pillar" key={p.k}>
                  <span className="dh-pn">0{i + 1}</span>
                  <Icon k={p.k} />
                  <div><h3>{p.t}</h3><p>{p.d}</p></div>
                  <span className="dh-pline" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== SERVICES (expanding photo panels) ===== */}
      <section className="dh-sec dh-services" id="dh-services">
        <div className="dh-in">
          <div className="dh-head-c">
            <p className="dh-eyebrow" data-fade><i />What we provide</p>
            <H2 t="Domain and hosting services" em="we provide." />
            <p className="dh-lede" data-fade>Not all hosting companies cover every layer, so we bring these services together under one team.</p>
          </div>
        </div>
        <div className="dh-in">
          <div className="dh-panels">
            {SERVICES.map((s, i) => (
              <div className={`dh-panel${i === 0 ? " is-on" : ""}`} key={s.t} tabIndex={0} role="group" aria-label={s.t}>
                <img src={P(s.img)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <span className="dh-panel-shade" />
                <span className="dh-panel-n">0{i + 1}</span>
                <span className="dh-panel-v" aria-hidden="true">{s.t}</span>
                <div className="dh-panel-b"><h3>{s.t}</h3><p>{s.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VPS ===== */}
      <section className="dh-vps dh-sec" id="dh-vps">
        <div className="dh-in dh-vps-in">
          <div className="dh-vps-fig" style={{ backgroundImage: `url(${P("rack")})` }}>
            <span className="dh-vps-shade" />
            <svg viewBox="0 0 560 440" role="img" aria-label="Diagram comparing a shared server with a VPS that has its own private slice">
              <text className="dh-vl" x="30" y="38">Shared server</text>
              <text className="dh-vl" x="330" y="38">VPS</text>
              <rect className="dh-box" x="30" y="60" width="200" height="300" rx="18" />
              <rect className="dh-box" x="330" y="60" width="200" height="300" rx="18" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <rect key={i} className="dh-sh" x={48 + (i % 2) * 84} y={80 + Math.floor(i / 2) * 68} width="64" height="48" rx="8" />
              ))}
              <path className="dh-arrow" pathLength={1} d="M246 210h66M300 194l16 16-16 16" />
              <rect className="dh-slice" x="346" y="76" width="168" height="62" rx="10" />
              <rect className="dh-slice me" x="346" y="150" width="168" height="120" rx="10" />
              <rect className="dh-slice" x="346" y="282" width="168" height="62" rx="10" />
              <text className="dh-vl me" x="430" y="216" textAnchor="middle">Your site</text>
              <text className="dh-vc" x="130" y="394" textAnchor="middle">Resources shared with other sites</text>
              <text className="dh-vc" x="430" y="394" textAnchor="middle">Your own slice of the server</text>
            </svg>
          </div>
          <div className="dh-vps-copy">
            <p className="dh-eyebrow" data-fade><i />VPS hosting</p>
            <H2 t="Your own room" em="on the server." />
            <p className="dh-lede" data-fade>We set up VPS and cloud hosting for growing sites, online stores and web apps that need more power and room to scale.</p>
            <ul className="dh-bens">
              <li data-fade data-i="0"><b>01</b>More power for busy sites</li>
              <li data-fade data-i="1"><b>02</b>Room to scale as you grow</li>
              <li data-fade data-i="2"><b>03</b>Set up and looked after by our team</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== BUILT FOR (network) ===== */}
      <section className="dh-sec dh-built" id="dh-built">
        <div className="dh-in">
          <div className="dh-head-c">
            <p className="dh-eyebrow" data-fade><i />Who it&rsquo;s for</p>
            <H2 t="Built for businesses that depend on" em="their website." />
            <p className="dh-lede" data-fade>Whatever your sector, the right setup is matched to your traffic, content and growth plans.</p>
          </div>
          <div className="dh-net">
            <svg className="dh-net-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {NET.map((n) => (<line key={n.t} pathLength={1} x1="50" y1="50" x2={n.ex} y2={n.ey} vectorEffect="non-scaling-stroke" />))}
            </svg>
            <div className="dh-core" aria-hidden="true">
              <i /><i />
              <span>Your website</span>
            </div>
            {NET.map((n) => (
              <div className="dh-nodepos" key={n.t} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <button className="dh-node" type="button" data-d={n.d}><b>{n.t}</b><span>{n.d}</span></button>
              </div>
            ))}
            <p className="dh-net-cap" aria-live="polite">Choose a sector to see how we support it.</p>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="dh-sec dh-journey" id="dh-journey">
        <div className="dh-in">
          <div className="dh-jhead">
            <div>
              <p className="dh-eyebrow" data-fade><i />How it works</p>
              <H2 t="From domain to live website in" em="seven steps." />
              <p className="dh-lede" data-fade>Our process runs from the first call to ongoing support.</p>
            </div>
            <figure className="dh-fig dh-fig-b" data-clip>
              <img src={P("tech")} alt="IT professional configuring network cables in a server rack" loading="lazy" decoding="async" data-par />
            </figure>
          </div>
          <div className="dh-track">
            <span className="dh-rail"><i className="dh-rail-fill" /></span>
            <span className="dh-packet" />
            <ol className="dh-steps">
              {STEPS.map((s, i) => (
                <li className="dh-step" key={s.t}>
                  <span className="dh-dot" />
                  <div className="dh-card">
                    <span className="dh-sn">0{i + 1}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="dh-live-b"><i /><span>yourbrand.com</span><em>is live</em></div>
          </div>
        </div>
      </section>

      {/* ===== WHY SOFTSARO ===== */}
      <section className="dh-sec dh-why" id="dh-why">
        <div className="dh-in dh-why-in">
          <figure className="dh-fig dh-fig-c" data-clip>
            <img src={P("office")} alt="Developer working at a standing desk in a bright office" loading="lazy" decoding="async" data-par />
            <figcaption className="dh-badge"><b className="dh-count" data-to="8">8</b><b>+</b><span>years of IT experience</span></figcaption>
          </figure>
          <div className="dh-why-copy">
            <p className="dh-eyebrow" data-fade><i />Why Softsaro</p>
            <H2 t="A hosting partner that" em="owns the whole stack." />
            <ul className="dh-whys">
              {WHY.map((w, i) => (
                <li key={w.t} data-fade data-i={i}><h3>{w.t}</h3><p>{w.d}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="dh-sec dh-faq" id="dh-faq">
        <div className="dh-in dh-faq-in">
          <div className="dh-faq-head">
            <p className="dh-eyebrow" data-fade><i />FAQ</p>
            <H2 t="Questions, answered" em="simply." />
            <p className="dh-lede" data-fade>Clear answers to help you decide before you start.</p>
          </div>
          <ul className="dh-qs">
            {FAQ.map((f, i) => (
              <li className="dh-qi" key={f.q}>
                <button className="dh-q" type="button" aria-expanded="false">
                  <span className="dh-qn">0{i + 1}</span>
                  <span className="dh-qt">{f.q}</span>
                  <i className="dh-plus" aria-hidden="true" />
                </button>
                <div className="dh-a">
                  <p>{f.a}{i === 6 ? (<> <a href={`${S}/services/domain-and-hosting-in-nepal`}>See packages</a>.</>) : null}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="dh-cta" id="dh-contact">
        <img className="dh-cta-bg" src={P("cta")} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <span className="dh-cta-shade" />
        <span className="dh-ring r1" /><span className="dh-ring r2" /><span className="dh-ring r3" />
        <div className="dh-in dh-cta-in">
          <p className="dh-eyebrow" data-fade><i />Get started</p>
          <H2 t="Ready to get your website" em="online?" />
          <p className="dh-lede" data-fade>Softsaro will review your needs, suggest the right plan and set everything up for you. Start with a quick chat.</p>
          <div className="dh-cta-btns" data-fade>
            <a className="dh-btn w" href={`${S}/contact`}><span>Book a free consultation</span><Arrow /></a>
          </div>
          <div className="dh-tiles">
            <a className="dh-tile" href={TEL} data-fade data-i="0"><small>Call us</small><b>+977 9818439664</b></a>
            <a className="dh-tile" href={MAIL} data-fade data-i="1"><small>Email us</small><b>info@softsaro.com</b></a>
            <div className="dh-tile" data-fade data-i="2"><small>Visit us</small><b>Trade Tower, 5th Floor, Thapathali, Kathmandu</b></div>
          </div>
        </div>
      </section>

      <DomainHostingMotion />
    </main>
  );
}