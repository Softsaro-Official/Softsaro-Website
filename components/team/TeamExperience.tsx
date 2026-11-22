import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { S } from "@/components/Site";
import "@/components/team/team.css";
import { management, team, slug, initials, type Person } from "@/components/team/team-data";

/** A real photo is used automatically when public/assets/team/<name-slug>.(jpg|jpeg|png|webp) exists. */
function photoFor(name: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "assets", "team", `${slug(name)}.${ext}`))) return `/assets/team/${slug(name)}.${ext}`;
  }
  return null;
}

function Portrait({ p, mask = "arch", cls = "" }: { p: Person; mask?: string; cls?: string }) {
  const photo = photoFor(p.name);
  return (
    <div className={`tx-pt tx-${p.tone} tx-m-${mask} ${cls}`}>
      <i className="tx-orb" aria-hidden="true"></i>
      <span className="tx-ini" aria-hidden="true">{initials(p.name)}</span>
      <svg className="tx-fig" viewBox="0 0 200 240" aria-hidden="true" focusable="false">
        <circle cx="100" cy="82" r="38" />
        <path d="M24 240 C 24 166 66 138 100 138 C 134 138 176 166 176 240 Z" />
      </svg>
      {photo ? <img src={photo} alt={`Portrait of ${p.name}`} loading="lazy" decoding="async" /> : null}
    </div>
  );
}

const everyone = [...management, ...team];
const leadMasks = ["arch", "circle", "pill", "leaf"];
const links = {
  company: [["About Us", "/about-us"], ["Portfolio", `${S}/portfolio`], ["Our Team", "/our-team"], ["Contact", `${S}/contact`]],
  services: [["Web Development", "/web-development"], ["App Development", "/mobile-app-development"], ["UI/UX Design", "/ui-ux-design"], ["Advanced SEO", `${S}/services/best-seo-agency-in-nepal`], ["Digital Marketing", `${S}/services/digital-marketing-in-nepal`], ["Domain & Hosting", "/services/domain-and-hosting-in-nepal"]],
  resources: [["Insights", "/blog"], ["SEO Training", "/seo-training"], ["Digital Marketing Training", "/digital-marketing-training"]],
};
const isLocal = (h: string) => h.startsWith("/");

function LeadItem({ p, i }: { p: Person; i: number }) {
  return (
    <article className={`tx-li tx-s${i + 1}`}>
      <div className={`tx-lp tx-m-${leadMasks[i]}`} data-cursor="image" data-cursor-label="Meet">
        <Portrait p={p} mask={leadMasks[i]} cls="tx-fill" />
        <span className="tx-no2" aria-hidden="true">0{i + 1}</span>
      </div>
      <div className="tx-lmeta">
        <h3>{p.name}</h3>
        <p><i className="tx-dot" aria-hidden="true"></i>{p.role}</p>
      </div>
    </article>
  );
}

