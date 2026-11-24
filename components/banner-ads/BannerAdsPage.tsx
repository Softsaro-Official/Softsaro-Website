import type { CSSProperties } from "react";
import BannerAdsPhoto from "./BannerAdsPhoto";

const C = "https://softsaro.com.np/contact";
const VIO = "#5b2fd6", COR = "#2a1668", YEL = "#ffc233", LIM = "#ece6f8", PNK = "#ece6f8", INK = "#120b2e", CR = "#f6f0e6", W = "#ffffff";
const P = {
  a: ["/assets/banner/studio.jpg", "/assets/dm/brainstorm.jpg"],
  b: ["/assets/banner/campaign.jpg", "/assets/dm/celebrate.jpg"],
  c: ["/assets/banner/screens.jpg", "/assets/dm/devices.jpg"],
  d: ["/assets/banner/team.jpg", "/assets/dm/team.jpg"],
  e: ["/assets/banner/billboard.jpg", "/assets/dm/band.jpg"],
  f: ["/assets/banner/review.jpg", "/assets/dm/strategy.jpg"],
};

type AdP = { cls: string; a: string; b: string; c: string; d: string; tag: string; h: string; cta: string; ph?: string[]; label?: string };

function Ad({ cls, a, b, c, d, tag, h, cta, ph, label = "View" }: AdP) {
  const st = { "--a": a, "--b": b, "--c": c, "--d": d } as CSSProperties;
  return (
    <div className={"bn-ad " + cls} style={st} data-cursor-label={label}>
      <i className="bn-ad-blob" />
      <div className="bn-ad-ph">{ph ? <BannerAdsPhoto srcs={ph} alt="" label={label} /> : <span className="bn-ad-shape" />}</div>
      <div className="bn-ad-t"><small>{tag}</small><b>{h}</b><span className="bn-ad-cta">{cta}</span></div>
    </div>
  );
}

const HERO: Array<{ k: string; f: string; r: number; dp: number; t: string; s: string; ad: AdP }> = [
  { k: "f1", f: "top", r: -8, dp: 0.5, t: "-2deg", s: "5s", ad: { cls: "r-wide", a: INK, b: YEL, c: CR, d: INK, tag: "Mega sale", h: "Sale season starts now", cta: "Shop now", ph: P.b } },
  { k: "f2", f: "right", r: 10, dp: 0.9, t: "3deg", s: "6s", ad: { cls: "r-mpu", a: VIO, b: LIM, c: W, d: INK, tag: "New launch", h: "Say hello to new", cta: "Discover", ph: P.c } },
  { k: "f3", f: "bottom", r: -12, dp: 1.2, t: "-4deg", s: "7s", ad: { cls: "r-tall", a: YEL, b: VIO, c: INK, d: W, tag: "Open now", h: "Grand opening", cta: "Visit us", ph: P.d } },
  { k: "f4", f: "left", r: 12, dp: 0.7, t: "4deg", s: "5.5s", ad: { cls: "r-sq", a: PNK, b: INK, c: INK, d: W, tag: "Festival", h: "Celebrate big", cta: "Join in", ph: P.e } },
];

const MQ = ["Promo", "Display", "Social", "Festival", "Launch", "Offer", "Campaign"];

const CON: Array<{ n: string; name: string; size: string; bg: string; ad: AdP }> = [
  { n: "01", name: "Festival offers", size: "Web billboard  970 \u00d7 250", bg: "#120b2e", ad: { cls: "r-wide", a: VIO, b: YEL, c: W, d: INK, tag: "Festive season", h: "Big offers. Bigger smiles.", cta: "Shop now", ph: P.b } },
  { n: "02", name: "New arrivals", size: "Medium rectangle  300 \u00d7 250", bg: "#1a1040", ad: { cls: "r-mpu", a: YEL, b: INK, c: INK, d: W, tag: "New arrival", h: "Fresh in. Fast out.", cta: "See more", ph: P.c } },
  { n: "03", name: "Launch day", size: "Social square  1080 \u00d7 1080", bg: "#120b2e", ad: { cls: "r-sq", a: LIM, b: VIO, c: INK, d: W, tag: "Launch day", h: "Meet the new you.", cta: "Learn more", ph: P.a } },
  { n: "04", name: "Limited time", size: "Story or reel  1080 \u00d7 1920", bg: "#1a1040", ad: { cls: "r-story", a: COR, b: YEL, c: W, d: INK, tag: "Limited time", h: "Today only.", cta: "Swipe up", ph: P.e } },
  { n: "05", name: "Open enrolment", size: "Half-page  300 \u00d7 600", bg: "#120b2e", ad: { cls: "r-tall", a: PNK, b: INK, c: INK, d: W, tag: "Open enrolment", h: "Learn something new.", cta: "Enrol now", ph: P.d } },
];

