import type { CSSProperties, ReactNode } from "react";
import UxPhoto from "./UxPhoto";

const C = "https://softsaro.com.np/contact";
const P = {
  hero: ["/assets/ux/ui-hero.jpg", "/assets/dm/brainstorm.jpg"],
  work: ["/assets/ux/designer-desk.jpg", "/assets/dm/team.jpg"],
  team: ["/assets/ux/wireframe-session.jpg", "/assets/dm/huddle.jpg"],
  devs: ["/assets/ux/devices.jpg", "/assets/dm/devices.jpg"],
  cta: ["/assets/ux/studio.jpg", "/assets/seo/cta.jpg"],
  shot: ["/assets/ux/dashboard-screen.jpg", "/assets/dm/analytics.jpg"],
};

const MQ = ["User research", "Wireframes", "Prototypes", "Design systems", "Mobile apps", "Dashboards", "Usability testing", "Visual design"];

const WHAT = [
  { k: "web", t: "Website UI", d: "Fast, focused layouts that turn visits into enquiries." },
  { k: "app", t: "Mobile apps", d: "Thumb-friendly flows for iOS and Android." },
  { k: "dash", t: "Dashboards", d: "Clear data and calm hierarchy for quick decisions." },
  { k: "prod", t: "Digital products", d: "Journeys from first onboarding to repeat use." },
];

const EX = [
  { t: "Research", d: "We learn your users, goals and blockers before drawing a single screen." },
  { t: "Wireframing", d: "Structure first: layout, hierarchy and flow, without visual noise." },
  { t: "Prototyping", d: "Clickable flows you can test and refine before development starts." },
  { t: "Visual design", d: "Brand-true colour, type and components, ready for developers." },
];

const PR = [
  { t: "Discover", d: "Goals, audience and constraints, agreed in one honest conversation." },
  { t: "Research", d: "Users, competitors and journeys mapped to find what really matters." },
  { t: "Design", d: "Wireframes become a clean, consistent interface and design system." },
  { t: "Prototype", d: "Interactive flows tested early, so changes are cheap and fast." },
  { t: "Refine", d: "Feedback applied, details polished, handoff made developer-ready." },
];

const ART: ReactNode[] = [
  <><circle className="ux-dr" pathLength={1} cx="50" cy="50" r="28" /><path className="ux-dr" pathLength={1} d="M71 71 L100 100" /></>,
  <><path className="ux-dr" pathLength={1} d="M20 100 H100" /><path className="ux-dr" pathLength={1} d="M32 100 V60" /><path className="ux-dr" pathLength={1} d="M60 100 V35" /><path className="ux-dr" pathLength={1} d="M88 100 V75" /></>,
  <><rect className="ux-dr" pathLength={1} x="18" y="18" width="84" height="84" rx="10" /><path className="ux-dr" pathLength={1} d="M18 50 H102" /><path className="ux-dr" pathLength={1} d="M50 50 V102" /></>,
  <><circle className="ux-dr" pathLength={1} cx="25" cy="85" r="10" /><circle className="ux-dr" pathLength={1} cx="60" cy="35" r="10" /><circle className="ux-dr" pathLength={1} cx="95" cy="75" r="10" /><path className="ux-dr" pathLength={1} d="M32 78 L53 43" /><path className="ux-dr" pathLength={1} d="M68 41 L88 68" /></>,
  <path className="ux-dr" pathLength={1} d="M25 62 L50 86 L98 32" />,
];

const BENS = [
  { t: "Research-led", d: "Every choice is backed by user insight, not guesswork." },
  { t: "Built to ship", d: "Clean files and components your developers can use at once." },
  { t: "Design and code together", d: "Designers and developers work side by side, so nothing is lost in handoff." },
  { t: "Direct support", d: "You talk to the people building your product." },
];

function Vis({ k }: { k: string }) {
  if (k === "web") return (
    <div className="ux-mv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "end" }}>
      <i style={{ gridColumn: "1/3", height: 12, width: "60%" }} /><i className="p" style={{ gridColumn: "1/3", height: 70 }} /><i style={{ height: 44 }} /><i style={{ height: 44 }} />
    </div>
  );
  if (k === "app") return (
    <div className="ux-mv" style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
      <i className="p" style={{ flex: 1, height: "100%", borderRadius: 22 }} /><i style={{ flex: 1, height: "82%", borderRadius: 22 }} /><i style={{ flex: 1, height: "64%", borderRadius: 22 }} />
    </div>
  );
  if (k === "dash") return (
    <div className="ux-mv" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
      {[40, 65, 50, 85, 60, 95, 75].map((h, n) => <i key={n} className={n === 5 ? "p" : ""} style={{ flex: 1, height: h + "%" }} />)}
    </div>
  );
  return (
    <div className="ux-mv" style={{ display: "grid", gap: 8, alignContent: "end" }}>
      <i className="p" style={{ height: 26, width: "85%" }} /><i style={{ height: 26 }} /><i style={{ height: 26, width: "70%" }} /><i style={{ height: 26, width: "92%" }} />
    </div>
  );
}