export default function TeamExperience() {
  const heroCast: [Person, string][] = [[management[0], "arch"], [management[2], "circle"], [management[1], "blob"], [management[3], "pill"], [team[0], "leaf"]];
  return (
    <div className="tx-page" id="top">
      {/* HERO */}
      <section className="tx-hero" aria-labelledby="tx-title">
        <div className="tx-hero-bg" aria-hidden="true"><span>TEAM</span></div>
        <div className="wrap tx-hero-in">
          <div className="tx-hero-copy">
            <p className="lab"><i></i><span className="gn">Our team /</span> The people behind the work</p>
            <h1 className="tx-h1" id="tx-title">
              <span className="tx-l">Built by</span>
              <span className="tx-l">people who</span>
              <span className="tx-l">care about</span>
              <span className="tx-l tx-last">the <em>details.</em>
                <svg className="tx-und" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4 14 C 60 2, 120 22, 180 8 S 270 6, 296 12" fill="none" stroke="#3fe33f" strokeWidth="5" strokeLinecap="round" strokeDasharray="1" /></svg>
              </span>
            </h1>
            <p className="tx-hero-p">Softsaro brings together strategists, designers, engineers and growth specialists who make ambitious ideas useful in the real world.</p>
          </div>
          <div className="tx-collage" aria-hidden="true">
            {heroCast.map(([p, m], i) => (
              <div className={`tx-c tx-c${i + 1}`} data-depth={[14, 26, 20, 34, 22][i]} key={p.name}><Portrait p={p} mask={m} /></div>
            ))}
            <div className="tx-badge" data-depth="30">
              <svg viewBox="0 0 200 200">
                <defs><path id="tx-circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
                <text><textPath href="#tx-circ" startOffset="0">ONE TEAM - MANY CRAFTS - ONE TEAM - MANY CRAFTS - </textPath></text>
              </svg>
              <b>21</b>
            </div>
          </div>
        </div>
        <div className="tx-ribbon" aria-hidden="true">
          <div className="tx-mq" data-mq="1">
            {[0, 1].map((k) => (<p key={k}>{everyone.map((p) => (<span key={p.name}>{p.name}<i></i></span>))}</p>))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="tx-lead" aria-labelledby="tx-lead-title">
        <div className="wrap tx-lead-in">
          <div className="tx-head">
            <div>
              <p className="lab w"><i></i>Leadership</p>
              <h2 className="tx-h2 tx-white" id="tx-lead-title" data-split>Guided by trust and clear direction.</h2>
            </div>
            <p className="tx-lead-p">The people who keep the work focused, collaborative and moving forward.</p>
          </div>
          <div className="tx-lgrid">
            <div className="tx-lcol c1"><LeadItem p={management[0]} i={0} /><LeadItem p={management[2]} i={2} /></div>
            <div className="tx-lcol c2"><LeadItem p={management[1]} i={1} /><LeadItem p={management[3]} i={3} /></div>
          </div>
        </div>
      </section>

      {/* WIDER TEAM */}
      <section className="tx-wide" aria-labelledby="tx-wide-title">
        <div className="wrap tx-wide-grid">
          <div className="tx-wide-l">
            <p className="lab"><i></i>The wider team</p>
            <h2 className="tx-h2" id="tx-wide-title" data-split>Different strengths. One shared standard.</h2>
            <p className="tx-wide-p">From first sketch to final release, every perspective makes the work stronger.</p>
            <div className="tx-count"><b data-count="17">17</b><span>specialists across development, design, marketing and sales</span></div>
          </div>
          <ol className="tx-roster">
            {team.map((p, i) => (
              <li className={`tx-r tx-${p.tone}`} key={p.name}>
                <span className="tx-no">{String(i + 1).padStart(2, "0")}</span>
                <div className="tx-th"><Portrait p={p} mask="circle" /></div>
                <h3>{p.name}</h3>
                <p className="tx-rl">{p.role}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="tx-pv" aria-hidden="true">
          {team.map((p) => (
            <div className="tx-pvi" key={p.name}><Portrait p={p} mask="arch" /><span>{p.name}</span></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="tx-cta" id="contact" aria-labelledby="tx-cta-title">
        <i className="tx-aur a1" aria-hidden="true"></i>
        <i className="tx-aur a2" aria-hidden="true"></i>
        <div className="wrap tx-cta-in">
          <p className="lab w"><i></i>Work with us</p>
          <h2 className="tx-cta-h" id="tx-cta-title" data-split>Have a project worth caring about?</h2>
          <Link className="tx-orb-btn" href="/#contact"><span>Meet the team</span><ArrowUpRight size={26} /></Link>
        </div>
        <div className="tx-ctamq" aria-hidden="true">
          <div className="tx-mq" data-mq="-1">
            {[0, 1].map((k) => (<p key={k}>{[0, 1, 2, 3].map((j) => (<span key={j}>Worth caring about<i></i></span>))}</p>))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="tx-foot" role="contentinfo">
        <div className="wrap tx-foot-top">
          <div className="tx-fcol tx-fb">
            <b>SOFTSARO</b>
            <p>Global IT company with offices in Nepal &amp; USA. 8+ years delivering web development, mobile apps, SEO and digital marketing.</p>
            <div className="tx-soc"><a href="https://www.facebook.com/softsaronepal" aria-label="Softsaro on Facebook">f</a><a href="https://www.linkedin.com/company/softsaro" aria-label="Softsaro on LinkedIn">in</a></div>
          </div>
          {(["company", "services", "resources"] as const).map((k) => (
            <div className="tx-fcol" key={k}>
              <small>{k}</small>
              {links[k].map(([t, h]) => (isLocal(h) ? <Link key={t} href={h}>{t}</Link> : <a key={t} href={h}>{t}</a>))}
            </div>
          ))}
          <div className="tx-fcol">
            <small>contact</small>
            <a href="tel:9818439664">9818439664</a>
            <span>Trade Tower, 5th Floor &ndash; Thapathali</span>
          </div>
        </div>
        <div className="tx-giant" aria-hidden="true"><span className="tx-g-o">SOFTSARO</span><span className="tx-g-f">SOFTSARO</span></div>
        <div className="wrap tx-foot-bot">
          <span>&copy; 2026 Softsaro. All Rights Reserved.</span>
          <a href={`${S}/privacypolicy`}>Privacy Policy</a>
          <a href="#top" className="tx-top" aria-label="Back to top"><ArrowUpRight size={20} /></a>
        </div>
      </div>
    </div>
  );
}