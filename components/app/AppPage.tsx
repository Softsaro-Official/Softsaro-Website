import { S, Roll, Up } from "@/components/Site";
import AppPhoto from "@/components/app/AppPhoto";

const PH = {
  s1: ["/assets/app/showcase-1.jpg", "/assets/dm/devices.jpg", "/assets/seo/hero.jpg"],
  s2: ["/assets/app/showcase-2.jpg", "/assets/dm/brainstorm.jpg", "/assets/seo/keyword.jpg"],
  team: ["/assets/app/team.jpg", "/assets/seo/why.jpg", "/assets/dm/team.jpg"],
  why: ["/assets/app/why.jpg", "/assets/dm/team.jpg", "/assets/dm/huddle.jpg"],
};

const cards = [
  { k: "ios", n: "01", t: "iOS apps", d: "Native iOS apps in Swift, with the performance and platform features Apple's ecosystem expects.", tags: ["Swift", "Native"], v: "shop" },
  { k: "and", n: "02", t: "Android apps", d: "Native Android apps in Kotlin, built for the wide range of Android devices.", tags: ["Kotlin", "Native"], v: "chart" },
  { k: "x", n: "03", t: "Cross-platform", d: "One codebase for iOS and Android with React Native or Flutter.", tags: ["React Native", "Flutter"], v: "learn" },
];

const expertise = [
  { n: "01", t: "Custom apps", d: "Built around your business problem, not a template.", tags: ["Planning", "Features"], v: "shop" },
  { n: "02", t: "UI/UX design", d: "Simple, clean screens that stay consistent across devices.", tags: ["Usability", "Brand"], v: "profile" },
  { n: "03", t: "Backend & API integration", d: "The APIs and cloud infrastructure that power the app.", tags: ["APIs", "Cloud"], v: "code" },
  { n: "04", t: "Testing", d: "Real devices, screen sizes and OS versions, before your users find the bugs.", tags: ["QA", "Real devices"], v: "chart" },
  { n: "05", t: "Maintenance", d: "Post-launch support and monitoring to keep the app healthy.", tags: ["Support", "Monitoring"], v: "chat" },
];

const steps = [
  { t: "Planning", d: "Goals, users and a clear roadmap.", x: 13, y: 228, below: false },
  { t: "Design", d: "A user-centred interface and prototype.", x: 141, y: 106, below: false },
  { t: "Development", d: "Native or cross-platform build.", x: 293, y: 35, below: false },
  { t: "Testing", d: "Real devices, screens and OS versions.", x: 418, y: 166, below: true },
  { t: "Launch", d: "Release to the app stores.", x: 569, y: 75, below: false },
  { t: "Support", d: "Monitoring, support and handover.", x: 739, y: 25, below: true },
];

const tech = [
  ["Flutter", "Cross-platform", 4, 20, -4], ["React Native", "Cross-platform", 30, 0, 3], ["Swift", "Native iOS", 58, 14, -3], ["Kotlin", "Native Android", 80, 3, 4],
  ["Laravel / PHP", "Backend & API", 22, 40, -2], ["MySQL", "Database", 66, 38, 3], ["PostgreSQL", "Structured data", 78, 58, -2],
  ["Node.js", "Backend APIs", 8, 64, 3], ["Firebase", "Real-time data", 36, 76, -3], ["AWS", "Cloud infrastructure", 60, 72, 2],
] as const;

const why = [
  ["One team, start to finish", "Planning, design, development, testing and support managed by one team."],
  ["Native and cross-platform expertise", "We recommend Android, native iOS or cross-platform based on your app's goals."],
  ["Built to be found", "Apps built with discoverability in mind, including app store optimisation."],
];

const faqs = [
  ["What's included when I hire Softsaro for app development?", "Planning, UI/UX design, development, testing and post-launch support, handled by one team."],
  ["Should I build a native or cross-platform app?", "It depends on your goals. We recommend Android, native iOS or cross-platform after learning what your app needs to do."],
  ["Do you build for both iOS and Android?", "Yes. We build Android apps, iOS apps and cross-platform apps that run on both."],
  ["Can you build a completely custom app?", "Yes. Every app is built around your business problem, not a template."],
  ["Can you turn my website into an app?", "In many cases, yes. Share your website and goals and we will advise on the best approach."],
  ["Where is Softsaro located?", "Trade Tower, 5th Floor - Thapathali, Kathmandu, Nepal, with a second office in the USA."],
];