export default function UxPage() {
  return (
    <>
      {/* HERO */}
      <section className="ux-s ux-hero" id="top">
        <div className="ux-c">
          <div className="ux-hero-copy">
            <p className="ux-eye"><i />UI/UX Design Studio</p>
            <h1 className="ux-h1">Interfaces people <em>love</em> to use.</h1>
            <p className="ux-sub">We research, wireframe, prototype and polish digital products that feel effortless and convert.</p>
            <div className="ux-cta">
              <a className="ux-btn" data-mag href={C}>Start a Design Project <span>&rarr;</span></a>
              <a className="ux-btn ux-btn--ghost" data-mag href="#showcase">See the craft</a>
            </div>
          </div>
          <div className="ux-stage" aria-hidden="true">
            <div className="ux-l ux-l-blob" data-depth="0.3"><div className="ux-blob" /></div>
            <div className="ux-l ux-l-win" data-depth="0.5">
              <div className="ux-win">
                <div className="ux-win-bar"><span /><span /><span /><b>softsaro.com.np</b>
                  <em className="ux-bd"><span className="ux-bd-a">Wireframe</span><span className="ux-bd-b">Final design</span></em>
                </div>
                <div className="ux-win-body">
                  <div className="ux-nv">
                    <div className="ux-wf ux-wf-logo"><i className="ux-fill" /></div>
                    <div className="ux-nvl">
                      <div className="ux-wf ux-wf-l"><i className="ux-fill ux-f-soft" /></div>
                      <div className="ux-wf ux-wf-l"><i className="ux-fill ux-f-soft" /></div>
                      <div className="ux-wf ux-wf-l"><i className="ux-fill ux-f-soft" /></div>
                    </div>
                    <div className="ux-wf ux-wf-pill"><i className="ux-fill" /></div>
                  </div>
                  <div className="ux-hb">
                    <div className="ux-hb-t">
                      <div className="ux-wf ux-wf-h"><i className="ux-fill ux-f-ink" /></div>
                      <div className="ux-wf ux-wf-h ux-w70"><i className="ux-fill ux-f-ink" /></div>
                      <div className="ux-wf ux-wf-p"><i className="ux-fill ux-f-soft" /></div>
                      <div className="ux-wf ux-wf-p ux-w55"><i className="ux-fill ux-f-soft" /></div>
                      <div className="ux-wf ux-wf-btn"><i className="ux-fill" /></div>
                    </div>
                    <div className="ux-wf ux-wf-img"><i className="ux-fill"><UxPhoto srcs={P.hero} alt="Designers planning a user interface" label="Design" /></i></div>
                  </div>
                  <div className="ux-cards3">
                    <div className="ux-wf ux-wf-card"><i className="ux-fill ux-f-soft" /></div>
                    <div className="ux-wf ux-wf-card"><i className="ux-fill ux-f-soft" /></div>
                    <div className="ux-wf ux-wf-card"><i className="ux-fill ux-f-soft" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ux-l ux-l-phone" data-depth="0.9">
              <div className="ux-phone" data-float>
                <div className="ux-ph-s">
                  <div className="ux-ph-top"><i /><b /></div>
                  <div className="ux-ph-card"><small>Weekly activity</small><strong>82%</strong>
                    <svg viewBox="0 0 120 40"><path d="M0 30 C20 10 35 34 55 20 S95 4 120 12" /></svg>
                  </div>
                  <div className="ux-ph-row"><i /><span /><em /></div>
                  <div className="ux-ph-row"><i /><span /><em /></div>
                  <div className="ux-ph-tab"><i /><i /><i /></div>
                </div>
              </div>
            </div>
            <div className="ux-l ux-l-pal" data-depth="0.7">
              <div className="ux-pal" data-float>
                <small>Design tokens</small>
                <div className="ux-sw"><i style={{ background: "#6a67ae" }} /><i style={{ background: "#3f3d7a" }} /><i style={{ background: "#3fe33f" }} /><i style={{ background: "#0a0b14" }} /><i style={{ background: "#f3efe8" }} /></div>
                <div className="ux-aa">Aa<span>Inter</span></div>
              </div>
            </div>
            <div className="ux-l ux-l-sel" data-depth="1.1">
              <div className="ux-sel" data-float><span>Button / Primary</span><b>Get started</b><i /><i /><i /><i /></div>
            </div>
            <div className="ux-dcur"><svg viewBox="0 0 20 20"><path d="M2 2 L2 16 L6 12 L9 18 L11.5 17 L8.5 11 L14 11 Z" /></svg><span>Softsaro</span></div>
          </div>
        </div>
      </section>

      <div className="ux-mq" aria-hidden="true">
        <div className="ux-mq-t">
          {[0, 1].map((r) => MQ.map((m) => <span key={r + m} className="ux-mq-i">{m}<i /></span>))}
        </div>
      </div>

      {/* WHAT WE DESIGN */}
      <section className="ux-s ux-what" id="design">
        <div className="ux-c">
          <p className="ux-eye"><i />What we design</p>
          <h2 className="ux-h2" data-split>Four canvases. One <em>design language.</em></h2>
        </div>
        <div className="ux-c ux-ac" data-stagger>
          {WHAT.map((w, i) => (
            <article key={w.k} className={"ux-ac-p" + (i === 0 ? " on" : "")}>
              <div className="ux-ac-head"><span>0{i + 1}</span><h3>{w.t}</h3></div>
              <p>{w.d}</p>
              <div className="ux-ac-vis"><Vis k={w.k} /></div>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERTISE (pinned on desktop) */}
      <section className="ux-ex" id="expertise">
        <div className="ux-ex-pin">
          <div className="ux-c ux-ex-grid">
            <div className="ux-ex-l">
              <p className="ux-eye"><i />Our design expertise</p>
              <h2 className="ux-h2" data-split>From insight to <em>interface.</em></h2>
              <ol className="ux-ex-list">
                {EX.map((e, i) => (
                  <li key={e.t} className={"ux-ex-item" + (i === 0 ? " on" : "")}>
                    <button type="button"><span>0{i + 1}</span><b>{e.t}</b><small>{e.d}</small></button>
                  </li>
                ))}
              </ol>
              <div className="ux-ex-bar" aria-hidden="true"><i /></div>
            </div>
            <div className="ux-ex-r">
              <div className="ux-canvas" aria-hidden="true">
                <em className="ux-ill">Illustrative</em>
                <div className="ux-lay ux-lay0">
                  <p className="ux-lay-t">01 &middot; Research</p>
                  <div className="ux-lay-ph"><UxPhoto srcs={P.team} alt="Team reviewing user research" label="Research" /></div>
                  <div className="ux-notes"><span>Checkout feels long</span><span>Search is hard to find</span><span>Goal: book in two taps</span></div>
                </div>
                <div className="ux-lay ux-lay1">
                  <p className="ux-lay-t">02 &middot; Wireframe</p>
                  <div className="ux-wf2 ux-wf2-n"><b>Nav</b></div>
                  <div className="ux-wf2 ux-wf2-hero"><b>Hero</b></div>
                  <div className="ux-wf2-row"><div className="ux-wf2"><b>Card</b></div><div className="ux-wf2" /><div className="ux-wf2" /></div>
                </div>
                <div className="ux-lay ux-lay2">
                  <p className="ux-lay-t">03 &middot; Prototype</p>
                  <div className="ux-flow">
                    <div className="ux-scr"><i /><i /><u /></div><span className="ux-arr" />
                    <div className="ux-scr"><i /><i /><u /><em className="ux-hot" /></div><span className="ux-arr" />
                    <div className="ux-scr"><i /><u /><u /></div>
                  </div>
                </div>
                <div className="ux-lay ux-lay3">
                  <p className="ux-lay-t">04 &middot; Visual design</p>
                  <div className="ux-fd-ph"><UxPhoto srcs={P.devs} alt="Polished interface on desktop and mobile" label="Design" /></div>
                  <div className="ux-fd-t"><i style={{ width: "70%" }} /><i style={{ width: "46%" }} /><b>Get started</b></div>
                  <div className="ux-fd-sw"><i style={{ background: "#6a67ae" }} /><i style={{ background: "#3f3d7a" }} /><i style={{ background: "#3fe33f" }} /><i style={{ background: "#0a0b14" }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="ux-s ux-sc" id="showcase">
        <div className="ux-c ux-sc-head">
          <div>
            <p className="ux-eye"><i />Visual showcase</p>
            <h2 className="ux-h2" data-split>Designed to be <em>touched.</em></h2>
          </div>
          <div className="ux-chips"><span>Try a theme</span>
            <button type="button" className="ux-chip on" data-t="purple" aria-label="Purple theme"><i style={{ background: "#6a67ae" }} /></button>
            <button type="button" className="ux-chip" data-t="green" aria-label="Green theme"><i style={{ background: "#2fbf2f" }} /></button>
            <button type="button" className="ux-chip" data-t="ink" aria-label="Dark theme"><i style={{ background: "#0a0b14" }} /></button>
          </div>
        </div>
        <div className="ux-c ux-sc-stage" data-theme="purple">
          <div className="ux-sc-browser">
            <div className="ux-win-bar"><span /><span /><span /><b>app.yourproduct.com</b><em className="ux-bd"><span className="ux-bd-ill">Illustrative dashboard</span></em></div>
            <div className="ux-sc-body">
              <div className="ux-sb"><i className="ux-sb-logo" /><i className="ux-sb-a" /><i /><i /><i /><i /></div>
              <div className="ux-sm">
                <div className="ux-sm-top"><b /><i /></div>
                <div className="ux-kpis">
                  <div><small>Conversion</small><strong data-count="24" data-suf="%">24%</strong></div>
                  <div><small>Tasks done</small><strong data-count="86" data-suf="">86</strong></div>
                  <div><small>Satisfaction</small><strong data-count="92" data-suf="%">92%</strong></div>
                </div>
                <div className="ux-chart">
                  <div className="ux-bars">{[38, 55, 44, 70, 52, 82, 64, 90, 72, 96].map((h, n) => <i key={n} className="ux-bar" style={{ height: h + "%" }} />)}</div>
                  <svg className="ux-line" viewBox="0 0 300 100" preserveAspectRatio="none"><path className="ux-ln" pathLength={1} d="M0 80 C40 50 60 70 100 45 S170 20 210 35 S270 10 300 8" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="ux-ph2 ux-ph2-a" data-speed="0.5" data-tilt>
            <div className="s">
              <div className="ux-ph2-img"><UxPhoto srcs={P.work} alt="Designer working on a mobile app" label="App" /></div>
              <div className="ux-ph2-b"><i style={{ width: "80%" }} /><i style={{ width: "55%" }} /><b>Continue</b></div>
            </div>
          </div>
          <div className="ux-ph2 ux-ph2-b" data-speed="1" data-tilt>
            <div className="s s2">
              <div className="ux-ring"><i /></div>
              <div className="ux-ph2-l"><i /><i /><i /><i /></div>
            </div>
          </div>
          <figure className="ux-fig ux-fig-a" data-reveal><UxPhoto srcs={P.shot} alt="Analytics dashboard on a laptop" label="Dashboards" /></figure>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ux-s ux-pr" id="process">
        <div className="ux-c">
          <p className="ux-eye"><i />Our design process</p>
          <h2 className="ux-h2" data-split>Five steps. <em>No guesswork.</em></h2>
        </div>
        <div className="ux-c ux-stack">
          {PR.map((p, i) => (
            <article key={p.t} className="ux-pc" style={{ "--i": i } as CSSProperties}>
              <div className="ux-pc-n">0{i + 1}</div>
              <div className="ux-pc-b"><h3>{p.t}</h3><p>{p.d}</p></div>
              <svg className="ux-pc-art" viewBox="0 0 120 120" aria-hidden="true">{ART[i]}</svg>
            </article>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="ux-s ux-why" id="why">
        <div className="ux-c">
          <p className="ux-eye ux-eye--l"><i />Why Softsaro</p>
          <p className="ux-stmt">We design for people first, then for pixels. Every screen earns its place and every interaction has a reason.</p>
          <div className="ux-stats" data-stagger>
            <div className="ux-stat"><b data-count="8" data-suf="+">8+</b><span>Years of experience</span></div>
            <div className="ux-stat"><b data-count="100" data-suf="+">100+</b><span>Projects delivered</span></div>
            <div className="ux-stat"><b data-count="15" data-suf="+">15+</b><span>Industries served</span></div>
          </div>
          <div className="ux-bens" data-stagger>
            {BENS.map((b) => <div key={b.t} className="ux-ben"><h3>{b.t}</h3><p>{b.d}</p></div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ux-s ux-end" id="contact">
        <div className="ux-c ux-end-g">
          <div>
            <p className="ux-eye"><i />Let&rsquo;s talk</p>
            <h2 className="ux-h2 ux-h2--xl" data-split>Have an idea? Let&rsquo;s design it.</h2>
            <div className="ux-cta">
              <a className="ux-btn" data-mag href={C}>Start a Design Project <span>&rarr;</span></a>
              <a className="ux-btn ux-btn--ghost" data-mag href="tel:9818439664">9818439664</a>
            </div>
            <ul className="ux-ct">
              <li><a href="mailto:info@softsaro.com">info@softsaro.com</a></li>
              <li>Trade Tower, 5th Floor, Thapathali, Kathmandu</li>
            </ul>
          </div>
          <figure className="ux-fig ux-fig-c" data-reveal><UxPhoto srcs={P.cta} alt="Softsaro design studio" label="Say hello" /></figure>
        </div>
      </section>
    </>
  );
}