const ROWS: Array<{ t: string; d: string; ad: AdP }> = [
  { t: "Promotional banners", d: "Offers, launches and seasonal pushes.", ad: { cls: "r-mpu", a: COR, b: YEL, c: W, d: INK, tag: "Promo", h: "Flat out offers", cta: "Shop" } },
  { t: "Social media creatives", d: "Posts, stories and covers that stop the scroll.", ad: { cls: "r-mpu", a: VIO, b: PNK, c: W, d: INK, tag: "Social", h: "Stop the scroll", cta: "Follow" } },
  { t: "Web display banners", d: "Sized for the placements you actually buy.", ad: { cls: "r-mpu", a: INK, b: LIM, c: CR, d: INK, tag: "Display", h: "Made for every screen", cta: "Visit" } },
  { t: "Campaign graphics", d: "One idea carried across every format.", ad: { cls: "r-mpu", a: YEL, b: VIO, c: INK, d: W, tag: "Campaign", h: "One idea, many formats", cta: "Explore" } },
  { t: "Festival and offer creatives", d: "Timely designs ready before the date.", ad: { cls: "r-mpu", a: LIM, b: COR, c: INK, d: W, tag: "Festival", h: "Celebrate with colour", cta: "Join in" } },
];

const STEPS = [
  { t: "Message", d: "We boil your offer down to one clear line." },
  { t: "Visual", d: "Colour, type and imagery built to stop the scroll." },
  { t: "Placement", d: "Sized and delivered for every channel you run." },
];

const USES = [
  { t: "E-commerce and retail", d: "Offers, launches, seasonal sales" },
  { t: "Travel and tours", d: "Packages and destination pushes" },
  { t: "Education and training", d: "Admissions and course promotion" },
  { t: "Finance and cooperatives", d: "Clear, trustworthy announcements" },
  { t: "Events and festivals", d: "Dates, tickets and buzz" },
  { t: "Real estate", d: "Projects and open houses" },
];

const WHY = [
  { t: "Eye-catching designs", d: "Bold colour, sharp type and imagery made to stop the scroll." },
  { t: "The right audience", d: "Messages shaped for the people most likely to act on them." },
  { t: "Measurable results", d: "Creatives built to be tracked, so you can see what works." },
];

