import { S, Roll, Up } from "@/components/Site";
import WxPhoto from "./WxPhoto";

const P = {
  hero: ["/assets/web/responsive.jpg", "/assets/dm/devices.jpg"],
  dev: ["/assets/web/dev-laptop.jpg", "/assets/seo/hero.jpg"],
  ui: ["/assets/web/ui-screens.jpg", "/assets/dm/brainstorm.jpg"],
  work: ["/assets/web/workspace.jpg", "/assets/dm/team.jpg"],
  dash: ["/assets/web/dashboard.jpg", "/assets/dm/analytics.jpg"],
  team: ["/assets/web/team-build.jpg", "/assets/seo/why.jpg"],
  wide: ["/assets/web/code-screen.jpg", "/assets/web/dev-laptop.jpg", "/assets/seo/hero.jpg"],
  desk: ["/assets/web/design-desk.jpg", "/assets/web/ui-screens.jpg", "/assets/dm/brainstorm.jpg"],
};

const builds = [
  { t: "WordPress Website", d: "Responsive, SEO-friendly and secure, with content you can update yourself.", tags: ["CMS", "SEO-ready"] },
  { t: "Static Business Website", d: "Fast, professional and clear. For businesses that do not need frequent changes.", tags: ["Fast", "Clear messaging"] },
  { t: "Dynamic Website with Admin Panel", d: "Manage pages, listings and media without touching code.", tags: ["Admin panel", "Listings"] },
  { t: "Full-Stack Custom Web App", d: "Dashboards, booking systems and portals with the integrations you need.", tags: ["Dashboards", "Integrations"] },
];
const audiences = ["E-commerce", "News & content", "Tours & travel", "Education & LMS", "Finance & cooperatives", "Manufacturing & trading", "Job portals", "SMEs & small business"];
const expertise = [
  ["UI/UX Design", "Clear layouts built around how visitors use the site.", P.ui],
  ["Responsive Development", "Sharp, usable pages on phones, tablets and desktops.", P.hero],
  ["Frontend", "Clean, accessible HTML, CSS and JavaScript with React and Next.js.", P.dev],
  ["Backend", "Secure PHP, Laravel and Node.js back ends, APIs and databases.", P.dash],
  ["CMS", "WordPress and custom admin panels your team can run.", P.work],
  ["Performance", "Fast loading, optimised images and an SEO-ready structure.", P.team],
] as const;
const steps = [
  ["Discover", "We learn your goals, audience and requirements."],
  ["Design", "User-centred layouts and prototypes you approve before we build."],
  ["Develop", "Clean, SEO-ready code with modern technologies."],
  ["Test", "Browser, device and speed checks before anything goes live."],
  ["Launch", "Go-live, then support, monitoring and handover."],
];
const why = [
  ["One team, start to finish", "Design, development, SEO and hosting under one roof."],
  ["Modern, maintainable code", "Built so your site is easy to update and extend."],
  ["SEO-ready by default", "Clean structure, speed and mobile-friendly pages from day one."],
  ["Support after launch", "You keep working with the team that built your site."],
];
const tech = ["React", "Next.js", "Laravel", "PHP", "WordPress", "Node.js", "JavaScript", "HTML5", "CSS3"];
const faqs = [
  ["How long does a website take?", "It depends on the scope. We share a clear timeline once we understand your requirements."],
  ["Can you build on WordPress?", "Yes. WordPress sites you can update yourself, or a custom build when you need more."],
  ["Will my website be SEO-friendly?", "Yes. Clean structure, speed and mobile-friendly pages from day one."],
  ["Can you redesign my existing website?", "Yes. We refresh the design and rebuild whatever is holding the site back."],
  ["Where are you located?", "Trade Tower, 5th Floor, Thapathali, Kathmandu."],
];

const Lab = ({ n, children, w }: { n: string; children: React.ReactNode; w?: boolean }) => (
  <p className={w ? "lab w" : "lab"}><i></i><span className="gn">{n} /</span> {children}</p>
);

function Win({ url, children, cls = "" }: { url: string; children: React.ReactNode; cls?: string }) {
  return (
    <div className={"wx-win " + cls}>
      <div className="wx-bar"><i></i><i></i><i></i><span className="wx-url">{url}</span></div>
      {children}
    </div>
  );
}