const Lab = ({ n, children, w }: { n?: string; children: React.ReactNode; w?: boolean }) => (
  <p className={w ? "lab w" : "lab"}><i></i>{n ? <span className="gn">{n} /</span> : null} {children}</p>
);

type K = "shop" | "learn" | "track" | "chat" | "chart" | "profile" | "code";

function Screen({ k, on }: { k: K; on?: boolean }) {
  return (
    <div className={on ? "ma-scr on" : "ma-scr"}>
      {k === "shop" && (<>
        <div className="ma-hd"></div>
        <div className="ma-ban"></div>
        <div className="ma-tiles"><i className="ma-tile"></i><i className="ma-tile b"></i><i className="ma-tile c"></i><i className="ma-tile"></i></div>
        <div className="ma-btn2"></div>
      </>)}
      {k === "learn" && (<>
        <div className="ma-row"><i className="ma-av"></i><div className="ma-hd"></div></div>
        <div className="ma-card2"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="5" /><circle cx="21" cy="21" r="15.9" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="35" transform="rotate(-90 21 21)" /></svg><b>Lesson 3</b></div>
        <div className="ma-ln2"></div><div className="ma-ln2 s"></div><div className="ma-ln2"></div>
        <div className="ma-btn2"></div>
      </>)}
      {k === "track" && (<>
        <div className="ma-map"><svg viewBox="0 0 100 120" preserveAspectRatio="none"><path d="M12 100 C 30 90 24 60 48 56 S 70 30 86 16" fill="none" stroke="#6a67ae" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 6" /><circle cx="86" cy="16" r="5" fill="#6a67ae" /><circle cx="12" cy="100" r="4" fill="#0a0b14" /></svg></div>
        <div className="ma-sheet"><div className="ma-hd"></div><div className="ma-ln2"></div></div>
      </>)}
      {k === "chat" && (<>
        <div className="ma-row"><i className="ma-av"></i><div className="ma-hd"></div></div>
        <div className="ma-bub"></div><div className="ma-bub me"></div><div className="ma-bub"></div><div className="ma-bub me s"></div>
      </>)}
      {k === "chart" && (<>
        <div className="ma-hd"></div>
        <div className="ma-kp"><b></b><svg viewBox="0 0 100 30"><path d="M0 24 L18 16 L36 20 L54 8 L72 12 L100 2" fill="none" stroke="#6a67ae" strokeWidth="3" strokeLinecap="round" /></svg></div>
        <div className="ma-bars">{[40, 70, 52, 88, 60, 76].map((h, i) => (<i key={i} style={{ height: `${h}%` }}></i>))}</div>
      </>)}
      {k === "profile" && (<>
        <i className="ma-av big"></i><div className="ma-hd c"></div>
        <div className="ma-st3"><i></i><i></i><i></i></div>
        <div className="ma-ln2"></div><div className="ma-ln2 s"></div><div className="ma-ln2"></div>
      </>)}
      {k === "code" && (<>
        <div className="ma-hd"></div>
        {[["GET", "/orders"], ["POST", "/login"], ["GET", "/profile"], ["PUT", "/cart"]].map(([m, p]) => (<div className="ma-ep" key={p}><b>{m}</b><span>{p}</span></div>))}
        <div className="ma-tag-api">API</div>
      </>)}
    </div>
  );
}

function Phone({ ks, cls = "" }: { ks: K[]; cls?: string }) {
  return (
    <div className={`ma-phn ${cls}`} aria-hidden="true">
      <i className="ma-island"></i>
      {ks.map((k, i) => (<Screen key={k + i} k={k} on={i === 0} />))}
    </div>
  );
}

const Check = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Star = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" /></svg>);