export default function BannerAdsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bn-hero" id="top">
        <div className="bn-hero-in">
          <p className="bn-kick">Banner ads for your <span className="bn-swap"><b>sale</b><b>launch</b><b>festival</b><b>offer</b></span></p>
          <h1 className="bn-h1" aria-label="Banners that get noticed.">
            <span className="bn-l" aria-hidden="true">Banners</span>
            <span className="bn-l bn-hl" aria-hidden="true">that get</span>
            <span className="bn-l bn-outline" aria-hidden="true">noticed.</span>
          </h1>
          <div className="bn-foot">
            <p className="bn-sub">Eye-catching banner ads that put your brand in front of the right audience and turn views into customers.</p>
            <div className="bn-cta">
              <a className="bn-btn" data-mag href={C}>Book a free consultation <span>&rarr;</span></a>
              <a className="bn-btn bn-btn--o" data-mag href="#work">See the work</a>
            </div>
          </div>
        </div>
        <div className="bn-fls" aria-hidden="true">
          {HERO.map((h) => (
            <div key={h.k} className={"bn-fl " + h.k} data-depth={h.dp}>
              <div className="bn-fi" data-from={h.f} data-r={h.r}>
                <div className="bn-ff" style={{ "--t": h.t, "--s": h.s } as CSSProperties}><Ad {...h.ad} /></div>
              </div>
            </div>
          ))}
          <div className="bn-stk"><span>Your brand here</span></div>
        </div>
      </section>

      <div className="bn-mq-w" aria-hidden="true">
        <div className="bn-mq">
          {[0, 1, 2].map((r) => MQ.map((m, i) => <span key={r + m} className={"bn-mq-i" + (i % 2 ? " bn-o" : "")}>{m}<i /></span>))}
        </div>
      </div>

      {/* SHOWCASE (pinned horizontal on desktop) */}
      <section className="bn-hz" id="work">
        <div className="bn-hz-pin">
          <div className="bn-c bn-hz-head">
            <div>
              <p className="bn-eye">Creative showcase</p>
              <h2 className="bn-h2 bn-h2--m" data-split>Banners in every shape.</h2>
            </div>
            <p className="bn-note">Sample concepts, not client work. Keep scrolling or swipe.</p>
          </div>
          <div className="bn-c bn-hz-bar" aria-hidden="true"><i /></div>
          <div className="bn-track">
            {CON.map((c) => (
              <article key={c.n} className="bn-pn" data-bg={c.bg}>
                <div className="bn-pn-l">
                  <span className="bn-pn-n">{c.n}</span>
                  <h3>{c.name}</h3>
                  <p>{c.size}</p>
                </div>
                <div className="bn-pn-ad" data-tilt><Ad {...c.ad} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE CREATE */}
      <section className="bn-s bn-mk" id="create">
        <div className="bn-c">
          <p className="bn-eye">What we create</p>
          <h2 className="bn-h2" data-split>Made to be seen.</h2>
          <ol className="bn-rows" data-stagger>
            {ROWS.map((r, i) => (
              <li key={r.t} className="bn-row"><span>0{i + 1}</span><h3>{r.t}</h3><small>{r.d}</small></li>
            ))}
          </ol>
        </div>
        <div className="bn-pv" aria-hidden="true">
          <div className="bn-pv-s">
            {ROWS.map((r, i) => <div key={r.t} className={"bn-pvi" + (i === 0 ? " on" : "")}><Ad {...r.ad} /></div>)}
          </div>
        </div>
      </section>

      {/* APPROACH (pinned builder on desktop) */}
      <section className="bn-bld-s" id="approach">
        <div className="bn-bpin">
          <div className="bn-c bn-bgrid">
            <div className="bn-bl">
              <p className="bn-eye">Creative approach</p>
              <h2 className="bn-h2 bn-h2--m" data-split>From message to unmissable.</h2>
              <ol className="bn-sts">
                {STEPS.map((s, i) => (
                  <li key={s.t} className={"bn-st" + (i === 0 ? " on" : "")}><b>0{i + 1}</b><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
                ))}
              </ol>
            </div>
            <div className="bn-bstage">
              <div className="bn-bwrap"><Ad cls="r-sq bld" a={VIO} b={YEL} c={W} d={INK} tag="Your brand" h="Your message, made unmissable." cta="Learn more" ph={P.f} /></div>
              <span className="bn-sz s1">728 &times; 90</span>
              <span className="bn-sz s2">300 &times; 250</span>
              <span className="bn-sz s3">1080 &times; 1080</span>
              <span className="bn-sz s4">1080 &times; 1920</span>
            </div>
          </div>
        </div>
      </section>

      {/* USES */}
      <section className="bn-s bn-uc" id="uses">
        <div className="bn-c">
          <p className="bn-eye">Who it is for</p>
          <h2 className="bn-h2" data-split>Every business has a message.</h2>
          <ul className="bn-pills">
            {USES.map((u) => <li key={u.t}><b>{u.t}</b><i>{u.d}</i></li>)}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="bn-s bn-why" id="why">
        <div className="bn-c">
          <p className="bn-eye bn-eye--l">Why Softsaro</p>
          <p className="bn-stmt">Eye-catching designs. The right audience. Measurable results.</p>
          <div className="bn-badge"><span>8+ years<br />Nepal &amp; USA</span></div>
          <div className="bn-wy" data-stagger>
            {WHY.map((w, i) => <div key={w.t} className="bn-wi"><b>0{i + 1}</b><h3>{w.t}</h3><p>{w.d}</p></div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bn-end" id="contact">
        <div className="bn-cta-bg" />
        <div className="bn-c bn-end-in">
          <p className="bn-eye bn-eye--l">Start a campaign</p>
          <h2 className="bn-h2 bn-h2--xl" data-split>Let&rsquo;s make your brand impossible to ignore.</h2>
          <div className="bn-cta">
            <a className="bn-btn" data-mag href={C}>Book a free consultation <span>&rarr;</span></a>
            <a className="bn-btn bn-btn--o" data-mag href="tel:9818439664">9818439664</a>
          </div>
          <ul className="bn-ct">
            <li><small>Email</small><a href="mailto:info@softsaro.com">info@softsaro.com</a></li>
            <li><small>Visit</small>Trade Tower, 5th Floor, Thapathali, Kathmandu</li>
          </ul>
        </div>
      </section>
    </>
  );
}