function BuildVisual({ k }: { k: number }) {
  if (k === 0)
    return (
      <Win url="yourbrand.com">
        <div className="wx-shot">
          <WxPhoto srcs={P.work} alt="WordPress website preview" label="View" />
          <div className="wx-ov"><b></b><b></b><b></b><span></span></div>
        </div>
      </Win>
    );
  if (k === 1)
    return (
      <Win url="company.com.np">
        <div className="wx-mk">
          <div className="wx-mk-h"></div><div className="wx-mk-p"></div><div className="wx-mk-p s"></div><div className="wx-mk-b"></div>
          <div className="wx-mk-g"><i></i><i></i><i></i></div>
        </div>
      </Win>
    );
  if (k === 2)
    return (
      <Win url="admin.yourbrand.com">
        <div className="wx-ad">
          <aside><i></i><i></i><i></i><i></i></aside>
          <div>{[78, 54, 90, 40, 66].map((w, i) => (<p key={i}><b></b><span style={{ width: w + "%" }}></span><em></em></p>))}</div>
        </div>
      </Win>
    );
  return (
    <Win url="app.yourbrand.com">
      <div className="wx-ap">
        <div className="wx-ap-k"><i></i><i></i><i></i></div>
        <svg viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 96C30 90 52 94 82 72S136 78 166 52 226 54 256 30 300 20 320 8V120H0Z" fill="#6a67ae" opacity=".16" />
          <path d="M0 96C30 90 52 94 82 72S136 78 166 52 226 54 256 30 300 20 320 8" fill="none" stroke="#6a67ae" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="wx-ap-b">{[40, 70, 55, 85, 62, 92].map((h, i) => (<i key={i} style={{ height: h + "%" }}></i>))}</div>
      </div>
    </Win>
  );
}