export default function AppPage() {
  return (
    <div className="ma-page">
      {/* HERO */}
      <section className="ma-hero" id="top" aria-labelledby="ma-title">
        <i className="ma-grid" aria-hidden="true"></i>
        <i className="ma-glow g1" aria-hidden="true"></i>
        <i className="ma-glow g2" aria-hidden="true"></i>
        <div className="wrap ma-hero-in">
          <div className="ma-hero-copy">
            <p className="ma-eyebrow" data-in=""><i></i>Mobile app development &middot; Kathmandu, Nepal</p>
            <h1 className="ma-h1" id="ma-title">
              <span className="ma-ln">Apps worth a</span>
              <span className="ma-ln">place on the</span>
              <span className="ma-ln ma-acc">home</span>
              <span className="ma-ln ma-acc">screen.</span>
            </h1>
            <p className="ma-sub" data-in="">Android, iOS and cross-platform apps that are fast, simple and built around what your users actually need, from planning to post-launch support.</p>
            <div className="ma-prog" data-in="" aria-hidden="true"><i></i></div>
            <div className="cta-row ma-cta-row" data-in="">
              <a className="btn ma-purple" href={`${S}/contact`}><Roll t="Discuss your app idea" /><Up /></a>
              <a className="btn seo-outline" href="#build"><Roll t="How we build" /></a>
            </div>
          </div>
          <div className="ma-stage">
            <div className="ma-l ma-p1" data-depth="12"><Phone ks={["chat"]} /></div>
            <div className="ma-l ma-p3" data-depth="18"><Phone ks={["chart"]} /></div>
            <div className="ma-l ma-p2" data-depth="24"><Phone ks={["shop", "learn", "track"]} /></div>
            <div className="ma-l ma-note n1" data-depth="34" data-float="-10,0,5"><i><Check /></i><div><b>Order confirmed</b><span>Thanks for shopping</span></div></div>
            <div className="ma-l ma-note n2" data-depth="30" data-float="10,0,4.6"><i><Star /></i><div><b>Delivery nearby</b><span>Arriving soon</span></div></div>
            <div className="ma-l ma-note n3" data-depth="26" data-float="-8,0,5.4"><i><Star /></i><div><b>New lesson</b><span>Continue learning</span></div></div>
            <p className="ma-cap">Illustrative concept screens</p>
            <div className="ma-pdots" role="group" aria-label="Preview screens">
              {[0, 1, 2].map((i) => (<button type="button" key={i} className={i === 0 ? "on" : ""} aria-label={`Show screen ${i + 1}`}></button>))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="ma-build" id="build" aria-labelledby="ma-build-title">
        <div className="wrap">
          <Lab n="01">What we build</Lab>
          <h2 className="ma-h2" id="ma-build-title" data-split>Three ways onto the home screen.</h2>
          <div className="ma-cards" data-stagger="">
            {cards.map((c, i) => (
              <article className={`ma-card ${c.k}${i === 0 ? " on" : ""}`} key={c.k} tabIndex={0}>
                <div className="ma-card-t">
                  <small>{c.n}</small>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <ul>{c.tags.map((t) => (<li key={t}>{t}</li>))}</ul>
                </div>
                <div className="ma-card-p"><Phone ks={[c.v as K]} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="ma-exp" id="expertise" aria-labelledby="ma-exp-title">
        <div className="wrap">
          <Lab n="02">App development expertise</Lab>
          <h2 className="ma-h2 big" id="ma-exp-title" data-split>Everything an app needs, in one team.</h2>
          <div className="ma-exp-grid">
            <div className="ma-exp-l">
              <div className="ma-exp-phone"><Phone ks={expertise.map((e) => e.v as K)} /></div>
              <div className="ma-circle" data-float="-10,0,5"><AppPhoto srcs={PH.team} alt="Softsaro team planning an app together" /></div>
            </div>
            <div className="ma-edots" aria-hidden="true">{expertise.map((e) => (<i key={e.n}></i>))}</div>
            <div className="ma-exp-r">
              {expertise.map((e, i) => (
                <article className={i === 0 ? "ma-ex on" : "ma-ex"} key={e.n}>
                  <small>{e.n}</small>
                  <h3>{e.t}</h3>
                  <p>{e.d}</p>
                  <ul>{e.tags.map((t) => (<li key={t}>{t}</li>))}</ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="ma-show" aria-labelledby="ma-show-title">
        <div className="wrap">
          <Lab n="03" w>Visual showcase</Lab>
          <h2 className="ma-h2 ma-white" id="ma-show-title" data-split>Interfaces designed for the thumb.</h2>
          <p className="ma-note-s">Illustrative concept screens, not client work.</p>
          <div className="ma-show-stage">
            <div className="ma-sp sp1"><Phone ks={["code"]} /></div>
            <div className="ma-sp sp2"><Phone ks={["shop"]} /></div>
            <div className="ma-sp sp3"><Phone ks={["track"]} /></div>
            <div className="ma-sc sc1" data-speed="0.18"><AppPhoto srcs={PH.s1} alt="Mobile and web interfaces shown on devices on a desk" /></div>
            <div className="ma-sc sc2" data-speed="0.32"><AppPhoto srcs={PH.s2} alt="Designers reviewing app screens together" /></div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ma-proc" aria-labelledby="ma-proc-title">
        <div className="wrap">
          <Lab n="04">Development process</Lab>
          <h2 className="ma-h2 big" id="ma-proc-title" data-split>Six stages. No surprises.</h2>
          <div className="ma-proc-box">
            <svg className="ma-proc-svg" viewBox="0 0 760 260" preserveAspectRatio="none" aria-hidden="true">
              <path d="M13 228 C 70 228 90 120 141 106 C 200 88 230 32 293 35 C 360 38 380 166 418 166 C 470 166 500 90 569 75 C 640 60 680 25 739 25" fill="none" stroke="#dcd8ec" strokeWidth="2.5" />
              <path className="ma-path" d="M13 228 C 70 228 90 120 141 106 C 200 88 230 32 293 35 C 360 38 380 166 418 166 C 470 166 500 90 569 75 C 640 60 680 25 739 25" fill="none" stroke="#6a67ae" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <i className="ma-trav" aria-hidden="true"></i>
            <ol className="ma-steps">
              {steps.map((s, i) => (
                <li className={`ma-step${s.below ? " below" : ""}`} key={s.t} style={{ ["--x" as string]: `${(s.x / 760) * 100}%`, ["--y" as string]: `${(s.y / 260) * 100}%` }}>
                  <span className="ma-node">{i + 1}</span>
                  <div className="ma-step-t"><h3>{s.t}</h3><p>{s.d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="ma-tech" aria-labelledby="ma-tech-title">
        <div className="wrap">
          <Lab n="05" w>Technology stack</Lab>
          <h2 className="ma-h2 ma-white" id="ma-tech-title" data-split>The right tools for each app.</h2>
          <div className="ma-field">
            {tech.map(([n, d, x, y, r]) => (
              <div className="ma-chip" key={n} style={{ left: `${x}%`, top: `${y}%`, ["--r" as string]: `${r}deg` }}><b>{n}</b><span>{d}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="ma-why" aria-labelledby="ma-why-title">
        <div className="wrap ma-why-in">
          <div className="ma-why-l">
            <Lab n="06">Why Softsaro</Lab>
            <h2 className="ma-sr" id="ma-why-title">Why Softsaro</h2>
            <div className="ma-big"><b data-count="8">8</b><sup>+</sup></div>
            <p className="ma-big-l">Years as an IT company in Nepal</p>
            <div className="ma-why-ph" data-reveal=""><AppPhoto srcs={PH.why} alt="Softsaro team at work in the Kathmandu office" /></div>
          </div>
          <div className="ma-why-r">
            <ol data-stagger="">
              {why.map(([t, d], i) => (<li key={t}><small>0{i + 1}</small><div><h3>{t}</h3><p>{d}</p></div></li>))}
            </ol>
            <p className="ma-why-n">Serving clients across Nepal and internationally through our USA office.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ma-faq" aria-labelledby="ma-faq-title">
        <div className="wrap ma-faq-in">
          <div>
            <Lab n="07">FAQ</Lab>
            <h2 className="ma-h2 big" id="ma-faq-title" data-split>Good questions, straight answers.</h2>
          </div>
          <div className="ma-faq-list" data-stagger="">
            {faqs.map(([q, a], i) => (
              <details key={q} name="ma-faq" open={i === 0}>
                <summary><span>{q}</span><i aria-hidden="true"></i></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ma-ctaw" id="contact" aria-labelledby="ma-cta-title">
        <div className="ma-cta">
          <div className="ma-cta-t">
            <p className="lab w"><i></i>Get in touch</p>
            <h2 className="ma-cta-h" id="ma-cta-title" data-split>Have an app idea worth building?</h2>
            <p className="ma-cta-p">Tell us what your users need and talk directly with the team that will build it.</p>
            <div className="cta-row">
              <a className="btn white" href={`${S}/contact`}><Roll t="Discuss your app idea" /><Up /></a>
              <a className="btn ghostw" href="tel:9818439664"><Roll t="Call 9818439664" /></a>
            </div>
          </div>
          <div className="ma-cta-ph" data-float="-12,0,5"><Phone ks={["shop"]} /></div>
        </div>
      </section>
    </div>
  );
}