export default function WxPage() {
  return (
    <>
      <section className="wx-hero" id="top" aria-labelledby="wx-title">
        <div className="wrap">
          <p className="wx-eyebrow" data-in=""><i></i>Website design &amp; development / Softsaro Nepal</p>
          <h1 className="wx-h1" id="wx-title">Websites built to turn <em>visitors</em> into <em>customers.</em></h1>
          <div className="wx-hero-row">
            <p className="wx-sub" data-in="">Fast, secure, mobile-friendly websites from a team with 8+ years in IT. Design, development, SEO-ready structure, hosting and support under one roof.</p>
            <div className="wx-cta" data-in="">
              <a className="btn dark" href={`${S}/contact`}><Roll t="Book a Free Consultation" /><Up /></a>
              <a className="btn wx-out" href="#build"><Roll t="See what we build" /></a>
            </div>
          </div>
        </div>
        <div className="wx-stage">
          <i className="wx-blob" data-depth="-16"></i>
          <div className="wx-l wx-L1" data-depth="14"><div className="wx-pop"><div data-float="-10,0.4,6">
            <Win url="yourbrand.com" cls="wx-win-main">
              <div className="wx-shot">
                <WxPhoto srcs={P.hero} alt="Responsive website design shown on devices" label="View" />
                <div className="wx-ov"><b></b><b></b><b></b><span></span></div>
              </div>
            </Win>
          </div></div></div>
          <div className="wx-l wx-L2" data-depth="30"><div className="wx-pop"><div data-float="14,-1.5,5">
            <div className="wx-phone"><WxPhoto srcs={P.dev} alt="Mobile website preview" label="View" /></div>
          </div></div></div>
          <div className="wx-l wx-L3" data-depth="22"><div className="wx-pop"><div data-float="-12,1,5.5">
            <div className="wx-dash" role="img" aria-label="Illustrative analytics card">
              <small>Visitors / Illustrative</small>
              <div>{[38, 62, 48, 80, 58, 94].map((h, i) => (<i key={i} style={{ height: h + "%" }}></i>))}</div>
            </div>
          </div></div></div>
          <div className="wx-l wx-L4" data-depth="26"><div className="wx-pop"><div data-float="10,-1,6.5">
            <div className="wx-round"><WxPhoto srcs={P.ui} alt="Designer reviewing UI screens" label="View" /></div>
          </div></div></div>
          <div className="wx-l wx-L5" data-depth="36"><div className="wx-pop"><div data-float="-8,1,4.8">
            <div className="wx-code" aria-hidden="true">
              <span>&lt;Header /&gt;</span><span>&lt;Hero cta=&quot;Get started&quot; /&gt;</span><span>&lt;Services id=&quot;services&quot; /&gt;</span><span>&lt;Contact /&gt;</span>
            </div>
          </div></div></div>
          <div className="wx-l wx-L6" data-depth="18"><div className="wx-pop">
            <svg className="wx-badge" viewBox="0 0 120 120" aria-hidden="true">
              <defs><path id="wx-c" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <circle cx="60" cy="60" r="58" fill="#6a67ae" />
              <text fill="#fff" fontSize="10.5" fontWeight="700" letterSpacing="2.6"><textPath href="#wx-c">SOFTSARO NEPAL - 8+ YEARS - </textPath></text>
              <text x="60" y="68" textAnchor="middle" fill="#3fe33f" fontSize="26" fontWeight="800">8+</text>
            </svg>
          </div></div>
        </div>
      </section>

      <div className="wx-mq" aria-label="Who we build for">
        <div className="wx-mq-row"><div className="wx-mq-in">{[...audiences, ...audiences].map((a, i) => (<span key={i}>{a}<i></i></span>))}</div></div>
        <div className="wx-mq-row wx-rev"><div className="wx-mq-in">{[...audiences, ...audiences].reverse().map((a, i) => (<span key={i}>{a}<i></i></span>))}</div></div>
      </div>

      <section className="wx-hs" id="build" aria-labelledby="wx-build-t">
        <div className="wrap wx-hs-head">
          <div>
            <Lab n="01">What we build</Lab>
            <h2 className="wx-h2" id="wx-build-t" data-split>Four ways we build the web.</h2>
          </div>
          <div className="wx-hs-bar" aria-hidden="true"><span>Scroll</span><i></i></div>
        </div>
        <div className="wx-hs-track">
          {builds.map((b, i) => (
            <article className="wx-panel" key={b.t}>
              <div className="wx-panel-txt">
                <b className="wx-num">0{i + 1}</b>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
                <ul>{b.tags.map((t) => (<li key={t}>{t}</li>))}</ul>
              </div>
              <div className="wx-panel-vis"><BuildVisual k={i} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="wx-exp" id="expertise" aria-labelledby="wx-exp-t">
        <div className="wrap wx-exp-grid">
          <div>
            <Lab n="02">Our expertise</Lab>
            <h2 className="wx-h2" id="wx-exp-t" data-split>Everything a great website needs.</h2>
            <ol className="wx-exp-list">
              {expertise.map(([t, d], i) => (
                <li key={t}>
                  <button type="button" className={"wx-exp-item" + (i === 0 ? " on" : "")}>
                    <b>0{i + 1}</b><span className="wx-et">{t}</span><span className="wx-ed">{d}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="wx-exp-frame">
            {expertise.map(([t, , src]) => (
              <div className="wx-exp-pic" key={t}><WxPhoto srcs={[...src]} alt={t + " at Softsaro"} label="View" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wx-bento" aria-labelledby="wx-bento-t">
        <div className="wrap">
          <Lab n="03">In practice</Lab>
          <h2 className="wx-h2" id="wx-bento-t" data-split>Built to look sharp on every screen.</h2>
          <div className="wx-bg">
            <figure className="wx-b wx-b1" data-speed="0.4"><WxPhoto srcs={P.hero} alt="Business website on laptop and phone" label="View" /><figcaption>Business websites</figcaption></figure>
            <figure className="wx-b wx-b2" data-speed="0.9"><WxPhoto srcs={P.ui} alt="UI design screens" label="View" /><figcaption>Interface design</figcaption></figure>
            <figure className="wx-b wx-b3" data-speed="0.2"><WxPhoto srcs={P.dash} alt="Web application dashboard" label="View" /><figcaption>Web applications</figcaption></figure>
            <figure className="wx-b wx-b4" data-speed="0.7"><WxPhoto srcs={P.dev} alt="Developer building a website" label="View" /><figcaption>Clean code</figcaption></figure>
            <figure className="wx-b wx-b5" data-speed="0.5"><WxPhoto srcs={P.work} alt="Design and development workspace" label="View" /><figcaption>Platforms &amp; listings</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="wx-proc" aria-labelledby="wx-proc-t">
        <div className="wrap">
          <Lab n="04">Our process</Lab>
          <h2 className="wx-h2" id="wx-proc-t" data-split>From first call to launch.</h2>
          <ol className="wx-rows">
            {steps.map(([t, d], i) => (
              <li className="wx-row" key={t}>
                <i className="wx-rline"></i>
                <span className="wx-rn">0{i + 1}</span><h3>{t}</h3><p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wx-why" aria-labelledby="wx-why-t">
        <div className="wrap wx-why-grid">
          <div className="wx-why-l">
            <Lab n="05" w>Why Softsaro</Lab>
            <h2 className="wx-h2" id="wx-why-t" data-split>A team you can rely on.</h2>
            <div className="wx-count" aria-label="8 plus years">8+</div>
            <p className="wx-why-s">years of IT experience, serving clients in Nepal and abroad through our Kathmandu and USA offices.</p>
            <div className="wx-tilt" data-tilt=""><WxPhoto srcs={P.team} alt="Softsaro team working on a website" label="View" /></div>
          </div>
          <ul className="wx-why-list" data-stagger="">
            {why.map(([t, d], i) => (<li key={t}><small>0{i + 1}</small><h3>{t}</h3><p>{d}</p></li>))}
          </ul>
        </div>
      </section>

      <section className="wx-tech" aria-labelledby="wx-tech-t">
        <div className="wrap">
          <Lab n="06">Technologies</Lab>
          <h2 className="wx-h2" id="wx-tech-t" data-split>The right stack for each project.</h2>
          <ul className="wx-pills" data-stagger="">{tech.map((t) => (<li key={t}>{t}</li>))}</ul>
          <figure className="wx-b wx-xwide" data-speed="0.3"><WxPhoto srcs={P.wide} alt="Developer writing code for a website project" label="View" /><figcaption>Modern, maintainable code</figcaption></figure>
        </div>
      </section>

      <section className="wx-faq" aria-labelledby="wx-faq-t">
        <div className="wrap wx-faq-grid">
          <div>
            <Lab n="07">FAQ</Lab>
            <h2 className="wx-h2" id="wx-faq-t" data-split>Questions we hear often.</h2>
            <figure className="wx-b wx-xtall" data-speed="0.4"><WxPhoto srcs={P.desk} alt="Design and development workspace" label="View" /><figcaption>Design to launch</figcaption></figure>
          </div>
          <div className="wx-faq-list" data-stagger="">
            {faqs.map(([q, a]) => (
              <details key={q} name="wx-faq"><summary><span>{q}</span><i aria-hidden="true"></i></summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="wx-cta-s" id="contact" aria-labelledby="wx-cta-t">
        <div className="wrap wx-cta-grid">
          <div>
            <p className="wx-eyebrow"><i></i>Start your website project</p>
            <h2 className="wx-h2 wx-big" id="wx-cta-t" data-split>Have a project in mind?</h2>
            <p className="wx-sub">Let&rsquo;s talk about what it actually needs, not what&rsquo;s easiest for us to sell.</p>
            <div className="wx-cta">
              <a className="btn dark" href={`${S}/contact`}><Roll t="Start a project" /><Up /></a>
              <a className="btn wx-out" href="tel:9818439664"><Roll t="Call 9818439664" /></a>
            </div>
            <p className="wx-contact"><a href="mailto:info@softsaro.com">info@softsaro.com</a> &middot; Trade Tower, 5th Floor, Thapathali, Kathmandu</p>
          </div>
          <div className="wx-cta-pic" data-tilt=""><WxPhoto srcs={P.work} alt="Softsaro design and development team at work" label="View" /></div>
        </div>
      </section>
    </>
  );
}